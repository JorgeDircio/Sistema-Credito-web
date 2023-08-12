import React from 'react';
import { RouterProvider } from 'react-router-dom'
import '../../public/styles/global.css'
import { routes } from '../router';

export const App = () => (
    <>
        <RouterProvider router={routes}/>
    </>
);
