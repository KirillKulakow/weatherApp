import axios from 'axios';

export const getResponse = (url) => {
    return axios({
        method: 'get',
        url: `http://api.openweathermap.org${url}`
    })
}

export const getLocationName = (name) => {
    return axios({
        method: 'get',
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=da84c3e9bf9be159cb8a175d21f9898a`
    })
}

export const getLocationLatLon = (lat, lon) => {
    return axios({
        method: 'get',
        url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=da84c3e9bf9be159cb8a175d21f9898a`
    })
}

export const getLocation = () => {
    return axios({
        method: 'get',
        url: `http://api.ipstack.com/check?access_key=${'195d57f2bccaa43a62030c0b2892d0d3'}`
    })
}