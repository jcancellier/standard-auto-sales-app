import {
  FETCH_CUSTOMERS_START,
  FETCH_CUSTOMERS_FAIL,
  FETCH_CUSTOMERS_SUCCESS,
  POST_CUSTOMER_START,
  POST_CUSTOMER_SUCCESS,
  POST_CUSTOMER_FAIL
} from './types';

import {
  fetchAllCustomers as fetchAllCustomersApi,
  addCustomer
} from '../../api';

export const fetchAllCustomers = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_CUSTOMERS_START });

    fetchAllCustomersApi()
      .then(customers => {
        dispatch({
          type: FETCH_CUSTOMERS_SUCCESS,
          payload: customers
        })
      })
      .catch(err => {
        dispatch({
          type: FETCH_CUSTOMERS_FAIL,
          payload: err
        })
        alert(err);
      })
  }
}

export const postCustomer = (customer) => {
  return (dispatch) => {
    dispatch({ type: POST_CUSTOMER_START });

    addCustomer(customer)
      .then((customer) => {
        dispatch({ type: POST_CUSTOMER_SUCCESS, payload: customer });
      })
      .catch((err) => {
        dispatch({ type: POST_CUSTOMER_FAIL, payload: err })
        alert('invalid data');
      })
  }
}