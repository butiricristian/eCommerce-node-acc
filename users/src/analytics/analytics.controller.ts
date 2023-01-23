import { Request, Response } from 'express';
import analyticsService from './analytics.service';

class AnalyticsController {
  async getAnalytics(req: Request, res: Response) {
    const limit = parseInt(req.query.limit?.toString());
    const offset = parseInt(req.query.offset?.toString());
    const userId = req.query.userId?.toString();
    const action = req.query.action?.toString();
    const analytics = await analyticsService.getAllAnalytics({ limit, offset, userId, action });
    res.send({ analytics });
  }
}

export default new AnalyticsController();
