import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "default" | "neon"
}

export function GlassCard({ children, className, variant = "default", ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]",
        variant === "neon" && "hover:shadow-[0_0_30px_-5px_var(--primary)] border-primary/20",
        className
      )}
      {...props}
    >
      {variant === "neon" && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      )}
      {children}
    </div>
  )
}
