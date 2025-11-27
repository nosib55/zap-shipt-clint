import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Root from '../layouts/Root';
import Home from '../pages/Home';
import Error from '../pages/Error';
import Coverage from '../pages/Coverage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import SendParcel from '../pages/sendParcel/SendParcel';
import ProtectedRoute from './ProtectedRoute';



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        index: true,
        Component: Home,
      },
      {
        path: 'coverage',
        
        Component: Coverage,
      },
      {
        path: 'login',
        
        Component: Login,
      },
      {
        path: 'register',
        
        Component: Register,
      },
     
      {
        path: 'send-parcel',
        
         element: <ProtectedRoute><SendParcel></SendParcel></ProtectedRoute>,
      },
      {
        path: '*',
        
        Component: Error,
      },
    ]
  },
]);
