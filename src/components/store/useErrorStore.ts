// store/useErrorStore.ts
import { create } from "zustand";

interface ErrorState {
    open: boolean;
    message: string | null;
    setError: (msg: string) => void;
    clearError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
    open: false,
    message: null,
    setError: (msg) => set({ open: true, message: msg }),
    clearError: () => set({ open: false, message: null }),
}));
