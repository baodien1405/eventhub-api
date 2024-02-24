import bcrypt from 'bcrypt'

import { AuthFailureError, BadRequestError, ConflictRequestError } from '@/core'
import { UserModel } from '@/models'
import { Login, SignUp } from '@/types'
import { getInfoData, generateTokenPair } from '@/utils'

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

export const AccessService = {
  signUp,
  login
}
