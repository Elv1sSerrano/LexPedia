import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/notfound/NotFound.jsx'
import Login from './pages/login/Login.jsx'
import SaveUser from './pages/user/section/SaveUser.jsx'
import UserProfile from './pages/user/section/UserProfile.jsx'
import AllUsers from './pages/admin/section/AllUsers.jsx'
import UpdateUser from './pages/user/section/UpdateUser.jsx'

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {index: true, element: <Login />},
      {path: "inicio", element: <h1>Este es el inicio</h1>},
      {path: "registrarse", element: <SaveUser />},
      {path: "perfil/:id", element: <UserProfile />},
      {path: "/actualizar/:id", element: <UpdateUser />},
      {path: "/admin/usuarios", element: <AllUsers />}
    ]
  },
  {path: "*", element: <NotFound />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
