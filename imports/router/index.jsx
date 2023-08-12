import React, { Children } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../ui/layout/MainLayout'
import Login from '../ui/views/auth/Login'
import ForgotPassword from '../ui/views/auth/ForgotPassword'
import ResetPassword from '../ui/views/auth/ResetPassword'
import AuthLayout from '../ui/layout/AuthLayout'
import ErrorPage from '../ui/views/error/Error-page'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '/',
        element: <Login />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/reset-password/:token',
        element: <ResetPassword />,
      }
    ]
  },
  {
    path: '/admin/dashboard',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
  }
])