import {
  SET_VISITS
} from '../actions/types';

const INITIAL_STATE = {
  visits: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_VISITS:
      return { ...state, visits: action.payload }
    default:
      return state;
  }
};
