import { userService } from "./user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const jwtSecret = process.env.JWT_SECRET;

export const authService = {
  signup,
  login,
  logout,
};

async function login(userDetailes) {
  try {
    const user = await userService.getUserByName(userDetailes.username);
    if (!user) return Promise.reject("user not found");

    const match = await bcrypt.compare(userDetailes.password, user.password);
    if (!match) throw Promise.reject("password does not match");
    await userService.update(user, {lastLogin: new Date().toLocaleDateString()})
    const token = getLoginToken(user);

    const loggedinUser = {
      ...user,
      token
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

async function logout(id) {}

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
