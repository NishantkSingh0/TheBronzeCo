import { useState } from 'react';

const ENQUIRY_TYPES = [
  'Product / Collection Enquiry',
  'Corporate Gifting',
  'HoReCa & Institutional',
  'Wedding / Bulk Order',
  'Press & Partnership',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, wire to your backend / Formspree / EmailJS here
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 px-6 bg-cream-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left info */}
          <div className="reveal">
            <p className="section-label text-brown-400 mb-4">Get in Touch</p>
            <h2 className="section-heading mb-6">
              Every Conversation<br />
              <span className="italic text-brown-400">Starts Here</span>
            </h2>
            <span className="block h-px w-14 bg-brown-300 mb-8" />
            <p className="body-text mb-10 max-w-md">
              Whether you are sourcing for a wedding, building a gifting program, or simply
              curious about your first piece ,  reach out and we will respond within one business day.
            </p>

            {/* Contact channels */}
            <div className="space-y-6">
              {[
                {
                  label: 'WhatsApp',
                  value: '+91 8XX07 XX944',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  ),
                },
                {
                  label: 'Email',
                  value: 'info@thebronzeco.com',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  value: 'tbronzeco',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                },
              ].map((ch, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-brown-400">{ch.icon}</div>
                  <div>
                    <p className="font-sans text-[10px] tracking-widest uppercase text-brown-400 mb-0.5">
                      {ch.label}
                    </p>
                    <p className="font-sans text-sm text-brown-700 font-light">{ch.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal delay-200">
            {submitted ? (
              <div className="bg-white border border-cream-300 p-12 text-center flex flex-col items-center justify-center h-full">
                <div className="text-brown-400 mb-6">
                  <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl text-brown-800 mb-3">Thank You</h3>
                <p className="body-text max-w-xs">
                  We have received your message and will respond within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-cream-300 p-8 md:p-10 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-[10px] tracking-widest uppercase text-brown-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full border-b border-cream-300 focus:border-brown-400 bg-transparent py-2 font-sans text-sm text-brown-700 outline-none placeholder:text-brown-300 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] tracking-widest uppercase text-brown-400 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full border-b border-cream-300 focus:border-brown-400 bg-transparent py-2 font-sans text-sm text-brown-700 outline-none placeholder:text-brown-300 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-widest uppercase text-brown-400 mb-2">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className="w-full border-b border-cream-300 focus:border-brown-400 bg-transparent py-2 font-sans text-sm text-brown-700 outline-none placeholder:text-brown-300 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-widest uppercase text-brown-400 mb-2">
                    Enquiry Type *
                  </label>
                  <select
                    name="type"
                    required
                    value={form.type}
                    onChange={handleChange}
                    className="w-full border-b border-cream-300 focus:border-brown-400 bg-transparent py-2 font-sans text-sm text-brown-700 outline-none transition-colors duration-200 cursor-pointer"
                  >
                    <option value="" disabled>Select an enquiry type</option>
                    {ENQUIRY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-widest uppercase text-brown-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirement..."
                    className="w-full border-b border-cream-300 focus:border-brown-400 bg-transparent py-2 font-sans text-sm text-brown-700 outline-none resize-none placeholder:text-brown-300 transition-colors duration-200"
                  />
                </div>

                <button type="submit" className="btn-primary w-full text-center">
                  Send Enquiry
                </button>

                <p className="font-sans text-[10px] text-brown-400 text-center">
                  We respond within one business day. No sales calls ,  correspondence only.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
