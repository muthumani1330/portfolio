"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ChromeExperience() {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-14 sm:py-20 border-t border-[#27344D] bg-[#0B1020]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4285F4]/15 text-[#22D3EE] text-xs font-mono font-medium mb-2 border border-[#4285F4]/20">
            <span>CAREER TIMELINE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
            Professional Experience
          </h2>
          <p className="text-sm text-[#AAB6CC] mt-1 max-w-2xl">
            Practical engineering internships and systems administration responsibilities verified from my resume.
          </p>
        </div>

        {/* Structured Timeline Container */}
        <div className="space-y-6">
          {experience.map((item, idx) => (
            <div
              key={idx}
              className="chrome-card neon-border-card p-6 sm:p-7 relative transition-all duration-200"
              data-cursor="Experience"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[var(--border-color)]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-1.5 rounded-lg bg-[var(--bg-accent-tint)] text-[#1a73e8] dark:text-[#8ab4f8]">
                      <Briefcase className="w-4 h-4" />
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                      {item.role}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#1a73e8] dark:text-[#8ab4f8]">
                    {item.organization}
                    {item.institution && (
                      <span className="text-[var(--text-secondary)] font-normal">
                        {" "}• {item.institution}
                      </span>
                    )}
                  </p>
                </div>

                {/* Period Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] shrink-0 self-start sm:self-center">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Responsibilities Bullets strictly based on resume */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono font-bold tracking-wider text-[var(--text-secondary)] uppercase">
                  Verified Responsibilities &amp; Outcomes:
                </h4>
                <ul className="space-y-2">
                  {(item.bullets || []).map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#34a853] mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
