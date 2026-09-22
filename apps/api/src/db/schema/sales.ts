import { pgTable, text, timestamp, integer, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';
import { products } from './products';

export const shiftStatusEnum = pgEnum('shiftStatus', ['ACTIVE', 'CLOSED']);

export const shifts = pgTable('shifts', {
  id: uuid('id').defaultRandom().primaryKey(),
  cashierId: text('cashierId').notNull().references(() => users.id),
  startTime: timestamp('startTime').defaultNow().notNull(),
  endTime: timestamp('endTime'),
  startingCash: integer('startingCash').notNull().default(0),
  endingCash: integer('endingCash'),
  status: shiftStatusEnum('status').default('ACTIVE').notNull()
});

export const paymentMethodEnum = pgEnum('paymentMethod', ['CASH', 'CARD', 'QRIS', 'TRANSFER']);
export const saleStatusEnum = pgEnum('saleStatus', ['COMPLETED', 'REFUNDED']);

export const sales = pgTable('sales', {
  id: text('id').primaryKey(), // Using text for custom invoice numbers like INV-001
  shiftId: uuid('shiftId').references(() => shifts.id),
  cashierId: text('cashierId').notNull().references(() => users.id),
  totalAmount: integer('totalAmount').notNull(),
  paymentMethod: paymentMethodEnum('paymentMethod').notNull(),
  status: saleStatusEnum('status').default('COMPLETED').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull()
});

export const saleItems = pgTable('sale_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  saleId: text('saleId').notNull().references(() => sales.id),
  productId: uuid('productId').notNull().references(() => products.id),
  quantity: integer('quantity').notNull(),
  unitPrice: integer('unitPrice').notNull(),
  subtotal: integer('subtotal').notNull()
});
