import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';
import App from './App.jsx'
import './index.css'
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </ThemeProvider>
)
