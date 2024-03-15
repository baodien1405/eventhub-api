import express from 'express'

import { EventController } from '@/controllers'
import { asyncHandler } from '@/helpers'
import { ValidationSource, authMiddleware, validator } from '@/middlewares'
import { createEventSchema, getEventDetailsSchema, updateEventSchema } from '@/validations'

const router = express.Router()

router.use(authMiddleware.authentication)
router.post('/', validator(createEventSchema), asyncHandler(EventController.createEvent))
router.get('/', asyncHandler(EventController.getEventList))
router.get(
  '/:id',
  validator(getEventDetailsSchema, ValidationSource.PARAM),
  asyncHandler(EventController.getEventDetails)
)
router.patch(
  '/:id',
  validator(updateEventSchema, ValidationSource.BODY, { allowUnknown: true }),
  asyncHandler(EventController.updateEvent)
)

export const EventRoute = router
