import { Document, Schema, model, Date } from 'mongoose';

export const ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
};

interface Address {
  address: string;
  city: string;
  postalCode: string;
  state: string;
  primary: boolean;
  label: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  auth0Id: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  dateOfBirth: Date;
  avatar: string;
  addresses: ArrayLike<Address>;
  status: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: [true, 'Username is required'], unique: true },
    auth0Id: { type: String, required: [true, 'Auth0Id is required'], unique: true },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    password: { type: String, select: false },
    firstName: { type: String, required: [true, 'First Name is required'] },
    lastName: { type: String, required: [true, 'Last Name is required'] },
    role: { type: String, required: [true, 'Role is required'], enum: ROLES, default: 'customer' },
    gender: { type: String, enum: ['MALE', 'FEMALE'], default: 'MALE' },
    phone: { type: String },
    dateOfBirth: { type: Date },
    avatar: { type: String },
    addresses: { type: [] },
    status: { type: String, required: [true, 'Status is required'], enum: ['active', 'closed'], default: 'active' },
  },
  {
    timestamps: true,
  },
);

UserSchema.index({ email: 1 });

export default model('User', UserSchema);
