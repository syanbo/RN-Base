import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = { counter: 0 };

const reducer = handleActions({
  increment: state => ({counter: state.counter + 1}),
  decrement: state => ({counter: state.counter - 1}),
}, initialState);

export default reducer;
