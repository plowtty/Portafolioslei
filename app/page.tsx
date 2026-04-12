import { PortfolioShell } from "@/components/portfolio-shell";
import { VisualEffectsController } from "@/components/visual-effects-controller";

export default function Home() {
  return (
    <>
      <VisualEffectsController />
      <PortfolioShell />
    </>
  );
}
