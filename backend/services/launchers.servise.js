import { getCollection } from "../utils/db.service.js";

export const launchersServise = {
    getLaunchers
}

async function getLaunchers() {

    try {
        const collection = await getCollection('launchers')
        return await collection.find().toArray()
    } catch (error) {
        console.log('error in get launchrs service', error)
        throw error
    }
}