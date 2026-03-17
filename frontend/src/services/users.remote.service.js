import { httpService } from "./http.servise";

export const userServise = {
    register,
    login,
    getUser
} 

async function register(user) {
    return await httpService.post('auth/register/create', user)
}

async function login(user) {
    return await httpService.post('auth/login', user)
}

async function getUser(id) {
    return await httpService.get(`auth/getUser/${id}`)
}