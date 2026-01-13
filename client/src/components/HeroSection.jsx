import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
const heroImages = [
  {
    url: "https://www.boat-lifestyle.com/cdn/shop/files/stone_350_pro_desktop_9604c91b-0839-47b1-998f-c5b17659996b.png?v=1763705873",
  },
  {
    url: "https://www.boat-lifestyle.com/cdn/shop/files/Rockerz_650_Pro_desktop.png?v=1764329294",
  },
  {
    url: "https://www.boat-lifestyle.com/cdn/shop/files/Artboard_1_2_d1b6b4f6-d596-463d-8d6d-dd877c957b73.png?v=1764675743",
  },
  {
    url: "https://www.boat-lifestyle.com/cdn/shop/files/Zenith_Pro_22f624e7-cc42-40a2-a080-f42256e39cb9.png?v=1761197368",
  },
];
export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };
  return (
    <section className="relative h-125 md:h-150 overflow-hidden">
      {heroImages.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-full">
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-3 rounded-full transition-all duration-200 shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-3 rounded-full transition-all duration-200 shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-8" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
