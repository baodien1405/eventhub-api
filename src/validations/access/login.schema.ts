import Joi from 'joi'
import { Login } from '@/types'

export const loginSchema = Joi.object<Login>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})
