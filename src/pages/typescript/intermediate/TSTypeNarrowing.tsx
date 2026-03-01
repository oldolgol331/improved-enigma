import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TSTypeNarrowing() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Type Narrowing</h1>
        <p className="page-description">
          TypeScript 타입 가드와 Narrowing 기법에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>Type Narrowing (타입 좁히기)</strong> 은 유니온 타입의 값을 더 구체적인 타입으로
          좁히는 과정입니다. 타입 가드 (type guard) 를 사용해 런타임 검사를 수행하면,
          TypeScript 가 해당 블록 내에서 더 구체적인 타입으로 추론합니다.
        </p>

        <InfoCard type="tip" title="Narrowing 핵심">
          <ul>
            <li>
              <strong>목적:</strong> 유니온 타입을 구체적인 타입으로 좁힘
            </li>
            <li>
              <strong>방법:</strong> 타입 가드 (조건문, instanceof, typeof 등)
            </li>
            <li>
              <strong>결과:</strong> 좁혀진 블록 내에서 구체적인 타입 사용 가능
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="typeof-guard">1️⃣ typeof 가드</h2>
        <p>
          <code>typeof</code> 연산자를 사용해 기본 타입을 구분합니다.
        </p>

        <CodeDemo
          title="typeof 타입 가드"
          description="원시 타입 구분"
          defaultCode={`// 1. 기본 typeof 가드
function printId(id: number | string) {
  if (typeof id === "string") {
    // 여기서 id 는 string 타입
    console.log(id.toUpperCase());  // OK
  } else {
    // 여기서 id 는 number 타입
    console.log(id.toFixed(2));  // OK
  }
}

printId("abc-123");
printId(12345);

// 2. typeof 로 분기 처리
function processValue(value: string | number | boolean) {
  if (typeof value === "string") {
    return "문자열: " + value;
  } else if (typeof value === "number") {
    return "숫자: " + value;
  } else {
    // boolean
    return "불리언: " + value;
  }
}

// 3. switch 문에서 typeof
function describeValue(value: string | number | bigint | boolean) {
  switch (typeof value) {
    case "string":
      return '문자열 "' + value + '"';
    case "number":
      return "숫자 " + value;
    case "boolean":
      return "불리언 " + value;
    case "bigint":
      return "빅인트 " + value + "n";
    default:
      const _exhaustive: never = value;
      return _exhaustive;
  }
}

// 4. 함수 시그니처
function combine(a: string | number, b: string | number): string | number {
  if (typeof a === "string" && typeof b === "string") {
    return a + b;  // 문자열 연결
  }
  if (typeof a === "number" && typeof b === "number") {
    return a + b;  // 숫자 덧셈
  }
  return String(a) + String(b);  // 문자열 변환 후 연결
}

console.log(combine("Hello, ", "World!"));  // "Hello, World!"
console.log(combine(10, 20));  // 30
console.log(combine("Count: ", 5));  // "Count: 5"

console.log("typeof 가드 예시 완료");`}
        />
      </section>

      <section className="content-section">
        <h2 id="truthiness">2️⃣ Truthiness Narrowing</h2>
        <p>
          불리언 컨텍스트 (if, &&, || 등) 에서 null/undefined 를 걸러냅니다.
        </p>

        <CodeDemo
          title="Truthiness Narrowing"
          description="null/undefined 필터링"
          defaultCode={`// 1. if 문에서 null/undefined 제거
function greet(name: string | null) {
  if (name) {
    // 여기서 name 은 string (null 아님)
    console.log("안녕하세요, " + name + "!");
  } else {
    // 여기서 name 은 null
    console.log("이름이 없습니다");
  }
}

greet("Alice");
greet(null);

// 2. 선택적 체이닝과 null 병합
function getUserDisplayName(user: { name?: string | null } | null) {
  // 선택적 체이닝
  const name = user?.name;

  // null 병합 연산자
  return name ?? "익명";
}

// 3. && 연산자
function printLength(value: string | null) {
  // value 가 truthy 일 때만 실행
  return value && value.length;
}

// 4. ! 연산자 (null 아님 단언)
function printLengthNonNull(value: string | null) {
  // ! 로 null 제거 (런타임 체크 없음, 주의!)
  return value!.length;
}

// 5. 배열 필터링
function getValidNames(names: (string | null | undefined)[]): string[] {
  return names.filter((name): name is string => !!name);
  // 또는: return names.filter(Boolean);
}

const names: (string | null | undefined)[] = ["Alice", null, "Bob", undefined, "Charlie"];
const validNames = getValidNames(names);
console.log("유효한 이름:", validNames);  // ["Alice", "Bob", "Charlie"]

// 6. 객체 속성 체크
interface User {
  id: number;
  name?: string;
}

function printUserName(user: User) {
  if (user.name) {
    console.log(user.name.toUpperCase());  // OK
  }
}

console.log("Truthiness 예시 완료");`}
        />

        <InfoCard type="warning" title="! 연산자 주의">
          <p>
            <code>!</code> (non-null 단언) 은 런타임 체크가 없습니다.
            값이 실제로 null/undefined 일 경우 런타임 에러가 발생하므로 신중하게 사용하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="equality">3️⃣ 등식 Narrowing</h2>
        <p>
          <code>===</code>, <code>!==</code>, <code>==</code>, <code>!=</code> 를 사용한 Narrowing 입니다.
        </p>

        <CodeDemo
          title="등식 Narrowing"
          description="값 비교를 통한 타입 좁히기"
          defaultCode={`// 1. 리터럴 값 비교
type Status = "pending" | "loading" | "success" | "error";

function getStatusMessage(status: Status): string {
  if (status === "pending") {
    return "대기 중...";
  } else if (status === "loading") {
    return "로딩 중...";
  } else if (status === "success") {
    return "성공!";
  } else {
    // status 는 "error"
    return "오류 발생!";
  }
}

// 2. null 비교
function getValue(value: string | null): string {
  if (value !== null) {
    // value 는 string
    return value;
  }
  return "기본값";
}

// 3. undefined 비교
function getOptionalValue(value: string | undefined): string {
  if (value === undefined) {
    return "제공되지 않음";
  }
  return value;
}

// 4. switch 문 (권장 패턴)
function handleStatus(status: Status): void {
  switch (status) {
    case "pending":
      console.log("대기 중");
      break;
    case "loading":
      console.log("로딩 중");
      break;
    case "success":
      console.log("성공");
      break;
    case "error":
      console.log("에러");
      break;
    default:
      const _exhaustive: never = status;
      return _exhaustive;
  }
}

// 5. in 연산자 (속성 존재 확인)
interface Cat {
  meow: () => void;
}

interface Dog {
  bark: () => void;
}

function makeSound(animal: Cat | Dog) {
  if ("meow" in animal) {
    // animal 은 Cat
    animal.meow();
  } else {
    // animal 은 Dog
    animal.bark();
  }
}

// 6. Array.isArray
function processItems(items: string | string[]) {
  if (Array.isArray(items)) {
    // items 는 string[]
    return items.join(", ");
  }
  // items 는 string
  return items;
}

console.log(processItems("hello"));  // "hello"
console.log(processItems(["a", "b", "c"]));  // "a, b, c"

console.log("등식 Narrowing 예시 완료");`}
        />
      </section>

      <section className="content-section">
        <h2 id="instanceof">4️⃣ instanceof 와 in</h2>
        <p>
          인스턴스 체크와 속성 존재 확인을 통한 Narrowing 입니다.
        </p>

        <CodeDemo
          title="instanceof 와 in"
          description="객체 타입 구분"
          defaultCode={`// 1. instanceof 가드
class ErrorWithCode extends Error {
  constructor(message: string, public code: number) {
    super(message);
  }
}

function handleError(error: Error | ErrorWithCode) {
  if (error instanceof ErrorWithCode) {
    // error 는 ErrorWithCode
    console.log(\`에러 코드: \${error.code}\`);
  } else {
    // error 는 Error
    console.log(\`일반 에러: \${error.message}\`);
  }
}

handleError(new Error("일반"));
handleError(new ErrorWithCode("코드 있음", 404));

// 2. Date 처리
function formatDate(date: Date | string) {
  if (date instanceof Date) {
    return date.toISOString();
  }
  return date;
}

// 3. in 연산자 (속성 확인)
interface User {
  type: "user";
  name: string;
}

interface Admin {
  type: "admin";
  name: string;
  permissions: string[];
}

function greetUser(person: User | Admin) {
  if ("permissions" in person) {
    // person 은 Admin
    console.log(\`관리자 \${person.name}, 권한: \${person.permissions.join(", ")}\`);
  } else {
    // person 은 User
    console.log(\`사용자 \${person.name}\`);
  }
}

// 4. discriminant 필드 (권장 패턴)
function greetUserV2(person: User | Admin) {
  switch (person.type) {
    case "user":
      console.log(\`사용자 \${person.name}\`);
      break;
    case "admin":
      console.log(\`관리자 \${person.name}\`);
      break;
    default:
      const _exhaustive: never = person;
  }
}

// 5. 여러 속성 체크
interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

function getArea(shape: Circle | Rectangle) {
  if ("radius" in shape) {
    // shape 은 Circle
    return Math.PI * shape.radius ** 2;
  }
  // shape 은 Rectangle
  return shape.width * shape.height;
}

console.log("instanceof/in 예시 완료");`}
        />
      </section>

      <section className="content-section">
        <h2 id="custom-guards">5️⃣ 커스텀 타입 가드</h2>
        <p>
          타입 프레디케이트 (<code>is</code>) 를 사용해 커스텀 타입 가드를 만듭니다.
        </p>

        <CodeDemo
          title="커스텀 타입 가드"
          description="타입 프레디케이트 활용"
          defaultCode={`// 1. 기본 타입 프레디케이트
interface Cat {
  type: "cat";
  meow: () => void;
}

interface Dog {
  type: "dog";
  bark: () => void;
}

type Animal = Cat | Dog;

// 타입 가드 함수
function isCat(animal: Animal): animal is Cat {
  return animal.type === "cat";
}

// 사용 예시
const animals: Animal[] = [
  { type: "cat", meow: () => console.log("Meow!") },
  { type: "dog", bark: () => console.log("Woof!") },
];

animals.forEach((animal) => {
  if (isCat(animal)) {
    // animal 은 Cat 타입
    animal.meow();
  } else {
    // animal 은 Dog 타입
    animal.bark();
  }
});

// 2. 값 검증 가드
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());  // OK
  }
}

// 3. 배열 필터링
function getStrings(values: unknown[]): string[] {
  return values.filter(isString);
}

// 4. 속성 검증
function hasProperty<T, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return key in obj;
}

interface User {
  id: number;
  name?: string;
}

function printUserName(user: User) {
  if (hasProperty(user, "name") && user.name) {
    console.log(user.name);
  }
}

// 5. API 응답 검증
interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  error: string;
}

type Response<T> = SuccessResponse<T> | ErrorResponse;

function isSuccessResponse<T>(
  response: Response<T>
): response is SuccessResponse<T> {
  return response.success === true;
}

function handleResponse(response: Response<string>) {
  if (isSuccessResponse(response)) {
    console.log("데이터:", response.data);
  } else {
    console.error("에러:", response.error);
  }
}

console.log("커스텀 가드 예시 완료");`}
        />

        <InfoCard type="tip" title="타입 프레디케이트">
          <p>
            <code>parameterName is Type</code> 형태의 반환 타입은
            조건이 true 일 때 매개변수가 해당 타입임을 TypeScript 에게 알립니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="switch-exhaustiveness">6️⃣ switch 와 Exhaustiveness</h2>
        <p>
          switch 문으로 모든 케이스를 처리하고, <code>never</code> 로 검증을 수행합니다.
        </p>

        <CodeDemo
          title="switch 와 Exhaustiveness Checking"
          description="모든 케이스 처리 검증"
          defaultCode={`// 1. 기본 switch Narrowing
type Action =
  | { type: "increment"; amount: number }
  | { type: "decrement"; amount: number }
  | { type: "reset" };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "increment":
      return state + action.amount;
    case "decrement":
      return state - action.amount;
    case "reset":
      return 0;
    default:
      // 모든 케이스가 처리되면 여기에 도달하지 않음
      const _exhaustive: never = action;
      return _exhaustive;
  }
}

// 2. exhaustiveness 함수
function assertNever(value: never): never {
  throw new Error(\`Unhandled case: \${JSON.stringify(value)}\`);
}

function handleStatus(status: "idle" | "loading" | "success" | "error") {
  switch (status) {
    case "idle":
      return "대기 중";
    case "loading":
      return "로딩 중";
    case "success":
      return "성공";
    case "error":
      return "에러";
    default:
      return assertNever(status);
  }
}

// 3. 새로운 케이스 추가 시 컴파일 에러
// type NewStatus = "idle" | "loading" | "success" | "error" | "cancelled";
// handleStatus("cancelled");  // Error: Argument not assignable to never

// 4. if-else 사슬에서 exhaustiveness
function handleAction(action: Action): string {
  if (action.type === "increment") {
    return \`+\${action.amount}\`;
  } else if (action.type === "decrement") {
    return \`-\${action.amount}\`;
  } else if (action.type === "reset") {
    return "reset";
  } else {
    const _exhaustive: never = action;
    return _exhaustive;
  }
}

// 5. discriminated union 과 함께
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

console.log("Exhaustiveness 예시 완료");`}
        />

        <InfoCard type="tip" title="Exhaustiveness Checking">
          <p>
            <code>never</code> 타입을 사용해 모든 케이스가 처리되었는지 검증할 수 있습니다.
            새로운 케이스를 추가했을 때 컴파일 에러를 발생시켜 실수를 방지합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="control-flow">7️⃣ 제어 흐름 분석</h2>
        <p>
          TypeScript 는 제어 흐름을 분석해 자동으로 타입을 좁힙니다.
        </p>

        <CodeDemo
          title="제어 흐름 분석"
          description="early return 과 타입 Narrowing"
          defaultCode={`// 1. early return 으로 Narrowing
function processValue(value: string | null | undefined): number {
  // null/undefined 일 때 일찍 반환
  if (value === null || value === undefined) {
    return 0;
  }
  // 여기서 value 는 string
  return value.length;
}

// 2. throw 로 Narrowing
function getRequiredValue(value: string | null): string {
  if (value === null) {
    throw new Error("값이 필요합니다");
  }
  // 여기서 value 는 string
  return value;
}

// 3. while 문
function processArray(items: (string | null)[]) {
  const result: string[] = [];
  
  while (items.length > 0) {
    const item = items.pop();
    if (item !== null) {
      result.push(item);
    }
  }
  
  return result;
}

// 4. for 문 Narrowing
function findFirstString(items: (string | number)[]): string | null {
  for (const item of items) {
    if (typeof item === "string") {
      return item;
    }
  }
  return null;
}

// 5. 구조분해할당과 Narrowing
function processUser(user: { name: string; email?: string | null }) {
  const { name, email } = user;
  
  if (email) {
    // email 은 string
    console.log(\`\${name} <\${email}>\`);
  } else {
    // email 은 undefined | null
    console.log(name);
  }
}

// 6. 옵셔널 체이닝과 Narrowing
interface User {
  name: string;
  address?: {
    city: string;
    street?: string;
  };
}

function printCity(user: User) {
  // user.address?.city 는 string | undefined
  const city = user.address?.city;
  
  if (city) {
    console.log(city);  // city 는 string
  }
}

console.log("제어 흐름 분석 예시 완료");`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>typeof:</strong> 원시 타입 구분 (string, number, boolean 등)
          </li>
          <li>
            <strong>Truthiness:</strong> null/undefined 필터링
          </li>
          <li>
            <strong>등식 비교:</strong> ===, !==, switch 문
          </li>
          <li>
            <strong>instanceof:</strong> 클래스 인스턴스 체크
          </li>
          <li>
            <strong>in:</strong> 속성 존재 확인
          </li>
          <li>
            <strong>커스텀 가드:</strong> 타입 프레디케이트 (<code>is Type</code>)
          </li>
          <li>
            <strong>Exhaustiveness:</strong> never 로 모든 케이스 처리 검증
          </li>
          <li>
            <strong>제어 흐름:</strong> early return, throw, 루프에서 자동 Narrowing
          </li>
        </ul>
      </section>
    </div>
  );
}