/**
 * Created by DB on 16/6/24.
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {};

export default function fields(state = initialState, action = {}) {
    switch (action.type) {
        case types.UPDATE_FIELDS:
            return {...state, ...action.value};
        default:
            return state;
    }
}