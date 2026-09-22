import { Router, Request, Response } from 'express';
import { purchaseService } from './purchase.service';
import { requireAuth, requireRole } from '../../middlewares/auth';

const router = Router();

// GET /api/purchases/suppliers - List all suppliers
router.get('/suppliers', requireAuth, async (req: Request, res: Response) => {
  try {
    const result = await purchaseService.getAllSuppliers();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
});

// POST /api/purchases/suppliers - Create supplier
router.post('/suppliers', requireAuth, requireRole('OWNER', 'ADMIN'), async (req: Request, res: Response) => {
  try {
    const result = await purchaseService.createSupplier(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create supplier' });
  }
});

// GET /api/purchases - List purchase orders
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const result = await purchaseService.getAllPOs({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch purchase orders' });
  }
});

// GET /api/purchases/:id - Get PO details with items
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const result = await purchaseService.getPOById(req.params.id);
    if (!result) {
      res.status(404).json({ error: 'Purchase order not found' });
      return;
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch purchase order' });
  }
});

// POST /api/purchases - Create a new PO
router.post('/', requireAuth, requireRole('OWNER', 'ADMIN'), async (req: Request, res: Response) => {
  try {
    const result = await purchaseService.createPO(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create purchase order' });
  }
});

// POST /api/purchases/:id/receive - Mark PO as completed and update inventory
router.post('/:id/receive', requireAuth, requireRole('OWNER', 'ADMIN'), async (req: Request, res: Response) => {
  try {
    const result = await purchaseService.receivePO(req.params.id);
    if (!result) {
      res.status(404).json({ error: 'Purchase order not found' });
      return;
    }
    res.json({ message: 'PO received and stock updated', data: result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to receive PO' });
  }
});

export default router;
