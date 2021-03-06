import {
  SET_SALE_VEHICLE,
  SET_SALE_CUSTOMER,
  POST_SALE_START,
  POST_SALE_SUCCESS,
  POST_SALE_FAIL,
  SET_CONFIRM_SALE_DIALOG_VISIBILE,
  SET_SALE_GENERATED_SNACKBAR_VISIBLE,
  SET_MOST_RECENT_SALE,
} from './types'

import { addSale } from '../../api';
import navigationService from '../../navigation/navigationService';

export const setSaleVehicle = (vehicle) => {
  return {
    type: SET_SALE_VEHICLE,
    payload: vehicle
  }
}

export const setSaleCustomer = (customer) => {
  return {
    type: SET_SALE_CUSTOMER,
    payload: customer
  }
}

export const postSale = (sale) => {
  return (dispatch) => {
    dispatch({ type: POST_SALE_START });
    addSale(sale)
      .then((sale) => {
        dispatch({ type: POST_SALE_SUCCESS, payload: sale })
        dispatch({ type: SET_CONFIRM_SALE_DIALOG_VISIBILE, payload: false})
        navigationService.navigate('DashboardScreen');
        dispatch({ type: SET_SALE_GENERATED_SNACKBAR_VISIBLE, payload: true});
        dispatch(setSaleCustomer({}));
        dispatch(setSaleVehicle({}));
        dispatch(setMostRecentSale(sale));    
      })
      .catch((err) => {
        dispatch({ type: POST_SALE_FAIL, payload: err})
        alert('invalid data');
      });
  }
}

export const setConfirmSaleDialogVisible = (visible) => {
  return {
    type: SET_CONFIRM_SALE_DIALOG_VISIBILE,
    payload: visible
  }
}

export const setSaleGeneratedSnackbarVisible = (visible) => {
  return {
    type: SET_SALE_GENERATED_SNACKBAR_VISIBLE,
    payload: visible
  }
}

export const setMostRecentSale = (sale) => {
  return {
    type: SET_MOST_RECENT_SALE,
    payload: sale
  }
}