import { BadRequestError } from '@/core'
import { UserModel } from '@/models'
import { UserRepository } from '@/repositories'
import { getSelectData } from '@/utils'
import mongoose from 'mongoose'

const getUserList = async ({ select = ['_id', 'fullName', 'email', 'avatar'] }) => {
  const foundUser = await UserModel.find().select(getSelectData(select)).lean()

  if (!foundUser) throw new BadRequestError('Not found!')

  return {
    items: foundUser
  }
}

const getUserDetails = async ({
  userId,
  unSelect = ['createdAt', 'updatedAt', '__v']
}: {
  userId: mongoose.Types.ObjectId
  unSelect?: string[]
}) => {
  const foundUser = await UserRepository.getUserDetails({ userId, unSelect })

  if (!foundUser) throw new BadRequestError('Not found!')

  return foundUser
}

export const UserService = {
  getUserList,
  getUserDetails
}
