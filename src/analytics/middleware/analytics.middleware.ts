import analyticsService from '../analytics.service';
import { EventEmitter } from 'events';

export const eventEmitter = new EventEmitter();

eventEmitter.on('track', (data) => {
  analyticsService.createAnalytics(data);
});
