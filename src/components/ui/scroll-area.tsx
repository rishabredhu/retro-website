import { forwardRef, ReactNode } from 'react';

interface ScrollAreaProps {
  children: ReactNode
  className?: string
}

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative overflow-auto ${className || ''}`}
      {...props}
    >
      <div className="h-full w-full">
        {children}
      </div>
    </div>
  );
});

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };