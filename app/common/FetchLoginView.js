/**
 * Created by DB on 16/7/18.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default class FetchLoginView extends Component {

    static PropTypes = {
        onPress: PropTypes.fun
    };

    static defaultProps = {
        onPress: () => {}
    };

    render() {

        const {onPress} = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>账号异常</Text>
                <TouchableOpacity style={styles.button}
                                  onPress={ onPress }
                                  activeOpacity={0.8}
                >
                    <Text style={styles.text}>登录</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 32,
        backgroundColor: '#3A8AE3',
        borderRadius: 16,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    title: {
        color: '#787878',
        fontSize: 13,
        marginBottom: 10
    },
    image: {
        width: 180,
        marginTop: 68
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});