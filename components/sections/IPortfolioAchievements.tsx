"use client";

import React from "react";
import { Trophy, Award, Medal, Feather } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function IPortfolioAchievements() {
  const { achievements } = PORTFOLIO_DATA;

  const icons = [Trophy, Award, Medal, Feather];

  return (
    <section id="achievements" className="py-16 sm:py-20 px-6 sm:px-10 max-w-6xl mx-auto bg-[var(--subtle-bg)] border-y border-[var(--border-color)]">
      {/* Signature iPortfolio Section Title */}
      <div className="section-title">
        <span className="text-xs font-mono font-bold tracking-widest text-[#149ddd] uppercase block mb-1">
          ACHIEVEMENTS
        </span>
        <h2>Milestones That Motivate Me.</h2>
        <p>
          Competitive hackathon podium finishes, district sports achievements, and co-curricular awards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {achievements.map((item, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] shadow-sm hover:border-[#149ddd] transition-all duration-300 flex items-start gap-5 group"
            >
              {/* Circular Icon with iPortfolio accent */}
              <div className="w-14 h-14 rounded-full bg-[#149ddd] text-white flex items-center justify-center shrink-0 group-hover:bg-[#1182b8] transition-colors shadow-md">
                <Icon className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#149ddd]/15 text-[#149ddd]">
                    {item.badge}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)] font-mono">
                    {item.year}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--heading-color)] font-['Raleway']">
                  {item.title}
                </h3>

                <p className="text-xs font-medium text-[#149ddd] mt-0.5 font-mono">
                  {item.category}
                </p>

                {item.description && (
                  <p className="text-xs sm:text-sm text-[var(--default-color)] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

