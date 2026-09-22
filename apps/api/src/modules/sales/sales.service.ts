import { db } from '../../config/db';
import { sales, saleItems, shifts, stocks } from '../../db/schema';
import { products } from '../../db/schema';
import { eq, sql, and } from 'drizzle-orm';

export class SalesService {
  // Shifts
  async startShift(cashierId: string, startingCash: number) {
    const result = await db.insert(shifts).values({
      cashierId,
      startingCash,
    }).returning();
    return result[0];
  }

  async endShift(shiftId: string, endingCash: number) {
    const result = await db.update(shifts)
      .set({ endTime: new Date(), endingCash, status: 'CLOSED' })
      .where(eq(shifts.id, shiftId))
      .returning();
    return result[0] || null;
  }

  async getActiveShift(cashierId: string) {
    const result = await db.select().from(shifts)
      .where(and(eq(shifts.cashierId, cashierId), eq(shifts.status, 'ACTIVE')));
    return result[0] || null;
  }

  // Sales / Transactions
  async createSale(data: {
    id: string; // Invoice number, e.g. INV-001
    shiftId?: string;
    cashierId: string;
    paymentMethod: 'CASH' | 'CARD' | 'QRIS' | 'TRANSFER';
    items: { productId: string; quantity: number; unitPrice: number }[];
  }) {
    const totalAmount = data.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    // Insert sale record
    const sale = await db.insert(sales).values({
      id: data.id,
      shiftId: data.shiftId,
      cashierId: data.cashierId,
      totalAmount,
      paymentMethod: data.paymentMethod,
    }).returning();

    // Insert sale items
    const itemsToInsert = data.items.map(item => ({
      saleId: data.id,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.unitPrice * item.quantity,
    }));
    await db.insert(saleItems).values(itemsToInsert);

    // Deduct stock for each item
    for (const item of data.items) {
      const currentStock = await db.select().from(stocks).where(eq(stocks.productId, item.productId));
      if (currentStock.length > 0) {
        await db.update(stocks)
          .set({
            quantity: currentStock[0].quantity - item.quantity,
            updatedAt: new Date()
          })
          .where(eq(stocks.productId, item.productId));
      }
    }

    return sale[0];
  }

  async getHistory(query?: { date?: string; cashierId?: string; page?: number; limit?: number }) {
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const offset = (page - 1) * limit;

    const result = await db.select().from(sales)
      .limit(limit)
      .offset(offset)
      .orderBy(sql`${sales.createdAt} DESC`);

    return result;
  }

  async getSaleById(id: string) {
    const sale = await db.select().from(sales).where(eq(sales.id, id));
    if (sale.length === 0) return null;

    const items = await db.select().from(saleItems)
      .leftJoin(products, eq(saleItems.productId, products.id))
      .where(eq(saleItems.saleId, id));

    return { ...sale[0], items };
  }
}

export const salesService = new SalesService();
