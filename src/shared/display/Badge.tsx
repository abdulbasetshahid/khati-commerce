type BadgeVariant = "default" | "success" | "warning" | "error";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-bg-secondary text-text-primary border-border",
  success: "bg-success text-text-inverse border-success",
  warning: "bg-warning/20 text-warning border-warning/40",
  error: "bg-error/20 text-error border-error/40",
};

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2 py-0.5 text-xs font-sans font-medium rounded-full border";
  const mergedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  return <span className={mergedClassName}>{children}</span>;
}
