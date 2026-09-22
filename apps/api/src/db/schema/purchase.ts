import { pgTable, text, timestamp, integer, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { products } from './products';

export const suppliers = pgTable('suppliers', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  contactName: text('contactName'),
  phone: text('phone'),
  email: text('email'),
  address: text('address')
});

export const poStatusEnum = pgEnum('poStatus', ['PENDING', 'COMPLETED', 'CANCELLED']);

export const purchaseOrders = pgTable('purchase_orders', {
  id: text('id').primaryKey(), // Using text for custom PO numbers like PO-0042
  supplierId: uuid('supplierId').references(() => suppliers.id),
  status: poStatusEnum('status').default('PENDING').notNull(),
  totalAmount: integer('totalAmount').notNull().default(0),
  createdAt: timestamp('createdAt').defaultNow().notNull()
});

export const purchaseOrderItems = pgTable('purchase_order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  poId: text('poId').notNull().references(() => purchaseOrders.id),
  productId: uuid('productId').notNull().references(() => products.id),
  quantity: integer('quantity').notNull(),
  unitCost: integer('unitCost').notNull(),
  totalCost: integer('totalCost').notNull()
});
