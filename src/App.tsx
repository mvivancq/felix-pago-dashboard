import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Dashboard />
    ) 
  },
]);

const theme = createTheme({
  typography: {
    fontFamily: 'Work Sans'
  },
  palette: {
    primary: {
      main: "#7900FF"
    },
    secondary: {
      main: "#5F5F5F"
    },
    text: {
      primary: '#5F5F5F'
    }
  }
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </ThemeProvider>
  )
}

export default App
