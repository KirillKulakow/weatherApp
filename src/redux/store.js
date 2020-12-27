import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import CurrentDataReducer from './modules/CurrentData';
import CurrentLocationReducer from './modules/CurrentLocation';
import CitiesFolder from './modules/CitiesFolder';

const rootReducer = combineReducers({
  CurrentDataReducer,
  CurrentLocationReducer,
  CitiesFolder,
});

const store = createStore(rootReducer, composeWithDevTools((applyMiddleware(thunkMiddleware))));

export default store;