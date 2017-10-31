import * as types from '../constants/actionTypes';
import { toggleIsLoading } from './GlobalActions';
import { fetchAirportList, fetchSingleAirport } from '../utils/fetchRemoteApi';
import { setQuery, getSuggestions, failToFetchSuggestions, failToFetchAirportList, fetchSuggestions, setIata, setSelection, setLocationOne, setLocationTwo } from '../utils/autocompleteFactory';

import { AirportAPI } from '../../config/configs';


export const fetchSearchQuery = (query) => {
  return (dispatch) => {
    return dispatch(fetchSuggestions(query))
  }
}

export const getSuggestionIata = (suggestionIata) => {
  return (dispatch) => {
    return dispatch(setIata(suggestionIata))
  }
}

export const getChosenSelection = (chosenSelection) => {
  return (dispatch) => {
    return dispatch(setSelection(chosenSelection))
  }
}

export const fetchLocationOne = (locationOneIata) => {
  return (dispatch) => {
    return fetchSingleAirport(locationOneIata)
      .then((data) => {
        return dispatch(setLocationOne(data));
      })
      .catch((error) => {
        return dispatch(failToFetchAirportList(error));
      })
  }
}

export const fetchLocationTwo = (locationTwoIata) => {
  return (dispatch) => {
    return fetchSingleAirport(locationTwoIata)
      .then((data) => {
        return dispatch(setLocationTwo(data));
      })
      .catch((error) => {
        return dispatch(failToFetchAirportList(error));
      })
  }
}

export const toggleIsReady = (bool) => {
  return (dispatch) => {
    dispatch({
      type: types.IS_READY,
      isReady: bool
    })
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

export const resetDistance = () => {
  return (dispatch) => {
    dispatch({
      type: types.RESET_DISTANCE,
      totalDistance: ''
    })
  };
};

export const calculateTotalDistance = (pointOneObj, pointTwoObj) => {
  return (dispatch) => {
    let pointOneMap = new Map(Object.entries(pointOneObj)),
        pointTwoMap = new Map(Object.entries(pointTwoObj)),
        pointOneA = Number(pointOneMap.get('longitude')),
        pointOneB = Number(pointOneMap.get('latitude')),
        pointTwoA = Number(pointTwoMap.get('longitude')),
        pointTwoB = Number(pointTwoMap.get('latitude'));

    const deg2rad = 0.017453292519943295;
    const cos = Math.cos;
    const diam = 12742;

    pointOneB *= deg2rad;
    pointOneA *= deg2rad;
    pointTwoB *= deg2rad;
    pointTwoA *= deg2rad;

    const dLat = pointTwoB - pointOneB;
    const dLon = pointTwoA - pointOneA;
    const a = ((1 - cos(dLat)) + (1 - cos(dLon)) * cos(pointOneB) * cos(pointTwoB)) / 2;

    const caclDist = (diam * Math.asin(Math.sqrt(a))) / 1.852;

    const round = (value, precision) => {
      const multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }

    const calculationPromise = () => {
       let promise = new Promise((resolve, reject) => {
             resolve(round(caclDist, 1));
       });
       return promise;
    };

    calculationPromise()
      .then((data)=> {
        dispatch({
          type: types.CALCULATE_DISTANCE,
          totalDistance: data
        })
      })
      .catch((error) => {
        dispatch({
          type: types.ERROR_FETCHING_SUGGESTIONS,
          suggestions: error
        })
    })
  }
};
