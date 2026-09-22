import { Router, Request, Response } from 'express';
import { inventoryService } from './inventory.service';
import { requireAuth, requireRole } from '../../middlewares/auth';

const router = Router();

// GET /api/inventory - View current stock levels
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await inventoryService.getAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// GET /api/inventory/summary - Get stock summary counts
router.get('/summary', async (req: Request, res: Response) => {
  try {
    const result = await inventoryService.getStockSummary();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stock summary' });
  }
});

// GET /api/inventory/low-stock - Get items below minimum
router.get('/low-stock', async (req: Request, res: Response) => {
  try {
    const result = await inventoryService.getLowStock();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch low stock items' });
  }
});

// POST /api/inventory/movement - Record a manual stock adjustment
router.post('/movement', async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await inventoryService.recordMovement({
      ...req.body,
      userId: user.id,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to record movement' });
  }
});

// GET /api/inventory/movements - View stock movement history
router.get('/movements', async (req: Request, res: Response) => {
  try {
    const { productId, page, limit } = req.query;
    const result = await inventoryService.getMovements({
      productId: productId as string,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movements' });
  }
});

export default router;
