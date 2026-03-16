import { Router } from "express";
import { getLaunchers } from "../controllers/launchers.controller.js";

const router = Router()

router.route('/')
    .get(getLaunchers)
    // .post()


// router.route('/launchers:id')
//     .get()
//     .delete()

export default router