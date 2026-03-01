import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TSTypeVsInterface() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Type vs Interface</h1>
        <p className="page-description">
          TypeScript 의 Type Alias 와 Interface 의 차이점과 사용 가이드에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          TypeScript 에는 타입을 정의하는 두 가지 주요 방법이 있습니다: <code>type</code> 과 <code>interface</code>.
          둘은 유사하지만 중요한 차이점이 있으며, 상황에 따라 적절한 것을 선택해야 합니다.
        </p>

        <InfoCard type="tip" title="핵심 차이 요약">
          <table>
            <thead>
              <tr>
                <th>기능</th>
                <th>type</th>
                <th>interface</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>원시 타입</td>
                <td>✅ 가능</td>
                <td>❌ 불가</td>
              </tr>
              <tr>
                <td>유니온 타입</td>
                <td>✅ 가능</td>
                <td>❌ 불가</td>
              </tr>
              <tr>
                <td>튜플</td>
                <td>✅ 가능</td>
                <td>❌ 불가</td>
              </tr>
              <tr>
                <td>선언 병합</td>
                <td>❌ 불가</td>
                <td>✅ 가능</td>
              </tr>
              <tr>
                <td>extends/implements</td>
                <td>✅ 가능</td>
                <td>✅ 가능</td>
              </tr>
              <tr>
                <td>상속 (확장)</td>
                <td>&amp; (교차)</td>
                <td>extends</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="type-basics">1️⃣ Type Alias 기본</h2>
        <p>
          <code>type</code> 은 어떤 타입이든 정의할 수 있는 범용 타입 정의 방법입니다.
        </p>

        <CodeDemo
          title="Type Alias 기본 사용법"
          description="원시 타입, 객체 타입, 유니온 등"
          defaultCode={`// 1. 원시 타입 별칭
type Name = string;
type Age = number;
type IsAdult = boolean;

const userName: Name = "Alice";
const userAge: Age = 25;

// 2. 객체 타입 정의
type User = {
  id: number;
  name: string;
  email?: string;  // 선택적 속성
  readonly createdAt: Date;  // 읽기 전용
};

const user: User = {
  id: 1,
  name: "Alice",
  createdAt: new Date()
};

// 3. 유니온 타입 (type 만 가능)
type Status = "pending" | "success" | "error";
type IdType = string | number;

const status: Status = "pending";
const id: IdType = 123;

// 4. 튜플 타입 (type 만 가능)
type Point = [number, number];
const point: Point = [10, 20];

// 5. 함수 타입
type GreetFn = (name: string) => string;
const greet: GreetFn = (name) => \`Hello, \${name}!\`;

// 6. 매핑된 타입 (type 만 가능)
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// 7. 조건부 타입 (type 만 가능)
type NonNullable<T> = T extends null | undefined ? never : T;
type Result = NonNullable<string | null>;  // string

console.log("Type Alias 예시 완료");`}
        />

        <InfoCard type="tip" title="Type Alias 장점">
          <ul>
            <li>
              <strong>범용성:</strong> 원시, 객체, 유니온, 튜플 등 모든 타입 정의 가능
            </li>
            <li>
              <strong>유연성:</strong> 매핑된 타입, 조건부 타입 등 고급 기능
            </li>
            <li>
              <strong>단일 정의:</strong> 한 번에 명확한 타입 정의
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="interface-basics">2️⃣ Interface 기본</h2>
        <p>
          <code>interface</code> 는 객체의 모양을 정의하는 데 특화되어 있으며,
          선언 병합이 가능합니다.
        </p>

        <CodeDemo
          title="Interface 기본 사용법"
          description="객체 타입 정의와 확장"
          defaultCode={`// 1. 기본 인터페이스
interface User {
  id: number;
  name: string;
  email?: string;  // 선택적 속성
  readonly createdAt: Date;  // 읽기 전용
}

// 2. 인터페이스 구현
const user: User = {
  id: 1,
  name: "Alice",
  createdAt: new Date()
};

// 3. 인터페이스 확장 (extends)
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}

const employee: Employee = {
  name: "Bob",
  age: 30,
  employeeId: 123,
  department: "Engineering"
};

// 4. 다중 상속
interface Identifiable {
  id: string;
}

interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface Post extends Identifiable, Timestamped {
  title: string;
  content: string;
}

const post: Post = {
  id: "post-1",
  title: "TypeScript",
  content: "Interface vs Type",
  createdAt: new Date(),
  updatedAt: new Date()
};

// 5. 클래스 구현
interface Greeter {
  greet(name: string): string;
}

class FormalGreeter implements Greeter {
  greet(name: string): string {
    return \`Good day, \${name}.\`;
  }
}

const greeter = new FormalGreeter();
console.log(greeter.greet("Alice"));

console.log("Interface 예시 완료");`}
        />

        <InfoCard type="tip" title="Interface 장점">
          <ul>
            <li>
              <strong>선언 병합:</strong> 같은 이름의 인터페이스는 자동 병합
            </li>
            <li>
              <strong>객체 지향:</strong> 클래스 구현, 확장에 적합
            </li>
            <li>
              <strong>가독성:</strong> 객체 모양 정의에 명확한 문법
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="declaration-merging">3️⃣ 선언 병합 (Declaration Merging)</h2>
        <p>
          <code>interface</code> 만 가능한 독특한 기능으로, 같은 이름의 인터페이스가 자동으로 병합됩니다.
        </p>

        <CodeDemo
          title="선언 병합 활용"
          description="인터페이스 확장과 모듈 보완"
          defaultCode={`// 1. 기본 선언 병합
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

// 위 두 인터페이스는 자동으로 병합됨
const box: Box = {
  height: 10,
  width: 20,
  scale: 1
};

// 2. 인터페이스 메서드 병합
interface Queue {
  enqueue(item: any): void;
}

interface Queue {
  dequeue(): any;
}

// 병합 결과: 두 메서드를 모두 가짐

// 3. 네임스페이스와 병합 (레거시)
interface Parcel {
  name: string;
}

namespace Parcel {
  export function create(name: string): Parcel {
    return { name };
  }
}

const parcel = Parcel.create("package");

// 4. 전역 인터페이스 확장 (실용적)
interface Window {
  myCustomProperty: string;
}

// 이제 Window 에 myCustomProperty 추가 가능
window.myCustomProperty = "value";

// 5. 내장 타입 확장
interface Array<T> {
  customMethod(): void;
}

// 주의: 실제 구현은 별도 필요
// Array.prototype.customMethod = function() {};

// 6. 모듈 내 선언 병합
interface Config {
  apiUrl: string;
}

interface Config {
  timeout: number;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

console.log("선언 병합 예시 완료");`}
        />

        <InfoCard type="warning" title="선언 병합 주의사항">
          <ul>
            <li>
              <strong>type 은 불가:</strong> type alias 는 선언 병합 불가 (중복 에러)
            </li>
            <li>
              <strong>충돌 시:</strong> 같은 속성명이면 타입 호환되어야 함
            </li>
            <li>
              <strong>남용 금지:</strong> 과도한 병합은 코드 이해를 어렵게 함
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="inheritance">4️⃣ 상속과 조합</h2>
        <p>
          type 과 interface 모두 상속과 조합이 가능하지만 방식이 다릅니다.
        </p>

        <CodeDemo
          title="상속과 조합 패턴"
          description="extends 와 교차 타입"
          defaultCode={`// 1. Interface extends
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const dog: Dog = {
  name: "Buddy",
  breed: "Golden Retriever"
};

// 2. Type 교차 타입 (&)
type Cat = {
  name: string;
};

type PersianCat = Cat & {
  furColor: string;
};

const cat: PersianCat = {
  name: "Whiskers",
  furColor: "white"
};

// 3. Interface 와 Type 혼용
interface BaseUser {
  id: number;
  name: string;
}

type FullUser = BaseUser & {
  email: string;
  phone?: string;
};

const fullUser: FullUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

// 4. Type extends (extends 키워드 사용)
type Base = {
  id: string;
  createdAt: Date;
};

type Derived = Base & {
  name: string;
};

// 5. 복잡한 조합
type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

interface SoftDelete {
  deletedAt?: Date;
}

type AuditableEntity = Timestamps & SoftDelete & {
  id: string;
};

const entity: AuditableEntity = {
  id: "123",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: undefined
};

// 6. 유니온 + 교차 복합
type Admin = {
  role: "admin";
  permissions: string[];
};

type User = {
  role: "user";
  preferences: Record<string, string>;
};

type Person = Admin | User;  // 유니온
type AuditedPerson = Person & { lastLogin: Date };  // 교차

const admin: AuditedPerson = {
  role: "admin",
  permissions: ["read", "write"],
  lastLogin: new Date()
};

console.log("상속과 조합 예시 완료");`}
        />

        <InfoCard type="tip" title="상속 방식 선택">
          <ul>
            <li>
              <strong>interface extends:</strong> 객체 지향, 명확한 계층 관계
            </li>
            <li>
              <strong>type &amp;:</strong> 함수형, 조합 중심 설계
            </li>
            <li>
              <strong>혼용:</strong> interface 정의, type 으로 조합 (권장)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="use-cases">5️⃣ 사용 사례별 권장</h2>
        <p>
          상황별로 type 과 interface 중 어떤 것을 사용하는 것이 좋은지 알아봅니다.
        </p>

        <CodeDemo
          title="사용 사례별 권장 패턴"
          description="실무에서のおすすめ 사용법"
          defaultCode={`// ============================================
// Interface 를 사용하는 것이 좋은 경우
// ============================================

// 1. 클래스 구현
interface PaymentProcessor {
  process(amount: number): Promise<void>;
  refund(id: string): Promise<void>;
}

class StripeProcessor implements PaymentProcessor {
  async process(amount: number) {
    console.log(\`Processing $\${amount}\`);
  }
  async refund(id: string) {
    console.log(\`Refunding \${id}\`);
  }
}

// 2. 라이브러리 API 정의 (선언 병합 활용)
interface ChartOptions {
  width: number;
  height: number;
}

interface ChartOptions {
  responsive?: boolean;
}

// 3. 객체 지향 설계
interface Repository<T> {
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
}

// ============================================
// Type 을 사용하는 것이 좋은 경우
// ============================================

// 4. 유니온 타입
type Status = "idle" | "loading" | "success" | "error";
type Result<T> = { type: "success"; data: T } | { type: "error"; error: Error };

// 5. 원시 타입 별칭
type UserId = string;
type EmailAddress = string;
type PositiveNumber = number & { __brand: "positive" };

// 6. 튜플과 매핑된 타입
type Point3D = [number, number, number];
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Partial<T> = { [K in keyof T]?: T[K] };

// 7. 조건부 타입
type Flatten<T> = T extends Array<infer U> ? U : T;
type NonNullable<T> = T extends null | undefined ? never : T;

// ============================================
// 혼용 패턴 (권장)
// ============================================

// 8. interface 로 기본 정의, type 으로 조합
interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

interface ButtonProps extends BaseProps {
  variant: "primary" | "secondary";
  onClick: () => void;
}

type CardProps = BaseProps & {
  title: string;
  children: React.ReactNode;
};

console.log("사용 사례 예시 완료");`}
        />

        <InfoCard type="tip" title="실무 권장 패턴">
          <ol>
            <li>
              <strong>라이브러리/프레임워크:</strong> interface (선언 병합 활용)
            </li>
            <li>
              <strong>도메인 모델:</strong> interface (클래스 구현)
            </li>
            <li>
              <strong>유틸리티 타입:</strong> type (유연성)
            </li>
            <li>
              <strong>컴포넌트 Props:</strong> 혼용 (일관성 있게)
            </li>
          </ol>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="migration">6️⃣ 변환과 호환</h2>
        <p>
          type 과 interface 는 상호 변환 가능하며, 혼용할 수 있습니다.
        </p>

        <CodeDemo
          title="Type-Interface 상호 변환"
          description="혼용과 변환 패턴"
          defaultCode={`// 1. Interface → Type 변환
interface UserInterface {
  id: number;
  name: string;
}

type UserType = UserInterface;  // 별칭으로 사용

// 2. Type → Interface 변환 (제한적)
type BaseProps = {
  className?: string;
};

// interface 로 직접 변환은 불가하지만, 교차 타입으로 활용
interface ButtonProps extends BaseProps {
  label: string;
}

// 3. 교차 타입으로 통합
interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

type AuditableUser = UserInterface & Timestamps;

// 4. 제네릭 혼용
interface Container<T> {
  value: T;
}

type ReadonlyContainer<T> = {
  readonly [K in keyof Container<T>]: Container<T>[K];
};

// 5. 실전 예시: API 응답
interface ApiResponse<T> {
  data: T;
  status: number;
}

type UserResponse = ApiResponse<{
  user: {
    id: number;
    name: string;
  };
}>;

// 6. React 컴포넌트 Props
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

type ButtonComponentProps = BaseComponentProps & {
  variant: "primary" | "secondary";
  onClick: () => void;
};

// 함수형 컴포넌트
function Button({ className, variant, onClick }: ButtonComponentProps) {
  return <button className={className} onClick={onClick}>{variant}</button>;
}

console.log("변환과 호환 예시 완료");`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>type:</strong> 범용 타입 정의, 유니온/튜플/조건부 타입 가능
          </li>
          <li>
            <strong>interface:</strong> 객체 모양 정의, 선언 병합 가능, 클래스 구현
          </li>
          <li>
            <strong>상속:</strong> type 은 &amp;, interface 는 extends
          </li>
          <li>
            <strong>선언 병합:</strong> interface 만 가능
          </li>
          <li>
            <strong>권장:</strong> 라이브러리는 interface, 유틸리티는 type, 혼용도 OK
          </li>
          <li>
            <strong>중요:</strong> 일관성 있게 사용 (프로젝트 규칙 따르기)
          </li>
        </ul>
      </section>
    </div>
  );
}