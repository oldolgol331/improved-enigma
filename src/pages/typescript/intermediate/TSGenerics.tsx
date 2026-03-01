import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TSGenerics() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>TypeScript 제네릭 (Generics)</h1>
        <p className="page-description">
          재사용 가능한 컴포넌트를 만드는 제네릭에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>제네릭 (Generics)</strong> 은 타입을 마치 함수의 매개변수처럼 사용할 수 있게
          합니다. 하나의 타입 정의나 함수를 여러 타입에 대해 재사용할 수 있습니다.
        </p>

        <InfoCard type="tip" title="제네릭의 장점">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>타입 안정성</strong>: any 보다 안전한 재사용
            </li>
            <li>
              <strong>코드 재사용</strong>: 하나의 구현으로 여러 타입 처리
            </li>
            <li>
              <strong>유연성</strong>: 호출 시점에 타입 결정
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="basic">1️⃣ 제네릭 기본</h2>
        <p>제네릭 함수와 제네릭 인터페이스의 기본 문법입니다.</p>

        <CodeDemo
          title="제네릭 기본"
          description="제네릭 함수와 타입 파라미터입니다."
          defaultCode={`// 제네릭 없는 함수 (any 사용 - 타입 안전성 없음)
function identityAny(arg: any): any {
  return arg;
}

// 제네릭 함수
function identity<T>(arg: T): T {
  return arg;
}

// 타입 파라미터 명시
console.log('identity<string>("Hello"):', identity<string>('Hello'));
console.log('identity<number>(42):', identity(42)); // 타입 추론

// 제네릭 인터페이스
interface IdentityFunc<T> {
  (arg: T): T;
}

const myIdentity: IdentityFunc<string> = identity;
console.log('myIdentity("TypeScript"):', myIdentity('TypeScript'));

// 제네릭 객체
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: 'Hello' };
const numberBox: Box<number> = { value: 42 };

console.log('stringBox:', stringBox);
console.log('numberBox:', numberBox);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="constraints">2️⃣ 제네릭 제약 (Constraints)</h2>
        <p>타입 파라미터에 제약을 걸어 특정 조건을 만족하는 타입만 허용합니다.</p>

        <InfoCard type="warning" title="extends 키워드">
          <p>
            <code>extends</code> 는 제네릭에서 <strong>제약 조건</strong>을 의미합니다.
            <br />
            클래스 상속과는 다른 개념이니 주의하세요!
          </p>
        </InfoCard>

        <CodeDemo
          title="제네릭 제약"
          description="타입 파라미터에 조건을 부여합니다."
          defaultCode={`// length 속성이 있는 타입으로 제약
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log('Length:', arg.length);
  return arg;
}

// 사용 예시
logLength('Hello');      // string 은 length 있음
logLength([1, 2, 3]);    // 배열도 length 있음
// logLength(42);        // 에러! number 에 length 없음

// 객체에서도 작동
logLength({ name: 'Alice', age: 25 }); // 객체도 length 있음 (키 개수 아님!)

// 여러 제약 조건
function merge<T extends object, U extends object>(
  obj1: T,
  obj2: U
): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: 'Alice' }, { age: 25 });
console.log('merged:', merged);

