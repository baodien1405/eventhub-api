import Joi from 'joi'
import { Verification } from '@/types'

export const verificationSchema = Joi.object<Verification>({
  email: Joi.string().email().required()
})
