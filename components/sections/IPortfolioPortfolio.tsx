"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  FileSpreadsheet,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Sliders,
  ZoomIn,
  X,
  ExternalLink,
  Presentation,
  LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { GithubIcon } from "@/components/ui/BrandIcons";

interface IPortfolioPortfolioProps {
  onOpenDetails: (project: Project) => void;
}

export function IPortfolioPortfolio({ onOpenDetails }: IPortfolioPortfolioProps) {
  const { featuredProject } = PORTFOLIO_DATA;
  const [activeTab, setActiveTab] = useState<"dashboard" | "slide">("dashboard");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    if (isLightboxOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  const currentImageSrc =
    activeTab === "dashboard"
      ? featuredProject.screenshot || "/projects/atts-preview.png"
      : featuredProject.slideScreenshot || "/projects/atts-slide.png";

  const currentOmniboxUrl =
    activeTab === "dashboard"
      ? "https://atts.msec.internal/dashboard"
      : "https://atts.msec.internal/presentation-mode";

  return (
    <section id="portfolio" className="py-16 sm:py-20 px-6 sm:px-10 max-w-6xl mx-auto">
      {/* Signature iPortfolio Section Title */}
      <div className="section-title">
        <span className="text-xs font-mono font-bold tracking-widest text-[#149ddd] uppercase block mb-1">
          {featuredProject.sectionLabel || "FEATURED PROJECT"}
        </span>
        <h2>{featuredProject.sectionHeading || "Projects Built to Solve Real Problems."}</h2>
        <p>
          Full-stack academic software engineering delivering real-world utility, role-based workflows, and automated reporting.
        </p>
      </div>

      {/* Flagship Project Showcase */}
      <div className="chrome-card overflow-hidden shadow-xl border border-[var(--border-color)] bg-[var(--surface-color)] rounded-2xl">
        {/* Chrome-Style Window Header / Top Bar */}
        <div className="chrome-tab-bar justify-between flex-wrap gap-2 sm:gap-4 bg-[var(--subtle-bg)] border-b border-[var(--border-color)] p-3">
          {/* Left: Window Dots & Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
            <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-[var(--border-color)]">
              <span className="w-3 h-3 rounded-full bg-[#ea4335] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#fbbc05] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#34a853] inline-block" />
            </div>

            {/* View switcher tabs */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "dashboard"
                    ? "bg-[var(--surface-color)] text-[#149ddd] shadow-sm font-semibold border border-[var(--border-color)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--heading-color)]"
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Interactive Dashboard</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("slide")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "slide"
                    ? "bg-[var(--surface-color)] text-[#149ddd] shadow-sm font-semibold border border-[var(--border-color)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--heading-color)]"
                }`}
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>Presentation Mode</span>
              </button>
            </div>
          </div>

          {/* Center / Omnibox */}
          <div className="hidden md:flex chrome-omnibox flex-1 max-w-md mx-2 items-center gap-2 px-3 py-1 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-lg text-xs font-mono text-[var(--text-secondary)]">
            <Lock className="w-3 h-3 text-[#34a853] shrink-0" />
            <span className="truncate">{currentOmniboxUrl}</span>
          </div>

          {/* Right: Enlarge preview */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onOpenDetails(featuredProject)}
              className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg text-[var(--text-secondary)] hover:text-[var(--heading-color)] hover:bg-[var(--surface-color)] border border-transparent hover:border-[var(--border-color)] transition-all font-mono"
              title="Inspect Full Resolution"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#149ddd]" />
              <span className="hidden sm:inline">Enlarge Preview</span>
            </button>
          </div>
        </div>

        {/* Interactive Teaser Banner (No large image visible by default) */}
        <div
          onClick={() => onOpenDetails(featuredProject)}
          className="p-6 sm:p-7 bg-[var(--subtle-bg)] border-b border-[var(--border-color)] cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenDetails(featuredProject);
            }
          }}
          aria-label="View project demo screenshot"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-[#149ddd]/15 text-[#149ddd] shrink-0 group-hover:scale-105 transition-transform">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#34a853]">
                    Verified Campus Intranet Interface
                  </span>
                </div>
                <h4 className="text-base font-bold text-[var(--heading-color)] group-hover:text-[#149ddd] transition-colors">
                  ATTS IQAC Portal &amp; Faculty Target Dashboard
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Click to inspect the full-resolution portal interface demo.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(featuredProject);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#149ddd] hover:bg-[#0c7ab0] shadow-sm transition-all shrink-0 self-start sm:self-center"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>View Demo</span>
            </button>
          </div>
        </div>

        {/* Project Details, Highlights & Feature Badges Below Image */}
        <div className="p-6 sm:p-8 bg-[var(--surface-color)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Title, Descriptions & Feature Checklist */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#149ddd]/15 text-[#149ddd]">
                    {featuredProject.category}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)] font-mono">
                    Academic Year {featuredProject.year}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[var(--heading-color)] tracking-tight font-['Raleway']">
                  {featuredProject.title}
                </h3>

                <p className="text-sm font-medium text-[#149ddd] mt-1 font-['Poppins']">
                  {featuredProject.shortDescription || featuredProject.description}
                </p>

                <p className="text-sm text-[var(--default-color)] leading-relaxed mt-2.5 font-['Roboto']">
                  {featuredProject.detailedDescription || featuredProject.description}
                </p>
              </div>

              {/* 7 Key Features */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono font-bold tracking-wider text-[var(--text-secondary)] uppercase">
                  Key System Features:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--heading-color)]">
                  {(featuredProject.features || []).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 bg-[var(--subtle-bg)] p-2 rounded-lg border border-[var(--border-color)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#34a853] mt-0.5 shrink-0" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Badges */}
              <div className="pt-3 border-t border-[var(--border-color)]">
                <h4 className="text-xs font-mono font-bold tracking-wider text-[var(--text-secondary)] uppercase mb-2">
                  Technologies:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono font-semibold px-3 py-1 rounded-md bg-[var(--subtle-bg)] text-[var(--heading-color)] border border-[var(--border-color)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Only valid URLs */}
              <div className="pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center gap-3">
                {featuredProject.githubUrl && (
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-[var(--heading-color)] bg-[var(--surface-color)] hover:bg-[var(--subtle-bg)] border border-[var(--border-color)] shadow-sm transition-all hover:-translate-y-0.5"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View GitHub Repository</span>
                  </a>
                )}

                {featuredProject.hasLiveDemo && featuredProject.liveUrl && (
                  <a
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#34a853] hover:bg-[#2e944b] shadow-sm transition-all hover:-translate-y-0.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => onOpenDetails(featuredProject)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#149ddd] hover:bg-[#1182b8] shadow-sm transition-all hover:-translate-y-0.5"
                >
                  <span>System Architecture Specs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Architecture & Impact Highlights */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <h4 className="text-xs font-mono font-bold tracking-wider text-[var(--text-secondary)] uppercase">
                Architecture &amp; Security Highlights
              </h4>

              <div className="p-3.5 rounded-xl bg-[var(--subtle-bg)] border border-[var(--border-color)] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--surface-color)] border border-[var(--border-color)] shrink-0 text-[#34a853]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[var(--heading-color)] block">
                    Role-Based Access Control
                  </span>
                  <p className="text-[11px] text-[var(--default-color)] mt-0.5 leading-snug">
                    Strict authentication barriers segregating Administrators, Faculty members, and Students.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--subtle-bg)] border border-[var(--border-color)] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--surface-color)] border border-[var(--border-color)] shrink-0 text-[#149ddd]">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[var(--heading-color)] block">
                    Data Filtering &amp; Calculations
                  </span>
                  <p className="text-[11px] text-[var(--default-color)] mt-0.5 leading-snug">
                    Dynamic target evaluation with automated percentage outcomes across college departments.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--subtle-bg)] border border-[var(--border-color)] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--surface-color)] border border-[var(--border-color)] shrink-0 text-[#ea4335]">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[var(--heading-color)] block">
                    PDF, Excel &amp; Word Export
                  </span>
                  <p className="text-[11px] text-[var(--default-color)] mt-0.5 leading-snug">
                    One-click report generation enabling instant document exports for faculty review meetings.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--surface-color)] border border-[var(--border-color)] mt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#34a853]" />
                  <span className="text-xs font-semibold text-[var(--heading-color)] font-mono">
                    College Intranet Deployment
                  </span>
                </div>
                <p className="text-[11px] text-[var(--default-color)] leading-relaxed">
                  Engineered to organize faculty targets, student academic performance, and departmental analytics into one centralized system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLightboxOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full max-h-[94vh] flex flex-col bg-[var(--surface-color)] rounded-2xl border border-[var(--border-color)] shadow-2xl z-10 overflow-hidden"
              role="dialog"
              aria-modal="true"
            >
              <div className="chrome-tab-bar justify-between px-4 py-3 shrink-0 bg-[var(--subtle-bg)] flex items-center border-b border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-[var(--border-color)]">
                    <span className="w-3 h-3 rounded-full bg-[#ea4335]" />
                    <span className="w-3 h-3 rounded-full bg-[#fbbc05]" />
                    <span className="w-3 h-3 rounded-full bg-[#34a853]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab("dashboard")}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        activeTab === "dashboard"
                          ? "bg-[var(--surface-color)] text-[#149ddd] shadow-sm font-semibold border border-[var(--border-color)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--heading-color)]"
                      }`}
                    >
                      Dashboard View
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("slide")}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        activeTab === "slide"
                          ? "bg-[var(--surface-color)] text-[#149ddd] shadow-sm font-semibold border border-[var(--border-color)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--heading-color)]"
                      }`}
                    >
                      Slide Presentation View
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(false)}
                    className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--heading-color)] rounded-full hover:bg-[var(--subtle-bg)] transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative p-2 sm:p-4 bg-[var(--subtle-bg)] flex-1 overflow-auto flex items-center justify-center">
                <Image
                  src={currentImageSrc}
                  alt={`${featuredProject.title} Full Screenshot`}
                  width={1440}
                  height={900}
                  className="w-auto h-auto max-h-[75vh] max-w-full rounded-lg border border-[var(--border-color)] shadow-md object-contain"
                  priority
                />
              </div>

              <div className="px-4 py-2.5 bg-[var(--surface-color)] border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
                <span>{currentOmniboxUrl}</span>
                <span className="text-[#34a853] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#34a853]" />
                  Verified Real Interface
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
