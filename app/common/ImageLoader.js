/**
 * Created by DB on 2016/12/8.
 */

import React, {Component, PropTypes} from 'react'
import {
    View,
    Platform,
    Image
} from 'react-native'

export default class ImageLoader extends Component {

    static propTypes = {
        source: PropTypes.object,
        defaultSource: PropTypes.number,    //默认图片
        style: PropTypes.object,
        imageStyle: PropTypes.object,
        isRadius: PropTypes.bool,           //是否圆角
        borderColor: PropTypes.string
    };

    static defaultProps = {
        defaultSource: require('../image/test1.jpg'),
        isRadius: true,
        imageStyle: {width: 68, height: 68},
        style: {width: 68, height: 68},
        borderColor:'#FFF'
    };

    constructor(props) {
        super(props);
        this.state = {
            source: props.source,
            isLoad: false,
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            source: newProps.source,
        })
    }

    onLoad = () => {
        this.setState({
            isLoad: true,
        })
    };

    render() {

        const {style, imageStyle, defaultSource, isRadius, borderColor} = this.props;
        const {source, isLoad} = this.state;

        if (Platform.OS === 'ios') {

            let borderRadius = isRadius ? style.width / 2 : 0;

            return(
                <Image
                    style={ [imageStyle, {borderRadius}] }
                    source={ source }
                    defaultSource= {defaultSource}
                    resizeMode={'cover'}
                />
            )

        } else {

            const a = parseFloat(style.width) / 4;
            const b = parseFloat(style.width) / 2;

            let radiusStyle = {
                position: 'absolute',
                top: - a,
                bottom: - a,
                right: - a,
                left: - a,
                borderRadius: b + a,
                borderWidth: a,
                borderColor: borderColor
            };

            return (
                <View style={ style }>
                    <Image
                        style={ imageStyle }
                        source={ source }
                        onLoad={ this.onLoad }
                        resizeMode={'cover'}
                    >
                        {!isLoad &&
                            <Image
                                style={ imageStyle }
                                source={ defaultSource }
                                resizeMode={'cover'}
                            />
                        }
                    </Image>
                    {isRadius &&
                        <View style={radiusStyle}/>
                    }
                </View>
            )
        }
    }
}

