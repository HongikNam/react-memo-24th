import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import '../src/styles/theme.css';
import '../src/styles/fonts.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root 요소를 찾을 수 없습니다.');
}

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}