import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TSIntro() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>TypeScript 타입 시스템 소개</h1>
        <p className="page-description">
          TypeScript 의 기본 개념과 타입 시스템의 중요성에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>TypeScript</strong> 는 JavaScript 에 <strong>타입 시스템</strong>을 추가한 슈퍼셋
          언어입니다. Microsoft 에서 개발했으며, 컴파일 시 JavaScript 로 변환됩니다.
        </p>

        <InfoCard type="tip" title="TypeScript 의 장점">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>정적 타입 체크</strong>: 런타임 전에 에러 발견
            </li>
            <li>
              <strong>IDE 지원</strong>: 자동 완성, 리팩토링, 네비게이션
            </li>
            <li>
              <strong>코드 가독성</strong>: 타입이 문서 역할
            </li>
            <li>
              <strong>대규모 프로젝트</strong>: 유지보수성 향상
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="why-typescript">1️⃣ 왜 TypeScript 인가?</h2>
        <p>
          JavaScript 는 동적 타입 언어로, 런타임 전까지 타입 에러를 발견하기 어렵습니다. TypeScript
          는 컴파일 시점에 타입을 체크하여 안정성을 높입니다.
        </p>

        <CodeDemo
          title="JavaScript vs TypeScript"
          description="타입이 없는 JavaScript 와 타입이 있는 TypeScript 를 비교해보세요."
          defaultCode={`// JavaScript: 런타임까지 에러를 모름
function add(a, b) {
  return a + b;
}

console.log(add(1, 2));      // 3 (정상)
console.log(add('1', '2'));  // "12" (의도치 않은 동작)
console.log(add(1, '2'));    // "12" (에러 없음!)

// TypeScript: 컴파일 시점에 에러 발견
// function addTS(a: number, b: number): number {
//   return a + b;
// }
//
// console.log(addTS(1, 2));      // OK
// console.log(addTS('1', '2'));  // 에러! 타입 불일치
// console.log(addTS(1, '2'));    // 에러! 타입 불일치

// TypeScript 에서 주석을 풀어 타입 체크를 경험해보세요!`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="type-annotations">2️⃣ 타입 어노테이션 (Type Annotation)</h2>
        <p>변수, 함수, 객체 등에 타입을 명시하는 방법입니다.</p>

        <CodeDemo
          title="타입 어노테이션 기본"
          description="변수와 함수에 타입을 지정해보세요."
          defaultCode={`// 변수 타입 어노테이션
let name: string = 'Alice';
let age: number = 25;
let isStudent: boolean = false;

// 배열 타입
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ['Alice', 'Bob', 'Charlie'];

// 튜플 (고정 길이 배열)
let tuple: [string, number] = ['Alice', 25];

// any 타입 (모든 타입 허용 - 가급적 사용 자제)
let anything: any = 'hello';
anything = 42;
anything = true;

// void 타입 (반환값 없음)
function logMessage(message: string): void {
  console.log(message);
}

// 출력
console.log('name:', name);
console.log('age:', age);
console.log('isStudent:', isStudent);
console.log('numbers:', numbers);
console.log('tuple:', tuple);
logMessage('Hello, TypeScript!');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="type-inference">3️⃣ 타입 추론 (Type Inference)</h2>
        <p>
          TypeScript 는 변수의 초기값을 보고 자동으로 타입을 추론합니다. 명시적 어노테이션이
          불필요한 경우가 많습니다.
        </p>

        <CodeDemo
          title="타입 추론"
          description="TypeScript 가 자동으로 타입을 추론하는 것을 확인해보세요."
          defaultCode={`// 타입 추론 예시
let message = 'Hello';  // string 으로 추론
let count = 42;         // number 로 추론
let active = true;      // boolean 으로 추론

// 배열도 추론됨
let items = [1, 2, 3];  // number[] 로 추론

// 함수 반환 타입도 추론됨
function add(a: number, b: number) {
  return a + b;  // number 로 추론
}

// 명시적 어노테이션이 필요한 경우
// 1. 초기값이 없을 때
let value: string;
value = 'test';

// 2. any 로 추론될 때
let arr = [];  // any[]
let arrTyped: string[] = [];  // 명시적 지정

// 3. 반환 타입을 명시하고 싶을 때
function greet(name: string): string {
  return \`Hello, \${name}\`;
}

console.log('message:', message);
console.log('count:', count);
console.log('add(2, 3):', add(2, 3));
console.log('greet("Alice"):', greet('Alice'));`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="union-literal">4️⃣ 유니온 & 리터럴 타입</h2>
        <p>여러 타입을 허용하거나, 특정 값만 허용하는 타입입니다.</p>

        <InfoCard type="tip" title="유니온 타입 활용">
          <p>
            <code>string | number</code> 처럼 <code>|</code> 기호로 여러 타입을 허용합니다.
            <br />
            리터럴 타입은 <code>'success' | 'error' | 'loading'</code> 처럼 특정 값만 허용합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="유니온과 리터럴 타입"
          description="유연하면서도 안전한 타입을 정의해보세요."
          defaultCode={`// 유니온 타입
let id: string | number;
id = 123;      // OK
id = 'ABC123'; // OK
// id = true;  // 에러!

// 함수에서 유니온 타입
function printId(id: number | string) {
  console.log('ID:', id);
}

printId(123);
printId('ABC');

// 리터럴 타입
type Status = 'success' | 'error' | 'loading';

let status: Status = 'success';
// status = 'failed'; // 에러!

// 실전 예시
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function request(method: HttpMethod, url: string) {
  console.log(\`\${method} \${url}\`);
}

request('GET', '/api/users');
request('POST', '/api/users');
// request('PATCH', '/api/users'); // 에러!

// 유니온과 리터럴 조합
type Result = { status: 'success'; data: string } 
          | { status: 'error'; error: string };

const successResult: Result = { status: 'success', data: 'Hello' };
const errorResult: Result = { status: 'error', error: 'Failed' };

console.log('successResult:', successResult);
console.log('errorResult:', errorResult);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="type-alias">5️⃣ 타입 앨리어스 (Type Alias)</h2>
        <p>복잡한 타입에 이름을 붙여 재사용할 수 있게 합니다.</p>

        <CodeDemo
          title="타입 앨리어스"
          description="재사용 가능한 타입을 정의해보세요."
          defaultCode={`// 기본 타입 앨리어스
type UserID = string | number;
type Point = { x: number; y: number };

let userId: UserID = 123;
let point: Point = { x: 10, y: 20 };

// 함수에서 사용
function move(point: Point): Point {
  return { x: point.x + 1, y: point.y + 1 };
}

console.log('move(point):', move(point));

// 교차 타입 (&)
type Color = { color: string };
type Circle = Point & Color & { radius: number };

const circle: Circle = {
  x: 0,
  y: 0,
  color: 'red',
  radius: 10
};

console.log('circle:', circle);

// 실전 예시: API 응답 타입
type APIResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

type User = { id: number; name: string };

const userResponse: APIResponse<User> = {
  success: true,
  data: { id: 1, name: 'Alice' }
};

console.log('userResponse:', userResponse);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="optional-null">6️⃣ 선택적 속성과 null</h2>
        <p>속성을 선택적으로 만들거나, null/undefined 를 허용하는 방법입니다.</p>

        <InfoCard type="warning" title="strictNullChecks">
          <p>
            TypeScript 의 <code>strictNullChecks</code> 옵션이 켜져 있으면
            <code>null</code> 과 <code>undefined</code> 는 명시적으로 허용해야 합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="선택적 속성과 null"
          description="유연한 타입을 정의해보세요."
          defaultCode={`// 선택적 속성 (?)
interface User {
  id: number;
  name: string;
  email?: string;  // 선택적 속성
}

const user1: User = { id: 1, name: 'Alice' };
const user2: User = { id: 2, name: 'Bob', email: 'bob@example.com' };

console.log('user1:', user1);
console.log('user2:', user2);

// null 과 undefined
let nullableValue: string | null = null;
let undefinedValue: string | undefined = undefined;

// 실전 예시: API 응답
interface APIResult {
  data: string | null;  // null 일 수 있음
  message?: string;     // 없어도 됨
}

const result1: APIResult = { data: null };
const result2: APIResult = { data: 'Success', message: 'OK' };

// null 체크
function processData(result: APIResult) {
  if (result.data !== null) {
    console.log('Data:', result.data.toUpperCase());
  } else {
    console.log('No data');
  }
}

processData(result1);
processData(result2);

// null 병합 연산자
const value: string | null = null;
const defaultValue = value ?? 'Default';
console.log('defaultValue:', defaultValue);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>TypeScript: JavaScript 에 정적 타입 시스템 추가</li>
            <li>
              타입 어노테이션: <code>variable: type</code> 형식
            </li>
            <li>타입 추론: 초기값으로 자동 타입 결정</li>
            <li>
              유니온 타입: <code>A | B</code> - 여러 타입 허용
            </li>
            <li>리터럴 타입: 특정 값만 허용</li>
            <li>
              타입 앨리어스: <code>type Name = Type</code>
            </li>
            <li>
              선택적 속성: <code>prop?: type</code>
            </li>
            <li>null/undefined: 명시적 허용 필요</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
