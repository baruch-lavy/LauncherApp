import { getCollection } from "../utils/db.service.js";

export const userService = {
  getUserByName,
  add,
  update,
};

async function getUserByName(username) {
  try {
    const collection = await getCollection("users");
    const user = await collection.findOne({ username });
    return user;
  } catch (error) {
    console.log("error in getUserByName", error);
    throw error;
  }
}

async function add(user) {
  try {
    const collection = await getCollection("users");
    const result = await collection.insertOne(user);
    return result.insertedId;
  } catch (error) {
    throw error;
  }
}

async function update(user, detailes) {
  try {
    const collection = await getCollection("users");
    const dbUser = await collection.findOne({ username: user.username });

    if (!dbUser) return Promise.reject("user not found");

    const updatedUser = {
      ...dbUser,
      ...detailes,
    };

    const result = await collection.findOneAndUpdate(
        {_id: dbUser._id},
        {$set: updatedUser},
        {returnDocument: 'after'},
    )

    return result
  } catch (error) {
    throw error;
  }
}
