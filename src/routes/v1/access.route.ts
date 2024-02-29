import express from 'express'

import { asyncHandler } from '@/helpers'
import { AccessController } from '@/controllers'
import { validator } from '@/middlewares'
import {
  facebookSignInSchema,
  forgotPasswordSchema,
  googleSignInSchema,
  loginSchema,
  signUpSchema,
  verificationSchema
} from '@/validations'

const router = express.Router()

router.post('/sign-up', validator(signUpSchema), asyncHandler(AccessController.signUp))
router.post('/login', validator(loginSchema), asyncHandler(AccessController.login))
router.post('/verification', validator(verificationSchema), asyncHandler(AccessController.verification))
router.post('/forgot-password', validator(forgotPasswordSchema), asyncHandler(AccessController.forgotPassword))
router.post('/google-sign-in', validator(googleSignInSchema), asyncHandler(AccessController.googleSignIn))
router.post('/facebook-sign-in', validator(facebookSignInSchema), asyncHandler(AccessController.facebookSignIn))

export const AccessRoute = router
