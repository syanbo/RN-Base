/**
 * Created by DB on 16/7/18.
 */

import UserDefaults from './GlobalStorage'

export function requestLogin(url, method = 'GET', params = {}, successBlock = ()=>{}, failBlock = ()=>{}, loginBlock = ()=>{}) {
    UserDefaults.objectForKey('userLoginInfo', (info) => {
        if (!!info) {
            if (method == 'GET') {
                requestGET(url, {...info,...params}, successBlock, failBlock, loginBlock);
            } else {
                console.log('POST');
                requestPOST(url, {...info,...params}, successBlock, failBlock, loginBlock);
            }
        } else {
            loginBlock();
        }
    })
}

export function requestGET(url, params = {}, successBlock = ()=>{}, failBlock = ()=>{}, loginBlock = ()=>{}) {

    //把传进来的参数加工成GET模式
    let newURL = url;
    let keys = Object.keys(params);
    keys.map((value, index)=> {
        if (index == 0) {
            newURL = url + '?'
        }
        newURL = `${newURL}${value}=${params[value]}`;

        if (index != keys.length - 1) {
            newURL = newURL + '&'
        }
    });

    let map = {method: 'GET', timeout: 30 * 1000};

    console.log(newURL);

    fetch(newURL, map)
        .then((response) => response.json())
        .then(
            (responseJson) => {

                console.log(responseJson);

                if (responseJson.errcode == 9) {
                    loginBlock();
                } else if (responseJson.errcode == 0) {
                    successBlock(responseJson.data);
                } else {
                    failBlock(responseJson.errmsg);
                }
            }
        )
        .catch(
            (error) => {
                console.log(error);
                failBlock(error);
            }
        )
}

export function requestPOST(url, params = {}, successBlock = ()=>{}, failBlock = ()=>{}, loginBlock = ()=>{}) {

    console.log(url);
    console.log(params);

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
        timeout: 30 * 1000
    })
        .then((response) => response.json())
        .then(
            (responseJson) => {

                console.log(responseJson);

                if (responseJson.errcode == 9) {
                    loginBlock();
                } else if (responseJson.errcode == 0) {
                    successBlock(responseJson.data);
                } else {
                    failBlock(responseJson.errmsg);
                }
            }
        )
        .catch(
            (error) => {
                failBlock(error);
                console.log(error);
            }
        );
}

export function upLoadImage(url, params, response, successBlock, failBlack) {
    let formData = new FormData();
    formData.append('file', {uri: response, type: 'image/jpeg', name: 'userImage.jpg'});
    formData.append('fileName', 'file');
    formData.append('photoDir', 'userImage');
    formData.append('height', params.height);
    formData.append('width', params.width);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    })
        .then((response) => response.text())
        .then((responseData) => {
                let responseJson = eval("(" + responseData + ")");
                successBlock(responseJson.data);
            }
        )
        .catch((error) => {
                failBlack(error);
            }
        )
}

export function gets(url, successCallback, failCallback) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status === 200) {
            successCallback(JSON.parse(request.responseText))

        } else {
            failCallback()
        }
    };

    request.open('GET', url);
    request.send();
}