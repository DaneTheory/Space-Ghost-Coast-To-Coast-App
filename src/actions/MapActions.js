import * as types from '../constants/actionTypes';
import { toggleIsLoading } from './GlobalActions';

import { AirportAPI } from '../../config/configs';


export const isMapLoading = (isLoaded) => {
  return (dispatch) => {
    return dispatch({
      type: types.MAP_LOADING,
      isLoaded: isLoaded
    });
  };
};

export const setMapCenter = (latLonArray) => {
  return (dispatch) => {
    return dispatch({
      type: types.SET_CENTER,
      center: latLonArray
    });
  };
};

export const setMapZoom = (zoom) => {
  return (dispatch) => {
    return dispatch({
      type: types.SET_ZOOM,
      zoom: zoom
    });
  };
};

export const toggleComplete = (bool) => {
  return (dispatch) => {
    return dispatch({
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

export const resetDistance = () => {
  return (dispatch) => {
    dispatch({
      type: types.RESET_DISTANCE,
      totalDistance: ''
    })
  };
};
