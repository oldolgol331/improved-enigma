import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function JSThisKeyword() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>this 키워드</h1>
        <p className="page-description">
          JavaScript 의 this 키워드 동작 원리와 바인딩 패턴에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <code>this</code> 는 JavaScript 에서 가장 혼란스러운 개념 중 하나입니다.
          this 는 <strong>함수가 호출된 방식</strong>에 따라 동적으로 결정되며,
          실행 컨텍스트 (execution context) 를 가리킵니다.
        </p>

        <InfoCard type="warning" title="this 의 핵심 규칙">
          <ul>
            <li>
              <strong>전역 컨텍스트:</strong> 전역 객체 (브라우저: <code>window</code>, Node: <code>global</code>)
            </li>
            <li>
              <strong>메서드 호출:</strong> 객체 자체 (obj.method 의 this = obj)
            </li>
            <li>
              <strong>생성자 호출:</strong> 새로 생성된 인스턴스
            </li>
            <li>
              <strong>화살표 함수:</strong> 렉시컬 this (정의된 위치의 this 를 상속)
            </li>
            <li>
              <strong>call/apply/bind:</strong> 명시적으로 지정된 객체
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="global-context">1️⃣ 전역 컨텍스트에서 this</h2>
        <p>
          전역 스코프에서 this 는 <strong>전역 객체</strong>를 가리킵니다.
        </p>

        <CodeDemo
          title="전역 컨텍스트의 this"
          description="전역 스코프와 일반 함수의 this"
          defaultCode={`// 1. 전역 스코프에서 this
console.log('전역 this:', this);
// 브라우저: Window 객체
// Node.js: global 객체
// strict mode: undefined

// 2. 일반 함수에서 this (비엄격 모드)
function showThis() {
  console.log('일반 함수 this:', this);
}

showThis();  // Window (비엄격)
// 'use strict' 모드에서는 undefined

// 3. strict mode 에서 확인
'use strict';
function showThisStrict() {
  console.log('엄격 모드 this:', this);
}

showThisStrict();  // undefined

// 4. 객체 메서드에서 this
const obj = {
  name: 'MyObject',
  showName: function() {
    console.log('메서드 this:', this);
    console.log('name:', this.name);
  }
};

obj.showName();  // this = obj
// 출력: MyObject`}
        />

        <InfoCard type="tip" title="strict mode">
          <p>
            <code>'use strict'</code> 를 사용하면 전역 컨텍스트와 일반 함수에서
            this 가 <code>undefined</code>가 됩니다. 이는 의도치 않은 전역 객체 수정을 방지합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="method-context">2️⃣ 메서드 호출에서 this</h2>
        <p>
          객체의 메서드로 호출할 때 this 는 <strong>객체 자체</strong>를 가리킵니다.
        </p>

        <CodeDemo
          title="메서드 호출과 this"
          description="객체 메서드에서의 this 동작"
          defaultCode={`// 1. 기본 메서드 호출
const person = {
  name: '홍길동',
  age: 25,
  introduce: function() {
    console.log(\`안녕하세요, \${this.name}입니다. (\${this.age}세)\`);
  }
};

person.introduce();  // this = person
// 출력: 안녕하세요, 홍길동입니다. (25 세)

// 2. 메서드를 변수에 할당한 경우
const introduceFunc = person.introduce;
introduceFunc();  // this = Window (또는 undefined)
// 주의: 객체에서 분리되면 전역 컨텍스트가 됩니다!

// 3. 중첩 객체에서 this
const company = {
  name: 'TechCorp',
  department: {
    name: '개발팀',
    getInfo: function() {
      console.log(\`\${this.name}\`);  // this = department
    }
  }
};

company.department.getInfo();  // 출력: 개발팀

// 4. 동적 this 바인딩
const obj1 = { name: '객체 1' };
const obj2 = { name: '객체 2' };

function showName() {
  console.log(this.name);
}

obj1.showName = showName;
obj2.showName = showName;

obj1.showName();  // 출력: 객체 1
obj2.showName();  // 출력: 객체 2`}
        />

        <InfoCard type="warning" title="메서드 분리 호출 주의">
          <p>
            메서드를 변수에 할당하여 호출하면 <strong>this 가 손실</strong>됩니다.
            이 경우 <code>bind</code> 를 사용하거나 화살표 함수를 고려하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="constructor">3️⃣ 생성자 함수에서 this</h2>
        <p>
          <code>new</code> 키워드로 생성자를 호출할 때 this 는 <strong>새로 생성된 인스턴스</strong>를 가리킵니다.
        </p>

        <CodeDemo
          title="생성자 함수와 this"
          description="new 키워드와 인스턴스 this"
          defaultCode={`// 1. 생성자 함수
function Person(name, age) {
  // this = 새로 생성된 인스턴스
  this.name = name;
  this.age = age;
  
  this.introduce = function() {
    console.log(\`안녕하세요, \${this.name}입니다.\`);
  };
}

// 2. 인스턴스 생성
const person1 = new Person('홍길동', 25);
const person2 = new Person('김철수', 30);

console.log('person1:', person1.name);  // 홍길동
console.log('person2:', person2.name);  // 김철수

person1.introduce();  // 안녕하세요, 홍길동입니다.
person2.introduce();  // 안녕하세요, 김철수입니다.

// 3. new 없이 호출 (주의!)
const person3 = Person('이영희', 28);  // this = Window (전역)
console.log(person3);  // undefined (반환값 없음)
console.log(window.name);  // '이영희' (전역 오염!)

// 4. 클래스 문법 (현대적 접근)
class Animal {
  constructor(name) {
    this.name = name;  // this = 인스턴스
  }
  
  speak() {
    console.log(\`\${this.name} 이 (가) 소리를 냅니다.\`);
  }
}

const dog = new Animal('강아지');
dog.speak();  // 출력: 강아지 이 (가) 소리를 냅니다.`}
        />

        <InfoCard type="warning" title="new忘れ 주의">
          <p>
            생성자 함수를 <code>new</code> 없이 호출하면 <strong>전역 객체를 오염</strong>시킵니다.
            항상 <code>new</code> 를 사용하거나, 클래스 문법을 사용하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="arrow-function">4️⃣ 화살표 함수와 렉시컬 this</h2>
        <p>
          화살표 함수는 <strong>자신의 this 를 가지지 않으며</strong>,
          정의된 위치의 this 를 상속합니다 (렉시컬 this).
        </p>

        <CodeDemo
          title="화살표 함수의 this"
          description="렉시컬 this 와 콜백에서의 활용"
          defaultCode={`// 1. 화살표 함수의 this 는 정의 위치의 this
const obj = {
  name: 'MyObject',
  regularFunc: function() {
    console.log('일반 함수 this:', this.name);
  },
  arrowFunc: () => {
    console.log('화살표 함수 this:', this.name);
    // this = 전역 객체 (obj 가 아님!)
  }
};

obj.regularFunc();  // 출력: MyObject
obj.arrowFunc();    // 출력: undefined (전역에 name 이 없음)

// 2. 콜백에서 화살표 함수 활용 (권장)
const timer = {
  count: 0,
  start: function() {
    // 화살표 함수: 외부 this (timer) 를 상속
    setInterval(() => {
      this.count++;  // this = timer
      console.log('카운트:', this.count);
    }, 1000);
  }
};

// timer.start();  // 1 초마다 증가

// 3. 콜백에서 일반 함수 (문제 발생)
const timerBad = {
  count: 0,
  start: function() {
    setInterval(function() {
      // this = 전역 객체 (timer 가 아님!)
      // this.count++;  // 의도한 대로 동작하지 않음
    }, 1000);
  }
};

// 4. 해결책 1: 변수에 저장 (과거 패턴)
const timerOld = {
  count: 0,
  start: function() {
    const self = this;  // this 저장
    setInterval(function() {
      self.count++;  // self 사용
      console.log('old 패턴:', self.count);
    }, 1000);
  }
};

// 5. 해결책 2: bind (명시적 바인딩)
const timerBind = {
  count: 0,
  start: function() {
    setInterval(function() {
      this.count++;
      console.log('bind 패턴:', this.count);
    }.bind(this));  // this 명시적 바인딩
  }
};

console.log('화살표 함수 예시 완료');`}
        />

        <InfoCard type="tip" title="화살표 함수 사용 가이드">
          <ul>
            <li>
              <strong>콜백에서:</strong> 화살표 함수 권장 (this 상속)
            </li>
            <li>
              <strong>메서드로:</strong> 일반 함수 권장 (독립적인 this 필요)
            </li>
            <li>
              <strong>생성자로:</strong> 화살표 함수 사용 불가 (<code>new</code> 호출 안 됨)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="call-apply-bind">5️⃣ call, apply, bind</h2>
        <p>
          함수의 this 를 <strong>명시적으로 지정</strong>할 수 있습니다.
        </p>

        <CodeDemo
          title="call, apply, bind"
          description="명시적 this 바인딩"
          defaultCode={`// 1. call: this 와 인자를 개별적으로 전달
function greet(greeting, punctuation) {
  console.log(\`\${greeting}, \${this.name}\${punctuation}\`);
}

const person = { name: '홍길동' };

greet.call(person, '안녕하세요', '!');
// 출력: 안녕하세요, 홍길동!

// 2. apply: this 와 인자를 배열로 전달
greet.apply(person, ['반갑습니다', '.']);
// 출력: 반갑습니다, 홍길동.

// 3. bind: this 가 영구적으로 바인딩된 새 함수 반환
const boundGreet = greet.bind(person);
boundGreet('Hello', '...');
// 출력: Hello, 홍길동...

// 4. bind 활용: 메서드借用
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

// Array.prototype 메서드借用
const slice = Array.prototype.slice;
const result = slice.call(arrayLike, 1);
console.log('slice 결과:', result);  // ['b', 'c']

// 5. bind 활용: 부분 적용 (currying)
function multiply(a, b, c) {
  return a * b * c;
}

const double = multiply.bind(null, 2);  // 첫 번째 인자 고정
console.log('double(3, 4):', double(3, 4));  // 24 (2 * 3 * 4)

const triple = multiply.bind(null, 3);
console.log('triple(4, 5):', triple(4, 5));  // 60 (3 * 4 * 5)

// 6. bind 활용: 이벤트 핸들러
const button = {
  label: '클릭 버튼',
  handleClick: function(event) {
    console.log(\`\${this.label} 클릭됨\`);
  }
};

// 이벤트 리스너에 등록 시 this 유지
// element.addEventListener('click', button.handleClick.bind(button));`}
        />

        <InfoCard type="tip" title="call vs apply vs bind">
          <table>
            <thead>
              <tr>
                <th>메서드</th>
                <th>실행</th>
                <th>인자 전달</th>
                <th>반환</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>call</code></td>
                <td>즉시 실행</td>
                <td>개별 인자</td>
                <td>함수 결과</td>
              </tr>
              <tr>
                <td><code>apply</code></td>
                <td>즉시 실행</td>
                <td>배열</td>
                <td>함수 결과</td>
              </tr>
              <tr>
                <td><code>bind</code></td>
                <td>실행 안 함</td>
                <td>개별 인자</td>
                <td>바인딩된 함수</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="class-this">6️⃣ 클래스와 this</h2>
        <p>
          ES6 클래스에서 this 는 여러 함정을 가지고 있습니다.
        </p>

        <CodeDemo
          title="클래스에서의 this"
          description="클래스 메서드와 this 바인딩"
          defaultCode={`// 1. 클래스 메서드에서 this 손실
class Counter {
  constructor(initialValue = 0) {
    this.count = initialValue;
  }
  
  increment() {
    this.count++;
    console.log('카운트:', this.count);
  }
}

const counter = new Counter(0);
counter.increment();  // 정상 동작: 1

const incrementFunc = counter.increment;
// incrementFunc();  // 에러! this = undefined (strict mode)

// 2. 해결책: 생성자에서 bind
class CounterBound {
  constructor(initialValue = 0) {
    this.count = initialValue;
    this.increment = this.increment.bind(this);
  }
  
  increment() {
    this.count++;
    console.log('바인딩됨:', this.count);
  }
}

const counterBound = new CounterBound(0);
const safeIncrement = counterBound.increment;
safeIncrement();  // 정상 동작: 바인딩됨: 1

// 3. 해결책: 화살표 함수 (클래스 필드 문법)
class CounterArrow {
  count = 0;  // 클래스 필드
  
  // 화살표 함수 메서드 (실험적 기능)
  increment = () => {
    this.count++;
    console.log('화살표:', this.count);
  };
}

const counterArrow = new CounterArrow();
const arrowIncrement = counterArrow.increment;
arrowIncrement();  // 정상 동작: 화살표: 1

// 4. 상속과 this
class BaseCounter {
  constructor() {
    this.count = 0;
  }
  
  increment() {
    this.count++;
    console.log('베이스:', this.count);
  }
}

class DerivedCounter extends BaseCounter {
  increment() {
    super.increment();  // 부모 메서드 호출
    console.log('파생:', this.count);
  }
}

const derived = new DerivedCounter();
derived.increment();
// 출력:
// 베이스: 1
// 파생: 1`}
        />

        <InfoCard type="warning" title="클래스 메서드 this 주의">
          <p>
            클래스 메서드를 콜백으로 전달할 때는 <strong>반드시 bind</strong>하거나
            화살표 함수를 사용하세요. React 에서 자주 마주치는 상황입니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="react-pattern">7️⃣ React 에서의 this 패턴</h2>
        <p>
          React 컴포넌트에서 this 는 중요한 주제입니다. (클래스 컴포넌트 기준)
        </p>

        <CodeDemo
          title="React 와 this"
          description="클래스 컴포넌트에서의 this 처리"
          defaultCode={`// React 클래스 컴포넌트 예시
// import React, { Component } from 'react';

// 1. 기본 패턴: 생성자에서 bind
// class MyComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { count: 0 };
//     this.handleClick = this.handleClick.bind(this);
//   }
//
//   handleClick() {
//     console.log('클릭됨:', this.state.count);
//     this.setState({ count: this.state.count + 1 });
//   }
//
//   render() {
//     return (
//       <button onClick={this.handleClick}>
//         카운트: {this.state.count}
//       </button>
//     );
//   }
// }

// 2. 화살표 함수 (클래스 필드)
// class MyComponentArrow extends Component {
//   state = { count: 0 };
//
//   handleClick = () => {
//     console.log('클릭됨:', this.state.count);
//     this.setState({ count: this.state.count + 1 });
//   };
//
//   render() {
//     return (
//       <button onClick={this.handleClick}>
//         카운트: {this.state.count}
//       </button>
//     );
//   }
// }

// 3. 함수형 컴포넌트 (현대적 접근 - this 문제 없음)
// function MyFunctionalComponent() {
//   const [count, setCount] = React.useState(0);
//
//   const handleClick = () => {
//     console.log('클릭됨:', count);
//     setCount(count + 1);
//   };
//
//   return (
//     <button onClick={handleClick}>
//       카운트: {count}
//     </button>
//   );
// }

console.log('React 패턴 예시 (주석)');`}
        />

        <InfoCard type="tip" title="함수형 컴포넌트 권장">
          <p>
            현대 React 는 <strong>함수형 컴포넌트와 Hooks</strong> 를 권장합니다.
            this 문제를 근본적으로 피할 수 있습니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="common-pitfalls">⚠️ 흔한 함정</h2>

        <CodeDemo
          title="this 관련 흔한 실수"
          description="주의해야 할 패턴들"
          defaultCode={`// 1. 중첩 함수에서 this 손실
const obj = {
  name: '외부',
  outer: function() {
    console.log('outer this:', this.name);  // 외부
    
    function inner() {
      console.log('inner this:', this.name);  // undefined (전역)
    }
    inner();
  }
};

obj.outer();

// 2. 해결: 화살표 함수
const objFixed = {
  name: '외부',
  outer: function() {
    console.log('outer this:', this.name);
    
    const inner = () => {
      console.log('inner this:', this.name);  // 외부 (상속)
    };
    inner();
  }
};

objFixed.outer();

// 3. setTimeout 에서 this 손실
const timer = {
  count: 0,
  start: function() {
    setTimeout(function() {
      // this.count++;  // undefined!
      console.log('setTimeout this:', this);
    }, 1000);
  }
};

timer.start();

// 4. 해결: 화살표 함수
const timerFixed = {
  count: 0,
  start: function() {
    setTimeout(() => {
      this.count++;  // 정상 동작
      console.log('고정됨:', this.count);
    }, 1000);
  }
};

timerFixed.start();

// 5. 체이닝에서 this 반환
class Chainable {
  constructor() {
    this.value = 0;
  }
  
  increment() {
    this.value++;
    return this;  // this 반환 (체이닝 가능)
  }
  
  decrement() {
    this.value--;
    return this;
  }
  
  log() {
    console.log('값:', this.value);
    return this;
  }
}

const chain = new Chainable();
chain.increment().increment().decrement().log();  // 값: 1`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>전역 컨텍스트:</strong> 전역 객체 (strict mode: undefined)
          </li>
          <li>
            <strong>메서드 호출:</strong> 객체 자체 (<code>obj.method()</code>)
          </li>
          <li>
            <strong>생성자:</strong> 새로 생성된 인스턴스 (<code>new</code>)
          </li>
          <li>
            <strong>화살표 함수:</strong> 렉시컬 this (정의 위치 상속)
          </li>
          <li>
            <strong>call/apply/bind:</strong> 명시적 this 바인딩
          </li>
          <li>
            <strong>클래스:</strong> 메서드에서 bind 또는 화살표 함수 사용
          </li>
          <li>
            <strong>React:</strong> 함수형 컴포넌트로 this 문제 회피
          </li>
        </ul>
      </section>
    </div>
  );
}