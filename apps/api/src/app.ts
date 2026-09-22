import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { toNodeHandler } from 'better-auth/node';
import { auth } from './config/auth';

// Route imports
import productRoutes from './modules/products/product.routes';
import inventoryRoutes from './modules/inventory/inventory.routes';
import purchaseRoutes from './modules/purchase/purchase.routes';
import salesRoutes from './modules/sales/sales.routes';
import scheduleRoutes from './modules/schedule/schedule.routes';
import reportRoutes from './modules/reports/report.routes';

// Middleware imports
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Mount Better Auth middleware
app.all('/api/auth/*', toNodeHandler(auth));

// Mount API routes
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/reports', reportRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Global error handler
app.use(errorHandler);

export default app;
