import {
  SET_SALE_VEHICLE,
  SET_SALE_CUSTOMER
} from './types'

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