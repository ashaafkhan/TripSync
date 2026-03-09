import api from './api';
import type { User } from '../types';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export const authService = {
  async register(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
    const res = await api.post('/auth/register', { name, email, password }) as any;
    return res.data;
  },

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const res = await api.post('/auth/login', { email, password }) as any;
    return res.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async getMe(): Promise<User> {
    const res = await api.get('/auth/me') as any;
    return res.data;
  },

  async updateProfile(data: Partial<Pick<User, 'name' | 'avatar'>>): Promise<User> {
    const res = await api.patch('/auth/me', data) as any;
    return res.data;
  },

  async initiateGoogleLogin(): Promise<void> {
    await signInWithRedirect(auth, googleProvider);
  },

  async handleGoogleRedirect(): Promise<{ user: User; token: string } | null> {
    const result = await getRedirectResult(auth);
    if (!result) return null;
    const idToken = await result.user.getIdToken();
    const res = await api.post('/auth/google', { idToken }) as any;
    return res.data;
  },
};
