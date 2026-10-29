"use client";

import React from "react";
import { ArrowUp, FileText, Mail, Phone, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";

interface ChromeFooterProps {
  onReplayIntro?: () => void;
}

export function ChromeFooter({ onReplayIntro }: ChromeFooterProps = {}) {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#27344D] bg-[#0B1020] py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#27344D]">
          {/* Brand & Title */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#4285F4] to-[#8B5CF6] text-white flex items-center justify-center font-bold text-xs">
                M
              </div>
              <span className="font-bold text-sm text-[#F8FAFC]">
                {personal.name}
              </span>
            </div>
            <p className="text-xs text-[#AAB6CC] font-mono max-w-md">
              {personal.headline} • Mohamed Sathak Engineering College
            </p>
          </div>

          {/* Quick Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#AAB6CC]">
            <a href="#home" className="hover:text-[#4285F4] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#4285F4] transition-colors">About</a>
            <a href="#skills" className="hover:text-[#4285F4] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[#4285F4] transition-colors">Projects</a>
            <a href="#experience" className="hover:text-[#4285F4] transition-colors">Experience</a>
            <a href="#education" className="hover:text-[#4285F4] transition-colors">Education</a>
            <a href="#achievements" className="hover:text-[#4285F4] transition-colors">Achievements</a>
            <a href="#contact" className="hover:text-[#4285F4] transition-colors">Contact</a>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-2.5">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-[#27344D] bg-[#151F35] text-[#AAB6CC] hover:text-[#F8FAFC] hover:border-[#4285F4] transition-colors"
              aria-label="Visit my GitHub profile"
              title="Visit my GitHub profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-[#27344D] bg-[#151F35] text-[#AAB6CC] hover:text-[#F8FAFC] hover:border-[#4285F4] transition-colors"
              aria-label="Visit my LinkedIn profile"
              title="Visit my LinkedIn profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/919342983525"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-[#27344D] bg-[#151F35] text-[#AAB6CC] hover:text-[#25D366] hover:border-[#25D366] transition-colors"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
            >
              <WhatsappIcon className="w-4 h-4" />
            </a>
            <a
              href="tel:+919342983525"
              className="p-2 rounded-full border border-[#27344D] bg-[#151F35] text-[#AAB6CC] hover:text-[#4285F4] hover:border-[#4285F4] transition-colors"
              aria-label="Direct Phone"
              title="Call: +91 9342983525"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Muthumani_P_Resume.pdf"
              className="p-2 rounded-full border border-[#27344D] bg-[#151F35] text-[#AAB6CC] hover:text-[#F8FAFC] hover:border-[#4285F4] transition-colors"
              aria-label="Download Resume PDF"
              title="Download Resume PDF"
            >
              <FileText className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full border border-[#27344D] bg-[#151F35] text-[#AAB6CC] hover:text-[#F8FAFC] hover:border-[#4285F4] transition-colors"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#AAB6CC] font-mono text-center sm:text-left">
          <div>
            © 2026 {personal.name}. All verified portfolio details preserved.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-[11px] text-[#AAB6CC]">
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#151F35] hover:bg-[#10182B] border border-[#27344D] hover:border-[#4285F4] text-[#22D3EE] hover:text-white transition-all text-[11px] font-mono cursor-pointer shadow-sm"
                title="Replay Cinematic 3D Intro Animation"
              >
                <Sparkles className="w-3 h-3 text-[#22D3EE]" />
                <span>Replay 3D Intro</span>
              </button>
            )}
            <span>Chrome Midnight Theme</span>
            <span>•</span>
            <span>Next.js 16</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
