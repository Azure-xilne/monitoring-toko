import { pgTable, text, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const scheduleTypeEnum = pgEnum('scheduleType', ['VISIT', 'MEETING', 'FOLLOW_UP']);

export const schedules = pgTable('schedules', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  type: scheduleTypeEnum('type').notNull(),
  startTime: timestamp('startTime').notNull(),
  endTime: timestamp('endTime').notNull(),
  location: text('location'),
  picId: text('picId').references(() => users.id), // the user/sales person
  notes: text('notes'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
});
