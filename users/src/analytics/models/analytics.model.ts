import { Document, Schema, model } from 'mongoose';

export const ACTIONS = {
  LOGIN: 'auth.login',
  LOGOUT: 'auth.logout',
  REGISTER: 'auth.register',
  UPDATE: 'user.update',
  CREATE: 'user.create',
  DELETE: 'user.delete',
  CHANGE_PASSWORD: 'user.change_password',
  CHANGE_EMAIL: 'user.change_email',
  RESET_PASSWORD: 'user.reset_password'
}

export interface IAnalytics extends Document {
  action: string,
  requestUserId: string,
  payload: unknown,
}

const AnalyticsSchema = new Schema<IAnalytics>(
  {
    action: { type: String },
    requestUserId: { type: String },
    payload: { type: {} },
  },
  {
    timestamps: true,
  },
);

export default model('Analytics', AnalyticsSchema);
