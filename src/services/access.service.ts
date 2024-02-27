import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { AuthFailureError, BadRequestError, ConflictRequestError, ErrorResponse } from '@/core'
import { UserModel } from '@/models'
import { ForgotPassword, Login, SignUp, Verification } from '@/types'
import { getInfoData, generateTokenPair } from '@/utils'
import { env } from '@/config'
import Mail from 'nodemailer/lib/mailer'

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

  const hasMatchPassword = await bcrypt.compare(password, foundUser.password)

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

const handleSendMail = async (mailOptions: Mail.Options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: env.SMTP_GMAIL_USERNAME,
        pass: env.SMTP_GMAIL_PASSWORD
      }
    })

    return await transporter.sendMail(mailOptions)
  } catch (error) {
    throw new ErrorResponse(
      'Cannot send verification code to email!',
      ReasonPhrases.UNAUTHORIZED,
      StatusCodes.UNAUTHORIZED
    )
  }
}

const verification = async ({ email }: Verification) => {
  try {
    const verifyCode = Math.round(1000 + Math.random() * 9000)

    const mailOptions = {
      from: `"Support EventHub Application ${env.SMTP_GMAIL_USERNAME}`,
      to: email,
      subject: 'Verification email code',
      text: 'Your code to verification email',
      html: `<b>${verifyCode}</b>`
    }

    await handleSendMail(mailOptions)

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

const forgotPassword = async ({ email }: ForgotPassword) => {
  const newPassword = Math.round(100000 + Math.random() * 99000)

  const foundUser = await UserModel.findOne({ email: email }).lean()

  if (!foundUser) throw new ConflictRequestError('User not registered!')

  const passwordHash = await bcrypt.hash(String(newPassword), 10)

  await UserModel.findByIdAndUpdate(foundUser._id, {
    password: passwordHash,
    isChangePassword: true
  })

  const mailOptions = {
    from: `"Support EventHub Application ${env.SMTP_GMAIL_USERNAME}`,
    to: email,
    subject: 'New password',
    text: 'Your password to verification email',
    html: `<b>${newPassword}</b>`
  }

  await handleSendMail(mailOptions)

  return {}
}

export const AccessService = {
  signUp,
  login,
  verification,
  forgotPassword
}
