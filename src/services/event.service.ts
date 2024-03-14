import { BadRequestError, NotFoundError } from '@/core'
import { EventModel } from '@/models'
import { Event } from '@/types'
import mongoose from 'mongoose'

const createEvent = async (payload: Event) => {
  const newEvent = await EventModel.create(payload)

  if (!newEvent) throw new BadRequestError('Failed to create event!')

  return newEvent
}

const getEventDetails = async (eventId: mongoose.Types.ObjectId) => {
  const event = await EventModel.findById(eventId)

  if (!event) throw new NotFoundError('Event not found!')

  return event
}

export const EventService = {
  createEvent,
  getEventDetails
}
