import { Router } from "express";
import { getLaunchers, editLauncher, getLauncher, addLauncher, deleteLauncher, destroyLauncher} from "../controllers/launchers.controller.js";
import { requireIntelligence } from "../middlewares/requireAuth.middleware.js";

const router = Router()

router.route('/')
    .get(getLaunchers)
    .post(addLauncher)

router.route('/edit')
    .put(requireIntelligence,editLauncher)


router.route('/:id')
    .get(getLauncher)
    .delete(requireIntelligence,deleteLauncher)
    .put(requireIntelligence,destroyLauncher)

export default router