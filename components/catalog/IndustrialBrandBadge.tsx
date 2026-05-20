"use client";

/**
 * Badges industriels : textures + logos en SVG/CSS (extrusion par drop-shadows).
 * Les pictogrammes sont des recréations pour l'interface ; pour une conformité
 * juridique stricte aux chartes constructeurs, utiliser les fichiers fournis par chaque marque.
 */

import { useId } from "react";
import type { Brand } from "@/types/catalog";
import { cn } from "@/lib/utils";

/**
 * Lightweight 3D extrusion — max 3 drop-shadow layers instead of N stepped
 * shadows.  Visually equivalent but ~5-10x cheaper to composite.
 *   1. Hard edge shadow (simulates the solid extrusion side)
 *   2. Mid-range colored depth
 *   3. Soft contact/ambient shadow
 */
function cssExtrusion(
  steps: number,
  r: number,
  g: number,
  b: number,
  softBlur = 14,
  softAlpha = 0.42,
): string {
  const half = Math.ceil(steps / 2);
  return [
    `drop-shadow(${half}px ${half + 1}px 0 rgb(${r} ${g} ${b}))`,
    `drop-shadow(${steps}px ${steps + 1}px 1px rgba(${r},${g},${b},0.6))`,
    `drop-shadow(${steps + 2}px ${steps + 6}px ${softBlur}px rgba(0,0,0,${softAlpha}))`,
  ].join(" ");
}

// ─── MEGALIFE ────────────────────────────────────────────────────────────────

/**
 * MegaLife 5D — disque crimson ultra-brillant, anneau chrome biseauté (7-stop),
 * 3 barres CNC embossées avec bevel stripe, extrusion 12 couches rouge profond,
 * 3 passes de specular (gloss ellipse + pinpoint + rim-light).
 * L'icône a 12 couches vs 7 pour le texte → profondeur distincte et visible.
 */
