import { client } from './client';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from '../types/auth';

export const authApi = {
  // 회원가입 API
  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    return client<SignupResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 로그인 API
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return client<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
};