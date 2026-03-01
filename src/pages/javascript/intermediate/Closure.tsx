import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function Closure() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>클로저 (Closure)</h1>
        <p className="page-description">
          JavaScript 의 클로저 개념과 실용적인 활용법에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>클로저 (Closure)</strong> 는 함수와 그 함수가 정의된{' '}
          <strong>렉시컬 환경 (Lexical Environment)</strong> 의 조합입니다. 쉽게 말해, 함수가 자신이
          생성될 당시의 변수들을 기억하고 접근할 수 있는 기능입니다.
        </p>

        <InfoCard type="tip" title="클로저의 핵심">
          <p>
            <strong>
              내부 함수가 외부 함수의 변수에 접근할 수 있고, 외부 함수가 종료된 후에도 그 변수들이
              메모리에 남아있습니다.
            </strong>
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="basic">1️⃣ 클로저 기본</h2>
        <p>클로저는 내부 함수가 외부 함수의 변수를 참조할 때 발생합니다.</p>

        <CodeDemo
          title="클로저 기본 예제"
          description="함수가 외부 변수를 기억하는 것을 확인해보세요."
          defaultCode={`// 기본 클로저
function outer() {
  const outerVar = 'I am from outer scope';
  
  function inner() {
    console.log('inner:', outerVar);
  }
  
  return inner;
}

const closureFunc = outer();
// outer() 함수는 이미 실행이 끝났지만...
closureFunc(); // inner: I am from outer scope
// inner 함수는 outerVar 를 기억하고 있음!

// 클로저 확인
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
counter(); // count: 3

// counter 함수는 count 변수를 계속 기억하고 있음`}
        />
      </section>

      <section className="content-section">
        <h2 id="practical">2️⃣ 클로저 실용적 활용</h2>
        <p>클로저는 데이터 은닉, 상태 관리, 함수 팩토리 등에 활용됩니다.</p>

        <CodeDemo
          title="클로저 실용적 활용"
          description="데이터 은닉과 상태 관리에 활용됩니다."
          defaultCode={`// 1. 데이터 은닉 (Private Variables)
function createBankAccount(initialBalance) {
  let balance = initialBalance; // 외부에서 직접 접근 불가
  
  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance += amount;
        console.log(\`Deposited: \${amount}\`);
      }
    },
    withdraw: function(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        console.log(\`Withdrew: \${amount}\`);
      }
    },
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log('Balance:', account.getBalance()); // 1300
// console.log(account.balance); // undefined (은닉됨)

// 2. 함수 팩토리
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log('double(5):', double(5)); // 10
console.log('triple(5):', triple(5)); // 15

// 3. 이벤트 핸들러에서 상태 유지
function createButtonHandler(buttonId) {
  let clickCount = 0;
  
  return function() {
    clickCount++;
    console.log(\`Button \${buttonId} clicked \${clickCount} times\`);
  };
}

const handleBtn1 = createButtonHandler('btn1');
const handleBtn2 = createButtonHandler('btn2');

handleBtn1(); // Button btn1 clicked 1 times
handleBtn1(); // Button btn1 clicked 2 times
handleBtn2(); // Button btn2 clicked 1 times (독립적 상태)`}
        />
      </section>

      <section className="content-section">
        <h2 id="module">3️⃣ 모듈 패턴 (Module Pattern)</h2>
        <p>
          클로저를 활용해 모듈 패턴을 구현할 수 있습니다. 이는 ES6 모듈 이전의 주요 코드 조직화
          방식이었습니다.
        </p>

        <InfoCard type="note" title="모듈 패턴">
          <p>
            클로저를 이용해 <strong>공개 API 와 비공개 구현</strong>을 분리할 수 있습니다. 현대
            JavaScript 에서는 ES6 모듈 (<code>import</code>/<code>export</code>) 을 사용합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="모듈 패턴"
          description="클로저를 활용한 모듈 설계입니다."
          defaultCode={`// 모듈 패턴 예제
const TodoModule = (function() {
  // 비공개 상태
  let todos = [];
  let nextId = 1;
  
  // 비공개 함수
  function findById(id) {
    return todos.find(todo => todo.id === id);
  }
  
  // 공개 API
  return {
    add: function(title) {
      const todo = {
        id: nextId++,
        title,
        completed: false
      };
      todos.push(todo);
      console.log(\`Added: \${title}\`);
      return todo;
    },
    
    complete: function(id) {
      const todo = findById(id);
      if (todo) {
        todo.completed = true;
        console.log(\`Completed: \${todo.title}\`);
      }
    },
    
    getAll: function() {
      return [...todos]; // 복사본 반환
    },
    
    getCount: function() {
      return todos.length;
    }
  };
})();

// 사용 예시
TodoModule.add('Learn JavaScript');
TodoModule.add('Learn React');
TodoModule.complete(1);
console.log('Todos:', TodoModule.getAll());
console.log('Count:', TodoModule.getCount());

// todos 에 직접 접근 불가
// console.log(TodoModule.todos); // undefined`}
        />
      </section>

      <section className="content-section">
        <h2 id="currying">4️⃣ 커링 (Currying)</h2>
        <p>
          커링은 여러 인자를 받는 함수를 <strong>하나의 인자를 받는 함수들의 체인</strong>으로
          변환하는 기법입니다.
        </p>

        <CodeDemo
          title="커링과 부분 적용"
          description="함수를 조합하고 재사용하는 기법입니다."
          defaultCode={`// 커링 예제
function add(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log('add(1)(2)(3):', add(1)(2)(3)); // 6

// 화살표 함수로 간결하게
const addArrow = a => b => c => a + b + c;
console.log('addArrow(1)(2)(3):', addArrow(1)(2)(3)); // 6

// 부분 적용 (Partial Application)
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);

console.log('double(5):', double(5)); // 10
console.log('triple(5):', triple(5)); // 15

// 커링을 활용한 부분 적용
const multiplyCurried = a => b => a * b;
const double2 = multiplyCurried(2);
const triple2 = multiplyCurried(3);

console.log('double2(5):', double2(5)); // 10
console.log('triple2(5):', triple2(5)); // 15

// 실용적 예제: 로그 레벨
const logWithLevel = level => message => 
  console.log(\`[\${level}] \${message}\`);

const error = logWithLevel('ERROR');
const warn = logWithLevel('WARN');
const info = logWithLevel('INFO');

error('Something went wrong!');
warn('Check this out');
info('Application started');`}
        />
      </section>

      <section className="content-section">
        <h2 id="memoization">5️⃣ 메모이제이션 (Memoization)</h2>
        <p>클로저를 활용해 함수의 실행 결과를 캐시하여 성능을 최적화할 수 있습니다.</p>

        <CodeDemo
          title="메모이제이션"
          description="클로저로 함수 실행 결과를 캐시합니다."
          defaultCode={`// 메모이제이션 구현
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache[key]) {
      console.log('Cache hit!');
      return cache[key];
    }
    
    console.log('Computing...');
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// 무거운 계산 함수
function expensiveCalculation(n) {
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }
  return result + n;
}

// 메모이제이션 적용
const memoizedCalc = memoize(expensiveCalculation);

// 첫 호출: 계산 수행
console.log('First call:', memoizedCalc(5));

// 두 번째 호출: 캐시에서 반환
console.log('Second call:', memoizedCalc(5));

// 다른 인자: 다시 계산
console.log('Different arg:', memoizedCalc(10));

// 피보나치 메모이제이션
function memoizedFibonacci() {
  const cache = {};
  
  function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;
    
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  }
  
  return fib;
}

const fib = memoizedFibonacci();
console.log('fib(50):', fib(50)); // 매우 빠름!`}
        />
      </section>

      <section className="content-section">
        <h2 id="pitfalls">⚠️ 클로저 함정과 주의사항</h2>
        <p>클로저 사용 시 주의해야 할 점들입니다.</p>

        <InfoCard type="warning" title="메모리 누수 주의">
          <p>
            클로저는 참조하는 변수들을 <strong>가비지 컬렉션 대상에서 제외</strong>시킵니다.
            불필요한 클로저는 메모리 누수를 유발할 수 있으므로 주의하세요.
          </p>
        </InfoCard>

        <CodeDemo
          title="클로저 함정"
          description="for 루프와 클로저의 함정을 확인해보세요."
          defaultCode={`// 함정 1: for 루프와 클로저 (var)
console.log('=== var with closure ===');
const functionsVar = [];
for (var i = 0; i < 3; i++) {
  functionsVar.push(function() {
    console.log('i:', i);
  });
}
functionsVar[0](); // 3
functionsVar[1](); // 3
functionsVar[2](); // 3
// 모든 함수가 동일한 i 를 참조함

// 해결: let 사용
console.log('\\n=== let with closure ===');
const functionsLet = [];
for (let j = 0; j < 3; j++) {
  functionsLet.push(function() {
    console.log('j:', j);
  });
}
functionsLet[0](); // 0
functionsLet[1](); // 1
functionsLet[2](); // 2
// 각 함수가 독립적인 j 를 참조함

// 해결: IIFE 로 스코프 생성
console.log('\\n=== IIFE solution ===');
const functionsIIFE = [];
for (var k = 0; k < 3; k++) {
  functionsIIFE.push((function(index) {
    return function() {
      console.log('k:', index);
    };
  })(k));
}
functionsIIFE[0](); // 0
functionsIIFE[1](); // 1
functionsIIFE[2](); // 2

// 함정 2: 메모리 누수
function createLeak() {
  const largeArray = new Array(1000000).fill('data');
  
  return function() {
    console.log('Array length:', largeArray.length);
  };
}

const leakyFunc = createLeak();
// largeArray 는 leakyFunc 가 존재하는 한 가비지 컬렉션되지 않음`}
        />
      </section>

      <section className="content-section">
        <h2 id="react">🔁 React 와 클로저</h2>
        <p>React 의 Hooks 는 클로저를 적극적으로 활용합니다.</p>

        <CodeDemo
          title="React 스타일 클로저"
          description="Hooks 에서 클로저가 어떻게 사용되는지 확인해보세요."
          defaultCode={`// React useState 와 클로저 개념
function createCounterHook() {
  let count = 0; // 클로저로 상태 유지
  
  return {
    getCount: () => count,
    setCount: (newCount) => {
      count = typeof newCount === 'function' 
        ? newCount(count) 
        : newCount;
      console.log('count updated:', count);
    }
  };
}

const counter = createCounterHook();
console.log('initial:', counter.getCount()); // 0
counter.setCount(5);
console.log('after set:', counter.getCount()); // 5
counter.setCount(prev => prev + 1);
console.log('after increment:', counter.getCount()); // 6

// 이벤트 핸들러에서 클로저
function createClickHandler(id) {
  let clickCount = 0;
  
  return function handleClick(event) {
    clickCount++;
    console.log(\`Button \${id} clicked \${clickCount} times\`);
    console.log('Event:', event.type);
  };
}

// 실제 React 에서의 사용 개념
// const handleClick = createClickHandler('submit-btn');
// <button onClick={handleClick}>Submit</button>`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>클로저: 함수 + 렉시컬 환경, 외부 변수 기억</li>
            <li>데이터 은닉: 비공개 변수 생성에 활용</li>
            <li>모듈 패턴: 공개 API 와 비공개 구현 분리</li>
            <li>커링: 다인자 함수 → 단인자 함수 체인</li>
            <li>메모이제이션: 클로저로 계산 결과 캐시</li>
            <li>
              for 루프: <code>var</code> 대신 <code>let</code> 사용
            </li>
            <li>주의: 메모리 누수 가능성, 불필요한 참조 최소화</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