function MegalifeMark({ uid }: { uid: string }) {
  const outerChrome = `ml-oc-${uid}`;
  const outerSpec = `ml-os-${uid}`;
  const crimson = `ml-cr-${uid}`;
  const innerSpec = `ml-is-${uid}`;
  const rimLight = `ml-rl-${uid}`;
  const barsGrad = `ml-bg-${uid}`;
  const circClip = `ml-cc-${uid}`;

  const extrusion =
    cssExtrusion(12, 100, 8, 20, 26, 0.62) +
    " drop-shadow(0 16px 14px rgba(0,0,0,0.55))";

  return (
    <g style={{ filter: extrusion }}>
      <defs>
        {/* Chrome ring — 7-stop alternating bright/dark */}
        <linearGradient id={outerChrome} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="15%" stopColor="#dce2ec" />
          <stop offset="32%" stopColor="#aeb8cc" />
          <stop offset="50%" stopColor="#d0d6e4" />
          <stop offset="68%" stopColor="#8892a8" />
          <stop offset="82%" stopColor="#c0c6d4" />
          <stop offset="100%" stopColor="#5e6470" />
        </linearGradient>
        {/* Top bevel highlight on ring */}
        <linearGradient id={outerSpec} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.82)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* Deep crimson sphere */}
        <radialGradient id={crimson} cx="30%" cy="22%" r="78%">
          <stop offset="0%" stopColor="#ea3255" />
          <stop offset="14%" stopColor="#cc1a3a" />
          <stop offset="35%" stopColor="#a2001e" />
          <stop offset="60%" stopColor="#74000e" />
          <stop offset="86%" stopColor="#420006" />
          <stop offset="100%" stopColor="#280002" />
        </radialGradient>
        {/* 4-pass specular gloss */}
        <radialGradient id={innerSpec} cx="28%" cy="18%" r="54%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="20%" stopColor="rgba(255,255,255,0.50)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        {/* Rim light bounce from below */}
        <linearGradient id={rimLight} x1="0%" y1="100%" x2="0%" y2="55%">
          <stop offset="0%" stopColor="rgba(255,185,200,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* Bars — bright CNC chrome */}
        <linearGradient id={barsGrad} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="28%" stopColor="#f2f4f8" />
          <stop offset="58%" stopColor="#ced3dc" />
          <stop offset="100%" stopColor="#96a0b4" />
        </linearGradient>
        <clipPath id={circClip}>
          <circle cx="34" cy="34" r="26.5" />
        </clipPath>
      </defs>

      {/* Physical-thickness base disc */}
      <circle cx="35.5" cy="37" r="31" fill="rgba(0,0,0,0.50)" />

      {/* Chrome outer ring */}
      <circle cx="34" cy="34" r="30.5" fill={`url(#${outerChrome})`} />
      <path d="M 5 34 A 29 29 0 0 1 63 34" fill={`url(#${outerSpec})`} opacity="0.80" />
      <path d="M 5 34 A 29 29 0 0 0 63 34" fill="rgba(0,0,0,0.18)" />
      <circle cx="34" cy="34" r="30.5" fill="none" stroke="rgba(0,0,0,0.50)" strokeWidth="0.6" />

      {/* Crimson disc */}
      <circle cx="34" cy="34" r="26.5" fill={`url(#${crimson})`} />
      <circle cx="34" cy="34" r="26.5" fill={`url(#${rimLight})`} />
      <circle cx="34" cy="34" r="26.5" fill="none" stroke="rgba(0,0,0,0.38)" strokeWidth="1.2" />

      {/* 3 diagonal bars clipped to crimson */}
      <g clipPath={`url(#${circClip})`}>
        {/* Soft shadow pass */}
        <g transform="rotate(-38 34 34)" opacity="0.65">
          <rect x="19.5" y="20.5" width="4.5" height="28" rx="2" fill="rgba(40,0,6,0.80)" />
          <rect x="28" y="20.5" width="4.5" height="28" rx="2" fill="rgba(40,0,6,0.80)" />
          <rect x="36.5" y="20.5" width="4.5" height="28" rx="2" fill="rgba(40,0,6,0.80)" />
        </g>
        {/* Chrome bars + left-face CNC bevel stripe */}
        <g
          transform="rotate(-38 34 34)"
          style={{
            filter:
              "drop-shadow(1px 1.5px 2px rgba(0,0,0,0.55))",
          }}
        >
          <rect x="19" y="20" width="4.5" height="28" rx="2" fill={`url(#${barsGrad})`} />
          <rect x="27.5" y="20" width="4.5" height="28" rx="2" fill={`url(#${barsGrad})`} />
          <rect x="36" y="20" width="4.5" height="28" rx="2" fill={`url(#${barsGrad})`} />
          {/* Left-face bright stripe — CNC machined edge */}
          <rect x="19" y="20" width="1.1" height="28" fill="rgba(255,255,255,0.62)" />
          <rect x="27.5" y="20" width="1.1" height="28" fill="rgba(255,255,255,0.62)" />
          <rect x="36" y="20" width="1.1" height="28" fill="rgba(255,255,255,0.62)" />
        </g>
      </g>

      {/* 3-pass specular (studio light simulation) */}
      <ellipse cx="26" cy="23" rx="14" ry="9" fill={`url(#${innerSpec})`} />
      <ellipse cx="22" cy="18" rx="3.5" ry="2" fill="rgba(255,255,255,0.92)" />
      <ellipse cx="34" cy="54" rx="13" ry="4" fill="rgba(255,170,185,0.18)" />
    </g>
  );
}

/**
 * "MegaLife" — brushed CNC steel (9-stop alternating scan-lines),
 * top-edge studio-light highlight (2nd pass), dark depth offset (3rd pass).
 * 7-step grey extrusion — clearly shallower than the 12-step icon.
 */
function MegalifeWord({ uid }: { uid: string }) {
  const steel = `ml-st-${uid}`;
  const steelHi = `ml-sth-${uid}`;

  const extrusion = cssExtrusion(7, 42, 44, 50, 16, 0.52);

  return (
    <g style={{ filter: extrusion }}>
      <defs>
        {/* 9-stop brushed CNC steel — horizontal scan-line simulation */}
        <linearGradient id={steel} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="8%" stopColor="#dde2ea" />
          <stop offset="20%" stopColor="#f4f6f9" />
          <stop offset="32%" stopColor="#b8beca" />
          <stop offset="45%" stopColor="#e8ecf2" />
          <stop offset="58%" stopColor="#9aa0ae" />
          <stop offset="70%" stopColor="#d4d8e0" />
          <stop offset="83%" stopColor="#808692" />
          <stop offset="100%" stopColor="#f0f2f5" />
        </linearGradient>
        {/* Studio spotlight — top-edge white, fades at ~45% height */}
        <linearGradient id={steelHi} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="22%" stopColor="rgba(255,255,255,0.50)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Dark depth side (visible "thickness" of extruded metal lettering) */}
      <text
        x="77.5"
        y="45.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="25"
        fontWeight="800"
        letterSpacing="0.01em"
        fill="rgba(0,0,0,0.55)"
        aria-hidden="true"
      >
        MegaLife
      </text>

      {/* Main brushed-steel fill */}
      <text
        x="76"
        y="44"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="25"
        fontWeight="800"
        letterSpacing="0.01em"
        fill={`url(#${steel})`}
        stroke="rgba(0,0,0,0.28)"
        strokeWidth="0.35"
      >
        MegaLife
      </text>

      {/* Top-edge studio-light highlight (additive pass) */}
      <text
        x="76"
        y="44"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="25"
        fontWeight="800"
        letterSpacing="0.01em"
        fill={`url(#${steelHi})`}
        aria-hidden="true"
      >
        MegaLife
      </text>
    </g>
  );
}

