import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function NodeModules() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Node.js 모듈 시스템</h1>
        <p className="page-description">
          CommonJS 와 ES Modules, Node.js 의 모듈 시스템에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          Node.js 는 모듈 시스템을 통해 코드를 분리하고 재사용합니다.
          <strong>CommonJS</strong> (전통적) 와 <strong>ES Modules</strong> (현대적) 두 가지 방식이 있습니다.
        </p>

        <InfoCard type="tip" title="모듈 시스템 비교">
          <table>
            <thead>
              <tr>
                <th>기능</th>
                <th>CommonJS</th>
                <th>ES Modules</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Import</td>
                <td><code>require()</code></td>
                <td><code>import</code></td>
              </tr>
              <tr>
                <td>Export</td>
                <td><code>module.exports</code></td>
                <td><code>export</code></td>
              </tr>
              <tr>
                <td>로딩</td>
                <td>동기, 런타임</td>
                <td>비동기, 컴파일타임</td>
              </tr>
              <tr>
                <td>환경</td>
                <td>Node.js</td>
                <td>Browser + Node.js</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="commonjs">1️⃣ CommonJS 모듈</h2>
        <p>
          Node.js 의 전통적인 모듈 시스템입니다.
        </p>

        <CodeDemo
          title="CommonJS 모듈 사용법"
          description="require 와 module.exports"
          defaultCode={`// ============================================
// math.js (모듈 정의)
// ============================================
// const add = (a, b) => a + b;
// const subtract = (a, b) => a - b;
// const multiply = (a, b) => a * b;
//
// // 단일 export
// // module.exports = add;
//
// // 여러 export
// module.exports = {
//   add,
//   subtract,
//   multiply,
// };
//
// // 별칭 export
// module.exports = {
//   add: add,
//   sub: subtract,  // 별칭
//   multiply,
// };

// ============================================
// app.js (모듈 사용)
// ============================================

// 1. 전체 모듈 가져오기
// const math = require('./math');
// console.log(math.add(2, 3));  // 5

// 2. 구조분해할당으로 가져오기
// const { add, multiply } = require('./math');
// console.log(add(2, 3));  // 5
// console.log(multiply(2, 3));  // 6

// 3. 별칭으로 가져오기
// const { add, sub: subtract } = require('./math');

// 4. 코어 모듈 (내장 모듈)
const path = require('path');
const fs = require('fs');

console.log('path.sep:', path.sep);  // 플랫폼별 구분자
console.log('path.join:', path.join('src', 'app.js'));  // 'src/app.js'

// 5. npm 패키지
// const express = require('express');
// const lodash = require('lodash');

console.log('CommonJS 예시 완료');`}
        />

        <InfoCard type="warning" title="CommonJS 주의사항">
          <ul>
            <li>
              <code>require()</code> 는 <strong>동기적</strong>으로 모듈을 로드합니다
            </li>
            <li>
              <strong>순환 참조</strong> 시 예상치 못한 동작이 발생할 수 있습니다
            </li>
            <li>
              브라우저에서는 사용 불가 (번들러 필요)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="esm">2️⃣ ES Modules</h2>
        <p>
          현대적인 JavaScript 모듈 시스템입니다.
        </p>

        <CodeDemo
          title="ES Modules 사용법"
          description="import 와 export"
          defaultCode={`// ============================================
// math.mjs (모듈 정의)
// ============================================
// export const add = (a, b) => a + b;
// export const subtract = (a, b) => a - b;
// export const multiply = (a, b) => a * b;
//
// // default export (하나만)
// export default function divide(a, b) {
//   return a / b;
// }
//
// // 별칭 export
// export { add as plus, subtract as minus };

// ============================================
// app.mjs (모듈 사용)
// ============================================

// 1. named import
// import { add, multiply } from './math.mjs';
// console.log(add(2, 3));  // 5

// 2. default import
// import divide from './math.mjs';
// console.log(divide(10, 2));  // 5

// 3. 전체 import
// import * as math from './math.mjs';
// console.log(math.add(2, 3));  // 5

// 4. 별칭 import
// import { add as plus } from './math.mjs';

// 5. 사이드이펙트 import (실행만)
// import './polyfill.mjs';

// 6. 동적 import (코드 스플리팅)
async function loadModule() {
  const math = await import('./math.mjs');
  console.log(math.add(5, 3));
}

// loadModule();

// 7. Node.js 에서 ESM 사용 방법
// - 파일 확장자: .mjs
// - 또는 package.json 에 "type": "module" 추가

console.log('ES Modules 예시 완료');`}
        />

        <InfoCard type="tip" title="ES Modules 장점">
          <ul>
            <li>
              <strong>정적 분석:</strong> 컴파일타임에 의존성 확인
            </li>
            <li>
              <strong>Tree Shaking:</strong> 사용하지 않는 코드 제거
            </li>
            <li>
              <strong>비동기 로딩:</strong> 성능 최적화
            </li>
            <li>
              <strong>브라우저 호환:</strong> 네이티브 지원
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="module-resolution">3️⃣ 모듈 해석</h2>
        <p>
          Node.js 가 모듈을 찾는 방법입니다.
        </p>

        <CodeDemo
          title="모듈 해석 알고리즘"
          description="Node.js 의 모듈 검색 경로"
          defaultCode={`// 1. 코어 모듈 (우선순위 최상)
// const http = require('http');  // 내장 모듈
// const fs = require('fs');
// const path = require('path');

// 2. 상대 경로
// const myModule = require('./myModule');
// const utils = require('../utils');
// const lib = require('../../lib');

// 3. node_modules (npm 패키지)
// const express = require('express');
// Node.js 는 현재 디렉토리부터 상위 디렉토리로 올라가며
// node_modules 폴더를 검색합니다

// 4. 모듈 해석 순서
// require('./module') 다음 순서로 검색:
// 1. ./module.js
// 2. ./module.json
// 3. ./module.node
// 4. ./module/index.js

// 5. package.json 의 main 필드
// node_modules/package/package.json:
// {
//   "main": "./dist/index.js"  // 진입점 지정
// }

// 6. exports 필드 (현대적 방식)
// {
//   "exports": {
//     ".": "./src/index.js",
//     "./utils": "./src/utils.js"
//   }
// }

// 7. require.resolve - 모듈 경로 확인
const resolvedPath = require.resolve('path');
console.log('해석된 경로:', resolvedPath);

// 8. require.cache - 캐시 확인
console.log('캐시된 모듈:', Object.keys(require.cache).slice(0, 3));

console.log('모듈 해석 예시 완료');`}
        />

        <InfoCard type="tip" title="모듈 캐시">
          <p>
            Node.js 는 모듈을 <strong>한 번만 로드하고 캐시</strong>합니다.
            동일한 모듈을 여러 번 require 해도 같은 인스턴스가 반환됩니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="package-json">4️⃣ package.json 심화</h2>
        <p>
          프로젝트 메타데이터와 의존성을 관리합니다.
        </p>

        <CodeDemo
          title="package.json 주요 필드"
          description="프로젝트 설정과 스크립트"
          defaultCode={`// ============================================
// package.json 예시
// ============================================
/*
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My Application",
  "main": "src/index.js",
  "type": "module",  // ES Modules 사용
  
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src/"
  },
  
  "dependencies": {
    "express": "^4.18.0",  // 프로덕션 의존성
    "dotenv": "^16.0.0"
  },
  
  "devDependencies": {
    "jest": "^29.0.0",     // 개발 의존성
    "eslint": "^8.0.0",
    "typescript": "^5.0.0"
  },
  
  "engines": {
    "node": ">=18.0.0"
  },
  
  "keywords": ["nodejs", "api"],
  "author": "Your Name",
  "license": "MIT"
}
*/

// 1. 버전 관리 (Semantic Versioning)
// ^4.18.0 - 4.18.0 이상, 5.0.0 미만 (마이너 업데이트 허용)
// ~4.18.0 - 4.18.0 이상, 4.19.0 미만 (패치 업데이트 허용)
// 4.18.0  - 정확히 4.18.0

// 2. 스크립트 실행
// npm run dev
// npm run build
// npm test

// 3. 의존성 설치
// npm install          - package.json 기반 설치
// npm install express  - 패키지 설치 (dependencies 에 추가)
// npm install -D jest  - devDependencies 에 추가
// npm uninstall lodash - 제거

// 4. 전역 설치 vs 로컬 설치
// npm install -g nodemon  - 전역 설치 (CLI 도구)
// npm install express     - 로컬 설치 (프로젝트별)

console.log('package.json 예시 완료');`}
        />

        <InfoCard type="tip" title="Semantic Versioning">
          <p>
            <strong>MAJOR.MINOR.PATCH</strong> 형식입니다.
            <br />
            <code>^</code> (카렛): 호환되는 업데이트
            <br />
            <code>~</code> (틸드): 패치 업데이트만
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="module-patterns">5️⃣ 모듈 패턴</h2>
        <p>
          일반적인 모듈 설계 패턴입니다.
        </p>

        <CodeDemo
          title="모듈 설계 패턴"
          description="싱글톤, 팩토리, 유틸리티"
          defaultCode={`// ============================================
// 1. 싱글톤 패턴 (한 인스턴스만 생성)
// ============================================
// class Database {
//   constructor() {
//     if (Database.instance) {
//       return Database.instance;
//     }
//     this.connection = 'connected';
//     Database.instance = this;
//   }
// }
//
// module.exports = new Database();

// ============================================
// 2. 팩토리 패턴 (객체 생성)
// ============================================
// function createLogger(level) {
//   return {
//     info: (msg) => console.log(\`[INFO] \${msg}\`),
//     error: (msg) => console.error(\`[ERROR] \${msg}\`),
//     level,
//   };
// }
//
// module.exports = createLogger;

// ============================================
// 3. 유틸리티 모듈 (함수 모음)
// ============================================
// const formatDate = (date) => date.toISOString();
// const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
// const debounce = (fn, delay) => { ... };
//
// module.exports = {
//   formatDate,
//   capitalize,
//   debounce,
// };

// ============================================
// 4. 설정 모듈 (환경 변수)
// ============================================
// require('dotenv').config();
//
// module.exports = {
//   port: process.env.PORT || 3000,
//   dbUrl: process.env.DATABASE_URL,
//   apiKey: process.env.API_KEY,
// };

// ============================================
// 5. 배럴 export (index.js)
// ============================================
// // src/utils/index.js
// module.exports = {
//   ...require('./string'),
//   ...require('./array'),
//   ...require('./object'),
// };
//
// // 사용: const utils = require('./utils');

console.log('모듈 패턴 예시 완료');`}
        />

        <InfoCard type="tip" title="배럴 Export">
          <p>
            <code>index.js</code> 를 통해 여러 모듈을 한 번에 export 하면
            import 경로가 깔끔해집니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="dynamic-import">6️⃣ 동적 Import</h2>
        <p>
          조건부 로딩과 코드 스플리팅을 가능하게 합니다.
        </p>

        <CodeDemo
          title="동적 Import 활용"
          description="조건부 로딩과 코드 스플리팅"
          defaultCode={`// 1. 기본 동적 import
async function loadModule() {
  const math = await import('./math.mjs');
  console.log(math.add(5, 3));
}

// 2. 조건부 로딩
async function loadLocale(locale) {
  let messages;
  
  if (locale === 'ko') {
    messages = await import('./locales/ko.mjs');
  } else if (locale === 'ja') {
    messages = await import('./locales/ja.mjs');
  } else {
    messages = await import('./locales/en.mjs');
  }
  
  return messages.default;
}

// 3. 에러 처리
async function safeImport(modulePath) {
  try {
    const module = await import(modulePath);
    return module;
  } catch (error) {
    console.error('모듈 로딩 실패:', error);
    return null;
  }
}

// 4. 코드 스플리팅 (Webpack, Vite)
// 번들러와 함께 사용 시 청크로 분리됨
async function renderChart() {
  const Chart = await import('chart.js');
  // Chart.js 는 필요한 때만 로드
}

// 5. Promise.all 로 병렬 로딩
async function loadModules() {
  const [moduleA, moduleB] = await Promise.all([
    import('./module-a.mjs'),
    import('./module-b.mjs'),
  ]);
  
  return { moduleA, moduleB };
}

// 6. CommonJS 에서 동적 import
// async function loadESM() {
//   const esmModule = await import('./esm-module.mjs');
//   return esmModule;
// }

console.log('동적 import 예시 완료');`}
        />

        <InfoCard type="tip" title="동적 Import 사용 사례">
          <ul>
            <li>
              <strong>코드 스플리팅:</strong> 초기 번들 크기 감소
            </li>
            <li>
              <strong>조건부 로딩:</strong> 플랫폼별 모듈
            </li>
            <li>
              <strong>지연 로딩:</strong> 필요할 때까지 로드 안 함
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>CommonJS:</strong> <code>require()</code>, <code>module.exports</code>, Node.js 전통
          </li>
          <li>
            <strong>ES Modules:</strong> <code>import</code>, <code>export</code>, 현대적 표준
          </li>
          <li>
            <strong>모듈 해석:</strong> 코어 → 상대경로 → node_modules
          </li>
          <li>
            <strong>package.json:</strong> 의존성, 스크립트, 메타데이터 관리
          </li>
          <li>
            <strong>SemVer:</strong> <code>^</code> 마이너, <code>~</code> 패치
          </li>
          <li>
            <strong>동적 import:</strong> 코드 스플리팅, 조건부 로딩
          </li>
          <li>
            <strong>모듈 캐시:</strong> 한 번 로드된 모듈은 재사용됨
          </li>
        </ul>
      </section>
    </div>
  );
}