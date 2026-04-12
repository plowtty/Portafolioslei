"use client";

import { memo, useState } from "react";

import { UniverseBackground } from "@/components/universe-background";

function VisualEffectsControllerComponent() {
  const [mode, setMode] = useState<"normal" | "intense">("normal");

  const isIntense = mode === "intense";

  return (
    <>
      <UniverseBackground intensity={mode} />
      <button
        type="button"
        onClick={() => setMode(isIntense ? "normal" : "intense")}
        className="fixed right-4 top-20 z-40 rounded-full border border-cyan-300/35 bg-slate-950/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-200 backdrop-blur-md transition hover:border-cyan-200 hover:text-cyan-100"
        aria-label={`Cambiar a modo ${isIntense ? "normal" : "intenso"}`}
      >
        FX · {isIntense ? "Intenso" : "Normal"}
      </button>
    </>
  );
}

export const VisualEffectsController = memo(VisualEffectsControllerComponent);
