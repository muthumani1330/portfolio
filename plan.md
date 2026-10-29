# Premium Developer Portfolio - Step-by-Step Execution Roadmap

## Overview
This roadmap outlines the plan to build an ultra-premium, dark-mode first developer portfolio from scratch using Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

---

## Phase 1: Project Scaffolding & Dependencies (Terminal Agent)
1. **Bootstrap Next.js App**:
   - Initialize Next.js project with TypeScript, Tailwind CSS, ESLint, App Router (`--no-src-dir` to place `/app`, `/components`, `/hooks` at root), and `@/*` import alias.
2. **Install Core Libraries**:
   - `framer-motion` (fluid layout animations, gesture controls, scroll triggers).
   - `lucide-react` (modern minimalist iconography).
   - `canvas-confetti` (interactive contact success feedback) & `@types/canvas-confetti`.
   - `clsx` and `tailwind-merge` (for standard `cn` utility classes).
3. **Verify Dev Setup & Package Scripts**:
   - Validate clean compilation and dependency resolution.

---

## Phase 2: Design System & Theming Foundation (File Agent)
1. **Tailwind Config & CSS Variables**:
   - Configure obsidian dark theme palette (`#090a0f`, `#0d111c`, `#151c2e`).
   - Define neon accent variables: Indigo (`#6366f1`), Cyan (`#06b6d4`), Violet (`#8b5cf6`), Emerald (`#10b981`).
   - Setup glassmorphism utility classes (`glass-panel`, `glass-card`, `neon-glow`, `gradient-border`).
   - Define custom keyframe animations (floating particles, radial pulse, gradient shimmer).
2. **Utility Setup**:
   - Create `lib/utils.ts` with `cn()` helper function.
3. **Directory Structure**:
   - `/components/ui` (reusable UI primitives: Button, Badge, Modal, FloatingInput).
   - `/components/sections` (Hero, BentoGrid, ProjectsLedger, ContactSection, Navbar, Footer).
   - `/components/canvas` (ParticleBackground canvas).
   - `/hooks` (useScrollPosition, useMousePosition).
   - `/data` (portfolioData with projects, skills, metrics, and experience).

---

## Phase 3: Section-by-Section Implementation

### 1. Navigation & Ambient Background
- **Navbar**: Sticky floating glassmorphic nav bar with logo, smooth section links, dynamic blur effect on scroll, and live "Available for Hire" pulsing badge.
- **ParticleBackground**: Interactive high-performance Canvas component rendering ambient luminous drifting nodes with subtle cursor tethering.

### 2. Hero Section
- Minimalist high-impact layout with large bold typography and gradient text.
- Badges: Role definition ("Senior Full-Stack Engineer & Systems Architect"), status indicators.
- Quick action buttons: "View Work" with smooth scroll trigger to `#showcase`, "Get in Touch" jump to `#contact`, and quick resume/social links.

### 3. Bento Grid (Showcase)
- **Card 1: 'About Me' Bio**:
  - Personal narrative, engineering ethos, quick stats (years experience, production systems built, uptime focus).
- **Card 2: Interactive Skills Matrix**:
  - Categorized technical stack (Frontend, Backend, Cloud & DevOps, Architecture).
  - Hover-to-glow visual feedback with reactive neon highlight borders.
- **Card 3: Main Featured Project**:
  - Highlighting flagship product (e.g., "Aether Cloud Orchestrator" or "OmniPulse AI Engine").
  - Live interactive preview modal with expanded architecture view, performance metrics, and repository links.
- **Card 4: GitHub Metrics & Contribution Graphic**:
  - Simulated interactive 52-week activity heatmap with hover tooltips for daily commit data.
  - Live stats: Total commits, pull requests, current streak, and repository counts.

### 4. Projects Ledger
- Filterable archive table/ledger for secondary projects (Filters: All, Full-Stack, AI / Data, DevTools, Systems).
- Columns: Year, Project Name, Category, Tech Stack Badges, Description, Source Code link, Demo link.
- Hover highlight rows and interactive quick-preview drawer.

### 5. Contact Section
- Floating-label interactive input components for Name, Email, Subject, and Message.
- Smooth focus states, input validation, and interactive celebration on submit (confetti effect & confirmation state).
- Direct "Copy Email" pill with clipboard notification, location badge, and social channels.

### 6. Polished Footer
- Brand signature, status ping, back-to-top smooth scroll button, and copyright.

---

## Phase 4: Verification & Quality Assurance (Browser Agent)
1. **Build & Lint Verification**: Run type-check and Next.js build to confirm zero TypeScript or bundling errors.
2. **Dev Server Launch**: Start local development server on port 3000.
3. **Responsive Visual Testing**:
   - Desktop viewport (1440px): Verify bento grid alignment, particle canvas framerate, modal triggers, hover-to-glow effects.
   - Tablet / Mobile viewports (768px, 390px): Verify responsive collapse, mobile navigation menu, touch friendly inputs, readable typography.
4. **Interactive Feature Validation**:
   - Test "View Work" scroll anchor.
   - Test Bento featured project preview modal open/close.
   - Test Projects Ledger category filters.
   - Test Contact form floating labels, validation, and submission flow.
