import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './store/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import './index.css';
import { Toaster } from 'react-hot-toast';
import ReduxProvider from './store/redux/reduxProvider';
import ProjectDetails from './pages/ProjectDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { path: '/', element: <Login /> },
          { path: '/login', element: <Login /> },
          { path: '/signup', element: <Signup /> }
        ]
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/project/:projectId', element: <ProjectDetails /> }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider>
      <AuthProvider>
        <Toaster position='top-right' reverseOrder={false} />
        <RouterProvider router={router} />
      </AuthProvider>
    </ReduxProvider>
  </React.StrictMode>
);
