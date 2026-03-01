import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function NodeIntro() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Node.js 소개</h1>
        <p className="page-description">
          Node.js 의 기본 개념과 특징, 그리고 JavaScript 와의 관계를 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>Node.js</strong> 는 Chrome V8 엔진으로 빌드된 <strong>JavaScript 런타임</strong>
          입니다. Ryan Dahl 이 2009 년에 출시했으며, JavaScript 를 브라우저 밖에서 실행할 수 있게
          합니다.
        </p>

        <InfoCard type="tip" title="Node.js 의 특징">
          <ul style={{ margin: '0.5rem 0 0 1.2rem' }}>
            <li>
              <strong>비동기 I/O</strong>: 논블로킹 방식으로 높은 동시성 처리
            </li>
            <li>
              <strong>이벤트 기반</strong>: 이벤트 루프를 통한 효율적인 작업 처리
            </li>
            <li>
              <strong>단일 스레드</strong>: 적은 메모리로 많은 연결 처리
            </li>
            <li>
              <strong>NPM</strong>: 세계 최대의 패키지 생태계
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="why-nodejs">1️⃣ 왜 Node.js 인가?</h2>
        <p>
          Node.js 는 특히 <strong>I/O 바운드</strong> 작업에 적합합니다.
        </p>

        <CodeDemo
          title="Node.js 사용 사례"
          description="Node.js 가 적합한 상황을 확인해보세요."
          defaultCode={`// Node.js 적합한 경우 ✅

// 1. 실시간 애플리케이션 (채팅, 게임)
// - WebSocket 으로 양방향 통신
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received:', message);
    wss.clients.forEach((client) => {
      client.send(message);
    });
  });
});

// 2. API 서버 (REST, GraphQL)
// - Express, Fastify 등의 프레임워크
const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000);

// 3. 파일 I/O 작업
// - 비동기 파일 읽기/쓰기
const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// 4. 프록시 서버
// - 미들웨어로 요청/응답 변환
app.use('/api', (req, res) => {
  // 요청 가공 후 다른 서버로 전달
});

// Node.js 부적합한 경우 ❌
// - CPU 집약적 작업 (이미지 처리, 암호화)
// - 관계형 데이터베이스 복잡한 쿼리
// - 머신러닝/딥러닝 학습

console.log('Node.js use cases');`}
        />

        <InfoCard type="warning" title="CPU 바운드 작업">
          <p>
            Node.js 는 <strong>CPU 집약적 작업</strong>에는 부적합합니다.
            <br />
            단일 스레드 특성상 긴 계산 작업이 이벤트 루프를 블로킹합니다.
            <br />
            해결: Worker Threads, 네이티브 애드온, 다른 서비스 분리
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="runtime">2️⃣ JavaScript 런타임</h2>
        <p>Node.js 는 JavaScript 를 실행하는 환경입니다. 브라우저와 다른 점을 이해합니다.</p>

        <CodeDemo
          title="Node.js vs 브라우저"
          description="Node.js 와 브라우저 환경의 차이점입니다."
          defaultCode={`// Node.js 와 브라우저 비교

// ===== 공통점 =====
// - JavaScript 문법 사용
// - V8 엔진 (크롬과 동일)
// - ES6+ 기능 지원
// - 비동기 프로그래밍 (Promise, async/await)

// ===== 브라우저 전용 API =====
// - DOM 조작 (document, window)
// - localStorage, sessionStorage
// - fetch API (Node.js 18+ 에서 지원)
// - Web Audio API, Canvas

// ===== Node.js 전용 API =====
// - 파일 시스템 (fs 모듈)
// - 네트워크 (http, net 모듈)
// - 운영체제 정보 (os 모듈)
// - 프로세스 제어 (process, child_process)

// Node.js 전역 객체
console.log('global:', typeof global);      // object
console.log('process:', typeof process);    // object
console.log('Buffer:', typeof Buffer);      // function
console.log('__dirname:', __dirname);       // 현재 디렉토리
console.log('__filename:', __filename);     // 현재 파일 경로

// 브라우저 전역 객체 (Node.js 에서 없음)
// console.log('window:', typeof window);   // undefined
// console.log('document:', typeof document); // undefined

// Node.js 18+ 에서 fetch 지원
// fetch('https://api.example.com')
//   .then(res => res.json())
//   .then(data => console.log(data));

console.log('Node.js global objects');`}
        />
      </section>

      <section className="content-section">
        <h2 id="installation">3️⃣ 설치와 설정</h2>
        <p>Node.js 설치 방법과 기본 설정을 학습합니다.</p>

        <CodeDemo
          title="Node.js 설치"
          description="Node.js 설치와 버전 관리 방법입니다."
          defaultCode={`// 설치 방법

// 1. 공식 웹사이트에서 다운로드
// https://nodejs.org
// - LTS (Long Term Support): 안정 버전 (권장)
// - Current: 최신 기능 (개발용)

// 2. 패키지 매니저로 설치 (macOS/Linux)
// Homebrew (macOS)
// brew install node

// apt (Ubuntu/Debian)
// sudo apt install nodejs npm

// 3. NVM (Node Version Manager) - 권장
// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
// nvm install --lts    # 최신 LTS 설치
// nvm install 18       # 특정 버전 설치
// nvm use 18           # 버전 전환
// nvm ls               # 설치된 버전 목록

// 설치 확인
// node --version    // v20.x.x
// npm --version     // 10.x.x

// package.json 생성
// npm init -y       // 빠른 생성
// npm init          // 단계별 생성

// package.json 예시
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My Node.js App",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}

console.log('Node.js installation guide');`}
        />

        <InfoCard type="tip" title="NVM 사용 권장">
          <p>
            <strong>NVM (Node Version Manager)</strong> 을 사용하면 프로젝트별로 다른 Node.js 버전을
            사용할 수 있습니다.
            <br />
            <code>.nvmrc</code> 파일에 버전을 명시하면 팀원들이 동일한 버전을 사용できます.
          </p>
          <pre style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
            {`# .nvmrc
20.10.0

# 사용
nvm use  # .nvmrc 의 버전으로 전환`}
          </pre>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="first-app">4️⃣ 첫 번째 Node.js 애플리케이션</h2>
        <p>간단한 HTTP 서버를 만들어봅니다.</p>

        <CodeDemo
          title="첫 번째 애플리케이션"
          description="HTTP 서버를 만들어봅니다."
          defaultCode={`// ===== 첫 번째 Node.js 앱 =====

// 1. 기본 HTTP 서버 (내장 모듈)
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\\n');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/');
});

// 2. ES Modules 사용 (package.json 에 "type": "module")
// import http from 'http';

// const server = http.createServer((req, res) => {
//   res.end('Hello, ES Modules!');
// });

// server.listen(3000);

// 3. Express 프레임워크 사용
// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello, Express!');
// });

// app.get('/api/users', (req, res) => {
//   res.json({ users: ['Alice', 'Bob'] });
// });

// app.listen(3000, () => {
//   console.log('Express server running');
// });

// 4. 비동기 작업 예제
// const fs = require('fs').promises;

// async function readFile() {
//   try {
//     const data = await fs.readFile('file.txt', 'utf8');
//     console.log(data);
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// }

// readFile();

console.log('First Node.js app examples');`}
        />
      </section>

      <section className="content-section">
        <h2 id="event-loop-node">5️⃣ Node.js 이벤트 루프</h2>
        <p>Node.js 의 이벤트 루프는 브라우저와 약간 다릅니다.</p>

        <CodeDemo
          title="Node.js 이벤트 루프"
          description="Node.js 의 이벤트 루프 단계를 이해합니다."
          defaultCode={`// Node.js 이벤트 루프 단계

// 1. Timers: setTimeout, setInterval 콜백
// 2. Pending Callbacks: 시스템 관련 콜백
// 3. Idle, Prepare: 내부용
// 4. Poll: I/O 콜백 (메인 단계)
// 5. Check: setImmediate 콜백
// 6. Close Callbacks: close 이벤트

// 실행 순서 예제
console.log('Start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');

// 출력 순서 (Node.js 11+):
// Start
// End
// Promise (마이크로태스크)
// setTimeout (timers 단계)
// setImmediate (check 단계)

// process.nextTick (마이크로태스크보다 우선)
console.log('\\n=== nextTick ===');

process.nextTick(() => {
  console.log('nextTick 1');
  process.nextTick(() => {
    console.log('nextTick 2');
  });
});

Promise.resolve().then(() => {
  console.log('Promise after nextTick');
});

console.log('Sync end');

// 출력:
// Sync end
// nextTick 1
// nextTick 2
// Promise after nextTick

console.log('Node.js event loop phases');`}
        />

        <InfoCard type="tip" title="process.nextTick vs setImmediate">
          <p>
            <strong>process.nextTick</strong>: 현재 연산 완료 후, 이벤트 루프 다음 단계 전 실행
            (최우선)
            <br />
            <strong>setImmediate</strong>: Poll 단계 완료 후, Check 단계에서 실행
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <strong>Node.js</strong>: Chrome V8 기반 JavaScript 런타임
            </li>
            <li>
              <strong>특징</strong>: 비동기 I/O, 이벤트 기반, 단일 스레드, NPM
            </li>
            <li>
              <strong>사용 사례</strong>: 실시간 앱, API 서버, I/O 작업, 프록시
            </li>
            <li>
              <strong>부적합</strong>: CPU 집약적 작업
            </li>
            <li>
              <strong>전역 객체</strong>: global, process, Buffer, __dirname, __filename
            </li>
            <li>
              <strong>설치</strong>: 공식 웹사이트 또는 NVM 사용 (권장)
            </li>
            <li>
              <strong>이벤트 루프</strong>: Timers → Pending → Poll → Check → Close
            </li>
            <li>
              <strong>process.nextTick</strong>: 마이크로태스크보다 우선 실행
            </li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <h2 id="quiz">🎯 퀴즈</h2>
        <CodeDemo
          title="퀴즈: Node.js 개념 확인"
          description="Node.js 기본 개념을 확인합니다."
          defaultCode={`// 퀴즈 1: Node.js 전역 객체가 아닌 것은?
// A) global
// B) window
// C) process
// D) Buffer
// 정답: B (window 는 브라우저 전용)

// 퀴즈 2: Node.js 가 적합한 작업은?
// A) 이미지 리사이징
// B) 비디오 인코딩
// C) 실시간 채팅
// D: 머신러닝 학습
// 정답: C (I/O 바운드 작업)

// 퀴즈 3: process.nextTick 과 Promise 중 먼저 실행되는 것은?
// 정답: process.nextTick

// 퀴즈 4: __dirname 의 값은?
// A) 현재 작업 디렉토리
// B) 현재 파일의 디렉토리 경로
// C) Node.js 설치 디렉토리
// D) 사용자 홈 디렉토리
// 정답: B

// 퀴즈 5: NPM 의 전체 이름은?
// 정답: Node Package Manager (또는 Node Packaged Modules)

console.log('Quiz completed!');`}
        />
      </section>
    </div>
  );
}
