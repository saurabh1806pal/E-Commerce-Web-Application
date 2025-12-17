import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Context
import AuthProvider from "./context/AuthContext";

// Pages
import App from "./App.jsx";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import HomePage from "./pages/UserHome";
import WishlistPage from "./pages/UserWishlist";

// Route Protection
import ProtectedRoute from "./components/ProtectedRoute";
import Forbidden from "./pages/Forbidden.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        ),
      },
      // Forbidden
      {
        path: "forbidden",
        element: (
          <ProtectedRoute adminOnly>
            <Forbidden />
          </ProtectedRoute>
        ),
      },

      // 404 (must be LAST)
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
