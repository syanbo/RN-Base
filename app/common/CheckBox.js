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

export default class CheckBox extends Component {

    static PropTypes = {
        onCheck: PropTypes.func,
        style: PropTypes.object,
        imageStyle: PropTypes.object,
        checked: PropTypes.bool,
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
        const {image, selectImage,isDisabled} = this.props;
        return (
            <View>
                {isDisabled ?
                    <View style={this.props.style}>
                        <Image style={this.props.imageStyle}
                               resizeMode={"contain"}
                               source={this.state.checked ? selectImage : image}
                        />
                    </View> :
                    <TouchableOpacity
                        onPress={this.onSelect}
                        style={this.props.style}
                        activeOpacity={1}
                    >
                        <Image style={this.props.imageStyle}
                               resizeMode={"contain"}
                               source={this.state.checked ? selectImage : image}
                        />
                    </TouchableOpacity>
                }

            </View>
        );
    }
}
