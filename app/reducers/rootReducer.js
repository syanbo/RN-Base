/**
 * Created by DB on 16/9/18.
 */

import { combineReducers } from 'redux'
import fields from './fieldsReducer'
import counter from './counter';

export default rootReducer = combineReducers({
    fields,
    counter
})