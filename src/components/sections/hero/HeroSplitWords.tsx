"use client";

interface SplitWordsProps {
  text: string;
  gradient?: boolean;
  className?: string;
}

/**
 * Wraps each word in overflow:hidden so GSAP can slide words up from below,
 * creating a masked reveal — each word appears to emerge from a slot.
 */
export function HeroSplitWords({ text, gradient = false, className = "" }: SplitWordsProps) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i + word + text}
          className="inline-block overflow-hidden py-[0.08em]"
          aria-hidden
        >
          <span className={`word inline-block ${gradient ? "gradient-text" : ""}`}>
            {word}
            {i < words.length - 1 && "\u00A0"}
          </span>
        </span>
      ))}
    </span>
  );
}
