import express from "express"
import AuthController from "../controllers/authController"
import { authMiddleware } from "../middleware"


const router: express.Router = express.Router()

const controller: AuthController = new AuthController()

router.route('/register')
    .post(controller.register)

router.route('/login')
    .post(controller.auth)

router.route('/verify')
    .post(authMiddleware, controller.verify)

router.route('/me')
    .get(authMiddleware, controller.me)

export default router
