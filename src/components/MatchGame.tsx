import { useMemo, useState } from "react";
import { confetti } from "@/lib/confetti";
import { cn } from "@/lib/utils";

type Cell = { id: number; text: string; side: "L" | "R" };

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function MatchGame({
  pairs,
  leftLabel = "단어",
  rightLabel = "뜻",
}: {
  pairs: [string, string][];
  leftLabel?: string;
  rightLabel?: string;
}) {
  const lefts = useMemo(() => shuffle(pairs.map((p, i) => ({ id: i, text: p[0], side: "L" as const }))), [pairs]);
  const rights = useMemo(() => shuffle(pairs.map((p, i) => ({ id: i, text: p[1], side: "R" as const }))), [pairs]);

  const [selected, setSelected] = useState<Cell | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState("짝을 맞춰보세요!");

  const key = (c: Cell) => c.side + c.id;

  const click = (c: Cell) => {
    if (matched.has(c.id)) return;
    if (!selected) return setSelected(c);
    if (selected.side === c.side) return setSelected(c);

    if (selected.id === c.id) {
      const next = new Set(matched).add(c.id);
      setMatched(next);
      setSelected(null);
      if (next.size === pairs.length) {
        setStatus("🎉 전부 맞혔어요! 완벽해요!");
        setTimeout(() => confetti(), 100);
      } else {
        setStatus(`좋아요! ${next.size} / ${pairs.length} 짝 완성`);
      }
    } else {
      const w = new Set([key(selected), key(c)]);
      setWrong(w);
      setStatus("음, 짝이 아니에요. 다시 골라봐요!");
      const prev = selected;
      setSelected(null);
      setTimeout(() => setWrong(new Set()), 420);
      void prev;
    }
  };

  const Item = ({ c }: { c: Cell }) => {
    const isMatched = matched.has(c.id);
    const isSelected = selected && key(selected) === key(c);
    const isWrong = wrong.has(key(c));
    return (
      <button
        onClick={() => click(c)}
        disabled={isMatched}
        className={cn(
          "w-full text-left rounded-xl border px-4 py-3.5 mb-2.5 text-sm transition-colors",
          "border-border hover:border-accent",
          isSelected && "border-primary bg-secondary ring-2 ring-primary/40",
          isMatched && "border-success bg-success/10 opacity-60 cursor-default",
          isWrong && "border-destructive animate-shake"
        )}
      >
        {c.text}
      </button>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <h4 className="text-center text-muted-foreground text-sm mb-2.5">{leftLabel}</h4>
          {lefts.map((c) => (
            <Item key={key(c)} c={c} />
          ))}
        </div>
        <div>
          <h4 className="text-center text-muted-foreground text-sm mb-2.5">{rightLabel}</h4>
          {rights.map((c) => (
            <Item key={key(c)} c={c} />
          ))}
        </div>
      </div>
      <p
        className={cn(
          "text-center mt-3 font-bold",
          matched.size === pairs.length ? "text-success" : "text-muted-foreground"
        )}
      >
        {status}
      </p>
    </div>
  );
}
