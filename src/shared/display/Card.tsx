export interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

export function Card({
  className = "",
  children,
  hover = false,
}: CardProps) {
  const baseStyles =
    "bg-bg-primary border border-border rounded-lg shadow-sm";
  const hoverStyles = hover ? "transition-shadow hover:shadow-md" : "";
  const mergedClassName = `${baseStyles} ${hoverStyles} ${className}`.trim();

  return <div className={mergedClassName}>{children}</div>;
}
