
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface SignupResponse {
  userId: number;
  email: string;
}


export interface AuthState {
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (email: string, token: string) => void;
  logout: () => void;
}