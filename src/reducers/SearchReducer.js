import { FETCH_SUGGESTIONS, SET_QUERY, ERROR_FETCHING_SUGGESTIONS, SET_IATA, SET_CHOSEN_SELECTION, FETCH_LOCATION_ONE, FETCH_LOCATION_TWO, IS_FINISHED, CALCULATE_DISTANCE, IS_READY, RESET_DISTANCE, ERROR_FETCHING_AIRPORT_LIST, RESET_LOCATION_ONE, RESET_LOCATION_TWO} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';


export default function SearchReducer(state = initialState.searchSettings, action) {

  switch (action.type) {

    case ERROR_FETCHING_SUGGESTIONS:
      return objectAssign({}, state, {suggestions: action.suggestions});

    case ERROR_FETCHING_AIRPORT_LIST:
      return objectAssign({}, state, action.suggestions);

    case FETCH_SUGGESTIONS:
      return objectAssign({}, state, {suggestions: action.suggestions});

    case SET_QUERY:
      return objectAssign({}, state, {query: action.query});

    case SET_IATA:
      return objectAssign({}, state, {iata: action.iata});

    case SET_CHOSEN_SELECTION:
      return objectAssign({}, state, {chosenSelection: action.chosenSelection});

    case FETCH_LOCATION_ONE:
      return objectAssign({}, state, {locationOne: action.locationOne});

    case FETCH_LOCATION_TWO:
      return objectAssign({}, state, {locationTwo: action.locationTwo});

    case IS_FINISHED:
      return objectAssign({}, state, {isFinished: action.isFinished});

    case IS_READY:
      return objectAssign({}, state, {isReady: action.isReady});

    case CALCULATE_DISTANCE:
      return objectAssign({}, state, {totalDistance: action.totalDistance});

    case RESET_DISTANCE:
      return objectAssign({}, state, {totalDistance: action.totalDistance});

    case RESET_LOCATION_ONE:
      return objectAssign([], state, {locationOne: action.locationOne});

    case RESET_LOCATION_TWO:
      return objectAssign([], state, {locationTwo: action.locationTwo});

    default:
      return state;
  }
}
