/**
 * Created by DB on 16/9/18.
 */
import React from 'react';
import {Provider} from 'react-redux';
import App from './container/app';

import configureStore from './store/configureStore';

const store = configureStore();

if (!__DEV__) {
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
    };
}

export default class root extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}