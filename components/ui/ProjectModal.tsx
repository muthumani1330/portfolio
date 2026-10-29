"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Layers,
  Server,
  Database,
  ShieldCheck,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Lock,
  Sliders,
  FileSpreadsheet,
  Sparkles,
  Laptop,
  Code2,
  Info,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Project, PORTFOLIO_DATA } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  allProjects?: Project[];
  onSelectProject?: (project: Project) => void;
}

export function ProjectModal({
  project,
  isOpen,
  onClose,
  allProjects = PORTFOLIO_DATA.showcaseProjects || [PORTFOLIO_DATA.featuredProject],
  onSelectProject,
}: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "slide" | "live">("dashboard");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [detailTab, setDetailTab] = useState<"overview" | "architecture" | "benchmarks">("overview");
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  // Touch swipe gesture tracking (Gesture Mobile Swipe)
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Minimum swipe threshold 50px, predominantly horizontal to preserve vertical scrolling
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
      if (diffX < 0) {
        handleNextProject();
      } else {
        handlePrevProject();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Store trigger element on open for accessible focus restoration
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement;
      setIsFullscreen(false);
      setActiveTab("dashboard");
      setDetailTab("overview");
      setIframeError(false);
      setIsIframeLoading(true);
    } else if (triggerElementRef.current) {
      triggerElementRef.current.focus();
    }
  }, [isOpen]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard navigation & accessibility focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Next / Previous Project navigation on Arrow keys (when not in input)
      if (e.key === "ArrowRight") {
        handleNextProject();
      } else if (e.key === "ArrowLeft") {
        handlePrevProject();
      }

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, project, allProjects, onClose]);

  // Project navigation indices
  const currentIndex = allProjects.findIndex((p) => p.id === project?.id);
  const hasMultipleProjects = allProjects.length > 1;

  const handlePrevProject = useCallback(() => {
    if (!hasMultipleProjects || !onSelectProject) return;
    const prevIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
    onSelectProject(allProjects[prevIndex]);
    setActiveTab("dashboard");
  }, [currentIndex, allProjects, hasMultipleProjects, onSelectProject]);

  const handleNextProject = useCallback(() => {
    if (!hasMultipleProjects || !onSelectProject) return;
    const nextIndex = (currentIndex + 1) % allProjects.length;
    onSelectProject(allProjects[nextIndex]);
    setActiveTab("dashboard");
  }, [currentIndex, allProjects, hasMultipleProjects, onSelectProject]);

  if (!project) return null;

  // Determine current image preview
  const currentImageSrc =
    activeTab === "slide" && project.slideScreenshot
      ? project.slideScreenshot
      : project.screenshot || "/projects/atts-preview.png";

  const currentOmniboxUrl =
    project.internalUrl ||
    (project.hasLiveDemo && project.liveUrl
      ? project.liveUrl
      : "https://atts.msec.internal/dashboard");

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          {/* Subtle Dark Dimmed Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050814]/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Expanded Modal Lightbox Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full flex flex-col bg-[#151F35] rounded-2xl border border-[#4285F4]/40 shadow-[0_0_50px_rgba(66,133,244,0.22),0_20px_60px_rgba(11,16,32,0.95)] z-10 overflow-hidden text-[#F8FAFC] transition-all duration-300 ${
              isFullscreen
                ? "max-w-[98vw] h-[96vh] rounded-xl"
                : "max-w-5xl max-h-[92vh]"
            }`}
          >
            {/* Top Bar: Chrome Window Controls, Tabs, Omnibox & Actions */}
            <div className="px-3.5 sm:px-5 py-3 border-b border-[#27344D] bg-[#10182B] flex items-center justify-between gap-3 shrink-0 flex-wrap sm:flex-nowrap">
              {/* Left: Window Dots, Project Name & Category Badge */}
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-[#27344D]">
                  <span className="w-3 h-3 rounded-full bg-[#EA4335] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#FBBC05] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#34A853] inline-block shadow-sm" />
                </div>

                <div className="flex items-center gap-2 truncate">
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight truncate max-w-[180px] sm:max-w-xs">
                    {project.title}
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#4285F4]/15 border border-[#4285F4]/30 text-[#22D3EE] shrink-0 hidden md:inline-block">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Center: Simulated/Live Omnibox URL */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B1020] border border-[#27344D] text-xs font-mono text-[#AAB6CC] flex-1 max-w-sm mx-2">
                <Lock className="w-3.5 h-3.5 text-[#34A853] shrink-0" />
                <span className="truncate text-[11px] text-[#DCEBFE]">{currentOmniboxUrl}</span>
                {project.isInternalSystem && (
                  <span className="ml-auto text-[9px] uppercase tracking-wider font-semibold text-[#22D3EE] bg-[#22D3EE]/10 px-1.5 py-0.5 rounded shrink-0">
                    Internal Intranet
                  </span>
                )}
              </div>

              {/* Right: Fullscreen Toggle & Close Button */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Fullscreen Mode Toggle */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-lg text-[#AAB6CC] hover:text-[#F8FAFC] hover:bg-[#1A253E] border border-transparent hover:border-[#27344D] transition-all"
                  title={isFullscreen ? "Exit Fullscreen (Restore details panel)" : "Fullscreen Preview Mode"}
                  aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 text-[#22D3EE]" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-[#AAB6CC]" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-[#AAB6CC] hover:text-white rounded-lg hover:bg-[#EA4335]/20 hover:border-[#EA4335]/40 border border-transparent transition-all"
                  aria-label="Close project showcase modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#27344D]/80">
              {/* 1. Large Preview Stage with View Switcher */}
              <div className="p-3 sm:p-5 bg-[#0B1020]/70">
                {/* View Switcher Controls & Status */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-1.5 p-1 bg-[#10182B] rounded-xl border border-[#27344D]">
                    <button
                      type="button"
                      onClick={() => setActiveTab("dashboard")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                        activeTab === "dashboard"
                          ? "bg-[#4285F4] text-white font-semibold shadow-sm"
                          : "text-[#AAB6CC] hover:text-white"
                      }`}
                    >
                      <Laptop className="w-3.5 h-3.5" />
                      <span>Dashboard View</span>
                    </button>

                    {project.slideScreenshot && (
                      <button
                        type="button"
                        onClick={() => setActiveTab("slide")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                          activeTab === "slide"
                            ? "bg-[#8B5CF6] text-white font-semibold shadow-sm"
                            : "text-[#AAB6CC] hover:text-white"
                        }`}
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Presentation Mode</span>
                      </button>
                    )}

                    {project.hasLiveDemo && project.liveUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("live");
                          setIsIframeLoading(true);
                          setIframeError(false);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                          activeTab === "live"
                            ? "bg-[#34A853] text-white font-semibold shadow-sm"
                            : "text-[#AAB6CC] hover:text-white"
                        }`}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Interactive Live Sandbox</span>
                      </button>
                    )}
                  </div>

                  {/* Verification & Resolution Badge */}
                  <div className="flex items-center gap-2">
                    {project.isInternalSystem ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#34A853]/15 border border-[#34A853]/30 text-[#34A853] text-xs font-mono">
                        <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                        <span>Verified Real System • MSEC Intranet</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#22D3EE]/15 border border-[#22D3EE]/30 text-[#22D3EE] text-xs font-mono">
                        <Sparkles className="w-3 h-3 text-[#22D3EE]" />
                        <span>High-Resolution Interface</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Screen Preview Box with Touch Swipe Gestures */}
                <div
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className={`relative w-full rounded-xl overflow-hidden border border-[#27344D] bg-[#050814] flex items-center justify-center transition-all ${
                    isFullscreen
                      ? "h-[78vh]"
                      : "aspect-[1.5/1] max-h-[540px] sm:max-h-[600px]"
                  }`}
                >
                  {activeTab === "live" && project.liveUrl ? (
                    <div className="relative w-full h-full bg-white">
                      {isIframeLoading && !iframeError && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0B1020] text-[#AAB6CC]">
                          <RefreshCw className="w-6 h-6 animate-spin text-[#4285F4] mb-2" />
                          <p className="text-xs font-mono">Loading sandboxed live preview...</p>
                        </div>
                      )}

                      {iframeError ? (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-[#0B1020] text-center">
                          <AlertCircle className="w-8 h-8 text-[#FBBC05] mb-2" />
                          <h4 className="text-sm font-bold text-white mb-1">
                            Embedded Iframe Restricted by Host
                          </h4>
                          <p className="text-xs text-[#AAB6CC] max-w-md mb-4">
                            This website blocks iframe embedding through X-Frame-Options security headers. You can launch it directly in a new tab.
                          </p>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#4285F4] text-white hover:bg-[#3367D6]"
                          >
                            <span>Open Live Website</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ) : (
                        <iframe
                          src={project.liveUrl}
                          title={`${project.title} Live Preview`}
                          className="w-full h-full border-0"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          onLoad={() => setIsIframeLoading(false)}
                          onError={() => setIframeError(true)}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full h-full group">
                      <Image
                        src={currentImageSrc}
                        alt={`${project.title} - ${activeTab === "slide" ? "Presentation View" : "Dashboard View"}`}
                        fill
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        priority
                        className="object-contain object-top"
                      />

                      {/* Zoom hint overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="px-3.5 py-1.5 rounded-full bg-[#10182B]/90 border border-[#27344D] text-xs font-mono text-[#DCEBFE] shadow-lg flex items-center gap-2">
                          <ZoomIn className="w-3.5 h-3.5 text-[#22D3EE]" />
                          <span>{isFullscreen ? "Full Size Active" : "Click Fullscreen icon above for edge-to-edge view"}</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Project Information & Deep Dive Panel (Hidden in Fullscreen for Focus) */}
              {!isFullscreen && (
                <div className="p-4 sm:p-6 space-y-6 bg-[#151F35]">
                  {/* Title & Action Strip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-[#22D3EE] font-semibold">
                          {project.organization || "Muthumani P • Web Development"}
                        </span>
                      </div>
                      <h3
                        id="modal-project-title"
                        className="text-xl sm:text-2xl font-extrabold text-white tracking-tight"
                      >
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#AAB6CC] mt-1">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#10182B] hover:bg-[#0B1020] border border-[#27344D] hover:border-[#4285F4] transition-all shadow-sm"
                          title="Visit my GitHub profile"
                          aria-label="Visit my GitHub profile"
                        >
                          <GithubIcon className="w-4 h-4 text-[#AAB6CC]" />
                          <span>GitHub Repository</span>
                        </a>
                      )}

                      {project.hasLiveDemo && project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#4285F4] to-[#3367D6] hover:from-[#3367D6] hover:to-[#22D3EE] transition-all shadow-sm"
                        >
                          <span>Open Live Website</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : project.isInternalSystem ? (
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono text-[#34A853] bg-[#34A853]/10 border border-[#34A853]/30">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Internal Intranet System</span>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* High-Impact Metrics Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {project.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#10182B] border border-[#27344D] flex items-center gap-2.5 shadow-sm"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#34A853] shrink-0" />
                        <span className="text-xs font-semibold text-[#F8FAFC] leading-snug">
                          {metric}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Detail Tabs Header */}
                  <div className="flex items-center gap-2 border-b border-[#27344D] pb-2">
                    <button
                      type="button"
                      onClick={() => setDetailTab("overview")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        detailTab === "overview"
                          ? "bg-[#4285F4]/20 text-[#22D3EE] font-bold border border-[#4285F4]/40"
                          : "text-[#AAB6CC] hover:text-white"
                      }`}
                    >
                      System Overview &amp; Features
                    </button>

                    <button
                      type="button"
                      onClick={() => setDetailTab("architecture")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        detailTab === "architecture"
                          ? "bg-[#4285F4]/20 text-[#22D3EE] font-bold border border-[#4285F4]/40"
                          : "text-[#AAB6CC] hover:text-white"
                      }`}
                    >
                      Architecture &amp; Tech Stack
                    </button>

                    <button
                      type="button"
                      onClick={() => setDetailTab("benchmarks")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        detailTab === "benchmarks"
                          ? "bg-[#4285F4]/20 text-[#22D3EE] font-bold border border-[#4285F4]/40"
                          : "text-[#AAB6CC] hover:text-white"
                      }`}
                    >
                      Engineering Benchmarks
                    </button>
                  </div>

                  {/* Tab 1: System Overview & Features */}
                  {detailTab === "overview" && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-[#10182B] border border-[#27344D] text-xs sm:text-sm text-[#DCEBFE] leading-relaxed">
                        {project.detailedDescription ||
                          project.architectureDetails?.overview ||
                          project.description}
                      </div>

                      {project.features && (
                        <div>
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#AAB6CC] mb-2.5">
                            Core Capabilities &amp; System Features
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {project.features.map((feat, fIdx) => (
                              <div
                                key={fIdx}
                                className="flex items-start gap-2 p-2.5 rounded-lg bg-[#10182B]/60 border border-[#27344D]/80 text-xs text-[#F8FAFC]"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#34A853] mt-0.5 shrink-0" />
                                <span className="leading-snug">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 2: Architecture & Tech Stack */}
                  {detailTab === "architecture" && (
                    <div className="space-y-4">
                      {project.architectureDetails?.techStack ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {project.architectureDetails.techStack.map((group, gIdx) => (
                            <div
                              key={gIdx}
                              className="p-3.5 rounded-xl bg-[#10182B] border border-[#27344D]"
                            >
                              <div className="flex items-center gap-2 text-[#22D3EE] font-bold text-xs mb-2.5 font-mono">
                                {gIdx === 0 && <Layers className="w-3.5 h-3.5 text-[#4285F4]" />}
                                {gIdx === 1 && <Server className="w-3.5 h-3.5 text-[#8B5CF6]" />}
                                {gIdx === 2 && <Database className="w-3.5 h-3.5 text-[#34A853]" />}
                                <span>{group.category}</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {group.items.map((item, iIdx) => (
                                  <span
                                    key={iIdx}
                                    className="text-[11px] px-2 py-0.5 rounded bg-[#151F35] text-[#DCEBFE] border border-[#27344D] font-mono"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-3 py-1 rounded-lg bg-[#10182B] border border-[#27344D] text-xs font-mono text-[#DCEBFE]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 3: Engineering Benchmarks */}
                  {detailTab === "benchmarks" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-[#10182B] border border-[#27344D] flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#151F35] border border-[#27344D] shrink-0">
                          <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white block">
                            Strict Role Access (RBAC)
                          </span>
                          <p className="text-[11px] text-[#AAB6CC] mt-0.5 leading-snug">
                            Session-validated boundaries isolating Administrators, Faculty members, and Student accounts.
                          </p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#10182B] border border-[#27344D] flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#151F35] border border-[#27344D] shrink-0">
                          <Sliders className="w-4 h-4 text-[#4285F4]" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white block">
                            Dynamic Calculation Core
                          </span>
                          <p className="text-[11px] text-[#AAB6CC] mt-0.5 leading-snug">
                            Automated target compliance equations evaluating allocated goals vs realized achievements.
                          </p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#10182B] border border-[#27344D] flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#151F35] border border-[#27344D] shrink-0">
                          <FileSpreadsheet className="w-4 h-4 text-[#EA4335]" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white block">
                            Multi-Format Export Engine
                          </span>
                          <p className="text-[11px] text-[#AAB6CC] mt-0.5 leading-snug">
                            Automated server-side output generating formatted PDF documents, Excel workbooks, and Word summaries.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Technology Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#27344D]/80">
                    <span className="text-xs font-mono text-[#AAB6CC] mr-1">Stack:</span>
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#10182B] text-[#AAB6CC] border border-[#27344D]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Bar: Previous / Next Project Navigation & Keyboard Hint */}
            <div className="px-4 py-3 bg-[#10182B] border-t border-[#27344D] flex items-center justify-between gap-3 text-xs font-mono text-[#AAB6CC] shrink-0">
              {/* Previous Project Button */}
              {hasMultipleProjects ? (
                <button
                  type="button"
                  onClick={handlePrevProject}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151F35] hover:bg-[#0B1020] text-[#DCEBFE] hover:text-white border border-[#27344D] hover:border-[#4285F4] transition-all cursor-pointer"
                  title="View previous project (Left Arrow key)"
                >
                  <ChevronLeft className="w-4 h-4 text-[#22D3EE]" />
                  <span className="hidden sm:inline">Previous Project</span>
                </button>
              ) : (
                <div />
              )}

              {/* Project Counter & Keyboard Hints */}
              <div className="flex items-center gap-3 text-center">
                {hasMultipleProjects && (
                  <span className="text-xs text-[#22D3EE] font-semibold">
                    {currentIndex + 1} of {allProjects.length}
                  </span>
                )}
                <span className="hidden md:inline text-[11px] text-[#AAB6CC]/80">
                  ESC to close • ← / → to navigate
                </span>
              </div>

              {/* Next Project Button */}
              {hasMultipleProjects ? (
                <button
                  type="button"
                  onClick={handleNextProject}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151F35] hover:bg-[#0B1020] text-[#DCEBFE] hover:text-white border border-[#27344D] hover:border-[#4285F4] transition-all cursor-pointer"
                  title="View next project (Right Arrow key)"
                >
                  <span className="hidden sm:inline">Next Project</span>
                  <ChevronRight className="w-4 h-4 text-[#22D3EE]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-[#4285F4] text-white hover:bg-[#3367D6] font-semibold text-xs transition-colors"
                >
                  Done
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
