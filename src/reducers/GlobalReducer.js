import { IS_LOADING } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';


export default function SearchReducer(state = initialState.globalSettings, action) {

  switch (action.type) {

    case IS_LOADING:
      return objectAssign({}, state, {isLoading: action.isLoading});

    default:
      return state;
  }
}
