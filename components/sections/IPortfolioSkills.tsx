"use client";

import React from "react";
import { Layout, Server, Database, Wrench, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function IPortfolioSkills() {
  const { skillsMatrix } = PORTFOLIO_DATA;

  const categoryIcons = [Layout, Server, Database, Wrench];

  return (
    <section id="skills" className="py-16 sm:py-20 px-6 sm:px-10 max-w-6xl mx-auto">
      {/* Signature iPortfolio Section Title */}
      <div className="section-title">
        <span className="text-xs font-mono font-bold tracking-widest text-[#149ddd] uppercase block mb-1">
          TECHNICAL SKILLS
        </span>
        <h2>Technologies I Work With.</h2>
        <p>
          Organized into core technical disciplines with hands-on application in database-driven web systems, responsive frontend design, and software tooling.
        </p>
      </div>

      {/* 4 Categorized Skills Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {skillsMatrix.map((cat, cIdx) => {
          const Icon = categoryIcons[cIdx % categoryIcons.length];
          return (
            <div
              key={cIdx}
              className="p-6 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] shadow-sm hover:border-[#149ddd] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#149ddd]/15 text-[#149ddd] flex items-center justify-center shrink-0 group-hover:bg-[#149ddd] group-hover:text-white transition-colors shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--heading-color)] font-mono tracking-wider uppercase">
                      {cat.title}
                    </h3>
                    <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                      {cat.skills.length} core competencies
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-[var(--subtle-bg)] text-[var(--default-color)] border border-[var(--border-color)] hover:border-[#149ddd] transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#149ddd]" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
