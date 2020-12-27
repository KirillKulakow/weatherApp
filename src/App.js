import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import './App.css';

import Home from './container/Home'
import {getLocation} from './utils/api'
import {setStorage, getStorage} from './utils/localStorage'
import {addNewCity} from './redux/modules/CitiesFolder'
import {setCurrentLocation} from './redux/modules/CurrentLocation'
import {getCurrentData} from './redux/modules/CurrentData'

function App() {
  const dispatch = useDispatch();

  const fetchData = async () => {
    await getLocation()
    .then((res) => {
      if(!res.data.error !== undefined){
        let citiesArray = [];
        setStorage('CitiesDataWeatherApp', `${res.data.latitude}, ${res.data.longitude}, ${res.data.city}, ${res.data.country_name}`)
        citiesArray.push({lat: res.data.latitude, lon: res.data.longitude, city: res.data.city, country: res.data.country_name})
        console.log('cities at App', citiesArray)
        dispatch(addNewCity(citiesArray));
        dispatch(setCurrentLocation(res.data.city, res.data.country_name, res.data.latitude, res.data.longitude))
        dispatch(getCurrentData(res.data.latitude, res.data.longitude))
      }
    })
  }

  useEffect(() => {
    const cities = getStorage('CitiesDataWeatherApp');
    if(cities === undefined || cities === null) {
      fetchData()
    } else {
      let citiesArray = [];
      if(cities.includes(' / ')){
        let arr = cities.split(' / ');
        let array = arr.map( el => {
          let elementArray = el.split(', ');
          return {
            lat: elementArray[0],
            lon: elementArray[1],
            city: elementArray[2],
            country: elementArray[3]
          }
        })
        citiesArray.push(...array)
      } else {
        let arr = cities.split(', ');
        citiesArray.push({lat: arr[0], lon: arr[1], city: arr[2], country: arr[3]})
      }
      console.log(citiesArray)
      dispatch(addNewCity(citiesArray))
      dispatch(setCurrentLocation(citiesArray[0].city, citiesArray[0].country, citiesArray[0].lat, citiesArray[0].lon))
      dispatch(getCurrentData(citiesArray[0].lat, citiesArray[0].lon))
    }
  })

  return (
    <Home/>
  );
}

export default App;
