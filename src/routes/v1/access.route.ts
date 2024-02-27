import express from 'express'

import { asyncHandler } from '@/helpers'
import { AccessController } from '@/controllers'
import { validator } from '@/middlewares'
import { loginSchema, signUpSchema, verificationSchema } from '@/validations'

const router = express.Router()

router.post('/sign-up', validator(signUpSchema), asyncHandler(AccessController.signUp))
router.post('/login', validator(loginSchema), asyncHandler(AccessController.login))
router.post('/verification', validator(verificationSchema), asyncHandler(AccessController.verification))

export const AccessRoute = router
