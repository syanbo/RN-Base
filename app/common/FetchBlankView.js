/**
 * Created by DB on 2016/12/19.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

export default class FetchBlankView extends Component {

    static PropTypes = {
        onPress: PropTypes.fun,
        type: PropTypes.number
    };

    static defaultProps = {
        onPress: () => {},
        type: 0
    };

    constructor(props) {
        super(props);

        this.blanks = [

        ]
    }

    render() {

        const {onPress, type} = this.props;

        return (
            <TouchableOpacity style={styles.button}
                              onPress={onPress}
                              activeOpacity={0.8}
            >
                <Image style={styles.image}
                       source={this.blanks[type].image}
                       resizeMode={"contain"}
                />
                <Text style={styles.text}>{this.blanks[type].text}</Text>
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
        color: '#A0C5ED',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 15
    },
    image: {
        width: 60,
        height: 60
    }
});