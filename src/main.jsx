import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import NotFound from './components/utils/NotFound.jsx'
import Login from './pages/login/Login.jsx'
import SaveUser from './pages/admin/section/SaveUser.jsx'
import UserProfile from './pages/admin/section/UserProfile.jsx'
import Register from './pages/register/Register.jsx'
import Articles from './pages/general/Articles.jsx'
import Article from './components/layout/Article.jsx'
import Saved from './pages/user/section/Saved'
import ProtectedRoute from './routes/ProtectedRoute'
import RoleBasedRedirect from './routes/RoleBasedRedirect'
import UserLayout from './pages/user/UserLayout'
import AdminLayout from './pages/admin/AdminLayout'
import ModeratorLayout from './pages/moderator/ModeratorLayout'
import Tasks from './pages/moderator/sections/Tasks'
import UploadArticle from './pages/moderator/sections/UploadArticle'
import RoleProvider from './context/roles/RoleProvider'
import Dashboard from './pages/admin/section/Dashboard'
import TableTasks from './pages/admin/section/TableTasks'
import { useAuthContext, useRoleContext } from './context/roles/roleContext'

export const useAuth = () => {
  
  const isAuth = useAuthContext();
  const userRole = useRoleContext();
  return { isAuth, userRole };
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // App maneja el layout general (NavBar condicional)
        errorElement: <NotFound />,
        children: [
            // Rutas públicas (Login, Register, etc.)            
            { path: "login", element: <Login /> },
            { path: "registro", element: <Register /> },
            { path: "artículos", element: <Articles /> },
            { path: "404", element: <h1 className='text-6xl text-center font-bold'>Acceso Denegado 😡</h1>},

            // Redirección principal: si está autenticado, redirige al dashboard del rol
            {
                path: "", // Ruta raíz
                element: <ProtectedRoute>
                    <RoleBasedRedirect />
                </ProtectedRoute>
            },
            
            // Rutas de Layout por Rol
            // El layout del rol (UserLayout, AdminLayout, etc.) tendrá su propio <Outlet />
            {
              path: "user", // Usamos '/*' para que coincida con todas las subrutas de user
              element: (
                <ProtectedRoute allowedRoles={["USER", "ADMIN", "MODERATOR"]}> 
                  <UserLayout /> 
                </ProtectedRoute>
              ),
              children: [
                { 
                  // Ruta por defecto para /user. Se renderiza en el <Outlet /> de UserLayout
                  index: true, 
                  path: "",
                  element: <Articles /> 
                },
                {
                  // Ruta para /user/perfil
                  path: "perfil/:id", 
                  element: <UserProfile /> 
                },
                {
                  // Ruta para /user/guardados
                  path: "guardados", 
                  element: <Saved /> 
                },
                {
                  path: "articulo/:articuloId", 
                  element: <Article />
                }
              ]                               
            },
            {
                path: "admin/*", 
                element: <ProtectedRoute allowedRoles={["ADMIN"]}> 
                    <AdminLayout /> 
                </ProtectedRoute>,
                // Subrutas de Admin
                children: [
                    { 
                      index: true,
                      path: "", 
                      element: <Dashboard /> 
                    },
                    {                       
                      path: "dashboard", 
                      element: <Dashboard /> 
                    },
                    {                       
                      path: "tabla", 
                      element: <TableTasks /> 
                    },
                    {                       
                      path: "crear", 
                      element: <SaveUser /> 
                    },
                    {                       
                      path: "articulos", 
                      element: <Articles /> 
                    },
                    {
                      path: "articulos/articulo/:articuloId", 
                      element: <Article />
                    }
                ]
            },
            {
                path: "moderator/*", 
                element: (
                  <ProtectedRoute allowedRoles={["MODERATOR"]}> 
                      <ModeratorLayout /> 
                  </ProtectedRoute>
                ),
                children: [
                  {                   
                    index: true,                     
                    element: <Tasks />                     
                  },
                  {
                    path: "tasks",
                    element: <Tasks />                     
                  },
                  {
                    path: "create",
                    element: <UploadArticle />
                  },
                  {
                    path: "articulos",
                    element: <Articles />
                  },
                  {
                    path: "articulos/articulo/:articuloId", 
                    element: <Article />
                  }
                ]
            },            
        ]
    },
    { path: "*", element: <NotFound /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoleProvider>
      <RouterProvider router={router} />
    </RoleProvider>
  </StrictMode>,
)
