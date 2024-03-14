import express from 'express'

import { EventController } from '@/controllers'
import { asyncHandler } from '@/helpers'
import { ValidationSource, authMiddleware, validator } from '@/middlewares'
import { createEventSchema, getEventDetailsSchema } from '@/validations'

const router = express.Router()

router.use(authMiddleware.authentication)
router.post('/', validator(createEventSchema), asyncHandler(EventController.createEvent))
router.get(
  '/:id',
  validator(getEventDetailsSchema, ValidationSource.PARAM),
  asyncHandler(EventController.getEventDetails)
)

export const EventRoute = router
