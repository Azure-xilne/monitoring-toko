import { pgTable, text, timestamp, integer, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { products } from './products';
import { users } from './users';

export const stocks = pgTable('stocks', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('productId').notNull().references(() => products.id),
  quantity: integer('quantity').notNull().default(0),
  minQuantity: integer('minQuantity').notNull().default(10),
  location: text('location'),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
});

export const movementTypeEnum = pgEnum('movementType', ['IN', 'OUT', 'ADJUST']);

export const stockMovements = pgTable('stock_movements', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('productId').notNull().references(() => products.id),
  type: movementTypeEnum('type').notNull(),
  quantity: integer('quantity').notNull(),
  reason: text('reason'),
  userId: text('userId').references(() => users.id),
  createdAt: timestamp('createdAt').defaultNow().notNull()
});
