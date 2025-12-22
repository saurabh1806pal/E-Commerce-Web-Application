import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loadingWishList, setLoadingWishList] = useState(false);

  // 1️⃣ Fetch Wishlist from Backend
  const getWishlist = async () => {
    setLoadingWishList(true);
    const res = await fetch("http://localhost:4000/wishlist", {
      credentials: "include",
    });
    const data = await res.json();
    setWishlist(data.products || []);
    setLoadingWishList(false);
  };

  useEffect(() => {
    if (user) getWishlist();
    else setWishlist([]);
  }, [user]);

  // 2️⃣ Add Items to the Wishlist

  const addToWishlist = async (productId) => {
    await fetch(`http://localhost:4000/wishlist/${productId}`, {
      method: "POST",
      credentials: "include",
    });
    await getWishlist();
  };

  // // 3️⃣ Remove Items from Wishlist
  const removeFromWishlist = async (productId) => {
    await fetch(`http://localhost:4000/wishlistDel/${productId}`, {
      method: "POST",
      credentials: "include",
    });
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, loadingWishList, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
