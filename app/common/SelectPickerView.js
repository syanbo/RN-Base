/**
 * Created by DB on 16/7/15.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    PickerIOS,
    Platform,
} from 'react-native';

import Modal from 'react-native-modalbox'
import PickerAndroid from './PickerAndroid';

let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;

export default class SelectPickerView extends Component {

    static PropTypes = {
        defaultValue: PropTypes.object,
        defaultTitle: PropTypes.object,
        onChange: PropTypes.func,
        pickerArr: PropTypes.array,
        onPressConfirm: PropTypes.func,
        onPressCancel: PropTypes.func,
        style: PropTypes.object
    };

    static defaultProps = {
        onChange: ()=> {}
    };

    constructor(props) {
        super(props);
        const {defaultValue,defaultTitle} = this.props;
        this.state = {
            select: defaultValue,
            visible: false,
            index: 0,
            title:defaultTitle
        }
    }

    onShow() {
        this.refs.modal.open();
    }

    onDismiss() {
        this.refs.modal.close();
    }

    onPressCancel() {
        this.onDismiss()
    }

    onPressConfirm() {
        this.onDismiss();

        this.props.onPressConfirm(this.state.select, this.state.index, this.state.title)

    }

    render() {

        const {pickerArr, onChange} = this.props;

        console.log(pickerArr);

        return (

            <Modal style={styles.modal} position={"bottom"} ref={"modal"} swipeToClose={false} >

                <View style={{
                    height: 40,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#f4f4f4'
                }}>
                    <TouchableOpacity style={{marginLeft: 12}}
                                      onPress={this.onPressCancel.bind(this)}>
                        <Text>取消</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginRight: 12}}
                                      onPress={this.onPressConfirm.bind(this)}>
                        <Text style={{color: '#B19372'}}>确认</Text>
                    </TouchableOpacity>
                </View>
                {
                    pickerArr.length > 0 &&
                    <Picker
                        style={{backgroundColor: '#fff'}}
                        selectedValue={this.state.select}
                        onValueChange={(itemValue, itemPosition) => {
                            this.setState({
                                select: itemValue,
                                index: itemPosition,
                                title:pickerArr[itemPosition].name
                            });
                            onChange(itemValue, itemPosition)
                        }}>
                        {pickerArr.map((v, key)=> {
                                return (
                                    <Picker.Item label={v.name} value={v.id} key={key}/>
                                )
                            }
                        )}
                    </Picker>
                }

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        height:256,
    },
});