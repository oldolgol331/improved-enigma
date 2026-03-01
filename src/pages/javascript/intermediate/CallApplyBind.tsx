import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function JSCallApplyBind() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Call, Apply, Bind</h1>
        <p className="page-description">
          JavaScript 의 call, apply, bind 메서드로 this 를 명시적으로 바인딩하는 방법에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <code>call</code>, <code>apply</code>, <code>bind</code> 는 함수의 <code>this</code> 를
          명시적으로 지정할 수 있게 해주는 메서드입니다.
          함수형 프로그래밍, 이벤트 핸들러, 메서드借用 등에 널리 사용됩니다.
        </p>

        <InfoCard type="tip" title="세 메서드의 공통점">
          <ul>
            <li>
              <strong>목적:</strong> 함수의 this 를 명시적으로 설정
            </li>
            <li>
              <strong>첫 번째 인수:</strong> this 로 바인딩할 객체
            </li>
            <li>
              <strong>레거시:</strong> 화살표 함수에는 효과 없음 (lexical this)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="call">1️⃣ call 메서드</h2>
        <p>
          <code>call</code> 은 함수를 즉시 호출하며, 인수를 개별적으로 전달합니다.
        </p>

        <CodeDemo
          title="call 메서드 사용법"
          description="this 바인딩과 인수 전달"
          defaultCode={`// 1. 기본 사용법
function greet(greeting, punctuation) {
  console.log(\`\${greeting}, \${this.name}\${punctuation}\`);
}

const person = { name: 'Alice' };

// call(this, arg1, arg2, ...)
greet.call(person, 'Hello', '!');
// 출력: "Hello, Alice!"

// 2. this 가 undefined/null 인 경우 (strict mode)
'use strict';
function showThis() {
  console.log(this);
}

showThis.call(undefined);  // undefined
showThis.call(null);       // undefined

// 3. 원시 타입도 객체로 래핑
const str = 'hello';
console.log(str.toUpperCase());  // 'HELLO'

// 내부적으로: String.prototype.toUpperCase.call(str)

// 4. 메서드借用 (borrowing)
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

// Array.prototype 메서드借用
const result = Array.prototype.slice.call(arrayLike, 1);
console.log('slice 결과:', result);  // ['b', 'c']

// 5. 실제 활용 - 생성자 체이닝
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price, expiry) {
  Product.call(this, name, price);  // 부모 생성자 호출
  this.expiry = expiry;
}

const apple = new Food('Apple', 1000, '2024-12-31');
console.log('Food 인스턴스:', apple);
// { name: 'Apple', price: 1000, expiry: '2024-12-31' }

console.log('call 예시 완료');`}
        />

        <InfoCard type="tip" title="메서드借用">
          <p>
            <code>Array.prototype.slice.call(arrayLike)</code> 는
            배열이 아닌 객체를 배열로 변환할 때 사용합니다.
            <br />
            현대 JavaScript 에서는 <code>Array.from(arrayLike)</code> 를 권장합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="apply">2️⃣ apply 메서드</h2>
        <p>
          <code>apply</code> 는 call 과 유사하지만, 인수를 <strong>배열로</strong> 전달합니다.
        </p>

        <CodeDemo
          title="apply 메서드 사용법"
          description="배열로 인수 전달"
          defaultCode={`// 1. 기본 사용법
function introduce(hobbies) {
  console.log(\`안녕하세요, \${this.name}입니다.\`);
  console.log(\`취미: \${hobbies.join(', ')}\`);
}

const person = { name: 'Bob' };
const hobbies = ['독서', '코딩', '등산'];

// apply(this, [args])
introduce.apply(person, [hobbies]);

// 2. call 과 비교
function sum(a, b, c) {
  return a + b + c + this.offset;
}

const context = { offset: 10 };

console.log('call:', sum.call(context, 1, 2, 3));  // 16
console.log('apply:', sum.apply(context, [1, 2, 3]));  // 16

// 3. 실제 활용 - 배열 최대값
const numbers = [5, 2, 9, 1, 7];

// Math.max 는 개별 인수를 받음
const max = Math.max.apply(null, numbers);
console.log('최대값:', max);  // 9

// 현대적写法: Math.max(...numbers)

// 4. 실제 활용 - 배열 병합
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Array.prototype.push.apply(arr1, arr2);
// console.log('병합:', arr1);  // [1, 2, 3, 4, 5, 6]

// 현대적写法: arr1.push(...arr2)

// 5. 생성자에 apply 사용
function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Employee(name, age, department) {
  Person.apply(this, [name, age]);
  this.department = department;
}

const emp = new Employee('Charlie', 30, 'Engineering');
console.log('Employee:', emp);

// 6. 부분 적용 (currying) 과 함께
function multiply(...args) {
  return args.reduce((acc, val) => acc * val, 1);
}

const double = multiply.bind(null, 2);
console.log('double(5):', double(5));  // 10

console.log('apply 예시 완료');`}
        />

        <InfoCard type="tip" title="apply vs spread">
          <p>
            <code>apply</code> 는 <strong>spread 연산자</strong> (<code>...</code>) 로 대체 가능합니다.
            <br />
            <code>Math.max.apply(null, arr)</code> → <code>Math.max(...arr)</code>
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="bind">3️⃣ bind 메서드</h2>
        <p>
          <code>bind</code> 는 this 가 바인딩된 <strong>새 함수를 반환</strong>합니다.
        </p>

        <CodeDemo
          title="bind 메서드 사용법"
          description="영구적 this 바인딩"
          defaultCode={`// 1. 기본 사용법
const person = {
  name: 'Alice',
  greet: function(greeting) {
    console.log(\`\${greeting}, \${this.name}!\`);
  }
};

const greetFunc = person.greet;
greetFunc('Hello');  // Hello, undefined! (this 손실)

// bind 로 this 고정
const boundGreet = person.greet.bind(person);
boundGreet('Hello');  // Hello, Alice!

// 2. 이벤트 핸들러에서 활용
const button = {
  label: '클릭 버튼',
  handleClick: function(event) {
    console.log(\`\${this.label} 클릭됨\`);
  }
};

// element.addEventListener('click', button.handleClick.bind(button));

// 3. 부분 적용 (partial application)
function multiply(a, b, c) {
  return a * b * c;
}

const double = multiply.bind(null, 2);  // 첫 번째 인수 고정
console.log('double(3, 4):', double(3, 4));  // 24

const triple = multiply.bind(null, 3);
console.log('triple(4, 5):', triple(4, 5));  // 60

// 4. 실제 활용 - 배열 순회
const numbers = [1, 2, 3, 4, 5];

// Math.pow 를 map 에 적용
const squares = numbers.map(Math.pow.bind(null, 2));
// 주의: Math.pow(2, number) 순서로 호출됨

// 올바른 방법
const correctSquares = numbers.map(n => Math.pow(n, 2));
console.log('제곱:', correctSquares);  // [1, 4, 9, 16, 25]

// 5. 메서드 추출
const array = [1, 2, 3];
const push = array.push.bind(array);

push(4);
push(5);
console.log('배열:', array);  // [1, 2, 3, 4, 5]

// 6. setTimeout 에서 this 유지
const counter = {
  count: 0,
  start: function() {
    setInterval(() => {
      this.count++;
      console.log('카운트:', this.count);
    }, 1000);
  }
};

// counter.start();

console.log('bind 예시 완료');`}
        />

        <InfoCard type="warning" title="bind 와 화살표 함수">
          <p>
            화살표 함수는 <strong>lexical this</strong> 를 가지므로
            <code>bind</code> 로 this 를 변경할 수 없습니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="comparison">4️⃣ call vs apply vs bind 비교</h2>
        <p>
          세 메서드의 차이점을 정리합니다.
        </p>

        <CodeDemo
          title="세 메서드 비교"
          description="사용 상황별 선택 가이드"
          defaultCode={`const obj = { name: 'MyObject' };

function func(a, b) {
  console.log(\`\${this.name}: \${a + b}\`);
}

// ============================================
// call: 즉시 실행, 인수 개별 전달
// ============================================
func.call(obj, 1, 2);
// 출력: "MyObject: 3"

// ============================================
// apply: 즉시 실행, 인수 배열로 전달
// ============================================
func.apply(obj, [1, 2]);
// 출력: "MyObject: 3"

// ============================================
// bind: 함수 반환, 나중에 실행
// ============================================
const boundFunc = func.bind(obj, 1, 2);
boundFunc();
// 출력: "MyObject: 3"

// ============================================
// 선택 가이드
// ============================================
// 1. 즉시 실행 + 인수 개별: call
// 2. 즉시 실행 + 인수 배열: apply
// 3. 나중에 실행 + this 고정: bind

// ============================================
// 실제 활용 예시
// ============================================

// 1. 배열 병합 (apply)
const arr1 = [1, 2];
const arr2 = [3, 4];
// Array.prototype.push.apply(arr1, arr2);

// 2. 이벤트 핸들러 (bind)
// element.addEventListener('click', handler.bind(this));

// 3. 생성자 체이닝 (call)
// Parent.call(this, args);

// 4. 최대/최소값 (apply)
// Math.max.apply(null, array);

// 5. 부분 적용 (bind)
// const add5 = add.bind(null, 5);

console.log('비교 예시 완료');`}
        />

        <div className="modern-alternatives">
          <h4>현대적 대안</h4>
          <table>
            <thead>
              <tr>
                <th>레거시</th>
                <th>현대적</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Array.prototype.slice.call(arr)</td>
                <td>[...arr] 또는 Array.from(arr)</td>
              </tr>
              <tr>
                <td>Math.max.apply(null, arr)</td>
                <td>Math.max(...arr)</td>
              </tr>
              <tr>
                <td>func.bind(this)</td>
                <td>화살표 함수 () =&gt; func()</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-section">
        <h2 id="real-examples">5️⃣ 실전 활용 예시</h2>
        <p>
          실제 프로젝트에서 자주 사용되는 패턴입니다.
        </p>

        <CodeDemo
          title="실전 활용 패턴"
          description="이벤트 핸들러, React, 함수형 프로그래밍"
          defaultCode={`// ============================================
// 1. 클래스 컴포넌트에서 this 바인딩 (React)
// ============================================
// class MyClassComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { count: 0 };
//     // 생성자에서 bind
//     this.handleClick = this.handleClick.bind(this);
//   }
//
//   handleClick() {
//     this.setState({ count: this.state.count + 1 });
//   }
//
//   render() {
//     return (
//       <button onClick={this.handleClick}>
//         {this.state.count}
//       </button>
//     );
//   }
// }

// ============================================
// 2. 함수형 프로그래밍 - 합성
// ============================================
function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

const add2 = x => x + 2;
const multiply3 = x => x * 3;
const square = x => x * x;

const transform = compose(square, multiply3, add2);
console.log('transform(5):', transform(5));  // ((5 + 2) * 3) ^ 2 = 441

// ============================================
// 3. 메서드 체이닝 지원
// ============================================
class Chainable {
  constructor(value) {
    this.value = value;
  }

  add(n) {
    this.value += n;
    return this;
  }

  multiply(n) {
    this.value *= n;
    return this;
  }

  log() {
    console.log('현재 값:', this.value);
    return this;
  }
}

const result = new Chainable(1)
  .add(5)
  .multiply(2)
  .add(3)
  .log();  // 현재 값: 15

// ============================================
// 4. 커링 (currying)
// ============================================
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

function add3(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add3);
console.log('curriedAdd(1)(2)(3):', curriedAdd(1)(2)(3));  // 6
console.log('curriedAdd(1, 2)(3):', curriedAdd(1, 2)(3));  // 6

// ============================================
// 5. 메모이제이션 (memoization)
// ============================================
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('캐시 히트');
      return cache.get(key);
    }
    
    console.log('캐시 미스');
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const memoizedAdd = memoize((a, b) => {
  console.log('계산 중...');
  return a + b;
});

console.log('결과:', memoizedAdd(2, 3));  // 계산 중... 결과: 5
console.log('결과:', memoizedAdd(2, 3));  // 캐시 히트, 결과: 5

console.log('실전 예시 완료');`}
        />

        <InfoCard type="tip" title="함수형 프로그래밍">
          <p>
            <strong>compose</strong>, <strong>curry</strong>, <strong>memoize</strong> 는
            함수형 프로그래밍의 핵심 패턴입니다.
            <br />
            라이브러리: <code>lodash/fp</code>, <code>Ramda</code>
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>call:</strong> 즉시 실행, 인수 개별 전달
          </li>
          <li>
            <strong>apply:</strong> 즉시 실행, 인수 배열로 전달
          </li>
          <li>
            <strong>bind:</strong> 함수 반환, 나중에 실행, this 영구 고정
          </li>
          <li>
            <strong>메서드借用:</strong> <code>Array.prototype.slice.call</code>
          </li>
          <li>
            <strong>이벤트 핸들러:</strong> <code>bind(this)</code> 로 this 유지
          </li>
          <li>
            <strong>부분 적용:</strong> <code>bind(null, arg1)</code>
          </li>
          <li>
            <strong>현대적 대안:</strong> spread, 화살표 함수
          </li>
        </ul>
      </section>
    </div>
  );
}