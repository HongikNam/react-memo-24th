import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from '../types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      token: null,
      isAuthenticated: false,

      setAuth: (email, token) => 
        set({
          email,
          token,
          isAuthenticated: true,
        }),

      logout: () => {
        set({
          email: null,
          token: null,
          isAuthenticated: false,
        }),
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);