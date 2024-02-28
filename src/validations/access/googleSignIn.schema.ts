import Joi from 'joi'
import { GoogleSignIn } from '@/types'

export const googleSignInSchema = Joi.object<GoogleSignIn>({
  email: Joi.string().email().required(),
  fullName: Joi.string().min(3).max(30).trim().default(''),
  avatar: Joi.string().default('')
})
