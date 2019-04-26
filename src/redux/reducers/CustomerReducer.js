import {
  FETCH_CUSTOMERS_START,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAIL,
  POST_CUSTOMER_START,
  POST_CUSTOMER_SUCCESS,
  POST_CUSTOMER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: '',
  customers: {},
  isLoadingPostCustomer: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_START:
      return { ...state, isFetching: true }
    case FETCH_CUSTOMERS_SUCCESS:
      return { ...state, isFetching: false, customers: action.payload }
    case FETCH_CUSTOMERS_FAIL:
      return { ...state, isFetching: false, errorMessage: action.payload }
    case POST_CUSTOMER_START:
      return { ...state, isLoadingPostCustomer: true }
    case POST_CUSTOMER_SUCCESS:
      return { ...state, isLoadingPostCustomer: false, customers: [...state.customers, action.payload] }
    case POST_CUSTOMER_FAIL:
      return { ...state, isLoadingPostCustomer: false}
    default:
      return state;
  }
};
