import { NextFunction, Request, Response } from 'express'

import { OK } from '@/core'
import { UserService } from '@/services'

const getUserList = async (req: Request, res: Response, next: NextFunction) => {
  new OK({
    message: 'Successfully!',
    metadata: await UserService.getUserList(req.query)
  }).send(res)
}

export const UserController = {
  getUserList
}
