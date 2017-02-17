/**
 * Created by DB on 2016/12/22.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    Linking
} from 'react-native';

import Modal from 'react-native-modalbox'

export default class ModelAlert extends Component {

    open = () => {
        this.refs.modal.open();
    };

    close = () => {
        this.refs.modal.close();
    };

    render() {

        const {title, onPress} = this.props;

        return (
            <Modal style={styles.modal} position={"center"} ref={"modal"} isDisabled={false}>
                <Text style={styles.text}>{title}</Text>

                <TouchableOpacity style={styles.button}
                                  activeOpacity={0.8}
                                  onPress={() => {onPress(true)}}
                >
                    <Text style={styles.buttonText}>是</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                                  activeOpacity={0.8}
                                  onPress={() => {onPress(false)}}
                >
                    <Text style={styles.buttonText}>否</Text>
                </TouchableOpacity>

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: 260,
        backgroundColor: '#FFF',
        borderRadius: 5
    },
    text: {
        color: "#1E1E1E",
        fontSize: 14,
        fontWeight: '400'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 26,
        backgroundColor:'#f4f4f4',
        height:40,
        width:160,
        borderRadius: 5
    },
    buttonText: {
        color: "#1E1E1E",
        fontSize: 14,
    }
});

