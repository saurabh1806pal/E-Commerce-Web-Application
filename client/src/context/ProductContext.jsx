import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // Fetching Data from Backend
  const [products, setProducts] = useState([]);

  // This is to Set and unset Loading
  const [loading, setLoading] = useState(true);

  // Error Handling
  const [error, setError] = useState("");

  // 1️⃣ Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:4000/products", {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch ONCE when app loads
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
