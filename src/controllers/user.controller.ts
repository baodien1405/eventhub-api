import { NextFunction, Request, Response } from 'express'

import { OK } from '@/core'
import { UserService } from '@/services'
import mongoose from 'mongoose'

const getUserList = async (req: Request, res: Response, next: NextFunction) => {
  new OK({
    message: 'Successfully!',
    metadata: await UserService.getUserList(req.query)
  }).send(res)
}

const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
  const userId = new mongoose.Types.ObjectId(req.params.id)
  new OK({
    message: 'Successfully!',
    metadata: await UserService.getUserDetails({ userId })
  }).send(res)
}

export const UserController = {
  getUserList,
  getUserDetails
}
