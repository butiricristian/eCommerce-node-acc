import * as mongoose from 'mongoose'
import debug from 'debug'

const mongooseUrl = process.env.MONGODB_URL || 'mongodb://localhost/users-repository';
const log = debug('app:mongoose:service')

export const connectDatabase = async () => {
  log('Connecting to MongoDB...')
  await mongoose.connect(mongooseUrl)
  log('Connection Successful')
}