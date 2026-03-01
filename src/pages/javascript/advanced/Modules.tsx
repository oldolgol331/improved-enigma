import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function Modules() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>모듈 시스템 (Module System)</h1>
        <p className="page-description">
          JavaScript 모듈 시스템 (ESM, CommonJS) 에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>모듈 (Module)</strong> 은 코드를 논리적으로 분리하고 재사용하는 단위입니다.
          JavaScript 는 역사적으로 모듈 시스템이 없었지만, 현재는 <strong>ES Modules (ESM)</strong>{' '}
          과<strong>CommonJS</strong> 두 가지 주요 모듈 시스템을 사용합니다.
        </p>

        <InfoCard type="tip" title="모듈 시스템 비교">
          <table style={{ width: '100%', fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>기능</th>
                <th style={{ textAlign: 'left' }}>ES Modules (ESM)</th>
                <th style={{ textAlign: 'left' }}>CommonJS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>환경</td>
                <td>브라우저, Node.js 12+</td>
                <td>Node.js (레거시)</td>
              </tr>
              <tr>
                <td>Import</td>
                <td>
                  <code>import</code> (정적)
                </td>
                <td>
                  <code>require()</code> (동적)
                </td>
              </tr>
              <tr>
                <td>Export</td>
                <td>
                  <code>export</code>
                </td>
                <td>
                  <code>module.exports</code>
                </td>
              </tr>
              <tr>
                <td>로딩</td>
                <td>비동기, 컴파일 타임</td>
                <td>동기, 런타임</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="esm">1️⃣ ES Modules (ESM)</h2>
        <p>
          ES6 에서 도입된 표준 모듈 시스템입니다. <code>import</code> 와 <code>export</code> 를
          사용합니다.
        </p>

        <CodeDemo
          title="ES Modules 기본"
          description="import/export 문법을 확인해보세요."
          defaultCode={`// ESM 문법 예시 (개념)

// ===== math.js =====
// 명명된 export (named export)
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// 기본 export (default export) - 파일당 하나만
export default function calculate(a, b, op) {
  if (op === 'add') return a + b;
  if (op === 'multiply') return a * b;
}

// ===== main.js =====
// 명명된 import
import { add, multiply } from './math.js';

// 별칭으로 import
import { PI as MathPI } from './math.js';

// 기본 import
import calculate from './math.js';

// 전체 import
import * as Math from './math.js';

console.log('PI:', MathPI);
console.log('add(2, 3):', add(2, 3));
console.log('calculate(5, 3, "add"):', calculate(5, 3, 'add'));

// ===== index.html =====
// <script type="module" src="main.js"></script>

console.log('ES Modules syntax explained');`}
        />

        <InfoCard type="warning" title="ESM 주의사항">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              HTML 에서 <code>&lt;script type="module"&gt;</code> 필요
            </li>
            <li>
              파일 확장자는 <code>.mjs</code> 또는 <code>package.json</code> 에{' '}
              <code>"type": "module"</code>
            </li>
            <li>
              import 는 <strong>정적 (static)</strong> - 컴파일 타임에 해석
            </li>
            <li>
              상대 경로 명시 필요 (<code>./</code>, <code>../</code>)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="commonjs">2️⃣ CommonJS</h2>
        <p>
          Node.js 에서 전통적으로 사용된 모듈 시스템입니다. <code>require()</code> 와{' '}
          <code>module.exports</code> 를 사용합니다.
        </p>

        <CodeDemo
          title="CommonJS 기본"
          description="require/module.exports 문법을 확인해보세요."
          defaultCode={`// CommonJS 문법 예시 (개념)

// ===== math.js =====
const PI = 3.14159;

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// 내보내기
module.exports = {
  PI,
  add,
  multiply
};

// 또는 단일 export
// module.exports = add;

// ===== main.js =====
// require 로 import
const math = require('./math');

// 구조 분해 할당
const { PI, add, multiply } = require('./math');

console.log('PI:', PI);
console.log('add(2, 3):', add(2, 3));

// 동적 require (런타임 결정 가능)
const moduleName = './math';
const dynamicModule = require(moduleName);

console.log('CommonJS syntax explained');`}
        />

        <InfoCard type="note" title="CommonJS 특징">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>Node.js 의 기본 모듈 시스템 (v12 이전)</li>
            <li>
              <code>require()</code> 는 <strong>동적 (dynamic)</strong> - 런타임에 해석
            </li>
            <li>
              파일 확장자는 <code>.js</code> (기본)
            </li>
            <li>
              상대 경로는 <code>./</code>, <code>../</code> 또는 모듈명 직접 사용
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="export-types">3️⃣ Export 타입</h2>
        <p>명명된 export 와 기본 export 의 차이점을 이해합니다.</p>

        <CodeDemo
          title="Export 타입 비교"
          description="named export vs default export"
          defaultCode={`// ===== Named Export (명명된 export) =====
// 여러 개 export 가능
export const name = 'Alice';
export const age = 25;
export function greet() {
  console.log('Hello!');
}

// import 시 중괄호 필수
import { name, age, greet } from './module.js';

// 별칭 사용
import { name as userName } from './module.js';

// ===== Default Export (기본 export) =====
// 파일당 하나만 가능
export default class Person {
  constructor(name) {
    this.name = name;
  }
}

// import 시 중괄호 없음, 임의 이름 가능
import Person from './module.js';
import MyClass from './module.js'; // 같은 것

// ===== Mixed Export =====
export const util = 'utility';
export default function main() {}

// import
import mainFunc, { util } from './module.js';

console.log('Export types explained');`}
        />

        <InfoCard type="tip" title="어떤 export 를 사용해야 할까?">
          <p>
            <strong>Default Export</strong>: 파일에서 하나의 주요 기능을 export 할 때 (컴포넌트,
            클래스)
            <br />
            <strong>Named Export</strong>: 여러 유틸리티 함수/상수를 export 할 때<br />
            일관된 스타일을 유지하는 것이 중요합니다!
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="dynamic-import">4️⃣ 동적 Import</h2>
        <p>
          <code>import()</code> 함수를 사용해 런타임에 모듈을 동적으로 로드할 수 있습니다.
        </p>

        <CodeDemo
          title="동적 Import"
          description="코드 스플리팅과 지연 로딩에 활용됩니다."
          defaultCode={`// 동적 import (ESM, CommonJS 모두 사용 가능)

// 기본 동적 import
async function loadModule() {
  const module = await import('./math.js');
  console.log('add:', module.add(2, 3));
}

// 조건부 로딩
async function loadBasedOnCondition(condition) {
  if (condition) {
    const module = await import('./module-a.js');
    return module.default;
  } else {
    const module = await import('./module-b.js');
    return module.default;
  }
}

// 코드 스플리팅 (번들 최적화)
async function handleClick() {
  // 클릭할 때까지 모듈 로드 안됨 (번들 크기 감소)
  const heavyModule = await import('./heavy-module.js');
  heavyModule.doHeavyWork();
}

// 에러 처리
async function safeImport() {
  try {
    const module = await import('./optional-module.js');
    return module;
  } catch (error) {
    console.log('모듈 로드 실패:', error);
    return null;
  }
}

console.log('Dynamic import explained');`}
        />

        <InfoCard type="tip" title="동적 Import 활용">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>코드 스플리팅</strong>: 번들 크기 최적화
            </li>
            <li>
              <strong>지연 로딩</strong>: 필요할 때만 모듈 로드
            </li>
            <li>
              <strong>조건부 로딩</strong>: 환경/조건에 따라 다른 모듈
            </li>
            <li>
              React 의 <code>React.lazy()</code> 도 동적 import 사용
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="circular">5️⃣ 순환 참조 (Circular Dependency)</h2>
        <p>두 모듈이 서로를 import 할 때 발생하는 문제와 해결 방법을 학습합니다.</p>

        <CodeDemo
          title="순환 참조 문제"
          description="순환 참조를 피하는 방법을 확인해보세요."
          defaultCode={`// ❌ 순환 참조 예시 (문제 발생)

// ===== module-a.js =====
// import { funcB } from './module-b.js';  // 순환!
// export function funcA() {
//   funcB();
// }

// ===== module-b.js =====
// import { funcA } from './module-a.js';  // 순환!
// export function funcB() {
//   funcA();
// }

// ✅ 해결법 1: 공통 모듈로 추출

// ===== shared.js =====
export function sharedFunction() {
  console.log('Shared logic');
}

// ===== module-a.js =====
import { sharedFunction } from './shared.js';
export function funcA() {
  sharedFunction();
}

// ===== module-b.js =====
import { sharedFunction } from './shared.js';
export function funcB() {
  sharedFunction();
}

// ✅ 해결법 2: 동적 import 사용

// ===== module-a.js =====
export async function funcA() {
  const { funcB } = await import('./module-b.js');
  funcB();
}

console.log('Circular dependency solutions');`}
        />

        <InfoCard type="warning" title="순환 참조 증상">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <code>undefined</code> 에러 발생
            </li>
            <li>모듈이 완전히 로드되기 전에 접근 시도</li>
            <li>예측 불가능한 동작</li>
            <li>해결: 공통 모듈 추출, 동적 import, 구조 리팩토링</li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="node-modules">6️⃣ Node.js 모듈 해석</h2>
        <p>Node.js 가 모듈을 해석하는 방식을 이해합니다.</p>

        <CodeDemo
          title="Node.js 모듈 해석"
          description="모듈 해석 순서와 package.json 필드들입니다."
          defaultCode={`// Node.js 모듈 해석 순서

// 1. 코어 모듈 (내장 모듈)
const fs = require('fs');         // 내장 모듈 우선
const path = require('path');

// 2. node_modules 에서 검색
const express = require('express');
// 검색 경로:
// - ./node_modules/express
// - ../node_modules/express
// - ../../node_modules/express
// - ... (루트까지)

// 3. package.json 필드 우선순위
{
  "name": "my-package",
  "main": "./dist/index.js",      // CommonJS 진입점
  "module": "./dist/index.mjs",   // ESM 진입점 (일부 번들러)
  "types": "./dist/index.d.ts",   // TypeScript 타입
  "exports": {                    // 현대적 진입점 (우선순위 높음)
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}

// ===== package.json "exports" 활용 =====
{
  "exports": {
    ".": "./index.js",                    // 기본
    "./feature": "./feature.js",          // 서브 경로
    "./internal/*": null,                 // 내부 경로 차단
    "./public/*": "./public/*.js"         // 패턴 매칭
  }
}

console.log('Node.js module resolution explained');`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <strong>ES Modules</strong>: 표준, <code>import/export</code>, 정적 로딩
            </li>
            <li>
              <strong>CommonJS</strong>: Node.js 레거시, <code>require/module.exports</code>, 동적
              로딩
            </li>
            <li>
              <strong>Named Export</strong>: <code>export {'{ name }'}</code>, 여러 개 가능
            </li>
            <li>
              <strong>Default Export</strong>: <code>export default</code>, 파일당 하나
            </li>
            <li>
              <strong>동적 Import</strong>: <code>import()</code>, 코드 스플리팅, 지연 로딩
            </li>
            <li>
              <strong>순환 참조</strong>: 공통 모듈 추출 또는 동적 import 로 해결
            </li>
            <li>
              <strong>Node.js 해석</strong>: 코어 모듈 → node_modules → package.json exports
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
