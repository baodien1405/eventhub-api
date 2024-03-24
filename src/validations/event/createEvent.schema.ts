import Joi from 'joi'

import { Event } from '@/types'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'

export const createEventSchema = Joi.object<Event>({
  event_title: Joi.string().trim().required(),
  event_description: Joi.string().trim().default(''),
  event_start_at: Joi.date(),
  event_end_at: Joi.date(),
  event_date: Joi.date(),
  event_invite_users: Joi.array()
    .required()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  event_thumbnail_url: Joi.string(),
  event_category: Joi.string().required(),
  event_price: Joi.number(),
  event_location_name: Joi.string().trim().required(),
  event_address: Joi.string().trim().required(),
  event_position: Joi.object({
    lat: Joi.number(),
    lng: Joi.number()
  })
})
