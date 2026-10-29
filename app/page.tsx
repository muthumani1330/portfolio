"use client";

import React, { useState, useEffect } from "react";
import { ChromeNavbar } from "@/components/navigation/ChromeNavbar";
import { ChromeHero } from "@/components/sections/ChromeHero";
import { ChromeAbout } from "@/components/sections/ChromeAbout";
import { ChromeSkills } from "@/components/sections/ChromeSkills";
import { ChromeFeaturedProject } from "@/components/sections/ChromeFeaturedProject";
import { ChromeExperience } from "@/components/sections/ChromeExperience";
import { ChromeEducation } from "@/components/sections/ChromeEducation";
import { ChromeAchievements } from "@/components/sections/ChromeAchievements";
import { ChromeContact } from "@/components/sections/ChromeContact";
import { ChromeFooter } from "@/components/navigation/ChromeFooter";
import { BackToTop } from "@/components/navigation/BackToTop";

// Classic Sidebar Layout Components
import { IPortfolioSidebar } from "@/components/navigation/IPortfolioSidebar";
import { IPortfolioHero } from "@/components/sections/IPortfolioHero";
import { IPortfolioAbout } from "@/components/sections/IPortfolioAbout";
import { IPortfolioStats } from "@/components/sections/IPortfolioStats";
import { IPortfolioSkills } from "@/components/sections/IPortfolioSkills";
import { IPortfolioExperience } from "@/components/sections/IPortfolioExperience";
import { IPortfolioResume } from "@/components/sections/IPortfolioResume";
import { IPortfolioPortfolio } from "@/components/sections/IPortfolioPortfolio";
import { IPortfolioAchievements } from "@/components/sections/IPortfolioAchievements";
import { IPortfolioContact } from "@/components/sections/IPortfolioContact";
import { IPortfolioFooter } from "@/components/navigation/IPortfolioFooter";
import { IPortfolioBackToTop } from "@/components/navigation/IPortfolioBackToTop";

import { ProjectModal } from "@/components/ui/ProjectModal";
import { Project, PORTFOLIO_DATA } from "@/data/portfolioData";
import { LayoutGrid, PanelLeft, Sparkles, Compass, X } from "lucide-react";
import { Cinematic3DIntro } from "@/components/canvas/Cinematic3DIntro";
import { GestureCursor } from "@/components/ui/GestureCursor";

