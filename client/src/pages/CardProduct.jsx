import { useState } from "react";
import { ShoppingCart, Heart, HeartCrack } from "lucide-react";
import { useContext } from "react";
import { WishlistContext } from "../context/WishListContext";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  const discount = Math.round(
    ((Number(product.originalPrice) - Number(product.currentPrice)) /
      Number(product.originalPrice)) *
      100
  );
  const isInCart = cart.some((item) => item._id === product._id);
  const isInWishlist = wishlist.some((item) => item._id === product._id);

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={product.images}
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
          className={`absolute inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {isInCart ? (
            <button
              className="bg-black text-white p-3 rounded-full hover:bg-gray-900 transition-all duration-200 transform hover:scale-110 shadow-lg"
              onClick={() => removeFromCart(product._id)}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          ) : (
            <button
              className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 shadow-lg"
              onClick={() => addToCart(product._id)}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          )}

          {isInWishlist ? (
            <button
              className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all duration-200 transform hover:scale-110 shadow-lg"
              onClick={() => removeFromWishlist(product._id)}
            >
              <HeartCrack className="w-5 h-5" />
            </button>
          ) : (
            <button
              className="bg-white text-red-600 p-3 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 shadow-lg"
              onClick={() => addToWishlist(product._id)}
            >
              <Heart className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        {/* Brand Name */}
        <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wide">
          {product.brandName}
        </h3>

        {/* Product Name */}
        <h2 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-14">
          {product.productName}
        </h2>

        {/* Price Section */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-green-600">
            ₹{product.currentPrice}
          </span>
          <span className="text-lg line-through text-red-400">
            ₹{product.originalPrice}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {isInCart ? (
            <button
              className="flex-1 bg-red-900 text-white py-3 rounded-xl font-semibold hover:bg-red-800 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
              onClick={() => removeFromCart(product._id)}
            >
              <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              Remove from Cart
            </button>
          ) : (
            <button
              className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
              onClick={() => addToCart(product._id)}
            >
              <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              Add to Cart
            </button>
          )}

          {isInWishlist ? (
            <button
              className="bg-red-100 text-red-900 p-3 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all duration-200"
              onClick={() => removeFromWishlist(product._id)}
            >
              <HeartCrack className="w-5 h-5" />
            </button>
          ) : (
            <button
              className="bg-gray-100 text-gray-900 p-3 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all duration-200"
              onClick={() => addToWishlist(product._id)}
            >
              <Heart className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
