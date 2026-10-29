"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroGalaxyCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability safely
    const hasWebGL = () => {
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

    if (!hasWebGL()) return;

    // 1. Scene, Camera, & High-Performance Renderer
    const scene = new THREE.Scene();

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 750;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 3.0, 7.8);
    camera.lookAt(0.6, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // Strict Hero Scoping Styles
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "0";

    container.appendChild(renderer.domElement);

    // 2. Generate Smooth Radial Star Sprite Texture (Procedural Canvas)
    const createStarTexture = () => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext("2d");
      if (!ctx) return null;

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
      grad.addColorStop(0.18, "rgba(235, 248, 255, 0.85)");
      grad.addColorStop(0.45, "rgba(66, 133, 244, 0.45)");
      grad.addColorStop(0.75, "rgba(139, 92, 246, 0.15)");
      grad.addColorStop(1.0, "rgba(11, 16, 32, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(c);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    const starTexture = createStarTexture();

    // 3. Galaxy Group
    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    // Initial cinematic tilt angle (viewing spiral disc from above at an angle)
    galaxyGroup.rotation.x = 0.82;
    galaxyGroup.rotation.z = -0.12;

    // 4. Spiral Galaxy Parameters & Particle Generation
    const isMobile = width < 1024;
    const parameters = {
      count: isMobile ? 7000 : 15000,
      radius: 8.5,
      branches: 4,
      spin: 1.15,
      randomness: 0.35,
      randomnessPower: 3.2,
      insideColor: "#F8FAFC",
      cyanColor: "#22D3EE",
      blueColor: "#4285F4",
      violetColor: "#8B5CF6",
      outerColor: "#7C3AED",
    };

    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const scales = new Float32Array(parameters.count);

    const cInside = new THREE.Color(parameters.insideColor);
    const cCyan = new THREE.Color(parameters.cyanColor);
    const cBlue = new THREE.Color(parameters.blueColor);
    const cViolet = new THREE.Color(parameters.violetColor);
    const cOuter = new THREE.Color(parameters.outerColor);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;

      // Distance from center: higher star density clustered near the galactic core
      const r = Math.pow(Math.random(), 2.2) * parameters.radius;

      // Spiral angle: branch base angle + logarithmic spin curvature
      const branchAngle = ((i % parameters.branches) * (2 * Math.PI)) / parameters.branches;
      const spinAngle = r * parameters.spin;
      const totalAngle = branchAngle + spinAngle;

      // 3D Dispersion: random thickness flaring outwards
      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        (0.25 + r * 0.2);
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        (0.15 + r * 0.18);
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        (0.25 + r * 0.2);

      positions[i3] = Math.cos(totalAngle) * r + randomX;
      positions[i3 + 1] = randomY; // galactic vertical plane
      positions[i3 + 2] = Math.sin(totalAngle) * r + randomZ;

      // Color interpolation: Core (white/cyan) -> Mid arms (blue/violet) -> Outer edge (deep violet/lavender)
      const mixedColor = cInside.clone();
      const normR = r / parameters.radius;

      if (normR < 0.18) {
        mixedColor.lerp(cCyan, normR / 0.18);
      } else if (normR < 0.55) {
        mixedColor.lerp(cCyan, 1.0).lerp(cBlue, (normR - 0.18) / 0.37);
      } else if (normR < 0.85) {
        mixedColor.lerp(cBlue, 1.0).lerp(cViolet, (normR - 0.55) / 0.3);
      } else {
        mixedColor.lerp(cViolet, 1.0).lerp(cOuter, (normR - 0.85) / 0.15);
      }

      // Add natural color variance across stars
      mixedColor.r += (Math.random() - 0.5) * 0.08;
      mixedColor.g += (Math.random() - 0.5) * 0.08;
      mixedColor.b += (Math.random() - 0.5) * 0.08;

      colors[i3] = Math.max(0, Math.min(1, mixedColor.r));
      colors[i3 + 1] = Math.max(0, Math.min(1, mixedColor.g));
      colors[i3 + 2] = Math.max(0, Math.min(1, mixedColor.b));

      // Varied star scales (core stars slightly larger, tiny stars in outer arms)
      scales[i] = Math.random() * (normR < 0.2 ? 1.6 : 1.1) + 0.4;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.07 : 0.065,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      map: starTexture || undefined,
    });

    const galaxyPoints = new THREE.Points(geometry, material);
    galaxyGroup.add(galaxyPoints);

    // 5. Luminous Galactic Core Glow & Atmospheric Dust Clouds
    const coreGlowGroup = new THREE.Group();
    galaxyGroup.add(coreGlowGroup);

    // Glowing core disc
    const coreGeom = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#4285F4"),
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreMesh.scale.set(1.4, 0.4, 1.4); // flattened core disc
    coreGlowGroup.add(coreMesh);

    // Innermost white/cyan energetic nucleus
    const nucleusGeom = new THREE.SphereGeometry(0.55, 24, 24);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#22D3EE"),
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeom, nucleusMat);
    nucleusMesh.scale.set(1.2, 0.35, 1.2);
    coreGlowGroup.add(nucleusMesh);

    // Secondary Nebula Dust Clouds along the spiral arms
    const nebulaClouds: THREE.Mesh[] = [];
    const cloudConfigs = [
      { color: "#4285F4", scale: 2.2, pos: [2.0, 0, 1.4], opacity: 0.12 },
      { color: "#8B5CF6", scale: 2.6, pos: [-2.2, 0, -1.8], opacity: 0.11 },
      { color: "#22D3EE", scale: 1.9, pos: [1.4, 0, -2.4], opacity: 0.14 },
      { color: "#8B5CF6", scale: 2.8, pos: [-1.8, 0, 2.2], opacity: 0.1 },
    ];

    cloudConfigs.forEach((cfg) => {
      const g = new THREE.SphereGeometry(1, 16, 16);
      const m = new THREE.MeshBasicMaterial({
        color: new THREE.Color(cfg.color),
        transparent: true,
        opacity: cfg.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const cloud = new THREE.Mesh(g, m);
      cloud.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      cloud.scale.set(cfg.scale, 0.25, cfg.scale);
      galaxyGroup.add(cloud);
      nebulaClouds.push(cloud);
    });

    // Desktop vs Mobile layout positioning
    // On desktop: position galaxy center around x = 1.9 to frame the portrait card on the right
    const updateLayout = (w: number) => {
      const mobile = w < 1024;
      if (mobile) {
        galaxyGroup.position.set(0, 0.2, -1.5);
        galaxyGroup.scale.setScalar(0.72);
        camera.lookAt(0, 0, 0);
      } else {
        galaxyGroup.position.set(1.9, 0.1, 0);
        galaxyGroup.scale.setScalar(0.95);
        camera.lookAt(0.5, 0, 0);
      }
    };
    updateLayout(width);

    // 6. Interactive Smooth Mouse Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.targetX = (clientX / rect.width - 0.5) * 2;
      mouse.targetY = (clientY / rect.height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 750;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateLayout(width);
    };

    window.addEventListener("resize", handleResize);

    // 8. Viewport Intersection Observer (Pauses WebGL rendering when hero is scrolled out of view)
    let isHeroVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 9. Continuous Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let totalTime = 0;

    const baseRotationX = 0.82;
    const baseRotationZ = -0.12;

    const animate = (currentTime: number = performance.now()) => {
      animationFrameId = requestAnimationFrame(animate);

      // Only calculate and render when the Hero section is active in the viewport
      if (!isHeroVisible) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      totalTime += delta;

      if (!prefersReducedMotion) {
        // Smooth lerp damping for gentle mouse parallax
        mouse.x += (mouse.targetX - mouse.x) * 0.04;
        mouse.y += (mouse.targetY - mouse.y) * 0.04;

        // Slow, continuous majestic galactic rotation
        galaxyGroup.rotation.y += delta * 0.055;

        // Subtle viewing angle perspective tilt based on mouse position
        galaxyGroup.rotation.x = baseRotationX + mouse.y * 0.12;
        galaxyGroup.rotation.z = baseRotationZ - mouse.x * 0.1;

        // Gentle core breathing and twinkling glow
        const corePulse = 1.0 + Math.sin(totalTime * 1.5) * 0.08;
        coreMesh.scale.set(1.4 * corePulse, 0.4, 1.4 * corePulse);
        nucleusMesh.scale.set(1.2 * corePulse, 0.35, 1.2 * corePulse);

        // Slow drift of secondary nebula clouds
        nebulaClouds.forEach((cloud, idx) => {
          cloud.rotation.y += delta * (0.02 + idx * 0.005);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup on Component Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      material.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      nucleusGeom.dispose();
      nucleusMat.dispose();
      if (starTexture) starTexture.dispose();

      nebulaClouds.forEach((cloud) => {
        cloud.geometry.dispose();
        if (Array.isArray(cloud.material)) {
          cloud.material.forEach((m) => m.dispose());
        } else {
          cloud.material.dispose();
        }
      });

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Deep Space Atmosphere Radial Glows */}
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[650px] h-[550px] rounded-full bg-cyan-500/12 blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-[30%] -translate-y-1/2 w-[550px] h-[500px] rounded-full bg-violet-600/15 blur-[150px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#10182B]/30 to-[#10182B]/80 pointer-events-none z-0" />
    </div>
  );
}
