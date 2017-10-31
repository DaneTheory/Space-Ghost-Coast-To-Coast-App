import * as types from '../constants/actionTypes'
import { toggleIsLoading } from '../actions/GlobalActions'
import { fetchAirportList } from './fetchRemoteApi'


export const setQuery = (query) => {
  return (dispatch) => {
    return dispatch({
      type: types.SET_QUERY,
      query: query
    })
  }
}

export const getSuggestions = (suggestions) => {
  return (dispatch) => {
    return dispatch({
      type: types.FETCH_SUGGESTIONS,
      suggestions: suggestions
    })
  }
}

export const failToFetchSuggestions = (error) => {
  return (dispatch) => {
    return dispatch({
      type: types.ERROR_FETCHING_SUGGESTIONS,
      suggestions: error
    })
  }
}

export const failToFetchAirportList = (error) => {
  return (dispatch) => {
    return dispatch({
      type: types.ERROR_FETCHING_AIRPORT_LIST,
      error
    })
  }
}

export const setIata = (iata) => {
  return (dispatch) => {
    return dispatch({
      type: types.SET_IATA,
      iata: iata
    })
  }
}

export const setSelection = (chosenSelection) => {
  return (dispatch) => {
    return dispatch({
      type: types.SET_CHOSEN_SELECTION,
      chosenSelection: chosenSelection
    })
  }
}

export const setLocationOne = (locationOne) => {
  return (dispatch) => {
    return dispatch({
      type: types.FETCH_LOCATION_ONE,
      locationOne: locationOne
    })
  }
}

export const setLocationTwo = (locationTwo) => {
  return (dispatch) => {
    return dispatch({
      type: types.FETCH_LOCATION_TWO,
      locationTwo: locationTwo
    })
  }
}

export const fetchSuggestions = (query) => {
  return (dispatch) => {
    const inputValue = query.trim().toLowerCase(),
          inputLength = inputValue.length;

    dispatch(setQuery(query))
      if(inputLength === 0) {
        dispatch(getSuggestions([]))
      } else if(query.length >= 3) {
        dispatch(toggleIsLoading(true))

          fetchAirportList(query)
            .then((data) => {
              dispatch(getSuggestions(data))
            })
            .then(() => {
              setTimeout(() => {
                dispatch(toggleIsLoading(false))
            }, 1000);
          })
          .catch((err) => {
            dispatch(failToFetchSuggestions(err))
          })
      }
  }
}
