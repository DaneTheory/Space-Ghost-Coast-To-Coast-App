import { combineReducers } from 'redux';
import GlobalReducer from './GlobalReducer';
import MapReducer from './MapReducer';
import SearchReducer from './SearchReducer';


const rootReducer = combineReducers({
  GlobalReducer,
  SearchReducer,
  MapReducer
});

export default rootReducer;