// keyof 제약
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: 'Alice', email: 'alice@example.com' };
console.log('getProperty(user, "name"):', getProperty(user, 'name'));
console.log('getProperty(user, "id"):', getProperty(user, 'id'));
// getProperty(user, 'invalid'); // 에러!`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="mapped-types">3️⃣ 맵드 타입 (Mapped Types)</h2>
        <p>기존 타입을 변환하여 새로운 타입을 만듭니다.</p>

        <CodeDemo
          title="맵드 타입"
          description="타입을 변환하는 패턴입니다."
          defaultCode={`// Readonly 변환
interface Person {
  name: string;
  age: number;
  email: string;
}

type ReadonlyPerson = {
  readonly [K in keyof Person]: Person[K];
};

const readonlyPerson: ReadonlyPerson = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
};
// readonlyPerson.name = 'Bob'; // 에러!

// Partial 변환 (모든 속성 선택적)
type PartialPerson = {
  [K in keyof Person]?: Person[K];
};

const partial: PartialPerson = { name: 'Bob' };
console.log('partial:', partial);

// Pick 변환 (일부 속성만 선택)
type PickedPerson = {
  [K in 'name' | 'email']: Person[K];
};

const picked: PickedPerson = {
  name: 'Charlie',
  email: 'charlie@example.com'
};
console.log('picked:', picked);

// Record 변환 (키와 값 타입 지정)
type PersonRecord = Record<'name' | 'age' | 'email', string | number>;

const record: PersonRecord = {
  name: 'David',
  age: 30,
  email: 'david@example.com'
};

console.log('record:', record);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="conditional">4️⃣ 조건부 타입 (Conditional Types)</h2>
        <p>타입 레벨에서 조건문을 작성합니다.</p>

        <CodeDemo
          title="조건부 타입"
          description="T extends U ? X : Y 형식입니다."
          defaultCode={`// 기본 조건부 타입
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;   // true
type B = IsString<number>;   // false

// Extract 와 Exclude
type Fruit = 'apple' | 'banana' | 'orange';

type Citrus = Extract<Fruit, 'orange'>;  // 'orange'
type NonCitrus = Exclude<Fruit, 'orange'>;  // 'apple' | 'banana'

console.log('Citrus:', 'orange' as Citrus);
console.log('NonCitrus:', 'apple' as NonCitrus);

// infer 키워드 (타입 추론)
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type FuncReturn = ReturnType<() => string>;  // string
type NumReturn = ReturnType<() => number>;   // number

// 실전 예시: Promise 언래핑
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type A1 = UnwrapPromise<Promise<string>>;  // string
type A2 = UnwrapPromise<number>;           // number

// 중첩 조건부 타입
type Flatten<T> = T extends Array<infer U> ? U : T;

type F1 = Flatten<string[]>;  // string
type F2 = Flatten<number>;    // number`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="utility-types">5️⃣ 유틸리티 타입 (Utility Types)</h2>
        <p>TypeScript 가 제공하는 내장 유틸리티 타입들입니다.</p>

        <InfoCard type="tip" title="자주 쓰는 유틸리티 타입">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <code>Partial&lt;T&gt;</code>: 모든 속성 선택적
            </li>
            <li>
              <code>Required&lt;T&gt;</code>: 모든 속성 필수
            </li>
            <li>
              <code>Readonly&lt;T&gt;</code>: 모든 속성 읽기 전용
            </li>
            <li>
              <code>Pick&lt;T, K&gt;</code>: 일부 속성만 선택
            </li>
            <li>
              <code>Omit&lt;T, K&gt;</code>: 일부 속성만 제거
            </li>
            <li>
              <code>Record&lt;K, T&gt;</code>: 키와 값 타입 지정
            </li>
          </ul>
        </InfoCard>

        <CodeDemo
          title="유틸리티 타입"
          description="TypeScript 내장 유틸리티 타입입니다."
          defaultCode={`interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// Partial: 모든 속성 선택적
type PartialTodo = Partial<Todo>;
const partialTodo: PartialTodo = { title: 'Learn TS' };
console.log('partialTodo:', partialTodo);

// Required: 모든 속성 필수
type RequiredTodo = Required<Todo>;
const requiredTodo: RequiredTodo = {
  title: 'Learn TS',
  description: 'Study generics',
  completed: false
};
console.log('requiredTodo:', requiredTodo);

// Readonly: 모든 속성 읽기 전용
type ReadonlyTodo = Readonly<Todo>;
const readonlyTodo: ReadonlyTodo = {
  title: 'Learn TS',
  description: 'Study generics',
  completed: false
};
// readonlyTodo.completed = true; // 에러!

// Pick: 일부 속성만 선택
type TodoTitle = Pick<Todo, 'title'>;
const todoTitle: TodoTitle = { title: 'Learn TS' };
console.log('todoTitle:', todoTitle);

// Omit: 일부 속성만 제거
type TodoPreview = Omit<Todo, 'description'>;
const todoPreview: TodoPreview = {
  title: 'Learn TS',
  completed: false
};
console.log('todoPreview:', todoPreview);

// Record: 키와 값 타입 지정
type TodoStatus = 'todo' | 'in-progress' | 'done';
type TodoMap = Record<TodoStatus, Todo>;

const todoMap: TodoMap = {
  'todo': { title: 'A', description: 'B', completed: false },
  'in-progress': { title: 'C', description: 'D', completed: false },
  'done': { title: 'E', description: 'F', completed: true }
};
console.log('todoMap:', todoMap);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              제네릭: 타입을 매개변수처럼 사용 <code>&lt;T&gt;</code>
            </li>
            <li>
              제약 조건: <code>T extends U</code>
            </li>
            <li>keyof: 객체의 키 유니온 타입</li>
            <li>
              맵드 타입: <code>[K in keyof T]</code>
            </li>
            <li>
              조건부 타입: <code>T extends U ? X : Y</code>
            </li>
            <li>infer: 조건부 타입에서 타입 추론</li>
            <li>유틸리티 타입: Partial, Pick, Omit, Record 등</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
