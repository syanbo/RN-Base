/**
 * Created by DB on 2017/2/16.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import {connect} from 'react-redux'
import {
    Scene,
    Reducer,
    Router,
    Switch,
    Modal,
    Actions,
    ActionConst,
} from 'react-native-router-flux';
import TabIcon from '../common/TabIcon'
import Error from '../common/Error'
import Counter from '../page/Counter'

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        console.log('ACTION:', action);
        return defaultReducer(state, action);
    };
};

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 64;
        style.marginBottom = computedProps.hideTabBar ? 0 : 49;
    }
    return style;
};

export default class app extends Component {

    render() {

        return (
            <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
                <Scene key="modal" component={Modal}>
                    <Scene key="root">
                        <Scene
                            key="main"
                            tabs
                            tabBarStyle={styles.tabBarStyle}
                            tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                            pressOpacity={0.8}
                            type={ActionConst.REPLACE}
                        >
                            <Scene
                                key="category"
                                component={Counter}
                                title="分类"
                                icon={TabIcon}
                                iconName="md-pricetags"
                            />
                            <Scene
                                key="feedback"
                                component={Counter}
                                title="建议"
                                icon={TabIcon}
                                iconName="md-thumbs-up"
                                hideNavBar
                            />
                            <Scene
                                key="about"
                                component={Counter}
                                title="关于"
                                icon={TabIcon}
                                iconName="md-information-circle"
                            />
                        </Scene>
                    </Scene>
                    <Scene key="error" component={Error}/>
                </Scene>
            </Router>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
    },
    tabBarStyle: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#b7b7b7',
        backgroundColor: 'rgba(250, 251, 252, 1)',
        justifyContent: 'center',
        opacity: 1,
        height: 49,
    },
    tabBarSelectedItemStyle: {
        //  backgroundColor: '#ddd',
    },
});

