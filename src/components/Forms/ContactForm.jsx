// src/components/ContactForm.js
import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import {
  User,
  AtSign,
  Phone,
  Hash,
  FileText,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ContactForm = ({ prefillService }) => {
  // ─── State ──────────────────────────────────────────
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    brand: "",
    service: "",
    platform: "",
    projectDetails: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // "idle" | "success" | "error"
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
  if (prefillService) {
    setFormData((prev) => ({ ...prev, service: prefillService }));
  }
}, [prefillService]);

  // ─── Service & platform options ─────────────────────
  const serviceOptions = [
    "Short Form",
    "Long Form",
    "Premium Montages",
    "Custom Package",
    "Other",
  ];

  const platformOptions = [
    "YouTube",
    "TikTok",
    "Instagram Reels",
    "Other",
  ];

  // ─── Handlers ────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Contact number is required";
    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = "Project details are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setIsSubmitting(true);
  setSubmitStatus("idle");

  try {
    // ─── EmailJS Integration ──────────────────────
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      brand: formData.brand || "Not specified",
      service: formData.service || "Not specified",
      platform: formData.platform || "Not specified",
      project_details: formData.projectDetails,
    };

    // Send the email
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log('SUCCESS!', response.text);

    // ─── Success ──────────────────────────────────
    setSubmitStatus("success");
    setSubmitMessage(
      "✓ Your message has been sent! We'll get back to you within 24 hours."
    );
    setFormData({
      name: "",
      email: "",
      phone: "",
      brand: "",
      service: "",
      platform: "",
      projectDetails: "",
    });
  } catch (error) {
    console.error('Form submission error:', error);
    setSubmitStatus("error");
    setSubmitMessage(
      "✗ Something went wrong. Please try again or reach out directly on Discord."
    );
  } finally {
    setIsSubmitting(false);
  }
};

  // ─── Render ──────────────────────────────────────────
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Start Your Project</h2>
        <span className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/30">
          * Required
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full pl-9 pr-4 py-2.5 bg-slate-800/60 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.name
                    ? "border-rose-500/50 focus:ring-rose-500/30"
                    : "border-slate-700/50 focus:ring-purple-500/30 focus:border-purple-500/50"
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Email Address <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <AtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full pl-9 pr-4 py-2.5 bg-slate-800/60 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.email
                    ? "border-rose-500/50 focus:ring-rose-500/30"
                    : "border-slate-700/50 focus:ring-purple-500/30 focus:border-purple-500/50"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Phone & Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Contact Number <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your contact number"
                className={`w-full pl-9 pr-4 py-2.5 bg-slate-800/60 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.phone
                    ? "border-rose-500/50 focus:ring-rose-500/30"
                    : "border-slate-700/50 focus:ring-purple-500/30 focus:border-purple-500/50"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Channel / Brand Name
            </label>
            <div className="relative">
              <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter your channel or brand"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Service & Platform */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Service Needed
              <span className="ml-1 text-slate-500 text-[10px]">(optional)</span>
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all duration-200 appearance-none"
            >
              <option value="">Select your service</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-slate-800">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Primary Platform <span className="text-rose-400">*</span>
            </label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all duration-200 appearance-none"
            >
              <option value="">Select your platform</option>
              {platformOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-slate-800">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Details */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Project Details <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <FileText size={16} className="absolute left-3 top-3 text-slate-500" />
            <textarea
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your vision, timeline, and budget..."
              className={`w-full pl-9 pr-4 py-2.5 bg-slate-800/60 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 resize-y min-h-25 ${
                errors.projectDetails
                  ? "border-rose-500/50 focus:ring-rose-500/30"
                  : "border-slate-700/50 focus:ring-purple-500/30 focus:border-purple-500/50"
              }`}
            />
          </div>
          {errors.projectDetails && (
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.projectDetails}
            </p>
          )}
        </div>

        {/* Status Message */}
        {submitStatus !== "idle" && (
          <div
            className={`p-4 rounded-xl text-sm flex items-start gap-3 ${
              submitStatus === "success"
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                : "bg-rose-500/10 border border-rose-500/20 text-rose-300"
            }`}
          >
            {submitStatus === "success" ? (
              <CheckCircle size={18} className="shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
            )}
            <span>{submitMessage}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
            isSubmitting
              ? "bg-slate-700/50 text-slate-400 cursor-not-allowed"
              : "bg-linear-to-r from-teal-500 to-violet-400 hover:from-violet-500 hover:to-purle-500 text-white shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 active:scale-[0.98]"
          }`}
        >
          {isSubmitting ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={18} />
              Send Transmission
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-slate-500 mt-3">
          By submitting, you agree to our terms and privacy policy.
        </p>
      </form>
    </>
  );
};

export default ContactForm;