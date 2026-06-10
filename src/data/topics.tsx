import { Terminal } from "@/components/Terminal";
import { Quiz } from "@/components/Quiz";
import { MatchGame } from "@/components/MatchGame";
import { PromptBuilder } from "@/components/PromptBuilder";
import { Checklist } from "@/components/Checklist";
import { AxisCards } from "@/components/AxisCards";
import {
  SectionTitle,
  InfoCard,
  Callout,
  VS,
  VSCard,
  Step,
  PromptCard,
  Check_,
  CodeBlock,
  Activity,
  Kbd,
  Code,
} from "@/components/Primitives";

export type Topic = {
  id: string;
  icon: string;
  title: string;
  short: string;
  group: string;
  Content: () => JSX.Element;
};

const grid3 = "grid grid-cols-1 md:grid-cols-3 gap-4";
const grid2 = "grid grid-cols-1 md:grid-cols-2 gap-4";

export const TOPICS: Topic[] = [
  /* ─────────────── 1. 바이브코딩이란? ─────────────── */
  {
    id: "intro",
    icon: "",
    title: "바이브코딩이란?",
    short: "AI랑 같이 만드는 새로운 코딩",
    group: "시작하기",
    Content: () => (
      <div className="space-y-6">
        <SectionTitle
          kicker="What is this"
          title="바이브코딩이 대체 뭐예요?"
          desc={
            <>
              옛날엔 사람이 프로그래밍 언어를 직접 외워서 한 글자씩 코드를 썼어요. 이제는{" "}
              <b className="text-foreground">AI(클로드 코드)</b>에게 우리말로 “이런 거 만들어줘”라고 하면 AI가
              코드를 대신 써줘요. 우리는 <b className="text-foreground">무엇을 만들지 정하고, 결과를 다듬는</b> 사람이
              되는 거예요.
            </>
          }
        />
        <div className={grid3}>
          <InfoCard title="말로 시킨다">
            “내 프로필 사이트 만들어줘”처럼 한국어로 부탁하면 AI가 코드를 만들어요.
          </InfoCard>
          <InfoCard title="안전하게">
            Plan Mode로 AI가 “이렇게 만들게요” 계획을 먼저 보여주고, 내가 OK해야 진행돼요.
          </InfoCard>
          <InfoCard title="세상에 공개">
            완성한 사이트를 인터넷에 올려서(배포) 친구·가족에게 링크로 자랑할 수 있어요.
          </InfoCard>
        </div>
        <Callout variant="info">
          <b>사람의 역할이 바뀌고 있어요.</b> “코드를 잘 짜는 사람”에서 “AI가 잘 일하도록 환경을 만드는 사람”으로요.
          이 교실에서 그 첫걸음을 떼봐요!
        </Callout>
      </div>
    ),
  },

  /* ─────────────── 2. 도구 & 터미널 ─────────────── */
  {
    id: "tools",
    icon: "",
    title: "도구 & 터미널",
    short: "Warp · Claude Code · 명령어 기초",
    group: "시작하기",
    Content: () => (
      <div className="space-y-6">
        <SectionTitle
          kicker="Concept · 도구"
          title="우리가 쓰는 도구 3총사"
          desc="바이브코딩은 사실 도구만 알면 절반은 끝나요. 딱 3개만 기억해요."
        />
        <div className={grid3}>
          <InfoCard title="① Warp (워프)">
            우리의 <b>작업 공간</b>. 명령어를 치는 터미널 + 코드 에디터 + 파일 목록이 한 앱에 다 들어있어요.
          </InfoCard>
          <InfoCard title="② Claude Code">
            우리말로 시키면 코드를 써주는 <b>AI 비서</b>. 터미널에서 <Kbd>claude</Kbd> 한 단어로 켜요.
          </InfoCard>
          <InfoCard icon="🛡️" title="③ Plan Mode">
            AI가 바로 만들지 않고 <b>계획부터</b> 보여주는 안전 모드. <Kbd>/plan</Kbd>으로 켜요.
          </InfoCard>
        </div>

        <SectionTitle kicker="Concept · 터미널" title="터미널? 그게 뭐예요?" desc="컴퓨터에게 글자로 명령을 내리는 검은 창이에요. 딱 3개만 알면 시작할 수 있어요." />
        <div className={grid3}>
          <InfoCard title="pwd"> “나 지금 <b>어느 폴더</b>에 있어?” 묻기. (print working directory)</InfoCard>
          <InfoCard title="mkdir"> “<b>새 폴더</b> 만들어!” — 예) <Code>mkdir ~/my-first-vibe</Code></InfoCard>
          <InfoCard title="cd"> “그 폴더 <b>안으로 들어가!</b>” — 예) <Code>cd ~/my-first-vibe</Code></InfoCard>
        </div>
        <Callout variant="info">
          <b><Code>~</Code>(틸드)</b>는 “내 홈 폴더”라는 뜻이에요. 그래서 <Code>~/my-first-vibe</Code>는 “홈 폴더 안의
          my-first-vibe 폴더”라는 뜻이 돼요.
        </Callout>

        <Activity
          tag="직접 해보기"
          title="가짜 터미널에서 명령어 연습하기"
          desc={
            <>
              진짜 컴퓨터가 망가질 걱정 없는 연습용 터미널이에요. ① <Code>pwd</Code> → ②{" "}
              <Code>mkdir ~/my-first-vibe</Code> → ③ <Code>cd ~/my-first-vibe</Code> → ④ <Code>claude</Code> 순서로
              쳐보세요!
            </>
          }
        >
          <Terminal />
        </Activity>
      </div>
    ),
  },

  /* ─────────────── 3. Plan Mode ─────────────── */
  {
    id: "plan",
    icon: "",
    title: "Plan Mode로 안전하게",
    short: "실행 전에 계획부터 보기",
    group: "시작하기",
    Content: () => (
      <div className="space-y-6">
        <SectionTitle kicker="Concept · 안전 모드" title="왜 Plan Mode를 쓸까?" />
        <VS
          left={
            <VSCard tone="bad" title="그냥 모드">
              AI가 시키자마자 바로 행동! 빠르지만 엉뚱한 방향으로 갈 수도 있어요.
            </VSCard>
          }
          right={
            <VSCard tone="good" title="Plan Mode">
              “이런 파일들을 이렇게 만들게요” 계획을 <b>글로 먼저</b> 보여줘요. 내가 읽고 OK하면 그때 진짜로 만들어요. 안전!
            </VSCard>
          }
        />
        <Callout variant="warn">
          <b>Plan Mode 켜는 법:</b> Mac은 <Kbd>Shift</Kbd>+<Kbd>Tab</Kbd> 두 번, Windows는 <Kbd>/plan</Kbd> 입력이
          가장 확실해요. 화면 아래에 <Code>⏸ plan mode on</Code>이 뜨면 성공!
        </Callout>

        <Activity
          tag="프롬프트 만들기"
          title="AI에게 시킬 '첫 한마디' 만들어 보기"
          desc="빈칸을 채우면 AI에게 보낼 멋진 부탁(프롬프트)이 완성돼요. 자유롭게 바꿔보세요!"
        >
          <PromptBuilder
            template="내가 좋아하는 {topic}을(를) 기록할 수 있는 간단한 웹페이지를 만들어줘. {fields}을(를) 적을 수 있게 해주고, 분위기는 {mood}(으)로 해줘. HTML·CSS·JS로 만들어줘."
            fields={[
              { key: "topic", label: "① 무엇을 기록하는 페이지?", placeholder: "예: 본 영화" },
              { key: "fields", label: "② 무엇을 적을 수 있게?", placeholder: "제목, 날짜, 별점, 한 줄 감상" },
              { key: "mood", label: "③ 어떤 분위기?", placeholder: "귀여운 파스텔톤" },
            ]}
          />
        </Activity>
      </div>
    ),
  },

  /* ─────────────── 4. 사이트 만들기 ─────────────── */
  {
    id: "build",
    icon: "",
    title: "사이트 만들기",
    short: "프로필 사이트를 말로 제작",
    group: "만들고 공개하기",
    Content: () => (
      <div className="space-y-6">
        <SectionTitle
          kicker="Hands-on"
          title="사이트 만들기 — 말로 시키는 순서"
          desc="아래는 진짜 Claude Code에서 하는 순서예요. 프롬프트는 복사해서 써도 돼요."
        />
        <Step num={1} title="어떤 사이트를 만들까 정하기">
          <p>정해진 틀은 없어요. 취미·작품·관심사·좋아하는 것 모음 등 자유롭게! 구체적일수록 멋진 사이트가 나와요.</p>
          <PromptCard>
            나만의 프로필 사이트를 만들고 싶어. 나는 [한 줄 자기소개]이고, [관심사/취미]를 좋아해. [소개, 갤러리, 링크 모음]
            섹션이 있으면 좋겠고, 분위기는 [다크 + 네온 포인트]로. HTML·CSS·JS 단일 페이지로 만들어줘.
          </PromptCard>
        </Step>
        <Step num={2} title="Plan Mode로 만들기">
          <p>
            <Code>/plan</Code>으로 계획 모드를 켜고 위 프롬프트를 보내요. AI가 계획을 보여주면 읽어보고{" "}
            <b className="text-foreground">Yes</b>로 승인!
          </p>
          <Check_>
            <b>확인:</b> <Code>index.html</Code>, <Code>style.css</Code>, <Code>script.js</Code> 같은 파일이 만들어졌으면
            성공!
          </Check_>
        </Step>
        <Step num={3} title="내 작품 열어보고 다듬기">
          <p>마음에 안 드는 부분은 디자이너에게 말하듯 계속 부탁하면 돼요.</p>
          <PromptCard>
            글씨가 너무 작아, 더 키워줘. 색감을 좀 더 차분하게. 맨 위에 큰 인사 문구(히어로)를 넣어줘. 모바일에서도 예쁘게
            보이게 해줘.
          </PromptCard>
          <CodeBlock code={"# Mac에서 결과 열기\nopen index.html\n\n# Windows에서 결과 열기\nstart index.html"} />
        </Step>
      </div>
    ),
  },

  /* ─────────────── 5. 데이터 & 사진 ─────────────── */
  {
    id: "data",
    icon: "",
    title: "데이터 & 사진 저장",
    short: "Supabase 서버 창고에 올리기",
    group: "만들고 공개하기",
    Content: () => (
      <div className="space-y-6">
        <SectionTitle
          kicker="Concept · 데이터베이스"
          title="사진은 어디에 저장될까?"
          desc="내 컴퓨터에만 있는 사진은 사이트를 인터넷에 올리면 안 보여요. 그래서 서버 창고(데이터베이스)에 올려둬야 어디서나 보여요."
        />
        <VS
          mid={">"}
          left={
            <VSCard tone="bad" title="내 컴퓨터에만 있는 사진">
              인터넷에 올리면 안 보여요. 나만 볼 수 있어요.
            </VSCard>
          }
          right={
            <VSCard tone="good" title="서버 창고(Supabase)에 올린 사진">
              인터넷 어디서나 주소(URL)로 보여요. 배포해도 그대로!
            </VSCard>
          }
        />
        <Callout variant="info">
          <b>Supabase(수파베이스)</b> = 무료로 쉽게 쓰는 서버 창고. 오늘은 사진을 올려두는 <b>Storage(스토리지)</b> 기능을
          써봐요.
        </Callout>
        <div className={grid3}>
          <InfoCard title="가입 + 프로젝트 생성">
            supabase.com 가입 후 New Project로 무료 프로젝트 생성 (이름·비밀번호 정하기).
          </InfoCard>
          <InfoCard title="Storage에 사진 업로드">
            왼쪽 Storage 메뉴에서 새 버킷(폴더) 만들기 후 넣고 싶은 사진 1장 업로드.
          </InfoCard>
          <InfoCard title="키 2가지 메모">
            Project URL(프로젝트 주소)와 anon(공개용) 키를 메모장에 복사해 둬요.
          </InfoCard>
        </div>
        <Callout variant="info">
          <b>MCP</b> = AI가 외부 서비스(Supabase 등)와 약속된 방식으로 대화하게 해주는 통로예요. DB는 한 번 잘못 건드리면
          위험해서, 매 작업마다 사람이 OK해야 실행돼요. (보안!)
        </Callout>
      </div>
    ),
  },

  /* ─────────────── 6. 보안 ─────────────── */
  {
    id: "security",
    icon: "",
    title: "보안: 키와 규칙",
    short: "공개 키 vs 비밀 키, RLS",
    group: "만들고 공개하기",
    Content: () => (
      <div className="space-y-6">
        <SectionTitle
          kicker="Security · 꼭 알아야 해요"
          title="키에는 두 종류가 있다"
          desc="“키(key)”는 창고 문을 여는 열쇠 같은 거예요. 그런데 두 종류를 절대 헷갈리면 안 돼요!"
        />
        <div className={grid2}>
          <InfoCard title="anon (공개) 키 — 안전" className="border-success/50">
            원래 <b>공개용</b>이에요. 사이트 코드에 들어가도 괜찮아요. 가게 출입문처럼 누구나 들어와 구경 OK.
          </InfoCard>
          <InfoCard title="service (비밀) 키 — 위험!" className="border-destructive/50">
            모든 잠금을 무시하는 <b>마스터키</b>예요. <b>절대로</b> 사이트 코드나 인터넷에 올리면 안 돼요!
          </InfoCard>
        </div>
        <Callout variant="info">
          <b>RLS(접근 규칙):</b> “누가 무엇을 읽고 쓸 수 있는지” 정하는 규칙. 사진 창고는{" "}
          <b>“누구나 보기는 OK, 올리고 지우는 건 나만”</b>으로 두면 안전해요. 이 규칙은 AI가 설정해 줘요.
        </Callout>

        <Activity tag="보안 퀴즈" title="이 행동, 안전할까 위험할까?" desc="키 보안은 진짜 중요해요. 아래 퀴즈로 확인해봐요!">
          <Quiz
            data={[
              {
                q: "anon(공개) 키를 사이트 코드에 넣었어요. 괜찮을까요?",
                options: ["괜찮다 — 원래 공개용 키니까", "큰일 났다 — 당장 지워야 한다"],
                answer: 0,
                explain: "anon 키는 원래 공개용이라 코드에 들어가도 안전해요. 접근 규칙(RLS)이 지켜주거든요.",
              },
              {
                q: "service(비밀) 키를 깃허브에 올렸어요. 어떻게 해야 할까요?",
                options: ["괜찮다, 그냥 둔다", "위험! 절대 공개하면 안 되는 마스터키다"],
                answer: 1,
                explain: "service 키는 모든 잠금을 무시하는 마스터키라 인터넷에 올리면 누구나 내 창고를 마음대로 할 수 있어요. 절대 금지!",
              },
              {
                q: "사진 창고의 안전한 접근 규칙(RLS)은?",
                options: ["누구나 보기 OK, 올리고 지우는 건 나만", "누구나 올리고 지울 수 있게"],
                answer: 0,
                explain: "읽기는 모두 허용하되, 올리고 지우는 권한은 나만 갖는 게 안전해요.",
              },
            ]}
          />
        </Activity>
      </div>
    ),
  },

  /* ─────────────── 7. 배포 ─────────────── */
  {
    id: "deploy",
    icon: "",
    title: "인터넷에 배포",
    short: "Vercel로 전 세계에 공개",
    group: "만들고 공개하기",
    Content: () => (
      <div className="space-y-6">
        <SectionTitle
          kicker="Concept · 배포"
          title="이제 전 세계에 공개! — 배포(Deploy)"
          desc="배포 = 내 사이트 파일을 인터넷 '서버'에 올리는 것. 그러면 나만의 주소가 생겨요."
        />
        <VS
          mid={">"}
          left={
            <VSCard tone="bad" title="지금 — 내 컴퓨터 안에만">
              <Code>file:///Users/me/...</Code> — 나만 볼 수 있어요.
            </VSCard>
          }
          right={
            <VSCard tone="good" title="배포 후 — Vercel">
              <Code>https://내이름.vercel.app</Code> — 친구·가족도 접속 가능!
            </VSCard>
          }
        />
        <Step num={9} title="“이 사이트 인터넷에 배포해줘”">
          <PromptCard tag="PROMPT">
            이 사이트를 Vercel로 인터넷에 배포해줘. Vercel CLI가 없으면 알아서 설치하고, GitHub 없이 바로 배포해줘. 끝나면
            접속 주소(URL)를 알려줘.
          </PromptCard>
          <p>
            사람이 할 일은 딱 2가지! ① 로그인 화면 뜨면 로그인 ② AI가 권한 물으면 <b className="text-foreground">Yes</b>{" "}
            승인.
          </p>
          <Check_>
            <b>확인:</b> 받은 URL을 <b>휴대폰</b>으로 열어서 사이트(+사진)가 뜨면 성공!
          </Check_>
        </Step>
        <Callout variant="info">
          <b>CLI vs MCP:</b> 배포는 위험도가 낮고 한 번에 끝나는 작업이라 <b>CLI</b>로 전역 권한을 줘요. 반대로 DB
          작업은 위험해서 <b>MCP</b>로 매번 승인받죠. 정반대 철학이에요!
        </Callout>
      </div>
    ),
  },

  /* ─────────────── 8. 플러그인·스킬·훅 ─────────────── */
  {
    id: "extend",
    icon: "",
    title: "플러그인 · 스킬 · 훅",
    short: "AI를 더 똑똑하게 만드는 도구",
    group: "AI 고수되기",
    Content: () => (
      <div className="space-y-6">
        <SectionTitle
          kicker="Concept 01"
          title="플러그인 vs 스킬"
          desc="AI를 더 똑똑하게 만드는 방법들. 헷갈리기 쉬우니 비유로 기억해요."
        />
        <VS
          mid="!="
          left={
            <VSCard tone="neutral" title="플러그인 = 공구함을 통째로 사 오기">
              기능 묶음을 통째로 설치. 마켓(앱스토어)에서 받고, 안에 여러 도구·스킬이 들어있어요.
            </VSCard>
          }
          right={
            <VSCard tone="neutral" title="스킬 = 공구함 속 사용 설명서">
              특정 작업을 잘하는 방법을 적어둔 매뉴얼. AI가 <b>필요할 때만</b> 꺼내 봐요. 평소엔 가벼워요.
            </VSCard>
          }
        />
        <div className={grid3}>
          <InfoCard title="Skill (스킬)">
            같은 작업을 <b>3번 반복</b>했다면 → Skill로 자동화. AI가 필요할 때 꺼내 봐요.
          </InfoCard>
          <InfoCard title="Rule (규칙)">
            AI가 같은 실수를 <b>3번</b> 했다면 → Rule로 막아요. “TODO 금지” 같은 한 줄.
          </InfoCard>
          <InfoCard title="Hook (훅)">
            스킬은 AI가 <b>판단해서</b> 쓰지만, 훅은 <b>무조건 자동</b> 실행돼요. 안전장치!
          </InfoCard>
        </div>

        <Activity tag="개념 짝 맞추기" title="이럴 땐 뭘 만들까?" desc="개념과 알맞은 비유/해결책을 짝지어 보세요.">
          <MatchGame
            leftLabel="개념 / 상황"
            rightLabel="비유 / 해결책"
            pairs={[
              ["플러그인", "기능을 통째로 설치하는 확장팩 (공구함)"],
              ["스킬", "필요할 때만 꺼내 보는 사용 설명서"],
              ["같은 작업 3번 반복", "→ Skill로 자동화"],
              ["같은 실수 3번", "→ Rule로 막기"],
              ["위험한 명령 무조건 차단", "→ Hook 만들기"],
            ]}
          />
        </Activity>
      </div>
    ),
  },

  /* ─────────────── 9. 하네스 엔지니어링 ─────────────── */
  {
    id: "harness",
    icon: "",
    title: "하네스 엔지니어링",
    short: "AI가 잘 일하는 환경 설계",
    group: "AI 고수되기",
    Content: () => (
      <div className="space-y-6">
        <SectionTitle
          kicker="Why harness"
          title=”해줘 vs 환경을 만들어줘”
          desc="같은 AI라도, 어떻게 일을 시키느냐에 따라 결과가 완전히 달라져요. 이게 진짜 고수의 비밀!"
        />
        <p>나쁜 방식: AI가 만듦 - 아닌데 - 다시 시킴 - 시간만 날림.</p>
        <p>좋은 방식: AI가 일관되게 좋은 결과를 내요. 한 번 만들어두면 계속 편해요.</p>
        <Callout variant=”info”>
          모델을 바꿔서 5% 좋아지는 것보다, <b>환경(하네스)을 설계해서 15% 좋아지는 게</b> 더 현실적이다.
        </Callout>

        <SectionTitle kicker="Framework" title="하네스의 6가지 축" desc="좋은 환경은 이 6가지로 이루어져요. 카드를 눌러 설명을 펼쳐보세요!" />
        <AxisCards />

        <SectionTitle kicker="Karpathy" title="카파시 4원칙 — 65줄이 세상을 바꿨다" desc="단순함이 미덕이 아니라, 단순함이 작동의 조건이다." />
        <div className={grid2}>
          <InfoCard title="① 코딩 전에 생각하기">가정하지 말고 물어봐. 해석이 여러 개면 전부 보여줘.</InfoCard>
          <InfoCard title="② 단순함이 먼저">최소 코드, 추측 없음. 시키지 않은 기능 추가 금지.</InfoCard>
          <InfoCard title="③ 딱 그것만 고치기">내가 만진 것만 바꿔. 옆 코드는 건드리지 마.</InfoCard>
          <InfoCard title="④ 목표로 일하기">성공 기준을 정하고 반복. “테스트 통과시켜”처럼 명확하게.</InfoCard>
        </div>

        <Activity tag="통합 퀴즈" title="전 주제 복습 퀴즈" desc="지금까지 배운 내용이 다 섞여 나와요. 만점에 도전!">
          <Quiz
            data={[
              {
                q: "하네스 엔지니어링이란?",
                options: ["AI 모델을 직접 만드는 것", "AI가 일을 잘하도록 환경을 설계하는 것", "코드를 한 글자씩 외우는 것"],
                answer: 1,
                explain: "하네스 엔지니어링은 AI가 일관되게 좋은 결과를 내도록 작업 환경을 설계하는 것이에요.",
              },
              {
                q: "같은 작업을 3번 반복했다면 무엇을 만들까요?",
                options: ["Rule", "Skill", "Hook"],
                answer: 1,
                explain: "3번 반복 → Skill로 자동화! (3번 틀리면 → Rule로 방지)",
              },
              {
                q: "사이트 코드에 넣어도 괜찮은 키는?",
                options: ["service(비밀) 키", "anon(공개) 키"],
                answer: 1,
                explain: "anon은 공개용이라 안전, service는 마스터키라 절대 공개 금지!",
              },
              {
                q: "내 사이트를 전 세계가 볼 수 있게 하는 것은?",
                options: ["배포(Deploy)", "로그인", "clear"],
                answer: 0,
                explain: "배포는 사이트 파일을 인터넷 서버에 올려 누구나 접속하게 만드는 거예요.",
              },
            ]}
          />
        </Activity>

        <SectionTitle kicker="체크리스트" title="집에서 진짜로 해보기" desc="눌러서 체크하면 저장돼요. 환경 설정은 어른의 도움을 받아도 좋아요!" />
        <Checklist
          storageKey="all"
          items={[
            "Warp 터미널 설치하고 첫 화면 열기",
            "Claude Code 설치 후 <code>claude --version</code> 확인",
            "<code>mkdir ~/my-first-vibe</code> 폴더 만들고 그 안에서 <code>claude</code> 켜기",
            "Plan Mode로 나만의 프로필 사이트 만들기",
            "Supabase에 사진 올리고 사이트에 띄우기",
            "Vercel로 배포하고 내 URL 친구에게 자랑하기",
          ]}
        />
      </div>
    ),
  },
];

export const GROUPS = ["시작하기", "만들고 공개하기", "AI 고수되기"];
