<<<<<<< HEAD
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
=======
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./store/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import "./index.css";
import { Toaster } from "react-hot-toast";
import ProjectDetails from "./pages/ProjectDetails";
>>>>>>> 94206718a9956879fe817a4e725e2407dcd60ed8

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PublicRoute />,
        children: [
<<<<<<< HEAD
          { path: '/', element: <Login /> },
          { path: '/signup', element: <Signup /> }
        ]
      },
      {
        element: <ProtectedRoute />,
        children: [{ path: '/dashboard', element: <Dashboard /> }]
      }
    ]
  }
=======
          { path: "/", element: <Login /> },
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <Signup /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/project/:projectId", element: <ProjectDetails /> },
        ],
      },
    ],
  },
>>>>>>> 94206718a9956879fe817a4e725e2407dcd60ed8
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<<<<<<< HEAD
    <ReduxProvider>
      <AuthProvider>
        <Toaster position='top-right' reverseOrder={false} />
        <RouterProvider router={router} />
      </AuthProvider>
    </ReduxProvider>
=======
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </AuthProvider>
>>>>>>> 94206718a9956879fe817a4e725e2407dcd60ed8
  </React.StrictMode>
);
