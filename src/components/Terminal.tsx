import { useRef, useState } from "react";
import { confetti } from "@/lib/confetti";

type Line = { text: string; cls: "out" | "err" | "ok" | "cmd" };

const HINTS = ["pwd", "ls", "mkdir ~/my-first-vibe", "cd ~/my-first-vibe", "claude", "clear", "help"];

/** 진짜 컴퓨터 걱정 없는 연습용 가상 터미널 */
export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { text: "💡 아래 입력창에 명령어를 쳐보세요. 막히면 help 입력!", cls: "ok" },
  ]);
  const [value, setValue] = useState("");
  const cwdRef = useRef("~");
  const dirsRef = useRef(new Set<string>(["~"]));
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, force] = useState(0);

  const push = (text: string, cls: Line["cls"]) => {
    setLines((p) => [...p, { text, cls }]);
    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    });
  };

  const normalize = (a: string) => {
    if (a === "~") return "~";
    if (a.startsWith("~/")) return a;
    return cwdRef.current === "~" ? "~/" + a : cwdRef.current + "/" + a;
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    push(`${cwdRef.current} % ${cmd}`, "cmd");
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ");
    const cwd = cwdRef.current;
    const dirs = dirsRef.current;

    switch (name) {
      case "pwd":
        push(cwd === "~" ? "/Users/me" : "/Users/me/" + cwd.replace("~/", ""), "out");
        break;
      case "ls":
        if (cwd === "~")
          push(
            [...dirs].filter((d) => d.startsWith("~/")).map((d) => d.replace("~/", "")).join("   ") ||
              "(폴더가 비어 있어요)",
            "out"
          );
        else push("index.html   style.css   script.js", "ok");
        break;
      case "mkdir":
        if (!arg) {
          push("mkdir: 폴더 이름을 알려주세요. 예) mkdir ~/my-first-vibe", "err");
          break;
        }
        dirs.add(normalize(arg));
        push(`📁 "${normalize(arg)}" 폴더를 만들었어요!`, "ok");
        break;
      case "cd":
        if (!arg || arg === "~") {
          cwdRef.current = "~";
          force((n) => n + 1);
          break;
        }
        if (dirs.has(normalize(arg))) {
          cwdRef.current = normalize(arg);
          force((n) => n + 1);
        } else push(`cd: "${arg}" 폴더가 없어요. 먼저 mkdir로 만들어 보세요!`, "err");
        break;
      case "claude":
        if (cwd === "~") push("⚠️  홈 폴더보다, 프로젝트 폴더로 cd 해서 켜는 게 좋아요!", "err");
        push("✨ Claude Code를 켜는 중...", "ok");
        push("🤖 안녕하세요! 무엇을 만들어 볼까요? (여기서부턴 진짜 Warp에서 해보세요!)", "ok");
        confetti();
        break;
      case "clear":
        setLines([]);
        break;
      case "help":
        push("써볼 수 있는 명령어: pwd · ls · mkdir ~/이름 · cd ~/이름 · claude · clear", "out");
        break;
      case "open":
      case "start":
        push("🌐 브라우저에서 사이트를 여는 흉내! (진짜로는 결과물이 짠 하고 떠요)", "ok");
        break;
      default:
        push(`'${name}' 명령어는 아직 몰라요. help 를 쳐보세요!`, "err");
    }
  };

  const color = (c: Line["cls"]) =>
    c === "err"
      ? "text-destructive"
      : c === "ok"
      ? "text-success"
      : c === "cmd"
      ? "text-foreground"
      : "text-foreground/80";

  return (
    <div>
      <div className="rounded-xl border border-border overflow-hidden bg-[#070910] font-mono text-sm">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0f1120] border-b border-border">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-muted-foreground text-xs">Warp — 연습용 터미널</span>
        </div>
        <div ref={bodyRef} className="p-4 h-[280px] overflow-y-auto space-y-0.5">
          {lines.map((l, i) => (
            <div key={i} className={`whitespace-pre-wrap break-all ${color(l.cls)}`}>
              {l.cls === "cmd" ? (
                <>
                  <span className="text-accent">{l.text.split(" % ")[0]} %</span>
                  {" " + l.text.split(" % ").slice(1).join(" % ")}
                </>
              ) : (
                l.text
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-4 pb-3.5">
          <span className="text-accent whitespace-nowrap">{cwdRef.current} %</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(value);
                setValue("");
              }
            }}
            placeholder="여기에 명령어를 치고 Enter!"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent border-none outline-none text-foreground font-mono"
          />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {HINTS.map((h) => (
          <button
            key={h}
            onClick={() => {
              setValue(h);
              inputRef.current?.focus();
            }}
            className="font-mono text-xs px-2.5 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
          >
            {h}
          </button>
        ))}
      </div>
    </div>
  );
}
