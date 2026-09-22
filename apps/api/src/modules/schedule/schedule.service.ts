import { db } from '../../config/db';
import { schedules } from '../../db/schema';
import { eq, sql, and, gte, lte } from 'drizzle-orm';

export class ScheduleService {
  async getAll(query?: { date?: string; picId?: string; page?: number; limit?: number }) {
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const offset = (page - 1) * limit;

    const result = await db.select().from(schedules)
      .limit(limit)
      .offset(offset)
      .orderBy(sql`${schedules.startTime} ASC`);

    return result;
  }

  async getByDate(date: string) {
    // Get all schedules for a given date (YYYY-MM-DD)
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const result = await db.select().from(schedules)
      .where(and(
        gte(schedules.startTime, startOfDay),
        lte(schedules.startTime, endOfDay)
      ))
      .orderBy(sql`${schedules.startTime} ASC`);

    return result;
  }

  async create(data: {
    title: string;
    type: 'VISIT' | 'MEETING' | 'FOLLOW_UP';
    startTime: Date;
    endTime: Date;
    location?: string;
    picId?: string;
    notes?: string;
  }) {
    const result = await db.insert(schedules).values(data).returning();
    return result[0];
  }

  async update(id: string, data: Partial<{
    title: string;
    type: 'VISIT' | 'MEETING' | 'FOLLOW_UP';
    startTime: Date;
    endTime: Date;
    location: string;
    picId: string;
    notes: string;
  }>) {
    const result = await db.update(schedules)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schedules.id, id))
      .returning();
    return result[0] || null;
  }

  async delete(id: string) {
    const result = await db.delete(schedules).where(eq(schedules.id, id)).returning();
    return result[0] || null;
  }
}

export const scheduleService = new ScheduleService();
