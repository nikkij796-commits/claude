import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white/70 border border-black/5 shadow-sm ${className}`}>{children}</div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-sage text-white active:bg-[#7a9877]",
  secondary: "bg-sage-soft text-ink active:bg-[#cfe0cb]",
  ghost: "bg-transparent text-ink-soft active:bg-black/5",
  danger: "bg-clay-soft text-[#8a4a2a] active:bg-[#e8cbb0]",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium transition-colors disabled:opacity-40 ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ScreenHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="px-5 pt-6 pb-2">
      <h1 className="text-2xl font-semibold text-ink">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>}
    </div>
  );
}

export function Pill({
  active,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      className={`whitespace-nowrap shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active ? "bg-sage text-white" : "bg-white/70 text-ink-soft border border-black/5"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
