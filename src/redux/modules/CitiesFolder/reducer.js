// @flow
import {
    ADD_NEW_CITY,
    REMOVE_CITY,
} from './types';

const reducer = (state = [], action) => {
    switch (action.type) {
      case ADD_NEW_CITY:
        if(state.length < 1){
          return action.payload
        } else {
          return [action.payload, ...state];
        }
      case REMOVE_CITY:
        let newState = state.slice(0)
        newState.splice(action.payload, 1)
        return [...newState];
      default:
        return state;
    }
};

export default reducer;