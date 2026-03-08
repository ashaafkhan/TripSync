import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseService } from '../services/expenseService';
import type { Expense } from '../types';
import toast from 'react-hot-toast';

export function useBudget(tripId: string) {
  return useQuery({
    queryKey: ['expenses', tripId],
    queryFn: () => expenseService.getExpenses(tripId),
    enabled: !!tripId,
  });
}

export function useAddExpense(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (expense: Omit<Expense, 'id' | 'tripId'>) => expenseService.addExpense(tripId, expense),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['expenses', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateExpense(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ expenseId, data }: { expenseId: string; data: Partial<Expense> }) =>
      expenseService.updateExpense(tripId, expenseId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['expenses', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteExpense(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (expenseId: string) => expenseService.deleteExpense(tripId, expenseId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['expenses', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}
