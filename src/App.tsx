import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Rocket, Sparkles } from "lucide-react";
import { GridBackground } from "@/components/GridBackground";
import { TOPICS, GROUPS } from "@/data/topics";
import { cn } from "@/lib/utils";

export default function App() {
  const [active, setActive] = useState(0);
  const [interact, setInteract] = useState(0);
  const learnRef = useRef<HTMLDivElement>(null);
  const contentTopRef = useRef<HTMLDivElement>(null);

  const topic = TOPICS[active];
  const Content = topic.Content;

  // 주제 그룹별로 묶기
  const grouped = useMemo(
    () => GROUPS.map((g) => ({ group: g, items: TOPICS.map((t, i) => ({ t, i })).filter((x) => x.t.group === g) })),
    []
  );

  // 주제가 바뀌면 콘텐츠 상단으로 스크롤 (단, 첫 로드 시에는 히어로를 보여주기 위해 스크롤하지 않음)
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    contentTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [active]);

  const scrollToLearn = () => learnRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ───────── 히어로: the-infinite-grid UI ───────── */}
      <GridBackground className="h-screen flex flex-col items-center justify-center" reveal={320}>
        <div className="flex flex-col items-center text-center px-4 max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[3px] uppercase text-accent border border-border bg-card/70 px-4 py-1.5 rounded-full backdrop-blur">
            <Sparkles size={13} /> Vibe Coding · For Teens
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">
            바이브코딩 교실{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">🚀</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            코드 한 줄 안 치고, AI랑 같이 진짜 사이트를 만든다. <br />
            커서를 움직여 보세요 — 배경 그리드가 살아 움직여요.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={scrollToLearn}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-all shadow-md active:scale-95"
            >
              <Rocket size={18} /> 배우러 가기
            </button>
            <button
              onClick={() => setInteract((c) => c + 1)}
              className="px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-md hover:bg-secondary/80 transition-all active:scale-95"
            >
              눌러보기 ({interact})
            </button>
          </div>
          <button onClick={scrollToLearn} className="mt-6 text-muted-foreground hover:text-foreground transition-colors animate-bounce">
            <ArrowDown />
          </button>
        </div>
      </GridBackground>

      {/* ───────── 학습 영역 ───────── */}
      <div ref={learnRef} className="relative">
        {/* 주제 네비게이션 (상단 고정) */}
        <nav className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-lg">
          <div className="max-w-5xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-lg">🚀</span>
              <b className="text-sm">바이브코딩 교실</b>
              <span className="text-xs text-muted-foreground font-mono">· 주제별 학습</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {grouped.map(({ group, items }) => (
                <div key={group} className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/70 shrink-0">
                    {group}
                  </span>
                  {items.map(({ t, i }) => (
                    <button
                      key={t.id}
                      onClick={() => setActive(i)}
                      className={cn(
                        "shrink-0 text-sm rounded-full px-3.5 py-1.5 border transition-colors flex items-center gap-1.5",
                        i === active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-accent"
                      )}
                    >
                      <span>{t.icon}</span>
                      {t.title}
                    </button>
                  ))}
                  <span className="w-px h-5 bg-border shrink-0 last:hidden" />
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* 콘텐츠 */}
        <main className="max-w-3xl mx-auto px-4 py-12">
          <div ref={contentTopRef} className="scroll-mt-32" />
          <div className="flex items-center gap-3 mb-8">
            <div className="text-4xl">{topic.icon}</div>
            <div>
              <div className="font-mono text-xs text-accent uppercase tracking-wider">
                {topic.group} · {active + 1} / {TOPICS.length}
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{topic.title}</h1>
            </div>
          </div>

          <Content />

          {/* 이전 / 다음 주제 */}
          <div className="mt-12 grid grid-cols-2 gap-3">
            <button
              disabled={active === 0}
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              className="text-left rounded-xl border border-border p-4 hover:border-primary disabled:opacity-30 disabled:hover:border-border transition-colors"
            >
              <div className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                <ArrowLeft size={12} /> 이전 주제
              </div>
              <div className="font-bold mt-1 truncate">{active > 0 ? TOPICS[active - 1].title : "—"}</div>
            </button>
            <button
              disabled={active === TOPICS.length - 1}
              onClick={() => setActive((a) => Math.min(TOPICS.length - 1, a + 1))}
              className="text-right rounded-xl border border-border p-4 hover:border-primary disabled:opacity-30 disabled:hover:border-border transition-colors"
            >
              <div className="font-mono text-xs text-muted-foreground flex items-center justify-end gap-1">
                다음 주제 <ArrowRight size={12} />
              </div>
              <div className="font-bold mt-1 truncate">
                {active < TOPICS.length - 1 ? TOPICS[active + 1].title : "—"}
              </div>
            </button>
          </div>
        </main>

        <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
          <p>바이브코딩 교실 · 중학생을 위한 AI 코딩 입문 · Made by DoRm 홍창욱 쌤</p>
        </footer>
      </div>
    </div>
  );
}
