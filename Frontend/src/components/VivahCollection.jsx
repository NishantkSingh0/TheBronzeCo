import { useState } from "react";
import ProductModal from "./ProductModal";

const vivaahProducts = [
  {
    id: 1,
    name: "Bridal Thali Set",
    tier: "Premium",
    price: "₹4,999",
    desc: "A beautifully crafted bronze thali set designed for wedding rituals, gifting and the bride's new beginning.",
    qualityAssurance:
      "Made with premium-quality bronze and carefully finished for long-lasting use.",
    images: [
      "/images/vivaah/bridal-thali-1.jpg",
      "/images/vivaah/bridal-thali-2.jpg",
      "/images/vivaah/bridal-thali-3.jpg",
    ],
  },
  {
    id: 2,
    name: "Jodi Glass Pair",
    tier: "Classic",
    price: "₹1,999",
    desc: "A traditional pair of bronze glasses symbolising togetherness and companionship.",
    qualityAssurance:
      "Crafted from quality bronze with a smooth finish suitable for everyday and ceremonial use.",
    images: [
      "/images/vivaah/jodi-glass-1.jpg",
      "/images/vivaah/jodi-glass-2.jpg",
      "/images/vivaah/jodi-glass-3.jpg",
    ],
  },
  {
    id: 3,
    name: "Shagun Serving Platter",
    tier: "Premium",
    price: "₹2,999",
    desc: "An elegant bronze serving platter for presenting shagun, sweets, dry fruits and wedding gifts.",
    qualityAssurance:
      "Premium bronze construction with a refined finish made for gifting and special occasions.",
    images: [
      "/images/vivaah/shagun-platter-1.jpg",
      "/images/vivaah/shagun-platter-2.jpg",
      "/images/vivaah/shagun-platter-3.jpg",
    ],
  },
  {
    id: 4,
    name: "New Kitchen Starter Set",
    tier: "Complete Set",
    price: "₹7,999",
    desc: "A thoughtfully curated bronze kitchen starter set for beginning a new household with traditional essentials.",
    qualityAssurance:
      "Each piece is selected for quality, durability and practical everyday use.",
    images: [
      "/images/vivaah/kitchen-starter-1.jpg",
      "/images/vivaah/kitchen-starter-2.jpg",
      "/images/vivaah/kitchen-starter-3.jpg",
    ],
  },
];

export default function VivahCollection({ onBack }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="min-h-screen bg-cream-100">

      {/* Header */}
      <section className="bg-brown-800 px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto">

          {/* Back Button */}
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
            Vivaah Collection
          </h1>

          <p className="font-serif italic text-brown-300 text-xl md:text-2xl">
            Pieces for beginnings that last
          </p>

          <p className="font-sans text-cream-300/70 text-sm md:text-base mt-5 max-w-2xl leading-relaxed">
            Thoughtfully crafted bronze pieces for weddings, shagun,
            gifting and the beautiful beginning of a new home.
          </p>

        </div>
      </section>

      {/* Products */}
      <section className="px-6 md:px-12 lg:px-20 py-14">

        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="section-label text-brown-400">
                VIVAAH
              </p>

              <h2 className="font-serif text-3xl text-brown-800 mt-2">
                Wedding Essentials
              </h2>
            </div>

            <p className="text-sm text-brown-400">
              {vivaahProducts.length} Products
            </p>
          </div>

          {/* 4 Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {vivaahProducts.map((product) => (
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

                {/* Product Info */}
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