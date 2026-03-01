import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function EventLoop() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>이벤트 루프 (Event Loop)</h1>
        <p className="page-description">
          JavaScript 의 비동기 처리 메커니즘인 이벤트 루프에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          JavaScript 는 <strong>단일 스레드 (Single-threaded)</strong> 환경이지만,
          <strong>이벤트 루프 (Event Loop)</strong> 를 통해 비동기 작업을 효율적으로 처리합니다.
          이벤트 루프는 콜 스택, 웹 API, 태스크 큐를 조정하며 논블로킹 I/O 를 가능하게 합니다.
        </p>

        <InfoCard type="tip" title="이벤트 루프의 핵심 구성 요소">
          <ul style={{ margin: '0.5rem 0 0 1.2rem' }}>
            <li>
              <strong>Call Stack</strong>: 현재 실행 중인 함수들의 스택
            </li>
            <li>
              <strong>Web APIs</strong>: 브라우저 제공 비동기 API (setTimeout, fetch 등)
            </li>
            <li>
              <strong>Task Queue (Macrotask)</strong>: 콜백 함수들이 대기하는 큐
            </li>
            <li>
              <strong>Microtask Queue</strong>: Promise 콜백들이 대기하는 우선순위 큐
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="call-stack">1️⃣ 콜 스택 (Call Stack)</h2>
        <p>
          콜 스택은 현재 실행 중인 함수들의 <strong>LIFO(Last In, First Out)</strong> 구조입니다.
        </p>

        <CodeDemo
          title="콜 스택 동작"
          description="함수 호출이 스택에 쌓이고 제거되는 과정을 확인해보세요."
          defaultCode={`// 콜 스택 예제
function first() {
  console.log('first 시작');
  second();
  console.log('first 종료');
}

function second() {
  console.log('second 시작');
  third();
  console.log('second 종료');
}

function third() {
  console.log('third 실행');
}

// 실행 순서:
// 1. first() 호출 → 스택: [first]
// 2. second() 호출 → 스택: [first, second]
// 3. third() 호출 → 스택: [first, second, third]
// 4. third 종료 → 스택: [first, second]
// 5. second 종료 → 스택: [first]
// 6. first 종료 → 스택: []

first();

// 출력:
// first 시작
// second 시작
// third 실행
// second 종료
// first 종료`}
        />

        <InfoCard type="warning" title="Stack Overflow">
          <p>
            재귀 함수가 종료 조건 없이 호출되면 <strong>Stack Overflow</strong> 에러가 발생합니다.
            콜 스택의 크기는 제한되어 있습니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="event-loop">2️⃣ 이벤트 루프 동작</h2>
        <p>
          이벤트 루프는 <strong>콜 스택이 비었을 때</strong> 큐에서 작업을 꺼내 콜 스택에
          푸시합니다.
        </p>

        <CodeDemo
          title="이벤트 루프 동작"
          description="setTimeout 과 동기 코드의 실행 순서를 확인해보세요."
          defaultCode={`// 이벤트 루프 동작 예제
console.log('1. 동기 코드 시작');

setTimeout(() => {
  console.log('2. setTimeout 콜백 (0ms)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise 마이크로태스크');
});

console.log('4. 동기 코드 종료');

// 실행 순서:
// 1. "1. 동기 코드 시작" (동기)
// 2. "4. 동기 코드 종료" (동기)
// 3. "3. Promise 마이크로태스크" (마이크로태스크 우선)
// 4. "2. setTimeout 콜백 (0ms)" (매크로태스크)

// 출력 결과 예측 후 실행해보세요!`}
        />

        <InfoCard type="tip" title="마이크로태스크 vs 매크로태스크">
          <ul style={{ margin: '0.5rem 0 0 1.2rem' }}>
            <li>
              <strong>마이크로태스크</strong>: Promise.then/catch/finally, queueMicrotask,
              MutationObserver
            </li>
            <li>
              <strong>매크로태스크</strong>: setTimeout, setInterval, I/O, UI rendering
            </li>
            <li>
              마이크로태스크가 매크로태스크보다 <strong>우선적으로 실행</strong>됩니다
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="async-order">3️⃣ 비동기 실행 순서</h2>
        <p>다양한 비동기 작업들의 실행 순서를 이해하는 것이 중요합니다.</p>

        <CodeDemo
          title="비동기 실행 순서"
          description="복잡한 비동기 코드의 실행 순서를 예측해보세요."
          defaultCode={`// 복잡한 비동기 실행 순서
console.log('A. 시작');

setTimeout(() => {
  console.log('B. setTimeout 1');
  Promise.resolve().then(() => {
    console.log('C. Promise 1 inside setTimeout');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('D. Promise 1');
  Promise.resolve().then(() => {
    console.log('E. Promise 2 nested');
  });
});

Promise.resolve().then(() => {
  console.log('F. Promise 2');
});

setTimeout(() => {
  console.log('G. setTimeout 2');
}, 0);

console.log('H. 종료');

// 실행 순서 예측:
// 1. A (동기)
// 2. H (동기)
// 3. D (마이크로태스크)
// 4. F (마이크로태스크)
// 5. E (마이크로태스크 - D 에서 생성)
// 6. B (매크로태스크)
// 7. C (마이크로태스크 - B 에서 생성)
// 8. G (매크로태스크)

// 실제 실행 결과를 확인하세요!`}
        />
      </section>

      <section className="content-section">
        <h2 id="practical">4️⃣ 실전 예제</h2>
        <p>이벤트 루프를 이해하면 실제 개발에서 발생할 수 있는 문제들을 해결할 수 있습니다.</p>

        <CodeDemo
          title="실전 예제 - 배칭 (Batching)"
          description="마이크로태스크를 활용한 상태 업데이트 배칭입니다."
          defaultCode={`// 상태 업데이트 배칭 패턴
function batchUpdates(updates) {
  let batched = false;
  let queue = [];

  return function update(data) {
    queue.push(data);
    
    if (!batched) {
      batched = true;
      // 마이크로태스크로 배칭
      queueMicrotask(() => {
        console.log('배치 처리:', queue);
        updates(queue);
        queue = [];
        batched = false;
      });
    }
  };
}

// 사용 예시
const processBatch = batchUpdates((items) => {
  console.log('최종 처리:', items.length, '개 항목');
});

// 여러 번 호출해도 한 번만 처리됨
processBatch({ id: 1 });
processBatch({ id: 2 });
processBatch({ id: 3 });

console.log('동기 코드 완료');

// 출력:
// 동기 코드 완료
// 배치 처리: [{id:1}, {id:2}, {id:3}]
// 최종 처리: 3 개 항목`}
        />

        <InfoCard type="note" title="React 의 배치 처리">
          <p>
            React 18 에서는 <strong>자동 배치 (Automatic Batching)</strong> 가 도입되어 여러 상태
            업데이트가 한 번의 리렌더링으로 처리됩니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="blocking">5️⃣ 블로킹 vs 논블로킹</h2>
        <p>JavaScript 의 논블로킹 특성을 이해하고, 블로킹 코드를 피하는 방법을 학습합니다.</p>

        <CodeDemo
          title="블로킹 코드 주의"
          description="무거운 작업이 이벤트 루프를 블로킹하는 것을 확인해보세요."
          defaultCode={`// ❌ 블로킹 코드 예제
console.log('시작');

// 무거운 동기 작업 (블로킹)
function blockingWork() {
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += i;
  }
  return sum;
}

// const result = blockingWork(); // UI 프리징 발생!
// console.log('결과:', result);

// ✅ 논블로킹 코드 예제
console.log('시작 (비동기)');

function nonBlockingWork() {
  return new Promise((resolve) => {
    setTimeout(() => {
      let sum = 0;
      for (let i = 0; i < 1000000; i++) {
        sum += i;
      }
      resolve(sum);
    }, 0);
  });
}

nonBlockingWork().then((result) => {
  console.log('비동기 결과:', result);
});

console.log('완료 (블로킹 없음)');

// 출력 순서:
// 1. 시작 (비동기)
// 2. 완료 (블로킹 없음)
// 3. 비동기 결과: ...`}
        />

        <InfoCard type="warning" title="웹 워커 (Web Worker)">
          <p>
            정말 무거운 연산은 <strong>웹 워커</strong> 를 사용해 메인 스레드와 분리하세요. 웹
            워커는 별도의 스레드에서 코드를 실행할 수 있습니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              JavaScript 는 <strong>단일 스레드</strong> + <strong>이벤트 루프</strong> 로 비동기
              처리
            </li>
            <li>
              <strong>Call Stack</strong>: 현재 실행 중인 함수 스택 (LIFO)
            </li>
            <li>
              <strong>Web APIs</strong>: 브라우저 제공 비동기 기능
            </li>
            <li>
              <strong>Task Queue</strong>: setTimeout 등의 콜백 대기 (매크로태스크)
            </li>
            <li>
              <strong>Microtask Queue</strong>: Promise 콜백 대기 (우선순위 높음)
            </li>
            <li>
              이벤트 루프: <strong>콜 스택이 비면</strong> 큐에서 작업 실행
            </li>
            <li>
              마이크로태스크가 매크로태스크보다 <strong>먼저 실행</strong>
            </li>
            <li>
              무거운 동기 작업은 <strong>UI 프리징</strong> 유발 주의
            </li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <h2 id="quiz">🎯 퀴즈</h2>
        <CodeDemo
          title="퀴즈: 실행 순서 예측하기"
          description="아래 코드의 실행 순서를 예측한 후 실행해보세요."
          defaultCode={`// 퀴즈 1: 기본 순서
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// 퀴즈 2: 중첩 비동기
console.log('A');

setTimeout(() => {
  console.log('B');
  Promise.resolve().then(() => console.log('C'));
}, 0);

Promise.resolve().then(() => {
  console.log('D');
  setTimeout(() => console.log('E'), 0);
});

console.log('F');

// 퀴즈 3: 복잡한 순서
(async () => {
  console.log('1. async 시작');
  await Promise.resolve();
  console.log('2. await 완료');
})();

console.log('3. 동기 코드');

setTimeout(() => {
  console.log('4. setTimeout');
  queueMicrotask(() => console.log('5. microtask in timeout'));
}, 0);

queueMicrotask(() => console.log('6. 첫번째 microtask'));

// 각 퀴즈의 실행 순서를 예측해보세요!`}
        />
      </section>
    </div>
  );
}
