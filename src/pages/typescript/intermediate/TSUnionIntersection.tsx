import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TSUnionIntersection() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Union & Intersection Types</h1>
        <p className="page-description">
          TypeScript 의 유니온과 교차 타입의 활용법에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>Union Types (유니온 타입)</strong> 과 <strong>Intersection Types (교차 타입)</strong> 은
          TypeScript 에서 타입을 조합하는 핵심 방법입니다.
        </p>

        <InfoCard type="tip" title="유니온 vs 교차">
          <ul>
            <li>
              <strong>Union (|):</strong> "또는" - 여러 타입 중 하나
            </li>
            <li>
              <strong>Intersection (&):</strong> "그리고" - 모든 타입을 합침
            </li>
            <li>
              <strong>집합론:</strong> Union 은 합집합, Intersection 은 교집합이 아님 (주의!)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="union-basics">1️⃣ Union Types 기본</h2>
        <p>
          유니온 타입은 <code>|</code> 연산자로 정의하며, 여러 타입 중 하나가 될 수 있습니다.
        </p>

        <CodeDemo
          title="유니온 타입 기본"
          description="기본 문법과 활용"
          defaultCode={`// 1. 기본 유니온 타입
let id: string | number;
id = "abc123";  // OK
id = 123;       // OK
// id = true;   // Error

// 2. 함수 매개변수에서 유니온
function printId(id: number | string) {
  console.log("ID:", id);
}

printId(101);        // OK
printId("ABC-001");  // OK

// 3. 공통 속성만 접근 가능
function printIdDetail(id: number | string) {
  // console.log(id.toFixed());  // Error: number 만 가능
  // console.log(id.toUpperCase());  // Error: string 만 가능
  console.log(id.toString());  // OK: 공통 메서드
}

// 4. 리터럴 유니온 (상태 표현에 유용)
type Status = "pending" | "loading" | "success" | "error";

let status: Status = "pending";
status = "loading";   // OK
status = "success";   // OK
// status = "fail";   // Error

// 5. 함수에서 상태에 따른 처리
function getStatusMessage(status: Status): string {
  switch (status) {
    case "pending":
      return "대기 중...";
    case "loading":
      return "로딩 중...";
    case "success":
      return "성공!";
    case "error":
      return "오류 발생!";
    default:
      const _exhaustive: never = status;
      return _exhaustive;
  }
}

// 6. 배열과 유니온
let ids: (number | string)[] = [1, "abc", 2, "def"];

// 7. 제네릭과 유니온
type Result<T> = { type: "success"; data: T } | { type: "error"; error: Error };

const successResult: Result<string> = { type: "success", data: "완료" };
const errorResult: Result<string> = { type: "error", error: new Error("실패") };

console.log("유니온 타입 예시 완료");`}
        />

        <InfoCard type="tip" title="유니온 타입 활용">
          <ul>
            <li>
              <strong>리터럴 유니온:</strong> 상태, 액션 타입 등 제한된 값 표현
            </li>
            <li>
              <strong>태그된 유니온:</strong> <code>type</code> 필드로 구분
            </li>
            <li>
              <strong>never 와 exhaustiveness:</strong> 모든 케이스 처리 검증
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="discriminated-union">2️⃣ Discriminated Unions (태그된 유니온)</h2>
        <p>
          공통 discriminant 필드를 가진 유니온 타입으로, 타입 가드와 함께 사용됩니다.
        </p>

        <CodeDemo
          title="태그된 유니온 패턴"
          description="type 필드로 구분하는 유니온"
          defaultCode={`// 1. 기본 태그된 유니온
interface Circle {
  kind: "circle";  // discriminant
  radius: number;
}

interface Square {
  kind: "square";
  side: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Square | Rectangle;

// 2. 타입 가드와 함께 사용
function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

const circle: Shape = { kind: "circle", radius: 5 };
console.log("원 넓이:", getArea(circle));

// 3. API 응답 상태 표현
type APIResponse<T> =
  | { status: "idle" }
  | { status: "loading"; data?: undefined }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

function handleResponse(response: APIResponse<string>): void {
  switch (response.status) {
    case "idle":
      console.log("대기 중");
      break;
    case "loading":
      console.log("로딩 중");
      break;
    case "success":
      console.log("데이터:", response.data);
      break;
    case "error":
      console.error("에러:", response.error.message);
      break;
  }
}

// 4. 액션 패턴 (Redux 스타일)
type Action =
  | { type: "INCREMENT"; amount: number }
  | { type: "DECREMENT"; amount: number }
  | { type: "RESET" };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "INCREMENT":
      return state + action.amount;
    case "DECREMENT":
      return state - action.amount;
    case "RESET":
      return 0;
    default:
      const _exhaustive: never = action;
      return _exhaustive;
  }
}

console.log("태그된 유니온 예시 완료");`}
        />

        <InfoCard type="tip" title="Discriminated Unions 장점">
          <ul>
            <li>
              <strong>타입 안전성:</strong> discriminant 로 타입 자동 추론
            </li>
            <li>
              <strong>exhaustiveness:</strong> 모든 케이스 처리 강제
            </li>
            <li>
              <strong>패턴 매칭:</strong> switch 문과 궁합 좋음
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="intersection-basics">3️⃣ Intersection Types 기본</h2>
        <p>
          교차 타입은 <code>&</code> 연산자로 정의하며, 모든 타입을 합칩니다.
        </p>

        <CodeDemo
          title="교차 타입 기본"
          description="기본 문법과 활용"
          defaultCode={`// 1. 기본 교차 타입
interface Person {
  name: string;
  age: number;
}

interface Employee {
  employeeId: string;
  department: string;
}

type EmployeeWithPerson = Person & Employee;
// 결과: { name: string; age: number; employeeId: string; department: string }

const employee: EmployeeWithPerson = {
  name: "Alice",
  age: 30,
  employeeId: "EMP-001",
  department: "Engineering"
};

// 2. 여러 타입 교차
interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

interface SoftDelete {
  deletedAt?: Date;
}

type AuditableEntity = Person & Timestamps & SoftDelete;

const auditable: AuditableEntity = {
  name: "Bob",
  age: 25,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: undefined
};

// 3. 함수 시그니처 교차
interface Readable {
  read(): string;
}

interface Writable {
  write(data: string): void;
}

type ReadWrite = Readable & Writable;

class FileStream implements ReadWrite {
  read(): string {
    return "data";
  }
  write(data: string): void {
    console.log("Writing:", data);
  }
}

// 4. 유니온과 교차 조합
type Admin = {
  role: "admin";
  permissions: string[];
};

type User = {
  role: "user";
  preferences: Record<string, string>;
};

type Person = Admin | User;  // 유니온

type AuditedPerson = Person & {  // 교차
  lastLogin: Date;
  isActive: boolean;
};

const admin: AuditedPerson = {
  role: "admin",
  permissions: ["read", "write"],
  lastLogin: new Date(),
  isActive: true
};

// 5. 제네릭과 교차
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge(
  { name: "Alice", age: 30 },
  { employeeId: "EMP-001", department: "Engineering" }
);
// merged 타입: { name: string; age: number; employeeId: string; department: string }

console.log("교차 타입 예시 완료");`}
        />

        <InfoCard type="warning" title="교차 타입 주의사항">
          <ul>
            <li>
              <strong>충돌 속성:</strong> 같은 속성이 다른 타입이면 <code>never</code> 가 됨
            </li>
            <li>
              <strong>호환성:</strong> 교차되는 타입이 호환되어야 함
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="advanced-patterns">4️⃣ 고급 패턴</h2>
        <p>
          유니온과 교차를 활용한 고급 타입 패턴입니다.
        </p>

        <CodeDemo
          title="고급 타입 패턴"
          description="실무에서 활용되는 패턴들"
          defaultCode={`// 1. Partial, Required, Readonly 와 조합
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;  // 모든 속성 선택적
type RequiredUser = Required<User>;  // 모든 속성 필수
type ReadonlyUser = Readonly<User>;  // 모든 속성 읽기 전용

// 2. Pick 과 Omit
type UserPreview = Pick<User, "id" | "name">;  // 일부 속성만 선택
type UserNoId = Omit<User, "id">;  // 일부 속성 제거

// 3. Record 유틸리티
type UserRole = "admin" | "user" | "guest";
type RolePermissions = Record<UserRole, string[]>;

const permissions: RolePermissions = {
  admin: ["read", "write", "delete"],
  user: ["read"],
  guest: []
};

// 4. Exclude 와 Extract
type EventType = "click" | "scroll" | "mousemove" | "keydown";
type MouseEvent = Exclude<EventType, "keydown">;  // "click" | "scroll" | "mousemove"
type KeyboardEvent = Extract<EventType, "keydown">;  // "keydown"

// 5. NonNullable
type NullableString = string | null | undefined;
type NonNullableString = NonNullable<NullableString>;  // string

// 6. ReturnType 과 Parameters
type GreetFn = (name: string, age: number) => string;
type GreetReturn = ReturnType<GreetFn>;  // string
type GreetParams = Parameters<GreetFn>;  // [name: string, age: number]

// 7. Conditional Types 와 조합
type IsString<T> = T extends string ? true : false;
type A = IsString<string>;  // true
type B = IsString<number>;  // false

// 8. Template Literal Types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type APIEndpoint = \`/\${Lowercase<HttpMethod>}/users\`;
// "/get/users" | "/post/users" | "/put/users" | "/delete/users"

// 9. Deep Partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Nested {
  user: {
    profile: {
      name: string;
      age: number;
    };
  };
}

type DeepPartialNested = DeepPartial<Nested>;

console.log("고급 패턴 예시 완료");`}
        />

        <InfoCard type="tip" title="유틸리티 타입">
          <p>
            TypeScript 는 유용한 내장 유틸리티 타입을 제공합니다:
            <code>Partial</code>, <code>Required</code>, <code>Readonly</code>,
            <code>Pick</code>, <code>Omit</code>, <code>Exclude</code>,
            <code>Extract</code>, <code>NonNullable</code>, <code>ReturnType</code>,
            <code>Parameters</code> 등
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="real-examples">5️⃣ 실전 예시</h2>
        <p>
          실제 프로젝트에서 활용되는 유니온과 교차 타입 예시입니다.
        </p>

        <CodeDemo
          title="실전 활용 예시"
          description="API, 컴포넌트, 상태 관리"
          defaultCode={`// 1. API 응답 타입
interface BaseResponse {
  timestamp: number;
  requestId: string;
}

interface SuccessResponse<T> extends BaseResponse {
  success: true;
  data: T;
}

interface ErrorResponse extends BaseResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

type APIResponse<T> = SuccessResponse<T> | ErrorResponse;

// 사용 예시
type User = { id: number; name: string };
type UserAPIResponse = APIResponse<User>;

function handleAPIResponse(response: UserAPIResponse) {
  if (response.success) {
    console.log("데이터:", response.data);
  } else {
    console.error("에러:", response.error.message);
  }
}

// 2. 컴포넌트 Props (공통 + 변형)
interface BaseButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface PrimaryButtonProps extends BaseButtonProps {
  variant: "primary";
  loading?: boolean;
}

interface SecondaryButtonProps extends BaseButtonProps {
  variant: "secondary";
  icon?: string;
}

interface DangerButtonProps extends BaseButtonProps {
  variant: "danger";
  confirmMessage?: string;
}

type ButtonProps = PrimaryButtonProps | SecondaryButtonProps | DangerButtonProps;

// 3. 상태 머신 패턴
type ConnectionState =
  | { status: "disconnected" }
  | { status: "connecting"; attempt: number }
  | { status: "connected"; sessionId: string }
  | { status: "error"; error: Error };

function handleConnection(state: ConnectionState) {
  switch (state.status) {
    case "disconnected":
      console.log("연결 끊김");
      break;
    case "connecting":
      console.log(\`연결 시도 \${state.attempt}번째\`);
      break;
    case "connected":
      console.log(\`세션: \${state.sessionId}\`);
      break;
    case "error":
      console.error(\`에러: \${state.error.message}\`);
      break;
  }
}

// 4. 설정 병합 (기본값 + 사용자 설정)
interface DefaultConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
}

interface UserConfig {
  timeout?: number;
  retries?: number;
  debug?: boolean;
}

type EffectiveConfig = DefaultConfig & UserConfig;

function createConfig(defaults: DefaultConfig, user: UserConfig): EffectiveConfig {
  return { ...defaults, ...user };
}

const config = createConfig(
  { apiUrl: "https://api.example.com", timeout: 5000, retries: 3 },
  { timeout: 10000, debug: true }
);

console.log("실전 예시 완료");`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Union (|):</strong> 여러 타입 중 하나, "또는"
          </li>
          <li>
            <strong>Intersection (&):</strong> 모든 타입을 합침, "그리고"
          </li>
          <li>
            <strong>Discriminated Union:</strong> type 필드로 구분, 타입 가드와 함께 사용
          </li>
          <li>
            <strong>유틸리티 타입:</strong> Partial, Pick, Omit 등 활용
          </li>
          <li>
            <strong>실전 패턴:</strong> API 응답, 컴포넌트 Props, 상태 머신
          </li>
          <li>
            <strong>Exhaustiveness:</strong> never 로 모든 케이스 처리 검증
          </li>
        </ul>
      </section>
    </div>
  );
}