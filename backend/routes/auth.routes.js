import { Router } from "express";

import {signup, login} from '../controllers/auth.controller.js'

const router = Router()

router.route('/login')
    .post(login)

router.route('/signup')
    .post(signup)

export default router