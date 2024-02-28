import mongoose, { Document } from 'mongoose'

const USER_DOCUMENT_NAME = 'User'
const USER_COLLECTION_NAME = 'users'

interface User extends Document {
  fullName: string
  email: string
  password: string
  avatar: string
}

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true, maxLength: 150 },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String },
    avatar: { type: String }
  },
  {
    timestamps: true,
    collection: USER_COLLECTION_NAME
  }
)

export const UserModel = mongoose.model<User>(USER_DOCUMENT_NAME, userSchema)
