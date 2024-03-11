import express from 'express'

import { AccessRoute } from './access.route'
import { UserRoute } from './user.route'

const router = express.Router()

router.use('/', AccessRoute)
router.use('/users', UserRoute)

export const APIs_ROUTE_V1 = router
