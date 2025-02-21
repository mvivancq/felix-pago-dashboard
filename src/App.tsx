import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css'
import Navbar from './components/Navbar/Navbar';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
      <Navbar />
      <Dashboard />
      </>
    ) 
  },
]);

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
      {/* <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button> */}
    </>
  )
}

export default App
