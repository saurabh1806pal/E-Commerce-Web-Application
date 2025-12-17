import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";

const products = [
  {
    id: 1,
    productName: "Wireless Bluetooth Headphones",
    brandName: "SoundWave",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    originalPrice: 2999,
    currentPrice: 1999,
    category: "Electronics",
  },
  {
    id: 2,
    productName: "Premium Leather Wallet",
    brandName: "LeatherCraft",
    imageUrl:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
    originalPrice: 1499,
    currentPrice: 999,
    category: "Accessories",
  },
  {
    id: 3,
    productName: "Smart Fitness Watch",
    brandName: "TechFit",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    originalPrice: 4999,
    currentPrice: 3499,
    category: "Electronics",
  },
  {
    id: 4,
    productName: "Classic Sunglasses",
    brandName: "VisionStyle",
    imageUrl:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
    originalPrice: 1999,
    currentPrice: 1299,
    category: "Accessories",
  },
  {
    id: 5,
    productName: "Canvas Backpack",
    brandName: "UrbanGear",
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    originalPrice: 2499,
    currentPrice: 1799,
    category: "Bags",
  },
];

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const discount = Math.round(
    ((product.originalPrice - product.currentPrice) / product.originalPrice) *
      100
  );

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* Discount Badge */}
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {discount}% OFF
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium">
          {product.category}
        </div>

        {/* Hover Overlay with Buttons */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 shadow-lg">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="bg-white text-red-500 p-3 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 shadow-lg">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        {/* Brand Name */}
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          {product.brandName}
        </h3>

        {/* Product Name */}
        <h2 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-14">
          {product.productName}
        </h2>

        {/* Price Section */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.currentPrice}
          </span>
          <span className="text-lg line-through text-gray-400">
            ₹{product.originalPrice}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 group/btn">
            <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            Add to Cart
          </button>
          <button className="bg-gray-100 text-gray-900 p-3 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all duration-200">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
