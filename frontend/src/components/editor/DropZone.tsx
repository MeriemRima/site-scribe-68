import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onDrop: (event: React.DragEvent) => void;
  children: ReactNode;
  className?: string;
}

export const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(
  ({ onDrop, children, className, ...props }, ref) => {
    const handleDragOver = (event: React.DragEvent) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (event: React.DragEvent) => {
      event.preventDefault();
      onDrop(event);
    };

    return (
      <div
        ref={ref}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "transition-colors duration-200 rounded-lg",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropZone.displayName = "DropZone";