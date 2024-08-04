export interface Event {
  event_title: string
  event_description: string
  event_start_at: Date
  event_end_at: Date
  event_date: Date
  event_invite_users: string[]
  event_thumbnail_url: string
  event_category: string
  event_price: string
  event_author: string
  event_location_name: string
  event_address: string
  event_position: {
    lat: number
    lng: number
  }
}

export interface QueryEventParams {
  limit: number
  page: number
  search: string
  category: string
  lat: number | null
  lng: number | null
  distance: number | null
  date: string | null
  order: string
  sort_by: string
  select: string[]
}
