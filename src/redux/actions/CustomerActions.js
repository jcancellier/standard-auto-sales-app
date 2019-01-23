import {
  FETCH_CUSTOMERS_START,
  FETCH_CUSTOMERS_FAIL,
  FETCH_CUSTOMERS_SUCCESS
} from './types';

import {
  fetchAllCustomers as fetchAllCustomersApi
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
