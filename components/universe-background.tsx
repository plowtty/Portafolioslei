"use client";

import { useEffect, useRef } from "react";

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

type ClickWave = {
  x: number;
  y: number;
  start: number;
};

type UniverseBackgroundProps = {
  intensity?: "normal" | "intense";
};

export function UniverseBackground({ intensity = "normal" }: UniverseBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    const canvas = canvasRef.current;
    if (!element || !canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let animationFrame = 0;
    let currentX = 0;
    let currentY = 0;
    let currentScroll = 0;
    let targetX = 0;
    let targetY = 0;
    let targetScroll = 0;

    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: false,
      boost: 0,
    };

    const clickWaves: ClickWave[] = [];
    const nodePoints: NodePoint[] = [];

    const isIntense = intensity === "intense";

    const baseNodeCount = () => {
      const multiplier = isIntense ? 1.24 : 1;
      if (window.innerWidth < 768) {
        return Math.round(42 * multiplier);
      }
      if (window.innerWidth < 1200) {
        return Math.round(60 * multiplier);
      }
      return Math.round(78 * multiplier);
    };

    const createNodes = () => {
      nodePoints.length = 0;
      const count = baseNodeCount();
      for (let index = 0; index < count; index += 1) {
        nodePoints.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * (isIntense ? 0.34 : 0.24),
          vy: (Math.random() - 0.5) * (isIntense ? 0.34 : 0.24),
          size: Math.random() * 1.8 + 1,
        });
      }
    };

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createNodes();
    };

    resizeCanvas();

    const updateTargetFromMouse = (event: MouseEvent) => {
      const offsetX = (event.clientX / window.innerWidth - 0.5) * 24;
      const offsetY = (event.clientY / window.innerHeight - 0.5) * 24;
      targetX = offsetX;
      targetY = offsetY;

      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      pointer.boost = Math.min(pointer.boost + 0.06, 1);
    };

    const updateTargetFromScroll = () => {
      targetScroll = window.scrollY * -0.06;
    };

    const addClickWave = (event: MouseEvent) => {
      clickWaves.push({ x: event.clientX, y: event.clientY, start: performance.now() });
      pointer.boost = 1;
    };

    const getWaveElapsed = (timestamp: number, start: number) => Math.max(0, (timestamp - start) / 1000);

    const drawPointerGlow = () => {
      const glowRadius = Math.max(0, (isIntense ? 165 : 140) + pointer.boost * (isIntense ? 95 : 70));
      const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, glowRadius);
      glow.addColorStop(0, `rgba(34, 211, 238, ${isIntense ? 0.36 : 0.28})`);
      glow.addColorStop(0.45, `rgba(59, 130, 246, ${isIntense ? 0.2 : 0.14})`);
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = glow;
      context.beginPath();
      context.arc(pointer.x, pointer.y, glowRadius, 0, Math.PI * 2);
      context.fill();
    };

    const drawClickWaves = (timestamp: number) => {
      for (let index = clickWaves.length - 1; index >= 0; index -= 1) {
        const wave = clickWaves[index];
        const elapsed = getWaveElapsed(timestamp, wave.start);
        const radius = elapsed * (isIntense ? 370 : 320);
        const alpha = Math.max(0, (isIntense ? 0.86 : 0.75) - elapsed * (isIntense ? 0.72 : 0.62));

        if (alpha <= 0) {
          clickWaves.splice(index, 1);
          continue;
        }

        context.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
        context.lineWidth = isIntense ? 1.9 : 1.4;
        context.beginPath();
        context.arc(wave.x, wave.y, radius, 0, Math.PI * 2);
        context.stroke();
      }
    };

    const updateNodes = () => {
      nodePoints.forEach((node) => {
        if (pointer.active) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const distance = Math.hypot(dx, dy) || 1;
          const attractionRadius = isIntense ? 220 : 180;
          if (distance < attractionRadius) {
            const force = (1 - distance / attractionRadius) * (isIntense ? 0.02 : 0.015);
            node.vx += (dx / distance) * force;
            node.vy += (dy / distance) * force;
          }
        }

        node.x += node.vx;
        node.y += node.vy;
        node.vx *= isIntense ? 0.981 : 0.985;
        node.vy *= isIntense ? 0.981 : 0.985;

        if (node.x < -20) node.x = window.innerWidth + 20;
        if (node.x > window.innerWidth + 20) node.x = -20;
        if (node.y < -20) node.y = window.innerHeight + 20;
        if (node.y > window.innerHeight + 20) node.y = -20;
      });
    };

    const drawNetwork = (timestamp: number) => {
      const maxDistance = isIntense ? 190 : 165;

      for (let i = 0; i < nodePoints.length; i += 1) {
        const nodeA = nodePoints[i];

        for (let j = i + 1; j < nodePoints.length; j += 1) {
          const nodeB = nodePoints[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.hypot(dx, dy);

          if (distance > maxDistance) {
            continue;
          }

          const proximity = 1 - distance / maxDistance;
          let waveBoost = 0;

          clickWaves.forEach((wave) => {
            const elapsed = getWaveElapsed(timestamp, wave.start);
            const ringRadius = elapsed * (isIntense ? 350 : 300);
            const distanceToWave = Math.hypot(nodeA.x - wave.x, nodeA.y - wave.y);
            const bandSize = isIntense ? 38 : 32;
            const band = Math.abs(distanceToWave - ringRadius);
            if (band < bandSize) {
              waveBoost = Math.max(waveBoost, (1 - band / bandSize) * (isIntense ? 1 : 0.85));
            }
          });

          const alpha = Math.min(isIntense ? 0.72 : 0.55, proximity * (isIntense ? 0.4 : 0.32) + waveBoost * 0.55);
          context.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          context.lineWidth = (isIntense ? 0.75 : 0.6) + proximity * (isIntense ? 0.78 : 0.6);
          context.beginPath();
          context.moveTo(nodeA.x, nodeA.y);
          context.lineTo(nodeB.x, nodeB.y);
          context.stroke();
        }
      }

      nodePoints.forEach((node) => {
        const distanceToPointer = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        const pointerInfluence = Math.max(0, 1 - distanceToPointer / (isIntense ? 170 : 150));

        let waveNodeBoost = 0;
        clickWaves.forEach((wave) => {
          const elapsed = getWaveElapsed(timestamp, wave.start);
          const ringRadius = elapsed * (isIntense ? 350 : 300);
          const distanceToWave = Math.hypot(node.x - wave.x, node.y - wave.y);
          const bandSize = isIntense ? 34 : 28;
          const band = Math.abs(distanceToWave - ringRadius);
          if (band < bandSize) {
            waveNodeBoost = Math.max(waveNodeBoost, (1 - band / bandSize) * 0.95);
          }
        });

        const glowStrength = Math.min(1, pointerInfluence * (isIntense ? 1.05 : 0.9) + waveNodeBoost + pointer.boost * (isIntense ? 0.28 : 0.18));
  const radius = Math.max(0, node.size + glowStrength * (isIntense ? 3 : 2.4));

        context.fillStyle = `rgba(186, 230, 253, ${0.45 + glowStrength * 0.5})`;
        context.beginPath();
        context.arc(node.x, node.y, radius, 0, Math.PI * 2);
        context.fill();

        if (glowStrength > 0.45) {
          context.fillStyle = `rgba(34, 211, 238, ${(isIntense ? 0.22 : 0.18) + glowStrength * (isIntense ? 0.34 : 0.28)})`;
          context.beginPath();
          context.arc(node.x, node.y, Math.max(0, radius * 2.2), 0, Math.PI * 2);
          context.fill();
        }
      });
    };

    const render = (timestamp: number) => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      currentScroll += (targetScroll - currentScroll) * 0.08;
      pointer.boost *= isIntense ? 0.99 : 0.985;

      element.style.setProperty("--parallax-x", `${currentX.toFixed(2)}px`);
      element.style.setProperty("--parallax-y", `${currentY.toFixed(2)}px`);
      element.style.setProperty("--parallax-scroll", `${currentScroll.toFixed(2)}px`);

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      updateNodes();
      drawPointerGlow();
      drawClickWaves(timestamp);
      drawNetwork(timestamp);

      animationFrame = window.requestAnimationFrame(render);
    };

    updateTargetFromScroll();
    animationFrame = window.requestAnimationFrame(render);

    window.addEventListener("mousemove", updateTargetFromMouse, { passive: true });
    window.addEventListener("scroll", updateTargetFromScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("click", addClickWave, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", updateTargetFromMouse);
      window.removeEventListener("scroll", updateTargetFromScroll);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("click", addClickWave);
    };
  }, [intensity]);

  return (
    <div ref={containerRef} aria-hidden="true" className="universe-bg">
      <canvas ref={canvasRef} className="universe-canvas" />
      <div className="universe-nebula" />
      <div className="universe-aurora" />
      <div className="universe-grid" />
      <div className="universe-grain" />
      <div className="universe-vignette" />
    </div>
  );
}
