import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

import ProductCard from "./CardProduct";

export default function PageWallet() {
  const { products } = useContext(ProductContext);
  return (
    <div className="min-h-screen bg-white">
      {console.log(products)}
      {/* Hero Section */}
      <section className="bg-linear-to-r from-gray-900 to-gray-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Products
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Shop the latest trends with exclusive deals and fast delivery
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600">
            Check out our handpicked selection of premium products
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products
            .filter((product) => product.category === "Wallet")
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </section>
    </div>
  );
}