/** Animated light-beam — sweeps the full badge every 4.5 s with a long pause. */
function MegalifeShine({ uid }: { uid: string }) {
  const gId = `ml-sg-${uid}`;
  const cpId = `ml-sp-${uid}`;
  return (
    <>
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.70)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <clipPath id={cpId}>
          <rect x="0" y="0" width="280" height="68" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${cpId})`} opacity="0.78">
        <rect x="-60" y="0" width="60" height="68" fill={`url(#${gId})`}>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-60,0; 340,0; 340,0"
            keyTimes="0; 0.55; 1"
            dur="4.5s"
            repeatCount="indefinite"
            begin="2s"
          />
        </rect>
      </g>
    </>
  );
}

// ─── INGELEC ─────────────────────────────────────────────────────────────────

/** Logo Ingelec : losange + interrupteur + « ingelec » — même dégradé alu, un seul filtre d'extrusion (ombre unifiée). */
function IngelecLockup({ uid }: { uid: string }) {
  const metal = `ig-alu-${uid}`;
  const diamond = "M34 8 L58 34 L34 60 L10 34 Z";
  const switchOpen = "M 11.5 34 L 23.5 34 L 30 27.5 M 37.5 34 L 56.5 34";
  const shadow = cssExtrusion(6, 52, 56, 64, 15, 0.42);

  return (
    <g style={{ filter: shadow }}>
      <defs>
        <linearGradient id={metal} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4f7fb" />
          <stop offset="28%" stopColor="#d8e2ee" />
          <stop offset="52%" stopColor="#a8b6c8" />
          <stop offset="78%" stopColor="#7d8b9e" />
          <stop offset="100%" stopColor="#5c6674" />
        </linearGradient>
        <clipPath id={`ig-clip-${uid}`}>
          <path d={diamond} />
        </clipPath>
      </defs>
      <path
        d={diamond}
        fill={`url(#${metal})`}
        stroke="rgba(0,0,0,0.14)"
        strokeWidth="0.75"
      />
      <path
        d={diamond}
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1"
        opacity={0.85}
      />
      <g clipPath={`url(#ig-clip-${uid})`}>
        <path
          d={switchOpen}
          fill="none"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="3.1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="8"
        />
        <path
          d={switchOpen}
          fill="none"
          stroke="#5a6570"
          strokeWidth="2"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="8"
        />
      </g>
      <text
        x="68"
        y="46"
        fill={`url(#${metal})`}
        fontFamily="'Arial Narrow', 'Franklin Gothic Medium', 'Helvetica Condensed', Arial, sans-serif"
        fontSize="28"
        fontWeight="800"
        letterSpacing="-0.03em"
        style={{ fontStretch: "ultra-condensed" }}
      >
        ingelec
      </text>
    </g>
  );
}

// ─── LG ──────────────────────────────────────────────────────────────────────

/**
 * Badge LG — vraie PIÈCE/MÉDAILLE industrielle :
 * bord visible dessiné explicitement comme un cylindre (pas de drop-shadow),
 * face gunmetal sombre, marque LG (anneau + L) en chrome embossé.
 */
