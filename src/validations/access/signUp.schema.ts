import Joi from 'joi'
import { SignUp } from '@/types'

export const signUpSchema = Joi.object<SignUp>({
  fullName: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})
