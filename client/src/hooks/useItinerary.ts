import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itineraryService } from '../services/itineraryService';
import type { Activity, ItineraryDay } from '../types';
import toast from 'react-hot-toast';

export function useItinerary(tripId: string) {
  return useQuery({
    queryKey: ['itinerary', tripId],
    queryFn: () => itineraryService.getItinerary(tripId),
    enabled: !!tripId,
  });
}

export function useAddDay(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (date: string) => itineraryService.addDay(tripId, date),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['itinerary', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateDay(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ dayId, data }: { dayId: string; data: Partial<ItineraryDay> }) =>
      itineraryService.updateDay(tripId, dayId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['itinerary', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteDay(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dayId: string) => itineraryService.deleteDay(tripId, dayId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['itinerary', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useAddActivity(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ dayId, activity }: { dayId: string; activity: Omit<Activity, 'id' | 'order'> }) =>
      itineraryService.addActivity(tripId, dayId, activity),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['itinerary', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateActivity(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ activityId, data }: { activityId: string; data: Partial<Activity> }) =>
      itineraryService.updateActivity(tripId, activityId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['itinerary', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteActivity(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (activityId: string) => itineraryService.deleteActivity(tripId, activityId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['itinerary', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useReorderActivities(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ dayId, orderedIds }: { dayId: string; orderedIds: string[] }) =>
      itineraryService.reorderActivities(tripId, dayId, orderedIds),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['itinerary', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}
