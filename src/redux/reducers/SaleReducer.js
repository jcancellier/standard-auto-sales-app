import {
  SET_SALES,
  SET_SALE_CUSTOMER,
  SET_SALE_VEHICLE,
  POST_SALE_START,
  POST_SALE_SUCCESS,
  POST_SALE_FAIL,
  SET_CONFIRM_SALE_DIALOG_VISIBILE
} from '../actions/types';

const INITIAL_STATE = {
  sales: {},
  customer: {},
  vehicle: {},
  isLoadingPostSale: false,
  confirmSaleDialogVisible: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SALES:
      return { ...state, sales: action.payload }
    case SET_SALE_CUSTOMER:
      return { ...state, customer: action.payload }
    case SET_SALE_VEHICLE:
      return { ...state, vehicle: action.payload }
    case POST_SALE_START:
      return { ...state, isLoadingPostSale: true }
    case POST_SALE_SUCCESS:
      return { ...state, isLoadingPostSale: false, sales: [...state.sales, action.payload] }
    case POST_SALE_FAIL:
      return { ...state, isLoadingPostSale: false }
    case SET_CONFIRM_SALE_DIALOG_VISIBILE:
      return { ... state, confirmSaleDialogVisible: action.payload }
    default:
      return state;
  }
};
