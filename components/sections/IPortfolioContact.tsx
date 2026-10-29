"use client";

import React, { useState } from "react";
import { MapPin, Mail, Phone, Send, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { LinkedinIcon, GithubIcon } from "@/components/ui/BrandIcons";

export function IPortfolioContact() {
  const { personal, contact } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Construct mailto link as reliable fallback
    const mailtoSubject = encodeURIComponent(formData.subject || "Portfolio Contact Message");
    const mailtoBody = encodeURIComponent(`From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-6 sm:px-10 max-w-6xl mx-auto">
      {/* Signature iPortfolio Section Title */}
      <div className="section-title">
        <span className="text-xs font-mono font-bold tracking-widest text-[#149ddd] uppercase block mb-1">
          {contact.label}
        </span>
        <h2>{contact.heading}</h2>
        <p>
          {contact.supportingText}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Info Wrap (iPortfolio style) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] shadow-sm space-y-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#149ddd]/15 text-[#149ddd] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[var(--heading-color)] font-['Raleway']">
                Location
              </h4>
              <p className="text-xs sm:text-sm text-[var(--default-color)] mt-1">
                {contact.location || personal.location}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#149ddd]/15 text-[#149ddd] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[var(--heading-color)] font-['Raleway']">
                Email
              </h4>
              <a
                href={`mailto:${contact.email}`}
                className="text-xs sm:text-sm text-[var(--default-color)] hover:text-[#149ddd] mt-1 block break-all font-mono"
              >
                {contact.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#149ddd]/15 text-[#149ddd] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[var(--heading-color)]">
                Phone &amp; WhatsApp
              </h4>
              <a
                href={`tel:${contact.phone}`}
                className="text-xs sm:text-sm text-[var(--default-color)] hover:text-[#149ddd] mt-1 block font-mono"
                title={`Call: ${contact.phone}`}
              >
                {contact.phone}
              </a>
              <a
                href="https://wa.me/919342983525"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#25D366] hover:underline mt-1 inline-flex items-center gap-1 font-mono"
                title="Chat on WhatsApp"
              >
                <span>Chat on WhatsApp →</span>
              </a>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border-color)] space-y-3">
            <h5 className="text-xs font-bold text-[var(--heading-color)] uppercase font-mono">
              Professional Profiles
            </h5>
            <div className="flex items-center gap-3">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--subtle-bg)] hover:bg-[#0a66c2] hover:text-white text-xs font-mono border border-[var(--border-color)] transition-all"
                title="Visit my LinkedIn profile"
                aria-label="Visit my LinkedIn profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--subtle-bg)] hover:bg-slate-900 hover:text-white text-xs font-mono border border-[var(--border-color)] transition-all"
                title="Visit my GitHub profile"
                aria-label="Visit my GitHub profile"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form (iPortfolio style) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] shadow-sm">
          {isSubmitted ? (
            <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#34a853]" />
              <h4 className="text-lg font-bold text-[var(--heading-color)]">
                Message Sent Successfully!
              </h4>
              <p className="text-xs text-[var(--default-color)] max-w-sm">
                Thank you for reaching out, Muthumani will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--heading-color)] uppercase font-mono mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--subtle-bg)] border border-[var(--border-color)] text-xs text-[var(--heading-color)] focus:outline-none focus:border-[#149ddd] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--heading-color)] uppercase font-mono mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--subtle-bg)] border border-[var(--border-color)] text-xs text-[var(--heading-color)] focus:outline-none focus:border-[#149ddd] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--heading-color)] uppercase font-mono mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Project Discussion / Job Opportunity"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--subtle-bg)] border border-[var(--border-color)] text-xs text-[var(--heading-color)] focus:outline-none focus:border-[#149ddd] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--heading-color)] uppercase font-mono mb-1.5">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--subtle-bg)] border border-[var(--border-color)] text-xs text-[var(--heading-color)] focus:outline-none focus:border-[#149ddd] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#149ddd] hover:bg-[#1182b8] text-white text-xs font-semibold transition-all shadow-md hover:-translate-y-0.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

