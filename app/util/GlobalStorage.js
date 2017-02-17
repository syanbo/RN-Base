/**
 * Created by DB on 16/6/30.
 * 本地存储
 */
'use strict';

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

let defaultStorage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,
    // 数据过期时间，默认一整天（1000 * 3600 * 24秒）
    defaultExpires: null,
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true
});

export default class UserDefaults {

    static storage = defaultStorage;

    static setObject(key, value) {
        defaultStorage.save({
            key: key,
            rawData: value
        });
    }

    static objectForKey(key, action) {
        defaultStorage.load({
            key: key
        }).then(ret => {
            action(ret);
        }).catch(err => {
            action(null);
        });
    }

}
