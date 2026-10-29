"use client";

import React, { useEffect, useRef } from "react";

export function HeroNameEnergyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let animationFrameId: number;
    let totalTime = 0;

    // Mouse parallax tracking
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.targetX = ((clientX / rect.width) - 0.5) * 32;
      mouse.targetY = ((clientY / rect.height) - 0.5) * 24;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle canvas dimensions with device pixel ratio
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    handleResize();

    // Floating Stardust Particles (Chrome blue, cyan, violet palette)
    const particleCount = 48;
    interface Particle {
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulsePhase: number;
      vx: number;
      vy: number;
      color: string;
    }

    const colors = [
      "rgba(66, 133, 244,",  // Electric Blue
      "rgba(34, 211, 238,",  // Cyan
      "rgba(139, 92, 246,",  // Violet
      "rgba(248, 250, 252,", // Pure White
      "rgba(192, 132, 252,", // Lavender
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || 600),
        y: Math.random() * (height || 500),
        radius: Math.random() * 1.6 + 0.8,
        baseAlpha: Math.random() * 0.45 + 0.25,
        pulseSpeed: Math.random() * 1.8 + 0.8,
        pulsePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.35 - 0.1, // slow upward drift
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Concentric & Tilted Orbital Rings
    interface OrbitRing {
      radiusX: number;
      radiusY: number;
      tilt: number; // in radians
      speed: number;
      dashOffset: number;
      colorStart: string;
      colorEnd: string;
      beadAngle: number;
      beadSpeed: number;
    }

    const orbits: OrbitRing[] = [
      {
        radiusX: 190,
        radiusY: 75,
        tilt: -0.28,
        speed: 0.0016,
        dashOffset: 0,
        colorStart: "rgba(66, 133, 244, 0.35)",
        colorEnd: "rgba(34, 211, 238, 0.15)",
        beadAngle: 0,
        beadSpeed: 0.009,
      },
      {
        radiusX: 260,
        radiusY: 105,
        tilt: 0.38,
        speed: -0.0012,
        dashOffset: 0,
        colorStart: "rgba(139, 92, 246, 0.32)",
        colorEnd: "rgba(66, 133, 244, 0.12)",
        beadAngle: Math.PI * 0.6,
        beadSpeed: -0.007,
      },
      {
        radiusX: 330,
        radiusY: 130,
        tilt: -0.12,
        speed: 0.0009,
        dashOffset: 0,
        colorStart: "rgba(34, 211, 238, 0.28)",
        colorEnd: "rgba(139, 92, 246, 0.1)",
        beadAngle: Math.PI * 1.3,
        beadSpeed: 0.005,
      },
    ];

    // Main Render Loop
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      totalTime += delta;

      // Smooth mouse parallax interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Primary Energy Focus Point (situated right behind "Hi, I'm Muthumani P")
      // Approximately 42% from left, 26% from top of the left hero column
      const focusX = width * 0.42 + mouse.x;
      const focusY = height * 0.28 + mouse.y;

      // 1. Soft Luminous Blue-Violet Energy Field (Breathing Core)
      const breath = 1.0 + Math.sin(totalTime * 1.4) * 0.08;
      const coreRadius = Math.min(width * 0.48, 280) * breath;

      const grad = ctx.createRadialGradient(
        focusX,
        focusY,
        0,
        focusX,
        focusY,
        coreRadius
      );
      grad.addColorStop(0.0, "rgba(66, 133, 244, 0.28)");  // Vibrant Chrome Blue center
      grad.addColorStop(0.25, "rgba(34, 211, 238, 0.18)"); // Electric Cyan aura
      grad.addColorStop(0.6, "rgba(139, 92, 246, 0.12)");  // Soft Violet halo
      grad.addColorStop(0.85, "rgba(16, 24, 43, 0.05)");   // Midnight blend
      grad.addColorStop(1.0, "rgba(16, 24, 43, 0.0)");     // Fade to transparent

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(focusX, focusY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Secondary Soft Cyan Highlight beneath the Name
      const nameHighlightX = focusX + 20;
      const nameHighlightY = focusY + 30;
      const nameHighlightRadius = 160 * breath;
      const highlightGrad = ctx.createRadialGradient(
        nameHighlightX,
        nameHighlightY,
        0,
        nameHighlightX,
        nameHighlightY,
        nameHighlightRadius
      );
      highlightGrad.addColorStop(0.0, "rgba(34, 211, 238, 0.16)");
      highlightGrad.addColorStop(0.5, "rgba(66, 133, 244, 0.08)");
      highlightGrad.addColorStop(1.0, "rgba(16, 24, 43, 0.0)");

      ctx.fillStyle = highlightGrad;
      ctx.beginPath();
      ctx.arc(nameHighlightX, nameHighlightY, nameHighlightRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Render Fine Curved Orbital Lines & Energy Trails
      orbits.forEach((orbit, index) => {
        if (!prefersReducedMotion) {
          orbit.dashOffset += orbit.speed;
          orbit.beadAngle += orbit.beadSpeed;
        }

        ctx.save();
        ctx.translate(focusX, focusY);
        ctx.rotate(orbit.tilt + (index % 2 === 0 ? totalTime * 0.02 : -totalTime * 0.015));

        // Create elegant gradient along the ellipse
        const lineGrad = ctx.createLinearGradient(
          -orbit.radiusX,
          -orbit.radiusY,
          orbit.radiusX,
          orbit.radiusY
        );
        lineGrad.addColorStop(0.0, orbit.colorStart);
        lineGrad.addColorStop(0.5, "rgba(248, 250, 252, 0.2)");
        lineGrad.addColorStop(1.0, orbit.colorEnd);

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([14, 22]);
        ctx.lineDashOffset = orbit.dashOffset * 100;

        ctx.beginPath();
        ctx.ellipse(0, 0, orbit.radiusX, orbit.radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();

        // 3. Glowing Orbital Energy Bead / Comet Light Trail
        const beadX = Math.cos(orbit.beadAngle) * orbit.radiusX;
        const beadY = Math.sin(orbit.beadAngle) * orbit.radiusY;

        // Bead Comet Head
        const beadGlow = ctx.createRadialGradient(beadX, beadY, 0, beadX, beadY, 12);
        beadGlow.addColorStop(0.0, "rgba(255, 255, 255, 0.95)");
        beadGlow.addColorStop(0.3, "rgba(34, 211, 238, 0.7)");
        beadGlow.addColorStop(0.7, "rgba(66, 133, 244, 0.25)");
        beadGlow.addColorStop(1.0, "rgba(66, 133, 244, 0.0)");

        ctx.fillStyle = beadGlow;
        ctx.beginPath();
        ctx.arc(beadX, beadY, 12, 0, Math.PI * 2);
        ctx.fill();

        // Bead core point
        ctx.fillStyle = "#F8FAFC";
        ctx.beginPath();
        ctx.arc(beadX, beadY, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // 4. Render Floating Micro-Particles & Twinkling Stars
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.y += p.vy;
          p.x += p.vx + Math.sin(totalTime * 1.5 + p.pulsePhase) * 0.15;

          // Wrap around viewport edges
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        // Twinkle pulse effect
        const pulse = Math.sin(totalTime * p.pulseSpeed + p.pulsePhase);
        const currentAlpha = Math.max(0.1, p.baseAlpha + pulse * 0.2);

        // Particle parallax offset
        const px = p.x + mouse.x * 0.4;
        const py = p.y + mouse.y * 0.4;

        ctx.fillStyle = `${p.color} ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra twinkle bloom for brighter stars
        if (p.radius > 1.8 && currentAlpha > 0.4) {
          const glow = ctx.createRadialGradient(px, py, 0, px, py, p.radius * 3.5);
          glow.addColorStop(0.0, `${p.color} 0.4)`);
          glow.addColorStop(1.0, `${p.color} 0.0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, py, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute -inset-6 sm:-inset-10 w-[calc(100%+3rem)] sm:w-[calc(100%+5rem)] h-[calc(100%+3rem)] sm:h-[calc(100%+5rem)] pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

