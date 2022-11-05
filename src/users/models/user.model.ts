import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  auth0Id: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  auth0Id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
});

userSchema.index({ email: 1 });

export default model('User', userSchema);
