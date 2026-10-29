"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FileText,
  ArrowRight,
  Sparkles,
  Terminal,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import { HeroGalaxyCanvas } from "@/components/canvas/HeroGalaxyCanvas";
import { HeroNameEnergyCanvas } from "@/components/canvas/HeroNameEnergyCanvas";

export function ChromeHero() {
  const { personal, featuredProject } = PORTFOLIO_DATA;

  // Typing/cycling animation for roles
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = personal.titles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2400);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % personal.titles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, personal.titles]);

  return (
    <section
      id="home"
      className="relative min-h-[640px] lg:min-h-[740px] pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden bg-[#10182B]"
    >
      {/* 1. HERO-ONLY GALAXY ANIMATION CANVAS (Strictly Scoped to Hero Section) */}
      <HeroGalaxyCanvas />

      {/* 2. Subtle Depth Atmosphere */}
      <div
        className="absolute inset-y-0 right-0 w-full lg:w-1/2 bg-gradient-to-l from-[#10182B]/60 via-[#10182B]/30 to-transparent pointer-events-none z-[1]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (Hero Content) with Dedicated Luminous Energy Field & Orbitals */}
          <div className="lg:col-span-7 flex flex-col items-start text-left relative py-4">
            {/* Dedicated Animated Energy Field, Orbitals & Particles specifically behind the Name and Content */}
            <HeroNameEnergyCanvas />

            <div className="relative z-10 w-full flex flex-col items-start">
              {/* Small Professional Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151F35]/85 border border-[#27344D] text-[#22D3EE] text-xs font-mono font-medium mb-4 shadow-sm backdrop-blur-md transition-all hover:border-[#4285F4]/50">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                <span>{personal.badge}</span>
              </div>

              {/* Candidate Name - The Visual Highlight with subtle blue-violet glow and smooth entrance */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-1 animate-fade-in-up">
                <span className="text-[#F8FAFC]">Hi, I&apos;m </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#DCEBFE] to-[#93C5FD] drop-shadow-[0_0_28px_rgba(66,133,244,0.38)]">
                  {personal.name}
                </span>
              </h1>

              {/* Animated Typing Role Title */}
              <div className="h-8 sm:h-9 my-2 flex items-center">
                <span className="inline-flex items-center gap-2 text-base sm:text-lg font-mono font-semibold text-[#4285F4]">
                  <Terminal className="w-4 h-4 text-[#22D3EE]" />
                  <span>{displayText}</span>
                  <span className="w-1.5 h-4 bg-[#22D3EE] animate-pulse" />
                </span>
              </div>

              {/* Professional Headline */}
              <p className="text-lg sm:text-xl font-medium text-[#F8FAFC] leading-snug mt-1 drop-shadow-sm">
                Web Developer | AI &amp; Data Science
              </p>

              {/* Supporting Description */}
              <p className="text-sm sm:text-base text-[#AAB6CC] leading-relaxed mt-3 max-w-xl">
                Building practical, database-driven web applications with a focus on clean interfaces, reliable functionality, and efficient data management. With hands-on experience building an academic management system and supporting IT infrastructure, I enjoy turning real-world requirements into useful software solutions.
              </p>

              {/* CTA Buttons & Action Links */}
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {/* Primary CTA: Explore My Work */}
                <a
                  href="#projects"
                  className="btn-enterprise-work neon-border-btn text-xs sm:text-sm"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Secondary CTA: Download Resume */}
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Muthumani_P_Resume.pdf"
                  className="neon-border-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#F8FAFC] bg-[#151F35]/90 hover:bg-[#10182B] border border-[#27344D] hover:border-[#4285F4] shadow-sm transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                >
                  <FileText className="w-4 h-4 text-[#4285F4]" />
                  <span>Download Resume</span>
                </a>

                {/* Text link: Let's Connect */}
                <a
                  href="#contact"
                  className="text-xs sm:text-sm font-medium text-[#4285F4] hover:text-[#22D3EE] transition-colors px-2 py-1 font-mono"
                >
                  Let&apos;s Connect →
                </a>
              </div>

              {/* Social Profile Links */}
              <div className="mt-8 pt-6 border-t border-[#27344D]/80 flex items-center gap-3">
                <span className="text-xs text-[#AAB6CC] font-mono">
                  Connect:
                </span>

                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-border-btn p-2 rounded-full border border-[#27344D] bg-[#151F35]/80 text-[#AAB6CC] hover:text-[#F8FAFC] hover:border-[#4285F4] transition-all hover:scale-105"
                  aria-label="Visit my GitHub profile"
                  title="Visit my GitHub profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-border-btn p-2 rounded-full border border-[#27344D] bg-[#151F35]/80 text-[#AAB6CC] hover:text-[#F8FAFC] hover:border-[#4285F4] transition-all hover:scale-105"
                  aria-label="Visit my LinkedIn profile"
                  title="Visit my LinkedIn profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/919342983525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-border-btn p-2 rounded-full border border-[#27344D] bg-[#151F35]/80 text-[#25D366] hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all hover:scale-105"
                  aria-label="Chat on WhatsApp"
                  title="Chat on WhatsApp"
                >
                  <WhatsappIcon className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${personal.email}`}
                  className="neon-border-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#27344D] bg-[#151F35]/80 text-xs text-[#AAB6CC] hover:text-[#F8FAFC] hover:border-[#4285F4] transition-all"
                  title={`Email: ${personal.email}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                  <span className="font-mono">{personal.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Neat & HD Professional Portrait Card Framed by the Galaxy */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] group">
              {/* Soft Atmospheric Glow behind the portrait */}
              <div
                className="absolute -inset-2 bg-gradient-to-tr from-[#4285F4]/30 via-[#22D3EE]/20 to-[#8B5CF6]/25 rounded-[32px] blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-500 -z-10"
                aria-hidden="true"
              />

              {/* Main Glassmorphic Portrait Card */}
              <div className="neon-border-card p-3 sm:p-3.5 relative overflow-hidden rounded-[28px] bg-[#151F35]/90 backdrop-blur-xl border border-[#27344D] shadow-2xl transition-all duration-300 hover:shadow-blue-500/15 hover:border-[#4285F4]/40" data-cursor="Profile">
                {/* HD Image Frame */}
                <div className="relative aspect-[3.75/5] w-full rounded-[22px] overflow-hidden bg-slate-900 border border-[#27344D]">
                  <Image
                    src="/muthumani-profile.jpg"
                    alt="Muthumani P - Web Developer | AI & Data Science"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    priority
                    className="object-cover object-[center_16%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Top-Left: Live Availability Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1020]/80 backdrop-blur-md border border-[#27344D] text-[#F8FAFC] shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                    <span className="text-xs font-medium font-mono">Available for Opportunities</span>
                  </div>

                  {/* Top-Right: HD Verified Tag */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#0B1020]/80 backdrop-blur-md border border-[#27344D] text-[#22D3EE] shadow-lg text-[11px] font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
                    <span>HD Portrait</span>
                  </div>

                  {/* Gradient overlay at bottom for optimal text contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0B1020]/90 via-[#0B1020]/50 to-transparent pointer-events-none" />

                  {/* Floating Candidate Summary Over Portrait */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-[#0B1020]/85 backdrop-blur-md border border-[#27344D] text-[#F8FAFC] shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold tracking-tight text-[#F8FAFC] flex items-center gap-1.5">
                          <span>Muthumani P</span>
                          <CheckCircle2 className="w-4 h-4 text-[#22D3EE]" />
                        </h3>
                        <p className="text-xs text-[#AAB6CC] font-mono mt-0.5">
                          B.Tech • AI &amp; Data Science
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#4285F4]/20 border border-[#4285F4]/30 text-xs font-mono font-medium text-[#22D3EE]">
                          Class of 2026
                        </span>
                        <span className="block text-[10px] text-[#AAB6CC] font-mono mt-0.5">
                          MSEC Campus
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Under-Card Highlight: Flagship Application Badge */}
                <div className="mt-3 px-2 py-1 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#4285F4]/15 text-[#4285F4] shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#F8FAFC]">
                          Flagship Project
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                      </div>
                      <p className="text-[11px] text-[#AAB6CC] font-mono leading-tight mt-0.5">
                        {featuredProject.title}
                      </p>
                    </div>
                  </div>

                  <a
                    href="#projects"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#4285F4] hover:text-[#22D3EE] transition-colors px-2 py-1 font-mono"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Subtle Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-[#AAB6CC] hover:text-[#4285F4] flex flex-col items-center gap-1 transition-colors text-xs font-mono group"
        aria-label="Scroll down to About section"
      >
        <span className="tracking-widest uppercase text-[10px]">Scroll</span>
        <ArrowRight className="w-3.5 h-3.5 rotate-90 text-[#4285F4] group-hover:translate-y-0.5 transition-transform" />
      </a>
    </section>
  );
}
