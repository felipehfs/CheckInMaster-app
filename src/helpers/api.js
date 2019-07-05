import axios from 'axios'

const success = response => response 
const failure = err => {
    if (err.response.status === 401) {
        window.location = "/"
        localStorage.removeItem("token")
    } else {
        Promise.reject(err)
    }
}
axios.interceptors.request.use(success, failure)