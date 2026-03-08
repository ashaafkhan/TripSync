import api from './api';
import type { Checklist, ChecklistItem } from '../types';

function normalizeItem(item: any): ChecklistItem {
  return {
    id: item._id ?? item.id,
    label: item.text ?? item.label,
    completed: item.completed,
  };
}

function normalizeChecklist(c: any): Checklist {
  return {
    ...c,
    id: c._id ?? c.id,
    tripId: c.trip ?? c.tripId,
    items: (c.items ?? []).map(normalizeItem),
  };
}

export const checklistService = {
  async getChecklists(tripId: string): Promise<{ packing: Checklist; todo: Checklist }> {
    const res = await api.get(`/trips/${tripId}/checklists`) as any;
    const list: Checklist[] = (res.data ?? []).map(normalizeChecklist);
    const empty = (type: 'packing' | 'todo'): Checklist => ({ id: '', tripId, type, items: [] });
    return {
      packing: list.find((c) => c.type === 'packing') ?? empty('packing'),
      todo: list.find((c) => c.type === 'todo') ?? empty('todo'),
    };
  },

  async addItem(tripId: string, type: 'packing' | 'todo', text: string): Promise<Checklist> {
    const res = await api.post(`/trips/${tripId}/checklists/${type}/items`, { text }) as any;
    return normalizeChecklist(res.data);
  },

  async updateItem(tripId: string, type: 'packing' | 'todo', itemId: string, data: { completed?: boolean; text?: string }): Promise<Checklist> {
    const res = await api.patch(`/trips/${tripId}/checklists/${type}/items/${itemId}`, data) as any;
    return normalizeChecklist(res.data);
  },

  async deleteItem(tripId: string, type: 'packing' | 'todo', itemId: string): Promise<void> {
    await api.delete(`/trips/${tripId}/checklists/${type}/items/${itemId}`);
  },
};
