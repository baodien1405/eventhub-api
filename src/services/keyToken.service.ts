import { Schema } from 'mongoose'
import { KeyTokenModel } from '@/models'

interface KeyToken {
  userId: Schema.Types.ObjectId
  publicKey: string
  privateKey: string
  refreshToken: string
}

const createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }: KeyToken) => {
  try {
    const filter = { user: userId }
    const update = {
      publicKey,
      privateKey,
      refreshTokensUsed: [],
      refreshToken
    }
    const options = { upsert: true, new: true }

    const tokens = await KeyTokenModel.findOneAndUpdate(filter, update, options)

    return tokens ? tokens.publicKey : null
  } catch (error) {
    return error
  }
}

const findByUserId = async (userId: string) => {
  return await KeyTokenModel.findOne({ user: userId })
}

const removeKeyById = async (id: Schema.Types.ObjectId) => {
  return await KeyTokenModel.deleteOne({ _id: id }).lean()
}

const findByRefreshTokenUsed = async (refreshToken: string) => {
  return await KeyTokenModel.findOne({
    refreshTokensUsed: refreshToken
  }).lean()
}

const findByRefreshToken = async (refreshToken: string) => {
  return await KeyTokenModel.findOne({ refreshToken })
}

const deleteKeyById = async (userId: Schema.Types.ObjectId) => {
  return await KeyTokenModel.deleteOne({ user: userId })
}

export const KeyTokenService = {
  createKeyToken,
  findByUserId,
  removeKeyById,
  findByRefreshTokenUsed,
  findByRefreshToken,
  deleteKeyById
}
