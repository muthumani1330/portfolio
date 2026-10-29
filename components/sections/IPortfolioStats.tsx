"use client";

import React from "react";
import { GraduationCap, FolderGit2, Trophy, Headphones } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function IPortfolioStats() {
  const { education } = PORTFOLIO_DATA;

  const stats = [
    {
      icon: GraduationCap,
      value: "B.Tech",
      label: "AI & Data Science",
      desc: "Mohamed Sathak Engineering College (2022–2026)",
    },
    {
      icon: FolderGit2,
      value: "ATTS",
      label: "Enterprise Platform",
      desc: "Deployed for College Intranet Operations",
    },
    {
      icon: Trophy,
      value: "Winner",
      label: "Hackathon Recognition",
      desc: "Intra Hackathon 2025 First Prize",
    },
    {
      icon: Headphones,
      value: "2+ Roles",
      label: "Engineering Experience",
      desc: "Systems Associate & Web Dev Intern",
    },
  ];

  return (
    <section id="stats" className="py-12 px-6 sm:px-10 bg-[var(--subtle-bg)] border-y border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="stats-item flex items-start gap-4 bg-[var(--surface-color)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm"
              >
                <div className="p-3 rounded-full bg-[#149ddd]/10 text-[#149ddd] shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold text-[var(--heading-color)] font-['Raleway'] tracking-tight">
                    {stat.value}
                  </h4>
                  <p className="text-xs font-bold text-[var(--default-color)] uppercase tracking-wider font-mono mt-0.5">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                    {stat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

