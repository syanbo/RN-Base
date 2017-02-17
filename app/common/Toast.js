/**
 * Created by DB on 16/6/30.
 */

import RootToast from 'react-native-root-toast';

export default class Toast {
    static showTop(message) {
        RootToast.show(message, {position: RootToast.positions.TOP});
    }
}