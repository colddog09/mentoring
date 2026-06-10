import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { confetti } from "@/lib/confetti";
import { cn } from "@/lib/utils";

export function Checklist({ items, storageKey }: { items: string[]; storageKey: string }) {
  const [done, setDone] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("vibe-check-" + storageKey) || "[]");
      setDone(new Set(saved));
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  const toggle = (i: number) => {
    const next = new Set(done);
    next.has(i) ? next.delete(i) : next.add(i);
    setDone(next);
    localStorage.setItem("vibe-check-" + storageKey, JSON.stringify([...next]));
    if (next.size === items.length) confetti();
  };

  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => {
        const isDone = done.has(i);
        return (
          <li
            key={i}
            onClick={() => toggle(i)}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors",
              isDone ? "border-success/40 bg-success/10" : "border-border hover:border-accent"
            )}
          >
            <span
              className={cn(
                "shrink-0 w-6 h-6 rounded-md border-2 grid place-items-center transition-colors",
                isDone ? "bg-success border-success text-success-foreground" : "border-muted-foreground"
              )}
            >
              {isDone && <Check size={14} strokeWidth={3} />}
            </span>
            <span
              className={cn(isDone && "line-through text-muted-foreground")}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          </li>
        );
      })}
    </ul>
  );
}
