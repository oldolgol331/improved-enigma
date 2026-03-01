import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TSConfigGuide() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>TypeScript Configuration</h1>
        <p className="page-description">
          tsconfig.json 설정과 TypeScript 컴파일러 옵션에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <code>tsconfig.json</code> 은 TypeScript 프로젝트의 루트에 위치하며,
          프로젝트의 컴파일러 옵션과 설정을 정의합니다.
        </p>

        <InfoCard type="tip" title="tsconfig.json 역할">
          <ul>
            <li>
              <strong>컴파일 옵션:</strong> JavaScript 변환 설정
            </li>
            <li>
              <strong>프로젝트 구조:</strong> 포함/제외할 파일
            </li>
            <li>
              <strong>타입 검사:</strong> strict 모드 및 검사 옵션
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="basic-config">1️⃣ 기본 설정</h2>
        <p>
          최소한의 tsconfig.json 설정입니다.
        </p>

        <CodeDemo
          title="기본 tsconfig.json"
          description="필수 옵션과 구조"
          defaultCode={`// ============================================
// tsconfig.json (기본)
// ============================================
/*
{
  "compilerOptions": {
    // 타겟 JavaScript 버전
    "target": "ES2020",
    
    // 모듈 시스템
    "module": "ESNext",
    
    // 모듈 해석 방법
    "moduleResolution": "bundler",
    
    // 출력 디렉토리
    "outDir": "./dist",
    
    // 루트 디렉토리
    "rootDir": "./src",
    
    // JSX 변환 (React)
    "jsx": "react-jsx",
    
    // 소스맵 생성
    "sourceMap": true
  },
  
  // 포함할 파일
  "include": ["src/**/*"],
  
  // 제외할 파일
  "exclude": ["node_modules", "dist"]
}
*/

// ============================================
// target 옵션
// ============================================
// "ES3"     - Internet Explorer (레거시)
// "ES5"     - 모든 브라우저 지원
// "ES2015"  - 현대 브라우저
// "ES2020"  - 최신 브라우저 (권장)
// "ESNext"  - 최신 기능 (experimental)

// ============================================
// module 옵션
// ============================================
// "CommonJS"  - Node.js (require/exports)
// "ESNext"    - 현대 브라우저 (import/export)
// "ES2020"    - ES 모듈

console.log('기본 설정 예시 완료');`}
        />

        <InfoCard type="tip" title="권장 기본값">
          <ul>
            <li>
              <strong>target:</strong> <code>ES2020</code> (최신 브라우저)
            </li>
            <li>
              <strong>module:</strong> <code>ESNext</code> (번들러 사용 시)
            </li>
            <li>
              <strong>moduleResolution:</strong> <code>bundler</code> (Vite/Webpack)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="strict-mode">2️⃣ Strict 모드</h2>
        <p>
          TypeScript 의 타입 안전성을 최대화하는 설정입니다.
        </p>

        <CodeDemo
          title="Strict 모드 옵션"
          description="타입 검사 강화"
          defaultCode={`// ============================================
// tsconfig.json (Strict)
// ============================================
/*
{
  "compilerOptions": {
    // 모든 strict 옵션 활성화
    "strict": true,
    
    // 개별 옵션 (strict: true 에 포함)
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    
    // 추가 검사
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
*/

// ============================================
// strict: true 효과
// ============================================

// 1. noImplicitAny
// let value;  // Error: implicitly has 'any' type
let value: unknown;  // OK

// 2. strictNullChecks
// let name: string = null;  // Error
let name: string | null = null;  // OK

function greet(name: string | null) {
  if (name !== null) {
    console.log(\`Hello, \${name}\`);
  }
}

// 3. strictFunctionTypes
type Handler = (arg: string) => void;

// const badHandler: Handler = (arg: any) => {};  // Error
const goodHandler: Handler = (arg: string) => {};  // OK

// 4. noImplicitReturns
function getStatus(code: number): string {
  if (code === 200) {
    return 'OK';
  }
  return 'Unknown';  // 명시적 반환 필요
}

// 5. noFallthroughCasesInSwitch
function getDayName(day: number): string {
  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    default:
      return 'Unknown';
  }
}

// 6. noUncheckedIndexedAccess
const arr = [1, 2, 3];
const first = arr[0];  // number | undefined

console.log('Strict 모드 예시 완료');`}
        />

        <InfoCard type="warning" title="Strict 모드 전환">
          <p>
            기존 프로젝트에 <code>strict: true</code> 를 추가하면 많은 에러가 발생할 수 있습니다.
            <br />
            점진적으로 활성화하거나, <code>@ts-expect-error</code> 를 사용하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="module-resolution">3️⃣ 모듈 해석</h2>
        <p>
          TypeScript 가 모듈을 찾는 방법을 설정합니다.
        </p>

        <CodeDemo
          title="모듈 해석 설정"
          description="경로 별칭과 모듈 해석"
          defaultCode={`// ============================================
// tsconfig.json (Module Resolution)
// ============================================
/*
{
  "compilerOptions": {
    // 모듈 해석 전략
    "moduleResolution": "bundler",
    
    // 경로 별칭
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"]
    },
    
    // Node.js 호환
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    
    // 파일명 대소문자
    "forceConsistentCasingInFileNames": true
  }
}
*/

// ============================================
// moduleResolution 옵션
// ============================================
// "classic"      - 레거시 (사용하지 않음)
// "node"         - Node.js 알고리즘
// "bundler"      - 번들러 최적화 (TypeScript 5.0+)

// ============================================
// 경로 별칭 사용 예시
// ============================================
// import { Button } from '@/components/Button';
// import { useTheme } from '@hooks/useTheme';
// import { formatDate } from '@utils/date';

// ============================================
// esModuleInterop 효과
// ============================================

// false:
// import * as React from 'react';
// import express = require('express');

// true:
// import React from 'react';
// import express from 'express';

console.log('모듈 해석 예시 완료');`}
        />

        <InfoCard type="tip" title="경로 별칭 장점">
          <ul>
            <li>
              <strong>가독성:</strong> <code>../../components</code> 대신 <code>@/components</code>
            </li>
            <li>
              <strong>리팩토링:</strong> 경로 변경 최소화
            </li>
            <li>
              <strong>일관성:</strong> 절대 경로 사용
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="declaration">4️⃣ 선언 파일</h2>
        <p>
          TypeScript 선언 파일 (<code>.d.ts</code>) 을 생성하고 관리합니다.
        </p>

        <CodeDemo
          title="선언 파일 설정"
          description="타입 정의 생성과 사용"
          defaultCode={`// ============================================
// tsconfig.json (Declaration)
// ============================================
/*
{
  "compilerOptions": {
    // 선언 파일 생성
    "declaration": true,
    "declarationMap": true,
    
    // 선언만 출력
    "emitDeclarationOnly": true,
    
    // 선언 파일 출력 위치
    "declarationDir": "./types"
  }
}
*/

// ============================================
// .d.ts 파일 예시
// ============================================
// types/global.d.ts
/*
declare global {
  interface Window {
    myCustomProperty: string;
  }
  
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      API_KEY: string;
    }
  }
}

export {};
*/

// ============================================
// 외부 라이브러리 타입 정의
// ============================================
// types/my-library.d.ts
/*
declare module 'my-library' {
  export interface MyLibraryOptions {
    debug?: boolean;
    timeout?: number;
  }
  
  export function create(options?: MyLibraryOptions): void;
  export function destroy(): void;
  
  export default MyLibrary;
}
*/

// ============================================
// ambient declaration
// ============================================
// src/ambient.d.ts
/*
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}
*/

console.log('선언 파일 예시 완료');`}
        />

        <InfoCard type="tip" title="선언 파일 사용 사례">
          <ul>
            <li>
              <strong>라이브러리 배포:</strong> 타입 정보 포함
            </li>
            <li>
              <strong>JavaScript 프로젝트:</strong> 타입 정의 추가
            </li>
            <li>
              <strong>외부 모듈:</strong> 타입 없는 라이브러리 정의
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="project-references">5️⃣ 프로젝트 참조</h2>
        <p>
          대규모 프로젝트에서 컴파일 성능을 최적화합니다.
        </p>

        <CodeDemo
          title="프로젝트 참조 설정"
          description="Monorepo 와 컴파일 최적화"
          defaultCode={`// ============================================
// Root tsconfig.json
// ============================================
/*
{
  "files": [],
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/utils" },
    { "path": "./packages/app" }
  ]
}
*/

// ============================================
// packages/core/tsconfig.json
// ============================================
/*
{
  "compilerOptions": {
    "composite": true,  // 참조 가능하게 설정
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "tsBuildInfoFile": "./dist/tsbuildinfo"
  },
  "include": ["src/**/*"]
}
*/

// ============================================
// packages/app/tsconfig.json
// ============================================
/*
{
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "references": [
    { "path": "../core" },
    { "path": "../utils" }
  ],
  "include": ["src/**/*"]
}
*/

// ============================================
// 빌드 명령
// ============================================
// tsc --build              - 전체 빌드
// tsc --build --watch      - 감시 모드
// tsc --build --clean      - 정리
// tsc --build --force      - 강제 빌드

console.log('프로젝트 참조 예시 완료');`}
        />

        <InfoCard type="tip" title="프로젝트 참조 장점">
          <ul>
            <li>
              <strong>성능:</strong> 변경된 프로젝트만 빌드
            </li>
            <li>
              <strong>구조화:</strong> 명확한 의존성 관계
            </li>
            <li>
              <strong>Monorepo:</strong> 여러 패키지 관리
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="react-config">6️⃣ React 프로젝트 설정</h2>
        <p>
          React + Vite 프로젝트에 최적화된 설정입니다.
        </p>

        <CodeDemo
          title="React + Vite 설정"
          description="현대적 React 프로젝트"
          defaultCode={`// ============================================
// tsconfig.json (React + Vite)
// ============================================
/*
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    // 번들러
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    
    // JSX
    "jsx": "react-jsx",
    
    // Linting
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    // 경로 별칭
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
*/

// ============================================
// tsconfig.node.json (Vite 설정)
// ============================================
/*
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
*/

// ============================================
// 주요 옵션 설명
// ============================================
// skipLibCheck: true     - node_modules 타입 검사 생략 (빌드 속도)
// isolatedModules: true  - 각 파일을 독립적으로 변환 (번들러 요구)
// noEmit: true           - 출력 파일 생성 안 함 (Vite 가 처리)
// resolveJsonModule: true - JSON import 허용

console.log('React 설정 예시 완료');`}
        />

        <InfoCard type="tip" title="Vite + TypeScript">
          <p>
            Vite 는 런타임에 TypeScript 를 변환하므로 <code>noEmit: true</code> 를 사용합니다.
            <br />
            타입 검사는 <code>tsc --noEmit</code> 또는 IDE 에서 수행합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>target/module:</strong> JavaScript 변환 설정
          </li>
          <li>
            <strong>strict: true:</strong> 타입 안전성 최대화
          </li>
          <li>
            <strong>moduleResolution:</strong> <code>bundler</code> (현대적)
          </li>
          <li>
            <strong>paths:</strong> 경로 별칭 설정
          </li>
          <li>
            <strong>declaration:</strong> 타입 정의 파일 생성
          </li>
          <li>
            <strong>composite:</strong> 프로젝트 참조 (성능 최적화)
          </li>
          <li>
            <strong>React:</strong> <code>jsx: react-jsx</code>, <code>noEmit: true</code>
          </li>
        </ul>
      </section>
    </div>
  );
}