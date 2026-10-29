"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Home,
  User,
  Cpu,
  FileText,
  FolderGit2,
  Trophy,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
  Download,
  Phone,
  Briefcase,
} from "lucide-react";
import { LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface IPortfolioSidebarProps {
  activeSection: string;
}

export function IPortfolioSidebar({ activeSection }: IPortfolioSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { personal } = PORTFOLIO_DATA;

  // Initialize theme from document
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("portfolio-theme", "dark");
      setIsDark(true);
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Cpu },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "portfolio", label: "Portfolio", icon: FolderGit2 },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        className="lg:hidden fixed top-4 right-4 z-50 w-11 h-11 bg-[#149ddd] hover:bg-[#1182b8] text-white rounded-full flex items-center justify-center shadow-lg transition-all"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Left Fixed Sidebar Header */}
      <header
        className={`fixed top-0 bottom-0 left-0 z-40 w-[300px] bg-[#040b14] text-white overflow-y-auto px-5 py-7 transition-transform duration-300 ease-in-out border-r border-[#1f2937]/50 flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Profile Image with modern ring and active pulse (iPortfolio style) */}
          <div className="flex justify-center mb-4">
            <div className="relative group">
              <div className="relative w-28 h-28 rounded-full border-4 border-white/15 overflow-hidden shadow-2xl bg-slate-900 ring-2 ring-[#149ddd]/40 transition-all duration-300 group-hover:ring-[#149ddd] group-hover:scale-[1.02]">
                <Image
                  src="/muthumani-profile.jpg"
                  alt={personal.name}
                  fill
                  sizes="112px"
                  style={{ objectPosition: "50% 10%", objectFit: "cover" }}
                  className="transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              {/* Active status pulse dot */}
              <span
                className="absolute bottom-1 right-1.5 w-4 h-4 rounded-full bg-[#34a853] border-2 border-[#040b14] shadow-sm flex items-center justify-center"
                title="Available for opportunities"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-75" />
              </span>
            </div>
          </div>

          {/* Site Name & Title */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold tracking-tight text-white font-['Raleway']">
              <a href="#home" onClick={() => handleNavClick("home")}>
                {personal.name}
              </a>
            </h1>
            <p className="text-xs text-[#a8a9b4] mt-1 font-mono">
              Web Developer &bull; AI & DS
            </p>
          </div>

          {/* Quick Connect Icons: Mail, WhatsApp, LinkedIn, Phone */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {/* 1. Mail */}
            <a
              href={`mailto:${personal.email}`}
              aria-label="Send Email"
              title={`Email: ${personal.email}`}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ea4335] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* 2. WhatsApp */}
            <a
              href="https://wa.me/919342983525"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
            >
              <WhatsappIcon className="w-4 h-4" />
            </a>

            {/* 3. LinkedIn */}
            <a
              href={personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
              title="Visit my LinkedIn profile"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0a66c2] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            {/* 4. Phone */}
            <a
              href={`tel:${personal.phone}`}
              aria-label="Call Direct"
              title={`Call: ${personal.phone}`}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#149ddd] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Vertical Navigation Menu */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-lg text-sm font-medium transition-all group font-['Poppins'] ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-[#a8a9b4] hover:text-white"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-[#149ddd]"
                        : "text-[#a8a9b4] group-hover:text-[#149ddd]"
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls: Theme Toggle & Resume */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-[#a8a9b4]">Dark / Light</span>
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-[#149ddd] text-white transition-all"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#149ddd] hover:bg-[#1182b8] text-white text-xs font-semibold tracking-wide transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume</span>
          </a>

          <p className="text-[11px] text-center text-slate-500 pt-2 font-mono">
            &copy; 2026 {personal.name}
          </p>
        </div>
      </header>
    </>
  );
}