export default function Home() {
  const [layoutMode, setLayoutMode] = useState<"top-nav" | "sidebar">("top-nav");
  const [activeSection, setActiveSection] = useState<string>("home");
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [isInteractiveMode, setIsInteractiveMode] = useState<boolean>(true);
  const [showGestureGuide, setShowGestureGuide] = useState<boolean>(true);

  // Cinematic 3D Intro State (Session-aware)
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [introMounted, setIntroMounted] = useState<boolean>(false);

  useEffect(() => {
    // Play automatically on first visit of browsing session (or if forced via URL ?intro=true)
    const hasSeenIntro = sessionStorage.getItem("muthumani_intro_seen");
    const forceIntro = typeof window !== "undefined" && window.location.search.includes("intro=true");
    const skipIntro = typeof window !== "undefined" && window.location.search.includes("skip_intro=true");

    if ((!hasSeenIntro && !skipIntro) || forceIntro) {
      setShowIntro(true);
      setIntroMounted(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("muthumani_intro_seen", "true");
    setShowIntro(false);
    setTimeout(() => {
      setIntroMounted(false);
    }, 600);
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setIntroMounted(true);
    setShowIntro(true);
  };

  // Synchronize active section with scroll position
  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "skills",
      "projects",
      "experience",
      "education",
      "resume",
      "portfolio",
      "achievements",
      "contact",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B1020] text-[#F8FAFC]">
      {/* 0. CINEMATIC 3D INTRO ANIMATION OVERLAY */}
      {introMounted && (
        <Cinematic3DIntro
          onComplete={handleIntroComplete}
          forcePlay={showIntro}
        />
      )}

      {layoutMode === "top-nav" ? (
        /* =========================================================================
           1. MODERN 3D DEVELOPER SHOWCASE (Top-Nav Header Layout)
           ========================================================================= */
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Top Sticky Header with Active Pill Indicator */}
          <ChromeNavbar activeSection={activeSection} />

          {/* Main Sections */}
          <main id="main" className="flex-1 flex flex-col">
            <ChromeHero />
            <ChromeAbout />
            <ChromeSkills />
            <ChromeFeaturedProject onOpenDetails={(proj) => setModalProject(proj)} />
            <ChromeExperience />
            <ChromeEducation />
            <ChromeAchievements />
            <ChromeContact />
          </main>

          {/* Chrome-Styled Footer with Replay Intro Control */}
          <ChromeFooter onReplayIntro={handleReplayIntro} />

          {/* Floating Back To Top Button */}
          <BackToTop />
        </div>
      ) : (
        /* =========================================================================
           2. CLASSIC iPORTFOLIO SIDEBAR LAYOUT
           ========================================================================= */
        <div className="relative z-10 flex min-h-screen">
          {/* Left Fixed Sidebar */}
          <IPortfolioSidebar activeSection={activeSection} />

          {/* Main Content Area (Offset by 300px on desktop) */}
          <main
            id="main"
            className="ml-0 lg:ml-[300px] flex-1 flex flex-col min-h-screen transition-all duration-300"
          >
            <IPortfolioHero />
            <IPortfolioAbout />
            <IPortfolioStats />
            <IPortfolioSkills />
            <IPortfolioExperience />
            <IPortfolioResume />
            <IPortfolioPortfolio onOpenDetails={(proj) => setModalProject(proj)} />
            <IPortfolioAchievements />
            <IPortfolioContact />
            <IPortfolioFooter />
          </main>

          <IPortfolioBackToTop />
        </div>
      )}

      {/* Floating Layout Switcher & Replay Intro Pill */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="neon-border-card flex items-center gap-1.5 p-1 bg-[#151F35]/90 backdrop-blur-md border border-[#27344D] rounded-full shadow-xl">
          <button
            type="button"
            onClick={() => setLayoutMode("top-nav")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
              layoutMode === "top-nav"
                ? "bg-gradient-to-r from-[#4285F4] to-[#3367D6] text-white shadow-md font-semibold"
                : "text-[#AAB6CC] hover:text-[#F8FAFC]"
            }`}
            title="Switch to Chrome Galaxy Dashboard (Top Navigation)"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Galaxy Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => setLayoutMode("sidebar")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
              layoutMode === "sidebar"
                ? "bg-gradient-to-r from-[#4285F4] to-[#3367D6] text-white shadow-md font-semibold"
                : "text-[#AAB6CC] hover:text-[#F8FAFC]"
            }`}
            title="Switch to Classic Left Sidebar Layout"
          >
            <PanelLeft className="w-3.5 h-3.5" />
            <span>Classic Sidebar</span>
          </button>

          {/* Replay 3D Intro Button */}
          <button
            type="button"
            onClick={handleReplayIntro}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#22D3EE] hover:text-white hover:bg-[#10182B] transition-all cursor-pointer border-l border-[#27344D]/80 ml-0.5"
            title="Replay Cinematic 3D Intro Animation"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span className="hidden sm:inline">Replay Intro</span>
          </button>

          {/* Interactive Gesture Mode Toggle Button */}
          <button
            type="button"
            onClick={() => setIsInteractiveMode(!isInteractiveMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all border-l border-[#27344D]/80 ml-0.5 cursor-pointer ${
              isInteractiveMode
                ? "text-[#22D3EE] font-semibold bg-[#22D3EE]/10"
                : "text-[#AAB6CC] hover:text-[#F8FAFC]"
            }`}
            title="Toggle Gesture Interactions (3D tilt, drag carousel, custom pointer)"
          >
            <Compass className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span className="hidden sm:inline">Gestures {isInteractiveMode ? "On" : "Off"}</span>
          </button>
        </div>
      </div>

      {/* Floating Gesture Guide HUD (when Interactive Mode is active) */}
      {isInteractiveMode && showGestureGuide && (
        <div className="neon-border-card fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-3 px-3.5 py-2 rounded-full bg-[#151F35]/95 backdrop-blur-md border border-[#4285F4]/40 shadow-xl text-xs font-mono text-[#DCEBFE] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="flex items-center gap-1.5 text-[#22D3EE]">
            <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
            <span className="font-semibold">Gesture Mode:</span>
          </span>
          <span className="text-[#AAB6CC]">↔ Drag carousel • 🖱️ 3D Tilt • ⌨️ ← / → Navigation</span>
          <button
            type="button"
            onClick={() => setShowGestureGuide(false)}
            className="p-1 rounded-full text-[#AAB6CC] hover:text-white hover:bg-[#10182B] transition-colors ml-1 cursor-pointer"
            title="Dismiss gesture guide"
            aria-label="Dismiss gesture guide"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Custom Contextual Gesture Follower */}
      <GestureCursor enabled={isInteractiveMode} />

      {/* Project Details Modal */}
      <ProjectModal
        project={modalProject}
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
        allProjects={PORTFOLIO_DATA.showcaseProjects}
        onSelectProject={(proj) => setModalProject(proj)}
      />
    </div>
  );
}
