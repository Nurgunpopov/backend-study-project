import express from "express"
import bachelorRoutes from './bachelorRoutes'
import resumeRoutes from './resumeRoutes'

const router: express.Router = express.Router()

router.use('/bachelor', bachelorRoutes)
router.use('/resume', resumeRoutes)

export default router