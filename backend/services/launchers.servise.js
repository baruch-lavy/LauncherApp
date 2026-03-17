import { getCollection } from "../utils/db.service.js";
import { ObjectId } from 'mongodb'
 
export const launchersServise = {
    getLaunchers,
    getLauncher,
    addLauncher,
    deleteLauncher,
    destroyLauncher,
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

async function getLauncher(id) {
    if (!ObjectId.isValid(id)) throw Error('id is not valid')

    const launcherId = ObjectId.createFromHexString(id)
    console.log('launcherId', launcherId)
    try {
        const collection = await getCollection('launchers')
        return await collection.find({_id : launcherId}).toArray()
    } catch (error) {
        console.log('error in get launchrs service', error)
        throw error
    }
}

async function deleteLauncher(id) {
    if (!ObjectId.isValid(id)) throw Error('id is not valid')

    const launcherId = ObjectId.createFromHexString(id)
    try {
        const collection = await getCollection('launchers')
        return await collection.deleteOne({_id : launcherId})
    } catch (error) {
        console.log('error in get launchrs service', error)
        throw error
    }
}

async function destroyLauncher(id) {
    if (!ObjectId.isValid(id)) throw Error('id is not valid')

    const launcherId = ObjectId.createFromHexString(id)
    try {
        const collection = await getCollection('launchers')
        return await collection.updateOne(
            {_id : launcherId},
            {$set: {isDestroyed: true}}
        )
    } catch (error) {
        console.log('error in get launchrs service', error)
        throw error
    }
}

async function addLauncher(launcher) {
    try {
        const collection = await getCollection('launchers')
        return await collection.insertOne(launcher)
    } catch (error) {
        console.log('error in add launchr service', error)
        throw error
    }
}