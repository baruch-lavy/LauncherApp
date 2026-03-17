import { authService } from "../services/auth.service.js";
import { userService } from "../services/user.service.js";

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const loggedinUser = await authService.login({ username, password });

    if (loggedinUser.token) {
      res.cookie("loggedinUser", loggedinUser.token, { sameSite: "None", secure: true });
    }
    delete loggedinUser.password
    res.json(loggedinUser);
  } catch (error) {
    console.log("error in login controller", error);
    res.status(400).json(`failed to login user ${error}`);
  }
}

export async function signup(req, res) {
  const { username, password, userType, email } = req.body;

  if (!username || !password || !userType || !email) {
    return res.status(400).json("user detailes is missing");
  }
  const userToCreate = {
    username,
    password,
    userType,
    email
  };
  try {
    const result = await authService.signup(userToCreate);
    res.status(201).json(result);
  } catch (error) {
    console.log("error in sign up controller", error);
    res.status(400).json("failed to signup user");
  }
}

export async function getUser(req, res) {
  
  const { id } = req.params
  try {
    const user = await authService.getUser(id)
    res.json(user)
  } catch (error) {
    console.log("error in get user controller", error);
    res.status(400).json('error finding user', error)
  }

}

export async function deleteUser(req, res) {
  
  const { id } = req.params
  try {
    const result = await userService.deleteUser(id)
    res.json(result)
  } catch (error) {
    console.log("error in delete user controller", error);
    res.status(400).json('error delete user', error)
  }
}
