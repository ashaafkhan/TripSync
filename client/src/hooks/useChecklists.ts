import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { checklistService } from '../services/checklistService';
import toast from 'react-hot-toast';

export function useChecklists(tripId: string) {
  return useQuery({
    queryKey: ['checklists', tripId],
    queryFn: () => checklistService.getChecklists(tripId),
    enabled: !!tripId,
  });
}

export function useAddChecklistItem(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ listType, label }: { listType: 'packing' | 'todo'; label: string }) =>
      checklistService.addItem(tripId, listType, label),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['checklists', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useToggleChecklistItem(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ listType, itemId, completed }: { listType: 'packing' | 'todo'; itemId: string; completed: boolean }) =>
      checklistService.updateItem(tripId, listType, itemId, { completed }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['checklists', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteChecklistItem(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ listType, itemId }: { listType: 'packing' | 'todo'; itemId: string }) =>
      checklistService.deleteItem(tripId, listType, itemId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['checklists', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}
