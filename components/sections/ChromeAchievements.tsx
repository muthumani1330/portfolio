"use client";

import React, { useState } from "react";
import { Trophy, Medal, Award, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ChromeAchievements() {
  const { achievements } = PORTFOLIO_DATA;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-[#1a73e8] dark:text-[#8ab4f8]" />;
      case 2:
        return <Award className="w-5 h-5 text-indigo-500" />;
      case 3:
      default:
        return <Award className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <section id="achievements" className="py-14 sm:py-20 border-t border-[#27344D] bg-[#0B1020]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4285F4]/15 text-[#22D3EE] text-xs font-mono font-medium mb-2 border border-[#4285F4]/20">
            <span>RECOGNITION &amp; MERIT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
            Honors &amp; Extracurricular Achievements
          </h2>
          <p className="text-sm text-[#AAB6CC] mt-1 max-w-2xl">
            Verified competitive accomplishments and leadership recognitions recorded from my resume.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {achievements.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                className="chrome-card neon-border-card p-5 flex flex-col justify-between"
                data-cursor="Award"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="p-2 rounded-xl bg-[var(--bg-subtle)]">
                      {getIcon(idx)}
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[var(--bg-accent-tint)] text-[#1a73e8] dark:text-[#8ab4f8]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] font-mono mt-1">
                    {item.category}
                  </p>

                  {/* Expandable description */}
                  {item.description && (
                    <div className="mt-3 pt-3 border-t border-[var(--border-color)]">
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
                  <span>Year: {item.year}</span>
                  <span className="text-[#34a853] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
