import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-xs tracking-[2px] text-accent uppercase">{children}</div>
  );
}

export function SectionTitle({ kicker, title, desc }: { kicker?: string; title: string; desc?: React.ReactNode }) {
  return (
    <div className="mb-7">
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1.5">{title}</h2>
      {desc && <p className="text-muted-foreground max-w-2xl mt-2.5 leading-relaxed">{desc}</p>}
    </div>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5", className)}>{children}</div>
  );
}

export function InfoCard({ icon, title, children, className }: { icon?: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <Card className={className}>
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <h3 className="text-lg font-bold mb-1.5">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{children}</p>
    </Card>
  );
}

export function Callout({
  variant = "info",
  children,
}: {
  variant?: "info" | "warn" | "danger";
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-primary/40 bg-primary/10",
    warn: "border-[#ffd166]/40 bg-[#ffd166]/10 text-[#ffe3a3]",
    danger: "border-destructive/40 bg-destructive/10 text-[#ffc0c0]",
  }[variant];
  return <div className={cn("rounded-xl border px-4 py-3.5 text-sm leading-relaxed", styles)}>{children}</div>;
}

export function VS({ left, right, mid = "VS" }: { left: React.ReactNode; right: React.ReactNode; mid?: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
      {left}
      <div className="hidden md:grid place-items-center font-extrabold text-muted-foreground">{mid}</div>
      {right}
    </div>
  );
}

export function VSCard({
  tone,
  title,
  children,
}: {
  tone: "bad" | "good" | "neutral";
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  const border =
    tone === "bad" ? "border-destructive/40 bg-destructive/[0.06]" : tone === "good" ? "border-success/40 bg-success/[0.06]" : "border-border";
  return (
    <div className={cn("rounded-xl border p-4", border)}>
      <h4 className="font-bold mb-1.5">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

export function Step({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3.5 mb-2">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center font-extrabold text-white shadow-lg">
          {num}
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="text-muted-foreground text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export function PromptCard({ tag = "PROMPT 예시", children }: { tag?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border border-l-4 border-l-[#ff5ca8] bg-gradient-to-b from-[#15183a] to-[#101227] px-4 py-3.5">
      <div className="font-mono text-[11px] tracking-wide text-[#ff5ca8]">{tag}</div>
      <div className="mt-1.5 text-foreground text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

export function Check_({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-success/30 bg-success/[0.08] px-4 py-3 text-sm text-[#b8f3d6]">
      ✅ {children}
    </div>
  );
}

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-xl border border-border bg-[#0a0c18] font-mono text-sm text-[#d6dbff] px-4 py-3.5 overflow-x-auto">
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        }}
        className={cn(
          "absolute top-2.5 right-2.5 rounded-lg border px-2.5 py-1 text-xs transition-colors flex items-center gap-1",
          copied ? "border-success text-success" : "border-border text-muted-foreground hover:text-foreground"
        )}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? "복사됨" : "복사"}
      </button>
      <pre className="whitespace-pre-wrap pr-16">{code}</pre>
    </div>
  );
}

export function Activity({
  tag,
  title,
  desc,
  children,
}: {
  tag: string;
  title: string;
  desc?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-primary/70 bg-gradient-to-b from-[#15183a] to-[#11142b] p-6 shadow-2xl">
      <span className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-accent border border-border bg-card px-3 py-1.5 rounded-full mb-3">
        {tag}
      </span>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      {desc && <p className="text-muted-foreground mb-5 text-sm leading-relaxed">{desc}</p>}
      {children}
    </div>
  );
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="font-mono text-xs bg-secondary border border-border border-b-2 rounded px-1.5 py-0.5 text-foreground">
      {children}
    </kbd>
  );
}

export function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-[0.92em] bg-secondary/60 px-1.5 py-0.5 rounded text-accent">{children}</code>;
}
