import { MAP_LOADING, SET_CENTER, SET_ZOOM } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';


export default function MapReducer(state = initialState.mapSettings, action) {

  switch (action.type) {

    case MAP_LOADING:
      return objectAssign({}, state, {isLoaded: action.isLoaded});

    case SET_CENTER:
      return objectAssign({}, state, {center: action.center});

    case SET_ZOOM:
      return objectAssign({}, state, {zoom: action.zoom});

    default:
      return state;
  }
}
