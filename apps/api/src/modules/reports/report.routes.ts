import { Router, Request, Response } from 'express';
import { reportService } from './report.service';
import { requireAuth, requireRole } from '../../middlewares/auth';

const router = Router();

// GET /api/reports/dashboard - Aggregate stats for main dashboard
router.get('/dashboard', requireAuth, async (req: Request, res: Response) => {
  try {
    const stats = await reportService.getDashboardStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// GET /api/reports/sales-chart - Sales trend chart data
router.get('/sales-chart', requireAuth, async (req: Request, res: Response) => {
  try {
    const days = req.query.days ? Number(req.query.days) : 7;
    const result = await reportService.getSalesChart(days);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sales chart' });
  }
});

// GET /api/reports/profit-loss - Revenue vs COGS over a date range
router.get('/profit-loss', requireAuth, requireRole('OWNER', 'ADMIN'), async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      res.status(400).json({ error: 'startDate and endDate query params are required (YYYY-MM-DD)' });
      return;
    }
    const result = await reportService.getProfitLoss(startDate as string, endDate as string);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profit/loss report' });
  }
});

// GET /api/reports/category-breakdown - Revenue by product category
router.get('/category-breakdown', requireAuth, requireRole('OWNER', 'ADMIN'), async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      res.status(400).json({ error: 'startDate and endDate query params are required (YYYY-MM-DD)' });
      return;
    }
    const result = await reportService.getCategoryBreakdown(startDate as string, endDate as string);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch category breakdown' });
  }
});

export default router;
