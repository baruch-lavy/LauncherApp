import { authService } from "../services/auth.service.js";

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
    res.status(400).json("failed to login user");
  }
}

export async function signup(req, res) {
  const { username, password, userType, email } = req.body;

  if (!username || !password || !userType || !email) {
    res.status(400).send("user detailes is missing");
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

export async function logout(req, res) {

}
