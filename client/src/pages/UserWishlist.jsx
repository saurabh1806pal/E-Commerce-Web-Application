import WishlistCard from "./CardWishlist";
import { useContext } from "react";
import { ArrowRight, Heart } from "lucide-react";
import SummaryCard from "./CardSummary";
import { WishlistContext } from "../context/WishListContext";

export default function WishlistPage() {
  const { wishlist } = useContext(WishlistContext);
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
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
            for later
          </p>
        </div>

        {/* Wishlist Items or Empty State */}
        {wishlist.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Wishlist Items - Left Side */}
            <div className="flex-1 space-y-6">
              {wishlist.map((item) => (
                <WishlistCard key={item._id} item={item} />
              ))}
            </div>

            {/* Summary Card - Right Side on Desktop, Below on Mobile */}
            <div className="lg:w-96 shrink">
              <div className="bg-linear-to-br from-gray-900 to-gray-700 text-white rounded-2xl p-6 md:p-8 shadow-xl lg:sticky lg:top-24">
                <h3 className="text-2xl font-bold mb-6">Wishlist Summary</h3>

                <SummaryCard item={wishlist} />

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
