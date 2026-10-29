"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Chrome3DBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
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

    if (!checkWebGL()) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Explicit absolute positioning to guarantee viewport lock
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "1";

    container.appendChild(renderer.domElement);

    // 3. Lighting Rig (Chrome Visual Language: Crisp White, Azure Blue & Electric Cyan)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0c4a6e, 2.2);
    scene.add(hemiLight);

    const topKeyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    topKeyLight.position.set(3, 7, 5);
    scene.add(topKeyLight);

    const cyanFillLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
    cyanFillLight.position.set(-5, -2, 4);
    scene.add(cyanFillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
    rimLight.position.set(1, 4, -5);
    scene.add(rimLight);

    const internalGlow = new THREE.PointLight(0x0099ff, 4.0, 14);
    scene.add(internalGlow);

    // 4. Main 3D Chrome Orbit System Group
    const orbitSystem = new THREE.Group();
    scene.add(orbitSystem);

    // 4a. Central Glossy Translucent Glass Sphere (Replicating User's Reference Image)
    const sphereRadius = 1.28;
    const sphereGeom = new THREE.SphereGeometry(sphereRadius, 64, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0ea5e9"),
      emissive: new THREE.Color("#0284c7"),
      emissiveIntensity: 0.32,
      roughness: 0.05,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.95,
      transparent: true,
      opacity: 0.88,
    });
    const centralSphere = new THREE.Mesh(sphereGeom, sphereMat);
    orbitSystem.add(centralSphere);

    // Inner glowing sphere core for rich volumetric light depth
    const innerGeom = new THREE.SphereGeometry(sphereRadius * 0.82, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#38bdf8"),
      transparent: true,
      opacity: 0.5,
    });
    const innerCore = new THREE.Mesh(innerGeom, innerMat);
    centralSphere.add(innerCore);

    // Luminous core center
    const centerGeom = new THREE.SphereGeometry(sphereRadius * 0.45, 24, 24);
    const centerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ffffff"),
      transparent: true,
      opacity: 0.4,
    });
    const centerPoint = new THREE.Mesh(centerGeom, centerMat);
    centralSphere.add(centerPoint);

    // 4b. Concentric Glass Orbital Rings (10 Concentric Rings matching reference image)
    const ringCount = 10;
    const ringGroup = new THREE.Group();
    // Signature tilted orbital plane
    ringGroup.rotation.x = 0.58;
    ringGroup.rotation.z = -0.2;
    ringGroup.rotation.y = 0.12;
    orbitSystem.add(ringGroup);

    const ringMeshes: THREE.Mesh[] = [];
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#38bdf8"),
      emissive: new THREE.Color("#00b4d8"),
      emissiveIntensity: 0.35,
      roughness: 0.04,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transparent: true,
      opacity: 0.84,
    });

    for (let i = 0; i < ringCount; i++) {
      const radius = sphereRadius * 1.32 + i * 0.18;
      const tubeRadius = 0.017 + (i % 3) * 0.003;
      const torusGeom = new THREE.TorusGeometry(radius, tubeRadius, 24, 140);
      const ringMesh = new THREE.Mesh(torusGeom, ringMat);

      // Subtle natural tilt variation across concentric strands
      ringMesh.rotation.x = (i - ringCount / 2) * 0.005;
      ringMesh.rotation.y = (i % 2 === 0 ? 1 : -1) * 0.004;

      ringGroup.add(ringMesh);
      ringMeshes.push(ringMesh);
    }

    // 4c. Secondary Subtle Floating Satellites (Ethereal & delicate)
    const satellites: { mesh: THREE.Mesh; speed: number; orbitRadius: number; phase: number; yAmp: number }[] = [];
    const satConfigs = [
      { radius: 0.15, orbit: 3.8, speed: 0.2, phase: 0.6, yAmp: 0.5 },
      { radius: 0.11, orbit: 4.3, speed: -0.16, phase: 2.4, yAmp: -0.4 },
      { radius: 0.09, orbit: 4.7, speed: 0.14, phase: 4.2, yAmp: 0.3 },
    ];

    satConfigs.forEach((cfg) => {
      const satGeom = new THREE.SphereGeometry(cfg.radius, 32, 32);
      const satMesh = new THREE.Mesh(satGeom, sphereMat);
      orbitSystem.add(satMesh);
      satellites.push({
        mesh: satMesh,
        speed: cfg.speed,
        orbitRadius: cfg.orbit,
        phase: cfg.phase,
        yAmp: cfg.yAmp,
      });
    });

    // 4d. Sparse Luminous 3D Star-Dust Particles
    const particleCount = 75;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color("#38bdf8");
    const cViolet = new THREE.Color("#818cf8");
    const cWhite = new THREE.Color("#ffffff");

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 18;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 12 - 2;

      const rnd = Math.random();
      const col = rnd < 0.5 ? cCyan : rnd < 0.8 ? cViolet : cWhite;
      particleColors[i3] = col.r;
      particleColors[i3 + 1] = col.g;
      particleColors[i3 + 2] = col.b;
    }

    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeom, particleMat);
    scene.add(particlePoints);

    // Layout configuration tuned for desktop & mobile
    const computeLayout = (w: number) => {
      const isMobile = w < 1024;
      if (isMobile) {
        orbitSystem.position.set(0, 0.35, 0);
        orbitSystem.scale.setScalar(0.68);
      } else {
        // Desktop: Positioned to frame the right-hand portrait card
        orbitSystem.position.set(2.65, 0.02, 0);
        orbitSystem.scale.setScalar(0.85);
      }
    };
    computeLayout(width);

    // 5. Theme Integration (Light vs Dark Mode)
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        hemiLight.color.setHex(0xffffff);
        hemiLight.groundColor.setHex(0x0284c7);
        hemiLight.intensity = 1.8;

        topKeyLight.color.setHex(0xffffff);
        topKeyLight.intensity = 3.6;

        cyanFillLight.color.setHex(0x00f0ff);
        cyanFillLight.intensity = 2.8;

        rimLight.color.setHex(0x38bdf8);
        rimLight.intensity = 3.2;

        internalGlow.color.setHex(0x0284c7);
        internalGlow.intensity = 4.0;

        sphereMat.color.setHex(0x38bdf8);
        sphereMat.emissive.setHex(0x0284c7);
        sphereMat.emissiveIntensity = 0.38;
        ringMat.color.setHex(0x38bdf8);
        ringMat.emissive.setHex(0x00d2ff);
        ringMat.emissiveIntensity = 0.38;
      } else {
        hemiLight.color.setHex(0xffffff);
        hemiLight.groundColor.setHex(0xbae6fd);
        hemiLight.intensity = 2.2;

        topKeyLight.color.setHex(0xffffff);
        topKeyLight.intensity = 3.2;

        cyanFillLight.color.setHex(0x0ea5e9);
        cyanFillLight.intensity = 2.4;

        rimLight.color.setHex(0x0284c7);
        rimLight.intensity = 2.4;

        internalGlow.color.setHex(0x38bdf8);
        internalGlow.intensity = 3.0;

        sphereMat.color.setHex(0x0284c7);
        sphereMat.emissive.setHex(0x0099ff);
        sphereMat.emissiveIntensity = 0.3;
        ringMat.color.setHex(0x0284c7);
        ringMat.emissive.setHex(0x38bdf8);
        ringMat.emissiveIntensity = 0.3;
      }
    };

    updateTheme();

    const themeObserver = new MutationObserver(() => {
      updateTheme();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // 6. Interactive Mouse Parallax (Smooth Lerp)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. Scroll Parallax Tracking
    let scrollProgress = 0;
    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      scrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      computeLayout(width);
    };
    window.addEventListener("resize", handleResize);

    // 9. Visibility handling to pause rendering when tab is hidden
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial render pass
    renderer.render(scene, camera);

    // 10. Smooth Render Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let totalElapsed = 0;

    const animate = (currentTime: number = performance.now()) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      totalElapsed += delta;

      if (!prefersReducedMotion && (!document.hidden || prefersReducedMotion)) {
        // Smooth mouse damping
        mouse.x += (mouse.targetX - mouse.x) * 0.045;
        mouse.y += (mouse.targetY - mouse.y) * 0.045;

        // Slow, elegant continuous rotation of the glass sphere & rings
        centralSphere.rotation.y += delta * 0.22;
        ringGroup.rotation.y += delta * 0.15;

        // Gentle breathing oscillation
        const floatY = Math.sin(totalElapsed * 0.75) * 0.14;
        const floatX = Math.cos(totalElapsed * 0.55) * 0.08;

        const isMobile = (container.clientWidth || window.innerWidth) < 1024;
        const baseX = isMobile ? 0 : 2.65;
        const baseY = isMobile ? 0.35 : 0.02;

        // Scroll displacement: softly moves down and into z-depth
        const scrollOffsetY = -scrollProgress * 2.8;
        const scrollOffsetZ = -scrollProgress * 1.8;

        orbitSystem.position.x = baseX + floatX + mouse.x * 0.32;
        orbitSystem.position.y = baseY + floatY - mouse.y * 0.28 + scrollOffsetY;
        orbitSystem.position.z = scrollOffsetZ;

        // Soft perspective tilting responding to mouse
        orbitSystem.rotation.x = mouse.y * 0.18;
        orbitSystem.rotation.z = -mouse.x * 0.14;

        // Keep internal light synced with sphere center
        internalGlow.position.copy(orbitSystem.position);

        // Orbit satellite bubbles
        satellites.forEach((sat) => {
          const angle = totalElapsed * sat.speed + sat.phase;
          sat.mesh.position.x = Math.cos(angle) * sat.orbitRadius;
          sat.mesh.position.z = Math.sin(angle) * sat.orbitRadius;
          sat.mesh.position.y = Math.sin(angle * 1.4) * sat.yAmp;
        });

        // Drift background particle dust
        particlePoints.rotation.y = totalElapsed * 0.025;
        particlePoints.rotation.x = Math.sin(totalElapsed * 0.02) * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      sphereGeom.dispose();
      sphereMat.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      centerGeom.dispose();
      centerMat.dispose();
      ringMeshes.forEach((mesh) => mesh.geometry.dispose());
      ringMat.dispose();
      satellites.forEach((sat) => {
        sat.mesh.geometry.dispose();
      });
      particleGeom.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Volumetric Radial Glows for Atmospheric Depth */}
      <div className="absolute top-[-5%] right-[-5%] w-[650px] h-[650px] rounded-full bg-cyan-500/15 dark:bg-cyan-400/12 blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute top-[35%] left-[-10%] w-[550px] h-[550px] rounded-full bg-blue-600/12 dark:bg-blue-500/12 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[650px] h-[650px] rounded-full bg-indigo-500/12 dark:bg-indigo-600/12 blur-[160px] -z-10 pointer-events-none" />
    </div>
  );
}
