// @flow
import { SET_CURRENT_LOCATION } from './types';

export const setCurrentLocation = (cityName, countryName, lat, lon) => ({
  type: SET_CURRENT_LOCATION,
  payload: {
    city: cityName,
    country: countryName,
    lat: lat,
    lon: lon,
  }
});