"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { motion } from "framer-motion";

interface ChromeNavbarProps {
  activeSection: string;
}

export function ChromeNavbar({ activeSection }: ChromeNavbarProps) {
  const { personal } = PORTFOLIO_DATA;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Achievements", href: "#achievements", id: "achievements" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-[var(--border-color)] shadow-sm"
          : "bg-[var(--bg-page)]/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] rounded-lg p-1"
          aria-label="Muthumani P - Home"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#4285F4] to-[#8B5CF6] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-[var(--text-primary)] leading-tight">
              {personal.name}
            </span>
            <span className="text-[11px] text-[#22D3EE] font-mono">
              Web Dev • AI &amp; Data
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 bg-[#151F35] px-3 py-1.5 rounded-full border border-[#27344D] shadow-sm"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              activeSection === link.id ||
              (link.id === "experience" && activeSection === "education");

            return (
              <a
                key={link.id}
                href={link.href}
                className={`neon-border-nav relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ${
                  isActive
                    ? "text-[#4285F4] font-semibold bg-[#4285F4]/15 neon-active"
                    : "text-[#AAB6CC] hover:text-[#F8FAFC] hover:bg-[#10182B]"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0.5 left-2.5 right-2.5 h-0.5 bg-gradient-to-r from-[#4285F4] via-[#22D3EE] to-[#8B5CF6] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Bar (Resume CTA & Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Resume Link (Desktop) */}
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="Muthumani_P_Resume.pdf"
            className="neon-border-btn hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-white bg-gradient-to-r from-[#4285F4] to-[#3367D6] hover:from-[#5392F8] hover:to-[#4285F4] transition-all shadow-md shadow-blue-500/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-[#27344D] text-[#AAB6CC] hover:text-[#F8FAFC] hover:bg-[#10182B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-color)] bg-[var(--bg-card)] px-4 pt-3 pb-5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                    isActive
                      ? "text-[#1a73e8] dark:text-[#8ab4f8] font-semibold bg-[var(--bg-accent-tint)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] dark:bg-[#8ab4f8]" />
                  )}
                </a>
              );
            })}
            <div className="pt-3 border-t border-[var(--border-color)] mt-2 flex items-center justify-between">
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Muthumani_P_Resume.pdf"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#174ea6] transition-colors shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume PDF</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#27344D]/30 overflow-hidden pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#4285F4] via-[#22D3EE] to-[#8B5CF6] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(66,133,244,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
