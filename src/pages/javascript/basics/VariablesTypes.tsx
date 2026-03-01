import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function VariablesTypes() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>변수와 타입 (Variables & Types)</h1>
        <p className="page-description">
          JavaScript 의 변수 선언 방법과 데이터 타입에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          변수는 데이터를 저장하는 컨테이너입니다. JavaScript 는{' '}
          <strong>동적 타입 (Dynamic Typing)</strong> 언어로, 변수를 선언할 때 타입을 명시하지
          않아도 실행 시점에 자동으로 타입이 결정됩니다.
        </p>
      </section>

      <section className="content-section">
        <h2 id="variable-declaration">1️⃣ 변수 선언 방법</h2>
        <p>
          JavaScript 에는 세 가지 변수 선언 방법이 있습니다: <code>var</code>, <code>let</code>,{' '}
          <code>const</code>
        </p>

        <InfoCard type="warning" title="현대 JavaScript 표준">
          <p>
            <strong>
              현대 JavaScript(ES6+) 에서는 <code>var</code> 를 사용하지 않습니다.
            </strong>
            <code>let</code> 은 재할당이 필요할 때, <code>const</code> 는 재할당이 필요 없을 때
            사용합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="변수 선언 비교"
          description="각 선언 방법의 차이를 직접 실행하며 확인해보세요."
          defaultCode={`// const: 재할당 불가능 (권장)
const name = 'Alice';
console.log('const name:', name);
// name = 'Bob'; // 오류! 재할당 불가

// let: 재할당 가능
let age = 25;
console.log('let age:', age);
age = 26;
console.log('let age (after update):', age);

// var: 함수 스코프 (사용 비권장)
var city = 'Seoul';
console.log('var city:', city);

// 블록 스코프 비교
{
  let blockLet = 'let block';
  const blockConst = 'const block';
  var blockVar = 'var block';
}
// console.log(blockLet); // 오류! 블록 스코프
// console.log(blockConst); // 오류! 블록 스코프
console.log('var blockVar:', blockVar); // var 는 함수 스코프`}
        />
      </section>

      <section className="content-section">
        <h2 id="data-types">2️⃣ 데이터 타입</h2>
        <p>JavaScript 는 7 가지 기본 (Primitive) 타입과 1 가지 참조 (Reference) 타입을 가집니다:</p>

        <div className="type-grid">
          <div className="type-card">
            <h4>Primitive Types</h4>
            <ul>
              <li>
                <code>string</code> - 문자열
              </li>
              <li>
                <code>number</code> - 숫자 (정수, 실수 구분 없음)
              </li>
              <li>
                <code>boolean</code> - 참/거짓
              </li>
              <li>
                <code>undefined</code> - 선언만 되고 값이 없음
              </li>
              <li>
                <code>null</code> - 의도적인 빈 값
              </li>
              <li>
                <code>symbol</code> - 고유한 식별자 (ES6)
              </li>
              <li>
                <code>bigint</code> - 큰 정수 (ES2020)
              </li>
            </ul>
          </div>
          <div className="type-card">
            <h4>Reference Type</h4>
            <ul>
              <li>
                <code>object</code> - 객체
              </li>
              <li>
                <code>array</code> - 배열 (객체의 일종)
              </li>
              <li>
                <code>function</code> - 함수 (객체의 일종)
              </li>
            </ul>
          </div>
        </div>

        <CodeDemo
          title="데이터 타입 확인"
          description="typeof 연산자로 각 값의 타입을 확인해보세요."
          defaultCode={`// Primitive Types
console.log(typeof 'Hello');      // "string"
console.log(typeof 42);           // "number"
console.log(typeof 3.14);         // "number"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (JavaScript 버그!)
console.log(typeof Symbol('id')); // "symbol"
console.log(typeof 9007199254740991n); // "bigint"

// Reference Types
console.log(typeof {});           // "object"
console.log(typeof []);           // "object" (배열도 객체!)
console.log(typeof function() {}); // "function"

// null 타입 확인 주의사항
console.log('null type bug:', typeof null === 'object'); // true (역사적 버그)

// 정확한 null 확인
const value = null;
console.log('Is null?', value === null);`}
        />
      </section>

      <section className="content-section">
        <h2 id="type-conversion">3️⃣ 타입 변환</h2>
        <p>
          JavaScript 는 <strong>동적 타입</strong> 특성상 자동으로 타입이 변환되기도 하고, 개발자가
          명시적으로 변환할 수도 있습니다.
        </p>

        <InfoCard type="tip" title="암시적 vs 명시적 변환">
          <p>
            <strong>암시적 변환 (Type Coercion)</strong>: JavaScript 가 자동으로 타입 변환
            <br />
            <strong>명시적 변환 (Type Casting)</strong>: 개발자가 직접 타입 변환
          </p>
        </InfoCard>

        <CodeDemo
          title="타입 변환 예제"
          description="암시적 변환과 명시적 변환을 비교해보세요."
          defaultCode={`// 암시적 타입 변환 (Type Coercion)
console.log('5' + 3);      // "53" (문자열 연결)
console.log('5' - 3);      // 2 (숫자 뺄셈)
console.log('5' * '2');    // 10 (문자열 → 숫자)
console.log(true + 1);     // 2 (boolean → number)
console.log(null + 1);     // 1 (null → 0)
console.log(undefined + 1); // NaN

// 명시적 타입 변환 (Type Casting)
console.log(Number('42'));      // 42
console.log(String(42));        // "42"
console.log(Boolean(''));       // false (Falsy)
console.log(Boolean('Hello'));  // true (Truthy)
console.log(parseInt('42px'));  // 42
console.log(parseFloat('3.14em')); // 3.14

// Falsy 값들 (false 로 평가되는 값)
console.log('Falsy values:');
console.log(Boolean(false));   // false
console.log(Boolean(0));       // false
console.log(Boolean(-0));      // false
console.log(Boolean(''));      // false
console.log(Boolean(null));    // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));     // false`}
        />
      </section>

      <section className="content-section">
        <h2 id="template-literal">4️⃣ 템플릿 리터럴 (Template Literal)</h2>
        <p>
          ES6 에서 도입된 템플릿 리터럴은 백틱 (<code>`</code>) 을 사용하여 문자열을 감싸고,
          <code>${'{expression}'}</code> 문법으로 변수를 쉽게 삽입할 수 있습니다.
        </p>

        <CodeDemo
          title="템플릿 리터럴"
          description="기존 문자열 연결과 템플릿 리터럴을 비교해보세요."
          defaultCode={`const name = 'Alice';
const age = 25;
const city = 'Seoul';

// 기존 문자열 연결
const oldWay = 'My name is ' + name + '. I am ' + age + ' years old.';
console.log('Old way:', oldWay);

// 템플릿 리터럴 (권장)
const newWay = \`My name is \${name}. I am \${age} years old.\`;
console.log('New way:', newWay);

// 멀티라인 문자열
const multiLine = \`
  <div>
    <p>Name: \${name}</p>
    <p>Age: \${age}</p>
    <p>City: \${city}</p>
  </div>
\`;
console.log(multiLine);

// 표현식도 가능
console.log(\`Next year I will be \${age + 1}\`);`}
        />
      </section>

      <section className="content-section">
        <h2 id="destructuring">5️⃣ 구조 분해 할당 (Destructuring)</h2>
        <p>배열이나 객체의 요소를 개별 변수로 쉽게 추출할 수 있는 문법입니다.</p>

        <CodeDemo
          title="구조 분해 할당"
          description="배열과 객체에서 값을 추출하는 현대적인 방법입니다."
          defaultCode={`// 배열 구조 분해
const colors = ['red', 'green', 'blue'];
const [first, second, third] = colors;
console.log(first, second, third); // red green blue

// 나머지 연산자와 함께
const [primary, ...rest] = colors;
console.log('Primary:', primary); // red
console.log('Rest:', rest); // ['green', 'blue']

// 객체 구조 분해
const person = { name: 'Bob', age: 30, city: 'Busan' };
const { name, age, city } = person;
console.log(name, age, city); // Bob 30 Busan

// 변수명 변경
const { name: userName, age: userAge } = person;
console.log(userName, userAge); // Bob 30

// 기본값 설정
const { country = 'Korea' } = person;
console.log(country); // Korea (person 에 country 가 없으므로 기본값)

// 중첩 구조 분해
const nested = { user: { name: 'Charlie', age: 35 } };
const { user: { name: n, age: a } } = nested;
console.log(n, a); // Charlie 35`}
        />
      </section>

      <section className="content-section">
        <h2 id="spread-rest">6️⃣ 스프레드 & 나머지 연산자</h2>
        <p>
          <code>...</code> 연산자는 컨텍스트에 따라 스프레드 (전개) 또는 나머지 연산자로 동작합니다.
        </p>

        <CodeDemo
          title="Spread & Rest 연산자"
          description="동일한 문법이지만 맥락에 따라 다르게 동작합니다."
          defaultCode={`// Spread 연산자 (전개)
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];
console.log('Spread array:', arr2); // [1, 2, 3, 4, 5, 6]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log('Spread object:', obj2); // { a: 1, b: 2, c: 3 }

// 함수 호출 시 Spread
const numbers = [1, 2, 3, 4, 5];
console.log('Max:', Math.max(...numbers)); // 5

// Rest 연산자 (나머지)
function sum(...args) {
  return args.reduce((acc, cur) => acc + cur, 0);
}
console.log('Sum:', sum(1, 2, 3, 4, 5)); // 15

// 배열에서 나머지
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log('Head:', head); // 1
console.log('Tail:', tail); // [2, 3, 4, 5]

// 객체에서 나머지
const { a, ...rest } = { a: 1, b: 2, c: 3 };
console.log('a:', a); // 1
console.log('rest:', rest); // { b: 2, c: 3 }`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <code>const</code> 를 기본으로 사용하고, 재할당이 필요할 때만 <code>let</code> 사용
            </li>
            <li>
              <code>var</code> 는 함수 스코프 문제를 일으키므로 사용하지 않음
            </li>
            <li>7 가지 Primitive 타입과 1 가지 Reference 타입 (object) 존재</li>
            <li>
              템플릿 리터럴 (<code>\`...\`</code>) 로 문자열 보간 가능
            </li>
            <li>구조 분해 할당으로 배열/객체에서 값 추출</li>
            <li>Spread 는 전개, Rest 는 나머지 수집</li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <h2 id="quiz">🎯 퀴즈</h2>
        <CodeDemo
          title="퀴즈: 예측하기"
          description="아래 코드의 실행 결과를 예측한 후 실행해보세요."
          defaultCode={`// 퀴즈 1: 타입 변환
console.log('1' + 2 + 3);  // ?
console.log(1 + 2 + '3');  // ?

// 퀴즈 2: Falsy 값
console.log(Boolean([]));  // ?
console.log(Boolean({}));  // ?

// 퀴즈 3: 구조 분해
const nums = [10, 20, 30, 40];
const [x, , z] = nums;
console.log(x, z);  // ?

// 퀴즈 4: Spread vs Rest
const arr = [1, 2];
const result = [...arr, 3, ...[4, 5]];
console.log(result);  // ?`}
        />
      </section>
    </div>
  );
}
