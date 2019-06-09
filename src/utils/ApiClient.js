import axios from 'axios'

export default (method, url, data) => {
    const baseURL = 'http://35.194.111.165'
    if (method === 'get') {
        return axios({
            method,
            url: `${baseURL}${url}`
        })
    } else {
        return axios({
            method,
            data,
            url: `${baseURL}${url}`
        })
    }
}
