import React from 'react'
import theme from './app/utils/theme.js';
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import App from './App.jsx'
import { AppContextProvider } from './app/context/AppContext.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
