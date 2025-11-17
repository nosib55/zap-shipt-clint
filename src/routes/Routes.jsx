import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Root from '../layouts/Root';
import Home from '../pages/Home';
import Error from '../pages/Error';



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
        path: '*',
        
        Component: Error,
      },
    ]
  },
]);
