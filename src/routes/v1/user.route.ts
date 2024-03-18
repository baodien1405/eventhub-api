import express from 'express'

import { UserController } from '@/controllers'
import { asyncHandler } from '@/helpers'
import { ValidationSource, authMiddleware, validator } from '@/middlewares'
import { getUserDetailsSchema } from '@/validations'

const router = express.Router()

router.use(authMiddleware.authentication)
router.get('/', asyncHandler(UserController.getUserList))
router.get('/:id', validator(getUserDetailsSchema, ValidationSource.PARAM), asyncHandler(UserController.getUserDetails))

export const UserRoute = router
