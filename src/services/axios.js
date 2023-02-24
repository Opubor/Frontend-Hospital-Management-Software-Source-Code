import axios from 'axios'

const api = axios.create({
    // Add your backend URL here EXAMPLE
    baseURL: 'http://localhost:3000',
    timeout: 1000000
})

api.interceptors.request.use(function(config){
    const token = localStorage.getItem('token')
    if(token){
        config.headers['x-auth-token'] = token
    }
    return config
})

export default api;