import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // .js 확장은 제거하거나 .tsx로 인식되도록 작성합니다.
import './index.css';
import '../src/styles/theme.css'

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  );