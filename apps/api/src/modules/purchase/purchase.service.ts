import { db } from '../../config/db';
import { purchaseOrders, purchaseOrderItems, suppliers } from '../../db/schema';
import { stocks } from '../../db/schema';
import { eq, sql } from 'drizzle-orm';

export class PurchaseService {
  // Suppliers
  async getAllSuppliers() {
    return db.select().from(suppliers);
  }

  async createSupplier(data: { name: string; contactName?: string; phone?: string; email?: string; address?: string }) {
    const result = await db.insert(suppliers).values(data).returning();
    return result[0];
  }

  // Purchase Orders
  async getAllPOs(query?: { page?: number; limit?: number }) {
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const offset = (page - 1) * limit;

    const result = await db.select().from(purchaseOrders)
      .leftJoin(suppliers, eq(purchaseOrders.supplierId, suppliers.id))
      .limit(limit)
      .offset(offset)
      .orderBy(sql`${purchaseOrders.createdAt} DESC`);

    return result;
  }

  async getPOById(id: string) {
    const po = await db.select().from(purchaseOrders)
      .leftJoin(suppliers, eq(purchaseOrders.supplierId, suppliers.id))
      .where(eq(purchaseOrders.id, id));

    if (po.length === 0) return null;

    const items = await db.select().from(purchaseOrderItems)
      .where(eq(purchaseOrderItems.poId, id));

    return { ...po[0], items };
  }

  async createPO(data: { id: string; supplierId: string; items: { productId: string; quantity: number; unitCost: number }[] }) {
    const totalAmount = data.items.reduce((sum, item) => sum + item.unitCost * item.quantity, 0);

    const po = await db.insert(purchaseOrders).values({
      id: data.id,
      supplierId: data.supplierId,
      totalAmount,
    }).returning();

    const itemsToInsert = data.items.map(item => ({
      poId: data.id,
      productId: item.productId,
      quantity: item.quantity,
      unitCost: item.unitCost,
      totalCost: item.unitCost * item.quantity,
    }));

    await db.insert(purchaseOrderItems).values(itemsToInsert);

    return po[0];
  }

  async receivePO(id: string) {
    // Mark PO as COMPLETED
    const po = await db.update(purchaseOrders)
      .set({ status: 'COMPLETED' })
      .where(eq(purchaseOrders.id, id))
      .returning();

    if (po.length === 0) return null;

    // Get PO items and update stock for each
    const items = await db.select().from(purchaseOrderItems)
      .where(eq(purchaseOrderItems.poId, id));

    for (const item of items) {
      const currentStock = await db.select().from(stocks)
        .where(eq(stocks.productId, item.productId));

      if (currentStock.length === 0) {
        await db.insert(stocks).values({
          productId: item.productId,
          quantity: item.quantity,
        });
      } else {
        await db.update(stocks)
          .set({
            quantity: currentStock[0].quantity + item.quantity,
            updatedAt: new Date()
          })
          .where(eq(stocks.productId, item.productId));
      }
    }

    return po[0];
  }
}

export const purchaseService = new PurchaseService();
