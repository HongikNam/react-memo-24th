export interface User {
  email: string;
  nickname?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname?: string;
}

export interface SignupResponse {
  message?: string;
  user?: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string) => void; // 더미용
  setAuth: (user: User, token: string) => void; // 실제 API 연동용
  logout: () => void;
}