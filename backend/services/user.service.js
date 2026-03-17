import { getCollection } from "../utils/db.service.js"

export const userService = {
    getUserByName,
    add
}

async function getUserByName(username) {
    try {
        const collection = await getCollection('users')
        const user = await collection.findOne({ username })

        return user
        
    } catch (error) {
        console.log('error in getUserByName', error)
        throw error
    }
}

async function add(user) {
    try {
        const collection = await getCollection('users')
        const result = await collection.insertOne(user)
        return result.insertedId
    } catch (error) {
        throw error
    }
}

async function update(userDetailes) {
    
}