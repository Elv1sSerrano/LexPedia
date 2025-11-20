import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import NotFound from './pages/notfound/NotFound.jsx'
import Login from './pages/login/Login.jsx'
import SaveUser from './pages/user/section/SaveUser.jsx'
import UserProfile from './pages/user/section/UserProfile.jsx'
import AllUsers from './pages/admin/section/AllUsers.jsx'
import UpdateUser from './pages/user/section/UpdateUser.jsx'
import Register from './pages/register/Register.jsx'
import Home from './pages/home/Home.jsx'


const isAuth = true

const router = createBrowserRouter([  

  {
    path: "/", 
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {path: "", element: isAuth ? <Home /> : <Navigate to={"login"} />},
      {path:"login", element: <Login />},
      {path: "inicio", element: <h1>Este es el inicio</h1>},
      {path: "registro", element: <Register />},
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
