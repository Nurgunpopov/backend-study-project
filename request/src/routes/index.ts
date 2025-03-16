import express from "express"
import requestRoutes from './requestRoutes'

const router: express.Router = express.Router()

router.use('/request', requestRoutes)

export default router
