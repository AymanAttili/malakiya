import { ThemeProvider } from "@mui/material"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ar } from 'date-fns/locale';
import queryClient from './cache/queryClient'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import theme from "./theme"
import Dashboard from "./pages/Dashboard"
import { useEffect } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider"
import Login from "./pages/Login";
import Admin from "./pages/Admin";

function App() {
  useEffect(() => {
    document.body.setAttribute('dir', 'rtl');
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ar}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="" element={<Dashboard />} />
              <Route path="admin" element={<Admin />} />
              <Route path="login" element={<Login />} />
              <Route path="/*" element={<Navigate replace to='/' />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </LocalizationProvider>
    </QueryClientProvider>
  )
}

export default App
