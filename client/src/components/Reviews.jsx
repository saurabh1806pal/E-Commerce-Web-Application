import React from "react";
import { Quote, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Amazing products and fast delivery! The quality exceeded my expectations. Highly recommend!",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    comment:
      "Great customer service and excellent product range. Will definitely shop again!",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 4,
    comment:
      "Love the variety of products available. Prices are competitive and shipping was quick.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    date: "2 weeks ago",
  },
];

export default function Reviews() {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-lg">
          Real reviews from real customers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 relative"
          >
            <div className="absolute top-4 right-4 text-gray-300">
              <Quote className="w-10 h-10" />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
              <div>
                <h4 className="font-bold text-gray-900">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-4">{renderStars(review.rating)}</div>

            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
