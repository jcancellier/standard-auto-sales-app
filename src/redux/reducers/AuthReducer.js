import {
  LOGIN_WITH_USER_ID_AND_PASSWORD_START,
  LOGIN_WITH_USER_ID_AND_PASSWORD_SUCCESS,
  LOGIN_WITH_USER_ID_AND_PASSWORD_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  isLoggingIn: false,
  errorMessage: '',
  salesperson: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_WITH_USER_ID_AND_PASSWORD_START:
      return { ...state, isLoggingIn: true }
    case LOGIN_WITH_USER_ID_AND_PASSWORD_SUCCESS:
      return { ...state, isLoggingIn: false, salesperson: action.payload }
    case LOGIN_WITH_USER_ID_AND_PASSWORD_FAIL:
      return { ...state, isLoggingIn: false, errorMessage: action.payload }
    default:
      return state;
  }
};
