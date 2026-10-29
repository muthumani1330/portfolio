"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight, Award, GraduationCap, Code2, Server } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function IPortfolioAbout() {
  const { personal, about, education } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-16 sm:py-20 px-6 sm:px-10 max-w-6xl mx-auto">
      {/* Signature iPortfolio Section Title */}
      <div className="section-title">
        <span className="text-xs font-mono font-bold tracking-widest text-[#149ddd] uppercase block mb-1">
          {about.label}
        </span>
        <h2>{about.heading}</h2>
        <p>
          B.Tech student in Artificial Intelligence &amp; Data Science at Mohamed Sathak Engineering College, specializing in practical web development, normalized relational databases, and institutional IT support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-6">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-color)] bg-slate-900 group">
            <Image
              src="/muthumani-profile.jpg"
              alt={personal.name}
              fill
              sizes="320px"
              style={{ objectPosition: "50% 12%", objectFit: "cover" }}
              className="transition-transform duration-500 group-hover:scale-105"
              priority
            />
            {/* Elegant gradient overlay at bottom with verified badge */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-white">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-[#149ddd] text-white">
                  B.Tech 2022–2026
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#34a853] font-mono bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]" />
                  Verified
                </span>
              </div>
              <h3 className="text-xl font-bold font-['Raleway'] tracking-tight">{personal.name}</h3>
              <p className="text-xs text-slate-300 font-mono mt-0.5">Mohamed Sathak Engineering College</p>
            </div>
          </div>

          <div className="mt-5 w-full max-w-[320px] p-4 rounded-xl bg-[var(--surface-color)] border border-[var(--border-color)] shadow-sm text-xs font-mono text-[var(--default-color)]">
            <div className="flex items-center justify-between pb-2.5 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-secondary)]">Location:</span>
              <span className="font-semibold text-[var(--heading-color)]">{personal.location}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-[var(--border-color)]">
              <span className="text-[var(--text-secondary)]">Discipline:</span>
              <span className="font-semibold text-[var(--heading-color)]">AI &amp; Data Science</span>
            </div>
            <div className="flex items-center justify-between pt-2.5">
              <span className="text-[var(--text-secondary)]">Status:</span>
              <span className="text-[#34a853] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse" />
                Open to Full-Stack Roles
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Key Info */}
        <div className="lg:col-span-8 space-y-5">
          <div>
            <h3 className="text-2xl font-bold text-[var(--heading-color)] font-['Raleway']">
              Web Developer | AI &amp; Data Science
            </h3>
            <p className="text-sm text-[#149ddd] font-medium mt-1 font-['Poppins']">
              Building Web Applications That Solve Real Problems.
            </p>
          </div>

          <p className="text-sm leading-relaxed text-[var(--default-color)] font-['Roboto']">
            {about.bio[0]}
          </p>

          <p className="text-sm leading-relaxed text-[var(--default-color)] font-['Roboto']">
            {about.bio[1]}
          </p>

          {/* 2-Column Details List with iPortfolio Chevron Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 py-3 border-y border-[var(--border-color)] text-sm">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] shrink-0" />
                <strong className="text-[var(--heading-color)]">Degree:</strong>
                <span className="text-[var(--default-color)]">B.Tech in AI &amp; Data Science</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] shrink-0" />
                <strong className="text-[var(--heading-color)]">Institution:</strong>
                <span className="text-[var(--default-color)] truncate">Mohamed Sathak Engineering College</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] shrink-0" />
                <strong className="text-[var(--heading-color)]">Location:</strong>
                <span className="text-[var(--default-color)]">{personal.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] shrink-0" />
                <strong className="text-[var(--heading-color)]">Core Focus:</strong>
                <span className="text-[var(--default-color)] font-semibold text-[#149ddd]">
                  Full-Stack Web &amp; Databases
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] shrink-0" />
                <strong className="text-[var(--heading-color)]">Duration:</strong>
                <span className="text-[var(--default-color)]">2022–2026</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] shrink-0" />
                <strong className="text-[var(--heading-color)]">Phone:</strong>
                <a href={`tel:${personal.phone}`} className="text-[var(--default-color)] hover:text-[#149ddd]">
                  {personal.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] shrink-0" />
                <strong className="text-[var(--heading-color)]">Email:</strong>
                <a href={`mailto:${personal.email}`} className="text-[var(--default-color)] hover:text-[#149ddd] truncate">
                  {personal.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] shrink-0" />
                <strong className="text-[var(--heading-color)]">Availability:</strong>
                <span className="text-[#34a853] font-semibold">Available for Opportunities</span>
              </div>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-[var(--default-color)] font-['Roboto']">
            {about.bio[2]}
          </p>

          {/* 4 Focus Area Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[var(--subtle-bg)] border border-[var(--border-color)] flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[var(--surface-color)] text-[#149ddd] shrink-0 shadow-sm">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--heading-color)]">Full-Stack Development</h4>
                <p className="text-[11px] text-[var(--default-color)] mt-0.5">
                  Modular PHP backends, normalized MySQL database designs, and reactive frontends.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--subtle-bg)] border border-[var(--border-color)] flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[var(--surface-color)] text-[#149ddd] shrink-0 shadow-sm">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--heading-color)]">Systems &amp; IT Support</h4>
                <p className="text-[11px] text-[var(--default-color)] mt-0.5">
                  Hands-on infrastructure maintenance, workstation networking, and uptime at MSEC-IIF.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

