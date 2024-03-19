import mongoose from 'mongoose'

import { UserModel } from '@/models'
import { getSelectData, getUnSelectData } from '@/utils'

const getUserList = async ({ select }: { select: string[] }) => {
  return await UserModel.find().select(getSelectData(select)).lean()
}

const getUserDetails = async ({ userId, unSelect }: { userId: mongoose.Types.ObjectId; unSelect: string[] }) => {
  return await UserModel.findById(userId).select(getUnSelectData(unSelect)).lean()
}

export const UserRepository = {
  getUserDetails,
  getUserList
}
