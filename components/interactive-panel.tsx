"use client";

import { CSSProperties, HTMLAttributes, ReactNode, useCallback, useState } from "react";

type InteractivePanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function InteractivePanel({ children, className = "", ...rest }: InteractivePanelProps) {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const rotateY = ((x - 50) / 50) * 2.8;
    const rotateX = ((50 - y) / 50) * 2.2;
    setPosition({ x, y });
    setTilt({ x: rotateX, y: rotateY });
  }, []);

  const handleLeave = useCallback(() => {
    setIsActive(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const style = {
    "--spot-x": `${position.x}%`,
    "--spot-y": `${position.y}%`,
    "--tilt-x": `${tilt.x.toFixed(2)}deg`,
    "--tilt-y": `${tilt.y.toFixed(2)}deg`,
  } as CSSProperties;

  return (
    <div
      {...rest}
      style={style}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      className={`interactive-panel ${isActive ? "interactive-panel--active" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
