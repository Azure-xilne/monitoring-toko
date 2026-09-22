import { Router, Request, Response } from 'express';
import { productService } from './product.service';
import { requireAuth, requireRole } from '../../middlewares/auth';

const router = Router();

// GET /api/products - List all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, category, page, limit } = req.query;
    const result = await productService.getAll({
      search: search as string,
      category: category as string,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/categories - List all categories
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllCategories();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// POST /api/products/categories - Create a category
router.post('/categories', async (req: Request, res: Response) => {
  try {
    const result = await productService.createCategory(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// GET /api/products/:id - Get product details
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await productService.getById(req.params.id);
    if (!result) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/products - Create a new product (Owner/Admin only)
router.post('/', async (req: Request, res: Response) => {
  try {
    const result = await productService.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const result = await productService.update(req.params.id, req.body);
    if (!result) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await productService.delete(req.params.id);
    if (!result) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted', data: result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
