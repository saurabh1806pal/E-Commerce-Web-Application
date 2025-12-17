import { useState } from "react";
import { ShoppingCart, Heart, Trash2, ArrowRight } from "lucide-react";

const initialWishlistItems = [
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
];

const WishlistCard = ({ item, onMoveToCart, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);
  const discount = Math.round(
    ((item.originalPrice - item.currentPrice) / item.originalPrice) * 100
  );

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
            src={item.imageUrl}
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={() => onMoveToCart(item.id)}
              className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
              Move to Cart
            </button>

            <button
              onClick={() => onRemove(item.id)}
              className="flex-1 sm:flex-none bg-red-50 text-red-600 py-3.5 px-6 rounded-xl font-semibold hover:bg-red-100 transition-all duration-200 flex items-center justify-center gap-2 group/btn border-2 border-red-200 hover:border-red-300"
            >
              <Trash2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const handleMoveToCart = (itemId) => {
    alert(`Item ${itemId} moved to cart!`);
    // Remove from wishlist after moving to cart
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
  };

  const handleRemove = (itemId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
  };

  const totalValue = wishlistItems.reduce(
    (sum, item) => sum + item.currentPrice,
    0
  );
  const totalSavings = wishlistItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.currentPrice),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Wishlist
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        {/* Wishlist Items or Empty State */}
        {wishlistItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Wishlist Items - Left Side */}
            <div className="flex-1 space-y-6">
              {wishlistItems.map((item) => (
                <WishlistCard
                  key={item.id}
                  item={item}
                  onMoveToCart={handleMoveToCart}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Summary Card - Right Side on Desktop, Below on Mobile */}
            <div className="lg:w-96 shrink">
              <div className="bg-linear-to-br from-gray-900 to-gray-700 text-white rounded-2xl p-6 md:p-8 shadow-xl lg:sticky lg:top-24">
                <h3 className="text-2xl font-bold mb-6">Wishlist Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-600">
                    <span className="text-gray-300">Total Items</span>
                    <span className="text-xl font-bold">
                      {wishlistItems.length}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-gray-600">
                    <span className="text-gray-300">Total Value</span>
                    <span className="text-xl font-bold">₹{totalValue}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-green-300">Total Savings</span>
                    <span className="text-xl font-bold text-green-300">
                      ₹{totalSavings}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-white text-gray-900 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg">
                  Continue Shopping
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 md:py-24">
            <div className="mb-6 flex justify-center">
              <div className="bg-gray-100 p-8 rounded-full">
                <Heart className="w-20 h-20 text-gray-400" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Your Wishlist is Empty
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Start adding items you love to your wishlist
            </p>
            <button className="bg-gray-900 text-white py-4 px-8 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 inline-flex items-center gap-2 shadow-lg">
              Browse Products
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
