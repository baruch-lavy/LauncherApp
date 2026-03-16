import { Router } from "express";
import { getLaunchers, getLauncher, addLauncher, deleteLauncher} from "../controllers/launchers.controller.js";

const router = Router()

router.route('/')
    .get(getLaunchers)
    .post(addLauncher)


router.route('/:id')
    .get(getLauncher)
    .delete(deleteLauncher)

export default router