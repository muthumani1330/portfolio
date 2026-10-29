"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Sparkles, ArrowRight, Play } from "lucide-react";

interface Cinematic3DIntroProps {
  onComplete: () => void;
  forcePlay?: boolean;
}

export function Cinematic3DIntro({ onComplete, forcePlay = false }: Cinematic3DIntroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [sceneStage, setSceneStage] = useState<1 | 2 | 3 | 4>(() => {
    if (typeof window !== "undefined") {
      if (window.location.search.includes("stage=3")) return 3;
      if (window.location.search.includes("stage=2")) return 2;
    }
    return 1;
  });
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  // Skip handler
  const handleSkip = useCallback(() => {
    if (typeof window !== "undefined" && window.location.search.includes("stage=")) {
      return; // Freeze for screenshot verification in stage mode
    }
    if (isSkipped) return;
    setIsSkipped(true);
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 450);
  }, [isSkipped, onComplete]);

  // Keyboard accessibility: ESC or Space skips intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  // Lock body scroll while intro is playing
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // WebGL 3D Cinematic Galaxy Animation
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion && !window.location.search.includes("stage=")) {
      // Fast fallback for users with reduced motion
      const timer = setTimeout(() => {
        handleSkip();
      }, 1200);
      return () => clearTimeout(timer);
    }

    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setHasWebGL(false);
      if (!window.location.search.includes("stage=")) {
        const fallbackTimer = setTimeout(() => {
          handleSkip();
        }, 3500);
        return () => clearTimeout(fallbackTimer);
      }
      return;
    }

    // 1. Scene, Camera, & High-Performance WebGL Renderer
    const scene = new THREE.Scene();

    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 100);
    // Initial camera position for Scene 1 (deep space)
    camera.position.set(0, 1.8, 12.0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;

    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "10";

    container.appendChild(renderer.domElement);

    // 2. Procedural Smooth Circular Star Particle Texture
    const createStarSprite = () => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext("2d");
      if (!ctx) return null;

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
      grad.addColorStop(0.2, "rgba(240, 249, 255, 0.9)");
      grad.addColorStop(0.45, "rgba(66, 133, 244, 0.5)");
      grad.addColorStop(0.7, "rgba(139, 92, 246, 0.18)");
      grad.addColorStop(1.0, "rgba(11, 16, 32, 0.0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      const tex = new THREE.CanvasTexture(c);
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      return tex;
    };

    const starTexture = createStarSprite();

    // 3. Background Ambient Starfield (Scene 1 Awakening)
    const isMobile = width < 768;
    const bgStarCount = isMobile ? 1200 : 2500;
    const bgStarPositions = new Float32Array(bgStarCount * 3);
    const bgStarColors = new Float32Array(bgStarCount * 3);

    const palette = [
      new THREE.Color("#F8FAFC"),
      new THREE.Color("#22D3EE"),
      new THREE.Color("#4285F4"),
      new THREE.Color("#8B5CF6"),
      new THREE.Color("#C084FC"),
    ];

    for (let i = 0; i < bgStarCount; i++) {
      const i3 = i * 3;
      bgStarPositions[i3] = (Math.random() - 0.5) * 45;
      bgStarPositions[i3 + 1] = (Math.random() - 0.5) * 30;
      bgStarPositions[i3 + 2] = -Math.random() * 35; // deep behind

      const c = palette[Math.floor(Math.random() * palette.length)];
      bgStarColors[i3] = c.r;
      bgStarColors[i3 + 1] = c.g;
      bgStarColors[i3 + 2] = c.b;
    }

    const bgStarGeom = new THREE.BufferGeometry();
    bgStarGeom.setAttribute("position", new THREE.BufferAttribute(bgStarPositions, 3));
    bgStarGeom.setAttribute("color", new THREE.BufferAttribute(bgStarColors, 3));

    const bgStarMat = new THREE.PointsMaterial({
      size: isMobile ? 0.12 : 0.09,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      opacity: 0.0, // fades in during Scene 1
      map: starTexture || undefined,
    });

    const bgStars = new THREE.Points(bgStarGeom, bgStarMat);
    scene.add(bgStars);

    // 4. Forming 3D Spiral Galaxy Particles (Scene 2)
    const galaxyParticleCount = isMobile ? 6500 : 13000;
    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    galaxyGroup.rotation.x = 0.85;
    galaxyGroup.rotation.z = -0.15;

    const currentPositions = new Float32Array(galaxyParticleCount * 3);
    const targetPositions = new Float32Array(galaxyParticleCount * 3);
    const initialPositions = new Float32Array(galaxyParticleCount * 3);
    const particleColors = new Float32Array(galaxyParticleCount * 3);

    const cWhite = new THREE.Color("#FFFFFF");
    const cCyan = new THREE.Color("#22D3EE");
    const cBlue = new THREE.Color("#4285F4");
    const cViolet = new THREE.Color("#8B5CF6");
    const cOuterViolet = new THREE.Color("#6D28D9");

    const branches = 4;
    const maxRadius = 7.5;

    for (let i = 0; i < galaxyParticleCount; i++) {
      const i3 = i * 3;

      // Target Spiral Coordinates
      const r = Math.pow(Math.random(), 2.1) * maxRadius;
      const branchAngle = ((i % branches) * (2 * Math.PI)) / branches;
      const spinAngle = r * 1.25;
      const angle = branchAngle + spinAngle;

      const spread = 0.35 * (0.2 + (r / maxRadius) * 0.35);
      const randX = (Math.random() - 0.5) * spread;
      const randY = (Math.random() - 0.5) * (0.15 + (r / maxRadius) * 0.25);
      const randZ = (Math.random() - 0.5) * spread;

      targetPositions[i3] = Math.cos(angle) * r + randX;
      targetPositions[i3 + 1] = randY;
      targetPositions[i3 + 2] = Math.sin(angle) * r + randZ;

      // Initial Dispersed Coordinates in Deep Space (Before Inward Gravity Vortex)
      const initR = r * 2.8 + (Math.random() - 0.5) * 5.0 + 3.0;
      const initAngle = angle - 2.2 + (Math.random() - 0.5) * 1.5;
      initialPositions[i3] = Math.cos(initAngle) * initR;
      initialPositions[i3 + 1] = (Math.random() - 0.5) * 4.0;
      initialPositions[i3 + 2] = Math.sin(initAngle) * initR;

      // Start at initial positions
      currentPositions[i3] = initialPositions[i3];
      currentPositions[i3 + 1] = initialPositions[i3 + 1];
      currentPositions[i3 + 2] = initialPositions[i3 + 2];

      // Particle Color based on radius from core
      const normR = r / maxRadius;
      const color = cWhite.clone();
      if (normR < 0.15) {
        color.lerp(cCyan, normR / 0.15);
      } else if (normR < 0.5) {
        color.lerp(cCyan, 1.0).lerp(cBlue, (normR - 0.15) / 0.35);
      } else if (normR < 0.8) {
        color.lerp(cBlue, 1.0).lerp(cViolet, (normR - 0.5) / 0.3);
      } else {
        color.lerp(cViolet, 1.0).lerp(cOuterViolet, (normR - 0.8) / 0.2);
      }

      particleColors[i3] = color.r;
      particleColors[i3 + 1] = color.g;
      particleColors[i3 + 2] = color.b;
    }

    const galaxyGeom = new THREE.BufferGeometry();
    galaxyGeom.setAttribute("position", new THREE.BufferAttribute(currentPositions, 3));
    galaxyGeom.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const galaxyMat = new THREE.PointsMaterial({
      size: isMobile ? 0.12 : 0.095,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      opacity: 0.0,
      map: starTexture || undefined,
    });

    const galaxyPoints = new THREE.Points(galaxyGeom, galaxyMat);
    galaxyGroup.add(galaxyPoints);

    // 5. Central Luminous Nucleus / Core Volumetric Glow (Soft Radial Sprite)
    const createCoreGlowTexture = () => {
      const c = document.createElement("canvas");
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext("2d");
      if (!ctx) return null;

      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
      grad.addColorStop(0.18, "rgba(34, 211, 238, 0.85)");
      grad.addColorStop(0.45, "rgba(66, 133, 244, 0.45)");
      grad.addColorStop(0.7, "rgba(139, 92, 246, 0.18)");
      grad.addColorStop(1.0, "rgba(11, 16, 32, 0.0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);

      const tex = new THREE.CanvasTexture(c);
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      return tex;
    };

    const coreGlowTexture = createCoreGlowTexture();
    const coreMat = new THREE.SpriteMaterial({
      map: coreGlowTexture || undefined,
      color: new THREE.Color("#22D3EE"),
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const coreSprite = new THREE.Sprite(coreMat);
    coreSprite.scale.set(4.8, 4.8, 1.0);
    galaxyGroup.add(coreSprite);

    // 6. Animation Timeline Orchestration (~5.2s total)
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Support debug inspection via query param ?stage=2 or ?stage=3
      const isDebugStage3 = typeof window !== "undefined" && window.location.search.includes("stage=3");
      const isDebugStage2 = typeof window !== "undefined" && window.location.search.includes("stage=2");
      const realElapsed = (currentTime - startTime) / 1000;
      const elapsed = isDebugStage3 ? 3.8 : isDebugStage2 ? 2.4 : realElapsed;

      // Scene 1: Deep Space Awakening (0.0s – 1.4s)
      if (elapsed < 1.4) {
        setSceneStage(1);
        const p1 = Math.min(elapsed / 1.4, 1.0);
        // Starfield gradually emerges
        bgStarMat.opacity = p1 * 0.85;
        // Camera glides smoothly forward through deep space
        camera.position.z = 12.0 - p1 * 2.5; // 12 -> 9.5
        camera.position.y = 1.8 - p1 * 0.4;
      }
      // Scene 2: Galaxy Formation Vortex (1.4s – 3.3s)
      else if (elapsed >= 1.4 && elapsed < 3.3) {
        setSceneStage(2);
        const p2 = Math.min((elapsed - 1.4) / 1.9, 1.0);
        // Smooth cubic ease for gravitational inward pull
        const ease = 1 - Math.pow(1 - p2, 3);

        galaxyMat.opacity = Math.min(p2 * 1.2, 0.95);
        coreMat.opacity = p2 * 0.7;

        // Inward vortex motion of 13,000 particles
        const posAttr = galaxyGeom.attributes.position;
        const posArr = posAttr.array as Float32Array;

        for (let i = 0; i < galaxyParticleCount; i++) {
          const i3 = i * 3;
          posArr[i3] = initialPositions[i3] + (targetPositions[i3] - initialPositions[i3]) * ease;
          posArr[i3 + 1] = initialPositions[i3 + 1] + (targetPositions[i3 + 1] - initialPositions[i3 + 1]) * ease;
          posArr[i3 + 2] = initialPositions[i3 + 2] + (targetPositions[i3 + 2] - initialPositions[i3 + 2]) * ease;
        }
        posAttr.needsUpdate = true;

        // Camera settles into cinematic framing
        camera.position.z = 9.5 - ease * 1.8; // 9.5 -> 7.7
        camera.position.y = 1.4 - ease * 0.4; // 1.4 -> 1.0

        // Rotation acceleration
        galaxyGroup.rotation.y += 0.015 * ease;
      }
      // Scene 3: Identity Reveal (3.3s – 4.7s)
      else if (elapsed >= 3.3 && elapsed < 4.7) {
        setSceneStage(3);
        const p3 = Math.min((elapsed - 3.3) / 1.4, 1.0);

        galaxyMat.opacity = 0.95;
        bgStarMat.opacity = 0.85;

        // Ensure particles are fully in target spiral formation
        const posAttr = galaxyGeom.attributes.position;
        const posArr = posAttr.array as Float32Array;
        for (let i = 0; i < galaxyParticleCount; i++) {
          const i3 = i * 3;
          posArr[i3] = targetPositions[i3];
          posArr[i3 + 1] = targetPositions[i3 + 1];
          posArr[i3 + 2] = targetPositions[i3 + 2];
        }
        posAttr.needsUpdate = true;

        // Core gathers into luminous focal point
        const pulse = 1.0 + Math.sin(p3 * Math.PI) * 0.15;
        coreSprite.scale.set(4.8 * pulse, 4.8 * pulse, 1.0);
        coreMat.opacity = 0.65 + Math.sin(p3 * Math.PI) * 0.15;

        camera.position.z = 7.7;
        camera.position.y = 1.0;
        galaxyGroup.rotation.y += 0.012;
      }
      // Scene 4: Celestial Dissolve & Smooth Reveal (4.7s – 5.5s)
      else if (elapsed >= 4.7 && elapsed < 5.5) {
        setSceneStage(4);
        const p4 = Math.min((elapsed - 4.7) / 0.8, 1.0);

        // Particle warp expansion
        const posAttr = galaxyGeom.attributes.position;
        const posArr = posAttr.array as Float32Array;

        for (let i = 0; i < galaxyParticleCount; i++) {
          const i3 = i * 3;
          posArr[i3] *= 1.0 + p4 * 0.018;
          posArr[i3 + 2] *= 1.0 + p4 * 0.018;
        }
        posAttr.needsUpdate = true;

        // Fade out 3D canvas
        galaxyMat.opacity = (1 - p4) * 0.95;
        bgStarMat.opacity = (1 - p4) * 0.85;
        coreMat.opacity = (1 - p4) * 0.65;

        // Start HTML overlay fadeout at 4.9s
        if (elapsed > 4.9 && !isFadingOut) {
          setIsFadingOut(true);
        }
      }
      // Intro Complete (>= 5.5s)
      else if (elapsed >= 5.5 && !isDebugStage3 && !isDebugStage2) {
        handleSkip();
        return;
      }

      // Continuous subtle galactic drift
      galaxyGroup.rotation.y += 0.006;
      bgStars.rotation.y += 0.0008;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on Component Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      bgStarGeom.dispose();
      bgStarMat.dispose();
      galaxyGeom.dispose();
      galaxyMat.dispose();
      coreMat.dispose();
      if (coreGlowTexture) coreGlowTexture.dispose();
      if (starTexture) starTexture.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [handleSkip, isFadingOut]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-[#0B1020] transition-opacity duration-700 ease-out select-none ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-live="polite"
    >
      {/* 1. Cinematic Ambient Backlight Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#4285F4]/20 via-[#22D3EE]/15 to-[#8B5CF6]/20 blur-[140px] pointer-events-none" />

      {/* 2. Top-Right Skip Intro Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          type="button"
          onClick={handleSkip}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151F35]/75 hover:bg-[#151F35] backdrop-blur-md border border-[#27344D] hover:border-[#4285F4]/70 text-[#AAB6CC] hover:text-[#F8FAFC] text-xs font-mono transition-all duration-200 shadow-lg hover:shadow-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
          aria-label="Skip Intro Animation and enter portfolio"
          title="Skip Intro (Press Escape)"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#22D3EE] group-hover:translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline-block ml-1 text-[10px] px-1.5 py-0.5 rounded bg-[#10182B] text-[#AAB6CC]/80 border border-[#27344D]">
            ESC
          </span>
        </button>
      </div>

      {/* 3. Subtle Progress / Scene Indicator (Bottom Left) */}
      <div className="absolute bottom-6 left-6 z-40 hidden sm:flex items-center gap-3 text-[11px] font-mono text-[#AAB6CC]/70 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
          <span className="text-[#22D3EE] font-medium">3D CINEMATIC INTRO</span>
        </div>
        <span>•</span>
        <span>
          {sceneStage === 1 && "Deep Space Awakening"}
          {sceneStage === 2 && "Galaxy Formation"}
          {sceneStage === 3 && "Identity Reveal"}
          {sceneStage === 4 && "Entering Dashboard"}
        </span>
      </div>

      {/* 4. Scene 3 Identity Typography Reveal */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 px-4 transition-all duration-700 ease-out ${
          sceneStage === 3
            ? "opacity-100 scale-100 translate-y-0"
            : sceneStage === 4
            ? "opacity-0 scale-105 -translate-y-4"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="text-center max-w-xl mx-auto flex flex-col items-center">
          {/* Eyebrow / Focus */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10182B]/80 backdrop-blur-md border border-[#27344D] text-[#22D3EE] text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Digital Architecture</span>
          </div>

          {/* Main Candidate Name */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[0.18em] sm:tracking-[0.24em] text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#E0F2FE] to-[#93C5FD] leading-none mb-3 drop-shadow-[0_0_35px_rgba(66,133,244,0.45)]">
            MUTHUMANI P
          </h1>

          {/* Luminous Gradient Divider */}
          <div className="w-36 sm:w-56 h-[2px] bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent my-3 opacity-80" />

          {/* Professional Subtitle */}
          <p className="text-xs sm:text-sm md:text-base font-mono font-semibold tracking-[0.22em] sm:tracking-[0.28em] text-[#AAB6CC] uppercase">
            Web Developer <span className="text-[#4285F4]">•</span> AI &amp; Data Science
          </p>
        </div>
      </div>

      {/* 5. Minimal Fallback for Non-WebGL Browsers */}
      {!hasWebGL && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-widest text-[#F8FAFC] mb-2">
            MUTHUMANI P
          </h1>
          <p className="text-sm font-mono text-[#22D3EE] tracking-widest">
            WEB DEVELOPER • AI &amp; DATA SCIENCE
          </p>
        </div>
      )}
    </div>
  );
}
