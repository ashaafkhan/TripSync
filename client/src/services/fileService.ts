import api from './api';
import type { TripFile } from '../types';

function normalizeFile(f: any): TripFile {
  return {
    ...f,
    id: f._id ?? f.id,
    tripId: f.trip ?? f.tripId,
    uploadedBy: f.uploadedBy?._id ?? f.uploadedBy?.id ?? f.uploadedBy ?? '',
    uploadedAt: f.uploadedAt ?? f.createdAt ?? '',
  };
}

export const fileService = {
  async getFiles(tripId: string): Promise<TripFile[]> {
    const res = await api.get(`/trips/${tripId}/files`) as any;
    return (res.data ?? []).map(normalizeFile);
  },

  // Do NOT set Content-Type manually — Axios handles multipart boundary automatically
  async uploadFile(tripId: string, formData: FormData): Promise<TripFile> {
    const res = await api.post(`/trips/${tripId}/files`, formData) as any;
    return normalizeFile(res.data);
  },

  async deleteFile(tripId: string, fileId: string): Promise<void> {
    await api.delete(`/trips/${tripId}/files/${fileId}`);
  },
};
