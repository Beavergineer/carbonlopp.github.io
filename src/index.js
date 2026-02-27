import React from 'react';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { carbonTheme } from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={carbonTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
