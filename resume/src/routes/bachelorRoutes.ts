import express from "express"
import { authMiddleware } from "../middleware"
import bachelorController from '../controllers/bachelorController';


const router: express.Router = express.Router()
const controller = new bachelorController();

router.route('')
    .post(controller.create)

router.route('/userid')
    .get(controller.getByUserId)

router.route('/:id')
    .get(authMiddleware, controller.get)

router.route('/:id')
    .patch(authMiddleware, controller.update)

router.route('/:id')
    .delete(authMiddleware, controller.delete)
    
export default router