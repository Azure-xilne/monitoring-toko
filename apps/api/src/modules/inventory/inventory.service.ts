import { db } from '../../config/db';
import { stocks, stockMovements } from '../../db/schema';
import { eq, sql, lte } from 'drizzle-orm';
import { products } from '../../db/schema';

export class InventoryService {
  async getAll() {
    const result = await db.select().from(stocks)
      .leftJoin(products, eq(stocks.productId, products.id));
    return result;
  }

  async getLowStock() {
    const result = await db.select().from(stocks)
      .leftJoin(products, eq(stocks.productId, products.id))
      .where(sql`${stocks.quantity} <= ${stocks.minQuantity}`);
    return result;
  }

  async getStockSummary() {
    const total = await db.select({ count: sql<number>`count(*)` }).from(stocks);
    const safe = await db.select({ count: sql<number>`count(*)` }).from(stocks)
      .where(sql`${stocks.quantity} > ${stocks.minQuantity}`);
    const low = await db.select({ count: sql<number>`count(*)` }).from(stocks)
      .where(sql`${stocks.quantity} <= ${stocks.minQuantity} AND ${stocks.quantity} > 0`);
    const critical = await db.select({ count: sql<number>`count(*)` }).from(stocks)
      .where(sql`${stocks.quantity} <= 0`);

    return {
      total: Number(total[0].count),
      safe: Number(safe[0].count),
      low: Number(low[0].count),
      critical: Number(critical[0].count),
    };
  }

  async recordMovement(data: {
    productId: string;
    type: 'IN' | 'OUT' | 'ADJUST';
    quantity: number;
    reason?: string;
    userId?: string;
  }) {
    // Record the movement
    const movement = await db.insert(stockMovements).values(data).returning();

    // Update stock quantity
    const currentStock = await db.select().from(stocks).where(eq(stocks.productId, data.productId));

    if (currentStock.length === 0) {
      // Create stock entry if it doesn't exist
      await db.insert(stocks).values({
        productId: data.productId,
        quantity: data.type === 'OUT' ? -data.quantity : data.quantity,
      });
    } else {
      const delta = data.type === 'OUT' ? -data.quantity : data.quantity;
      await db.update(stocks)
        .set({
          quantity: currentStock[0].quantity + delta,
          updatedAt: new Date()
        })
        .where(eq(stocks.productId, data.productId));
    }

    return movement[0];
  }

  async getMovements(query?: { productId?: string; page?: number; limit?: number }) {
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const offset = (page - 1) * limit;

    let q = db.select().from(stockMovements)
      .leftJoin(products, eq(stockMovements.productId, products.id))
      .limit(limit)
      .offset(offset)
      .orderBy(sql`${stockMovements.createdAt} DESC`);

    return q;
  }
}

export const inventoryService = new InventoryService();
