import api from './api';
import type { Expense } from '../types';

function normalizeExpense(e: any): Expense {
  const paidBy = e.paidBy?._id ?? e.paidBy?.id ?? e.paidBy ?? '';
  return { ...e, id: e._id ?? e.id, tripId: e.trip ?? e.tripId, paidBy: String(paidBy) };
}

export const expenseService = {
  async getExpenses(tripId: string): Promise<{ expenses: Expense[]; summary: Record<string, number> }> {
    const res = await api.get(`/trips/${tripId}/expenses`) as any;
    return { expenses: (res.data ?? []).map(normalizeExpense), summary: {} };
  },

  async addExpense(tripId: string, data: Omit<Expense, 'id' | 'tripId'>): Promise<Expense> {
    const res = await api.post(`/trips/${tripId}/expenses`, data) as any;
    return normalizeExpense(res.data);
  },

  async updateExpense(tripId: string, expenseId: string, data: Partial<Expense>): Promise<Expense> {
    const res = await api.patch(`/trips/${tripId}/expenses/${expenseId}`, data) as any;
    return normalizeExpense(res.data);
  },

  async deleteExpense(tripId: string, expenseId: string): Promise<void> {
    await api.delete(`/trips/${tripId}/expenses/${expenseId}`);
  },
};
