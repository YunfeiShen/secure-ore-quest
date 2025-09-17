import { Card } from "@/components/ui/card";

export const GameHeader = () => {
  return (
    <Card className="pixel-border bg-gradient-to-r from-card via-secondary to-card p-6 text-center">
      <h1 className="pixel-font text-3xl md:text-4xl text-gold mb-2 glow-animation">
        SECRET MINING QUEST
      </h1>
      <p className="orbitron-font text-lg md:text-xl text-emerald font-bold tracking-wide">
        "Mine in Privacy, Earn in Public"
      </p>
      <div className="mt-4 flex justify-center space-x-4">
        <span className="ore-sparkle text-2xl">⛏️</span>
        <span className="ore-sparkle text-2xl">💎</span>
        <span className="ore-sparkle text-2xl">🟨</span>
        <span className="ore-sparkle text-2xl">🟩</span>
      </div>
    </Card>
  );
};