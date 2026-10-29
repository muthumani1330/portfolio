"use client";

import React from "react";
import { Layers, Server, Database, Wrench, CheckCircle } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ChromeSkills() {
  const { skillsMatrix } = PORTFOLIO_DATA;

  const categoryIcons: Record<string, React.ReactNode> = {
    FRONTEND: <Layers className="w-5 h-5 text-[#22D3EE]" />,
    BACKEND: <Server className="w-5 h-5 text-[#4285F4]" />,
    DATABASE: <Database className="w-5 h-5 text-[#8B5CF6]" />,
    "TOOLS AND ENVIRONMENTS": <Wrench className="w-5 h-5 text-[#34A853]" />,
  };

  return (
    <section id="skills" className="py-14 sm:py-20 border-t border-[#27344D] bg-[#0B1020]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4285F4]/15 text-[#22D3EE] text-xs font-mono font-medium mb-2 border border-[#4285F4]/20">
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
            Skills &amp; Technology Matrix
          </h2>
          <p className="text-sm text-[#AAB6CC] mt-1 max-w-2xl">
            Practical competencies developed through full-stack projects, internship tasks, and academic laboratory coursework.
          </p>
        </div>

        {/* 4 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillsMatrix.map((category, idx) => (
            <div
              key={idx}
              className="neon-border-card p-5 flex flex-col justify-between rounded-2xl bg-[#151F35] border border-[#27344D] hover:border-[#4285F4]/40 transition-all duration-200 shadow-md hover:shadow-blue-500/10 group"
              data-cursor="Skills"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#27344D]">
                  <div className="p-2 rounded-xl bg-[#10182B] border border-[#27344D] shrink-0">
                    {categoryIcons[category.title] || <Layers className="w-5 h-5 text-[#4285F4]" />}
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold tracking-wider text-[#F8FAFC] uppercase">
                      {category.title}
                    </h3>
                    <span className="text-[10px] text-[#AAB6CC] font-mono">
                      {category.skills.length} core items
                    </span>
                  </div>
                </div>

                {/* Skills Pill Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#10182B] hover:bg-[#4285F4]/15 text-[#F8FAFC] hover:text-[#22D3EE] border border-[#27344D] hover:border-[#4285F4]/30 transition-all duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-[#27344D] flex items-center justify-between text-[11px] font-mono text-[#AAB6CC]">
                <span className="flex items-center gap-1 text-[#34A853]">
                  <CheckCircle className="w-3 h-3" />
                  Verified in Code
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
