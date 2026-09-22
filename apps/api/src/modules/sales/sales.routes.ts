import { Router, Request, Response } from 'express';
import { salesService } from './sales.service';
import { requireAuth, requireRole } from '../../middlewares/auth';

const router = Router();

// POST /api/sales/shifts/start - Open a new cashier shift
router.post('/shifts/start', async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { startingCash } = req.body;
    const result = await salesService.startShift(user.id, startingCash || 0);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to start shift' });
  }
});

// POST /api/sales/shifts/end - Close current shift
router.post('/shifts/end', async (req: Request, res: Response) => {
  try {
    const { shiftId, endingCash } = req.body;
    const result = await salesService.endShift(shiftId, endingCash || 0);
    if (!result) {
      res.status(404).json({ error: 'Shift not found' });
      return;
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to end shift' });
  }
});

// GET /api/sales/shifts/active - Get active shift for current user
router.get('/shifts/active', async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await salesService.getActiveShift(user.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch active shift' });
  }
});

// POST /api/sales - Process a new sale transaction
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await salesService.createSale({
      ...req.body,
      cashierId: user.id,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to process sale' });
  }
});

// GET /api/sales/history - View past sales
router.get('/history', async (req: Request, res: Response) => {
  try {
    const { date, cashierId, page, limit } = req.query;
    const result = await salesService.getHistory({
      date: date as string,
      cashierId: cashierId as string,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sales history' });
  }
});

// GET /api/sales/:id - Get sale detail with items
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await salesService.getSaleById(req.params.id);
    if (!result) {
      res.status(404).json({ error: 'Sale not found' });
      return;
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sale' });
  }
});

export default router;
