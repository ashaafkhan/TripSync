import type { Expense } from '../types';

export interface SplitResult {
  userId: string;
  totalPaid: number;
  share: number;
  balance: number;
}

export function calculateSplit(expenses: Expense[], memberIds: string[]): SplitResult[] {
  if (!memberIds.length) return [];

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const perPersonShare = totalSpent / memberIds.length;

  const paidByMember: Record<string, number> = {};
  memberIds.forEach((id) => (paidByMember[id] = 0));
  expenses.forEach((e) => {
    if (paidByMember[e.paidBy] !== undefined) {
      paidByMember[e.paidBy] += e.amount;
    }
  });

  return memberIds.map((userId) => ({
    userId,
    totalPaid: paidByMember[userId] ?? 0,
    share: perPersonShare,
    balance: (paidByMember[userId] ?? 0) - perPersonShare,
  }));
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}
