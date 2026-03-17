import { Router } from "express";

import {signup, login, getUser, deleteUser} from '../controllers/auth.controller.js'
import { requireAdmin } from "../middlewares/requireAuth.middleware.js";

const router = Router()

router.route('/login')
    .post(login)

router.route('/getUser/:id')
    .get(getUser)

router.route('/register/create', requireAdmin)
    .post(signup)

// router.route('register/update')
//     .put()

router.route('/register/delete/:id')
    .delete(requireAdmin, deleteUser)

export default router