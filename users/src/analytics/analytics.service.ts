import CreateAnalyticsDto from './dto/create_analytics.dto';
import AnalyticsModel from './models/analytics.model';

class AnalyticsService {
  async getAllAnalytics({
    limit,
    offset,
    userId,
    action,
  }: {
    limit: number;
    offset: number;
    userId: string;
    action: string;
  }) {
    const params = {}
    if (userId) params['requestUserId'] = userId
    if (action) params['action'] = action
    return await AnalyticsModel.find(params).skip(offset).limit(limit);
  }

  async createAnalytics(analyticsData: CreateAnalyticsDto) {
    return await AnalyticsModel.create(analyticsData);
  }
}

export default new AnalyticsService();
