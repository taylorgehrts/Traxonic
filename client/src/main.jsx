import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import App from './App';

// Render the app with the CssBaseline and ThemeProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </>,
);