/**
 * Created by DB on 2016/11/23.
 */
import React, {
    Component,
    PropTypes,
} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    InteractionManager,
} from 'react-native';

export default class Password extends Component {
    static propTypes = {
        style: View.propTypes.style,
        inputItemStyle: View.propTypes.style,
        iconStyle: View.propTypes.style,
        maxLength: TextInput.propTypes.maxLength.isRequired,
        onChange: PropTypes.func,
        onEnd: PropTypes.func,
        autoFocus: PropTypes.bool,
    };

    static defaultProps = {
        autoFocus: true,
        onChange: () => {
        },
        onEnd: () => {
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    componentDidMount() {
        if (this.props.autoFocus) {
            InteractionManager.runAfterInteractions(() => {
                this._onPress();
            });
        }
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this._onPress.bind(this)}
                activeOpacity={1}
                underlayColor='transparent'>
                <View style={[styles.container, this.props.style]}>
                    <TextInput
                        style={{height: 45, zIndex: 99, position: 'absolute', width: 45 * 6, opacity: 0}}
                        ref='textInput'
                        maxLength={this.props.maxLength}
                        autoFocus={false}
                        keyboardType="number-pad"
                        onChangeText={
                            (text) => {
                                this.setState({text});
                                this.props.onChange(text);
                                if (text.length === this.props.maxLength) {
                                    this.props.onEnd(text);
                                }
                            }
                        }
                    />
                    {
                        this._getInputItem()
                    }
                </View>
            </TouchableHighlight>
        )

    }

    _getInputItem() {
        let inputItem = [];
        let {text}=this.state;
        for (let i = 0; i < parseInt(this.props.maxLength); i++) {
            if (i == 0) {
                inputItem.push(
                    <View
                        key={i}
                        style={[styles.inputItem, this.props.inputItemStyle]}
                    >
                        {
                            i < text.length ?
                            <View style={[styles.iconStyle, this.props.iconStyle]}/>
                            : <View style={{backgroundColor:'#9E9E9E',width:15,height:2}}/>
                        }
                    </View>)
            }
            else {
                inputItem.push(
                    <View
                        key={i}
                        style={[styles.inputItem, this.props.inputItemStyle]}
                    >
                        {
                            i < text.length ?
                            <View style={[styles.iconStyle, this.props.iconStyle]}>
                            </View> : <View style={{backgroundColor:'#9E9E9E',width:15,height:2}}/>
                        }
                    </View>)
            }
        }
        return inputItem;
    }

    _onPress() {
        this.refs.textInput.focus();
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: '#ccc',
        // backgroundColor: '#fff'
    },
    inputItem: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconStyle: {
        width: 16,
        height: 16,
        backgroundColor: '#222',
        borderRadius: 8,
    },
});