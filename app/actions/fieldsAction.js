/**
 * Created by DB on 16/6/24.
 */
import * as types from './actionTypes';

export let updateFields = (value) => {
    return {
        type: types.UPDATE_FIELDS,
        value: value
    }
};
