"use client";

/** Ambient radial glow blobs + gradient edge fades — purely decorative. */
export function HeroGlowBlobs() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {/* Left-side violet glow */}
      <div
        className="absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full animate-glow"
        style={{ background: "radial-gradient(ellipse at center, rgba(111,66,212,0.12) 0%, transparent 70%)" }}
      />
      {/* Centre-right cyan glow */}
      <div
        className="absolute right-1/4 top-1/3 w-[400px] h-[400px] rounded-full animate-glow"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,201,232,0.07) 0%, transparent 70%)", animationDelay: "2s" }}
      />
      {/* Edge fades */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-linear-to-t from-bg to-transparent" />
      <div className="absolute top-0 inset-x-0 h-20 bg-linear-to-b from-bg to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[55%] bg-linear-to-r from-bg via-bg/80 to-transparent" />
    </div>
  );
}

/** Rotated year label on the far right — visible on xl screens only. */
export function HeroVerticalLabel() {
  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center gap-3">
      <span
        className="text-white/20 text-[9px] font-dm tracking-[0.3em] uppercase"
        style={{ writingMode: "vertical-rl" }}
      >
        Product Manager - {new Date().getFullYear()}
      </span>
      <div className="w-px h-16 bg-linear-to-b from-white/20 to-transparent" />
    </div>
  );
}
