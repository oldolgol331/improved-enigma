import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TSEnumsTuples() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>TypeScript Enums & Tuples</h1>
        <p className="page-description">
          TypeScript 의 Enum 과 Tuple 타입, 그리고 Type Assertions 에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>Enum</strong> 은 상수 집합을 정의하고, <strong>Tuple</strong> 은 고정 길이 배열을,
          <strong>Type Assertions</strong> 는 타입 변환을 수행합니다.
        </p>

        <InfoCard type="tip" title="핵심 개념">
          <ul>
            <li>
              <strong>Enum:</strong> 이름 있는 상수 집합 (상태, 역할 등)
            </li>
            <li>
              <strong>Tuple:</strong> 고정 길이 + 특정 타입 배열
            </li>
            <li>
              <strong>Type Assertion:</strong> 타입 캐스팅 (as, angle bracket)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="enums">1️⃣ Enums (열거형)</h2>
        <p>
          Enum 은 관련된 상수 집합을 정의합니다.
        </p>

        <CodeDemo
          title="Enum 기본 사용법"
          description="Numeric, String, Const Enum"
          defaultCode={`// 1. Numeric Enum (기본)
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right,   // 3
}

let dir: Direction = Direction.Up;
console.log('Direction.Up:', dir);  // 0
console.log('Direction[0]:', Direction[0]);  // 'Up' (역방향 매핑)

// 2. 초기값 지정
enum Status {
  Pending = 10,  // 10
  Loading,       // 11 (자동 증가)
  Success,       // 12
  Error,         // 13
}

console.log('Status.Loading:', Status.Loading);  // 11

// 3. String Enum (가독성 좋음)
enum LogLevel {
  Debug = 'DEBUG',
  Info = 'INFO',
  Warn = 'WARN',
  Error = 'ERROR',
}

function log(level: LogLevel, message: string) {
  console.log(\`[\${level}] \${message}\`);
}

log(LogLevel.Info, '서버 시작됨');

// 4. Enum 사용 예시 - 상태 머신
enum OrderStatus {
  Pending = 'PENDING',
  Paid = 'PAID',
  Shipped = 'SHIPPED',
  Delivered = 'DELIVERED',
  Cancelled = 'CANCELLED',
}

interface Order {
  id: number;
  status: OrderStatus;
  amount: number;
}

const order: Order = {
  id: 1,
  status: OrderStatus.Pending,
  amount: 10000,
};

function canCancel(order: Order): boolean {
  return order.status === OrderStatus.Pending || 
         order.status === OrderStatus.Paid;
}

console.log('취소 가능:', canCancel(order));

// 5. Const Enum (컴파일 시점에 제거, 성능 최적화)
// const enum Color {
//   Red = 'RED',
//   Green = 'GREEN',
//   Blue = 'BLUE',
// }
//
// const c = Color.Red;  // 컴파일 후: const c = 'RED';

console.log('Enum 예시 완료');`}
        />

        <InfoCard type="warning" title="Enum vs Union Literals">
          <p>
            현대 TypeScript 는 <strong>Union Literal Types</strong> 를 더 권장합니다.
            <br />
            <code>enum</code> 는 런타임 오버헤드가 있고, const enum 은 복잡합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="tuples">2️⃣ Tuples (튜플)</h2>
        <p>
          Tuple 은 <strong>고정 길이</strong>와 <strong>특정 타입</strong>의 배열입니다.
        </p>

        <CodeDemo
          title="Tuple 기본 사용법"
          description="고정 길이 배열과 활용"
          defaultCode={`// 1. 기본 Tuple
let user: [number, string, boolean];
user = [1, 'Alice', true];  // OK
// user = ['Alice', 1, true];  // Error: 타입 불일치

// 2. 접근과 구조분해할당
const [id, name, active] = user;
console.log('ID:', id);  // 1
console.log('Name:', name);  // 'Alice'

// 3. Tuple 타입 명시
type Point = [number, number];

const origin: Point = [0, 0];
const point: Point = [10, 20];

function move(p: Point, dx: number, dy: number): Point {
  return [p[0] + dx, p[1] + dy];
}

const newPos = move(point, 5, 3);
console.log('새 위치:', newPos);  // [15, 23]

// 4. Named Tuples (TypeScript 4.0+)
type Person = [
  id: number,
  name: string,
  age: number
];

const person: Person = [1, 'Bob', 30];
const [, personName] = person;  // 이름으로 접근 불가, 위치로만

// 5. Optional Elements (TypeScript 4.0+)
type OptionalTuple = [number, string, boolean?];

const t1: OptionalTuple = [1, 'hello'];  // OK
const t2: OptionalTuple = [1, 'hello', true];  // OK

// 6. Rest Elements (가변 길이)
type NumberArray = [number, ...number[]];

const arr1: NumberArray = [1];  // OK
const arr2: NumberArray = [1, 2, 3, 4, 5];  // OK

// 7. 실제 활용 - useState 의 반환 타입
// function useState<T>(initial: T): [T, (value: T) => void] {
//   let state = initial;
//   return [
//     state,
//     (value: T) => { state = value; }
//   ];
// }
//
// const [count, setCount] = useState(0);

// 8. Tuple 과 Array 차이
const tuple: [number, number] = [1, 2];
const array: number[] = [1, 2];

// tuple.push(3);  // Error: 길이 고정
array.push(3);  // OK

console.log('Tuple 예시 완료');`}
        />

        <InfoCard type="tip" title="Tuple 사용 사례">
          <ul>
            <li>
              <strong>좌표:</strong> <code>[x, y]</code>, <code>[lat, lng]</code>
            </li>
            <li>
              <strong>RGB 색상:</strong> <code>[r, g, b]</code>
            </li>
            <li>
              <strong>상태 쌍:</strong> <code>[value, setValue]</code>
            </li>
            <li>
              <strong>결과 쌍:</strong> <code>[error, data]</code>
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="type-assertions">3️⃣ Type Assertions</h2>
        <p>
          Type Assertion 은 TypeScript 에게 "이 타입을 믿으세요"라고 알려줍니다.
        </p>

        <CodeDemo
          title="Type Assertion 사용법"
          description="as 문법과 angle bracket"
          defaultCode={`// 1. as 문법 (권장 - JSX 와 호환)
const inputValue = document.getElementById('input') as HTMLInputElement;
inputValue.value = 'Hello';

// 2. Angle Bracket 문법 (JSX 에서 사용 불가)
// const inputValue = <HTMLInputElement>document.getElementById('input');

// 3. 타입이 불명확한 경우
interface Cat {
  meow(): void;
}

function isCat(pet: Cat | undefined): pet is Cat {
  return (pet as Cat).meow !== undefined;
}

// 4. 상수 단언 (as const) - 리터럴 타입으로 고정
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
} as const;

// config.apiUrl = 'other';  // Error: readonly

// 5. as const 활용 - 액션 타입
const ACTION_TYPES = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
} as const;

type ActionType = typeof ACTION_TYPES[keyof typeof ACTION_TYPES];
// 'INCREMENT' | 'DECREMENT' | 'RESET'

// 6. satisfies 연산자 (TypeScript 4.9+)
// 타입은 유지하되 값만 검증
type Colors = 'red' | 'green' | 'blue';

const favoriteColors = {
  alice: 'red',
  bob: 'green',
} as const satisfies Record<string, Colors>;

// 7. 위험한 단언 (as any) - 타입 검사 우회
// const data = JSON.parse(jsonString) as any;
// console.log(data.anything);  // 타입 검사 없음

// 8. Non-null 단언 (!) - null/undefined 아님 보장
// const element = document.getElementById('app')!;

console.log('Type Assertion 예시 완료');`}
        />

        <InfoCard type="warning" title="Assertion 주의사항">
          <ul>
            <li>
              <strong>as any:</strong> 타입 안전성 상실, 최소화
            </li>
            <li>
              <strong>!</strong> 연산자: 런타임 에러 가능성
            </li>
            <li>
              <strong>as const:</strong> readonly 생성, 수정 불가
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="tsconfig">4️⃣ tsconfig.json 핵심 옵션</h2>
        <p>
          TypeScript 컴파일러 설정을 알아봅니다.
        </p>

        <CodeDemo
          title="tsconfig.json 주요 옵션"
          description="컴파일러 설정과 strict 모드"
          defaultCode={`// ============================================
// tsconfig.json 예시
// ============================================
/*
{
  "compilerOptions": {
    // 타겟과 모듈
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    
    // 출력 설정
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "sourceMap": true,
    
    // Strict 모드 (권장)
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    
    // 추가 검사
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    
    //Interop
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    
    // 실험적 기능
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    
    // JSX (React)
    "jsx": "react-jsx",
    
    // 경로 별칭
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  },
  
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
*/

// ============================================
// Strict 모드 효과
// ============================================

// strict: false
// let value;  // any 타입 (위험!)

// strict: true
// let value;  // Error: implicitly has 'any' type

// strictNullChecks: true
// let name: string = null;  // Error
// let name: string | null = null;  // OK

console.log('tsconfig 예시 완료');`}
        />

        <InfoCard type="tip" title="권장 설정">
          <ul>
            <li>
              <strong>strict: true</strong>: 모든 타입 검사 활성화
            </li>
            <li>
              <strong>noUncheckedIndexedAccess</strong>: 배열 인덱 접근 시 undefined 체크
            </li>
            <li>
              <strong>esModuleInterop</strong>: CommonJS 와 ES Modules 호환
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="unknown-never">5️⃣ Unknown & Never</h2>
        <p>
          <code>unknown</code> 과 <code>never</code> 는 특수한 타입입니다.
        </p>

        <CodeDemo
          title="Unknown 과 Never 타입"
          description="타입 안전성과 배타적 타입"
          defaultCode={`// ============================================
// 1. Unknown - 타입 불명확 (안전한 any)
// ============================================

let unknownValue: unknown;

unknownValue = 'hello';  // OK
unknownValue = 42;  // OK
unknownValue = true;  // OK

// unknownValue.toString();  // Error: 타입 확인 필요

// 타입 가드 필요
if (typeof unknownValue === 'string') {
  console.log(unknownValue.toUpperCase());  // OK
}

// 타입 단언
const str = unknownValue as string;

// 함수에서 unknown 사용
function safeParse(json: string): unknown {
  return JSON.parse(json);
}

const result = safeParse('{"name": "Alice"}');
// result 는 unknown - 타입 확인 필요

// ============================================
// 2. Never - 절대 발생하지 않음
// ============================================

// 2-1. 반환하지 않는 함수
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // 무한 루프
  }
}

// 2-2. Exhaustiveness Checking
type Direction = 'up' | 'down' | 'left' | 'right';

function move(direction: Direction) {
  switch (direction) {
    case 'up':
      console.log('이동: 위');
      break;
    case 'down':
      console.log('이동: 아래');
      break;
    case 'left':
      console.log('이동: 왼쪽');
      break;
    case 'right':
      console.log('이동: 오른쪽');
      break;
    default:
      const _exhaustive: never = direction;
      return _exhaustive;
  }
}

// 새로운 케이스 추가 시 컴파일 에러
// type NewDirection = Direction | 'diagonal';
// move('diagonal');  // Error

// 2-3. 유틸리티 타입에서 never
type RemoveFields<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K]
};

// ============================================
// 3. Unknown vs Any 비교
// ============================================

function processAny(value: any) {
  return value.toString();  // 항상 OK (위험)
}

function processUnknown(value: unknown) {
  // return value.toString();  // Error: 타입 확인 필요
  if (typeof value === 'string') {
    return value.toString();  // OK
  }
  return 'default';
}

console.log('Unknown/Never 예시 완료');`}
        />

        <InfoCard type="tip" title="Unknown vs Any">
          <p>
            <strong>unknown</strong> 은 타입 안전성을 유지하며,
            <strong>any</strong> 는 타입 검사를 우회합니다.
            <br />
            항상 <code>unknown</code> 을 선호하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Enum:</strong> 이름 있는 상수 집합 (String Enum 권장)
          </li>
          <li>
            <strong>Tuple:</strong> 고정 길이 + 특정 타입 배열
          </li>
          <li>
            <strong>Type Assertion:</strong> <code>as Type</code> (권장), <code>&lt;Type&gt;</code>
          </li>
          <li>
            <strong>as const:</strong> 리터럴 타입 고정, readonly
          </li>
          <li>
            <strong>tsconfig:</strong> <code>strict: true</code> 권장
          </li>
          <li>
            <strong>unknown:</strong> 안전한 any, 타입 확인 필요
          </li>
          <li>
            <strong>never:</strong> 절대 발생하지 않음, exhaustiveness checking
          </li>
        </ul>
      </section>
    </div>
  );
}