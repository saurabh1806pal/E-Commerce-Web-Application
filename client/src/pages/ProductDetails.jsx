import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { WishlistContext } from "../context/WishListContext";
import { CartContext } from "../context/CartContext";
import {
  ShoppingCart,
  Heart,
  ArrowLeft,
  Star,
  Sparkles,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";

const ProductDetails = () => {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Product Not Found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-purple-300 hover:text-white transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const description = product.description.split("/n");
  const discount = Math.round(
    ((Number(product.originalPrice) - Number(product.currentPrice)) /
      Number(product.originalPrice)) *
      100,
  );
  const savings = product.originalPrice - product.currentPrice;
  const isInCart = cart.some((item) => item._id === product._id);
  const isInWishlist = wishlist.some((item) => item._id === product._id);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
        
        * {
          font-family: 'Open Sans', sans-serif;
        }
        
        .font-display {
          font-family: 'Open Sans', serif;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-delay-100 { animation-delay: 0.1s; }
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-300 { animation-delay: 0.3s; }
        .animate-delay-400 { animation-delay: 0.4s; }
        .animate-delay-500 { animation-delay: 0.5s; }
        
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        
        .gradient-border {
          position: relative;
          background: white;
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          z-index: -1;
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .image-container {
          position: relative;
          overflow: hidden;
        }
        
        .image-container::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          bottom: -50%;
          left: -50%;
          background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
          transform: rotate(45deg);
          animation: shimmer 3s infinite;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Image */}
          <div className="space-y-6 opacity-0 animate-fade-in-up">
            {/* Main Product Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative image-container bg-linear-to-br from-slate-100 to-slate-50 rounded-3xl overflow-hidden shadow-2xl">
                {!imageLoaded && (
                  <div className="absolute inset-0 shimmer-effect"></div>
                )}
                <img
                  src={product.images}
                  alt={product.productName}
                  onLoad={() => setImageLoaded(true)}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  <div className="glass-effect px-4 py-2 rounded-full shadow-lg">
                    <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
                      {product.category}
                    </p>
                  </div>
                  {discount > 0 && (
                    <div className="bg-linear-to-r from-red-500 to-pink-500 px-4 py-2 rounded-full shadow-lg animate-pulse-slow">
                      <p className="text-sm font-bold text-white">
                        {discount}% OFF
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-md hover-lift text-center border border-slate-100">
                <Shield className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-xs font-semibold text-slate-700">
                  Authentic
                </p>
                <p className="text-xs text-slate-500 mt-1">Guaranteed</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md hover-lift text-center border border-slate-100">
                <Truck className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-xs font-semibold text-slate-700">
                  Free Shipping
                </p>
                <p className="text-xs text-slate-500 mt-1">On ₹500+</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md hover-lift text-center border border-slate-100">
                <RotateCcw className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-xs font-semibold text-slate-700">
                  Easy Returns
                </p>
                <p className="text-xs text-slate-500 mt-1">7-Day Policy</p>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {/* Brand & Title */}
            <div className="space-y-4 opacity-0 animate-fade-in-up animate-delay-200">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
                  {product.brandName}
                </p>
              </div>

              <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                {product.productName}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600 font-medium">
                  4.9 (2,847 reviews)
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="opacity-0 animate-fade-in-up animate-delay-300">
              <div className="relative bg-linear-to-br from-purple-50 via-pink-50 to-purple-50 rounded-3xl p-8 shadow-lg bg-grain border border-purple-100">
                <div className="absolute top-4 right-4">
                  <div className="bg-white px-3 py-1 rounded-full shadow-md">
                    <p className="text-xs font-bold text-green-600">
                      SAVE ₹{savings.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-5xl font-bold text-gradient">
                      ₹{product.currentPrice.toLocaleString()}
                    </span>
                    <span className="text-2xl font-semibold text-slate-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-white rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-1000"
                        style={{ width: `${discount}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-purple-700">
                      {discount}% OFF
                    </span>
                  </div>

                  <p className="text-sm text-slate-600">
                    Inclusive of all taxes • Limited time offer
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="opacity-0 animate-fade-in-up animate-delay-400">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
                Product Description
              </h2>
              <div className="space-y-3 text-slate-600 leading-relaxed">
                {description.map(
                  (line, index) =>
                    line.trim() && (
                      <p key={index} className="text-base">
                        {line}
                      </p>
                    ),
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="opacity-0 animate-fade-in-up animate-delay-500">
              <h3 className="font-semibold text-slate-900 mb-3 text-lg">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl bg-white border-2 border-slate-200 text-slate-700 font-bold hover:border-purple-400 hover:text-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  −
                </button>
                <span className="font-display text-2xl font-bold text-slate-900 w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-xl bg-white border-2 border-slate-200 text-slate-700 font-bold hover:border-purple-400 hover:text-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 opacity-0 animate-fade-in-up animate-delay-500">
              {isInCart ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromCart(product._id);
                  }}
                  className="flex-1 bg-linear-to-r from-red-600 to-pink-600 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group hover:-translate-y-1"
                >
                  <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product._id);
                  }}
                  className="flex-1 bg-linear-to-r from-purple-600 to-pink-600 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group hover:-translate-y-1"
                >
                  <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
              )}

              {isInWishlist ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromWishlist(product._id);
                  }}
                  className="w-16 h-16 bg-linear-to-br from-red-100 to-pink-100 text-red-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:-translate-y-1"
                >
                  <Heart className="w-7 h-7 fill-current group-hover:scale-110 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToWishlist(product._id);
                  }}
                  className="w-16 h-16 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl shadow-lg hover:shadow-xl hover:border-red-300 hover:text-red-600 transition-all duration-300 flex items-center justify-center group hover:-translate-y-1"
                >
                  <Heart className="w-7 h-7 group-hover:scale-110 group-hover:fill-current transition-all" />
                </button>
              )}
            </div>

            {/* Additional Info */}
            <div className="bg-slate-900 rounded-2xl p-6 shadow-xl opacity-0 animate-fade-in-up animate-delay-500">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2"></div>
                  <p className="text-slate-300 text-sm">
                    <span className="font-semibold text-white">
                      100% Authentic:
                    </span>{" "}
                    Original products with brand warranty
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2"></div>
                  <p className="text-slate-300 text-sm">
                    <span className="font-semibold text-white">
                      Secure Payment:
                    </span>{" "}
                    Multiple payment options available
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2"></div>
                  <p className="text-slate-300 text-sm">
                    <span className="font-semibold text-white">
                      Customer Support:
                    </span>{" "}
                    24/7 assistance for all your queries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
