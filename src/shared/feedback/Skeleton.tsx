export interface SkeletonProps {
  className?: string;
  rounded?: boolean;
}

export function Skeleton({ className = "", rounded = true }: SkeletonProps) {
  const baseStyles = "bg-bg-secondary animate-pulse";
  const shapeStyles = rounded ? "rounded-md" : "";
  const mergedClassName = `${baseStyles} ${shapeStyles} ${className}`.trim();

  return <div className={mergedClassName} aria-hidden />;
}
