import { useState, useContext } from "react";
import {
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  LogOut,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Get user & logout from AuthContext
  const { user, logout } = useContext(AuthContext);

  const categories = [
    "Headphones",
    "Earbuds",
    "Watch",
    "Speaker",
    "Wallets",
    "Posters",
  ];

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-linear-to-br from-gray-700 to-gray-600 p-1.5 rounded-lg group-hover:from-gray-600 group-hover:to-gray-500 transition-all duration-300">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6_2YFQT9AhnHfIaNsjy2rJAOdXC0vyU56KA&s"
                alt="ShopHub Logo"
                className="w-6 h-6 object-cover rounded"
              />
            </div>
            <span className="text-xl font-bold hidden sm:block">Deployed</span>
          </Link>

          {/* Categories - Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                to={`#${category.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {/* Wishlist */}
          {user ? (
            <>
              <Link
                to="/wishlist"
                className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {user.favourites.length}
                </span>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {user.cart.length}
                </span>
              </Link>
            </>
          ) : (
            <></>
          )}

          {/* Conditional: Login/Signup OR Profile */}
          {user ? (
            // Profile Dropdown
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                <div className="bg-gray-700 p-1.5 rounded-full group-hover:bg-gray-600 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                  <div className="bg-linear-to-r from-gray-900 to-gray-700 px-4 py-3">
                    <p className="text-white font-semibold">
                      {user.name || "User"}
                    </p>
                    <p className="text-gray-300 text-sm">{user.email}</p>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <UserCircle className="w-5 h-5" />
                      <span className="font-medium">My Profile</span>
                    </Link>

                    <button
                      onClick={logout} // ✅ Use AuthContext logout
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Login/Signup Buttons
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden py-4 px-4 border-t border-gray-700">
          {/* Categories */}
          <div className="space-y-2 mb-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`#${category.toLowerCase()}`}
                className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                {category}
              </Link>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="space-y-2 pt-4 border-t border-gray-700">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <UserCircle className="w-5 h-5" />
                  My Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link
                  to="/login"
                  className="flex-1 px-4 py-3 text-center text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 px-4 py-3 text-center bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
