import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { AuthFailureError, BadRequestError, ConflictRequestError, ErrorResponse } from '@/core'
import { UserModel } from '@/models'
import { Login, SignUp, Verification } from '@/types'
import { getInfoData, generateTokenPair } from '@/utils'
import { env } from '@/config'

const signUp = async ({ fullName, email, password }: SignUp) => {
  const existUser = await UserModel.findOne({ email: email }).lean()

  if (existUser) throw new ConflictRequestError('User already registered!')

  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = await UserModel.create({
    fullName,
    email,
    password: passwordHash
  })

  if (newUser) {
    const { accessToken, refreshToken } = await generateTokenPair({
      userId: newUser._id,
      email: newUser.email
    })

    return {
      user: getInfoData({
        fields: ['_id', 'email', 'fullName'],
        object: newUser
      }),
      accessToken,
      refreshToken
    }
  }

  throw new BadRequestError('Error with signup!')
}

const login = async ({ email, password }: Login) => {
  const foundUser = await UserModel.findOne({ email: email }).lean()

  if (!foundUser) throw new ConflictRequestError('User not registered!')

  const hasMatchPassword = bcrypt.compare(password, foundUser.password)

  if (!hasMatchPassword) throw new AuthFailureError('Authentication error!')

  const { accessToken, refreshToken } = await generateTokenPair({
    userId: foundUser._id,
    email: foundUser.email
  })

  return {
    user: getInfoData({
      fields: ['_id', 'email', 'fullName', 'avatar'],
      object: foundUser
    }),
    accessToken,
    refreshToken
  }
}

const handleSendMail = async (email: string, verifyCode: number) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: env.SMTP_GMAIL_USERNAME,
        pass: env.SMTP_GMAIL_PASSWORD
      }
    })

    const mailOptions = {
      from: `"Support EventHub Application ${env.SMTP_GMAIL_USERNAME}`,
      to: email,
      subject: 'Verification email code',
      text: 'Your code to verification email',
      html: `<b>${verifyCode}</b>`
    }

    await transporter.sendMail(mailOptions)

    return {
      code: verifyCode
    }
  } catch (error) {
    throw new ErrorResponse(
      'Cannot send verification code to email!',
      ReasonPhrases.UNAUTHORIZED,
      StatusCodes.UNAUTHORIZED
    )
  }
}

const verification = async ({ email }: Verification) => {
  const verifyCode = Math.round(1000 + Math.random() * 9000)

  return await handleSendMail(email, verifyCode)
}

export const AccessService = {
  signUp,
  login,
  verification
}
