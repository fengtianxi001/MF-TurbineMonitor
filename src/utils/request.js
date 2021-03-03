import axios from "axios"


const request = axios.create({
    baseURL: "http://localhost:8000/api/",
})
request.interceptors.response.use(response => {
    return response.data
})
export default request