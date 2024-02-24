import mongoose from 'mongoose'
import { env } from '@/config'

export const connectDB = async () => {
  await mongoose.connect(env.MONGODB_URI, {
    maxPoolSize: 50,
    dbName: env.DATABASE_NAME
  })
}

export const closeDB = async () => {
  await mongoose.connection.close()
}
