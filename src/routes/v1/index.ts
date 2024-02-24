import express from 'express'

import { AccessRoute } from './access.route'

const router = express.Router()

router.use('/', AccessRoute)

export const APIs_ROUTE_V1 = router
