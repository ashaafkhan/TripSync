import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { commentService } from '../services/commentService';
import toast from 'react-hot-toast';

export function useComments(tripId: string, refType: string, refId: string) {
  return useQuery({
    queryKey: ['comments', tripId, refType, refId],
    queryFn: () => commentService.getComments(tripId, refType, refId),
    enabled: !!tripId && !!refType && !!refId,
  });
}

export function useAddComment(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { text: string; refType: string; refId: string; parentComment?: string }) =>
      commentService.addComment(tripId, data),
    onSuccess: (_r, vars) => qc.invalidateQueries({ queryKey: ['comments', tripId, vars.refType, vars.refId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateComment(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, text }: { commentId: string; text: string }) =>
      commentService.updateComment(tripId, commentId, text),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['comments', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteComment(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => commentService.deleteComment(tripId, commentId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['comments', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}
