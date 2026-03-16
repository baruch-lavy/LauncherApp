import { authService } from "../services/auth.service.js";

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const token = await authService.login({ username, password });
    if (token) {
      res.cookie("loggedinUser", token, { sameSite: "None", secure: true });
    }
    res.json("logged im successfuly");
  } catch (error) {
    console.log("error in login controller", error);
    res.status(400).json("failed to login user");
  }
}

export async function signup(req, res) {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    res.status(400).send("user detailes is missing");
  }
  const userToCreate = {
    username,
    password,
    role,
  };
  try {
    const result = await authService.signup(userToCreate);
    res.status(201).json(result);
  } catch (error) {
    console.log("error in sign up controller", error);
    res.status(400).json("failed to signup user");
  }
}
