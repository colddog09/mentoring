const COLORS = ["#7c5cff", "#29e0d4", "#ff5ca8", "#ffd166", "#3ddc97"];

/** 화면에 색종이 효과를 터뜨립니다. */
export function confetti(x?: number, y?: number) {
  const ox = x ?? window.innerWidth / 2;
  const oy = y ?? window.innerHeight / 3;
  for (let i = 0; i < 28; i++) {
    const p = document.createElement("div");
    p.style.position = "fixed";
    p.style.left = ox + "px";
    p.style.top = oy + "px";
    p.style.zIndex = "9999";
    p.style.pointerEvents = "none";
    const size = 6 + Math.random() * 7;
    p.style.width = p.style.height = size + "px";
    p.style.background = COLORS[i % COLORS.length];
    p.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    document.body.appendChild(p);
    const ang = Math.random() * Math.PI * 2;
    const dist = 90 + Math.random() * 170;
    const dx = Math.cos(ang) * dist;
    const dy = Math.sin(ang) * dist - 60;
    p.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${dx}px, ${dy + 260}px) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      { duration: 1100 + Math.random() * 600, easing: "cubic-bezier(.2,.6,.3,1)" }
    );
    setTimeout(() => p.remove(), 1800);
  }
}
