/* eslint-disable import/no-extraneous-dependencies */
import {Platform, AsyncStorage} from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import devTools from 'remote-redux-devtools';
import rootReducer from '../reducers/rootReducer';

let enhancer;
export default function confirgureStore(initialState) {
    if (__DEV__) {
        enhancer = compose(
            applyMiddleware(thunk),
            devTools({
                name: Platform.OS,
                hostname: 'localhost',
                port: 5678,
            }),
        )(createStore);
    } else {
        enhancer = compose(
            applyMiddleware(thunk),
        )(createStore);
    }

    const store = autoRehydrate(initialState)(enhancer)(rootReducer);
  //  const store = createStore(rootReducer, initialState, enhancer);

    let opt = {
        storage: AsyncStorage,
        transform: [],
        //whitelist: ['userStore'],
    };
    persistStore(store, opt);
    return store;
}
