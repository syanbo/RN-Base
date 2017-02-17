import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from "react-native-router-flux";

import * as CounterActions from '../actions/counter';

@connect(
    state => ({
        counter: state.counter,
    }),
    dispatch => bindActionCreators({...CounterActions}, dispatch),
)
export default class Counter extends Component {

    static propTypes = {
        increment: PropTypes.func.isRequired,
        incrementIfOdd: PropTypes.func.isRequired,
        incrementAsync: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        // counter: PropTypes.instanceOf(Immutable.Map).isRequired,
    };

    render() {
        const {increment, incrementIfOdd, decrement, incrementAsync, counter} = this.props;
        return (
            <View>
                <Text style={styles.text}>Clicked: {counter.counter} times</Text>
                <View style={styles.icon}>
                    <Icon.Button name="music" size={30} onPress={increment}>Increment</Icon.Button>
                </View>
                <View style={styles.icon}>
                    <Icon.Button name="play-circle-o" size={30} onPress={decrement}>Increment</Icon.Button>
                </View>
                <View style={styles.icon}>
                    <Icon.Button name="align-left" size={30} onPress={incrementIfOdd}>Increment if odd</Icon.Button>
                </View>
                <View style={styles.icon}>
                    <Icon.Button name="video-camera" size={30} onPress={
                        () => {
                          incrementAsync();
                          Actions.error("Error message")
                        }
                    }>Increment async</Icon.Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    icon: {
        margin: 10,
    },
});
