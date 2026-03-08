import tripsData from '../mocks/trips.json';
import usersData from '../mocks/users.json';
import itineraryData from '../mocks/itinerary.json';
import budgetData from '../mocks/budget.json';
import checklistsData from '../mocks/checklists.json';
import filesData from '../mocks/files.json';
import type { Trip, User, ItineraryDay, BudgetData, Expense, ChecklistItem, TripFile, Reservation } from '../types';

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

const TRIPS_KEY = 'tripsync_trips';

function loadTrips(): Trip[] {
  try {
    const stored = localStorage.getItem(TRIPS_KEY);
    if (stored) return JSON.parse(stored) as Trip[];
  } catch {}
  return tripsData as Trip[];
}

function saveTrips(data: Trip[]) {
  localStorage.setItem(TRIPS_KEY, JSON.stringify(data));
}

let trips: Trip[] = loadTrips();
let users: User[] = usersData as User[];

// ─── Trip Service ─────────────────────────────────────────────────────────────
export const tripService = {
  async getAll(): Promise<Trip[]> {
    await delay();
    return trips;
  },

  async getById(id: string): Promise<Trip | undefined> {
    await delay();
    return trips.find((t) => t.id === id);
  },

  async create(data: Omit<Trip, 'id' | 'createdAt'>): Promise<Trip> {
    await delay();
    const newTrip: Trip = {
      ...data,
      id: `t${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    trips = [newTrip, ...trips];
    saveTrips(trips);
    return newTrip;
  },

  async update(id: string, data: Partial<Trip>): Promise<Trip> {
    await delay();
    trips = trips.map((t) => (t.id === id ? { ...t, ...data } : t));
    saveTrips(trips);
    return trips.find((t) => t.id === id)!;
  },

  async delete(id: string): Promise<void> {
    await delay();
    trips = trips.filter((t) => t.id !== id);
    saveTrips(trips);
  },
};

// ─── User Service ─────────────────────────────────────────────────────────────
export const userService = {
  async getAll(): Promise<User[]> {
    await delay();
    return users;
  },

  async getById(id: string): Promise<User | undefined> {
    await delay();
    return users.find((u) => u.id === id);
  },

  async getUsersByIds(ids: string[]): Promise<User[]> {
    await delay();
    return users.filter((u) => ids.includes(u.id));
  },
};

// ─── Itinerary Service ────────────────────────────────────────────────────────
let itinerary: Record<string, ItineraryDay[]> = itineraryData as unknown as Record<string, ItineraryDay[]>;

export const itineraryService = {
  async getByTripId(tripId: string): Promise<ItineraryDay[]> {
    await delay();
    return itinerary[tripId] ?? [];
  },

  async addActivity(tripId: string, dayId: string, activity: Omit<import('../types').Activity, 'id' | 'order'>): Promise<void> {
    await delay();
    const days = itinerary[tripId] ?? [];
    const day = days.find((d) => d.id === dayId);
    if (day) {
      day.activities.push({
        ...activity,
        id: `a${Date.now()}`,
        order: day.activities.length,
      });
    }
  },

  async reorderActivities(tripId: string, dayId: string, orderedIds: string[]): Promise<void> {
    await delay();
    const day = (itinerary[tripId] ?? []).find((d) => d.id === dayId);
    if (day) {
      day.activities = orderedIds.map((id, i) => {
        const a = day.activities.find((x) => x.id === id)!;
        return { ...a, order: i };
      });
    }
  },
};

// ─── Budget Service ───────────────────────────────────────────────────────────
let budget: Record<string, BudgetData> = budgetData as unknown as Record<string, BudgetData>;

export const budgetService = {
  async getByTripId(tripId: string): Promise<BudgetData | undefined> {
    await delay();
    return budget[tripId];
  },

  async addExpense(tripId: string, expense: Omit<Expense, 'id' | 'tripId'>): Promise<void> {
    await delay();
    if (!budget[tripId]) {
      budget[tripId] = { totalBudget: 0, currency: 'USD', expenses: [] };
    }
    budget[tripId].expenses.push({
      ...expense,
      id: `e${Date.now()}`,
      tripId,
    });
  },

  async deleteExpense(tripId: string, expenseId: string): Promise<void> {
    await delay();
    if (budget[tripId]) {
      budget[tripId].expenses = budget[tripId].expenses.filter((e) => e.id !== expenseId);
    }
  },
};

// ─── Checklist Service ────────────────────────────────────────────────────────
type ChecklistsData = Record<string, { packing: { id: string; tripId: string; type: string; items: ChecklistItem[] }; todo: { id: string; tripId: string; type: string; items: ChecklistItem[] } }>;
let checklists: ChecklistsData = checklistsData as unknown as ChecklistsData;

export const checklistService = {
  async getByTripId(tripId: string) {
    await delay();
    return checklists[tripId] ?? { packing: { id: '', tripId, type: 'packing', items: [] }, todo: { id: '', tripId, type: 'todo', items: [] } };
  },

  async toggleItem(tripId: string, listType: 'packing' | 'todo', itemId: string): Promise<void> {
    await delay();
    const list = checklists[tripId]?.[listType];
    if (list) {
      list.items = list.items.map((i) => (i.id === itemId ? { ...i, completed: !i.completed } : i));
    }
  },

  async addItem(tripId: string, listType: 'packing' | 'todo', label: string): Promise<void> {
    await delay();
    if (!checklists[tripId]) {
      checklists[tripId] = {
        packing: { id: `cl-p-${tripId}`, tripId, type: 'packing', items: [] },
        todo: { id: `cl-t-${tripId}`, tripId, type: 'todo', items: [] },
      };
    }
    checklists[tripId][listType].items.push({ id: `item-${Date.now()}`, label, completed: false });
  },

  async deleteItem(tripId: string, listType: 'packing' | 'todo', itemId: string): Promise<void> {
    await delay();
    const list = checklists[tripId]?.[listType];
    if (list) {
      list.items = list.items.filter((i) => i.id !== itemId);
    }
  },
};

// ─── File Service ─────────────────────────────────────────────────────────────
type FilesData = Record<string, { files: TripFile[]; reservations: Reservation[] }>;
let filesStore: FilesData = filesData as unknown as FilesData;

export const fileService = {
  async getByTripId(tripId: string) {
    await delay();
    return filesStore[tripId] ?? { files: [], reservations: [] };
  },

  async addReservation(tripId: string, reservation: Omit<Reservation, 'id' | 'tripId'>): Promise<void> {
    await delay();
    if (!filesStore[tripId]) {
      filesStore[tripId] = { files: [], reservations: [] };
    }
    filesStore[tripId].reservations.push({ ...reservation, id: `r${Date.now()}`, tripId });
  },

  async deleteReservation(tripId: string, reservationId: string): Promise<void> {
    await delay();
    if (filesStore[tripId]) {
      filesStore[tripId].reservations = filesStore[tripId].reservations.filter((r) => r.id !== reservationId);
    }
  },
};