function LgMark({ uid }: { uid: string }) {
  // ── IDs ──────────────────────────────────────────────────────────────────
  const coinWall   = `lg-wall-${uid}`;
  const rimGrad    = `lg-rim-${uid}`;
  const rimSpec    = `lg-rims-${uid}`;
  const discGrad   = `lg-disc-${uid}`;
  const discSpec   = `lg-ds-${uid}`;
  const embossG    = `lg-emb-${uid}`;
  const embossHi   = `lg-ehi-${uid}`;
  const textChrome = `lg-tc-${uid}`;
  const textHi     = `lg-th-${uid}`;
  const markClip   = `lg-mc-${uid}`;
  const wallClip   = `lg-wc-${uid}`;

  // ── Coin geometry ────────────────────────────────────────────────────────────
  const cx    = 31;
  const cy    = 29;
  const rRim  = 28;
  const rDisc = 24;
  // rMark=20 → G outer edge = 20+1.9=21.9 px, disc = 24 px → 2 px breathing gap
  // (rMark=22 was flush with the disc causing the G ring to visually touch the rim)
  const rMark = 20;
  const wallH = 7;

  // ── G arc geometry (hardcoded, verified on-circle at r=20, center (31,29)) ──
  // Gap = 50° at 3-o'clock (chord ≈ 15.3 px — clearly open).
  //
  //   gUX = 31 + 20·cos(50°) = 31 + 12.86 = 43.86  → 43.9
  //   gUY = 29 − 20·sin(50°) = 29 − 15.32 = 13.68  → 13.7
  //   check: (43.9−31)²+(13.7−29)² = 12.9²+15.3² = 166.41+234.09 = 400.5 → r≈20.01 ✓
  //
  //   gBX = 31 + 20 = 51  (3-o'clock right)   gBY = 29  ✓
  //   gBarEndX = 39  →  bar is 12 px long, ~60% of rMark inward  ✓
  const gUX      = 43.9;
  const gUY      = 13.7;
  const gBX      = 51;
  const gBY      = cy;
  const gBarEndX = 39;

  const shadow = "drop-shadow(0 12px 18px rgba(0,0,0,0.70))";
  const textFx = cssExtrusion(6, 30, 32, 38, 14, 0.52);

  return (
    <g>
      <defs>
        {/* ── Coin side / wall (visible bottom edge) ── */}
        <linearGradient id={coinWall} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#3a3e48" />
          <stop offset="45%"  stopColor="#20232a" />
          <stop offset="100%" stopColor="#08090c" />
        </linearGradient>

        {/* ── Chrome rim bevel ── */}
        <linearGradient id={rimGrad} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%"   stopColor="#f2f5fa" />
          <stop offset="14%"  stopColor="#d8deea" />
          <stop offset="30%"  stopColor="#a8b4c8" />
          <stop offset="50%"  stopColor="#d6dcea" />
          <stop offset="68%"  stopColor="#8a96ac" />
          <stop offset="84%"  stopColor="#becad8" />
          <stop offset="100%" stopColor="#60687a" />
        </linearGradient>
        <linearGradient id={rimSpec} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="rgba(255,255,255,0.80)" />
          <stop offset="25%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* ── Gunmetal disc face ── */}
        <linearGradient id={discGrad} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%"   stopColor="#44484e" />
          <stop offset="20%"  stopColor="#34373e" />
          <stop offset="48%"  stopColor="#23262d" />
          <stop offset="75%"  stopColor="#181a20" />
          <stop offset="100%" stopColor="#0d0f12" />
        </linearGradient>
        <radialGradient id={discSpec} cx="35%" cy="26%" r="60%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.20)" />
          <stop offset="50%"  stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* ── Embossed chrome marks ── */}
        <linearGradient id={embossG} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#eef2f8" />
          <stop offset="28%"  stopColor="#d6dce8" />
          <stop offset="60%"  stopColor="#a4acbc" />
          <stop offset="100%" stopColor="#6a7282" />
        </linearGradient>
        <linearGradient id={embossHi} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="rgba(255,255,255,0.88)" />
          <stop offset="32%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* ── LG text chrome ── */}
        <linearGradient id={textChrome} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="18%"  stopColor="#e6e9ef" />
          <stop offset="42%"  stopColor="#9fa5b2" />
          <stop offset="55%"  stopColor="#7c8290" />
          <stop offset="78%"  stopColor="#d5d9e2" />
          <stop offset="100%" stopColor="#5c6270" />
        </linearGradient>
        <linearGradient id={textHi} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="rgba(255,255,255,0.90)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Clip for LG mark — flush with disc edge.
             rDisc-1=23 was wrong: it clipped the G ring outer stroke (23.9px).
             Use rDisc=24 so the G ring outer edge is never clipped. */}
        <clipPath id={markClip}>
          <circle cx={cx} cy={cy} r={rDisc} />
        </clipPath>
        {/* Clip for coin wall — only below coin center */}
        <clipPath id={wallClip}>
          <rect x={cx - rRim - 2} y={cy} width={(rRim + 2) * 2} height={wallH + 6} />
        </clipPath>
      </defs>

      {/* ═══════════════════════════════════════════════════
          COIN — drawn as explicit cylinder shapes (not CSS shadows)
          Layer order: shadow → wall → rim+disc → marks
          ═══════════════════════════════════════════════════ */}
      <g style={{ filter: shadow }}>

        {/* 1. COIN WALL — the visible bottom/side edge of the coin
               Bottom ellipse shifted down by wallH px, clipped to bottom half.
               This is the KEY element that makes it look like a physical coin. */}
        {/* Wall fill (dark curved band) */}
        <ellipse
          cx={cx} cy={cy + wallH}
          rx={rRim} ry={wallH * 0.6}
          fill={`url(#${coinWall})`}
          clipPath={`url(#${wallClip})`}
        />
        {/* Wall bottom edge dark line */}
        <ellipse
          cx={cx} cy={cy + wallH}
          rx={rRim} ry={wallH * 0.6}
          fill="none"
          stroke="rgba(0,0,0,0.65)"
          strokeWidth="1"
          clipPath={`url(#${wallClip})`}
        />
        {/* Wall top rim (where face meets side — tiny bright highlight) */}
        <ellipse
          cx={cx} cy={cy + wallH}
          rx={rRim} ry={wallH * 0.6}
          fill="none"
          stroke="rgba(180,188,204,0.55)"
          strokeWidth="0.7"
          clipPath={`url(#${wallClip})`}
        />

        {/* 2. CHROME RIM — the outer ring of the coin face */}
        <circle cx={cx} cy={cy} r={rRim} fill={`url(#${rimGrad})`} />
        {/* Top-arc bright bevel */}
        <path
          d={`M ${cx - rRim} ${cy} A ${rRim} ${rRim} 0 0 1 ${cx + rRim} ${cy}`}
          fill={`url(#${rimSpec})`} opacity="0.88"
        />
        {/* Bottom-arc shadow */}
        <path
          d={`M ${cx - rRim} ${cy} A ${rRim} ${rRim} 0 0 0 ${cx + rRim} ${cy}`}
          fill="rgba(0,0,0,0.30)"
        />
        <circle cx={cx} cy={cy} r={rRim} fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="0.5" />

        {/* 3. GUNMETAL DISC FACE */}
        <circle cx={cx} cy={cy} r={rDisc} fill={`url(#${discGrad})`} />
        <circle cx={cx} cy={cy} r={rDisc} fill={`url(#${discSpec})`} />
        {/* Inset shadow at rim/disc junction */}
        <circle cx={cx} cy={cy} r={rDisc} fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="2.2" />
        <circle cx={cx} cy={cy} r={rDisc - 1.5} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />

        {/* ── 4. LG OFFICIAL FACE MARK ──────────────────────────────────────────
             Anatomy of the official LG face icon inside the coin disc:
             • G  – 310° CCW open arc (50° gap at 3-o'clock) + inner bar pointing left
             • L  – vertical nose bar + horizontal chin bar (corner ≈ face lower-center)
             • •  – single eye dot, upper-left quadrant
             All elements embossed chrome over dark gunmetal disc.
        ─────────────────────────────────────────────────────────────────────── */}
        <g
          clipPath={`url(#${markClip})`}
          style={{
            filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.70))",
          }}
        >
          {/* ══ G RING ══
              M gUX gUY  → start at top of 50° gap (upper-right)
              A … 1 0    → large-arc=1, sweep=0 (CCW) → 310° arc via top→left→bottom→right
              L gBarEndX gBY → inner horizontal bar extending 8 px leftward from gap-bottom
              strokeLinecap "butt" keeps gap edges crisp (round caps would visually close gap).
          */}
          <path
            d={`M ${gUX} ${gUY} A ${rMark} ${rMark} 0 1 0 ${gBX} ${gBY} L ${gBarEndX} ${gBY}`}
            fill="none"
            stroke={`url(#${embossG})`}
            strokeWidth="3.8"
            strokeLinecap="butt"
            strokeLinejoin="round"
          />
          {/* G chrome specular highlight — thin second pass */}
          <path
            d={`M ${gUX} ${gUY} A ${rMark} ${rMark} 0 1 0 ${gBX} ${gBY} L ${gBarEndX} ${gBY}`}
            fill="none"
            stroke={`url(#${embossHi})`}
            strokeWidth="1.3"
            strokeLinecap="butt"
            opacity="0.60"
          />

          {/* ══ L MARK ══  (nose bridge = vertical  |  chin = horizontal)
              Scaled for rMark=22 (G inner clear area r≈20.1 from center).
              Official LG face proportions:
                • Vertical  centered at cx−4=27, width=4  → x 25–29
                • Horizontal starts at same x=25, extends right to cx+6=37, height=4
                • Corner (where they share x-left) = (25, 32)
              Distance checks from center (31,29):
                top-left of vertical  (25, 23) → √(36+36)  = 7.1 < 20.1 ✓
                right end of horiz.   (37, 36) → √(36+49)  = 9.2 < 20.1 ✓
          */}
          {/* Vertical bar — nose bridge, center-left of face */}
          <rect x={cx - 6} y={cy - 6} width="4" height="11" rx="1.6"
            fill={`url(#${embossG})`} />
          {/* Horizontal bar — chin, extends rightward from bottom of vertical */}
          <rect x={cx - 6} y={cy + 2} width="12" height="3.8" rx="1.6"
            fill={`url(#${embossG})`} />
          {/* CNC studio-light bevel — single pixel of white on top edge */}
          <rect x={cx - 6} y={cy - 6}  width="4"  height="0.9" rx="0.5"
            fill="rgba(255,255,255,0.92)" />
          <rect x={cx - 6} y={cy + 2}  width="12" height="0.9" rx="0.5"
            fill="rgba(255,255,255,0.92)" />

          {/* ══ EYE DOT ══
              Placed upper-LEFT of the L vertical — 2 px to the left of it,
              and 4 px above its top edge — to read as a face eye, not a letter.
              Position (cx−9=22, cy−10=19)
              Distance from center: √(81+100)=√181 ≈ 13.5 < 20.1 ✓
              Outer edge: 13.5+3.2 = 16.7 < 20.1  (clear of G ring inner wall) ✓
          */}
          <circle cx={cx - 9} cy={cy - 10} r="3.2" fill={`url(#${embossG})`} />
          <circle cx={cx - 9} cy={cy - 10} r="3.2" fill={`url(#${embossHi})`} opacity="0.62" />
          {/* Eye micro-highlight — top-left specular catch-light */}
          <circle cx={cx - 10.2} cy={cy - 11.2} r="1.3"
            fill="rgba(255,255,255,0.78)" />
        </g>

        {/* 5. Top-left glint on disc face (scales with rMark=22) */}
        <ellipse cx={cx - 10} cy={cy - 14} rx="4" ry="2.2" fill="rgba(255,255,255,0.22)" />
      </g>

      {/* ── LG TEXT — polished chrome ── */}
      <g style={{ filter: textFx }}>
        <text x="67.5" y="43.5"
          fontFamily="ui-sans-serif,system-ui,sans-serif"
          fontSize="25" fontWeight="900" letterSpacing="0.08em"
          fill="rgba(0,0,0,0.55)" aria-hidden="true">LG</text>
        <text x="66" y="42"
          fontFamily="ui-sans-serif,system-ui,sans-serif"
          fontSize="25" fontWeight="900" letterSpacing="0.08em"
          fill={`url(#${textChrome})`} stroke="rgba(14,16,22,0.50)" strokeWidth="0.35">LG</text>
        <text x="66" y="42"
          fontFamily="ui-sans-serif,system-ui,sans-serif"
          fontSize="25" fontWeight="900" letterSpacing="0.08em"
          fill={`url(#${textHi})`} opacity="0.70" aria-hidden="true">LG</text>
      </g>
    </g>
  );
}


