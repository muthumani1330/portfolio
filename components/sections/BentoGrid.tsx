// @ts-nocheck
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Terminal,
  ExternalLink,
  Maximize2,
  Sparkles,
  GitCommit,
  GitPullRequest,
  Flame,
  Layers,
  Database,
  Cloud,
  Cpu,
  Server,
  Palette,
  Container,
  Workflow,
  Boxes,
  FileCode2,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { cn } from "@/lib/utils";

// Icon mapping helper
const ICON_MAP: Record<string, React.ReactNode> = {
  FileCode2: <FileCode2 className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Server: <Server className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  Container: <Container className="w-4 h-4" />,
  Cloud: <Cloud className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Workflow: <Workflow className="w-4 h-4" />,
  Boxes: <Boxes className="w-4 h-4" />,
  Terminal: <Terminal className="w-4 h-4" />,
};

export function BentoGrid() {
  const { personal, skills, featuredProject, githubMetrics } = PORTFOLIO_DATA;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("All");
  const [hoveredCommitDay, setHoveredCommitDay] = useState<{
    date: string;
    count: number;
  } | null>(null);

  const categories = ["All", "Frontend", "Backend", "Cloud", "Data", "Languages"];

  const filteredSkills =
    selectedSkillCategory === "All"
      ? skills
      : skills.filter((s) => s.category.toLowerCase().includes(selectedSkillCategory.toLowerCase()) || (selectedSkillCategory === "Cloud" && s.category === "DevOps"));

  return (
    <section id="showcase" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>PORTFOLIO SHOWCASE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineered for Performance.
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl font-light">
          A panoramic view into my engineering ethos, core technical stack, flagship cloud architecture, and open-source momentum.
        </p>
      </div>

      {/* Modern Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* ========================================================= */}
        {/* CARD 1: Short 'About Me' Bio Text (5 Cols on Desktop)     */}
        {/* ========================================================= */}
        <motion.div
          id="about"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 relative overflow-hidden group"
        >
          {/* Subtle Corner Ambient Glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/20 transition-all duration-500" />

          <div>
            {/* Header Badge */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                01 // ABOUT ME
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Engineering Ethos
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
              Designing systems that withstand scale &amp; complexity.
            </h3>

            <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
              <p>{personal.bio[0]}</p>
              <p>{personal.bio[1]}</p>
            </div>
          </div>

          {/* Quick Metrics Matrix */}
          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
            {personal.stats.map((stat, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center flex flex-col justify-center"
              >
                <div className="text-lg sm:text-xl font-extrabold text-white font-mono tracking-tight text-gradient-primary">
                  {stat.value}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* CARD 2: Interactive Grid List of Technical Skills (7 Cols) */}
        {/* ========================================================= */}
        <motion.div
          id="skills"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 relative overflow-hidden group"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-10 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-all duration-500" />

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                02 // TECHNICAL MATRIX
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Hover to trigger glow aura
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Full-Stack &amp; Systems Capabilities
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedSkillCategory(cat)}
                  className={cn(
                    "px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all",
                    selectedSkillCategory === cat
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Interactive Grid List with Hover-to-Glow Animations */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {filteredSkills.map((skill) => {
                const isHovered = hoveredSkill === skill.name;
                return (
                  <div
                    key={skill.name}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={cn(
                      "relative p-3 rounded-xl border transition-all duration-300 cursor-default flex flex-col justify-between",
                      isHovered
                        ? "bg-white/[0.08] border-indigo-400/80 shadow-[0_0_20px_rgba(99,102,241,0.35)] -translate-y-1 scale-[1.02]"
                        : "bg-white/[0.02] border-white/5 hover:border-white/20"
                    )}
                  >
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <div
                        className={cn(
                          "p-1.5 rounded-lg transition-colors",
                          isHovered ? "bg-indigo-500/20 text-indigo-300" : "bg-white/5 text-slate-400"
                        )}
                      >
                        {(skill.icon && ICON_MAP[skill.icon]) || <Code2 className="w-4 h-4" />}
                      </div>
                      <span
                        className={cn(
                          "text-[9px] font-mono uppercase px-1.5 py-0.5 rounded transition-colors",
                          isHovered
                            ? "bg-indigo-500/20 text-indigo-300"
                            : "bg-white/5 text-slate-400"
                        )}
                      >
                        {skill.level}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                        {skill.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {skill.category}
                      </div>
                    </div>

                    {/* Interactive glowing bottom underline */}
                    <div
                      className={cn(
                        "h-[2px] w-full mt-2 rounded-full transition-all duration-300",
                        isHovered
                          ? "bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 opacity-100"
                          : "bg-white/5 opacity-40"
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* CARD 3: Main Featured Software Project (7 Cols)           */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 relative overflow-hidden group"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-600/15 rounded-full blur-3xl -z-10 group-hover:bg-indigo-600/25 transition-all duration-500" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                03 // FLAGSHIP PROJECT
              </span>
              <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live in Production
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 group-hover:text-indigo-200 transition-colors">
              {featuredProject.title}
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
              {featuredProject.description}
            </p>

            {/* Architecture Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
              {featuredProject.metrics.map((m, i) => (
                <div
                  key={i}
                  className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-mono text-slate-200">
                    {m}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {featuredProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            {/* Expandable Preview Trigger */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand Architecture Preview</span>
            </button>

            <div className="flex items-center gap-2">
              <a
                href={featuredProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-pill text-slate-300 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
                aria-label="View Source on GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={featuredProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-pill text-slate-300 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
                aria-label="Launch Live App"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* CARD 4: GitHub Metrics & Contribution Graphic (5 Cols)    */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 relative overflow-hidden group"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl -z-10 group-hover:bg-emerald-500/20 transition-all duration-500" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                04 // OPEN SOURCE MOMENTUM
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <GithubIcon className="w-3.5 h-3.5 text-white" />
                <span>@muthumani</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
              GitHub Metrics &amp; Contribution Graphic
            </h3>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-mono mb-0.5">
                  <GitCommit className="w-3 h-3 text-indigo-400" />
                  <span>Commits</span>
                </div>
                <span className="text-sm font-bold text-white font-mono">
                  {githubMetrics.totalContributions}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-mono mb-0.5">
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>Streak</span>
                </div>
                <span className="text-sm font-bold text-white font-mono">
                  {githubMetrics.currentStreak}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-mono mb-0.5">
                  <GitPullRequest className="w-3 h-3 text-cyan-400" />
                  <span>PRs</span>
                </div>
                <span className="text-sm font-bold text-white font-mono">
                  {githubMetrics.pullRequestsMerged}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-mono mb-0.5">
                  <Code2 className="w-3 h-3 text-purple-400" />
                  <span>Repos</span>
                </div>
                <span className="text-sm font-bold text-white font-mono">
                  {githubMetrics.publicRepos}
                </span>
              </div>
            </div>

            {/* Simulated 52-week Contribution Graph */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 overflow-x-auto">
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-2">
                <span>Past 52 Weeks Activity</span>
                <span>
                  {hoveredCommitDay
                    ? `${hoveredCommitDay.count} commits on ${hoveredCommitDay.date}`
                    : "Hover cell to inspect"}
                </span>
              </div>

              <div className="flex gap-[3px] min-w-[340px] justify-between">
                {githubMetrics.weeks.map((week) => (
                  <div key={week.weekNumber} className="flex flex-col gap-[3px]">
                    {week.days.map((day) => {
                      // Level colors (Dark theme emerald & indigo scale)
                      let bgClass = "bg-white/[0.04]";
                      if (day.level === 1) bgClass = "bg-indigo-950/80 border border-indigo-800/40";
                      if (day.level === 2) bgClass = "bg-indigo-700/80";
                      if (day.level === 3) bgClass = "bg-indigo-500";
                      if (day.level === 4) bgClass = "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]";

                      return (
                        <div
                          key={day.date}
                          onMouseEnter={() =>
                            setHoveredCommitDay({
                              date: day.date,
                              count: day.count,
                            })
                          }
                          onMouseLeave={() => setHoveredCommitDay(null)}
                          className={cn(
                            "w-[6px] h-[6px] rounded-[1.5px] transition-transform duration-150 hover:scale-150 cursor-pointer",
                            bgClass
                          )}
                          title={`${day.count} commits on ${day.date}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-1.5 text-[9px] text-slate-500 font-mono mt-2.5">
                <span>Less</span>
                <span className="w-2 h-2 rounded-[1px] bg-white/[0.04]" />
                <span className="w-2 h-2 rounded-[1px] bg-indigo-950/80" />
                <span className="w-2 h-2 rounded-[1px] bg-indigo-700/80" />
                <span className="w-2 h-2 rounded-[1px] bg-indigo-500" />
                <span className="w-2 h-2 rounded-[1px] bg-emerald-400" />
                <span>More</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CI/CD Pipeline: Passing</span>
            </span>
            <a
              href={personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hover:underline"
            >
              <span>View Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Expandable Project Preview Modal */}
      <ProjectModal
        project={featuredProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
