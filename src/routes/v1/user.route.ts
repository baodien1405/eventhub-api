import express from 'express'

import { UserController } from '@/controllers'
import { asyncHandler } from '@/helpers'
import { authMiddleware } from '@/middlewares'

const router = express.Router()

router.use(authMiddleware.authentication)
router.get('/', asyncHandler(UserController.getUserList))

export const UserRoute = router
