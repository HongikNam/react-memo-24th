import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from '../types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      //테스트/개발용 더미 로그인 (이메일 기반)
      login: (email: string) =>
        set({
          user: { 
            email, 
            nickname: email.split('@')[0] // 이메일 앞부분을 기본 닉네임으로 사용
          },
          token: 'dummy-access-token-12345',
          isAuthenticated: true,
        }),

      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 키 이름
    }
  )
);