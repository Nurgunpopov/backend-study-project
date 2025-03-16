import express from "express"
import { authMiddleware } from "../middleware"
import requestController from '../controllers/requestController';


const router: express.Router = express.Router()
const controller = new requestController();

router.route('')
    .post(authMiddleware, controller.create)

router.route('/:id')
    .get(authMiddleware, controller.get)

router.route('/:id')
    .patch(authMiddleware, controller.update)

router.route('/:id')
    .delete(authMiddleware, controller.delete)
    
export default router