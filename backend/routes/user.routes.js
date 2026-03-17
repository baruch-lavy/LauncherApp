import { Router } from "express";

import { getUsers } from "../controllers/user.controller.js";
import { requireAdmin } from "../middlewares/requireAuth.middleware.js";

const router = Router()

router.route('/')
    .get(requireAdmin,getUsers)

export default router