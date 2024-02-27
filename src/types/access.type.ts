import { Schema } from 'mongoose'

export interface AuthPayload {
  userId: Schema.Types.ObjectId
  email: string
}

export interface Login {
  email: string
  password: string
}

export interface SignUp {
  fullName: string
  email: string
  password: string
}

export interface Verification {
  email: string
}

export interface ForgotPassword {
  email: string
}
