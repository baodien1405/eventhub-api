import { BadRequestError } from '@/core'
import { UserModel } from '@/models'
import { QueryUserParams } from '@/types'
import { getSelectData } from '@/utils'

const getUserList = async ({ select = ['_id', 'fullName', 'email', 'avatar'] }) => {
  const foundUser = await UserModel.find().select(getSelectData(select)).lean()

  if (!foundUser) throw new BadRequestError('Not found!')

  return {
    items: foundUser
  }
}

export const UserService = {
  getUserList
}
