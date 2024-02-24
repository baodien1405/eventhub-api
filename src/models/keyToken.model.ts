import mongoose, { Document, Schema } from 'mongoose'

const KEY_TOKEN_DOCUMENT_NAME = 'Key'
const KEY_TOKEN_COLLECTION_NAME = 'keys'

interface KeyToken extends Document {
  user: mongoose.Types.ObjectId
  publicKey: string
  privateKey: string
  refreshTokensUsed: string[]
  refreshToken: string
}

const keyTokenSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'Shop' },
    publicKey: { type: String, required: true },
    privateKey: { type: String, required: true },
    refreshTokensUsed: { type: Array, default: [] },
    refreshToken: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: KEY_TOKEN_COLLECTION_NAME
  }
)

export const KeyTokenModel = mongoose.model<KeyToken>(KEY_TOKEN_DOCUMENT_NAME, keyTokenSchema)
