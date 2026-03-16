import { httpService } from "./http.servise.js";

export const launcherService = { 
    getLaunchers
}

async function getLaunchers() {
    return await httpService.get('launchers')
}