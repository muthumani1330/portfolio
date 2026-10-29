"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  Search,
  ChevronDown,
  Layers,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

export function ProjectsLedger() {
  const { ledgerProjects } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ["All", "Full-Stack", "AI / Systems", "DevTools", "Cloud"];

  const filteredProjects = useMemo(() => {
    return ledgerProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [ledgerProjects, selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="ledger" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>ARCHIVE &amp; REPOSITORIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Projects Ledger
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base font-light max-w-xl">
            A comprehensive, filterable index of specialized tools, systems, libraries, and experimental architectures.
          </p>
        </div>

        {/* Search & Counter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or keyword..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 text-xs rounded-xl bg-white/[0.03] border border-white/10 focus:border-indigo-500 text-white placeholder-slate-500 focus:outline-none transition-all"
            />
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-400 flex items-center justify-between sm:justify-start gap-2">
            <span>Showing:</span>
            <span className="font-bold text-white">{filteredProjects.length}</span>
            <span className="text-slate-600">/</span>
            <span>{ledgerProjects.length}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all shrink-0 cursor-pointer",
              selectedCategory === cat
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ledger Table / List */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/5">
        {/* Table Header (Desktop) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-white/[0.02]">
          <div className="col-span-1">Year</div>
          <div className="col-span-4">Project &amp; Summary</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-3">Built With</div>
          <div className="col-span-2 text-right">Links</div>
        </div>

        {/* Project Rows */}
        <AnimatePresence initial={false}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => {
              const isExpanded = expandedId === project.id;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  className={cn(
                    "group transition-all duration-200",
                    isExpanded ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                  )}
                >
                  <div
                    onClick={() => toggleExpand(project.id)}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-5 sm:px-6 py-4.5 items-center cursor-pointer"
                  >
                    {/* Year */}
                    <div className="col-span-1 flex items-center justify-between md:justify-start">
                      <span className="text-xs font-mono text-slate-400 group-hover:text-indigo-400 transition-colors">
                        {project.year}
                      </span>
                      <span className="md:hidden text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
                        {project.category}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div className="col-span-4">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {project.title}
                        </h4>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-slate-500 transition-transform duration-200",
                            isExpanded ? "rotate-180 text-indigo-400" : ""
                          )}
                        />
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Category (Desktop) */}
                    <div className="hidden md:block col-span-2">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-slate-300">
                        {project.category}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="col-span-3 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[10px] font-mono text-slate-500 self-center">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions Links */}
                    <div
                      className="col-span-2 flex items-center justify-end gap-2 pt-2 md:pt-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="View Source on GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-white/10 transition-colors"
                        title="Launch Demo App"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Expanded Detail Accordion */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 sm:px-6 pb-5 pt-1 border-t border-white/5 bg-black/20"
                      >
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <div className="flex flex-wrap gap-2">
                              {project.metrics?.map((metric, i) => (
                                <span
                                  key={i}
                                  className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                >
                                  {metric}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-3">
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 hover:underline"
                              >
                                <span>git clone {project.title.toLowerCase().replace(/\s+/g, "-")}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="py-16 text-center text-slate-400 font-mono text-sm">
              No repositories match the current filter &ldquo;{searchQuery || selectedCategory}&rdquo;.
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
