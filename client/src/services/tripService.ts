import api from './api';
import type { Trip } from '../types';

function normalizeTrip(t: any): Trip {
  return {
    ...t,
    id: t._id ?? t.id,
    members: (t.members ?? []).map((m: any) => ({
      userId: m.user?._id ?? m.user?.id ?? m.userId,
      role: m.role,
      user: m.user,
    })),
  };
}

export const tripService = {
  async getTrips(): Promise<Trip[]> {
    const res = await api.get('/trips') as any;
    return (res.data ?? []).map(normalizeTrip);
  },

  async getTrip(tripId: string): Promise<Trip> {
    const res = await api.get(`/trips/${tripId}`) as any;
    return normalizeTrip(res.data);
  },

  async createTrip(data: Partial<Trip>): Promise<Trip> {
    const res = await api.post('/trips', data) as any;
    return normalizeTrip(res.data);
  },

  async updateTrip(tripId: string, data: Partial<Trip>): Promise<Trip> {
    const res = await api.patch(`/trips/${tripId}`, data) as any;
    return normalizeTrip(res.data);
  },

  async deleteTrip(tripId: string): Promise<void> {
    await api.delete(`/trips/${tripId}`);
  },

  async inviteMember(tripId: string, email: string, role: string): Promise<Trip> {
    const res = await api.post(`/trips/${tripId}/invite`, { email, role }) as any;
    return normalizeTrip(res.data);
  },

  async updateMemberRole(tripId: string, userId: string, role: string): Promise<Trip> {
    const res = await api.patch(`/trips/${tripId}/members/${userId}`, { role }) as any;
    return normalizeTrip(res.data);
  },

  async removeMember(tripId: string, userId: string): Promise<Trip> {
    const res = await api.delete(`/trips/${tripId}/members/${userId}`) as any;
    return normalizeTrip(res.data);
  },

  async leaveTrip(tripId: string): Promise<void> {
    await api.post(`/trips/${tripId}/leave`);
  },
};
