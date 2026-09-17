import { useState } from "react";
import ProductModal from "./ProductModal";

const giftsThatLastProducts = [
  {
    id: 1,
    name: "Essential Gift Box",
    tier: "Entry",
    price: "₹1,999",
    desc: "A single kansa bowl and glass, gift-boxed, an accessible entry point for first-time gifting.",
    qualityAssurance:
      "Crafted from quality kansa with a carefully finished surface, presented in a gift-ready box.",
    images: [
      "/images/gifts-that-last/essential-gift-box-1.jpg",
      "/images/gifts-that-last/essential-gift-box-2.jpg",
      "/images/gifts-that-last/essential-gift-box-3.jpg",
    ],
  },

  {
    id: 2,
    name: "Premium Gift Hamper",
    tier: "Premium",
    price: "₹4,999",
    desc: "Thali, bowls and glass presented in a curated hamper, suited for weddings, anniversaries and housewarmings.",
    qualityAssurance:
      "Premium-quality kansa pieces selected and finished for elegant gifting and long-lasting use.",
    images: [
      "/images/gifts-that-last/premium-gift-hamper-1.jpg",
      "/images/gifts-that-last/premium-gift-hamper-2.jpg",
      "/images/gifts-that-last/premium-gift-hamper-3.jpg",
    ],
  },

  {
    id: 3,
    name: "Signature Personalised Set",
    tier: "Signature",
    price: "₹5,999",
    desc: "Engraved with a name or date, a keepsake gift for milestone occasions and family celebrations.",
    qualityAssurance:
      "Carefully crafted kansa pieces with personalised engraving and a premium finishing process.",
    images: [
      "/images/gifts-that-last/signature-personalised-1.jpg",
      "/images/gifts-that-last/signature-personalised-2.jpg",
      "/images/gifts-that-last/signature-personalised-3.jpg",
    ],
  },

  {
    id: 4,
    name: "Corporate Gifting Sets",
    tier: "Bulk · Custom",
    price: "Custom Pricing",
    desc: "Bulk-order bell metal pieces for festive client and employee gifting, with custom branding options.",
    qualityAssurance:
      "Quality-checked bell metal pieces with custom branding and bulk-order options for corporate gifting.",
    images: [
      "/images/gifts-that-last/corporate-gifting-1.jpg",
      "/images/gifts-that-last/corporate-gifting-2.jpg",
      "/images/gifts-that-last/corporate-gifting-3.jpg",
    ],
  },
];

export default function GiftsThatLastCollection({ onBack }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="min-h-screen bg-cream-100">

      {/* ================= HEADER ================= */}
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
            Gifts That Last
          </h1>

          <p className="font-serif italic text-brown-300 text-xl md:text-2xl">
            Gifts made to be remembered
          </p>

          <p className="font-sans text-cream-300/70 text-sm md:text-base mt-5 max-w-2xl leading-relaxed">
            Thoughtfully crafted kansa and bell metal pieces for meaningful
            gifting, milestone occasions, celebrations and corporate moments.
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
                GIFTS THAT LAST
              </p>

              <h2 className="font-serif text-3xl text-brown-800 mt-2">
                Thoughtful Gifting
              </h2>
            </div>

            <p className="text-sm text-brown-400">
              {giftsThatLastProducts.length} Products
            </p>

          </div>

          {/* ================= 4 COLUMN GRID ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {giftsThatLastProducts.map((product) => (

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