import Joi from 'joi'
import { FacebookSignIn } from '@/types'

export const facebookSignInSchema = Joi.object<FacebookSignIn>({
  email: Joi.string().default(''),
  fullName: Joi.string().min(3).max(30).trim().default(''),
  avatar: Joi.string().default('')
})
