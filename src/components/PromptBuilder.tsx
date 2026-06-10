import { Fragment, useState } from "react";
import { Copy, Check } from "lucide-react";

export type BuilderField = { key: string; label: string; placeholder: string };

/**
 * template 안의 {key} 를 입력값으로 치환해 실시간 프롬프트를 만들어 줍니다.
 * 빈 칸은 [placeholder] 형태로 노랗게 보여줍니다.
 */
export function PromptBuilder({
  template,
  fields,
}: {
  template: string;
  fields: BuilderField[];
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const plain = fields.reduce(
    (acc, f) => acc.replaceAll(`{${f.key}}`, values[f.key]?.trim() || `[${f.placeholder}]`),
    template
  );

  // 화면 출력용: {key} 위치를 강조 렌더링
  const tokens = template.split(/(\{[a-zA-Z0-9_]+\})/g);

  return (
    <div>
      <div className="space-y-3">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-sm text-muted-foreground mb-1.5 font-medium">{f.label}</label>
            <input
              value={values[f.key] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2.5 text-foreground outline-none focus:border-primary"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-[#ff5ca8] bg-[#0a0c18] px-4 py-4 text-foreground leading-relaxed">
        {tokens.map((t, i) => {
          const m = t.match(/^\{([a-zA-Z0-9_]+)\}$/);
          if (m) {
            const v = values[m[1]]?.trim();
            const f = fields.find((x) => x.key === m[1]);
            return v ? (
              <span key={i} className="text-accent font-semibold">
                {v}
              </span>
            ) : (
              <span key={i} className="text-[#ffd166] font-bold">
                [{f?.placeholder ?? m[1]}]
              </span>
            );
          }
          return <Fragment key={i}>{t}</Fragment>;
        })}
      </div>

      <button
        onClick={() => {
          navigator.clipboard.writeText(plain);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "복사됨! 이제 Claude에게 붙여넣어 보세요" : "내 프롬프트 복사하기"}
      </button>
    </div>
  );
}
