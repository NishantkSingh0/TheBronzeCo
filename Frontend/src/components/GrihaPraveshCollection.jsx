import { useState } from "react";
import ProductModal from "./ProductModal";

const grihaPraveshProducts = [
  {
    id: 1,
    name: "Griha Pravesh Kalash Set",
    tier: "Premium",
    price: "₹3,999",
    desc: "A traditional bronze Kalash set for Griha Pravesh rituals, symbolising prosperity, purity and auspicious beginnings.",
    qualityAssurance:
      "Crafted from premium-quality bronze with a smooth, durable finish for ceremonial use.",
    images: [
      "/images/griha-pravesh/kalash-set-1.jpg",
      "/images/griha-pravesh/kalash-set-2.jpg",
      "/images/griha-pravesh/kalash-set-3.jpg",
    ],
  },

  {
    id: 2,
    name: "First-Meal Kadai & Thali Combo",
    tier: "Classic",
    price: "₹4,999",
    desc: "A thoughtfully paired bronze Kadai and Thali combo for celebrating the first meal in a new home.",
    qualityAssurance:
      "Made with quality bronze designed for traditional cooking, serving and everyday household use.",
    images: [
      "/images/griha-pravesh/kadai-thali-1.jpg",
      "/images/griha-pravesh/kadai-thali-2.jpg",
      "/images/griha-pravesh/kadai-thali-3.jpg",
    ],
  },

  {
    id: 3,
    name: "Prosperity Dinner Set",
    tier: "Premium",
    price: "₹6,999",
    desc: "An elegant bronze dinner set created to bring tradition and warmth to meals shared in a new home.",
    qualityAssurance:
      "Premium bronze construction with a carefully finished surface for durability and long-lasting use.",
    images: [
      "/images/griha-pravesh/prosperity-dinner-1.jpg",
      "/images/griha-pravesh/prosperity-dinner-2.jpg",
      "/images/griha-pravesh/prosperity-dinner-3.jpg",
    ],
  },

  {
    id: 4,
    name: "Entry Diya Pair",
    tier: "Classic",
    price: "₹1,499",
    desc: "A graceful pair of bronze diyas for placing at the entrance and welcoming light, warmth and prosperity.",
    qualityAssurance:
      "Crafted from durable bronze with a traditional finish suitable for regular puja and festive use.",
    images: [
      "/images/griha-pravesh/entry-diya-1.jpg",
      "/images/griha-pravesh/entry-diya-2.jpg",
      "/images/griha-pravesh/entry-diya-3.jpg",
    ],
  },
];

export default function GrihaPraveshCollection({ onBack }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="min-h-screen bg-cream-100">

      {/* ================= HEADER ================= */}
      <section className="bg-brown-800 px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto">

          {/* Back to Collections */}
          <button
            onClick={onBack}
            className="mb-8 text-cream-300 hover:text-white transition-colors"
          >
            ← Back to Collections
          </button>

          <p className="section-label text-brown-300 mb-3">
            THE BRONZE COMPANY
          </p>

          <h1 className="font-serif text-5xl md:text-6xl text-cream-100 font-light mb-4">
            Griha Pravesh Collection
          </h1>

          <p className="font-serif italic text-brown-300 text-xl md:text-2xl">
            Begin your new chapter with tradition
          </p>

          <p className="font-sans text-cream-300/70 text-sm md:text-base mt-5 max-w-2xl leading-relaxed">
            Thoughtfully crafted bronze pieces for welcoming a new home,
            performing sacred rituals and celebrating the first moments
            of a beautiful new beginning.
          </p>

        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="px-6 md:px-12 lg:px-20 py-14">

        <div className="max-w-7xl mx-auto">

          {/* Section Heading */}
          <div className="flex items-center justify-between mb-8">

            <div>
              <p className="section-label text-brown-400">
                GRIHA PRAVESH
              </p>

              <h2 className="font-serif text-3xl text-brown-800 mt-2">
                New Home Essentials
              </h2>
            </div>

            <p className="text-sm text-brown-400">
              {grihaPraveshProducts.length} Products
            </p>

          </div>

          {/* ================= 4 COLUMN GRID ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {grihaPraveshProducts.map((product) => (

              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-white border border-cream-300 cursor-pointer group hover:border-brown-400 hover:shadow-lg transition-all duration-300"
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

                  <div className="flex items-start justify-between gap-2">

                    <h3 className="font-serif text-xl text-brown-800 group-hover:text-brown-600 transition-colors">
                      {product.name}
                    </h3>

                    <span className="shrink-0 text-[9px] tracking-widest uppercase text-brown-400 border border-brown-200 px-2 py-1">
                      {product.tier}
                    </span>

                  </div>

                  <p className="font-sans text-sm text-brown-500 leading-relaxed mt-3 line-clamp-2">
                    {product.desc}
                  </p>

                  <div className="flex items-center justify-between mt-5">

                    <span className="font-serif text-lg text-brown-800">
                      {product.price}
                    </span>

                    <span className="text-xs uppercase tracking-widest text-brown-400 group-hover:text-brown-700">
                      View →
                    </span>

                  </div>

                </div>

              </div>

            ))}

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