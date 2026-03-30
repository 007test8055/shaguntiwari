import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassPanel({ children, className, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-2xl p-6 relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Refraction effect overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function GlassButton({
  children,
  className,
  ...props
}: GlassButtonProps) {
  return (
    <button
      className={cn(
        "glass-button px-6 py-3 rounded-full font-display text-sm tracking-wide",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
