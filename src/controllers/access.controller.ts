import { Request, Response, NextFunction } from 'express'
import { CREATED, OK } from '@/core'
import { AccessService } from '@/services'

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  new CREATED({
    message: 'Successfully!',
    metadata: await AccessService.signUp(req.body)
  }).send(res)
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  new OK({
    message: 'Successfully!',
    metadata: await AccessService.login(req.body)
  }).send(res)
}

const verification = async (req: Request, res: Response, next: NextFunction) => {
  new OK({
    message: 'Email sent successfully!',
    metadata: await AccessService.verification(req.body)
  }).send(res)
}

const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  new OK({
    message: 'Successfully!',
    metadata: await AccessService.forgotPassword(req.body)
  }).send(res)
}

const googleSignIn = async (req: Request, res: Response, next: NextFunction) => {
  new OK({
    message: 'Successfully!',
    metadata: await AccessService.googleSignIn(req.body)
  }).send(res)
}

export const AccessController = {
  signUp,
  login,
  verification,
  forgotPassword,
  googleSignIn
}
