import { db } from '../../config/db';
import { sales, saleItems, stocks, products } from '../../db/schema';
import { sql, eq, gte, lte, and } from 'drizzle-orm';

export class ReportService {
  async getDashboardStats() {
    // Today's date range
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Revenue today
    const revenueToday = await db.select({
      total: sql<number>`COALESCE(SUM(${sales.totalAmount}), 0)`
    }).from(sales)
      .where(and(
        gte(sales.createdAt, todayStart),
        lte(sales.createdAt, todayEnd),
      ));

    // Transaction count today
    const transactionsToday = await db.select({
      count: sql<number>`count(*)`
    }).from(sales)
      .where(and(
        gte(sales.createdAt, todayStart),
        lte(sales.createdAt, todayEnd),
      ));

    // Total products
    const totalProducts = await db.select({
      count: sql<number>`count(*)`
    }).from(products);

    // Low stock count
    const lowStockCount = await db.select({
      count: sql<number>`count(*)`
    }).from(stocks)
      .where(sql`${stocks.quantity} <= ${stocks.minQuantity}`);

    return {
      revenueToday: Number(revenueToday[0].total),
      transactionsToday: Number(transactionsToday[0].count),
      totalProducts: Number(totalProducts[0].count),
      lowStockCount: Number(lowStockCount[0].count),
    };
  }

  async getSalesChart(days: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const result = await db.select({
      date: sql<string>`DATE(${sales.createdAt})`,
      total: sql<number>`COALESCE(SUM(${sales.totalAmount}), 0)`,
    }).from(sales)
      .where(gte(sales.createdAt, startDate))
      .groupBy(sql`DATE(${sales.createdAt})`)
      .orderBy(sql`DATE(${sales.createdAt})`);

    return result;
  }

  async getProfitLoss(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Total revenue from sales
    const revenue = await db.select({
      total: sql<number>`COALESCE(SUM(${sales.totalAmount}), 0)`
    }).from(sales)
      .where(and(gte(sales.createdAt, start), lte(sales.createdAt, end)));

    // COGS: sum of (costPrice * quantity) for each sale item in the period
    const cogs = await db.select({
      total: sql<number>`COALESCE(SUM(${products.costPrice} * ${saleItems.quantity}), 0)`
    }).from(saleItems)
      .innerJoin(sales, eq(saleItems.saleId, sales.id))
      .innerJoin(products, eq(saleItems.productId, products.id))
      .where(and(gte(sales.createdAt, start), lte(sales.createdAt, end)));

    const revenueAmount = Number(revenue[0].total);
    const cogsAmount = Number(cogs[0].total);
    const profit = revenueAmount - cogsAmount;
    const margin = revenueAmount > 0 ? ((profit / revenueAmount) * 100) : 0;

    return {
      revenue: revenueAmount,
      cogs: cogsAmount,
      profit,
      margin: Math.round(margin * 10) / 10,
    };
  }

  async getCategoryBreakdown(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const result = await db.execute(sql`
      SELECT c.name, COALESCE(SUM(si.subtotal), 0) as total
      FROM sale_items si
      JOIN sales s ON si."saleId" = s.id
      JOIN products p ON si."productId" = p.id
      LEFT JOIN categories c ON p."categoryId" = c.id
      WHERE s."createdAt" >= ${start} AND s."createdAt" <= ${end}
      GROUP BY c.name
      ORDER BY total DESC
    `);

    return result;
  }
}

export const reportService = new ReportService();
