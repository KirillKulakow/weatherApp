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
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=768c7ba43e6f34a1c5191eaf0f5fcd45`
    })
}

export const getLocation = () => {
    return axios({
        method: 'get',
        url: `http://api.ipstack.com/check?access_key=${'195d57f2bccaa43a62030c0b2892d0d3'}`
    })
}