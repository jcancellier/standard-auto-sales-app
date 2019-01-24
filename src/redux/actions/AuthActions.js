import NavigationService from '../../navigation/navigationService';
import {
  LOGIN_WITH_USER_ID_AND_PASSWORD_START,
  LOGIN_WITH_USER_ID_AND_PASSWORD_SUCCESS,
  LOGIN_WITH_USER_ID_AND_PASSWORD_FAIL,
  SET_VISITS,
  SET_SALES
} from './types';

import { fetchAllCustomers } from './CustomerActions';

import {
  loginWithUserIdAndLastName as login
} from '../../api';



export const loginWithUserIdAndLastName = (userId = 1, lastName = '') => {
  return (dispatch) => {
    dispatch({ type: LOGIN_WITH_USER_ID_AND_PASSWORD_START });

    login(userId)
      .then(salesperson => {
        dispatch({
          type: LOGIN_WITH_USER_ID_AND_PASSWORD_SUCCESS,
          payload: salesperson
        })
        dispatch({
          type: SET_VISITS,
          payload: salesperson.visits
        })
        dispatch({
          type: SET_SALES,
          payload: salesperson.sales
        })
        NavigationService.navigate('MainStack');
      })
      .catch(err => {
        dispatch({
          type: LOGIN_WITH_USER_ID_AND_PASSWORD_FAIL,
          payload: err
        })
        alert(err);
      })
  }
}
