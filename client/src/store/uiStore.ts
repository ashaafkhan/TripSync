import { create } from 'zustand';

type ModalType =
  | 'createTrip'
  | 'inviteMember'
  | 'deleteTrip'
  | 'addActivity'
  | 'addExpense'
  | 'addReservation'
  | 'confirmDelete'
  | null;

interface UIState {
  sidebarOpen: boolean;
  activeModal: ModalType;
  modalData: Record<string, unknown>;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (modal: ModalType, data?: Record<string, unknown>) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  activeModal: null,
  modalData: {},

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  openModal: (modal, data = {}) => set({ activeModal: modal, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: {} }),
}));
