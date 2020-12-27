// @flow
import {
    CURRENT_REQUEST,
    CURRENT_SUCCESS,
    CURRENT_FAILURE
} from './types';

const INITIAL_STATE = {
    error: null,
    response: null,
    isError: null,
    isBusy: false
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CURRENT_REQUEST:
      return {
          ...state,
          isBusy: true,
          response: null
        };
      case CURRENT_SUCCESS:
      return {
          ...state,
          isBusy: false,
          response: action.payload
        };
        case CURRENT_FAILURE:
        return {
            ...state,
            isBusy: false,
            isError: action.payload,
            response: null
          };
      default:
        return state;
    }
};

export default reducer;