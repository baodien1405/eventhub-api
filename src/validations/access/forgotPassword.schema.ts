import Joi from 'joi'
import { ForgotPassword } from '@/types'

export const forgotPasswordSchema = Joi.object<ForgotPassword>({
  email: Joi.string().email().required()
})
