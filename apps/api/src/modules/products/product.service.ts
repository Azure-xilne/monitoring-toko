import { db } from '../../config/db';
import { products, categories } from '../../db/schema';
import { eq, ilike, sql } from 'drizzle-orm';

export class ProductService {
  async getAll(query?: { search?: string; category?: string; page?: number; limit?: number }) {
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const offset = (page - 1) * limit;

    let conditions: any[] = [];
    if (query?.search) {
      conditions.push(
        sql`${products.name} ILIKE ${'%' + query.search + '%'} OR ${products.sku} ILIKE ${'%' + query.search + '%'}`
      );
    }

    const result = await db.select().from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .limit(limit)
      .offset(offset);

    const total = await db.select({ count: sql<number>`count(*)` }).from(products);

    return {
      data: result,
      pagination: { page, limit, total: Number(total[0].count) }
    };
  }

  async getById(id: string) {
    const result = await db.select().from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.id, id));
    return result[0] || null;
  }

  async create(data: { name: string; sku: string; barcode?: string; categoryId?: string; price: number; costPrice?: number }) {
    const result = await db.insert(products).values(data).returning();
    return result[0];
  }

  async update(id: string, data: Partial<{ name: string; sku: string; barcode: string; categoryId: string; price: number; costPrice: number }>) {
    const result = await db.update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return result[0] || null;
  }

  async delete(id: string) {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result[0] || null;
  }

  // Categories
  async getAllCategories() {
    return db.select().from(categories);
  }

  async createCategory(data: { name: string; description?: string }) {
    const result = await db.insert(categories).values(data).returning();
    return result[0];
  }
}

export const productService = new ProductService();
