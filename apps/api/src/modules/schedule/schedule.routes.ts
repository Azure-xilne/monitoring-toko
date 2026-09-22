import { Router, Request, Response } from 'express';
import { scheduleService } from './schedule.service';
import { requireAuth, requireRole } from '../../middlewares/auth';

const router = Router();

// GET /api/schedule - List all schedules
router.get('/', async (req: Request, res: Response) => {
  try {
    const { date, picId, page, limit } = req.query;
    const result = await scheduleService.getAll({
      date: date as string,
      picId: picId as string,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch schedules' });
  }
});

// GET /api/schedule/date/:date - Get schedules for a specific date
router.get('/date/:date', async (req: Request, res: Response) => {
  try {
    const result = await scheduleService.getByDate(req.params.date);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch schedules for date' });
  }
});

// POST /api/schedule - Create a new schedule
router.post('/', requireAuth, requireRole('OWNER', 'ADMIN'), async (req: Request, res: Response) => {
  try {
    const result = await scheduleService.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create schedule' });
  }
});

// PUT /api/schedule/:id - Update schedule
router.put('/:id', requireAuth, requireRole('OWNER', 'ADMIN'), async (req: Request, res: Response) => {
  try {
    const result = await scheduleService.update(req.params.id, req.body);
    if (!result) {
      res.status(404).json({ error: 'Schedule not found' });
      return;
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update schedule' });
  }
});

// DELETE /api/schedule/:id - Delete schedule
router.delete('/:id', requireAuth, requireRole('OWNER', 'ADMIN'), async (req: Request, res: Response) => {
  try {
    const result = await scheduleService.delete(req.params.id);
    if (!result) {
      res.status(404).json({ error: 'Schedule not found' });
      return;
    }
    res.json({ message: 'Schedule deleted', data: result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete schedule' });
  }
});

export default router;
