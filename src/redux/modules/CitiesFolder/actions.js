// @flow
import {
  ADD_NEW_CITY,
  REMOVE_CITY,
  } from './types';
import { getResponse } from '../../../utils/api';

export const addNewCity = (data) => ({
    type: ADD_NEW_CITY,
    payload: data
});
export const removeCity = (lat, lon) => ({
  type: REMOVE_CITY,
  payload: {lat, lon}
});