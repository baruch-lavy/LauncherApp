import Axios from 'axios'

const BASE_URL = 'http://localhost:3030/api/'
const axios = Axios.create({withCredentials: true})


export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    },
}


async function ajax(endpoint, method='GET', data) {
    const url = `${BASE_URL}${endpoint}`

    const params = (method === 'GET') ? data : null

    const options = { url, method, data, params}

    try {
        const res = await axios(options)
        return res.data
    } catch (error) {
        console.log(`eror in ${method} endpoint ${endpoint}`)
        throw error
    }
}