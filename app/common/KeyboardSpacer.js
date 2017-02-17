/**
 * Created by DB on 2016/12/27.
 */
import React, { Component, PropTypes } from 'react';
import {
    Keyboard,
    LayoutAnimation,
    View,
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';

const Screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: Platform.select({
        ios: {},
        android: {flex:1},
    }),
});

// From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
const defaultAnimation = {
    duration: 500,
    create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
    },
    update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 200
    }
};

export default class KeyboardSpacer extends Component {
    static propTypes = {
        topSpacing: PropTypes.number,
        onToggle: PropTypes.func,
        style: View.propTypes.style,
    };

    static defaultProps = {
        topSpacing: 0,
        onToggle: () => null,
    };

    constructor(props, context) {
        super(props, context);

        this.viewHeight = 0;
        this.isOneHeight = false;
        if (Platform.OS === 'android') {
            this.viewHeight = Screen.height - 44
        } else {
            this.viewHeight = Screen.height - 64
        }

        this.state = {
            keyboardSpace: this.viewHeight,
            isKeyboardOpened: false
        };
        this._listeners = null;
        this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
        this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
    }

    componentDidMount() {
        const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
        const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
        this._listeners = [
            Keyboard.addListener(updateListener, this.updateKeyboardSpace),
            Keyboard.addListener(resetListener, this.resetKeyboardSpace)
        ];
    }

    componentWillUnmount() {
        this._listeners.forEach(listener => listener.remove());
    }

    updateKeyboardSpace(event) {
        if (!event.endCoordinates) {
            return;
        }

        let animationConfig = defaultAnimation;
        if (Platform.OS === 'ios') {
            animationConfig = LayoutAnimation.create(
                event.duration,
                LayoutAnimation.Types[event.easing],
                LayoutAnimation.Properties.opacity,
            );
        }
        LayoutAnimation.configureNext(animationConfig);

        // get updated on rotation
        // when external physical keyboard is connected
        // event.endCoordinates.height still equals virtual keyboard height
        // however only the keyboard toolbar is showing if there should be one
        const keyboardSpace = (this.viewHeight - event.endCoordinates.height) + this.props.topSpacing;
        console.log(keyboardSpace);
        this.setState({
            keyboardSpace: keyboardSpace,
            isKeyboardOpened: true
        }, this.props.onToggle(true, keyboardSpace));
    }

    resetKeyboardSpace(event) {
        let animationConfig = defaultAnimation;
        if (Platform.OS === 'ios') {
            animationConfig = LayoutAnimation.create(
                event.duration,
                LayoutAnimation.Types[event.easing],
                LayoutAnimation.Properties.opacity,
            );
        }
        LayoutAnimation.configureNext(animationConfig);

        console.log(this.viewHeight);

        this.setState({
            keyboardSpace: this.viewHeight,
            isKeyboardOpened: false
        }, this.props.onToggle(false, 0));
    }

    render() {
        return (
            <View style={[styles.container, { height: this.state.keyboardSpace }, this.props.style]}
                  onLayout={(e) => {
                      console.log('-----'+e.nativeEvent.layout.height);
                      if (!this.isOneHeight){
                          this.isOneHeight = true;
                          this.viewHeight = e.nativeEvent.layout.height;
                          this.setState({
                              keyboardSpace:  this.viewHeight
                          })
                      }
                  }}
            >
                {this.props.children}
            </View>
        );
    }
}