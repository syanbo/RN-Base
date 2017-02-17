/**
 * Created by DB on 16/7/20.
 */
import {
    Dimensions,
    PixelRatio,
    Platform
} from  'react-native';

export const Screen = Dimensions.get('window');

export const pixelRation = PixelRatio.get();

export const PlatformiOS = Platform.OS === 'ios';

export const pixel1 = 1 / pixelRation;

export function naviGoBack(navigator) {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
}

