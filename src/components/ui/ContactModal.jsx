// src/components/ContactModal.jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import ContactForm from '../Forms/ContactForm';

const ContactModal = ({ isOpen, onClose, prefillService }) => {
  //Handle Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent scrolling on the body while modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Don't render anything if closed 
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300"
      onClick={onClose} // Clicking the backdrop closes it
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f172a] border border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 rounded-full p-2 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <ContactForm key={isOpen ? 'open' : 'closed'} prefillService={prefillService} />
      </div>
    </div>
  );
};

export default ContactModal;