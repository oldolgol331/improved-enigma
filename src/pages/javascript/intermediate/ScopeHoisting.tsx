import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ScopeHoisting() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>스코프와 호이스팅 (Scope & Hoisting)</h1>
        <p className="page-description">
          JavaScript 의 스코프 시스템과 호이스팅 동작에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>스코프</strong> 는 변수에 접근할 수 있는 범위를 정의합니다.
          <br />
          <strong>호이스팅</strong> 은 변수와 함수 선언이 코드의 최상단으로 끌어올려지는 JavaScript
          의 동작입니다.
        </p>
      </section>

      <section className="content-section">
        <h2 id="scope-types">1️⃣ 스코프의 종류</h2>
        <p>JavaScript 에는 전역 스코프, 함수 스코프, 블록 스코프가 있습니다.</p>

        <InfoCard type="warning" title="var 는 함수 스코프">
          <p>
            <code>var</code> 는 <strong>함수 스코프</strong> 를 가지므로 블록 내에서 선언해도 함수
            전체에서 접근 가능합니다. 이는 버그의 원인이 되므로 <code>let</code>/<code>const</code>{' '}
            를 사용하세요.
          </p>
        </InfoCard>

        <CodeDemo
          title="스코프의 종류"
          description="전역, 함수, 블록 스코프를 확인해보세요."
          defaultCode={`// 전역 스코프
const globalVar = 'I am global';

function checkScope() {
  // 함수 스코프
  const functionScope = 'I am in function';
  
  if (true) {
    // 블록 스코프 (let, const)
    let blockLet = 'I am in block (let)';
    const blockConst = 'I am in block (const)';
    
    // var 는 함수 스코프
    var blockVar = 'I am var (function scope)';
  }
  
  console.log('functionScope:', functionScope); // OK
  // console.log('blockLet:', blockLet); // 오류! 블록 스코프
  // console.log('blockConst:', blockConst); // 오류! 블록 스코프
  console.log('blockVar:', blockVar); // OK (var 는 함수 스코프)
}

checkScope();
console.log('globalVar:', globalVar); // OK
// console.log('functionScope:', functionScope); // 오류! 함수 스코프 밖`}
        />
      </section>

      <section className="content-section">
        <h2 id="lexical">2️⃣ 렉시컬 스코프 (Lexical Scope)</h2>
        <p>
          JavaScript 는 렉시컬 스코프를 따릅니다. 함수는 자신이 정의된 위치의 스코프를 기억합니다.
        </p>

        <CodeDemo
          title="렉시컬 스코프"
          description="함수는 정의된 위치의 스코프를 기억합니다."
          defaultCode={`// 렉시컬 스코프 예제
const name = 'Global';

function outer() {
  const name = 'Outer';
  
  function inner() {
    const name = 'Inner';
    console.log('inner:', name); // Inner
  }
  
  function innerNoName() {
    console.log('innerNoName:', name); // Outer (자신의 스코프에서 찾음)
  }
  
  inner();
  innerNoName();
}

outer();

// 중첩 스코프
function createCounter() {
  let count = 0;
  
  return function() {
    count++;
    console.log('count:', count);
  };
}

const counter = createCounter();
counter(); // count: 1
counter(); // count: 2
counter(); // count: 3`}
        />
      </section>

      <section className="content-section">
        <h2 id="hoisting">3️⃣ 호이스팅 (Hoisting)</h2>
        <p>
          JavaScript 는 변수와 함수 선언을 코드의 시작 부분으로 끌어올립니다. 실제로 이동하는 것이
          아니라 <strong>선언을 먼저 처리</strong>하는 것입니다.
        </p>

        <InfoCard type="warning" title="호이스팅의 함정">
          <p>
            <code>var</code> 는 선언만 호이스팅되고 초기화는 되지 않아 <code>undefined</code> 가
            됩니다.
            <br />
            <code>let</code>/<code>const</code> 는 호이스팅되지만{' '}
            <strong>TDZ(Temporal Dead Zone)</strong> 에 들어가 선언 전에 접근하면 오류가 발생합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="호이스팅"
          description="var, let, const, function 의 호이스팅 차이입니다."
          defaultCode={`// var 호이스팅
console.log('varHoisted:', varHoisted); // undefined
var varHoisted = 'I am var';
console.log('varHoisted:', varHoisted); // I am var

// 실제 동작:
// var varHoisted; // 선언만 호이스팅
// console.log(varHoisted); // undefined
// varHoisted = 'I am var';

// let 호이스팅 (TDZ)
// console.log('letHoisted:', letHoisted); // 오류! TDZ
let letHoisted = 'I am let';
console.log('letHoisted:', letHoisted);

// const 호이스팅 (TDZ)
// console.log('constHoisted:', constHoisted); // 오류! TDZ
const constHoisted = 'I am const';

// 함수 선언문 호이스팅
sayHello(); // Hello! (호이스팅됨)

function sayHello() {
  console.log('Hello!');
}

// 함수 표현식 호이스팅
// sayHi(); // 오류! TDZ
const sayHi = function() {
  console.log('Hi!');
};`}
        />
      </section>

      <section className="content-section">
        <h2 id="tdz">4️⃣ TDZ (Temporal Dead Zone)</h2>
        <p>
          <code>let</code> 과 <code>const</code> 는 선언되기 전까지 접근할 수 없는 영역입니다.
        </p>

        <CodeDemo
          title="TDZ (일시적 데드 존)"
          description="let/const 의 선언 전 접근 제한입니다."
          defaultCode={`// TDZ 예제
// console.log('tdzVar:', tdzVar); // 오류! ReferenceError

let tdzVar = 'I am let';
console.log('tdzVar:', tdzVar);

// TDZ 범위
function checkTDZ() {
  // 이 지점부터 let 선언까지가 TDZ
  // console.log('x:', x); // 오류!
  
  let x = 10;
  console.log('x:', x);
}

checkTDZ();

// 블록 내 TDZ
const value = 'global';

if (true) {
  // console.log('value:', value); // 오류! TDZ
  const value = 'block';
  console.log('value:', value); // block
}`}
        />
      </section>

      <section className="content-section">
        <h2 id="closure">5️⃣ 클로저 (Closure) 미리보기</h2>
        <p>
          클로저는 함수와 그 함수가 정의된 렉시컬 환경의 조합입니다. 자세한 내용은 다음 섹션에서
          다룹니다.
        </p>

        <CodeDemo
          title="클로저 기본"
          description="함수가 외부 변수를 기억하는 현상입니다."
          defaultCode={`// 클로저 기본 예제
function outer() {
  const outerVar = 'I am from outer';
  
  function inner() {
    console.log('inner:', outerVar); // outerVar 에 접근 가능
  }
  
  return inner;
}

const closureFunc = outer();
closureFunc(); // inner: I am from outer

// 클로저 활용 - 데이터 은닉
function createPrivateCounter() {
  let count = 0; // 외부에서 직접 접근 불가
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createPrivateCounter();
console.log('count:', counter.getCount()); // 0
counter.increment();
counter.increment();
console.log('count after increments:', counter.getCount()); // 2

// count 에 직접 접근 불가
// console.log(counter.count); // undefined`}
        />
      </section>

      <section className="content-section">
        <h2 id="common-pitfalls">⚠️ 흔한 함정</h2>
        <p>스코프와 호이스팅 관련 흔한 실수들입니다.</p>

        <InfoCard type="warning" title="for 루프와 var">
          <p>
            <code>var</code> 를 for 루프에서 사용하면{' '}
            <strong>모든 이터레이션이 동일한 변수를 공유</strong>합니다.
            <code>let</code> 을 사용하면 각 이터레이션마다 새로운 스코프가 생성됩니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="for 루프 스코프 함정"
          description="var 와 let 의 차이로 인한 동작 변화입니다."
          defaultCode={`// var 와 setTimeout 함정
console.log('=== var example ===');
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log('var i:', i); // 3, 3, 3 (모두 동일한 i 참조)
  }, 100);
}

// 해결법 1: let 사용
console.log('\\n=== let example ===');
for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log('let j:', j); // 0, 1, 2 (각각 다른 j)
  }, 100);
}

// 해결법 2: IIFE 로 스코프 생성
console.log('\\n=== IIFE example ===');
for (var k = 0; k < 3; k++) {
  (function(index) {
    setTimeout(() => {
      console.log('IIFE k:', index); // 0, 1, 2
    }, 100);
  })(k);
}`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              스코프: 전역, 함수 (<code>var</code>), 블록 (<code>let</code>, <code>const</code>)
            </li>
            <li>렉시컬 스코프: 함수는 정의된 위치의 스코프를 기억</li>
            <li>호이스팅: 선언이 코드로 끌어올려지는 동작</li>
            <li>
              <code>var</code>: 선언만 호이스팅, <code>undefined</code> 로 초기화
            </li>
            <li>
              <code>let/const</code>: 호이스팅되지만 TDZ 에서 접근 불가
            </li>
            <li>클로저: 함수 + 렉시컬 환경, 데이터 은닉에 활용</li>
            <li>
              for 루프: <code>var</code> 대신 <code>let</code> 사용
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
