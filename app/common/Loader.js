/**
 * Created by DB on 16/6/13.
 * 封装的加载中视图
 */
import { View, Platform} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import Spinner from 'react-native-spinkit'

export default class Loader {

    static show = (backgroundColor, size, color, type) => {
        size = size || 35;
        color = color || '#B19372';
        type = type || 'Wave';
        backgroundColor = backgroundColor || 'rgba(230,230,230,0.1)';
        this.sibling = new RootSiblings(
            <View style={{
                top: Platform.OS === 'android' ? 0 : 20, right: 0, bottom: 0, left: 0, backgroundColor: backgroundColor, justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Spinner isVisible={true} size={size} type={type} color={color}/>

            </View>);
    };

    static hide = () => {
        if (this.sibling) {
            this.sibling.destroy();
        }
    };
}
