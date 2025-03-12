import { create } from 'zustand';

interface Resident {
  id: string;
  name: string;
  room: string;
  checkIn: string;
  checkOut: string;
  contact: string;
  email: string;
}

interface HostelState {
  residents: Resident[];
  addResident: (resident: Resident) => void;
  removeResident: (id: string) => void;
  updateResident: (id: string, updates: Partial<Resident>) => void;
}

export const useHostelStore = create<HostelState>((set) => ({
  residents: [],
  addResident: (resident) =>
    set((state) => ({ residents: [...state.residents, resident] })),
  removeResident: (id) =>
    set((state) => ({
      residents: state.residents.filter((resident) => resident.id !== id),
    })),
  updateResident: (id, updates) =>
    set((state) => ({
      residents: state.residents.map((resident) =>
        resident.id === id ? { ...resident, ...updates } : resident
      ),
    })),
}));