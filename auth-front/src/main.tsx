import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { createBrowserRouter, RouterProvider }  from "react-router-dom";
import Login from './routes/Login.tsx';
import Signup from './routes/Signup.tsx';
import VuelaFacil from './routes/VuelaFacil.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import { AuthProvider } from './routes/Auth/AuthProvider.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/vuelafacil",
        element: <VuelaFacil/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
    
  </React.StrictMode>
);
