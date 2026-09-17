import { useEffect, useState } from "react";

export default function ProductModal({ product, onClose }) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Lock background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Agar product nahi hai
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >

      {/* ================= BACKDROP ================= */}
      <div
        className="absolute inset-0 bg-brown-900/80 backdrop-blur-sm"
        onClick={onClose}
      />


      {/* ================= MODAL ================= */}
      <div className="relative z-10 bg-cream-100 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-lg shadow-2xl">

        {/* ================= CLOSE BUTTON ================= */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-brown-800 text-cream-100 rounded-full hover:bg-brown-700 transition-colors duration-200"
          aria-label="Close product details"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>


        {/* ================= PRODUCT CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2">


          {/* ================================================= */}
          {/* LEFT SIDE - IMAGES */}
          {/* ================================================= */}
          <div className="p-5 md:p-8 bg-cream-200">

            {/* Main Image */}
            <div className="aspect-square bg-white overflow-hidden mb-4">
              {product.images?.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brown-400">
                  No Image Available
                </div>
              )}
            </div>


            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="grid grid-cols-3 gap-3">

                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? "border-brown-700"
                        : "border-transparent hover:border-brown-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}

              </div>
            )}

          </div>


          {/* ================================================= */}
          {/* RIGHT SIDE - PRODUCT DETAILS */}
          {/* ================================================= */}
          <div className="p-6 md:p-10 flex flex-col justify-center">

            {/* Tier */}
            <div className="mb-4">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brown-500 border border-brown-300 px-3 py-1">
                {product.tier}
              </span>
            </div>


            {/* Product Name */}
            <h2 className="font-serif text-3xl md:text-4xl text-brown-800 font-light leading-tight mb-4">
              {product.name}
            </h2>


            {/* Price */}
            <p className="font-sans text-2xl text-brown-700 mb-6">
              {product.price}
            </p>


            {/* Divider */}
            <div className="h-px bg-brown-200 mb-6" />


            {/* Description */}
            <div className="mb-7">
              <p className="section-label text-brown-400 mb-3">
                Description
              </p>

              <p className="font-sans text-sm md:text-base text-brown-600 leading-relaxed font-light">
                {product.desc}
              </p>
            </div>


            {/* Quality Assurance */}
            <div className="bg-brown-800 p-5 md:p-6 mb-7">

              <div className="flex items-start gap-4">

                {/* Shield Icon */}
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
                      d="M9 12.75L11.25 15 15 9.75m-3.036-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 013 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>


                <div>
                  <p className="font-sans text-brown-300 text-xs tracking-widest uppercase mb-2">
                    Quality Assurance
                  </p>

                  <p className="font-sans text-cream-300/80 text-sm leading-relaxed font-light">
                    {product.qualityAssurance}
                  </p>
                </div>

              </div>

            </div>


            {/* Enquiry Button */}
            <button
              onClick={() => {
                onClose();

                setTimeout(() => {
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }, 100);
              }}
              className="btn-primary w-full"
            >
              Enquire About This Product
            </button>


            {/* Continue Browsing */}
            <button
              onClick={onClose}
              className="btn-outline w-full mt-3"
            >
              Continue Browsing
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}