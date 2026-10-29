"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface GestureCursorProps {
  enabled?: boolean;
}

export function GestureCursor({ enabled = true }: GestureCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing follower
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch-only devices
    if (typeof window !== "undefined") {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(isTouch);
      if (isTouch) return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Ignore input fields and editable elements to allow standard text selection
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        setIsVisible(false);
        return;
      } else {
        if (!isVisible) setIsVisible(true);
      }

      // Check for custom cursor context labels
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorAttr) {
        setCursorText(cursorAttr);
        setIsPointer(true);
        return;
      }

      // Check if hovering a project card or interactive preview
      if (target.closest("#projects") && target.closest('[role="button"]')) {
        setCursorText("View Project");
        setIsPointer(true);
        return;
      }

      if (target.closest("[data-drag-carousel]")) {
        setCursorText("Drag");
        setIsPointer(true);
        return;
      }

      // Standard links & buttons
      const isInteractive = Boolean(
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]')
      );

      setIsPointer(isInteractive);
      setCursorText("");
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!enabled || isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" aria-hidden="true">
      {/* Outer ambient glow ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorText ? 1.4 : isPointer ? 1.2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className={`rounded-full flex items-center justify-center transition-all duration-200 ${
          cursorText
            ? "w-24 h-24 bg-[#4285F4]/15 border border-[#22D3EE]/60 backdrop-blur-[2px] shadow-[0_0_25px_rgba(66,133,244,0.35)]"
            : isPointer
            ? "w-10 h-10 bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            : "w-6 h-6 border border-[#4285F4]/40 bg-[#4285F4]/10 shadow-[0_0_10px_rgba(66,133,244,0.2)]"
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-white drop-shadow-md px-1 text-center select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center pinpoint indicator */}
      {!cursorText && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${
            isPointer ? "bg-[#22D3EE] scale-125" : "bg-[#4285F4]"
          }`}
        />
      )}
    </div>
  );
}

