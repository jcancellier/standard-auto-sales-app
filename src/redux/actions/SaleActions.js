import {
  SET_SALE_VEHICLE,
  SET_SALE_CUSTOMER,
  POST_SALE_START,
  POST_SALE_SUCCESS,
  POST_SALE_FAIL,
  SET_CONFIRM_SALE_DIALOG_VISIBILE,
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
    // TODO: finish adding post request
    addSale(sale)
      .then((sale) => {
        dispatch({ type: POST_SALE_SUCCESS, payload: sale })
        dispatch({ type: SET_CONFIRM_SALE_DIALOG_VISIBILE, payload: false})
        navigationService.navigate('SalesScreen');
      })
      .catch((err) => {
        dispatch({ type: POST_SALE_FAIL, payload: err})
      });
  }
}

export const setConfirmSaleDialogVisible = (visible) => {
  return {
    type: SET_CONFIRM_SALE_DIALOG_VISIBILE,
    payload: visible
  }
}