import { create } from 'zustand';
import type { Trip } from '../types';
import type { Role } from '../constants/roles';

interface TripState {
  activeTrip: Trip | null;
  userRole: Role | null;
  setActiveTrip: (trip: Trip | null, role?: Role | null) => void;
  clearActiveTrip: () => void;
}

export const useTripStore = create<TripState>((set) => ({
  activeTrip: null,
  userRole: null,

  setActiveTrip: (trip, role = null) => {
    set({ activeTrip: trip, userRole: role });
  },

  clearActiveTrip: () => {
    set({ activeTrip: null, userRole: null });
  },
}));
