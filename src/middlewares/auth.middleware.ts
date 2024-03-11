import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { HEADER } from '@/constants'
import { AuthFailureError, NotFoundError } from '@/core'
import { asyncHandler } from '@/helpers'
import { KeyTokenService } from '@/services'
import { AuthPayload } from '@/types'
import { isMongoId } from '@/utils'

const authentication = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers[HEADER.CLIENT_ID] as string
  if (!userId || !isMongoId(userId)) throw new AuthFailureError('Invalid Request')

  const keyStore = await KeyTokenService.findByUserId(userId)
  if (!keyStore) throw new NotFoundError('Not Found keyStore')

  if (req.headers[HEADER.REFRESH_TOKEN]) {
    try {
      const refreshToken = req.headers[HEADER.REFRESH_TOKEN] as string
      const decodeUser = jwt.verify(refreshToken, keyStore.privateKey) as AuthPayload

      if (userId !== String(decodeUser.userId)) throw new AuthFailureError('Invalid userId')
      req.keyStore = keyStore
      req.user = decodeUser
      req.refreshToken = refreshToken

      return next()
    } catch (error) {
      throw new AuthFailureError('Token expired!')
    }
  }

  const accessToken = req.get('Authorization')?.split(' ')[1]
  if (!accessToken) throw new AuthFailureError('Invalid Request')

  try {
    const decodeUser = jwt.verify(accessToken, keyStore.publicKey) as AuthPayload
    if (userId !== String(decodeUser.userId)) throw new AuthFailureError('Invalid userId')
    req.keyStore = keyStore
    req.user = decodeUser

    return next()
  } catch (error) {
    throw new AuthFailureError('Token expired!')
  }
})

export const authMiddleware = {
  authentication
}
