import { useState } from "react";
import ProductModal from "./ProductModal";

const dailyRitualProducts = [
  {
    id: 1,
    name: "Daily Kansa Water Glass",
    tier: "Essential",
    price: "₹899",
    desc: "A timeless kansa water glass designed for everyday use, bringing traditional metalware into your daily hydration ritual.",
    qualityAssurance:
      "Crafted from quality bell metal with a durable finish and carefully checked for everyday use.",
    images: [
      "/images/daily-rituals/kansa-water-glass-1.jpg",
      "/images/daily-rituals/kansa-water-glass-2.jpg",
      "/images/daily-rituals/kansa-water-glass-3.jpg",
    ],
  },

  {
    id: 2,
    name: "Kansa Tongue Cleaner",
    tier: "Essential",
    price: "₹499",
    desc: "A traditional kansa tongue cleaner designed to bring an age-old wellness ritual into your everyday morning routine.",
    qualityAssurance:
      "Made with carefully finished bell metal and checked for smooth edges and comfortable everyday handling.",
    images: [
      "/images/daily-rituals/kansa-tongue-cleaner-1.jpg",
      "/images/daily-rituals/kansa-tongue-cleaner-2.jpg",
      "/images/daily-rituals/kansa-tongue-cleaner-3.jpg",
    ],
  },

  {
    id: 3,
    name: "Everyday Dinner Set",
    tier: "Premium",
    price: "₹3,999",
    desc: "A practical bell metal dinner collection made for everyday family meals, combining traditional craftsmanship with daily functionality.",
    qualityAssurance:
      "Crafted for regular use with durable bell metal construction and carefully inspected finishing across every piece.",
    images: [
      "/images/daily-rituals/everyday-dinner-set-1.jpg",
      "/images/daily-rituals/everyday-dinner-set-2.jpg",
      "/images/daily-rituals/everyday-dinner-set-3.jpg",
    ],
  },

  {
    id: 4,
    name: "Wellness Ritual Bowl",
    tier: "Signature",
    price: "₹1,499",
    desc: "A thoughtfully crafted kansa bowl for everyday wellness rituals, serving, mindful meals and traditional practices.",
    qualityAssurance:
      "Made with quality bell metal and finished with attention to durability, smoothness and long-term everyday use.",
    images: [
      "/images/daily-rituals/wellness-ritual-bowl-1.jpg",
      "/images/daily-rituals/wellness-ritual-bowl-2.jpg",
      "/images/daily-rituals/wellness-ritual-bowl-3.jpg",
    ],
  },
];

export default function DailyRitualCollection({ onBack }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="min-h-screen bg-cream-100">

      {/* ================= HEADER ================= */}
      <section className="bg-brown-800 px-6 py-12 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">

          {/* Back Button */}
          <button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-cream-300 hover:text-cream-100 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>

            <span className="font-sans text-sm">
              Back to Collections
            </span>
          </button>

          {/* Collection Title */}
          <p className="section-label text-brown-300 mb-3">
            EVERYDAY COLLECTION
          </p>

          <h1 className="font-serif text-4xl md:text-6xl text-cream-100 font-light mb-3">
            Daily Rituals
          </h1>

          <p className="font-serif italic text-brown-300 text-xl font-light">
            Everyday objects, timeless rituals
          </p>

          <p className="font-sans text-cream-300/70 text-sm mt-5 max-w-2xl leading-relaxed font-light">
            Thoughtfully crafted bell metal pieces designed to bring
            traditional rituals, mindful living and timeless
            craftsmanship into everyday life.
          </p>

        </div>
      </section>


      {/* ================= PRODUCTS ================= */}
      <section className="px-6 py-12 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">

          <p className="section-label text-brown-400 mb-8">
            Daily Ritual Products
          </p>

          {/* 4 COLUMN GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {dailyRitualProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-white border border-cream-300 cursor-pointer group hover:border-brown-400 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >

                {/* Product Image */}
                <div className="aspect-square bg-cream-200 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>


                {/* Product Details */}
                <div className="p-5">

                  <div className="flex items-start justify-between gap-2 mb-3">

                    <h2 className="font-serif text-xl text-brown-800 leading-snug group-hover:text-brown-600 transition-colors">
                      {product.name}
                    </h2>

                    <span className="font-sans text-[9px] tracking-widest uppercase text-brown-400 border border-brown-200 px-2 py-1 shrink-0">
                      {product.tier}
                    </span>

                  </div>

                  <p className="font-sans text-sm text-brown-500 leading-relaxed font-light line-clamp-3">
                    {product.desc}
                  </p>

                  <div className="mt-4 flex items-center justify-between">

                    <span className="font-sans text-sm text-brown-700">
                      {product.price}
                    </span>

                    <span className="font-sans text-xs text-brown-400 group-hover:text-brown-700 transition-colors">
                      View Details →
                    </span>

                  </div>

                </div>

              </div>
            ))}

          </div>


          {/* ================= QUALITY ASSURANCE ================= */}
          <div className="mt-12 bg-brown-800 p-6 md:p-8 flex items-start gap-4">

            <div className="shrink-0 text-brown-300 mt-0.5">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 013 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>

            <div>
              <p className="font-sans text-brown-300 text-xs tracking-widest uppercase mb-2">
                Quality Assurance
              </p>

              <p className="font-sans text-cream-300/80 text-sm leading-relaxed font-light">
                Every piece in the Daily Rituals collection is
                carefully finished and quality checked before it
                reaches you.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ================= PRODUCT MODAL ================= */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </div>
  );
}