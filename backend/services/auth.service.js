import { userService } from "./user.service.js";
import { getCollection } from "../utils/db.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const authService = {
  signup,
  login,
  getUser,
};

async function login(userDetailes) {
  try {
    const user = await userService.getUserByName(userDetailes.username);
    if (!user) return Promise.reject("user not found");

    const match = await bcrypt.compare(userDetailes.password, user.password);
    if (!match) throw Promise.reject("password does not match");
    await userService.update(user, {
      lastLogin: new Date().toLocaleDateString(),
    });
    const token = getLoginToken(user);

    const loggedinUser = {
      ...user,
      token,
    };
    return loggedinUser;
  } catch (error) {
    console.log("error in login service", error);
    throw error;
  }
}

async function signup(userDetailes) {
  try {
    const exsist = await userService.getUserByName(userDetailes.username);

    if (exsist) return Promise.reject("user already exsisted");

    const userToAdd = {
      ...userDetailes,
      password: await bcrypt.hash(userDetailes.password, 10),
      lastLogin: null,
    };

    const newUserId = userService.add(userToAdd);
    return newUserId;
  } catch (error) {
    console.log("error in signup service", error);
    throw error;
  }
}

async function getUser(id) {
  if (!ObjectId.isValid(id)) return Promise.reject("id is not valid");
  const userId = ObjectId.createFromHexString(id);
  try {
    const collection = await getCollection("users");
    return await collection.find({ _id: userId }).toArray();
  } catch (error) {
    console.log("error in getUser service", error);
    throw error;
  }
}

export function getLoginToken(userDetailes) {
  return jwt.sign(userDetailes, jwtSecret, { expiresIn: "1d" });
}

export function validateToken(token) {
  try {
    const loggedinUser = jwt.verify(token, jwtSecret);
    return loggedinUser;
  } catch (error) {
    throw error;
  }
}
