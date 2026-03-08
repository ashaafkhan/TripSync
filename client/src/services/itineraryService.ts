import api from './api';
import type { ItineraryDay, Activity } from '../types';

function normalizeActivity(a: any): Activity {
  return {
    ...a,
    id: a._id ?? a.id,
    dayId: a.day?._id ?? (typeof a.day === 'string' ? a.day : undefined) ?? a.dayId,
    time: a.startTime ?? a.time ?? '',
    commentCount: a.commentCount ?? 0,
  };
}

function normalizeDay(d: any): ItineraryDay {
  return {
    ...d,
    id: d._id ?? d.id,
    tripId: d.trip ?? d.tripId,
    activities: (d.activities ?? []).map(normalizeActivity),
  };
}

export const itineraryService = {
  async getItinerary(tripId: string): Promise<ItineraryDay[]> {
    const res = await api.get(`/trips/${tripId}/itinerary`) as any;
    return (res.data ?? []).map(normalizeDay);
  },

  async addDay(tripId: string, date: string): Promise<ItineraryDay> {
    const res = await api.post(`/trips/${tripId}/itinerary/days`, { date }) as any;
    return normalizeDay(res.data);
  },

  async updateDay(tripId: string, dayId: string, data: Partial<ItineraryDay>): Promise<ItineraryDay> {
    const res = await api.patch(`/trips/${tripId}/itinerary/days/${dayId}`, data) as any;
    return normalizeDay(res.data);
  },

  async deleteDay(tripId: string, dayId: string): Promise<void> {
    await api.delete(`/trips/${tripId}/itinerary/days/${dayId}`);
  },

  async addActivity(tripId: string, dayId: string, data: Omit<Activity, 'id' | 'order'>): Promise<Activity> {
    const { time, ...rest } = data as any;
    const res = await api.post(`/trips/${tripId}/itinerary/days/${dayId}/activities`, { ...rest, startTime: time }) as any;
    return normalizeActivity(res.data);
  },

  async updateActivity(tripId: string, activityId: string, data: Partial<Activity>): Promise<Activity> {
    const res = await api.patch(`/trips/${tripId}/itinerary/activities/${activityId}`, data) as any;
    return normalizeActivity(res.data);
  },

  async deleteActivity(tripId: string, activityId: string): Promise<void> {
    await api.delete(`/trips/${tripId}/itinerary/activities/${activityId}`);
  },

  async reorderActivities(tripId: string, dayId: string, orderedIds: string[]): Promise<void> {
    await api.post(`/trips/${tripId}/itinerary/days/${dayId}/reorder`, { orderedIds });
  },
};
