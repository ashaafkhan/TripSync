import api from './api';
import type { Reservation } from '../types';

function normalizeReservation(r: any): Reservation {
  const confirmedBy = r.addedBy?._id ?? r.addedBy?.id ?? r.addedBy ?? r.confirmedBy ?? '';
  return {
    ...r,
    id: r._id ?? r.id,
    tripId: r.trip ?? r.tripId,
    name: r.title ?? r.name,
    confirmedBy: String(confirmedBy),
  };
}

export const reservationService = {
  async getReservations(tripId: string): Promise<Reservation[]> {
    const res = await api.get(`/trips/${tripId}/reservations`) as any;
    const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
    return list.map(normalizeReservation);
  },

  async addReservation(tripId: string, data: Omit<Reservation, 'id' | 'tripId' | 'confirmedBy'>): Promise<Reservation> {
    const res = await api.post(`/trips/${tripId}/reservations`, data) as any;
    return normalizeReservation(res.data);
  },

  async updateReservation(tripId: string, resId: string, data: Partial<Reservation>): Promise<Reservation> {
    const res = await api.patch(`/trips/${tripId}/reservations/${resId}`, data) as any;
    return normalizeReservation(res.data);
  },

  async deleteReservation(tripId: string, resId: string): Promise<void> {
    await api.delete(`/trips/${tripId}/reservations/${resId}`);
  },
};
