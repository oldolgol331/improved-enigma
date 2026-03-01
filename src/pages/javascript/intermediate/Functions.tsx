import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function Functions() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>함수 (Functions)</h1>
        <p className="page-description">
          JavaScript 함수의 다양한 선언 방식과 고급 기능에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          함수는 JavaScript 의 핵심 구성 요소로, 재사용 가능한 코드 블록입니다. JavaScript 에서
          함수는 <strong>일급 객체 (First-class Citizen)</strong> 로, 변수에 할당하거나 인수로 전달,
          반환할 수 있습니다.
        </p>
      </section>

      <section className="content-section">
        <h2 id="declaration">1️⃣ 함수 선언문 vs 함수 표현식</h2>
        <p>함수를 정의하는 두 가지 주요 방법입니다.</p>

        <InfoCard type="tip" title="호이스팅 차이">
          <p>
            <strong>함수 선언문</strong> 은 호이스팅되어 선언 전에 호출 가능합니다.
            <br />
            <strong>함수 표현식</strong> 은 호이스팅되지 않아 선언 후에만 호출 가능합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="함수 선언 방식"
          description="선언문과 표현식의 차이를 확인해보세요."
          defaultCode={`// 함수 선언문 (Function Declaration)
function add(a, b) {
  return a + b;
}
console.log('add(2, 3):', add(2, 3)); // 5

// 함수 표현식 (Function Expression)
const subtract = function(a, b) {
  return a - b;
};
console.log('subtract(5, 3):', subtract(5, 3)); // 2

// 호이스팅 차이
// console.log(declaration(2, 3)); // OK - 호이스팅됨
// console.log(expression(2, 3)); // 오류! 호이스팅 안됨

function declaration(a, b) {
  return a + b;
}

const expression = function(a, b) {
  return a + b;
};

// 익명 함수 (이름 없음)
const anonymous = function(a, b) {
  return a * b;
};
console.log('anonymous(3, 4):', anonymous(3, 4)); // 12`}
        />
      </section>

      <section className="content-section">
        <h2 id="arrow">2️⃣ 화살표 함수 (Arrow Function)</h2>
        <p>
          ES6 에서 도입된 간결한 함수 표현식입니다. <code>this</code> 바인딩이 다릅니다.
        </p>

        <InfoCard type="warning" title="this 바인딩 주의">
          <p>
            화살표 함수는{' '}
            <strong>
              자신의 <code>this</code> 를 가지지 않으며
            </strong>
            , 상위 스코프의 <code>this</code> 를 그대로 사용합니다. 객체 메서드나 이벤트
            핸들러에서는 주의가 필요합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="화살표 함수"
          description="간결한 화살표 함수 문법입니다."
          defaultCode={`// 기본 화살표 함수
const add = (a, b) => {
  return a + b;
};
console.log('add(2, 3):', add(2, 3)); // 5

// 암시적 반환 (return 생략)
const multiply = (a, b) => a * b;
console.log('multiply(3, 4):', multiply(3, 4)); // 12

// 매개변수 하나일 때 괄호 생략
const square = x => x * x;
console.log('square(5):', square(5)); // 25

// 매개변수 없을 때
const sayHi = () => console.log('Hi!');
sayHi();

// 객체 반환 시 괄호 필요
const createPerson = (name, age) => ({ name, age });
console.log('createPerson:', createPerson('Alice', 25));

// this 동작 비교
const person = {
  name: 'Bob',
  
  // 일반 함수: this 가 person
  greetRegular: function() {
    console.log('Regular:', this.name);
  },
  
  // 화살표 함수: this 가 상위 스코프 (window/global)
  greetArrow: () => {
    console.log('Arrow:', this.name); // undefined
  }
};

person.greetRegular(); // Regular: Bob
person.greetArrow(); // Arrow: undefined`}
        />
      </section>

      <section className="content-section">
        <h2 id="parameters">3️⃣ 매개변수 (Parameters)</h2>
        <p>함수의 매개변수는 기본값, 나머지 매개변수 등 다양한 기능을 지원합니다.</p>

        <CodeDemo
          title="매개변수 고급 기능"
          description="기본값, 나머지 매개변수 등을 확인해보세요."
          defaultCode={`// 기본 매개변수 (Default Parameters)
function greet(name = 'Guest') {
  console.log(\`Hello, \${name}!\`);
}
greet(); // Hello, Guest!
greet('Alice'); // Hello, Alice!

// 나머지 매개변수 (Rest Parameters)
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
console.log('sum(1, 2, 3):', sum(1, 2, 3)); // 6
console.log('sum(1, 2, 3, 4, 5):', sum(1, 2, 3, 4, 5)); // 15

// 구조 분해 매개변수
function printUser({ name, age, city = 'Unknown' }) {
  console.log(\`\${name}, \${age} 세, \${city}\`);
}
printUser({ name: 'Alice', age: 25 });
// Alice, 25 세, Unknown

// Spread 와 함께 사용
const args = [1, 2, 3, 4, 5];
console.log('sum(...args):', sum(...args)); // 15`}
        />
      </section>

      <section className="content-section">
        <h2 id="callback">4️⃣ 콜백 함수 (Callback Function)</h2>
        <p>
          다른 함수의 인수로 전달되는 함수입니다. 비동기 처리와 배열 메서드에서 자주 사용됩니다.
        </p>

        <CodeDemo
          title="콜백 함수"
          description="함수를 인수로 전달하는 패턴입니다."
          defaultCode={`// 콜백 함수 기본 예제
function greet(name, callback) {
  console.log(\`Hello, \${name}!\`);
  callback();
}

function sayGoodbye() {
  console.log('Goodbye!');
}

greet('Alice', sayGoodbye);
// Hello, Alice!
// Goodbye!

// 익명 콜백
greet('Bob', () => {
  console.log('See you later!');
});

// 배열 메서드에서 콜백
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log('doubled:', doubled);

const evens = numbers.filter(n => n % 2 === 0);
console.log('evens:', evens);

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('sum:', sum);

// forEach 에서 콜백
numbers.forEach((n, i) => {
  console.log(\`index \${i}: \${n}\`);
});`}
        />
      </section>

      <section className="content-section">
        <h2 id="iife">5️⃣ 즉시 실행 함수 (IIFE)</h2>
        <p>정의하자마자 즉시 실행되는 함수입니다. 스코프 분리에 사용됩니다.</p>

        <InfoCard type="note" title="IIFE 의 활용">
          <p>
            ES6 의 블록 스코프 (<code>let</code>, <code>const</code>) 가 도입되기 전에는 IIFE 가
            스코프 분리의 주요 수단이었습니다. 현재는 모듈 시스템과 블록 스코프를 주로 사용합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="IIFE (Immediately Invoked Function Expression)"
          description="정의 즉시 실행되는 함수입니다."
          defaultCode={`// 기본 IIFE
(function() {
  const message = 'IIFE executed!';
  console.log(message);
})();
// console.log(message); // 오류! 스코프 분리됨

// 화살표 함수 IIFE
(() => {
  console.log('Arrow IIFE');
})();

// 값 반환
const result = (function(a, b) {
  return a + b;
})(2, 3);
console.log('result:', result); // 5

// async IIFE
(async function() {
  const data = await Promise.resolve('Async IIFE');
  console.log(data);
})();

// 변수 격리 (레거시 패턴)
var counter = (function() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
})();

console.log('count:', counter.getCount()); // 0
counter.increment();
counter.increment();
console.log('count after increments:', counter.getCount()); // 2`}
        />
      </section>

      <section className="content-section">
        <h2 id="higher-order">6️⃣ 고차 함수 (Higher-Order Function)</h2>
        <p>함수를 인수로 받거나 함수를 반환하는 함수입니다.</p>

        <CodeDemo
          title="고차 함수"
          description="함수를 다루는 함수입니다."
          defaultCode={`// 함수를 인수로 받는 고차 함수
function repeat(fn, times) {
  for (let i = 0; i < times; i++) {
    fn(i);
  }
}

repeat(i => console.log(\`Repeat \${i}\`), 3);

// 함수를 반환하는 고차 함수 (커링)
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);
const triple = multiply(3);

console.log('double(5):', double(5)); // 10
console.log('triple(5):', triple(5)); // 15

// 실용적인 고차 함수 예제
function createGreeter(greeting) {
  return function(name) {
    console.log(\`\${greeting}, \${name}!\`);
  };
}

const sayHello = createGreeter('Hello');
const sayHi = createGreeter('Hi');

sayHello('Alice'); // Hello, Alice!
sayHi('Bob'); // Hi, Bob!

// 함수 조합 (compose)
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}

const add1 = x => x + 1;
const double2 = x => x * 2;

const addThenDouble = compose(double2, add1);
console.log('addThenDouble(5):', addThenDouble(5)); // 12 (5 + 1 = 6, 6 * 2 = 12)`}
        />
      </section>

      <section className="content-section">
        <h2 id="recursion">7️⃣ 재귀 함수 (Recursion)</h2>
        <p>함수가 자기 자신을 호출하는 것입니다.</p>

        <InfoCard type="warning" title="재귀 주의사항">
          <p>
            재귀 함수는 반드시 <strong>종료 조건 (base case)</strong> 이 있어야 합니다. 없으면 무한
            루프와 스택 오버플로우가 발생합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="재귀 함수"
          description="자기 자신을 호출하는 함수입니다."
          defaultCode={`// 팩토리얼 (재귀)
function factorial(n) {
  if (n <= 1) return 1; // 종료 조건
  return n * factorial(n - 1);
}
console.log('5!:', factorial(5)); // 120

// 피보나치 (재귀)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log('fibonacci(10):', fibonacci(10)); // 55

// 메모이제이션 (성능 최적화)
function memoizedFibonacci() {
  const cache = {};
  return function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}

const fib = memoizedFibonacci();
console.log('fib(50):', fib(50)); // 매우 빠름!

// 재귀로 배열 평탄화
function flatten(arr) {
  let result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

const nested = [1, [2, [3, 4], 5], [6, [7]]];
console.log('flatten:', flatten(nested)); // [1, 2, 3, 4, 5, 6, 7]

// flat 메서드 (현대 JavaScript)
console.log('flat(Infinity):', nested.flat(Infinity));`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>함수 선언문: 호이스팅됨, 표현식: 호이스팅 안됨</li>
            <li>
              화살표 함수: 간결한 문법, <code>this</code> 바인딩 주의
            </li>
            <li>
              매개변수: 기본값, 나머지 매개변수 (<code>...args</code>)
            </li>
            <li>콜백 함수: 다른 함수의 인수로 전달</li>
            <li>IIFE: 정의 즉시 실행, 스코프 분리</li>
            <li>고차 함수: 함수를 인수로 받거나 반환</li>
            <li>재귀: 자기 자신 호출, 종료 조건 필수</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
