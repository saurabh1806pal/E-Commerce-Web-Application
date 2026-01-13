import React from "react";

const categories = [
  {
    name: "Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    count: "50+ Products",
  },
  {
    name: "Earbuds",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
    count: "40+ Products",
  },
  {
    name: "Watches",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    count: "60+ Products",
  },
  {
    name: "Speakers",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
    count: "30+ Products",
  },
  {
    name: "Wallets",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
    count: "25+ Products",
  },
  {
    name: "Posters",
    image:
      "https://imgs.search.brave.com/UzVcs_MbOGcrZCwA-5tQ-dMEW-f_6zPc1hZ8ywVHpGc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YXJjcHJpbnQuaW4v/YXNzZXRzL21lZGlh/L3Byb2R1Y3RzX2Nv/bW1vbl9pbWdzL2N1/c3RvbS1wb3N0ZXJz/LzMuanBnP3Zlcj00/LjExLjA",
    count: "100+ Products",
  },
];

export default function Categories() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Shop by Category
        </h2>
        <p className="text-gray-600 text-lg">Browse our curated collections</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category) => (
          <div key={category.name} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl aspect-square mb-3 shadow-md hover:shadow-xl transition-all duration-300">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-lg">{category.name}</h3>
                <p className="text-sm text-gray-200">{category.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
