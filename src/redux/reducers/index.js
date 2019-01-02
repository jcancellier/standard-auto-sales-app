import { combineReducers } from 'redux';

const INITIAL_STATE = {
  test: true
}

const testReducer = (state = INITIAL_STATE, action) => {
  return state;
}

export default combineReducers({
  test: testReducer
})
