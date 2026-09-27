import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute'; // 선택 권장 (로그인 유저가 /login 진입 방지)

import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import MemoPage from '../pages/MemoPage'; // 메인 메모 페이지

export default function AppRouter() {
  return (
    <Routes>
      {/* 1. 로그인 안 한 유저만 접근 가능한 페이지 */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* 2. 로그인 한 유저만 접근 가능한 페이지 */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MemoPage />} />
      </Route>

      {/* 3. 잘못된 경로 접근 시 메인으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}