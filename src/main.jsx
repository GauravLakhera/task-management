import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";

import { Toaster } from "react-hot-toast";
import "./index.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/project/:projectId", element: <ProjectDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <RouterProvider router={router} />
  </React.StrictMode>
);
