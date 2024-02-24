import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { Schema } from 'mongoose'

import { AuthFailureError } from '@/core'
import { AuthPayload } from '@/types'
import { BadRequestError } from '@/core'
import { KeyTokenService } from '@/services'

export const createTokenPair = (payload: AuthPayload, publicKey: string, privateKey: string) => {
  const accessToken = jwt.sign(payload, publicKey, { expiresIn: '1d' })
  const refreshToken = jwt.sign(payload, privateKey, { expiresIn: '7 days' })

  return { accessToken, refreshToken }
}

export const verifyJWT = async (token: string, keySecret: string) => {
  try {
    const decodeUser = (await jwt.verify(token, keySecret)) as AuthPayload
    return decodeUser
  } catch (error) {
    throw new AuthFailureError('Token expired!')
  }
}

export const generateTokenPair = async ({ userId, email }: { userId: Schema.Types.ObjectId; email: string }) => {
  const privateKey = crypto.randomBytes(64).toString('hex')
  const publicKey = crypto.randomBytes(64).toString('hex')

  const { accessToken, refreshToken } = createTokenPair({ userId, email }, publicKey, privateKey)

  const keyStore = await KeyTokenService.createKeyToken({
    userId,
    publicKey,
    privateKey,
    refreshToken
  })

  if (!keyStore) {
    throw new BadRequestError('KeyStore error!')
  }

  return {
    accessToken,
    refreshToken
  }
}
