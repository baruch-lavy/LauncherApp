import { Router } from "express";

import { getUsers, editUser } from "../controllers/user.controller.js";
import { requireAdmin } from "../middlewares/requireAuth.middleware.js";

const router = Router()

router.route('/')
    .get(requireAdmin,getUsers)

router.route('/updateUser')
    .put(requireAdmin, editUser)

export default router