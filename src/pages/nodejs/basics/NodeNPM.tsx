import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function NodeNPM() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>NPM 과 패키지 관리</h1>
        <p className="page-description">
          NPM 을 사용한 패키지 관리와 프로젝트 설정 방법을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>NPM (Node Package Manager)</strong> 은 Node.js 의 패키지 관리자로, 세계 최대의
          소프트웨어 레지스트리입니다. 200 만 개 이상의 패키지가 등록되어 있습니다.
        </p>

        <InfoCard type="tip" title="NPM 의 두 가지 의미">
          <ul style={{ margin: '0.5rem 0 0 1.2rem' }}>
            <li>
              <strong>Node Package Manager</strong>: 패키지 관리 도구
            </li>
            <li>
              <strong>Node Packaged Modules</strong>: 패키지 레지스트리 (registry.npmjs.org)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="package-json">1️⃣ package.json</h2>
        <p>
          <code>package.json</code> 은 프로젝트의 메타데이터와 의존성을 정의합니다.
        </p>

        <CodeDemo
          title="package.json"
          description="프로젝트 설정 파일을 이해합니다."
          defaultCode={`// package.json 예시
{
  "name": "my-express-app",
  "version": "1.0.0",
  "description": "My Express API Server",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src/",
    "clean": "rm -rf dist/"
  },
  "keywords": [
    "express",
    "api",
    "nodejs"
  ],
  "author": "Your Name <email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/repo.git"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "eslint": "^8.54.0",
    "nodemon": "^3.0.1"
  },
  "peerDependencies": {
    "react": ">=18.0.0"
  },
  "optionalDependencies": {
    "fsevents": "^2.3.3"
  }
}

// 주요 필드 설명:
// - name: 패키지 이름 (소문자, 하이픈 사용)
// - version: 시맨틱 버저닝 (major.minor.patch)
// - main: 진입점 파일
// - type: "module" (ESM) 또는 "commonjs"
// - scripts: npm run 으로 실행하는 명령어
// - dependencies: 프로덕션 의존성
// - devDependencies: 개발 의존성
// - peerDependencies: 호환 버전 (라이브러리용)
// - optionalDependencies: 실패해도 무시

console.log('package.json structure');`}
        />

        <InfoCard type="tip" title="시맨틱 버저닝 (SemVer)">
          <p>
            <code>major.minor.patch</code> 형식입니다:
          </p>
          <ul style={{ margin: '0.5rem 0 0 1.2rem' }}>
            <li>
              <strong>major</strong>: 하위 호환되지 않는 변경
            </li>
            <li>
              <strong>minor</strong>: 하위 호환되는 기능 추가
            </li>
            <li>
              <strong>patch</strong>: 하위 호환되는 버그 수정
            </li>
          </ul>
          <pre style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
            {`^4.18.2  // 4.18.2 이상, 5.0.0 미만 (minor 업데이트 허용)
~4.18.2  // 4.18.2 이상, 4.19.0 미만 (patch 업데이트 허용)
4.18.2   // 정확히 4.18.2
*        // 모든 버전`}
          </pre>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="npm-commands">2️⃣ NPM 명령어</h2>
        <p>자주 사용하는 NPM 명령어를 학습합니다.</p>

        <CodeDemo
          title="NPM 명령어"
          description="자주 사용하는 NPM 명령어입니다."
          defaultCode={`// ===== 설치 명령어 =====

// 모든 의존성 설치 (package.json 기준)
// npm install
// npm i  # 단축형

// 패키지 설치 (dependencies 에 추가)
// npm install express
// npm i express
// npm i express@4.18.0  # 특정 버전

// 개발 의존성 설치
// npm install --save-dev jest
// npm i -D jest

// 전역 설치
// npm install -g nodemon
// npm i -g nodemon

// 특정 버전 설치
// npm install express@4.17.1

// ===== 제거 명령어 =====

// 패키지 제거
// npm uninstall express
// npm un express  # 단축형

// 개발 의존성 제거
// npm uninstall --save-dev jest
// npm un -D jest

// ===== 확인 명령어 =====

// 설치된 패키지 목록
// npm list
// npm ls

// 전역 패키지 목록
// npm list -g

// 패키지 정보 확인
// npm view express
// npm info express

// outdated 패키지 확인
// npm outdated

// ===== 기타 명령어 =====

// 스크립트 실행
// npm run dev
// npm run test
// npm start  # start 는 run 생략 가능

// 캐시 정리
// npm cache clean --force

// 프로젝트 초기화
// npm init -y  # 빠른 생성
// npm init     # 단계별 생성

// 버전 확인
// npm --version
// node --version

// 보안 감사
// npm audit
// npm audit fix  # 자동 수정

console.log('NPM commands reference');`}
        />

        <InfoCard type="warning" title="npm install vs npm ci">
          <p>
            <strong>npm install</strong>: package.json 과 package-lock.json 을 업데이트
            <br />
            <strong>npm ci</strong>: package-lock.json 에서 정확히 설치 (CI/CD 에서 사용)
            <br />
            프로덕션 배포 시에는 <code>npm ci</code> 를 사용하세요!
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="node-modules">3️⃣ node_modules</h2>
        <p>
          <code>node_modules</code> 는 설치된 패키지가 저장되는 디렉토리입니다.
        </p>

        <CodeDemo
          title="node_modules 관리"
          description="의존성 디렉토리를 이해합니다."
          defaultCode={`// node_modules 특징

// 1. gitignore 에 추가 (권장)
// node_modules/

// 2. 중첩 구조 (Node.js 3 이전)
// node_modules/
//   express/
//     node_modules/
//       body-parser/
//         node_modules/
//           ...

// 3. 플랫 구조 (Node.js 3+, 중복 제거)
// node_modules/
//   express/
//   body-parser/
//   ...

// 4. 모듈 해석 순서
// require('express') 검색 경로:
// 1. ./node_modules/express
// 2. ../node_modules/express
// 6. ../../node_modules/express
// ... (루트까지)

// 5. package-lock.json
// - 정확한 설치 버전 기록
// - 팀원 간 일관된 환경 보장
// - git 에 커밋 권장

// 6. .npmrc 설정
// 레지스트리 변경
// registry=https://registry.npmjs.org/

// 또는 사내 레지스트리
// registry=https://nexus.company.com/repository/npm/

// 스크립트 후킹
// preinstall = npm run before-install
// postinstall = npm run after-install

console.log('node_modules management');`}
        />

        <InfoCard type="tip" title="package-lock.json">
          <p>
            <strong>package-lock.json</strong> 은 설치된 패키지의{' '}
            <strong>정확한 버전과 의존성 트리</strong>를 기록합니다.
            <br />
            <strong>반드시 git 에 커밋</strong>하여 팀원들이 동일한 환경을 사용하도록 하세요!
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="npx">4️⃣ npx</h2>
        <p>
          <code>npx</code> 는 패키지를 임시로 실행하는 도구입니다.
        </p>

        <CodeDemo
          title="npx 사용법"
          description="패키지를 설치하지 않고 실행합니다."
          defaultCode={`// npx 기본 사용법

// 1. 전역 설치 없이 명령어 실행
// npx create-react-app my-app
// npx create-next-app my-app
// npx tsc --init

// 2. 특정 버전 실행
// npx create-react-app@5.0.0 my-app
// npx typescript@4.9 tsc

// 3. 일회성 스크립트 실행
// npx cowsay "Hello, World!"
// npx figlet "NPM"

// 4. 로컬 패키지 실행
// ./node_modules/.bin/jest  # 기존 방식
// npx jest                  # npx 방식 (권장)

// 5. GitHub 리포지토리에서 실행
// npx github:user/repo

// 6. 패키지 없이 코드 실행
// npx node -e "console.log('Hello')"

// npx 동작 방식:
// 1. node_modules/.bin 에서 검색
// 2. 전역 설치된 패키지에서 검색
// 3. 없으면 임시 다운로드 후 실행 (삭제됨)

// 실전 예시: 프로젝트 스캐폴딩
// npx create-react-app my-app
// npx create-next-app@latest my-app --typescript
// npx tsc --init
// npx eslint --init
// npx prisma init

console.log('npx usage examples');`}
        />

        <InfoCard type="tip" title="npx 의 장점">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>전역 설치 불필요 (디스크 절약)</li>
            <li>항상 최신 버전 사용 가능</li>
            <li>버전 충돌 방지</li>
            <li>일회성 도구 실행에 이상적</li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="alternatives">5️⃣ 대안 패키지 매니저</h2>
        <p>NPM 외에도 다양한 패키지 매니저가 있습니다.</p>

        <CodeDemo
          title="패키지 매니저 비교"
          description="NPM, Yarn, pnpm 을 비교합니다."
          defaultCode={`// ===== Yarn =====
// Facebook 에서 개발 (2016)
// npm install -g yarn

// 주요 명령어
// yarn add express           # npm install express
// yarn add -D jest           # npm install -D jest
// yarn remove express        # npm uninstall express
// yarn install               # npm install
// yarn run dev               # npm run dev

// yarn.lock: package-lock.json 과 동일 역할

// ===== pnpm =====
// 성능 최적화, 디스크 공간 절약
// npm install -g pnpm

// 주요 명령어
// pnpm add express
// pnpm add -D jest
// pnpm remove express
// pnpm install

// 특징:
// - 전역 스토어에서 심볼릭 링크
// - node_modules 크기 50% 감소
// - 설치 속도 빠름

// ===== Bun =====
// 초고속 JavaScript 런타임 (2023)
// 패키지 매니저 내장

// bun add express
// bun add -d jest
// bun remove express
// bun install

// 특징:
// - npm/yarn 보다 10-100 배 빠름
// - Node.js 와 호환
// - 내장 번들러, 테스터

// ===== 비교표 =====
// | 기능      | npm    | yarn   | pnpm   | bun    |
// |-----------|--------|--------|--------|--------|
// | 속도      | 보통   | 빠름   | 매우빠름| 초고속 |
// | 디스크    | 많음   | 보통   | 적음   | 적음   |
// | 호환성    | 100%   | 100%   | 99%    | 95%    |
// | 잠금파일  | lock   | lock   | lock   | lock   |

console.log('Package manager comparison');`}
        />

        <InfoCard type="tip" title="어떤 패키지 매니저를 사용할까?">
          <p>
            <strong>NPM</strong>: 기본, 안정성 중시
            <br />
            <strong>pnpm</strong>: 디스크 공간, 속도 중시 (권장)
            <br />
            <strong>Yarn</strong>: 레거시 프로젝트
            <br />
            <strong>Bun</strong>: 실험적, 속도 최우선
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="scripts">6️⃣ NPM 스크립트</h2>
        <p>
          <code>scripts</code> 필드를 활용해 개발 워크플로우를 자동화합니다.
        </p>

        <CodeDemo
          title="NPM 스크립트"
          description="개발 워크플로우를 자동화합니다."
          defaultCode={`// package.json scripts 예시
{
  "scripts": {
    // 기본 스크립트
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "test": "jest",
    
    // 체이닝 (&& 순차, & 병렬)
    "build:clean": "rm -rf dist/ && tsc",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    
    // 프리/포스트 훅
    "prebuild": "npm run lint",
    "build": "tsc",
    "postbuild": "echo Build completed!",
    
    "pretest": "npm run build",
    "test": "jest",
    
    // 환경 변수 설정
    "dev:prod": "NODE_ENV=production node src/index.js",
    "dev:windows": "set NODE_ENV=production&& node src/index.js",
    
    // cross-platform (추천)
    "dev:prod": "cross-env NODE_ENV=production node src/index.js",
    
    // 여러 스크립트 동시 실행
    "dev:all": "concurrently \\"npm:dev\\" \\"npm:dev:client\\"",
    
    // 린팅/포맷팅
    "lint": "eslint src/ --ext .ts,.tsx",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write \\"src/**/*.{ts,tsx}\\"",
    
    // 데이터베이스
    "db:migrate": "prisma migrate dev",
    "db:seed": "prisma db seed",
    "db:studio": "prisma studio",
    
    // Docker
    "docker:build": "docker build -t my-app .",
    "docker:run": "docker run -p 3000:3000 my-app",
    "docker:dev": "docker-compose up -d"
  }
}

// 사용법
// npm run dev
// npm run build
// npm test
// npm run lint:fix

// start 는 run 생략 가능
// npm start  # npm run start 와 동일

console.log('NPM scripts automation');`}
        />

        <InfoCard type="tip" title="유용한 NPM 패키지">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <code>nodemon</code>: 파일 변경 감지 후 자동 재시작
            </li>
            <li>
              <code>concurrently</code>: 여러 명령어 동시 실행
            </li>
            <li>
              <code>cross-env</code>: 크로스 플랫폼 환경 변수
            </li>
            <li>
              <code>dotenv</code>: .env 파일 로드
            </li>
            <li>
              <code>rimraf</code>: 크로스 플랫폼 rm -rf
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <strong>package.json</strong>: 프로젝트 메타데이터, 의존성 정의
            </li>
            <li>
              <strong>SemVer</strong>: major.minor.patch, ^ 와 ~ 차이 이해
            </li>
            <li>
              <strong>npm install</strong>: 의존성 설치, <code>-D</code> 는 개발 의존성
            </li>
            <li>
              <strong>node_modules</strong>: gitignore 에 추가, lock 파일은 커밋
            </li>
            <li>
              <strong>npx</strong>: 설치 없이 임시 실행
            </li>
            <li>
              <strong>대안</strong>: Yarn, pnpm (권장), Bun (초고속)
            </li>
            <li>
              <strong>scripts</strong>: 개발 워크플로우 자동화
            </li>
            <li>
              <strong>pre/post 훅</strong>: 스크립트 전후 자동 실행
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
