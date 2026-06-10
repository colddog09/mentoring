import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AXES = [
  { n: "AXIS 1", title: "구조", sub: "뭘 깔아두는가", detail: "폴더를 잘 정리해 두면 품질이 올라가요. docs/는 사람용 참고서, .claude/는 AI 설정. 분리해서 관리해요." },
  { n: "AXIS 2", title: "맥락", sub: "AI가 뭘 아는가", detail: "CLAUDE.md 파일에 프로젝트 정보를 적어두면 AI가 기억해요. 다 넣지 말고 필요한 것만 (Progressive Disclosure)." },
  { n: "AXIS 3", title: "계획", sub: "뭘 할지 정하는가", detail: "\"해줘\" 대신 \"같이 계획 세우자\". AI가 질문하면 사람이 답하고, 합의한 뒤 실행 → 성공률 쑥!" },
  { n: "AXIS 4", title: "실행", sub: "어떻게 시키는가", detail: "혼자(Single) → 부하 파견(Subagent) → 팀(Team). 일상 작업의 90%는 혼자로 충분해요." },
  { n: "AXIS 5", title: "검증", sub: "어떻게 믿는가", detail: "만든 AI랑 확인하는 AI를 분리해요. 자기가 만든 걸 자기가 평가하면 항상 \"잘했다\"고 하거든요!" },
  { n: "AXIS 6", title: "개선", sub: "어떻게 나아지는가", detail: "3번 반복하는 일 → Skill로 자동화. 3번 틀리는 실수 → Rule로 방지. 안 쓰는 건 치우기." },
];

export function AxisCards() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
      {AXES.map((a, i) => {
        const isOpen = open === i;
        return (
          <button
            key={i}
            onClick={() => setOpen(isOpen ? null : i)}
            className={cn(
              "text-left rounded-xl border p-4 transition-all",
              isOpen ? "border-primary bg-secondary" : "border-border hover:border-primary hover:-translate-y-0.5"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent">{a.n}</span>
              <ChevronDown size={16} className={cn("text-muted-foreground transition-transform", isOpen && "rotate-180")} />
            </div>
            <h4 className="text-lg font-bold mt-1">{a.title}</h4>
            <div className="text-xs text-muted-foreground">{a.sub}</div>
            {isOpen && <p className="text-sm text-foreground/80 mt-2.5">{a.detail}</p>}
          </button>
        );
      })}
    </div>
  );
}
