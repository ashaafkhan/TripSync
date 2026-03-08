import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fileService } from '../services/fileService';
import { reservationService } from '../services/reservationService';
import type { Reservation } from '../types';
import toast from 'react-hot-toast';

export function useFiles(tripId: string) {
  return useQuery({
    queryKey: ['files', tripId],
    queryFn: () => fileService.getFiles(tripId),
    enabled: !!tripId,
  });
}

export function useUploadFile(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => fileService.uploadFile(tripId, formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['files', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteFile(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (fileId: string) => fileService.deleteFile(tripId, fileId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['files', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useReservations(tripId: string) {
  return useQuery({
    queryKey: ['reservations', tripId],
    queryFn: () => reservationService.getReservations(tripId),
    enabled: !!tripId,
  });
}

export function useAddReservation(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Reservation, 'id' | 'tripId' | 'confirmedBy'>) =>
      reservationService.addReservation(tripId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reservations', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteReservation(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (resId: string) => reservationService.deleteReservation(tripId, resId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reservations', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}