// ─── TRANE ───────────────────────────────────────────────────────────────────

/**
 * Trane — bold italic serif word in signature red (#D32F2F) lifted dramatically
 * off the white appliance-steel plate.  Layers:
 *   1. 14-step extruded shadow stack (ramping black→#D32F2F) → physical thickness
 *   2. Extra soft red cast shadow on the plate
 *   3. Main red fill with multi-stop gradient (highlight → mid → deep shadow)
 *   4. White top-edge specular bevel pass (studio light catching the letter ridges)
 */
function TraneWord({ uid }: { uid: string }) {
  const red       = `tr-red-${uid}`;
  const rimStroke = `tr-rim-${uid}`;

  // 7 shadows at [1,2,3,5,7,9,11]px — smooth ramp with no visible steps,
  // half the cost of the original 14-layer version.
  const extrusion = [
    "drop-shadow(1px 2px 0 rgba(70,5,5,1))",
    "drop-shadow(2px 3px 0 rgba(100,10,10,1))",
    "drop-shadow(3px 4px 0 rgba(125,15,15,1))",
    "drop-shadow(5px 6px 0 rgba(145,20,20,1))",
    "drop-shadow(7px 8px 0 rgba(155,25,25,1))",
    "drop-shadow(9px 10px 0 rgba(160,28,28,1))",
    "drop-shadow(11px 16px 18px rgba(0,0,0,0.44))",
  ].join(" ");

  const textProps = {
    x: "50%",
    y: "54%",
    dominantBaseline: "middle" as const,
    textAnchor: "middle" as const,
    fontFamily:
      '"Arial Black", "Helvetica Neue", "Helvetica", "Segoe UI", system-ui, sans-serif',
    fontSize: 40,
    fontWeight: 900,
    fontStyle: "normal" as const,
    letterSpacing: "-0.015em",
  };

  return (
    <g>
      <defs>
        {/* Main red — bright top, signature mid, deep bottom. The gradient
            itself handles the specular highlight (top stops) and shadow
            (bottom stops), eliminating the need for extra mix-blend text passes. */}
        <linearGradient id={red} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#ff8080" />
          <stop offset="12%"  stopColor="#ee3838" />
          <stop offset="45%"  stopColor="#d32f2f" />
          <stop offset="78%"  stopColor="#9a1414" />
          <stop offset="100%" stopColor="#5a0606" />
        </linearGradient>
        <linearGradient id={rimStroke} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.60)" />
          <stop offset="35%"  stopColor="rgba(140,10,10,0.15)" />
          <stop offset="100%" stopColor="rgba(40,0,0,0.45)" />
        </linearGradient>
      </defs>

      <g style={{ filter: extrusion }}>
        <text {...textProps} fill={`url(#${red})`} stroke={`url(#${rimStroke})`} strokeWidth={0.6}>
          TRANE
        </text>
      </g>
    </g>
  );
}

