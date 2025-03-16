import express from "express"
import projectRoutes from './projectRoutes'
import masterRoutes from './masterRoutes'

const router: express.Router = express.Router()

router.use('/project', projectRoutes)
router.use('/master', masterRoutes)

export default router
