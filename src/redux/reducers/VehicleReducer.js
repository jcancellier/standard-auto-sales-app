import {
  FETCH_VEHICLES_START,
  FETCH_VEHICLES_SUCCESS,
  FETCH_VEHICLES_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: '',
  vehicles: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_VEHICLES_START:
      return { ...state, isFetching: true }
    case FETCH_VEHICLES_SUCCESS:
      return { ...state, isFetching: false, vehicles: action.payload }
    case FETCH_VEHICLES_FAIL:
      return { ...state, isFetching: false, errorMessage: action.payload }
    default:
      return state;
  }
};
