import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Context
import AuthProvider from "./context/AuthContext";
import ProductProvider from "./context/ProductContext.jsx";
import WishlistProvider from "./context/WishListContext.jsx";
import CartProvider from "./context/CartContext.jsx";

// Pages
import App from "./App.jsx";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import HomePage from "./pages/UserHome";
import WishlistPage from "./pages/UserWishlist";
import PageHeadphones from "./pages/PageHeadphones.jsx";
import PageEarbuds from "./pages/PageEarbuds.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

// Route Protection
import ProtectedRoute from "./components/ProtectedRoute";
import Forbidden from "./pages/Forbidden.jsx";
import NotFound from "./pages/NotFound.jsx";
import CartPage from "./pages/UserCart.jsx";
import PageWatch from "./pages/PageWatch.jsx";
import PageSpeaker from "./pages/PageSpeaker.jsx";
import PagePosters from "./pages/PagePosters.jsx";
import PageWallet from "./pages/PageWallet.jsx";

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
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "headphones",
        element: (
          <ProtectedRoute>
            <PageHeadphones />
          </ProtectedRoute>
        ),
      },
      {
        path: "earbuds",
        element: (
          <ProtectedRoute>
            <PageEarbuds />
          </ProtectedRoute>
        ),
      },
      {
        path: "watch",
        element: (
          <ProtectedRoute>
            <PageWatch />
          </ProtectedRoute>
        ),
      },
      {
        path: "speaker",
        element: (
          <ProtectedRoute>
            <PageSpeaker />
          </ProtectedRoute>
        ),
      },
      {
        path: "posters",
        element: (
          <ProtectedRoute>
            <PagePosters />
          </ProtectedRoute>
        ),
      },
      {
        path: "wallets",
        element: (
          <ProtectedRoute>
            <PageWallet />
          </ProtectedRoute>
        ),
      },
      {
        path: ":category/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
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
      <ProductProvider>
        <WishlistProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </WishlistProvider>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>,
);
