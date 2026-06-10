import { useState } from "react";
import { Check, X } from "lucide-react";
import { confetti } from "@/lib/confetti";
import { cn } from "@/lib/utils";

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

export function Quiz({ data }: { data: QuizQuestion[] }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const answeredCount = Object.keys(picked).length;
  const correct = Object.entries(picked).filter(
    ([qi, oi]) => data[+qi].answer === oi
  ).length;
  const done = answeredCount === data.length;

  const pick = (qi: number, oi: number) => {
    if (picked[qi] !== undefined) return;
    const next = { ...picked, [qi]: oi };
    setPicked(next);
    if (Object.keys(next).length === data.length) {
      const c = Object.entries(next).filter(([q, o]) => data[+q].answer === o).length;
      if (c === data.length) setTimeout(() => confetti(), 150);
    }
  };

  return (
    <div className="space-y-6">
      {data.map((q, qi) => {
        const chosen = picked[qi];
        const answered = chosen !== undefined;
        return (
          <div key={qi}>
            <div className="font-semibold mb-3">
              <span className="text-accent font-mono mr-2">Q{qi + 1}</span>
              {q.q}
            </div>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isCorrect = oi === q.answer;
                const isChosen = chosen === oi;
                return (
                  <button
                    key={oi}
                    disabled={answered}
                    onClick={() => pick(qi, oi)}
                    className={cn(
                      "w-full text-left rounded-xl border px-4 py-3 transition-colors flex items-center justify-between gap-2",
                      !answered && "border-border hover:border-accent",
                      answered && isCorrect && "border-success bg-success/10",
                      answered && isChosen && !isCorrect && "border-destructive bg-destructive/10",
                      answered && !isChosen && !isCorrect && "border-border opacity-60"
                    )}
                  >
                    <span>{opt}</span>
                    {answered && isCorrect && (
                      <span className="text-success flex items-center gap-1 text-sm font-bold shrink-0">
                        <Check size={16} /> 정답
                      </span>
                    )}
                    {answered && isChosen && !isCorrect && (
                      <X size={16} className="text-destructive shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className="mt-2.5 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm">
                💡 {q.explain}
              </div>
            )}
          </div>
        );
      })}

      {done && (
        <div className="rounded-xl border border-border bg-secondary/40 px-4 py-4 text-center font-bold">
          {correct === data.length
            ? "🏆 만점이에요! 진짜 바이브코더 인정!"
            : correct / data.length >= 0.6
            ? `👍 ${data.length}문제 중 ${correct}개 정답! 잘했어요.`
            : `🌱 ${data.length}문제 중 ${correct}개 정답. 위로 올라가 다시 읽어봐요!`}
        </div>
      )}
    </div>
  );
}
