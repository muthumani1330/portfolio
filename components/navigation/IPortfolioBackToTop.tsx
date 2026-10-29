"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function IPortfolioBackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-5 right-5 z-40 w-11 h-11 rounded-full bg-[#149ddd] hover:bg-[#1182b8] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

