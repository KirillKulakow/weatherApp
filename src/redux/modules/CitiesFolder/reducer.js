// @flow
import {
    ADD_NEW_CITY,
    REMOVE_CITY,
} from './types';

const reducer = (state = [], action) => {
    switch (action.type) {
      case ADD_NEW_CITY:
        if(state.length < 1){
          return [action.payload]
        } else {
          return [...state, action.payload];
        }
      case REMOVE_CITY:
        let newState = state.filter(el => 
          el.latitude === action.payload.lat &&
          el.longitude === action.payload.lon
        );
        return [...newState];
      default:
        return state;
    }
};

export default reducer;