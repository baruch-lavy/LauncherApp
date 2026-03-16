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