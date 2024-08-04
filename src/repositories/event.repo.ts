import mongoose from 'mongoose'

import { ORDER, SORT_BY } from '@/constants'
import { EventModel } from '@/models'
import { QueryEventParams } from '@/types'
import { calcDistanceLocation, getSelectData, getUnSelectData } from '@/utils'

const getEventList = async ({
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
}: QueryEventParams) => {
  page = Number(page)
  limit = Number(limit)
  const skip = (page - 1) * limit

  const condition: any = {}

  if (category) {
    condition.event_category = category
  }

  if (!ORDER.includes(order as string)) {
    order = ORDER[0]
  }

  if (!SORT_BY.includes(sort_by as string)) {
    sort_by = SORT_BY[0]
  }

  if (search) {
    condition.product_name = {
      $regex: search,
      $options: 'i'
    }
  }

  const totalEventPromise = EventModel.countDocuments()
  const eventsPromise = EventModel.find(condition)
    .populate('event_author', 'fullName avatar email -_id')
    .sort({ [sort_by]: order === 'desc' ? -1 : 1 })
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean()

  const [totalEvent, events] = await Promise.all([totalEventPromise, eventsPromise])
  let filteredEvents = events

  if (date) {
    filteredEvents = events.filter((event) => event.event_date > new Date(date))
  }

  if (lat && lng && distance) {
    filteredEvents = events.filter((event) => {
      const eventDistance = calcDistanceLocation({
        currentLat: Number(lat),
        currentLng: Number(lng),
        addressLat: event.event_position.lat,
        addressLng: event.event_position.lng
      })

      return eventDistance < Number(distance)
    })
  }

  return {
    results: filteredEvents,
    pagination: {
      page: page,
      limit: limit,
      totalRows: totalEvent
    }
  }
}

const getEventDetails = async ({ eventId, unSelect }: { eventId: mongoose.Types.ObjectId; unSelect: string[] }) => {
  return await EventModel.findById(eventId)
    .populate('event_author', 'fullName avatar email -_id')
    .select(getUnSelectData(unSelect))
    .lean()
}

export const EventRepository = {
  getEventList,
  getEventDetails
}
