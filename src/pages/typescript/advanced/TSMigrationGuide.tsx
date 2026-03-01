import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TSMigrationGuide() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>TypeScript Migration Guide</h1>
        <p className="page-description">
          JavaScript 프로젝트를 TypeScript 로 점진적으로 마이그레이션하는 전략과 실전 가이드입니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          TypeScript 마이그레이션은 하루아침에 이루어지지 않습니다.
          <strong>점진적 접근</strong>과 <strong>현실적인 목표 설정</strong>이 성공의 핵심입니다.
        </p>

        <InfoCard type="tip" title="마이그레이션 원칙">
          <ul>
            <li>
              <strong>점진적:</strong> 한 번에 하나씩, 중단 없는 개발
            </li>
            <li>
              <strong>실용적:</strong> 완벽주의보다 실용성
            </li>
            <li>
              <strong>우선순위:</strong> 핵심 코드부터 시작
            </li>
            <li>
              <strong>팀 협력:</strong>全員이 참여, 지식 공유
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="preparation">1️⃣ 준비 단계</h2>
        <p>
          마이그레이션 전 준비사항을 확인합니다.
        </p>

        <CodeDemo
          title="마이그레이션 준비"
          description="tsconfig 설정과 도구 설치"
          defaultCode={`// ============================================
// 1. TypeScript 설치
// ============================================
// npm install -D typescript

// ============================================
// 2. tsconfig.json 생성
// ============================================
// npx tsc --init

/*
{
  "compilerOptions": {
    // JavaScript 호환
    "allowJs": true,           // JS 파일 허용
    "checkJs": false,          // JS 파일 타입 검사 (점진적 활성화)
    
    // 출력 설정
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    
    // 모듈
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    
    // Strict 모드 (점진적 활성화 권장)
    "strict": false,           // 처음에는 false
    "noImplicitAny": false,    // 나중에 활성화
    "strictNullChecks": false, // 나중에 활성화
    
    // JSX (React)
    "jsx": "react-jsx",
    
    // 스킵 (속도 향상)
    "skipLibCheck": true,
    "skipDefaultLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
*/

// ============================================
// 3. VS Code 설정
// ============================================
// .vscode/settings.json
/*
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.validate.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
*/

// ============================================
// 4. ESLint 설정 (TypeScript 지원)
// ============================================
// npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

/*
// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
];
*/

console.log('마이그레이션 준비 완료');`}
        />

        <InfoCard type="warning" title="초기 설정 주의">
          <p>
            처음부터 <strong>strict 모드를 활성화하지 마세요</strong>.
            <br />
            너무 많은 에러가 발생하여 진행이 어려워집니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="strategy">2️⃣ 마이그레이션 전략</h2>
        <p>
          현실적인 마이그레이션 전략을 수립합니다.
        </p>

        <CodeDemo
          title="점진적 마이그레이션 전략"
          description="우선순위와 단계별 접근"
          defaultCode={`// ============================================
// 전략 1: 파일 확장자 변경 (.js → .ts)
// ============================================

// 1단계: .js 파일을 .ts 로 이름만 변경
// mv src/utils.js src/utils.ts

// 2단계: any 타입으로 임시 처리
function greet(name: any): any {
  return 'Hello, ' + name;
}

// 3단계: 점진적으로 타입 구체화
function greet(name: string): string {
  return 'Hello, ' + name;
}

// ============================================
// 전략 2: JS 파일에 JSDoc 주석 추가
// ============================================

// .js 파일 그대로 유지, 타입 정보 추가
/**
 * @param {string} name
 * @returns {string}
 */
function greet(name) {
  return 'Hello, ' + name;
}

// checkJs: true 설정하면 타입 검사됨
// tsconfig.json: "checkJs": true

// ============================================
// 전략 3: 폴더별 단계적 전환
// ============================================

// 1단계: 유틸리티 폴더부터 시작
// src/utils/ → .ts 변환

// 2단계: 공통 컴포넌트
// src/components/common/ → .tsx 변환

// 3단계: 도메인 컴포넌트
// src/components/features/ → .tsx 변환

// 4단계: 페이지/라우트
// src/pages/ → .tsx 변환

// ============================================
// 전략 4: 새 코드는 TypeScript 로
// ============================================

// 기존 코드: JavaScript 유지
// 새 기능: TypeScript 로 작성

// 점진적으로 TypeScript 비율 증가
// Week 1: 10% → Week 4: 50% → Week 8: 100%

// ============================================
// 전략 5: Declaration Files 활용
// ============================================

// 타입 없는 라이브러리 선언
// types/my-library.d.ts
/*
declare module 'my-library' {
  export function doSomething(): void;
  export default MyClass;
}
*/

// 전역 변수 선언
// types/global.d.ts
/*
declare const APP_VERSION: string;
declare const API_URL: string;
*/

console.log('마이그레이션 전략 수립 완료');`}
        />

        <InfoCard type="tip" title="추천 접근법">
          <ol>
            <li>
              <strong>유틸리티:</strong> 독립적, 의존성 적음
            </li>
            <li>
              <strong>타입 정의:</strong> 공통 인터페이스, 타입
            </li>
            <li>
              <strong>공통 컴포넌트:</strong> 재사용성 높음
            </li>
            <li>
              <strong>핵심 로직:</strong> 비즈니스 로직
            </li>
            <li>
              <strong>페이지/라우트:</strong> 마지막 (의존성 많음)
            </li>
          </ol>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="common-patterns">3️⃣ 공통 패턴</h2>
        <p>
          자주 마주치는 상황과 해결 방법입니다.
        </p>

        <CodeDemo
          title="자주 사용하는 패턴"
          description="실전 마이그레이션 패턴"
          defaultCode={`// ============================================
// 1. any 타입 최소화
// ============================================

// ❌ 나쁨
function process(data: any): any {
  return data.result;
}

// ✅ 좋음 - unknown 사용
function process(data: unknown): unknown {
  if (typeof data === 'object' && data !== null && 'result' in data) {
    return (data as { result: unknown }).result;
  }
  throw new Error('Invalid data');
}

// ✅ 더 좋음 - 제네릭 사용
function process<T>(data: { result: T }): T {
  return data.result;
}

// ============================================
// 2. 타입 단언 vs 타입 가드
// ============================================

// ❌ 위험한 단언
const element = document.getElementById('app') as HTMLElement;

// ✅ 타입 가드
const element = document.getElementById('app');
if (element) {
  // element 는 HTMLElement
  element.textContent = 'Hello';
}

// ============================================
// 3. React 컴포넌트 Props
// ============================================

// ❌ any props
function MyComponent({ user, onUpdate }: any) {
  return <div>{user.name}</div>;
}

// ✅ 인터페이스 정의
interface MyComponentProps {
  user: {
    id: number;
    name: string;
    email?: string;
  };
  onUpdate: (user: { id: number }) => void;
}

function MyComponent({ user, onUpdate }: MyComponentProps) {
  return <div>{user.name}</div>;
}

// ============================================
// 4. 이벤트 핸들러
// ============================================

// ❌ any 사용
function handleClick(event: any) {
  console.log(event.target.value);
}

// ✅ 정확한 타입
function handleClick(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value);
}

// ============================================
// 5. 비동기 함수
// ============================================

// ❌ 반환 타입 없음
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}

// ✅ 명시적 반환 타입
interface UserData {
  id: number;
  name: string;
}

async function fetchData(): Promise<UserData> {
  const response = await fetch('/api/data');
  return response.json();
}

// ============================================
// 6. 옵셔널 체이닝과 null 병합
// ============================================

// ❌ 중첩 null 체크
function getUserName(user: { profile?: { name?: string } }) {
  if (user && user.profile && user.profile.name) {
    return user.profile.name;
  }
  return 'Unknown';
}

// ✅ 옵셔널 체이닝
function getUserName(user: { profile?: { name?: string } }) {
  return user?.profile?.name ?? 'Unknown';
}

console.log('공통 패턴 예시 완료');`}
        />

        <InfoCard type="warning" title="any 타입 사용 가이드">
          <ul>
            <li>
              <strong>최소한으로:</strong> 정말 필요할 때만
            </li>
            <li>
              <strong>TODO 주석:</strong> <code>// TODO: 타입 구체화</code>
            </li>
            <li>
              <strong>점진적 개선:</strong> 나중에 구체적 타입으로
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="react-migration">4️⃣ React 컴포넌트 마이그레이션</h2>
        <p>
          React 컴포넌트를 TypeScript 로 전환합니다.
        </p>

        <CodeDemo
          title="React 컴포넌트 전환"
          description="Props 와 State 타입 정의"
          defaultCode={`import React, { useState, ChangeEvent, FormEvent } from 'react';

// ============================================
// 1. 함수형 컴포넌트 Props
// ============================================

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';  // 옵셔널
  disabled?: boolean;
  children?: React.ReactNode;  // children prop
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  children,
}) => {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children || label}
    </button>
  );
};

// ============================================
// 2. State 타입
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
}

interface FormState {
  users: User[];
  loading: boolean;
  error: string | null;
}

function UserList() {
  const [state, setState] = useState<FormState>({
    users: [],
    loading: false,
    error: null,
  });
  
  // 또는 개별 state
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  return <div>사용자 목록</div>;
}

// ============================================
// 3. 이벤트 핸들러
// ============================================

function ContactForm() {
  const [email, setEmail] = useState('');
  
  // Input 이벤트
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  
  // Form 제출
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('이메일:', email);
  };
  
  // 키보드 이벤트
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event as any);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        onKeyDown={handleKeyDown}
      />
      <button type="submit">제출</button>
    </form>
  );
}

// ============================================
// 4. Ref 타입
// ============================================

function FocusInput() {
  // DOM 요소 Ref
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFocus = () => {
    inputRef.current?.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>포커스</button>
    </div>
  );
}

// ============================================
// 5. Children Props
// ============================================

interface CardProps {
  title: string;
  children: React.ReactNode;  // 어떤 JSX 도 가능
  footer?: React.ReactNode;   // 옵셔널
}

function Card({ title, children, footer }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// 사용 예시
/*
<Card title="제목" footer={<button>확인</button>}>
  <p>내용입니다</p>
</Card>
*/

console.log('React 컴포넌트 예시 완료');`}
        />

        <InfoCard type="tip" title="React 타입 팁">
          <ul>
            <li>
              <code>React.FC</code>: 함수형 컴포넌트 타입
            </li>
            <li>
              <code>React.ReactNode</code>: 모든 렌더링 가능 값
            </li>
            <li>
              <code>ChangeEvent&lt;T&gt;</code>: 입력 이벤트
            </li>
            <li>
              <code>FormEvent&lt;T&gt;</code>: 폼 제출 이벤트
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="testing">5️⃣ 타입 검사 CI 통합</h2>
        <p>
          자동화된 타입 검사로 품질을 유지합니다.
        </p>

        <CodeDemo
          title="CI 통합과 자동화"
          description="npm 스크립트와 GitHub Actions"
          defaultCode={`// ============================================
// 1. npm 스크립트 추가
// ============================================
/*
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "typecheck": "tsc --noEmit",
    "typecheck:watch": "tsc --noEmit --watch",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix"
  }
}
*/

// ============================================
// 2. Pre-commit 훅 (Husky)
// ============================================
// npm install -D husky lint-staged

/*
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
*/

/*
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "tsc --noEmit"
    ]
  }
}
*/

// ============================================
// 3. GitHub Actions
// ============================================
/*
// .github/workflows/typecheck.yml
name: Type Check

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  typecheck:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run typecheck
      
      - name: Lint
        run: npm run lint
*/

// ============================================
// 4. 점진적 Strict 모드 활성화
// ============================================
/*
// tsconfig.json (초기)
{
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": false,
    "strictNullChecks": false
  }
}

// 1 개월 후
{
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": true,  // 활성화
    "strictNullChecks": false
  }
}

// 2 개월 후
{
  "compilerOptions": {
    "strict": true,  // 전체 strict 모드
  }
}
*/

// ============================================
// 5. 타입 에러 보고서 생성
// ============================================
// npx tsc --noEmit --pretty > type-errors.txt

// 에러 수 카운트
// npx tsc --noEmit 2>&1 | grep -c "error TS"

console.log('CI 통합 예시 완료');`}
        />

        <InfoCard type="tip" title="마이크로 전략">
          <ul>
            <li>
              <strong>주간 목표:</strong> 주당 10-20 파일 전환
            </li>
            <li>
              <strong>에러 감소:</strong> 매주 타입 에러 20% 감소 목표
            </li>
            <li>
              <strong>코드 리뷰:</strong> 모든 새 코드는 TypeScript
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="tips">6️⃣ 실전 팁</h2>
        <p>
          마이그레이션 과정에서 얻은 교훈입니다.
        </p>

        <CodeDemo
          title="실전 팁과 주의사항"
          description="현실적인 조언"
          defaultCode={`// ============================================
// 팁 1: 완벽주의 금지
// ============================================

// ❌ 나쁨: 모든 타입을 완벽하게 정의하려다 진행 안 됨
interface ComplexType {
  // 100 줄 넘는 타입 정의...
}

// ✅ 좋음: 일단 any 로 시작, 나중에 개선
interface ComplexType {
  data: any;  // TODO: 타입 구체화
}

// ============================================
// 팁 2: 유틸리티 타입 적극 활용
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// 일부만 필요한 경우
type UserPreview = Pick<User, 'id' | 'name'>;

// 모두 옵셔널로
type UserUpdate = Partial<User>;

// 모두 readonly 로
type ReadonlyUser = Readonly<User>;

// ============================================
// 팁 3: 타입 추출
// ============================================

// ❌ 중복 정의
interface APIResponse {
  user: {
    id: number;
    name: string;
  };
}

interface UserListResponse {
  users: {
    id: number;
    name: string;
  }[];
}

// ✅ 타입 추출
interface APIResponse {
  user: User;
}

interface UserListResponse {
  users: User[];
}

interface User {
  id: number;
  name: string;
}

// ============================================
// 팁 4: 에러 해결 우선순위
// ============================================

// 1 순위: 컴파일 에러 (빨간 줄)
// 2 순위: any 타입 (경고)
// 3 순위: strict 모드 에러

// ============================================
// 팁 5: 팀원 교육
// ============================================

// - 주간 스터디: TypeScript 기본 문법
// - 코드 리뷰: 타입 정의 피드백
// - 문서화: 공통 타입 사전 정의

// ============================================
// 팁 6: 라이브러리 타입 설치
// ============================================
// npm install -D @types/react @types/node @types/express

// 타입 없는 라이브러리 처리
// 1. @types 패키지 검색: npm search @types/package-name
// 2. 없으면 declaration file 작성
// 3. module augmentation 사용

console.log('실전 팁 완료');`}
        />

        <InfoCard type="warning" title="흔한 실수">
          <ul>
            <li>
              <strong>너무 빠른 strict 모드:</strong> 좌절감만 증가
            </li>
            <li>
              <strong>any 남용:</strong> 타입 안전성 상실
            </li>
            <li>
              <strong>과도한 제네릭:</strong> 가독성 저하
            </li>
            <li>
              <strong>타입만 정의:</strong> 런타임 검증 없음
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>준비:</strong> tsconfig, ESLint, 팀 교육
          </li>
          <li>
            <strong>전략:</strong> 점진적, 우선순위, 실용적
          </li>
          <li>
            <strong>패턴:</strong> any 최소화, unknown 활용, 타입 가드
          </li>
          <li>
            <strong>React:</strong> Props 인터페이스, 이벤트 타입
          </li>
          <li>
            <strong>CI:</strong> 자동화 타입 검사, pre-commit
          </li>
          <li>
            <strong>팁:</strong> 완벽주의 금지, 팀 협력
          </li>
          <li>
            <strong>기간:</strong> 2-3 개월 (중규모 프로젝트)
          </li>
        </ul>
      </section>
    </div>
  );
}