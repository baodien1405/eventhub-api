import express from 'express'

import { asyncHandler } from '@/helpers'
import { AccessController } from '@/controllers'
import { validator } from '@/middlewares'
import { forgotPasswordSchema, loginSchema, signUpSchema, verificationSchema } from '@/validations'

const router = express.Router()

router.post('/sign-up', validator(signUpSchema), asyncHandler(AccessController.signUp))
router.post('/login', validator(loginSchema), asyncHandler(AccessController.login))
router.post('/verification', validator(verificationSchema), asyncHandler(AccessController.verification))
router.post('/forgot-password', validator(forgotPasswordSchema), asyncHandler(AccessController.forgotPassword))

export const AccessRoute = router
