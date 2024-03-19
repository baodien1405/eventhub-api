import mongoose from 'mongoose'

import { BadRequestError } from '@/core'
import { UserRepository } from '@/repositories'

const getUserList = async ({ select = ['_id', 'fullName', 'email', 'avatar'] }) => {
  const userList = await UserRepository.getUserList({ select })

  if (!userList) throw new BadRequestError('Not found!')

  return {
    items: userList
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
