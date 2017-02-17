/**
 * Created by DB on 16/5/19.
 */

import React, {Component, PropTypes} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

import lodash from 'lodash'

export default class Button extends Component {
    static PropTypes = {
        textStyle: Text.propTypes.style,
        disabledStyle: View.propTypes.style,
        disabledTextStyle: Text.propTypes.style,
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.element
        ]),
        activeOpacity: PropTypes.number,
        allowFontScaling: PropTypes.bool,
        isLoading: PropTypes.bool,
        isDisabled: PropTypes.bool,
        activityIndicatorColor: PropTypes.string,
        delayLongPress: PropTypes.number,
        delayPressIn: PropTypes.number,
        delayPressOut: PropTypes.number,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        onPressIn: PropTypes.func,
        onPressOut: PropTypes.func,
    };

    _renderChildren() {
        let disabledStyle = [styles.textButton, this.props.textStyle];
        if (this.props.isDisabled === true) {
            disabledStyle = [styles.textButton, this.props.textStyle, this.props.disabledTextStyle];
        }
        let childElements = [];
        React.Children.forEach(this.props.children, (item) => {
            if (typeof item === 'string' || typeof item === 'number') {
                const element = (
                    <Text
                        style={disabledStyle}
                        allowFontScaling={this.props.allowFontScaling}
                        key={item}>
                        {item}
                    </Text>
                );
                childElements.push(element);
            } else if (React.isValidElement(item)) {
                childElements.push(item);
            }
        });
        return (childElements);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!lodash.isEqual(nextProps, this.props)) {
            return true;
        }
        return false;
    }

    _renderInnerText() {
        if (this.props.isLoading) {
            return (
                <ActivityIndicator
                    animating={true}
                    size='small'
                    style={styles.spinner}
                    color={this.props.activityIndicatorColor || 'black'}
                />
            );
        }
        return this._renderChildren();
    }

    render() {
        if (this.props.isDisabled === true || this.props.isLoading === true) {
            return (
                <View style={[styles.button, this.props.style, (this.props.disabledStyle || styles.opacity)]}>
                    {this._renderInnerText()}
                </View>
            );
        } else {
            // Extract Touchable props
            let touchableProps = {
                onPress: this.props.onPress,
                onPressIn: this.props.onPressIn,
                onPressOut: this.props.onPressOut,
                onLongPress: this.props.onLongPress,
                activeOpacity: this.props.activeOpacity,
                delayLongPress: this.props.delayLongPress,
                delayPressIn: this.props.delayPressIn,
                delayPressOut: this.props.delayPressOut,
            };

            return (
                <TouchableOpacity {...touchableProps}
                                  activeOpacity={0.7}
                                  style={[styles.button, this.props.style]}>
                    {this._renderInnerText()}
                </TouchableOpacity>
            );
        }

    }
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        borderRadius: 4,
        justifyContent: 'center',
   //     alignSelf:'center'
    },
    textButton: {
        fontSize: 16,
        alignSelf: 'center',
        marginHorizontal:5,
        marginVertical:5
    },
    spinner: {
        alignSelf: 'center',
    },
    opacity: {
        opacity: 0.7,
    },
});

//transparent
//opacity: 0.5,