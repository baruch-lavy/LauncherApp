import { httpService } from "./http.servise";

export const userServise = {
    login,
} 

async function login(user) {
    return await httpService.post('auth/login', user)
}