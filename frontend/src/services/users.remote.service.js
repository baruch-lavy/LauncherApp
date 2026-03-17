import { httpService } from "./http.servise";

export const userServise = {
    register,
    login,
    getUser,
    getUsers,
    deleteUser,
    updateUser
} 

async function register(user) {
    return await httpService.post('auth/register/create', user)
}

async function login(user) {
    return await httpService.post('auth/login', user)
}

async function updateUser(userToUpdate) {
    return await httpService.put('users/updateUser', userToUpdate)
}

async function getUser(id) {
    return await httpService.get(`auth/getUser/${id}`)
}

async function deleteUser(id) {
    return await httpService.delete(`auth/register/delete/${id}`)
}

async function getUsers() {
    return await httpService.get('users')
}