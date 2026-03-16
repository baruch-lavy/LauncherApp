import { AsyncLocalStorage } from "node:async_hooks";
import { validateToken } from "../services/auth.service.js";

export const asyncLocalSotorage = new AsyncLocalStorage();

export function setAsyncLocalStorage(req, res, next) {
  const storage = {};

  asyncLocalSotorage.run(storage, () => {
    if (!req?.cookies?.loggedinUser) return next();
    const loggedinUser = validateToken(req.cookies.loggedinUser);

    if (loggedinUser) {
        const alsStore = asyncLocalSotorage.getStore();
        alsStore.loggedinUser = loggedinUser;
    }

    next();
  });
}
