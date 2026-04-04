"use client";
import { ReactNode, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ButtonRipple = ({
  children,
  className,
  variant = "primary", // 'primary' or 'secondary'
  fullWidth = false,
}: {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const variants = {
    primary: "bg-amber-500! text-white! border-amber-500! hover:bg-white! hover:text-black!",

    secondary: "bg-amber-50! text-amber-700! border-amber-200! hover:bg-amber-500!",
  };

  const rippleColors = {
    primary: "bg-white/20", // softer ripple instead of solid white
    secondary: "bg-amber-500/20", // subtle amber instead of strong fill
  };

  const textColors = {
    primary: "group-hover:text-black",
    secondary: "group-hover:text-white", // slightly darker for contrast
  };

  return (
    <Button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      variant="outline"
      className={cn(
        "relative overflow-hidden group rounded-[50]! border transition-all duration-300",
        variants[variant],
        fullWidth && "w-full",
        className,
      )}
    >
      {/* Ripple Element */}
      <span
        className={cn(
          "absolute w-10 h-10 rounded-full scale-0 transition-transform duration-700 ease-in-out group-hover:scale-[15] pointer-events-none",
          rippleColors[variant],
        )}
        style={{ left: pos.x - 20, top: pos.y - 20 }}
      />

      {/* Button Content */}
      <span
        className={cn(
          "relative flex z-10 transition-colors duration-500 pointer-events-none items-center",
          textColors[variant],
        )}
      >
        {children}
      </span>
    </Button>
  );
};

export default ButtonRipple;
