import { pgTable, text, timestamp, integer, uuid } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description')
});

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  sku: text('sku').notNull().unique(),
  barcode: text('barcode'),
  categoryId: uuid('categoryId').references(() => categories.id),
  price: integer('price').notNull(),
  costPrice: integer('costPrice'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
});
