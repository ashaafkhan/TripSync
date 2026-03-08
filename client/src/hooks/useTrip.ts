import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tripService } from '../services/tripService';
import type { Trip, User } from '../types';
import toast from 'react-hot-toast';

export function useTrips() {
  return useQuery({
    queryKey: ['trips'],
    queryFn: () => tripService.getTrips(),
  });
}

export function useTrip(id: string) {
  return useQuery({
    queryKey: ['trip', id],
    queryFn: () => tripService.getTrip(id),
    enabled: !!id,
  });
}

// Derives populated user objects from trip.members — backend populates members.user automatically
export function useTripMembers(trip: Trip | undefined | null): { data: User[] } {
  const users: User[] = (trip?.members ?? []).map((m: any) => ({
    id: m.user?._id ?? m.user?.id ?? m.userId,
    name: m.user?.name ?? '',
    email: m.user?.email ?? '',
    avatar: m.user?.avatar,
  }));
  return { data: users };
}

export function useCreateTrip() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Trip>) => tripService.createTrip(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trips'] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateTrip() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Trip> }) => tripService.updateTrip(id, data),
    onSuccess: (_r, vars) => {
      qc.invalidateQueries({ queryKey: ['trips'] });
      qc.invalidateQueries({ queryKey: ['trip', vars.id] });
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteTrip() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tripService.deleteTrip(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trips'] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useInviteMember(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ email, role }: { email: string; role: string }) => tripService.inviteMember(tripId, email, role),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trip', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateMemberRole(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) => tripService.updateMemberRole(tripId, userId, role),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trip', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useRemoveMember(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => tripService.removeMember(tripId, userId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trip', tripId] }),
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useLeaveTrip(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => tripService.leaveTrip(tripId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trips'] }),
    onError: (err: Error) => toast.error(err.message),
  });
}
