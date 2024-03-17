import Joi from 'joi'
import { Event } from '@/types'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'

export const updateEventSchema = Joi.object<Event>({
  event_title: Joi.string().min(3).max(100).trim().strict(),
  event_description: Joi.string().min(3).max(256).trim().strict(),
  event_category: Joi.string().valid('sports', 'music', 'food', 'art'),
  event_invite_users: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  event_thumbnail_url: Joi.string().default(''),
  event_start_at: Joi.date(),
  event_end_at: Joi.date(),
  event_date: Joi.date(),
  event_price: Joi.number()
})
