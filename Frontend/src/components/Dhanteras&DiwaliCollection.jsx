import { useState } from "react";
import ProductModal from "./ProductModal";

const dhanTerasDiwaliProducts = [
  {
    id: 1,
    name: "Dhanteras Special Set",
    tier: "Premium",
    price: "₹4,999",
    desc: "A specially curated bell metal set for Dhanteras, designed to bring timeless tradition and elegance to festive celebrations.",
    qualityAssurance:
      "Made with carefully selected bell metal and finished for long-lasting durability. Each piece carries batch-level quality assurance.",
    images: [
      "/images/dhanteras-diwali/dhanteras-special-1.jpg",
      "/images/dhanteras-diwali/dhanteras-special-2.jpg",
      "/images/dhanteras-diwali/dhanteras-special-3.jpg",
    ],
  },
  {
    id: 2,
    name: "Lakshmi Puja Thali",
    tier: "Signature",
    price: "₹2,499",
    desc: "A traditional puja thali crafted for Lakshmi Puja, combining functional ritual essentials with the warmth of handcrafted metal.",
    qualityAssurance:
      "Crafted with attention to finish, strength and traditional detailing. Every piece undergoes quality checks before dispatch.",
    images: [
      "/images/dhanteras-diwali/lakshmi-puja-thali-1.jpg",
      "/images/dhanteras-diwali/lakshmi-puja-thali-2.jpg",
      "/images/dhanteras-diwali/lakshmi-puja-thali-3.jpg",
    ],
  },
  {
    id: 3,
    name: "Festive Serving Set",
    tier: "Premium",
    price: "₹5,499",
    desc: "An elegant serving collection made for festive gatherings, celebrations and family meals during Diwali.",
    qualityAssurance:
      "Made for repeated festive use with durable bell metal construction and a carefully finished surface.",
    images: [
      "/images/dhanteras-diwali/festive-serving-1.jpg",
      "/images/dhanteras-diwali/festive-serving-2.jpg",
      "/images/dhanteras-diwali/festive-serving-3.jpg",
    ],
  },
  {
    id: 4,
    name: "Prasad Bowls (Set of 6)",
    tier: "Essential",
    price: "₹1,999",
    desc: "A set of six traditional bowls, ideal for serving prasad, dry fruits and festive offerings during Diwali celebrations.",
    qualityAssurance:
      "Crafted for everyday and festive use with durable bell metal construction and consistent finishing across the set.",
    images: [
      "/images/dhanteras-diwali/prasad-bowls-1.jpg",
      "/images/dhanteras-diwali/prasad-bowls-2.jpg",
      "/images/dhanteras-diwali/prasad-bowls-3.jpg",
    ],
  },
];

export default function DhanterasDiwaliCollection({ onBack }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="min-h-screen bg-cream-100">

      {/* Header */}
      <section className="bg-brown-800 px-6 py-12 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">

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

          <p className="section-label text-brown-300 mb-3">
            FESTIVE COLLECTION
          </p>

          <h1 className="font-serif text-4xl md:text-6xl text-cream-100 font-light mb-3">
            Dhanteras & Diwali
          </h1>

          <p className="font-serif italic text-brown-300 text-xl font-light">
            Celebrate tradition, abundance & togetherness
          </p>

          <p className="font-sans text-cream-300/70 text-sm mt-5 max-w-2xl leading-relaxed font-light">
            Thoughtfully crafted bell metal pieces for Dhanteras,
            Lakshmi Puja and Diwali celebrations — made to become
            part of your festive rituals year after year.
          </p>

        </div>
      </section>

      {/* Products */}
      <section className="px-6 py-12 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">

          <p className="section-label text-brown-400 mb-8">
            Dhanteras & Diwali Products
          </p>

          {/* 4 COLUMN GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {dhanTerasDiwaliProducts.map((product) => (
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

                {/* Product Info */}
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

          {/* Quality Assurance */}
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
                Every piece in the Dhanteras & Diwali collection is
                carefully finished and quality checked before it
                reaches you.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </div>
  );
}