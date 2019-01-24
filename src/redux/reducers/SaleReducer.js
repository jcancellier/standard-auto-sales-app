import {
  SET_SALES,
  SET_SALE_CUSTOMER,
  SET_SALE_VEHICLE
} from '../actions/types';

const INITIAL_STATE = {
  sales: {},
  customer: {},
  vehicle: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SALES:
      return { ...state, sales: action.payload }
    case SET_SALE_CUSTOMER:
      return { ...state, customer: action.payload }
    case SET_SALE_VEHICLE:
      return { ...state, vehicle: action.payload }
    default:
      return state;
  }
};
