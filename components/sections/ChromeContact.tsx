"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  FileText,
  MapPin,
  ArrowUpRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";

export function ChromeContact() {
  const { personal } = PORTFOLIO_DATA;

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formState.name.trim()) errors.name = "Full name is required";
    if (!formState.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formState.message.trim()) errors.message = "Message cannot be empty";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    // Simulate sending delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.8 },
        colors: ["#1a73e8", "#34a853", "#fbbc05", "#ea4335"],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-20 border-t border-[#27344D] bg-[#0B1020]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4285F4]/15 text-[#22D3EE] text-xs font-mono font-medium mb-2 border border-[#4285F4]/20">
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
            Contact &amp; Connect
          </h2>
          <p className="text-sm text-[#AAB6CC] mt-1 max-w-2xl">
            Open for full-stack web developer opportunities, graduate engineer roles, and technical collaborations.
          </p>
        </div>

        {/* Two-Column Grid: Contact Channels (Left) & Message Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Communication Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="chrome-card p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-accent-tint)] flex items-center justify-center text-[#1a73e8] dark:text-[#8ab4f8] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[var(--text-secondary)] font-mono block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-[#1a73e8] transition-colors break-all"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors shrink-0"
                  aria-label="Copy email"
                  title="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-[#34a853]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="chrome-card neon-border-card p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4285F4]/15 border border-[#4285F4]/30 flex items-center justify-center text-[#4285F4] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#AAB6CC] font-mono block">
                      Direct Phone
                    </span>
                    <a
                      href="tel:+919342983525"
                      className="text-sm font-semibold text-[#F8FAFC] hover:text-[#4285F4] transition-colors font-mono"
                      title="Call: +91 9342983525"
                    >
                      +91 9342983525
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* WhatsApp Quick Action Button */}
                  <a
                    href="https://wa.me/919342983525"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                    aria-label="Chat on WhatsApp"
                    title="Chat on WhatsApp"
                  >
                    <WhatsappIcon className="w-4 h-4" />
                  </a>

                  {/* Copy Phone Button */}
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 rounded-lg border border-[#27344D] text-[#AAB6CC] hover:text-[#F8FAFC] hover:bg-[#10182B] transition-colors"
                    aria-label="Copy phone number"
                    title="Copy phone"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-[#34a853]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Dedicated WhatsApp Card */}
            <div className="chrome-card neon-border-card p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0">
                    <WhatsappIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#AAB6CC] font-mono block">
                      Instant Messaging
                    </span>
                    <a
                      href="https://wa.me/919342983525"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#F8FAFC] hover:text-[#25D366] transition-colors font-mono"
                      title="Chat on WhatsApp"
                    >
                      +91 9342983525
                    </a>
                  </div>
                </div>

                <a
                  href="https://wa.me/919342983525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all shadow-md shadow-green-500/20 font-mono"
                  title="Chat on WhatsApp"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsappIcon className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* LinkedIn & GitHub Card */}
            <div className="chrome-card neon-border-card p-5">
              <span className="text-xs text-[#AAB6CC] font-mono block mb-3">
                Professional Networks
              </span>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href="https://www.linkedin.com/in/muthu-mani-aa6089386/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#F8FAFC] bg-[#10182B] hover:bg-[#4285F4]/15 hover:text-[#4285F4] border border-[#27344D] hover:border-[#4285F4]/40 transition-colors"
                  title="Visit my LinkedIn profile"
                  aria-label="Visit my LinkedIn profile"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#4285F4]" />
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#AAB6CC]" />
                </a>

                <a
                  href="https://github.com/muthumani1330"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#F8FAFC] bg-[#10182B] hover:bg-[#4285F4]/15 hover:text-[#22D3EE] border border-[#27344D] hover:border-[#4285F4]/40 transition-colors"
                  title="Visit my GitHub profile"
                  aria-label="Visit my GitHub profile"
                >
                  <GithubIcon className="w-4 h-4 text-[#22D3EE]" />
                  <span>GitHub Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#AAB6CC]" />
                </a>
              </div>
            </div>

            {/* Resume Download Callout */}
            <div className="chrome-card p-5 bg-[var(--bg-accent-tint)] border-[#1a73e8]/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#1a73e8] dark:text-[#8ab4f8] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-[var(--text-primary)] block">
                    Curriculum Vitae / Resume
                  </span>
                  <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                    Format: PDF (Updated 2026)
                  </span>
                </div>
              </div>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Muthumani_P_Resume.pdf"
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#174ea6] transition-colors shadow-sm shrink-0"
              >
                Download PDF
              </a>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 chrome-card p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
              Send a Message
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6">
              Have an open role, inquiry, or project? Fill out the details below.
            </p>

            {isSubmitted ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#34a853]/10 border border-[#34a853]/20 flex items-center justify-center text-[#34a853] mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[var(--text-primary)] mb-1">
                  Message Dispatched!
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm mb-5 leading-relaxed">
                  Thank you, {formState.name}! I have received your message and will respond to <strong>{formState.email}</strong> promptly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--text-primary)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1"
                    >
                      Your Name <span className="text-[#ea4335]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="e.g. Recruiter or Hiring Lead"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
                    />
                    {formErrors.name && (
                      <span className="text-[11px] text-[#ea4335] font-mono mt-1 block">
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1"
                    >
                      Your Email <span className="text-[#ea4335]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
                    />
                    {formErrors.email && (
                      <span className="text-[11px] text-[#ea4335] font-mono mt-1 block">
                        {formErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                    placeholder="e.g. Web Developer Role / Interview Opportunity"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1"
                  >
                    Message <span className="text-[#ea4335]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    placeholder="Hello Muthumani, I came across your portfolio and would like to discuss..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] resize-none"
                  />
                  {formErrors.message && (
                    <span className="text-[11px] text-[#ea4335] font-mono mt-1 block">
                      {formErrors.message}
                    </span>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                    Direct inquiries welcome at {personal.email}
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#174ea6] shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
