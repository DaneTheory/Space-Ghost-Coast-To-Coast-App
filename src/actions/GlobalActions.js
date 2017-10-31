import * as types from '../constants/actionTypes';
import { setQuery, getSuggestions, setIata, setSelection, setLocationOne, setLocationTwo } from '../utils/autocompleteFactory';


export const toggleIsLoading = (bool) => {
  return (dispatch) => {
    return dispatch({
      type: types.IS_LOADING,
      isLoading: bool
    });
  };
}

export const toggleComplete = (bool) => {
  return (dispatch) => {
     dispatch({
      type: types.IS_FINISHED,
      isFinished: bool
    });
  };
};

export const toggleIsReady = (bool) => {
  return (dispatch) => {
    dispatch({
      type: types.IS_READY,
      isReady: bool
    })
  };
};

export const resetLocation = () => {
  return (dispatch) => {
     dispatch({
      type: types.RESET_LOCATION_ONE,
      locationOne: []
    })
     dispatch({
      type: types.RESET_LOCATION_TWO,
      locationTwo: []
    })
    dispatch({
      type: types.RESET_DISTANCE,
      totalDistance: ''
    })
    dispatch({
      type: types.IS_READY,
      isReady: false
    })
    dispatch({
      type: types.IS_FINISHED,
      isFinished: false
    });
  }
}

export const fetchMasterReset = () => {
  return (dispatch) => {
    return dispatch(
      resetLocation()
    )
  };
};
