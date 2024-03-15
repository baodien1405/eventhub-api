import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

import { CREATED, OK } from '@/core'
import { EventService } from '@/services'

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  new CREATED({
    message: 'Successfully!',
    metadata: await EventService.createEvent(req.body)
  }).send(res)
}

const getEventDetails = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = new mongoose.Types.ObjectId(req.params.id)
  new OK({
    message: 'Successfully!',
    metadata: await EventService.getEventDetails(eventId)
  }).send(res)
}

const getEventList = async (req: Request, res: Response, next: NextFunction) => {
  new OK({
    message: 'Successfully!',
    metadata: await EventService.getEventList(req.params)
  }).send(res)
}

const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = new mongoose.Types.ObjectId(req.params.id)
  new OK({
    message: 'Successfully!',
    metadata: await EventService.updateEvent(eventId, req.body)
  }).send(res)
}

export const EventController = {
  createEvent,
  getEventDetails,
  getEventList,
  updateEvent
}
