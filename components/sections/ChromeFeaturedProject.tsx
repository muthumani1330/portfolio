"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  FileSpreadsheet,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Sliders,
  ZoomIn,
  Layers,
  Sparkles,
  ExternalLink,
  Laptop,
  Maximize2,
  ArrowRight,
  FolderGit2,
  Eye,
  LayoutDashboard,
  GripHorizontal,
  MoveHorizontal,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { GithubIcon } from "@/components/ui/BrandIcons";

interface ChromeFeaturedProjectProps {
  onOpenDetails: (project: Project) => void;
}

export function ChromeFeaturedProject({ onOpenDetails }: ChromeFeaturedProjectProps) {
  const { featuredProject, showcaseProjects } = PORTFOLIO_DATA;
  const projectsList = showcaseProjects || [featuredProject];

  // 3D Card Tilt state for Featured Flagship Card (Gesture B)
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max -3.5 to 3.5 degrees
    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    setTilt({
      rotateX,
      rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
    if (!isHovered) setIsHovered(true);
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  // Horizontal Drag Carousel state (Gesture C)
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const [carouselConstraint, setCarouselConstraint] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateConstraint = () => {
      if (carouselContainerRef.current) {
        const scrollW = carouselContainerRef.current.scrollWidth;
        const clientW = carouselContainerRef.current.clientWidth;
        setCarouselConstraint(Math.min(0, clientW - scrollW));
      }
    };

    updateConstraint();
    window.addEventListener("resize", updateConstraint);
    return () => window.removeEventListener("resize", updateConstraint);
  }, [projectsList]);

  return (
    <section id="projects" className="py-14 sm:py-20 border-t border-[#27344D] bg-[#0B1020] relative">
      {/* Background Atmosphere */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-[#4285F4]/10 via-[#8B5CF6]/10 to-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4285F4]/15 text-[#22D3EE] text-xs font-mono font-medium mb-2 border border-[#4285F4]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>INTERACTIVE PROJECT SHOWCASE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Featured Enterprise Application
          </h2>
          <p className="text-sm sm:text-base text-[#AAB6CC] mt-1.5 max-w-2xl">
            A production-ready academic target and record management platform engineered for multi-role college operations. Explore via 3D tilt, drag, or click <span className="text-[#22D3EE] font-medium">View Demo</span>.
          </p>
        </div>

        {/* 1. Main Flagship Project Card with 3D Tilt Gesture (No Large Image on Page Load) */}
        <div style={{ perspective: 1000 }} className="w-full">
          <motion.div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            animate={{
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 220,
              mass: 0.6,
            }}
            className="neon-border-panel relative group rounded-2xl bg-[#151F35] border border-[#27344D] hover:border-[#4285F4]/60 shadow-xl hover:shadow-[0_20px_50px_rgba(66,133,244,0.18)] transition-all duration-300"
            style={{ transformStyle: "preserve-3d" }}
            data-cursor="View Demo"
          >
            {/* Dynamic Specular Light Glare (Follows Cursor) */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(circle 380px at ${tilt.glareX}% ${tilt.glareY}%, rgba(66, 133, 244, 0.12), transparent 70%)`,
              }}
              aria-hidden="true"
            />

            {/* Chrome-Style Window Header / Top Bar */}
            <div className="px-3.5 sm:px-5 py-3 bg-[#10182B] border-b border-[#27344D] flex items-center justify-between flex-wrap gap-2 sm:gap-4 relative z-10">
              {/* Left: Window Dots & Project Category */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-[#27344D]">
                  <span className="w-3 h-3 rounded-full bg-[#EA4335] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#FBBC05] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#34A853] inline-block shadow-sm" />
                </div>

                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#4285F4]/15 border border-[#4285F4]/30 text-[#22D3EE]">
                  {featuredProject.category}
                </span>
                <span className="text-xs text-[#AAB6CC] font-mono hidden sm:inline">
                  Year: {featuredProject.year}
                </span>
              </div>

              {/* Center / Omnibox: Realistic simulated intranet address */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B1020] border border-[#27344D] text-xs font-mono text-[#AAB6CC] flex-1 max-w-md mx-2">
                <Lock className="w-3.5 h-3.5 text-[#34A853] shrink-0" />
                <span className="truncate text-[11px] text-[#DCEBFE]">https://atts.msec.internal/dashboard</span>
                <span className="ml-auto text-[9px] uppercase tracking-wider font-semibold text-[#22D3EE] bg-[#22D3EE]/10 px-1.5 py-0.5 rounded shrink-0">
                  Internal Intranet
                </span>
              </div>

              {/* Right: View Demo / Enlarge Preview Action */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenDetails(featuredProject)}
                  className="neon-border-btn flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-lg text-white bg-gradient-to-r from-[#4285F4] to-[#3367D6] hover:from-[#3367D6] hover:to-[#22D3EE] border border-[#4285F4]/40 hover:border-[#4285F4] transition-all font-mono font-semibold cursor-pointer shadow-md shadow-blue-500/20"
                  title="View High-Resolution Interface Demo"
                  aria-label="View Project Demo Image"
                  data-cursor="View Demo"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Demo</span>
                </button>
              </div>
            </div>

            {/* Interactive Teaser Banner (Clean placeholder replacing default large screenshot) */}
            <div
              onClick={() => onOpenDetails(featuredProject)}
              className="p-5 sm:p-7 bg-gradient-to-br from-[#10182B] via-[#0D1527] to-[#151F35] border-b border-[#27344D] cursor-pointer group/teaser relative overflow-hidden"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpenDetails(featuredProject);
                }
              }}
              aria-label="Open high-resolution project demo screenshot"
              data-cursor="Click Demo"
            >
              {/* Subtle background glow effect */}
              <div
                className="absolute -right-16 -top-16 w-56 h-56 bg-[#4285F4]/10 rounded-full blur-2xl pointer-events-none group-hover/teaser:bg-[#4285F4]/20 transition-all duration-500"
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-[#4285F4]/15 border border-[#4285F4]/30 text-[#22D3EE] shrink-0 group-hover/teaser:scale-105 group-hover/teaser:border-[#4285F4] transition-all">
                    <LayoutDashboard className="w-7 h-7 text-[#22D3EE]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-mono font-bold text-[#34A853] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                        <span>Verified Production Interface</span>
                      </span>
                      <span className="text-xs font-mono text-[#AAB6CC]">
                        • ATTS IQAC Portal v1.0.0
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover/teaser:text-[#22D3EE] transition-colors tracking-tight">
                      ATTS IQAC Portal &amp; Faculty Target Dashboard
                    </h3>
                    <p className="text-xs sm:text-sm text-[#AAB6CC] mt-1 max-w-xl leading-relaxed">
                      Interactive academic target achievement analytics, faculty targets, upcoming events, and departmental summaries. Click to open the full-resolution screenshot demo.
                    </p>
                  </div>
                </div>

                {/* Teaser Action Pill with Gesture Hint */}
                <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10182B] border border-[#27344D] group-hover/teaser:border-[#4285F4] text-xs font-mono text-[#DCEBFE] shadow-md transition-all">
                    <ZoomIn className="w-4 h-4 text-[#22D3EE]" />
                    <span>Click to Preview Image</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#4285F4] group-hover/teaser:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details, Highlights & Metrics */}
            <div className="p-6 sm:p-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Title, Overview & Feature Checklist */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#4285F4]/15 border border-[#4285F4]/30 text-[#22D3EE]">
                        {featuredProject.category}
                      </span>
                      <span className="text-xs text-[#AAB6CC] font-mono">
                        Mohamed Sathak Engineering College • 2025
                      </span>
                    </div>

                    <h3
                      onClick={() => onOpenDetails(featuredProject)}
                      className="text-xl sm:text-2xl font-bold text-white tracking-tight hover:text-[#22D3EE] transition-colors cursor-pointer inline-block"
                      data-cursor="Open"
                    >
                      {featuredProject.title}
                    </h3>

                    <p className="text-sm text-[#AAB6CC] leading-relaxed mt-2.5">
                      {featuredProject.description}
                    </p>

                    {/* Feature Highlights List */}
                    <div className="mt-5 space-y-2">
                      <h4 className="text-xs font-mono font-bold tracking-wider text-[#AAB6CC] uppercase">
                        Core Functional Highlights:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#F8FAFC]">
                        {(featuredProject.features || []).slice(0, 5).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#34A853] mt-0.5 shrink-0" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technology Badges */}
                    <div className="mt-5 pt-4 border-t border-[#27344D]">
                      <div className="flex flex-wrap gap-1.5">
                        {featuredProject.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#10182B] text-[#AAB6CC] border border-[#27344D]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="mt-6 pt-4 border-t border-[#27344D] flex flex-wrap items-center gap-3">
                    {/* Primary CTA: View Demo */}
                    <button
                      type="button"
                      onClick={() => onOpenDetails(featuredProject)}
                      className="neon-border-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#4285F4] to-[#3367D6] hover:from-[#3367D6] hover:to-[#22D3EE] shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 cursor-pointer font-mono"
                      data-cursor="View Demo"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Demo</span>
                    </button>

                    {/* Secondary CTA: Preview Project */}
                    <button
                      type="button"
                      onClick={() => onOpenDetails(featuredProject)}
                      className="neon-border-btn inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-[#DCEBFE] hover:text-white bg-[#10182B] hover:bg-[#0B1020] border border-[#27344D] hover:border-[#4285F4] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer font-mono"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#22D3EE]" />
                      <span>Preview Project</span>
                    </button>

                    {/* GitHub Repository */}
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neon-border-btn inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-[#F8FAFC] bg-[#10182B] hover:bg-[#0B1020] border border-[#27344D] hover:border-[#4285F4] shadow-sm transition-all hover:-translate-y-0.5 font-mono"
                      title="Visit my GitHub profile"
                      aria-label="Visit my GitHub profile"
                    >
                      <GithubIcon className="w-4 h-4 text-[#AAB6CC]" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: High-Impact Metrics & Deployment Cards */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <h4 className="text-xs font-mono font-bold tracking-wider text-[#AAB6CC] uppercase">
                    Architecture Benchmarks
                  </h4>

                  <div className="p-3.5 rounded-xl bg-[#10182B] border border-[#27344D] flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#151F35] border border-[#27344D] shrink-0">
                      <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        3 User Roles (RBAC)
                      </span>
                      <p className="text-[11px] text-[#AAB6CC] mt-0.5 leading-snug">
                        Strict security boundaries segregating Administrator, Faculty members, and Students.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#10182B] border border-[#27344D] flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#151F35] border border-[#27344D] shrink-0">
                      <Sliders className="w-4 h-4 text-[#4285F4]" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        Dynamic Calculation Engine
                      </span>
                      <p className="text-[11px] text-[#AAB6CC] mt-0.5 leading-snug">
                        Automated computation comparing allocated targets with real-time academic outcomes.
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
                        Instant generation and downloads of formatted PDF summaries, Excel sheets, and Word docs.
                      </p>
                    </div>
                  </div>

                  {/* Intranet Verified Deployment Callout */}
                  <div className="p-3.5 rounded-xl bg-[#10182B] border border-[#34A853]/40 mt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                      <span className="text-xs font-semibold text-[#34A853] font-mono">
                        Verified Campus Deployment
                      </span>
                    </div>
                    <p className="text-[11px] text-[#AAB6CC] leading-relaxed">
                      Organizes faculty targets, student academic performance, and departmental analytics into one centralized system at Mohamed Sathak Engineering College.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2. Gesture C: Horizontal Drag & Swipe Carousel for Specialized Projects */}
        {projectsList.length > 1 && (
          <div className="mt-12 pt-8 border-t border-[#27344D]/80">
            {/* Carousel Header & Gesture Control Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-[#22D3EE]" />
                  <span>Specialized Projects Carousel</span>
                </h3>
                <p className="text-xs text-[#AAB6CC] mt-0.5">
                  Browse through my academic and institutional systems via touch swipe or mouse drag.
                </p>
              </div>

              {/* Visual Drag Gesture Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151F35] border border-[#27344D] text-[#22D3EE] text-[11px] font-mono self-start sm:self-auto select-none">
                <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
                <span>Drag or Swipe horizontally</span>
              </div>
            </div>

            {/* Draggable Motion Carousel Track */}
            <div
              className="relative overflow-hidden cursor-grab active:cursor-grabbing p-1 -m-1"
              ref={carouselContainerRef}
              data-drag-carousel="true"
            >
              <motion.div
                drag="x"
                dragConstraints={{
                  right: 0,
                  left: carouselConstraint,
                }}
                dragElastic={0.15}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 25 }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setTimeout(() => setIsDragging(false), 80)}
                className="flex gap-4 sm:gap-5 pb-4 select-none"
              >
                {projectsList.map((proj) => (
                  <motion.div
                    key={proj.id}
                    whileHover={{ y: -4 }}
                    onClick={() => {
                      if (!isDragging) {
                        onOpenDetails(proj);
                      }
                    }}
                    className="neon-border-card w-[280px] sm:w-[360px] shrink-0 p-5 rounded-2xl bg-[#151F35] border border-[#27344D] hover:border-[#4285F4]/60 hover:shadow-[0_12px_35px_rgba(66,133,244,0.18)] transition-all flex flex-col justify-between group"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onOpenDetails(proj);
                      }
                    }}
                    aria-label={`Open details for ${proj.title}`}
                    data-cursor="Open"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#4285F4]/15 border border-[#4285F4]/30 text-[#22D3EE]">
                          {proj.category}
                        </span>
                        <span className="text-[11px] text-[#AAB6CC] font-mono">
                          {proj.year}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white group-hover:text-[#22D3EE] transition-colors line-clamp-1">
                        {proj.title}
                      </h4>

                      <p className="text-xs text-[#AAB6CC] mt-2 leading-relaxed line-clamp-2">
                        {proj.shortDescription || proj.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[#27344D] flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {proj.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10182B] text-[#AAB6CC] border border-[#27344D]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <span className="text-xs font-mono font-semibold text-[#4285F4] group-hover:text-[#22D3EE] flex items-center gap-1 transition-colors">
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
