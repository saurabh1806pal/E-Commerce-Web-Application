import { useState } from "react";
import { Heart, Trash2, Truck } from "lucide-react";
import { WishlistContext } from "../context/WishListContext";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export default function CartCard({ item }) {
  const { addToWishlist } = useContext(WishlistContext);
  const { removeFromCart } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  const discount = Math.round(
    ((item.originalPrice - item.currentPrice) / item.originalPrice) * 100
  );

  const handleMoveToWishlist = async (productId) => {
    try {
      await addToWishlist(productId);
      await removeFromCart(productId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative md:w-64 h-64 md:h-auto overflow-hidden bg-gray-100 shrink">
          <img
            src={item.images}
            alt={item.productName}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* Discount Badge */}
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            {discount}% OFF
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium">
            {item.category}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Brand */}
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {item.brandName}
            </p>

            {/* Product Name */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              {item.productName}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl font-bold text-gray-900">
                ₹{item.currentPrice}
              </span>
              <span className="text-xl line-through text-gray-400">
                ₹{item.originalPrice}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Save ₹{item.originalPrice - item.currentPrice}
              </span>
            </div>
          </div>

          {/* Action Buttons and Delivery Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6">
            {/* Buttons Container */}
            <div className="flex gap-2">
              <button
                onClick={() => handleMoveToWishlist(item._id)}
                className="bg-gray-900 text-white py-2.5 px-5 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center gap-2 group/btn shadow-md hover:shadow-lg text-sm"
              >
                <Heart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                Move to Wishlist
              </button>

              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-50 text-red-600 py-2.5 px-5 rounded-xl font-semibold hover:bg-red-100 transition-all duration-200 flex items-center gap-2 group/btn border-2 border-red-200 hover:border-red-300 text-sm"
              >
                <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                Remove
              </button>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200">
              <Truck className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">
                Expected Delivery:{" "}
                <span className="text-gray-900 font-semibold">3-5 Days</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
