// @flow
import {
  CURRENT_REQUEST,
  CURRENT_SUCCESS,
  CURRENT_FAILURE
} from './types';
import { getResponse } from '../../../utils/api';


export const getCurrentData = (lat, lon) => async (
  dispatch
) => {
  dispatch({
    type: CURRENT_REQUEST
  });

  try {
    let url = `/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${'768c7ba43e6f34a1c5191eaf0f5fcd45'}`;
    const response = await getResponse(url);
    console.log(response)
     return dispatch({
       type: CURRENT_SUCCESS,
       payload: response.data
     });
  } catch (e) {
    console.log(e)
    dispatch({
      type: CURRENT_FAILURE,
      payload: e && e.message ? e.message : e
    });
  }
};