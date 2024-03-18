import mongoose from 'mongoose'

import { UserModel } from '@/models'
import { getUnSelectData } from '@/utils'

const getUserDetails = async ({ userId, unSelect }: { userId: mongoose.Types.ObjectId; unSelect: string[] }) => {
  return await UserModel.findById(userId).select(getUnSelectData(unSelect)).lean()
}

export const UserRepository = {
  getUserDetails
}
