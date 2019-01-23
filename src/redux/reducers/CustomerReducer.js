import {
  FETCH_CUSTOMERS_START,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: '',
  customers: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_START:
      return { ...state, isFetching: true }
    case FETCH_CUSTOMERS_SUCCESS:
      return { ...state, isFetching: false, customers: action.payload }
    case FETCH_CUSTOMERS_FAIL:
      return { ...state, isFetching: false, errorMessage: action.payload }
    default:
      return state;
  }
};
