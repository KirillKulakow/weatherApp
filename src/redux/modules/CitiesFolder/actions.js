// @flow
import {
  ADD_NEW_CITY,
  REMOVE_CITY,
  } from './types';

export const addNewCity = (data) => ({
    type: ADD_NEW_CITY,
    payload: data
});
export const removeCity = (index) => ({
  type: REMOVE_CITY,
  payload: index
});