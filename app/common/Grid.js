/**
 * Created by DB on 2016/12/8.
 */

import React, {
    Component,
    PropTypes,
} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native'

const {width: deviceWidth} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
});

export default class Grid extends Component {

    static propTypes = {
        rowWidth: PropTypes.number,
        columnCount: PropTypes.number.isRequired,
        dataSource: PropTypes.array.isRequired,
        renderCell: PropTypes.func.isRequired,
        style: View.propTypes.style,
    };

    constructor(props) {
        super(props);
        this._columnWidth = (props.rowWidth || deviceWidth) / props.columnCount
    }

    render() {
        return (
            <View style={[this.props.style, styles.container, {width: this.props.rowWidth,}]}>
                {this._renderCells()}
            </View>
        )
    }

    _renderCells() {
        return this.props.dataSource.map((data, index, dataList) => {
            return (
                <View style={{width: this._columnWidth, }} key={`cell-${(data.key != null) ? data.key : index}`}>
                    {this.props.renderCell(data, index, dataList)}
                </View>
            )
        })
    }
}