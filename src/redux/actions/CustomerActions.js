import {
  FETCH_CUSTOMERS_START,
  FETCH_CUSTOMERS_FAIL,
  FETCH_CUSTOMERS_SUCCESS,
  POST_CUSTOMER_START,
  POST_CUSTOMER_SUCCESS,
  POST_CUSTOMER_FAIL,
  SET_CUSTOMER_CREATED_SNACKBAR_VISIBLE
} from './types';

import {
  fetchAllCustomers as fetchAllCustomersApi,
  addCustomer
} from '../../api';
import navigationService from '../../navigation/navigationService';

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
        dispatch({ type: SET_CUSTOMER_CREATED_SNACKBAR_VISIBLE, payload: true })
        navigationService.goBack();
      })
      .catch((err) => {
        dispatch({ type: POST_CUSTOMER_FAIL, payload: err })
        alert('invalid data');
      })
  }
}

export const setCustomerCreatedSnackbarVisible = (visible) => {
  return {
    type: SET_CUSTOMER_CREATED_SNACKBAR_VISIBLE,
    payload: visible
  }
}