import { SearchX, Home, ArrowLeft, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500 opacity-5 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div
          className="absolute w-96 h-96 bg-blue-500 opacity-5 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute w-64 h-64 bg-blue-500 opacity-3 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Content Card */}
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-0 bg-linear-to-r from-blue-900 to-gray-700 rounded-3xl blur-xl opacity-20 animate-pulse"></div>

        <div className="relative bg-gray-800 bg-opacity-95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-700 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-linear-to-br from-blue-600 to-gray-700 p-6 rounded-full">
                <SearchX className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div className="mb-4">
            <h1 className="text-8xl md:text-9xl font-black bg-linear-to-r from-blue-400 to-gray-400 bg-clip-text text-transparent">
              404
            </h1>
          </div>

          {/* Error Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>

          {/* Error Description */}
          <p className="text-gray-400 text-lg mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Please check the URL or navigate back to safety.
          </p>

          {/* Lost Icon with Animation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-900 p-6 rounded-2xl border-2 border-blue-900 animate-pulse">
              <MapPin className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>

            <a
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-linear-to-r from-blue-600 to-gray-700 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-gray-600 transition-all duration-200 shadow-lg group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Go to Homepage
            </a>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-500 text-sm">
              Error Code:{" "}
              <span className="text-gray-400 font-mono">ERR_NOT_FOUND_404</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
