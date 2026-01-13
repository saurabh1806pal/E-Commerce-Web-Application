import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "./CardProduct";

import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import Reviews from "../components/Reviews";

export default function HomePage() {
  const { products, loading, error } = useContext(ProductContext);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel Section */}
      <HeroSection />

      {/* Categories Section */}
      <Categories />

      {/* Featured Products Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">
              Check out our handpicked selection of premium products
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-4">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              <p>Error loading products: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-block bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <Reviews />
    </div>
  );
}
