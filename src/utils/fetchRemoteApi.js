import { AirportAPI } from '../../config/configs';
import { failToFetchAirportList } from './autocompleteFactory';


export const fetchAirportList = (query) => {
const autoCompleteApi = `${AirportAPI.baseUrl}${AirportAPI.autocompleteEndpoint}${query}`,
      requestHeaders = new Headers({
        "APC-Auth": AirportAPI.key,
        "APC-Auth-Secret": AirportAPI.secret
      })

      return fetch(autoCompleteApi, {
        method: "POST",
        headers: requestHeaders
      })
      .then((res) => res.json())
      .then((data) => {
        if(data.status) {
          return data.airports
            .filter((airport) => {
              return airport.country.iso === 'US'
            })
        } else {
          return [data]
        }
      })
      .catch((error) => {
        return failToFetchAirportList(error)
      })
}

export const fetchSingleAirport = (locationIata) => {
const singleAirportApi = `${AirportAPI.baseUrl}${AirportAPI.singleAirportEndpoint}${locationIata}`,
      requestHeaders = new Headers({
          "APC-Auth": AirportAPI.key,
          "APC-Auth-Secret": AirportAPI.secret
      })

    return fetch(singleAirportApi, {
      method: "POST",
      headers: requestHeaders
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.status) {
        return {
          name: data.airport.name,
          latitude: data.airport.latitude,
          longitude: data.airport.longitude
        }
      } else {
        return [data]
      }
    })
    .then((data) => {
      console.log(Promise.resolve(data));
      return Promise.resolve(data)
    })
    .catch((error) => {
      return failToFetchAirportList(error)
    })
}
