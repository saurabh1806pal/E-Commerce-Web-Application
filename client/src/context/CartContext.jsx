import { createContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  // 1️⃣ Fetch Cart from Backend
  const getCart = async () => {
    setLoadingCart(true);
    const res = await fetch("http://localhost:4000/cart", {
      credentials: "include",
    });
    const data = await res.json();
    setCart(data.products || []);
    setLoadingCart(false);
  };
  // Fetch Cart once when app loads
  useEffect(() => {
    if (user) getCart();
    else setCart([]);
  }, [user]);

  // 2️⃣ Add Items to the Cart
  const addToCart = async (productId) => {
    await fetch(`http://localhost:4000/cart/${productId}`, {
      method: "POST",
      credentials: "include",
    });
    await getCart();
  };

  // 3️⃣ Remove Items from Cart
  const removeFromCart = async (productId) => {
    await fetch(`http://localhost:4000/cartDel/${productId}`, {
      method: "POST",
      credentials: "include",
    });
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  return (
    <CartContext.Provider
      value={{ cart, loadingCart, getCart, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
