import mongoose from 'mongoose'

import { Event } from '@/types'
import { EVENT_INVALID_UPDATE_FIELDS, EventModel } from '@/models'
import { getUnSelectData } from '@/utils'
import { BadRequestError, NotFoundError } from '@/core'
import { EventRepository } from '@/repositories'

const createEvent = async (payload: Event) => {
  const newEvent = await EventModel.create(payload)

  if (!newEvent) throw new BadRequestError('Failed to create event!')

  return newEvent
}

const getEventDetails = async ({
  eventId,
  unSelect = ['createdAt', 'updatedAt', '__v']
}: {
  eventId: mongoose.Types.ObjectId
  unSelect?: string[]
}) => {
  const event = await EventRepository.getEventDetails({ eventId, unSelect })

  if (!event) throw new NotFoundError('Event not found!')

  return event
}

const getEventList = async ({
  page = 1,
  limit = 30,
  search = '',
  category = '',
  lat = null,
  lng = null,
  distance = null,
  date = null,
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
    'event_author',
    'event_location_name',
    'event_address',
    'event_position'
  ]
}) => {
  return await EventRepository.getEventList({
    limit,
    page,
    search,
    category,
    lat,
    lng,
    distance,
    date,
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
