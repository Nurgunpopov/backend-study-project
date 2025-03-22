import express from "express"
import { authMiddleware } from "../middleware"
import projectController from '../controllers/projectController';


const router: express.Router = express.Router()
const controller = new projectController();

router.route('')
    .post(authMiddleware, controller.create)

router.route('/getall')
    .get(authMiddleware, controller.getAll)

router.route('/changestatus/:id')
    .patch(authMiddleware, controller.changeStatus)

router.route('/:id')
    .get(authMiddleware, controller.get)

router.route('/:id')
    .delete(authMiddleware, controller.delete)

router.route('/:id')
    .patch(authMiddleware, controller.update)

export default router