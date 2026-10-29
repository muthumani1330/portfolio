"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export function FloatingInput({
  label,
  id,
  error,
  value,
  onChange,
  className,
  type = "text",
  ...props
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const isLifted = isFocused || hasValue;

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative rounded-xl border bg-white/[0.02] backdrop-blur-sm transition-all duration-300",
          isFocused
            ? "border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.25)] bg-white/[0.04]"
            : error
            ? "border-rose-500/80 bg-rose-500/[0.02]"
            : "border-white/10 hover:border-white/20"
        )}
      >
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full bg-transparent px-4 pt-6 pb-2 text-sm text-white placeholder-transparent focus:outline-none",
            className
          )}
          placeholder={label}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-4 transition-all duration-200 ease-out font-mono",
            isLifted
              ? "top-1.5 text-[10px] tracking-wider text-indigo-400 font-semibold"
              : "top-4 text-xs text-slate-400"
          )}
        >
          {label}
        </label>
      </div>
      {error && (
        <span className="mt-1 block text-xs text-rose-400 pl-1 font-mono">
          {error}
        </span>
      )}
    </div>
  );
}

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
}

export function FloatingTextarea({
  label,
  id,
  error,
  value,
  onChange,
  className,
  rows = 4,
  ...props
}: FloatingTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const isLifted = isFocused || hasValue;

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative rounded-xl border bg-white/[0.02] backdrop-blur-sm transition-all duration-300",
          isFocused
            ? "border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.25)] bg-white/[0.04]"
            : error
            ? "border-rose-500/80 bg-rose-500/[0.02]"
            : "border-white/10 hover:border-white/20"
        )}
      >
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full bg-transparent px-4 pt-6 pb-2 text-sm text-white placeholder-transparent focus:outline-none resize-none",
            className
          )}
          placeholder={label}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-4 transition-all duration-200 ease-out font-mono",
            isLifted
              ? "top-1.5 text-[10px] tracking-wider text-indigo-400 font-semibold"
              : "top-4 text-xs text-slate-400"
          )}
        >
          {label}
        </label>
      </div>
      {error && (
        <span className="mt-1 block text-xs text-rose-400 pl-1 font-mono">
          {error}
        </span>
      )}
    </div>
  );
}