// ─── TEXTURES ────────────────────────────────────────────────────────────────

function TextureMegalife() {
  return (
    <>
      {/* Deep near-black — dark industrial metal base */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `linear-gradient(155deg, #1e2028 0%, #111318 45%, #080a0d 100%)`,
        }}
      />
      {/* Fine horizontal brushed-metal hairlines */}
      <div
        className="absolute inset-0 rounded-[inherit] opacity-[0.28]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.07) 0px,
            rgba(255,255,255,0.07) 0.8px,
            rgba(0,0,0,0.09) 0.8px,
            rgba(0,0,0,0.09) 1.8px,
            rgba(255,255,255,0.02) 1.8px,
            rgba(255,255,255,0.02) 2.6px
          )`,
        }}
      />
      {/* Warm red halo behind the icon */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `radial-gradient(ellipse 42% 60% at 22% 50%, rgba(190,20,40,0.22) 0%, rgba(120,10,20,0.08) 45%, transparent 70%)`,
        }}
      />
      {/* Directional light sweep top-left */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 38%, rgba(255,255,255,0) 62%)`,
        }}
      />
      {/* Bevel top/bottom + deep inner vignette */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_0_rgba(255,255,255,0.22),inset_0_-2px_0_rgba(0,0,0,0.85),inset_0_0_30px_rgba(0,0,0,0.40),inset_0_-30px_60px_rgba(0,0,0,0.80)]"
        aria-hidden
      />
    </>
  );
}

