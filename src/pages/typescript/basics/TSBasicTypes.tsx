import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TSBasicTypes() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>TypeScript 기본 타입</h1>
        <p className="page-description">TypeScript 의 모든 기본 타입에 대해 학습합니다.</p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          TypeScript 는 JavaScript 의 모든 타입에 더해, 추가적인 타입 시스템을 제공합니다. 각 타입의
          특징과 사용법을 확인해보세요.
        </p>
      </section>

      <section className="content-section">
        <h2 id="primitives">1️⃣ 원시 타입 (Primitive Types)</h2>
        <p>JavaScript 의 원시 타입에 TypeScript 타입이 매핑됩니다.</p>

        <CodeDemo
          title="원시 타입"
          description="string, number, boolean 타입입니다."
          defaultCode={`// string 타입
let text: string = 'Hello';
let template: string = \`Value: \${text}\`;

// number 타입 (정수, 실수 구분 없음)
let integer: number = 42;
let float: number = 3.14;
let binary: number = 0b1010;      // 2 진수
let octal: number = 0o52;         // 8 진수
let hex: number = 0x2a;           // 16 진수

// boolean 타입
let isTrue: boolean = true;
let isFalse: boolean = false;

// 출력
console.log('text:', text);
console.log('template:', template);
console.log('integer:', integer);
console.log('float:', float);
console.log('binary:', binary);
console.log('hex:', hex);
console.log('isTrue:', isTrue);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="array-tuple">2️⃣ 배열과 튜플 (Array & Tuple)</h2>
        <p>배열은 동일 타입의 요소 집합, 튜플은 고정 길이와 타입의 배열입니다.</p>

        <CodeDemo
          title="배열과 튜플"
          description="배열과 튜플 타입을 정의해보세요."
          defaultCode={`// 배열 타입 (두 가지写法)
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ['Alice', 'Bob', 'Charlie'];

// readonly 배열 (수정 불가)
let readonlyNumbers: readonly number[] = [1, 2, 3];
// readonlyNumbers.push(4); // 에러!

// 튜플 (고정 길이, 고정 타입)
let person: [string, number, boolean] = ['Alice', 25, true];

// 튜플 사용
const [name, age, isStudent] = person;
console.log('name:', name);
console.log('age:', age);
console.log('isStudent:', isStudent);

// 튜플 레이블 (TypeScript 4.0+)
let point: [x: number, y: number] = [10, 20];
console.log('point:', point);

// 선택적 튜플 요소
let optionalTuple: [string, number?] = ['hello'];
console.log('optionalTuple:', optionalTuple);

// 나머지 요소
let restTuple: [number, ...boolean[]] = [1, true, false, true];
console.log('restTuple:', restTuple);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="enum">3️⃣ 열거형 (Enum)</h2>
        <p>관련된 상수 집합에 이름을 붙입니다.</p>

        <InfoCard type="note" title="Enum 사용 가이드">
          <p>
            현대 TypeScript 에서는 유니온 리터럴 타입을 더 권장합니다.
            <br />
            하지만 레거시 코드나 특정 패턴에서는 여전히 유용합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="Enum (열거형)"
          description="상수 집합에 이름을 붙입니다."
          defaultCode={`// 숫자 Enum (기본 0 부터 시작)
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

console.log('Direction.Up:', Direction.Up);
console.log('Direction[0]:', Direction[0]); // 역방향 매핑

// 값 지정
enum Status {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected'
}

console.log('Status.Pending:', Status.Pending);

// 자동 값 증가
enum HttpStatus {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  // 203, 204... 자동 증가
}

console.log('HttpStatus.Ok:', HttpStatus.Ok);
console.log('HttpStatus.Created:', HttpStatus.Created);

// 실전 예시
function handleStatus(status: Status) {
  switch (status) {
    case Status.Pending:
      console.log('처리 중...');
      break;
    case Status.Approved:
      console.log('승인됨!');
      break;
    case Status.Rejected:
      console.log('거부됨');
      break;
  }
}

handleStatus(Status.Approved);

// 현대적 대안: 유니온 리터럴
type ModernStatus = 'pending' | 'approved' | 'rejected';
function handleModernStatus(status: ModernStatus) {
  console.log(\`Status: \${status}\`);
}

handleModernStatus('approved');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="object-types">4️⃣ 객체 타입 (Object Types)</h2>
        <p>객체의 모양 (shape) 을 정의합니다.</p>

        <CodeDemo
          title="객체 타입"
          description="인터페이스와 타입 앨리어스로 객체 타입 정의."
          defaultCode={`// 인터페이스로 정의
interface Person {
  name: string;
  age: number;
  email?: string;  // 선택적 속성
  readonly id: number;  // 읽기 전용
}

const person: Person = {
  id: 1,
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
};

console.log('person:', person);
// person.id = 2; // 에러! readonly

// 타입 앨리어스로 정의
type Point = {
  x: number;
  y: number;
};

const point: Point = { x: 10, y: 20 };
console.log('point:', point);

// 객체 타입 직접 사용
function printUser(user: { name: string; age: number }) {
  console.log(\`\${user.name} (\${user.age})\`);
}

printUser({ name: 'Bob', age: 30 });

// 함수 타입
type MathFunc = (a: number, b: number) => number;

const add: MathFunc = (a, b) => a + b;
const multiply: MathFunc = (a, b) => a * b;

console.log('add(2, 3):', add(2, 3));
console.log('multiply(2, 3):', multiply(2, 3));`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="special-types">5️⃣ 특수 타입 (Special Types)</h2>
        <p>any, unknown, never, void 등 특수한 목적의 타입입니다.</p>

        <InfoCard type="warning" title="any vs unknown">
          <p>
            <code>any</code> 는 타입 체크를 완전히 무시합니다 (사용 자제).
            <br />
            <code>unknown</code> 은 타입 확인 전까지 사용할 수 없는 안전한 타입입니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="특수 타입"
          description="any, unknown, never, void 타입입니다."
          defaultCode={`// any 타입 (가급적 사용 자제)
let anything: any = 'hello';
anything = 42;
anything = true;
anything.foo(); // 런타임 에러 가능!

// unknown 타입 (안전한 any)
let unknownValue: unknown = 'hello';
// let len: number = unknownValue.length; // 에러! 타입 확인 필요

// 타입 가드 필요
if (typeof unknownValue === 'string') {
  console.log('length:', unknownValue.length); // OK
}

// void 타입 (반환값 없음)
function log(message: string): void {
  console.log(message);
  // return undefined; // 암시적
}

log('Hello');

// never 타입 (절대 반환하지 않음)
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // 무한 루프
  }
}

// never 사용 예시 (switch exhaustive check)
type Status = 'success' | 'error' | 'loading';

function handleStatus(status: Status): string {
  switch (status) {
    case 'success':
      return 'Success';
    case 'error':
      return 'Error';
    case 'loading':
      return 'Loading';
    default:
      // 모든 케이스 처리 시 never 도달
      const _exhaustive: never = status;
      return _exhaustive;
  }
}

console.log(handleStatus('success'));`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="type-assertion">6️⃣ 타입 단언 (Type Assertion)</h2>
        <p>개발자가 컴파일러에게 타입을 명시적으로 알려줍니다.</p>

        <InfoCard type="warning" title="타입 단언 주의">
          <p>
            타입 단언은 <strong>타입 캐스팅이 아닙니다</strong>.<br />
            런타임에 영향을 주지 않으며, 컴파일 시에만 타입을 지정합니다. 남용하면 타입 안전성이
            떨어집니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="타입 단언"
          description="as 키워드로 타입을 명시합니다."
          defaultCode={`// as 키워드
const value: unknown = 'Hello';
const text = value as string;
console.log('text:', text);

// angle-bracket 문법 (JSX 에서는 사용 불가)
const num = value as number; // 런타임 에러 가능!

// 실전 예시: DOM 요소
// const canvas = document.getElementById('canvas') as HTMLCanvasElement;
// const ctx = canvas.getContext('2d');

// const input = document.getElementById('input') as HTMLInputElement;
// const value = input.value;

// const nonNull = document.getElementById('app')!; // non-null assertion

// const maybeElement: HTMLElement | null = null;
// const element = maybeElement as HTMLElement; // 위험!

// 안전한 방법
function getElement(id: string): HTMLElement {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(\`Element \${id} not found\`);
  }
  return element;
}

console.log('Type assertion example completed');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              원시 타입: <code>string</code>, <code>number</code>, <code>boolean</code>
            </li>
            <li>
              배열: <code>number[]</code> 또는 <code>Array&lt;number&gt;</code>
            </li>
            <li>
              튜플: 고정 길이 배열 <code>[string, number]</code>
            </li>
            <li>Enum: 상수 집합 (현대에는 유니온 리터럴 권장)</li>
            <li>
              객체 타입: <code>interface</code> 또는 <code>type</code>
            </li>
            <li>
              <code>void</code>: 반환값 없음, <code>never</code>: 절대 반환 안함
            </li>
            <li>
              <code>any</code>: 타입 체크 무시, <code>unknown</code>: 안전한 any
            </li>
            <li>
              타입 단언: <code>as Type</code> - 신중하게 사용
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
