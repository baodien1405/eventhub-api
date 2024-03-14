import express from 'express'

import { AccessRoute } from './access.route'
import { UserRoute } from './user.route'
import { EventRoute } from './event.route'

const router = express.Router()

router.use('/', AccessRoute)
router.use('/users', UserRoute)
router.use('/events', EventRoute)

export const APIs_ROUTE_V1 = router
