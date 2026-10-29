"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, ChevronRight, Sparkles, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/BrandIcons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function HeroSection() {
  const { personal } = PORTFOLIO_DATA;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[800px] h-[800px] rounded-full border border-white/[0.03] animate-[spin_120s_linear_infinite]" />
        <div className="w-[550px] h-[550px] rounded-full border border-dashed border-indigo-500/[0.08] animate-[spin_80s_linear_infinite_reverse]" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-8 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{personal.title}</span>
          <span className="text-white/20">|</span>
          <span className="text-slate-400">{personal.location}</span>
        </motion.div>

        {/* Large Bold Typography Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white"
        >
          Engineering <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-100 to-purple-400">
            Resilient Scale
          </span>{" "}
          <br />
          &amp; Digital Craft.
        </motion.h1>

        {/* Tagline / Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed"
        >
          Hi, I&apos;m <span className="font-semibold text-white">{personal.name}</span>.{" "}
          {personal.tagline}
        </motion.p>

        {/* Action Buttons: View Work & Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* "View Work" primary scroll button */}
          <a
            href="#showcase"
            onClick={(e) => scrollToSection(e, "#showcase")}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] cursor-pointer"
          >
            <span>View Work</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>

          {/* Secondary Action: Contact */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 hover:text-white glass-pill border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
          >
            <span>Let&apos;s Connect</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </a>
        </motion.div>

        {/* Social Pill Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex items-center gap-3 text-slate-400"
        >
          <a
            href={personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-xl glass-pill hover:text-white hover:border-indigo-500/40 hover:bg-white/5 transition-all"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-xl glass-pill hover:text-white hover:border-indigo-500/40 hover:bg-white/5 transition-all"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={personal.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter Profile"
            className="p-2.5 rounded-xl glass-pill hover:text-white hover:border-indigo-500/40 hover:bg-white/5 transition-all"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personal.socials.email}`}
            aria-label="Send Email"
            className="p-2.5 rounded-xl glass-pill hover:text-white hover:border-indigo-500/40 hover:bg-white/5 transition-all"
          >
            <Mail className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-4 h-7 rounded-full border border-slate-700 flex justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
