"use client";

import React from "react";
import { GraduationCap, MapPin, Calendar, AlertCircle, Award, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ChromeEducation() {
  const { education } = PORTFOLIO_DATA;

  return (
    <section id="education" className="py-14 sm:py-20 border-t border-[#27344D] bg-[#0B1020]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4285F4]/15 text-[#22D3EE] text-xs font-mono font-medium mb-2 border border-[#4285F4]/20">
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
            Education &amp; Academic Credentials
          </h2>
          <p className="text-sm text-[#AAB6CC] mt-1 max-w-2xl">
            Undergraduate technical education in Artificial Intelligence and Data Science.
          </p>
        </div>

        {/* Education Grid: Degree Details & CGPA Transparency Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Education Card (Left) */}
          <div className="lg:col-span-7 chrome-card p-6 sm:p-7">
            <div className="flex items-start justify-between gap-3 pb-4 mb-4 border-b border-[var(--border-color)]">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-2 rounded-xl bg-[var(--bg-accent-tint)] text-[#1a73e8] dark:text-[#8ab4f8]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#1a73e8] dark:text-[#8ab4f8] uppercase">
                    Undergraduate Degree
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  {education.degree}
                </h3>
                <p className="text-sm font-medium text-[var(--text-secondary)] mt-1 flex items-center gap-1.5">
                  <span>🏛️</span>
                  <span>{education.institution}</span>
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>{education.period}</span>
              </div>
            </div>

            {/* Coursework & Focus Points */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold tracking-wider text-[var(--text-secondary)] uppercase">
                Curriculum &amp; Technical Highlights:
              </h4>
              <ul className="space-y-2">
                {education.details.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)]">
                    <CheckCircle2 className="w-4 h-4 text-[#34a853] mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#1a73e8]" />
                {education.location}
              </span>
              <span>Full-Time Campus Program</span>
            </div>
          </div>

          {/* Transparent GPA Verification Card (Right Column) */}
          <div className="lg:col-span-5 chrome-card p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">
                    Academic Standing &amp; CGPA
                  </h4>
                  <span className="text-[11px] text-[var(--text-secondary)] font-mono block">
                    Institutional Record Verification
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-3 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-secondary)] font-mono">Degree Program:</span>
                  <span className="font-bold text-[#1a73e8] dark:text-[#8ab4f8] font-mono text-xs">
                    {education.degree}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-secondary)] font-mono">Academic Duration:</span>
                  <span className="font-bold text-[var(--text-primary)] font-mono text-xs">
                    {education.period}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-secondary)] font-mono">Status:</span>
                  <span className="font-bold text-[#34a853] font-mono text-xs">
                    In Progress (Final Year)
                  </span>
                </div>
              </div>

              {/* Explicit Verification Note */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-[var(--bg-accent-tint)] border border-[#1a73e8]/20 text-[11px] text-[var(--text-secondary)] leading-relaxed">
                <AlertCircle className="w-4 h-4 text-[#1a73e8] dark:text-[#8ab4f8] shrink-0 mt-0.5" />
                <span>
                  <strong>Candidate Note:</strong> CGPA omitted pending final consolidated semester marksheet verification to maintain 100% transcript integrity.
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[var(--border-color)] text-[11px] font-mono text-[var(--text-secondary)] flex items-center justify-between">
              <span>Department: AI &amp; DS</span>
              <span className="text-[#34a853]">First Class Standing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
