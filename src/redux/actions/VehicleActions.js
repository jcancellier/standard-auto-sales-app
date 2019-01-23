import {
  FETCH_VEHICLES_START,
  FETCH_VEHICLES_SUCCESS,
  FETCH_VEHICLES_FAIL
} from './types';

import {
  fetchAllVehicles as fetchAllVehiclesApi
} from '../../api';

export const fetchAllVehicles = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_VEHICLES_START });

    fetchAllVehiclesApi()
      .then(vehicles => {
        dispatch({
          type: FETCH_VEHICLES_SUCCESS,
          payload: vehicles
        })
      })
      .catch(err => {
        dispatch({
          type: FETCH_VEHICLES_FAIL,
          payload: err
        })
        alert(err);
      })
  }
}
