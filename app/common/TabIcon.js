// import React, {
//     PropTypes,
// } from 'react';
// import {
//     Text,
//     Image,
//     View
// } from 'react-native';
//
// const propTypes = {
//     selected: PropTypes.bool,
//     title: PropTypes.string,
// };
//
// const TabIcon = (props) => (
//     <View style={{flex: 1, paddingTop: 7}}>
//         {props.image ? <Image height={37} source={props.image}/> : null}
//         {props.title ? <Text
//                 style={{color: props.selected ? 'red' : 'black'}}
//             >
//                 {props.title}
//             </Text> : null
//         }
//     </View>
// );
//
// TabIcon.propTypes = propTypes;
//
// export default TabIcon;
import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class TabIcon extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon
                    color={this.props.selected ? '#3e9ce9' : '#999999'}
                    name={this.props.iconName}
                    size={25}
                />
                <Text style={[styles.title, { color: this.props.selected ? '#3e9ce9' : '#999999' }]}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: 14
    }
});