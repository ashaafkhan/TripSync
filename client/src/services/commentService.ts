import api from './api';
import type { Comment } from '../types';

function normalizeComment(c: any): Comment {
  const authorId = c.author?._id ?? c.author?.id ?? c.author ?? c.authorId ?? '';
  return {
    ...c,
    id: c._id ?? c.id,
    authorId: String(authorId),
    body: c.text ?? c.body,
  };
}

export const commentService = {
  async getComments(tripId: string, refType: string, refId: string): Promise<Comment[]> {
    const res = await api.get(`/trips/${tripId}/comments`, {
      params: { refType, refId },
    }) as any;
    const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
    return list.map(normalizeComment);
  },

  async addComment(tripId: string, data: { text: string; refType: string; refId: string; parentComment?: string }): Promise<Comment> {
    const res = await api.post(`/trips/${tripId}/comments`, data) as any;
    return normalizeComment(res.data);
  },

  async updateComment(tripId: string, commentId: string, text: string): Promise<Comment> {
    const res = await api.patch(`/trips/${tripId}/comments/${commentId}`, { text }) as any;
    return normalizeComment(res.data);
  },

  async deleteComment(tripId: string, commentId: string): Promise<void> {
    await api.delete(`/trips/${tripId}/comments/${commentId}`);
  },
};
