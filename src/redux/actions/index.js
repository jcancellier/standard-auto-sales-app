import NavigationService from '../../navigation/navigationService';
import {
  LOGIN_WITH_USER_ID_AND_PASSWORD_START,
  LOGIN_WITH_USER_ID_AND_PASSWORD_SUCCESS,
  LOGIN_WITH_USER_ID_AND_PASSWORD_FAIL
} from './types';

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
