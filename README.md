# 바이브코딩 교실 🚀 (React + shadcn + Tailwind + TypeScript)

중학생을 위한 AI 바이브코딩 입문 학습 사이트입니다.
차시(1·2·3)가 아니라 **주제별**로 나누어, 각 주제마다 직접 해보는 활동이 들어 있어요.

## 주제 구성

**시작하기**
1. 🚀 바이브코딩이란?
2. 🧰 도구 & 터미널 — *가상 터미널 실습*
3. 🛡️ Plan Mode로 안전하게 — *프롬프트 빌더 실습*

**만들고 공개하기**
4. 🎨 사이트 만들기
5. 🗄️ 데이터 & 사진 저장 (Supabase)
6. 🔑 보안: 키와 규칙 — *보안 퀴즈*
7. 🌍 인터넷에 배포 (Vercel)

**AI 고수되기**
8. 🧩 플러그인 · 스킬 · 훅 — *짝 맞추기 게임*
9. 🏗️ 하네스 엔지니어링 — *6축 카드 · 통합 퀴즈 · 체크리스트*

## 실행 방법

```bash
# 1) 의존성 설치 (처음 한 번)
npm install

# 2) 개발 서버 실행 → 브라우저에서 http://localhost:5173 열기
npm run dev

# 3) 배포용 빌드 (dist/ 폴더 생성)
npm run build
```

## 기술 스택 / 프로젝트 구조

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** (shadcn 호환 CSS 변수 테마, 다크 모드 기본)
- **framer-motion** — 인터랙티브 그리드 히어로 애니메이션
- **lucide-react** — 아이콘

```
src/
├── components/
│   ├── ui/
│   │   ├── the-infinite-grid.tsx   ← 제공받은 그리드 컴포넌트 (원본 유지)
│   │   └── demo.tsx
│   ├── GridBackground.tsx          ← 그리드 효과 재사용 래퍼 (히어로 배경)
│   ├── Terminal.tsx                ← 가상 터미널
│   ├── Quiz.tsx / MatchGame.tsx / PromptBuilder.tsx
│   ├── Checklist.tsx / AxisCards.tsx
│   └── Primitives.tsx              ← 카드·콜아웃·스텝 등 공용 UI
├── data/topics.tsx                 ← 주제별 콘텐츠 (여기서 내용 수정)
├── lib/utils.ts                    ← shadcn cn() 유틸
├── App.tsx                         ← 히어로 + 주제 네비 + 콘텐츠
└── index.css                       ← Tailwind + shadcn 테마 변수
```

> **왜 `components/ui` 폴더인가?** shadcn 규칙상 재사용 UI 컴포넌트는 `components/ui`에 둡니다.
> `components.json`의 alias(`@/components/ui`)와 일치해야 `npx shadcn add ...`로 컴포넌트를
> 추가할 때 올바른 위치에 설치되고, import 경로(`@/components/ui/...`)가 깨지지 않습니다.

## 내용 수정하기

대부분의 학습 내용은 [`src/data/topics.tsx`](src/data/topics.tsx) 한 파일에 모여 있습니다.
새 주제를 추가하려면 `TOPICS` 배열에 `{ id, icon, title, short, group, Content }` 객체를 하나 더 넣으면 됩니다.
