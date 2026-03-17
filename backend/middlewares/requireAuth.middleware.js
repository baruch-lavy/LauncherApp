import { asyncLocalSotorage } from "./setupAls.middleware.js";

export function requireAuth(req, res, next) {
  const { loggedinUser } = asyncLocalSotorage.getStore();

  if (!loggedinUser) return res.status(401).send("Not authorise");

  req.loggedinUser = loggedinUser;
  next();
}

export function requireAdmin(req, res, next) {
  const { loggedinUser } = asyncLocalSotorage.getStore();

  if (!loggedinUser) return res.status(401).send("Not authorise");
  if (loggedinUser.userType !== 'admin') return res.status(401).send("Not authorise");
  req.loggedinUser = loggedinUser;
  next();
}

export function requireIntelligence(req, res, next) {
  const { loggedinUser } = asyncLocalSotorage.getStore();
  console.log(loggedinUser)
  if (!loggedinUser) return res.status(401).send("Not authorise");
  if (loggedinUser.userType !== 'intelligence' && loggedinUser.userType !== 'admin') return res.status(401).send("Not authorise");

  req.loggedinUser = loggedinUser;
  next();
}
