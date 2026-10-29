"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, Building2, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function IPortfolioExperience() {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="experience section-bg py-16 sm:py-20 px-6 sm:px-10 max-w-6xl mx-auto bg-[var(--subtle-bg)] border-y border-[var(--border-color)]">
      <div className="container mx-auto">
        {/* Signature iPortfolio Section Title */}
        <div className="section-title">
          <span className="text-xs font-mono font-bold tracking-widest text-[#149ddd] uppercase block mb-1">
            EXPERIENCE
          </span>
          <h2>Experience Beyond the Classroom.</h2>
          <p>
            Practical experience across software development internships and institutional IT infrastructure administration.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8 mt-8">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="resume-item pb-8 pl-6 border-l-2 border-[#149ddd] relative"
            >
              {/* Header: Role & Period */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--heading-color)] font-['Raleway'] flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#149ddd]" />
                  <span>{exp.role}</span>
                </h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#149ddd]/15 text-[#149ddd] self-start sm:self-center">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </span>
              </div>

              {/* Organization and Institution */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-semibold text-[#149ddd] font-mono mb-3">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{exp.organization}</span>
                </span>
                {exp.institution && (
                  <span className="text-[var(--text-secondary)] font-normal flex items-center gap-1">
                    <span>&bull;</span>
                    <MapPin className="w-3 h-3 text-[#149ddd]" />
                    <span>{exp.institution}</span>
                  </span>
                )}
              </div>

              {/* Verified Exact Description */}
              <p className="text-sm text-[var(--default-color)] leading-relaxed font-['Roboto'] mb-4 bg-[var(--surface-color)] p-4 rounded-xl border border-[var(--border-color)]">
                {exp.description}
              </p>

              {/* Verified Bullet Points */}
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--default-color)] font-['Roboto'] pl-1">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#34a853] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
