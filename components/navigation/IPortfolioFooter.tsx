"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function IPortfolioFooter() {
  const { personal } = PORTFOLIO_DATA;
  const currentYear = 2026;

  return (
    <footer id="footer" className="py-8 px-6 sm:px-10 border-t border-[var(--border-color)] bg-[var(--surface-color)] text-center text-xs text-[var(--text-secondary)] font-mono">
      <div className="max-w-6xl mx-auto space-y-1.5">
        <p>
          &copy; {currentYear}{" "}
          <strong className="text-[var(--heading-color)]">{personal.name}</strong>. All Rights Reserved.
        </p>
        <p className="text-[11px] text-slate-400">
          Crafted with Next.js &amp; Tailwind CSS &bull; Inspired by iPortfolio Template
        </p>
      </div>
    </footer>
  );
}

