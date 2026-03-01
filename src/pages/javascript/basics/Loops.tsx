import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function Loops() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>반복문 (Loops)</h1>
        <p className="page-description">
          JavaScript 의 다양한 반복문과 배열 순회 방법에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          반복문은 코드를 반복 실행할 때 사용합니다. JavaScript 는 <code>for</code>,{' '}
          <code>while</code>,<code>do-while</code> 문과 배열 순회를 위한 <code>forEach</code>,{' '}
          <code>for...of</code> 등을 제공합니다.
        </p>
      </section>

      <section className="content-section">
        <h2 id="for">1️⃣ for 문</h2>
        <p>가장 기본적인 반복문으로, 횟수를 정해 반복할 때 사용합니다.</p>

        <CodeDemo
          title="for 문"
          description="기본 for 문 구조입니다."
          defaultCode={`// 기본 for 문
for (let i = 0; i < 5; i++) {
  console.log('i:', i);
}

// 10 부터 5 까지 감소
for (let i = 10; i > 4; i--) {
  console.log('decrease:', i);
}

// 2 씩 증가
for (let i = 0; i < 10; i += 2) {
  console.log('step 2:', i);
}

// break 와 continue
for (let i = 0; i < 10; i++) {
  if (i === 3) continue; // 3 건너뜀
  if (i === 7) break;    // 7 에서 종료
  console.log('i:', i);
}
// 출력: 0, 1, 2, 4, 5, 6`}
        />
      </section>

      <section className="content-section">
        <h2 id="while">2️⃣ while & do-while 문</h2>
        <p>
          조건이 참인 동안 반복합니다. <code>do-while</code> 은 최소 한 번은 실행됩니다.
        </p>

        <CodeDemo
          title="while & do-while"
          description="조건 기반 반복문입니다."
          defaultCode={`// while 문
let count = 0;
while (count < 5) {
  console.log('count:', count);
  count++;
}

// do-while 문 (최소 한 번 실행)
let num = 0;
do {
  console.log('num:', num);
  num++;
} while (num < 3);

// 무한 루프 주의!
// while (true) {
//   console.log('무한 루프!');
// }`}
        />
      </section>

      <section className="content-section">
        <h2 id="for-in">3️⃣ for...in 문</h2>
        <p>
          객체의 키 (key) 를 순회할 때 사용합니다. <strong>배열 순회에는 권장하지 않습니다.</strong>
        </p>

        <InfoCard type="warning" title="for...in 주의사항">
          <p>
            <code>for...in</code> 은 객체의 열거 가능한 속성을 순회합니다.
            <br />
            배열에 사용하면 인덱스가 문자열로 반환되고, 프로토타입 속성까지 순회할 수 있어 배열에는
            적합하지 않습니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="for...in 문"
          description="객체 키 순회에 사용합니다."
          defaultCode={`const person = {
  name: 'Alice',
  age: 25,
  city: 'Seoul'
};

// 객체 키 순회
for (const key in person) {
  console.log(key, ':', person[key]);
}
// name : Alice
// age : 25
// city : Seoul

// hasOwnProperty 로 필터링 (프로토타입 제외)
for (const key in person) {
  if (person.hasOwnProperty(key)) {
    console.log('own property:', key);
  }
}`}
        />
      </section>

      <section className="content-section">
        <h2 id="for-of">4️⃣ for...of 문</h2>
        <p>
          <strong>배열, 문자열, Map, Set 등 이터러블을 순회</strong>할 때 사용합니다. ES6 에서
          도입된 현대적인 문법입니다.
        </p>

        <InfoCard type="tip" title="for...of 권장">
          <p>
            <code>for...of</code> 는 값에 직접 접근할 수 있고, <code>break</code>,{' '}
            <code>continue</code> 를 사용할 수 있어 <code>forEach</code> 보다 유연합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="for...of 문"
          description="이터러블 순회에 사용합니다."
          defaultCode={`const numbers = [1, 2, 3, 4, 5];

// 배열 값 순회
for (const num of numbers) {
  console.log('num:', num);
}

// 문자열 순회
const str = 'Hello';
for (const char of str) {
  console.log('char:', char);
}

// Map 순회
const map = new Map([
  ['name', 'Bob'],
  ['age', 30]
]);
for (const [key, value] of map) {
  console.log(key, ':', value);
}

// Set 순회
const set = new Set([1, 2, 3]);
for (const item of set) {
  console.log('item:', item);
}

// break, continue 사용 가능
for (const num of numbers) {
  if (num === 3) continue;
  if (num === 5) break;
  console.log('num:', num);
}`}
        />
      </section>

      <section className="content-section">
        <h2 id="array-methods">5️⃣ 배열 고차 함수</h2>
        <p>JavaScript 는 함수형 프로그래밍 스타일의 배열 메서드를 제공합니다.</p>

        <CodeDemo
          title="배열 고차 함수"
          description="forEach, map, filter, reduce 등을 확인해보세요."
          defaultCode={`const numbers = [1, 2, 3, 4, 5];

// forEach: 각 요소에 함수 적용
numbers.forEach((num, index) => {
  console.log(\`index \${index}: \${num}\`);
});

// map: 새로운 배열 생성
const doubled = numbers.map(num => num * 2);
console.log('doubled:', doubled); // [2, 4, 6, 8, 10]

// filter: 조건에 맞는 요소만
const evens = numbers.filter(num => num % 2 === 0);
console.log('evens:', evens); // [2, 4]

// reduce: 누적 계산
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log('sum:', sum); // 15

// find: 조건에 맞는 첫 번째 요소
const found = numbers.find(num => num > 3);
console.log('found:', found); // 4

// some: 하나라도 조건 만족
const hasEven = numbers.some(num => num % 2 === 0);
console.log('hasEven:', hasEven); // true

// every: 모두 조건 만족
const allPositive = numbers.every(num => num > 0);
console.log('allPositive:', allPositive); // true

// 체이닝
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 10)
  .reduce((acc, n) => acc + n, 0);
console.log('chained result:', result); // 60 (20 + 40)`}
        />
      </section>

      <section className="content-section">
        <h2 id="comparison">📊 반복문 비교</h2>

        <InfoCard type="note" title="사용 가이드">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>일반 for 문</strong>: 인덱스 제어 필요, 성능 중요 시
            </li>
            <li>
              <strong>for...of</strong>: 배열/이터러블 값 순회 (권장)
            </li>
            <li>
              <strong>forEach</strong>: 간단한 배열 순회, break 불가
            </li>
            <li>
              <strong>for...in</strong>: 객체 키 순회 (배열에는 사용 금지)
            </li>
            <li>
              <strong>while</strong>: 조건 기반 반복, 횟수 미정 시
            </li>
          </ul>
        </InfoCard>

        <CodeDemo
          title="반복문 비교"
          description="각 반복문의 특징을 비교해보세요."
          defaultCode={`const arr = ['a', 'b', 'c'];

// for 문 - 인덱스 접근 가능
for (let i = 0; i < arr.length; i++) {
  console.log('for:', i, arr[i]);
}

// for...of - 값에 직접 접근
for (const item of arr) {
  console.log('for...of:', item);
}

// forEach - 콜백 함수
arr.forEach((item, index) => {
  console.log('forEach:', index, item);
});

// for...in - 객체용 (배열에는 비권장)
for (const index in arr) {
  console.log('for...in:', index, arr[index]);
  // index 는 문자열 "0", "1", "2"
}`}
        />
      </section>

      <section className="content-section">
        <h2 id="async-loops">⚠️ 비동기 루프 주의사항</h2>
        <p>
          비동기 함수를 루프에서 실행할 때는 <code>for...of</code> 와 <code>await</code> 를 사용해야
          합니다.
        </p>

        <InfoCard type="warning" title="forEach 와 async/await">
          <p>
            <code>forEach</code> 는 <code>await</code> 을 기다리지 않습니다. 비동기 루프에는
            <code>for...of</code> 를 사용하세요.
          </p>
        </InfoCard>

        <CodeDemo
          title="비동기 루프"
          description="올바른 비동기 루프 패턴입니다."
          defaultCode={`// Promise 생성 함수
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ❌ 잘못된 패턴 - forEach 는 await 을 기다리지 않음
async function wrongPattern() {
  const numbers = [1, 2, 3];
  numbers.forEach(async (num) => {
    await delay(100);
    console.log('forEach:', num);
  });
  console.log('forEach 완료 (바로 실행됨)');
}

// ✅ 올바른 패턴 - for...of 사용
async function correctPattern() {
  const numbers = [1, 2, 3];
  for (const num of numbers) {
    await delay(100);
    console.log('for...of:', num);
  }
  console.log('for...of 완료 (모두 기다림)');
}

// 실행
console.log('=== Wrong Pattern ===');
wrongPattern();

setTimeout(() => {
  console.log('\\n=== Correct Pattern ===');
  correctPattern();
}, 500);`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <code>for</code>: 기본 반복문, 인덱스 제어 가능
            </li>
            <li>
              <code>while</code> / <code>do-while</code>: 조건 기반 반복
            </li>
            <li>
              <code>for...in</code>: 객체 키 순회 (배열에는 사용 금지)
            </li>
            <li>
              <code>for...of</code>: 배열/이터러블 값 순회 (권장)
            </li>
            <li>
              배열 고차 함수: <code>map</code>, <code>filter</code>, <code>reduce</code>,{' '}
              <code>forEach</code>
            </li>
            <li>
              비동기 루프: <code>for...of</code> + <code>await</code> 사용
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
