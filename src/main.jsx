import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Product from "./Product/Product.jsx";
import Register from "./Auth/Register.jsx";
import Login from "./Auth/Login.jsx";
import ProtectedRoute from "./Product/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <App />,
        children: [
          {
            path: "/",
            element: <Product />,
            index: true,
          },
          {
            path: "product",
            element: <Product />,
            index: true,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
