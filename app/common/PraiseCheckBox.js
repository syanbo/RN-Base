/**
 * Created by DB on 16/7/21.
 */
import React, {Component, PropTypes} from 'react';

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'

export default class PraiseCheckBox extends Component {

    static PropTypes = {
        onCheck: PropTypes.func,
        style: PropTypes.object,
        imageStyle: PropTypes.object,
        textStyle: PropTypes.object,
        checked: PropTypes.bool,
        count: PropTypes.string,
        image: PropTypes.object,
        selectImage: PropTypes.object,
        onPress: PropTypes.func,
        isDisabled: PropTypes.bool,
    };

    static defaultProps = {
        onCheck: () => {
        },
        onPress: () => {},
        checked: false,
        isDisabled: false,
        count: '0',
        style: {},
        imageStyle: {},
        textStyle: {}
    };

    constructor(props) {
        super(props);

        this.state = {
            checked: this.props.checked,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            checked: nextProps.checked,
        })
    }

    onSelect = () => {

        this.setState({
            checked: !this.state.checked,
        }, ()=> {
            this.props.onCheck(this.state.checked);
        });

    };

    render() {
        const {image, count, selectImage,isDisabled, onCheck} = this.props;
        return (
            <View>
                {isDisabled ?
                    <View style={[styles.button, this.props.style]}>
                        <Image style={[styles.image, this.props.imageStyle]}
                               resizeMode={"contain"}
                               source={this.state.checked ? selectImage : image}
                        />
                        <Text style={[styles.text, this.props.textStyle]}>{count}</Text>
                    </View> :
                    <TouchableOpacity
                        onPress={onCheck}
                        style={[styles.button, this.props.style]}
                        activeOpacity={0.7}
                    >
                        <Image style={[styles.image, this.props.imageStyle]}
                               resizeMode={"contain"}
                               source={this.state.checked ? selectImage : image}
                        />
                        <Text
                            style={[
                                    styles.text,
                                    this.props.textStyle,
                                    {color:this.state.checked ? '#A0C5ED' : '#787878'}
                                ]}
                        >{count}</Text>
                    </TouchableOpacity>
                }

            </View>
        );
    }
}


const styles = StyleSheet.create({
    button: {
        padding:4,
        flexDirection:'row',
        alignItems:'center',
        marginLeft:18
    },
    image: {
        height:14,
        width:14
    },
    text: {
        fontSize:12,
        color:'#787878',
        marginLeft:6
    }
});