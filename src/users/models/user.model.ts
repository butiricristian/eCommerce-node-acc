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

const AddressSchema = new Schema<Address>({
  address: { type: String },
  city: { type: String },
  postalCode: { type: String },
  state: { type: String },
  primary: { type: Boolean },
  label: { type: String },
})

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
    username: { type: String, required: true, unique : true },
    auth0Id: { type: String, required: true, unique : true },
    email: { type: String, required: true, unique : true },
    password: { type: String, required: true, select: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true, enum: ROLES, default: 'customer'},
    gender: { type: String },
    phone: { type: String },
    dateOfBirth: { type: Date},
    avatar: { type: String },
    addresses: { type: [AddressSchema] },
    status: { type: String, required: true, enum: ['active', 'closed'], default: 'active' }
  },
  {
    timestamps: true,
  },
);

UserSchema.index({ email: 1 });

export default model('User', UserSchema);
