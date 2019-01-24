import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CustomerReducer from './CustomerReducer';
import VehicleReducer from './VehicleReducer';
import VisitReducer from './VisitReducer';
import SaleReducer from './SaleReducer';

export default combineReducers({
  auth: AuthReducer,
  customers: CustomerReducer,
  vehicles: VehicleReducer,
  visits: VisitReducer,
  sales: SaleReducer
})
