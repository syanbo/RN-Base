/**
 * Created by DB on 16/6/22.
 * 封装的时间选择器iOS和Android 一起(｡･∀･)ﾉﾞ嗨
 */
'use strict';
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    Modal,
    TouchableHighlight,
    DatePickerAndroid,
    TimePickerAndroid,
    DatePickerIOS,
    Platform,
    Animated,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Moment from 'moment';

const FORMATS = {
    'date': 'YYYY-MM-DD',
    'datetime': 'YYYY-MM-DD HH:mm',
    'time': 'HH:mm'
};

export default class DatePicker extends Component {

    static propTypes = {
        confirmBtnText: PropTypes.string,
        cancelBtnText: PropTypes.string,
        mode: PropTypes.string,
        format: PropTypes.string,
        height: PropTypes.number,
        duration: PropTypes.number,
        defaultDate: PropTypes.string,
        maxDate: PropTypes.object,
        minDate: PropTypes.object,
        onDateChange: PropTypes.func
    };

    static defaultProps = {
        confirmBtnText: "确定",
        cancelBtnText: "取消",
        mode: 'date',
        height: 259,    // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
        duration: 300,  // slide animation duration time, default to 300ms, IOS only
    };

    // 构造
    constructor(props) {
        super(props);
        this.format = this.props.format || FORMATS[this.props.mode];
        this.defaultDate = this.props.defaultDate || this.getDateStr(new Date());
        this.state = {
            date: this.getDate(),
            modalVisible: false,
            animatedHeight: new Animated.Value(0),
        }
    }

    setModalVisible(visible) {

        // slide animation
        if (visible) {
            Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: this.props.height,
                    duration: this.props.duration
                }
            ).start();
            this.setState({
                modalVisible: visible
            })

        } else {

            Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: 0,
                    duration: this.props.duration
                }
            ).start(() => {
                this.setState({
                    animatedHeight: new Animated.Value(0),
                    modalVisible: visible
                })
            });
        }
    }

    onPressCancel() {
        this.setModalVisible(false);
    }

    onPressConfirm() {
        this.datePicked();
        this.setModalVisible(false);
    }

    getDate(date = this.defaultDate) {
        if (date instanceof Date) {
            return date;
        } else {
            return Moment(date, this.format).toDate();
        }
    }

    getDateStr(date = this.defaultDate) {
        if (date instanceof Date) {
            return Moment(date).format(this.format);
        } else {
            return Moment(this.getDate(date)).format(this.format);
        }
    }

    datePicked() {
        if (typeof this.props.onDateChange === 'function') {
            this.props.onDateChange(this.getDateStr(this.state.date))
        }
    }

    onPressDate() {

        // reset state
        this.setState({
            date: this.getDate()
        });

        if (Platform.OS === 'ios') {
            this.setModalVisible(true);
        } else {

            const {minDate, maxDate} = this.props;
            // 选日期
            if (this.props.mode === 'date') {

                DatePickerAndroid.open({
                    date: this.state.date,
                    minDate: minDate && this.getDate(minDate),
                    maxDate: maxDate && this.getDate(maxDate)
                }).then(({action, year, month, day}) => {
                    if (action !== DatePickerAndroid.dismissedAction) {
                        this.setState({
                            date: new Date(year, month, day)
                        });
                        this.datePicked();
                    }
                });
            } else if (this.props.mode === 'time') {
                // 选时间

                let timeMoment = Moment(this.state.date);

                TimePickerAndroid.open({
                    hour: timeMoment.hour(),
                    minute: timeMoment.minutes(),
                    is24Hour: !this.format.match(/h|a/)
                }).then(({action, hour, minute}) => {
                    if (action !== DatePickerAndroid.dismissedAction) {
                        console.log(Moment().hour(hour).minute(minute).toDate());
                        this.setState({
                            date: Moment().hour(hour).minute(minute).toDate()
                        });
                        this.datePicked();
                    }
                });
            } else if (this.props.mode === 'datetime') {
                // 选日期和时间

                DatePickerAndroid.open({
                    date: this.state.date,
                    minDate: minDate && this.getDate(minDate),
                    maxDate: maxDate && this.getDate(maxDate)
                }).then(({action, year, month, day}) => {
                    if (action !== DatePickerAndroid.dismissedAction) {
                        let timeMoment = Moment(this.state.date);

                        TimePickerAndroid.open({
                            hour: timeMoment.hour(),
                            minute: timeMoment.minutes(),
                            is24Hour: !this.format.match(/h|a/)
                        }).then(({action, hour, minute}) => {
                            if (action !== DatePickerAndroid.dismissedAction) {
                                this.setState({
                                    date: new Date(year, month, day, hour, minute)
                                });
                                this.datePicked();
                            }
                        });
                    }
                });
            } else {
                new Error('The specified mode is not supported');
            }
        }
    }

    render() {

        const {confirmBtnText, cancelBtnText, mode, maxDate, minDate} = this.props;

        return (

            <Modal
                transparent={true}
                visible={this.state.modalVisible}
            >
                {
                    Platform.OS === 'ios' ?
                        <View style={{flex:1}}>
                            <TouchableOpacity
                                style={styles.datePickerMask}
                                activeOpacity={1}
                                onPress={this.onPressCancel.bind(this)}
                            />

                            <Animated.View
                                style={[styles.datePickerCon, {height: this.state.animatedHeight}]}>
                                <DatePickerIOS
                                    date={this.state.date}
                                    mode={mode}
                                    minimumDate={minDate && this.getDate(minDate)}
                                    maximumDate={maxDate && this.getDate(maxDate)}
                                    onDateChange={(date) => this.setState({date: date})}
                                    style={[styles.datePicker]}
                                />
                                <TouchableOpacity
                                    onPress={this.onPressCancel.bind(this)}
                                    style={[styles.btnText, styles.btnCancel]}
                                >
                                    <Text style={[styles.btnTextText, styles.btnTextCancel]}>{cancelBtnText}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.onPressConfirm.bind(this)}
                                    style={[styles.btnText, styles.btnConfirm]}
                                >
                                    <Text style={[styles.btnTextText]}>{confirmBtnText}</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View> : null
                }

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    datePickerMask: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#00000077',
    },
    datePickerCon: {
        backgroundColor: '#fff',
        height: 0,
        overflow: 'hidden'
    },
    btnText: {
        position: 'absolute',
        top: 0,
        height: 42,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTextText: {
        fontSize: 16,
        color: '#B19372'
    },
    btnTextCancel: {
        color: '#666'
    },
    btnCancel: {
        left: 0
    },
    btnConfirm: {
        right: 0
    },
    datePicker: {
        marginTop: 42,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    },
});
