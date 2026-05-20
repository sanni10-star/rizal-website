"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Badge LG 100 % code (CSS + SVG) : socle dégradé linéaire, bord métallique inset,
 * logo vectoriel chrome scalable, tilt 3D du socle + translateZ du logo au survol `.group`.
 */
export function LgBrandBadge({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gid = `lg-chrome-${uid}`;
  const fid = `lg-pop-${uid}`;

  return (
    <div
      className={cn(
        "relative w-full min-w-[80%] max-w-full [transform-style:preserve-3d]",
        className,
      )}
      role="img"
      aria-label="LG"
    >
      <div
        className={cn(
          "mx-auto w-[min(100%,92%)] min-w-[80%] origin-center rounded-[1.35rem] md:rounded-3xl",
          "border border-white/10",
          "bg-gradient-to-b from-[#1a1a1a] to-black",
          "shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-12px_28px_rgba(0,0,0,0.55),0_10px_28px_rgba(0,0,0,0.45)]",
          "px-3 py-3 md:px-6 md:py-4",
          "[transform-style:preserve-3d]",
          "transition-transform duration-500 ease-out will-change-transform",
          "[transform:rotateX(0deg)_rotateY(0deg)]",
          "group-hover:[transform:rotateX(-4deg)_rotateY(3deg)]",
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-center [transform-style:preserve-3d]",
            "transition-transform duration-500 ease-out will-change-transform",
            "[transform:translate3d(0,0,4px)]",
            "group-hover:[transform:translate3d(0,0,40px)]",
          )}
        >
          <svg
            viewBox="0 0 168 44"
            className="h-[clamp(2.75rem,11vw,4.5rem)] w-auto max-w-[min(100%,14rem)] md:max-w-[min(100%,16rem)]"
            aria-hidden
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="20%" stopColor="#eef2f8" />
                <stop offset="45%" stopColor="#9fb0c4" />
                <stop offset="72%" stopColor="#5d6d82" />
                <stop offset="100%" stopColor="#343f4f" />
              </linearGradient>
              <filter id={fid} x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="1" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.65" />
              </filter>
            </defs>
            <g filter={`url(#${fid})`}>
              <circle
                cx="22"
                cy="22"
                r="18.5"
                fill="none"
                stroke={`url(#${gid})`}
                strokeWidth="1.35"
                opacity={0.95}
              />
              <path
                fill={`url(#${gid})`}
                d="M12 9h4.2v21.2H12V9zm0 21.2h14.2v4H12v-4z"
              />
              <path
                fill={`url(#${gid})`}
                d="M26.2 11.8c7.6-1.8 15.6 3.4 15.6 11.4 0 6.8-5.2 12-12.2 12-3.6 0-7-1.2-9.4-3.4l2.8-3c1.8 1.4 4 2.2 6.4 2.2 4.8 0 8.4-3.6 8.4-8.4 0-5.6-4.4-9.2-9.8-9.2-2.6 0-5 0.8-6.8 2.2l-2.6-3.4c2.4-2 5.6-3.2 9-3.2z"
              />
              <circle cx="32.5" cy="17.2" r="1.85" fill={`url(#${gid})`} />
              <text
                x="50"
                y="30"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
                fontSize="21"
                fontWeight="800"
                letterSpacing="0.14em"
                fill={`url(#${gid})`}
              >
                LG
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
