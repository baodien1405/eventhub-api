import express from 'express'

import { asyncHandler } from '@/helpers'
import { AccessController } from '@/controllers'
import { validator } from '@/middlewares'
import { loginSchema, signUpSchema } from '@/validations'

const router = express.Router()

router.post('/sign-up', validator(signUpSchema), asyncHandler(AccessController.signUp))

router.post('/login', validator(loginSchema), asyncHandler(AccessController.login))

export const AccessRoute = router
