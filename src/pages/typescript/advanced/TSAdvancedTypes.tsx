import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TSAdvancedTypes() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>TypeScript 고급 타입</h1>
        <p className="page-description">TypeScript 의 고급 타입 기능과 패턴에 대해 학습합니다.</p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          TypeScript 는 <strong>고급 타입 시스템</strong>을 통해 복잡한 타입도 안전하게 표현할 수
          있습니다. 인덱스 타입, 매핑된 타입, 조건부 타입 등을 활용해 유연하고 타입 안전한 코드를
          작성합니다.
        </p>
      </section>

      <section className="content-section">
        <h2 id="keyof">1️⃣ keyof 와 인덱스 타입</h2>
        <p>
          <code>keyof</code> 는 객체 타입의 모든 키를 유니온 타입으로 추출합니다.
        </p>

        <CodeDemo
          title="keyof 와 인덱스 타입"
          description="객체의 키를 타입으로 활용합니다."
          defaultCode={`// keyof 연산자
interface Person {
  name: string;
  age: number;
  email: string;
}

// keyof Person = "name" | "age" | "email"
type PersonKeys = keyof Person;

const key: PersonKeys = 'name'; // OK
// const invalidKey: PersonKeys = 'address'; // 에러!

// 인덱스 접근 타입
type PersonName = Person['name']; // string
type PersonAge = Person['age'];   // number

// 여러 키 접근
type PersonNameOrAge = Person['name' | 'age']; // string | number

// 실전 예시: 타입安全的인 pick 함수
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = { name: 'Alice', age: 25, email: 'alice@example.com' };

console.log('name:', getProperty(person, 'name'));
console.log('age:', getProperty(person, 'age'));
// getProperty(person, 'address'); // 에러!

// 배열에서도 사용
type StringArray = string[];
type StringElement = StringArray[number]; // string

console.log('keyof and indexed access types');`}
          hideConsole={true}
        />
      </section>

      <section className="content-section">
        <h2 id="mapped-types">2️⃣ 매핑된 타입 (Mapped Types)</h2>
        <p>기존 타입을 변환하여 새로운 타입을 만듭니다.</p>

        <CodeDemo
          title="매핑된 타입"
          description="타입을 변환하는 다양한 패턴입니다."
          defaultCode={`// 기본 매핑된 타입
interface Person {
  name: string;
  age: number;
  email: string;
}

// 모든 속성을 readonly 로
type ReadonlyPerson = {
  readonly [K in keyof Person]: Person[K];
};

// 모든 속성을 optional 로
type PartialPerson = {
  [K in keyof Person]?: Person[K];
};

// 모든 속성을 required 로
type RequiredPerson = {
  [K in keyof Person]-?: Person[K];
};

// 모든 속성을 readonly 로
type DeepReadonlyPerson = {
  readonly [K in keyof Person]: Person[K];
};

// 값 변환 (type modifier)
type NullablePerson = {
  [K in keyof Person]: Person[K] | null;
};

type ReadonlyNullablePerson = {
  readonly [K in keyof Person]: Person[K] | null;
};

// 키 변환 (as 구문 - TS 4.1+)
type UppercasePerson = {
  [K in keyof Person as Uppercase<string & K>]: Person[K];
};
// { NAME: string, AGE: number, EMAIL: string }

// 실전 예시: 이벤트 핸들러 타입
type EventHandlers<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}\`]: (value: T[K]) => void;
};

type FormState = {
  username: string;
  password: string;
  email: string;
};

type FormHandlers = EventHandlers<FormState>;
// {
//   onUsername: (value: string) => void;
//   onPassword: (value: string) => void;
//   onEmail: (value: string) => void;
// }

console.log('Mapped types patterns');`}
          hideConsole={true}
        />

        <InfoCard type="tip" title="Built-in Mapped Types">
          <p>TypeScript 는 자주 쓰는 매핑된 타입을 내장합니다:</p>
          <ul style={{ margin: '0.5rem 0 0 1.2rem' }}>
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
              <code>Record&lt;K, T&gt;</code>: 키 - 값 매핑
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="conditional-types">3️⃣ 조건부 타입 (Conditional Types)</h2>
        <p>
          타입 레벨에서 조건문을 작성합니다. <code>T extends U ? X : Y</code> 형식입니다.
        </p>

        <CodeDemo
          title="조건부 타입"
          description="타입 조건문과 infer 키워드입니다."
          defaultCode={`// 기본 조건부 타입
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Distributive Conditional Types (유니온 분배)
type ToArray<T> = T extends any ? T[] : never;

type StringArray = ToArray<string>;  // string[]
type NumberOrStringArray = ToArray<number | string>;  // number[] | string[]
// 분배됨: ToArray<number> | ToArray<string>

// infer 키워드 (타입 추론)
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type FuncReturn = ReturnType<() => string>;  // string
type NumReturn = ReturnType<() => number>;   // number

// Promise 언래핑
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type A1 = UnwrapPromise<Promise<string>>;  // string
type A2 = UnwrapPromise<number>;           // number

// 실전 예시: 함수 파라미터 추출
type FirstParameter<T> = T extends (arg: infer P, ...args: any[]) => any ? P : never;

type Param1 = FirstParameter<(name: string, age: number) => void>;  // string

// 실전 예시: 배열 요소 타입 추출
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type Element1 = ArrayElement<string[]>;  // string
type Element2 = ArrayElement<number[]>;  // number

console.log('Conditional types with infer');`}
          hideConsole={true}
        />
      </section>

      <section className="content-section">
        <h2 id="template-literal">4️⃣ 템플릿 리터럴 타입</h2>
        <p>템플릿 리터럴 문법을 타입 레벨에서 사용합니다.</p>

        <CodeDemo
          title="템플릿 리터럴 타입"
          description="문자열 타입을 조합하고 변환합니다."
          defaultCode={`// 기본 템플릿 리터럴 타입
type Greeting = 'Hello, ' + string;

const greeting1: Greeting = 'Hello, World';  // OK
const greeting2: Greeting = 'Hello, TypeScript';  // OK
// const greeting3: Greeting = 'Hi';  // 에러!

// 유니온 타입과 조합
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type APIEndpoint = '/api/' + HttpMethod + '/users';

type Endpoint1 = APIEndpoint;  // "/api/GET/users" | "/api/POST/users" | ...

// 문자열 조작 유틸리티 타입
type LowercaseHello = Lowercase<'HELLO'>;  // 'hello'
type UppercaseHello = Uppercase<'hello'>;  // 'HELLO'
type CapitalizeHello = Capitalize<'hello'>;  // 'Hello'
type UncapitalizeHello = Uncapitalize<'Hello'>;  // 'hello'

// 실전 예시: 이벤트 이름 타입
type EventType = 'click' | 'scroll' | 'mousemove' | 'keydown';
type EventHandlerName = 'on' + Capitalize<EventType>;
// "onClick" | "onScroll" | "onMousemove" | "onKeydown"

// 실전 예시: CSS 속성 타입
type CSSProperty = 'color' | 'background' | 'margin' | 'padding';
type CSSValue = string | number;
type CSSStyles = {
  [K in CSSProperty]?: CSSValue;
};

const styles: CSSStyles = {
  color: 'red',
  margin: 10
};

// 실전 예시: 상태 머신 타입
type State = 'idle' | 'loading' | 'success' | 'error';
type StateEvent = State + ':' + State;

type Transition1 = StateEvent;  // "idle:loading" | "loading:success" | ...

console.log('Template literal types');`}
          hideConsole={true}
        />
      </section>

      <section className="content-section">
        <h2 id="type-guards">5️⃣ 타입 가드 (Type Guards)</h2>
        <p>런타임에 타입을 검사하고 좁히는 (narrowing) 기법입니다.</p>

        <CodeDemo
          title="타입 가드"
          description="런타임 타입 검사와 타입 좁히기입니다."
          defaultCode={`// typeof 타입 가드
function printId(id: number | string) {
  if (typeof id === 'string') {
    // id 는 string 으로 좁혀짐
    console.log(id.toUpperCase());
  } else {
    // id 는 number
    console.log(id.toFixed(2));
  }
}

// instanceof 타입 가드
function formatDate(date: Date | string) {
  if (date instanceof Date) {
    return date.toISOString();
  }
  return date;
}

// in 연산자 타입 가드
type Cat = { name: string; meow: () => void };
type Dog = { name: string; bark: () => void };

function makeSound(animal: Cat | Dog) {
  if ('meow' in animal) {
    // animal 은 Cat 으로 좁혀짐
    animal.meow();
  } else {
    animal.bark();
  }
}

// 커스텀 타입 가드 (타입 서술어)
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function process(value: unknown) {
  if (isString(value)) {
    // value 는 string 으로 좁혀짐
    console.log(value.length);
  }
}

// discriminated union (태그된 유니온)
type SuccessResponse = {
  success: true;
  data: string;
};

type ErrorResponse = {
  success: false;
  error: string;
};

type Response = SuccessResponse | ErrorResponse;

function handleResponse(response: Response) {
  if (response.success) {
    // response 는 SuccessResponse
    console.log('Data:', response.data);
  } else {
    // response 는 ErrorResponse
    console.log('Error:', response.error);
  }
}

// switch 문 타입 가드
type APIState =
  | { status: 'idle' }
  | { status: 'loading'; progress: number }
  | { status: 'success'; data: string }
  | { status: 'error'; error: string };

function render(state: APIState) {
  switch (state.status) {
    case 'idle':
      return 'Ready';
    case 'loading':
      return \`Loading: \${state.progress}%\`;
    case 'success':
      return \`Data: \${state.data}\`;
    case 'error':
      return \`Error: \${state.error}\`;
  }
}

console.log('Type guards and narrowing');`}
          hideConsole={true}
        />

        <InfoCard type="tip" title="타입 서술어 (Type Predicate)">
          <p>
            <code>value is Type</code> 형태의 반환 타입은 <strong>타입 서술어</strong>입니다.
            <br />
            조건이 참일 때 변수의 타입을 <code>Type</code> 으로 좁힙니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="advanced-utility">6️⃣ 고급 유틸리티 타입</h2>
        <p>TypeScript 가 제공하는 고급 유틸리티 타입들입니다.</p>

        <CodeDemo
          title="고급 유틸리티 타입"
          description="복잡한 타입 변환을 위한 유틸리티입니다."
          defaultCode={`// Parameters: 함수 파라미터 타입 (튜플)
type FuncParams = Parameters<(a: string, b: number) => void>;
// [string, number]

// ConstructorParameters: 생성자 파라미터 타입
type ClassParams = ConstructorParameters<typeof Date>;
// [number?] | [string] | [number, number, ...]

// NonNullable: null 과 undefined 제외
type NonNull = NonNullable<string | number | null | undefined>;
// string | number

// ReturnType: 함수 반환 타입
type FuncReturn = ReturnType<() => Promise<string>>;
// Promise<string>

// InstanceType: 생성자 인스턴스 타입
class Person {
  constructor(public name: string) {}
}
type PersonInstance = InstanceType<typeof Person>;
// Person

// ThisParameterType / OmitThisParameter
function greet(this: { name: string }) {
  console.log(\`Hello, \${this.name}\`);
}
type GreetParams = Parameters<typeof greet>;  // []
type ThisType = ThisParameterType<typeof greet>;  // { name: string }

// Awaited: Promise 언래핑 (ES2022)
type AsyncResult = Awaited<Promise<string>>;  // string
type NestedAsync = Awaited<Promise<Promise<number>>>;  // number

// 실전 예시: API 응답 타입
interface User {
  id: number;
  name: string;
  email: string;
}

type APIResponse<T> = {
  data: T;
  status: number;
  headers: Record<string, string>;
};

type UserResponse = APIResponse<User>;

// Awaited 로 Promise 언래핑
type UserFromPromise = Awaited<Promise<UserResponse>>;
// UserResponse

// 실전 예시: Deep Partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface NestedConfig {
  database: {
    host: string;
    port: number;
  };
  cache: {
    enabled: boolean;
    ttl: number;
  };
}

type PartialConfig = DeepPartial<NestedConfig>;
// {
//   database?: { host?: string; port?: number; };
//   cache?: { enabled?: boolean; ttl?: number; };
// }

console.log('Advanced utility types');`}
          hideConsole={true}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <code>keyof T</code>: 객체 키 유니온 타입
            </li>
            <li>
              <code>T[K]</code>: 인덱스 접근 타입
            </li>
            <li>
              매핑된 타입: <code>[K in keyof T]</code> 로 타입 변환
            </li>
            <li>
              조건부 타입: <code>T extends U ? X : Y</code>
            </li>
            <li>
              <code>infer</code>: 조건부 타입에서 타입 추론
            </li>
            <li>템플릿 리터럴 타입: 백틱을 사용한 타입 레벨 문자열 조합</li>
            <li>
              타입 가드: <code>typeof</code>, <code>instanceof</code>, <code>in</code>, 타입 서술어
            </li>
            <li>유틸리티 타입: Parameters, ReturnType, Awaited, DeepPartial 등</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
