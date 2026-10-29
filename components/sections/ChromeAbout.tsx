"use client";

import React from "react";
import { GraduationCap, Code2, Server, Trophy, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ChromeAbout() {
  const { about } = PORTFOLIO_DATA;

  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-5 h-5 text-[#22D3EE]" />,
    Code2: <Code2 className="w-5 h-5 text-[#4285F4]" />,
    Server: <Server className="w-5 h-5 text-[#8B5CF6]" />,
    Trophy: <Trophy className="w-5 h-5 text-amber-400" />,
  };

  return (
    <section id="about" className="py-14 sm:py-20 border-t border-[#27344D] bg-[#0B1020]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4285F4]/15 text-[#22D3EE] text-xs font-mono font-medium mb-2 border border-[#4285F4]/20">
            <span>ABOUT ME</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
            Engineering Profile &amp; Background
          </h2>
          <p className="text-sm text-[#AAB6CC] mt-1 max-w-2xl">
            {about.subtitle}
          </p>
        </div>

        {/* Content Grid: Biography & Highlight Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Biography Text (Left Column) */}
          <div className="lg:col-span-6 space-y-4 text-sm sm:text-base text-[#AAB6CC] leading-relaxed">
            {about.bio.map((paragraph, idx) => (
              <p
                key={idx}
                className="bg-[#151F35] p-5 rounded-2xl border border-[#27344D] shadow-sm text-[#AAB6CC] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}

            {/* Quick Summary Pill Row */}
            <div className="p-4 rounded-xl bg-[#10182B] border border-[#27344D] flex flex-wrap items-center gap-2 text-xs font-mono text-[#F8FAFC]">
              <span className="font-semibold text-[#4285F4]">
                Core Competencies:
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#151F35] border border-[#27344D] text-[#F8FAFC]">Full-Stack PHP</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#151F35] border border-[#27344D] text-[#F8FAFC]">Relational SQL</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#151F35] border border-[#27344D] text-[#F8FAFC]">AI &amp; Data Science</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#151F35] border border-[#27344D] text-[#F8FAFC]">IT Systems</span>
            </div>
          </div>

          {/* 4 Compact Highlight Cards (Right Column) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {about.highlights.map((item, idx) => (
              <div
                key={idx}
                className="chrome-card p-4 sm:p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-accent-tint)] flex items-center justify-center mb-3">
                    {iconMap[item.icon] || <CheckCircle2 className="w-5 h-5 text-[#1a73e8]" />}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
