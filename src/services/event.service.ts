import mongoose from 'mongoose'

import { Event } from '@/types'
import { EVENT_INVALID_UPDATE_FIELDS, EventModel } from '@/models'
import { getUnSelectData } from '@/utils'
import { BadRequestError, NotFoundError } from '@/core'
import { EventRepository } from '@/models/repositories'

const createEvent = async (payload: Event) => {
  const newEvent = await EventModel.create(payload)

  if (!newEvent) throw new BadRequestError('Failed to create event!')

  return newEvent
}

const getEventDetails = async (eventId: mongoose.Types.ObjectId) => {
  const event = await EventModel.findById(eventId)
    .select(getUnSelectData(['createdAt', 'updatedAt', '__v']))
    .lean()

  if (!event) throw new NotFoundError('Event not found!')

  return event
}

const getEventList = async ({
  page = 1,
  limit = 30,
  search = '',
  category = '',
  sort_by = '',
  order = '',
  select = [
    'event_title',
    'event_description',
    'event_start_at',
    'event_end_at',
    'event_date',
    'event_invite_users',
    'event_thumbnail_url',
    'event_category',
    'event_price',
    'event_author_id'
  ]
}) => {
  return await EventRepository.getEventList({
    limit,
    page,
    search,
    category,
    sort_by,
    order,
    select
  })
}

const updateEvent = async (eventId: mongoose.Types.ObjectId, payload: Partial<Event>) => {
  const updateData = {
    ...payload,
    updatedAt: Date.now()
  }

  Object.keys(updateData).forEach((fieldName) => {
    if (EVENT_INVALID_UPDATE_FIELDS.includes(fieldName)) {
      delete payload[fieldName as keyof Event]
    }
  })

  const updateEvent = await EventModel.findByIdAndUpdate(eventId, payload, {
    new: true
  })
    .select(getUnSelectData(['__v', 'createdAt', 'updatedAt']))
    .lean()

  if (!updateEvent) throw new BadRequestError('Failed to update event!')

  return updateEvent
}

export const EventService = {
  createEvent,
  getEventDetails,
  getEventList,
  updateEvent
}
