import mongoose, { Document } from 'mongoose'

const EVENT_DOCUMENT_NAME = 'Event'
const EVENT_COLLECTION_NAME = 'events'

interface Event extends Document {
  event_title: string
  event_description: string
  event_start_at: Date
  event_end_at: Date
  event_date: Date
  event_invite_users: mongoose.Types.ObjectId[]
  event_thumbnail_url: string
  event_category: string
  event_price: string
  event_author: mongoose.Types.ObjectId
  event_location_name: string
  event_address: string
  event_position: {
    lat: number
    lng: number
  }
}

const eventSchema = new mongoose.Schema(
  {
    event_title: { type: String, required: true, trim: true, maxLength: 150 },
    event_description: { type: String },
    event_start_at: { type: Date },
    event_end_at: { type: Date },
    event_date: { type: Date },
    event_invite_users: { type: Array, default: [] },
    event_author: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    event_thumbnail_url: { type: String },
    event_category: { type: String, required: true },
    event_price: { type: Number, required: true },
    event_location_name: { type: String, required: true, trim: true, maxLength: 150 },
    event_address: { type: String, required: true, trim: true, maxLength: 150 },
    event_position: {
      type: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },
    event_followers: { type: Array, default: [] }
  },
  {
    timestamps: true,
    collection: EVENT_COLLECTION_NAME
  }
)

export const EVENT_INVALID_UPDATE_FIELDS = ['_id', 'event_author', 'createdAt']

export const EventModel = mongoose.model<Event>(EVENT_DOCUMENT_NAME, eventSchema)
