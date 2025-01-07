// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';  // For React 18+
import App from './App.tsx';

// Create a root element for the app
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
