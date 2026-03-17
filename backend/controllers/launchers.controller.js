import { launchersServise } from "../services/launchers.servise.js";


export async function getLaunchers(req,res) {

    try {
        const result =  await launchersServise.getLaunchers()
        res.json(result)
    } catch (error) {
        console.log('error in get launchers controller' , error)
        res.status(400).json('failed to get launchers')
    }
}

export async function getLauncher(req,res) {
    const { id } = req.params
    try {
        const result = await launchersServise.getLauncher(id)
        res.json(result)
    } catch (error) {
        console.log('error in get launchers controller' , error)
        res.status(400).json('failed to get launchers')
    }
}

export async function deleteLauncher(req,res) {
    const { id } = req.params
    try {
        const result = await launchersServise.deleteLauncher(id)
        res.json(result)
    } catch (error) {
        console.log('error in get launchers controller' , error)
        res.status(400).json('failed to get launchers')
    }
}

export async function destroyLauncher(req,res) {
    const { id } = req.params
    try {
        const result = await launchersServise.destroyLauncher(id)
        res.json(result)
    } catch (error) {
        console.log('error in get launchers controller' , error)
        res.status(400).json('failed to get launchers')
    }
}

export async function addLauncher(req,res) {
    const { name, type, longitude, latitude, city } = req.body

    const launcherToAdd = {
        name,
        type,
        longitude,
        latitude,
        city
    }
    try {
        const result = await launchersServise.addLauncher(launcherToAdd)
        res.json(result)
    } catch (error) {
        console.log('error in add launcher controller' , error)
        res.status(400).json('failed to add launcher')
    }
}