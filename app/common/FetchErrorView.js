/**
 * Created by DB on 16/7/18.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

export default class FetchErrorView extends Component {

    static PropTypes = {
        text: PropTypes.string,
        onPress: PropTypes.fun
    };

    static defaultProps = {
        onPress: () => {},
        text: '点击屏幕重新加载'
    };

    render() {
        //解构
        const {onPress, text} = this.props;

        return (
            <TouchableOpacity style={styles.button}
                              onPress={ onPress }
                              activeOpacity={0.8}
            >
                <Image style={styles.image}
                       source={require('../image/no-wifi.png')}
                       resizeMode={"contain"}
                />
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#cdcdcd',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20
    },
    image: {
        width: 180,
        height: 186*0.61
    }
});