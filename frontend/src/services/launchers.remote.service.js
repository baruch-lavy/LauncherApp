import { httpService } from "./http.servise.js";

export const launcherService = {
  getLaunchers,
  addLauncher,
  getLauncherById,
  deleteLauncher,
  destroyLauncher,
  updateLauncher
};

async function getLaunchers() {
  return await httpService.get("launchers");
}

async function addLauncher(launcher) {
  return await httpService.post("launchers", launcher);
}

async function updateLauncher(launcherToUpdate) {
    return await httpService.put('launchers/edit', launcherToUpdate)
}

async function getLauncherById(id) {
  return await httpService.get(`launchers/${id}`);
}

async function deleteLauncher(id) {
  return await httpService.delete(`launchers/${id}`);
}

async function destroyLauncher(id) {
  return await httpService.put(`launchers/${id}`);
}
