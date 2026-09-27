import { useAuthStore } from '../stores/useAuthStore';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function client<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const token = useAuthStore.getState().token;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const url = endpoint.startsWith('/') ? `${BASE_URL}${endpoint}` : `${BASE_URL}/${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 401 에러 처리
    if (response.status === 401) {
      if (endpoint.includes('/auth/') || endpoint.includes('/login')) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || '*아이디(이메일) 또는 비밀번호가 일치하지 않습니다.');
      }

      useAuthStore.getState().logout();
      window.location.href = '/login';
      throw new Error('인증이 만료되었습니다. 다시 로그인해 주세요.');
    }

    if (response.status === 204) {
      return {} as T;
    }

    const resJson = await response.json();

    if (!response.ok || resJson.success === false) {
      throw new Error(resJson.message || '요청에 실패했습니다.');
    }

    return resJson.data as T;
  } catch (error: any) {
    throw new Error(error.message || '서버와의 통신에 실패했습니다.');
  }
}