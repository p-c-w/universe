import React from 'react';
import ReactDOM from 'react-dom/client';
import { Notifications } from '@mantine/notifications';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Notifications position="top-center" />
    <App />
  </React.StrictMode>
);
