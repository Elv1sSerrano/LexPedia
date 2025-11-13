import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/notfound/NotFound.jsx'
import Login from './pages/login/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {index: true, element: <Login />},
      {path: "inicio", element: <h1>Este es el inicio</h1>}
    ]
  },
  {path: "*", element: <NotFound />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
