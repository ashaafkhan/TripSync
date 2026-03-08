import type { Role } from '../constants/roles';
import type { ActivityType } from '../constants/activityTypes';
import type { ExpenseCategory } from '../constants/expenseCategories';

// ─── Users ────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// ─── Trips ────────────────────────────────────────────────────────────────────
export interface TripMember {
  userId: string;
  role: Role;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  coverImage?: string;
  description?: string;
  budget?: number;
  currency?: string;
  members: TripMember[];
  createdAt: string;
}

// ─── Itinerary ─────────────────────────────────────────────────────────────────
export interface Activity {
  id: string;
  dayId: string;
  time: string;
  title: string;
  location?: string;
  type: ActivityType;
  notes?: string;
  commentCount: number;
  order: number;
}

export interface ItineraryDay {
  id: string;
  tripId: string;
  date: string;
  label?: string;
  activities: Activity[];
}

// ─── Comments ─────────────────────────────────────────────────────────────────
export interface Comment {
  id: string;
  authorId: string;
  body: string;
  createdAt: string;
  replies?: Comment[];
}

// ─── Budget ───────────────────────────────────────────────────────────────────
export interface Expense {
  id: string;
  tripId: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  paidBy: string;
  date: string;
  notes?: string;
}

export interface BudgetData {
  totalBudget: number;
  currency: string;
  expenses: Expense[];
}

// ─── Checklists ───────────────────────────────────────────────────────────────
export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface Checklist {
  id: string;
  tripId: string;
  type: 'packing' | 'todo';
  items: ChecklistItem[];
}

// ─── Files & Reservations ─────────────────────────────────────────────────────
export interface TripFile {
  id: string;
  tripId: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

export type ReservationType = 'hotel' | 'flight' | 'restaurant' | 'car' | 'other';

export interface Reservation {
  id: string;
  tripId: string;
  type: ReservationType;
  name: string;
  bookingRef: string;
  checkIn: string;
  checkOut?: string | null;
  notes?: string;
  confirmedBy: string;
}
