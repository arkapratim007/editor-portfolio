// src/components/Services.jsx
import React, { useState } from 'react';
import ContactModal from '../ui/ContactModal';

const pricingData = [
  {
    title: 'Short Form',
    price: '499',
    description:
      'Professional short video editing for YouTube Shorts, Instagram Reels, TikTok, and more',
    features: [
      'Hook-first storytelling',
      'Cinematic color grading',
      'Engaging sound design',
      'Fast 24-48h delivery',
    ],
    cta: 'Get Started',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Long Form',
    price: '999',
    description:
      'High-quality long-form content editing for YouTube videos or extended content',
    features: [
      'Advanced storytelling',
      'Color correction',
      'Audio mastering',
      'Detailed editing & pacing',
    ],
    cta: 'Get Started',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Premium Montages',
    price: '1,199',
    description: '1+ min long Smooth Velocity EDIT with High tier SFX and Quality Color Grading.',
    features: [
      'Custom Intro & Outro',
      'Quality Color grading',
      'Smooth Velocity EDIT',
      'Sound design & mixing',
    ],
    cta: 'Get Started',
    gradient: 'from-rose-500 to-orange-400',
  },
];

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleGetStarted = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  return (
    <section id='services' className="relative scroll-mt-24 py-28 md:py-36 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#05070d]">
        <div className="absolute left-1/2 top-0 h-125 w-225 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
      </div>
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white bg-clip-text">
          Services
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-14">
          Video production services with details and pricing
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingData.map((card, idx) => (
            <div
              key={idx}
              className="group relative bg-[#1a1633] border-2 border-[#ff007f]/30 p-8 text-left transition-all duration-75 hover:border-[#facc15] hover:-translate-y-1 rounded-none"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {card.description}
                </p>
                {/* Price */}
                <div className="mb-4">
                  <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">Starting From</p>
                  <span className="text-5xl font-black text-[#facc15]">₹{card.price}</span>
                  <span className="text-slate-400 text-sm ml-1">/ project</span>
                </div>

                <ul className="space-y-2 mb-8 text-sm text-slate-300">
                  {card.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-300 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleGetStarted(card.title)}
                  className="w-full py-4 bg-[#facc15] text-black font-black border-2 border-black shadow-[6px_6px_0px_0px_#ff007f] hover:shadow-[2px_2px_0px_0px_#ff007f] hover:translate-x-1 hover:translate-y-1 transition-all duration-75 rounded-none"
                >
                  {card.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Render the Modal ────────────────────────── */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefillService={selectedService}
      />
    </section>
  );
}