function TextureIngelec() {
  return (
    <>
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `linear-gradient(180deg, #e4e9ef 0%, #b9c2ce 45%, #8e98a8 100%)`,
        }}
      />
      <div
        className="absolute inset-0 rounded-[inherit] opacity-[0.45]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.22) 0px,
            rgba(255,255,255,0.05) 1px,
            rgba(0,0,0,0.06) 2px,
            rgba(255,255,255,0.08) 3px,
            rgba(0,0,0,0.04) 4px
          )`,
          backgroundSize: "5px 100%",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-12px_28px_rgba(0,0,0,0.18)]"
        aria-hidden
      />
    </>
  );
}

function TextureLg() {
  return (
    <>
      {/* Obsidian radial base — charcoal crown, pure black floor */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `radial-gradient(ellipse 160% 110% at 50% -5%, #2c3040 0%, #181a20 28%, #0c0d12 58%, #000000 100%)`,
        }}
      />
      {/* Micro brushed hairlines — subtle, adds material depth */}
      <div
        className="absolute inset-0 rounded-[inherit] opacity-[0.15]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.06) 0px,
            rgba(255,255,255,0.06) 0.6px,
            rgba(0,0,0,0.10) 0.6px,
            rgba(0,0,0,0.10) 1.4px,
            rgba(255,255,255,0.02) 1.4px,
            rgba(255,255,255,0.02) 2.4px
          )`,
        }}
      />
      {/* LG signature red glow — radiates from behind the sphere */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `radial-gradient(ellipse 65% 75% at 45% 52%, rgba(185,0,52,0.22) 0%, rgba(120,0,28,0.08) 42%, transparent 70%)`,
        }}
      />
      {/* Top-left specular sheen — studio light hitting the plate */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `linear-gradient(128deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 38%, rgba(255,255,255,0) 62%)`,
        }}
      />
      {/* Bevel rim + deep bottom vignette (plate thickness illusion) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.26),inset_0_-1.5px_0_rgba(0,0,0,0.95),inset_0_0_32px_rgba(0,0,0,0.55),inset_0_-28px_60px_rgba(0,0,0,0.90)]"
        aria-hidden
      />
    </>
  );
}

/**
 * Trane — premium "Appliance Steel" plate.  Layered material build:
 *   1. Cool white-to-silver metallic gradient (5-stop, slight blue cast)
 *   2. Fine horizontal brushed-metal hairlines (the signature of appliance steel)
 *   3. Top-left directional light sweep (studio spotlight)
 *   4. Subtle red halo behind the TRANE word (warms the plate, ties to logo)
 *   5. Crisp bevel: bright white top edge, dark bottom edge → plate thickness
 */
function TextureTrane() {
  return (
    <>
      {/* 1. Brushed-steel base — cool white with a touch of silver */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `linear-gradient(178deg, #ffffff 0%, #f6f7f9 22%, #e8ebef 55%, #d4d8df 85%, #c2c7d0 100%)`,
        }}
      />

      {/* 2. Horizontal brushed-metal hairlines (signature of brushed appliance steel) */}
      <div
        className="absolute inset-0 rounded-[inherit] opacity-[0.35]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.40) 0px,
            rgba(255,255,255,0.40) 0.6px,
            rgba(120,128,140,0.18) 0.6px,
            rgba(120,128,140,0.18) 1.4px,
            rgba(255,255,255,0.10) 1.4px,
            rgba(255,255,255,0.10) 2.4px
          )`,
        }}
      />

      {/* 3. Top-left studio light sweep across the plate */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `linear-gradient(125deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.10) 35%, rgba(255,255,255,0) 60%)`,
        }}
      />

      {/* 4. Subtle red halo behind the TRANE word — ties logo to plate, warms the white */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `radial-gradient(ellipse 55% 65% at 50% 55%, rgba(211,47,47,0.12) 0%, rgba(154,20,20,0.05) 45%, transparent 72%)`,
        }}
      />

      {/* 5. Bevel — bright top, dark bottom, soft inner vignette → plate thickness */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.95),inset_0_-1.5px_0_rgba(80,88,100,0.55),inset_0_0_28px_rgba(80,88,100,0.18),inset_0_-22px_44px_rgba(80,88,100,0.22)]"
        aria-hidden
      />
    </>
  );
}

// ─── EXPORT ──────────────────────────────────────────────────────────────────

export function IndustrialBrandBadge({
  brand,
  className,
}: {
  brand: Brand;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");

  const texture =
    brand === "MEGALIFE" ? (
      <TextureMegalife />
    ) : brand === "INGELEC" ? (
      <TextureIngelec />
    ) : brand === "LG" ? (
      <TextureLg />
    ) : brand === "TRANE" ? (
      <TextureTrane />
    ) : null;

  const logo = (() => {
    switch (brand) {
      case "MEGALIFE":
        return (
          <svg
            viewBox="0 0 280 68"
            overflow="visible"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <MegalifeMark uid={uid} />
            <MegalifeWord uid={uid} />
            <MegalifeShine uid={uid} />
          </svg>
        );
      case "INGELEC":
        return (
          <svg
            viewBox="4 4 188 62"
            overflow="visible"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <IngelecLockup uid={uid} />
          </svg>
        );
      case "LG":
        return (
          <svg
            viewBox="-8 0 118 62"
            overflow="visible"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <LgMark uid={uid} />
          </svg>
        );
      case "TRANE":
        return (
          <svg
            viewBox="0 0 320 72"
            overflow="visible"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <TraneWord uid={uid} />
          </svg>
        );
      default:
        return null;
    }
  })();

  return (
    <div
      className={cn(
        "relative w-full max-w-full [transform-style:preserve-3d]",
        className,
      )}
      role="img"
      aria-label={brand}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border md:rounded-2xl",
          brand === "TRANE"
            ? "border-[#3b5998]/20 shadow-[0_8px_24px_rgba(14,22,42,0.35)]"
            : "border-[#2a3f6e]/25 shadow-[0_8px_24px_rgba(14,22,42,0.40)]",
          "[transform-style:preserve-3d]",
          "transition-transform duration-500 ease-out",
          "group-hover:will-change-transform",
          "group-hover:[transform:rotateX(-3deg)_rotateY(2deg)]",
        )}
      >
        {texture}

        <div
          className={cn(
            "relative z-10 flex aspect-[16/7] items-center justify-center px-6 md:px-8",
            "[transform-style:preserve-3d]",
            "transition-transform duration-500 ease-out",
            "group-hover:will-change-transform",
            "[transform:translate3d(0,0,6px)]",
            "group-hover:[transform:translate3d(0,0,44px)]",
          )}
        >
          {logo}
        </div>
      </div>
    </div>
  );
}
