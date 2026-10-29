"use client";

import React from "react";
import { Download, GraduationCap, MapPin, Calendar, BookOpen, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function IPortfolioResume() {
  const { personal, education } = PORTFOLIO_DATA;

  return (
    <section id="resume" className="py-16 sm:py-20 px-6 sm:px-10 max-w-6xl mx-auto">
      {/* Signature iPortfolio Section Title */}
      <div className="section-title">
        <span className="text-xs font-mono font-bold tracking-widest text-[#149ddd] uppercase block mb-1">
          {education.label}
        </span>
        <h2>{education.heading}</h2>
        <p>
          Formal academic training in Artificial Intelligence, Data Science, and core Software Engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
        {/* Left Column: Professional Summary */}
        <div>
          <h3 className="text-xl font-bold text-[var(--heading-color)] font-['Raleway'] mb-4 flex items-center gap-2">
            <span>Professional Summary</span>
          </h3>
          <div className="resume-item pb-6">
            <h4 className="text-base font-bold text-[#149ddd] uppercase tracking-wider font-mono">
              {personal.name}
            </h4>
            <p className="text-xs sm:text-sm text-[var(--default-color)] italic my-2 leading-relaxed font-['Roboto']">
              Web Developer with an Artificial Intelligence &amp; Data Science background. Developer of the Academic Target Tracking System (ATTS) and former Systems Associate at MSEC-IIF.
            </p>
            <ul className="text-xs text-[var(--default-color)] space-y-2 mt-3 font-mono">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#149ddd]" />
                <span>{personal.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#149ddd]">&bull;</span>
                <span>{personal.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#149ddd]">&bull;</span>
                <span>{personal.phone}</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--border-color)] mt-4">
            <h4 className="text-xs font-bold text-[var(--heading-color)] uppercase font-mono mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#149ddd]" />
              <span>Core Academic Pillars</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono mt-3">
              <div className="p-3 rounded-xl bg-[var(--surface-color)] border border-[var(--border-color)]">
                <span className="text-[var(--text-secondary)] block text-[10px] uppercase">Specialization</span>
                <span className="text-xs font-bold text-[var(--heading-color)]">AI &amp; Data Science</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--surface-color)] border border-[var(--border-color)]">
                <span className="text-[var(--text-secondary)] block text-[10px] uppercase">Development Focus</span>
                <span className="text-xs font-bold text-[var(--heading-color)]">Full-Stack Web Systems</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Education & Curriculum Vitae */}
        <div>
          <h3 className="text-xl font-bold text-[var(--heading-color)] font-['Raleway'] mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#149ddd]" />
            <span>Education</span>
          </h3>
          <div className="resume-item pb-4">
            <h4 className="text-base sm:text-lg font-bold text-[var(--heading-color)] font-['Raleway']">
              {education.degree}
            </h4>
            <div className="flex flex-wrap items-center gap-2 my-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-[#149ddd]/15 text-[#149ddd]">
                <Calendar className="w-3 h-3" />
                <span>{education.period}</span>
              </span>
              <span className="text-xs font-mono text-[var(--text-secondary)]">
                {education.location}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#149ddd] font-mono mb-3">
              {education.institution}
            </p>
            <ul className="text-xs text-[var(--default-color)] space-y-2 leading-relaxed font-['Roboto'] mb-4">
              {education.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34a853] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Download Resume Action */}
          <div className="mt-4 p-5 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-[var(--heading-color)] font-mono">
                Official Curriculum Vitae
              </h4>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                Download verified academic and development credentials
              </p>
            </div>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#149ddd] hover:bg-[#1182b8] text-white text-xs font-semibold transition-all shadow-md shrink-0 hover:-translate-y-0.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
