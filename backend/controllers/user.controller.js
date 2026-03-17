import { userService } from "../services/user.service.js"


export async function getUsers(req,res) {
    try {
        const result =  await userService.getUsers()
        res.json(result)
    } catch (error) {
        console.log('error in get launchers controller' , error)
        res.status(400).json('failed to get launchers')
    }
}