import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

import ProductCard from "./CardProduct";

export default function PageHeadphones() {
  const { products } = useContext(ProductContext);
  return (
    <div className="min-h-screen bg-white">
      {console.log(products)}
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/025/865/211/non_2x/3d-realistic-blue-headphones-isolated-on-light-background-banner-for-advertising-wireless-earphones-illustration-vector.jpg')",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-700/80"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Experience Sound Like Never Before...
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Tune into for Immersive Audio Quality and Unmatched Comfort with Our
            Premium Headphones Collection.
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
            .filter((product) => product.category === "Headphones")
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </section>
    </div>
  );
}
