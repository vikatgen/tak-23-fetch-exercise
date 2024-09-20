import axios from 'axios'

const openWeatherMapAPI = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: 'key siia'
    }
})

export default openWeatherMapAPI