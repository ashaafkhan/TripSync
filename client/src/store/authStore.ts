import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (user: User, token?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      token: null,

      login: (user, token = 'mock-token') => {
        set({ currentUser: user, isAuthenticated: true, token });
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false, token: null });
      },

      updateProfile: (updates) => {
        set((state) => ({
          currentUser: state.currentUser ? { ...state.currentUser, ...updates } : null,
        }));
      },
    }),
    { name: 'tripsync-auth' }
  )
);
