import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CustomerReducer from './CustomerReducer';
import VehicleReducer from './VehicleReducer';

export default combineReducers({
  auth: AuthReducer,
  customers: CustomerReducer,
  vehicles: VehicleReducer
})
