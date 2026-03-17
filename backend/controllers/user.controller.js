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

export async function editUser(req,res) {
    const userDetailes = req.body

    console.log(userDetailes)
    const user = await userService.getUserByName(userDetailes.originalName)

    try {
        const result = await userService.update(user,userDetailes)
        res.json(result)
    } catch (error) {
        console.log('error in edit user controller' , error)
        res.status(400).json('failed to get launchers')
    }
}