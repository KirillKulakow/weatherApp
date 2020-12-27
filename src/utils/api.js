import axios from 'axios';

export const getResponse = (url) => {
    return axios({
        method: 'get',
        url: `https://api.openweathermap.org${url}`,
    })
}

export const getLocationName = (name) => {
    return axios({
        method: 'get',
        url: `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=da84c3e9bf9be159cb8a175d21f9898a`,
    })
}

export const getLocationLatLon = (lat, lon) => {
    return axios({
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=da84c3e9bf9be159cb8a175d21f9898a`,
    })
}

export const getLocation = () => {
    return axios({
        method: 'get',
        url: `https://api.ipgeolocation.io/ipgeo?apiKey=d7fecb0bfb804e30be825b994af40147`
    })
}