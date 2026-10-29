"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, FileText, FolderGit2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { HeroGalaxyCanvas } from "@/components/canvas/HeroGalaxyCanvas";

export function IPortfolioHero() {
  const { personal } = PORTFOLIO_DATA;

  // Exact refined roles according to specifications
  const typedStrings = [
    "Web Developer",
    "Full-Stack Developer",
    "AI & Data Science Graduate",
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentString = typedStrings[roleIndex];
    // typeSpeed: 60ms, backSpeed: 40ms
    const speed = isDeleting ? 40 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentString.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentString.length) {
          // backDelay: 1500ms
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayedText(currentString.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          // loop: true
          setRoleIndex((prev) => (prev + 1) % typedStrings.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-start overflow-hidden py-16 sm:py-24 bg-[#10182B]"
    >
      {/* HERO-ONLY GALAXY ANIMATION CANVAS */}
      <HeroGalaxyCanvas />
      {/* Content Container (Two-column layout on large screens) */}
      <div className="relative z-10 w-full max-w-6xl px-6 sm:px-12 grid grid-cols-1 xl:grid-cols-12 gap-8 items-center text-left">
        <div className="xl:col-span-7">
          {/* Profile Pill Badge */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[var(--surface-color)]/80 backdrop-blur-md border border-[var(--border-color)] mb-6 text-xs text-[var(--heading-color)] font-mono shadow-sm">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#149ddd]">
              <Image
                src="/muthumani-profile.jpg"
                alt={personal.name}
                fill
                sizes="24px"
                style={{ objectPosition: "50% 10%", objectFit: "cover" }}
              />
            </div>
            <span>WEB DEVELOPER &bull; AI &amp; DATA SCIENCE</span>
            <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--heading-color)] tracking-tight font-['Raleway']">
            Hi, I&apos;m {personal.name}.
          </h1>

          <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-[var(--default-color)] font-['Poppins'] font-light">
            I&apos;m a{" "}
            <span className="typed text-[#149ddd] font-semibold border-b-2 border-[#149ddd] pb-0.5">
              {displayedText}
            </span>
            <span className="typed-cursor inline-block w-0.5 h-6 ml-1 bg-[#149ddd] animate-pulse align-middle" />
          </p>

          <p className="mt-4 text-lg sm:text-xl font-semibold text-[var(--heading-color)] font-['Raleway']">
            {personal.headline}
          </p>

          <p className="mt-3 max-w-2xl text-sm sm:text-base text-[var(--default-color)] leading-relaxed font-['Roboto']">
            {personal.description}
          </p>

          {/* Action Buttons & Text Link */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#portfolio"
              className="btn-enterprise-work inline-flex items-center gap-2 text-sm shadow-md"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Explore My Projects</span>
            </a>

            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--surface-color)]/90 hover:bg-[var(--surface-color)] text-[var(--heading-color)] border border-[var(--border-color)] text-sm font-semibold transition-all backdrop-blur-sm hover:-translate-y-0.5 shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center text-sm font-semibold text-[var(--heading-color)] hover:text-[#149ddd] transition-colors group font-mono"
            >
              <span>Let&apos;s Connect</span>
              <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Right Column: Neat & HD Professional Portrait Card */}
        <div className="xl:col-span-5 hidden xl:flex flex-col items-center justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md group">
            {/* Soft Atmospheric Glow */}
            <div
              className="absolute -inset-2 bg-gradient-to-tr from-[#149ddd]/20 via-[#38bdf8]/15 to-[#6366f1]/20 rounded-[32px] blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-500 -z-10"
              aria-hidden="true"
            />

            <div className="relative p-3.5 rounded-[28px] bg-[var(--surface-color)]/85 backdrop-blur-xl border border-[var(--border-color)] shadow-2xl transition-all duration-300 hover:shadow-2xl hover:border-[#149ddd]/40">
              {/* HD Image Frame */}
              <div className="relative aspect-[3.75/5] w-full rounded-[22px] overflow-hidden bg-slate-900 border border-[var(--border-color)]">
                <Image
                  src="/muthumani-profile.jpg"
                  alt="Muthumani P - Web Developer"
                  fill
                  sizes="(max-width: 1280px) 100vw, 400px"
                  priority
                  className="object-cover object-[center_16%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Top Live Availability Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse" />
                  <span className="text-xs font-medium font-mono">Available for Hire</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-black/65 backdrop-blur-md border border-white/15 text-white shadow-lg">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Muthumani P
                  </h3>
                  <p className="text-xs text-white/80 font-mono mt-0.5">
                    B.Tech • AI &amp; Data Science &bull; Class of 2026
                  </p>
                </div>
              </div>

              <div className="mt-3 px-2 py-1 flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--text-secondary)]">Flagship System</span>
                <span className="text-[#149ddd] font-semibold">ATTS (PHP &amp; MySQL)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[var(--text-secondary)] hover:text-[#149ddd] flex flex-col items-center gap-1 transition-colors"
      >
        <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
