import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary font-sans"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-3 py-2.5 text-sm font-sans text-text-primary bg-bg-primary border rounded-md transition-colors placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-border-focus/30 focus:border-border-focus disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? "border-error" : "border-border"
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-error font-sans">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
