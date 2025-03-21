import express from "express"
import { authMiddleware } from "../middleware"
import masterController from '../controllers/masterController';


const router: express.Router = express.Router()
const controller = new masterController();

router.route('')
    .post(controller.create)

router.route('/:id')
    .get(authMiddleware, controller.get)

router.route('/:id')
    .patch(authMiddleware, controller.update)

router.route('/:id')
    .delete(authMiddleware, controller.delete)

export default router