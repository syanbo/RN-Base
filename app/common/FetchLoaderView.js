/**
 * Created by DB on 16/7/18.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import Spinner from 'react-native-spinkit'

//['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],

export default class FetchLoaderView extends Component {

    render() {
        return (
            <View style={[styles.loading,this.props.style]}>
                <Spinner isVisible={true} size={32} type={'ChasingDots'} color={'#B19372'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});