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

    // 🚨 [핵심 수정 위치] 401 Unauthorized 처리
    if (response.status === 401) {
      // 로그인이나 회원가입 요청 시 발생한 401/인증 실패는 강제 리다이렉트를 하지 않고 에러 메시지만 던집니다.
      if (endpoint.includes('/auth/') || endpoint.includes('/login')) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || '*아이디(이메일) 또는 비밀번호가 일치하지 않습니다.');
      }

      // 일반 API 호출 중 토큰이 만료되었을 때만 강제 로그아웃 및 리다이렉트
      useAuthStore.getState().logout();
      window.location.href = '/login';
      throw new Error('인증이 만료되었습니다. 다시 로그인해 주세요.');
    }

    if (response.status === 204) {
      return {} as T;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message ||
        errorData.error ||
        errorData.detail ||
        `요청에 실패했습니다. (${response.status})`;

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || '서버와의 통신에 실패했습니다.');
  }
}