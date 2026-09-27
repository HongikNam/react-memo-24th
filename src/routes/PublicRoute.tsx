import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

export default function PublicRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 이미 로그인된 상태라면 메인(메모) 페이지로 이동
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}