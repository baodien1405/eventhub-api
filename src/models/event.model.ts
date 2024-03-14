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
  event_author_id: mongoose.Types.ObjectId
}

const eventSchema = new mongoose.Schema(
  {
    event_title: { type: String, required: true, trim: true, maxLength: 150 },
    event_description: { type: String },
    event_start_at: { type: Date },
    event_end_at: { type: Date },
    event_date: { type: Date },
    event_invite_users: { type: Array, default: [] },
    event_author_id: { type: mongoose.Schema.ObjectId, required: true },
    event_thumbnail_url: { type: String },
    event_category: { type: String, required: true },
    event_price: { type: Number, required: true }
  },
  {
    timestamps: true,
    collection: EVENT_COLLECTION_NAME
  }
)

export const EventModel = mongoose.model<Event>(EVENT_DOCUMENT_NAME, eventSchema)
