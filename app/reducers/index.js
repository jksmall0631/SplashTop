import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import StorePics from './StorePics';

const rootReducer = combineReducers({
  StorePics,
  routing
});

export default rootReducer;
