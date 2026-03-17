import { Router } from "express";

import {signup, login} from '../controllers/auth.controller.js'

const router = Router()

router.route('/login')
    .post(login)

router.route('/register/create')
    .post(signup)

// router.route('register/update')
//     .put()

// router.route('register/delete/:id')
//     .delete()

export default router