import { create } from "zustand"

interface AuthState {
  userId: string | null
  userName: string | null
  setAuthInfo: (id: string, name: string) => void
  clearAuthInfo: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  userName: null,
  setAuthInfo: (id, name) => set({ userId: id, userName: name }),
  clearAuthInfo: () => set({ userId: null, userName: null }),
}))
