// @flow
import { SET_CURRENT_LOCATION } from './types';

const reducer = (state = {city: null, country: null, lat: null, lon: null}, action) => {
    switch (action.type) {
      case SET_CURRENT_LOCATION:
        return {
          city: action.payload.city,
          country: action.payload.country,
          lat: action.payload.lat,
          lon: action.payload.lon,
        };
      default:
        return state;
    }
};

export default reducer;