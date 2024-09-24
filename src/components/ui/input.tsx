import * as React from 'react';

// Define a custom interface that extends React's InputHTMLAttributes
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// Create a forwardRef component with proper typing
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };