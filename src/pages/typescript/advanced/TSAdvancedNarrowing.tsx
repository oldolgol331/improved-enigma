import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TypeScriptAdvancedNarrowing() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>TypeScript 고급 Narrowing</h1>
        <p className="page-description">
          Type Guards, Assertion Functions, Discriminated Unions 등 고급 타입 Narrowing 기법을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="type-guards">1️⃣ Type Guards</h2>
        <p>
          타입 가드는 런타임에 타입을 검사하여 타입스크립트에게 특정 범위 내에서 타입을 보장합니다.
        </p>

        <CodeDemo
          title="Type Guards"
          description="typeof, instanceof, in, 사용자 정의 가드"
          defaultCode={`// 1. typeof 가드
function printId(id: number | string) {
  if (typeof id === 'string') {
    // 여기서 id 는 string
    console.log(id.toUpperCase());
  } else {
    // 여기서 id 는 number
    console.log(id.toFixed(2));
  }
}

// 2. instanceof 가드
class Dog {
  bark() { console.log('멍멍!'); }
}

class Cat {
  meow() { console.log('야옹!'); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// 3. in 가드 (속성 존재 확인)
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim();
  } else {
    return animal.fly();
  }
}

// 4. 사용자 정의 타입 가드
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function handlePet(pet: Fish | Bird) {
  if (isFish(pet)) {
    // 여기서 pet 은 Fish 타입
    pet.swim();
  } else {
    // 여기서 pet 은 Bird 타입
    pet.fly();
  }
}

console.log('Type Guards 완료');`}
        />

        <InfoCard type="tip" title="타입 가드 종류">
          <ul>
            <li>
              <strong>typeof:</strong> 원시 타입 확인 (string, number, boolean)
            </li>
            <li>
              <strong>instanceof:</strong> 클래스 인스턴스 확인
            </li>
            <li>
              <strong>in:</strong> 속성 존재 확인
            </li>
            <li>
              <strong>사용자 정의:</strong> <code>pet is Fish</code> 형식
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="assertion-functions">2️⃣ Assertion Functions</h2>
        <p>
          어설션 함수는 조건이 참임을 타입시스템에 알립니다.
        </p>

        <CodeDemo
          title="Assertion Functions"
          description="assert 키워드 사용"
          defaultCode={`// 1. 기본 어설션
function assertIsDefined<T>(value: T | null | undefined): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error('Value is null or undefined');
  }
}

// 사용 예시
function processValue(value: string | null) {
  assertIsDefined(value);
  // 여기서 value 는 string 타입
  console.log(value.toUpperCase());
}

// 2. 속성 확인 어설션
function assertHasName(obj: any, propName: string): asserts obj is { [key: string]: any } {
  if (!(propName in obj)) {
    throw new Error(\`Object missing property: \${propName}\`);
  }
}

// 3. 배열 필터링과 함께 사용
function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

const items: (string | null)[] = ['a', null, 'b', null, 'c'];
const validItems = items.filter(isNotNull);
// validItems 는 string[] 타입

// 4. 타입 단언 vs 어설션
// 타입 단언 (as): 개발자가 타입을 지정
const value1: unknown = 'hello';
const str1 = value1 as string;

// 어설션: 런타임 체크 포함
function assertString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Not a string');
  }
}

const value2: unknown = 'hello';
assertString(value2);
// 이제 value2 는 string

console.log('Assertion Functions 완료');`}
        />

        <InfoCard type="warning" title="어설션 사용 시 주의">
          <ul>
            <li>
              <strong>런타임 에러:</strong> 조건 실패 시 예외 발생
            </li>
            <li>
              <strong>성능:</strong> 런타임 체크 오버헤드
            </li>
            <li>
              <strong>타입 단언 vs 어설션:</strong> 단언은 체크 없음, 어설션은 체크 있음
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="discriminated-unions">3️⃣ Discriminated Unions 심화</h2>
        <p>
          태그된 유니온과 exhaustiveness checking 을 활용합니다.
        </p>

        <CodeDemo
          title="Discriminated Unions"
          description="태그 필드와 exhaustiveness checking"
          defaultCode={`// 1. 기본 Discriminated Union
type APIResponse<T> =
  | { status: 'idle' }
  | { status: 'loading'; progress?: number }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function handleResponse(response: APIResponse<string>) {
  switch (response.status) {
    case 'idle':
      return '대기 중';
    case 'loading':
      return \`로딩 중... \${response.progress ?? 0}%\`;
    case 'success':
      return \`성공: \${response.data}\`;
    case 'error':
      return \`에러: \${response.error.message}\`;
    default:
      // 모든 케이스 처리 시 unreachable
      const _exhaustive: never = response;
      return _exhaustive;
  }
}

// 2. 함수 시그니처 유니온
type FunctionResult =
  | { success: true; value: number }
  | { success: false; error: string };

function parseNumber(input: string): FunctionResult {
  const parsed = Number(input);
  if (isNaN(parsed)) {
    return { success: false, error: 'Invalid number' };
  }
  return { success: true, value: parsed };
}

// 3. 결과 처리
const result = parseNumber('42');
if (result.success) {
  console.log(result.value);  // number 타입
} else {
  console.log(result.error);  // string 타입
}

// 4. 중첩 Discriminated Union
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'rectangle'; width: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.side ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

console.log('Discriminated Unions 완료');`}
        />

        <InfoCard type="tip" title="Exhaustiveness Checking">
          <ul>
            <li>
              <strong>never 타입:</strong> 모든 케이스 처리 확인
            </li>
            <li>
              <strong>컴파일 타임:</strong> 누락된 케이스 감지
            </li>
            <li>
              <strong>유지보수:</strong> 새 케이스 추가 시 자동 에러
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="const-assertions">4️⃣ const Assertions</h2>
        <p>
          <code>as const</code> 는 리터럴 타입을 추론합니다.
        </p>

        <CodeDemo
          title="Const Assertions"
          description="리터럴 타입 추론"
          defaultCode={`// 1. 기본 as const
const colors = ['red', 'green', 'blue'] as const;
// 타입: readonly ['red', 'green', 'blue']

// 2. 객체에서 사용
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retry: true
} as const;
// 타입: { readonly apiUrl: "https://api.example.com"; ... }

// 3. 액션 타입 생성
const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET'
} as const;

type ActionType = typeof ActionTypes[keyof typeof ActionTypes];
// 타입: "INCREMENT" | "DECREMENT" | "RESET"

// 4. 유틸리티 함수
function createTuple<T extends readonly unknown[]>(...args: T): T {
  return args;
}

const tuple = createTuple(1, 'hello', true);
// 타입: [number, string, boolean]

// 5. 함수 반환 타입
function getPoint() {
  return { x: 0, y: 0 } as const;
}
// 반환 타입: { readonly x: 0; readonly y: 0; }

console.log('Const Assertions 완료');`}
        />

        <InfoCard type="tip" title="as const 활용">
          <ul>
            <li>
              <strong>불변성:</strong> readonly 속성 추가
            </li>
            <li>
              <strong>리터럴 타입:</strong> 넓은 타입 → 리터럴 타입
            </li>
            <li>
              <strong>액션 타입:</strong> Redux 스타일 액션
            </li>
            <li>
              <strong>설정 객체:</strong> 값 변경 방지
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="satisfies">5️⃣ satisfies 연산자</h2>
        <p>
          TypeScript 4.9 에서 추가된 <code>satisfies</code> 연산자는 타입 호환성을 검사합니다.
        </p>

        <CodeDemo
          title="Satisfies 연산자"
          description="타입 호환성 검사"
          defaultCode={`// 1. 기본 satisfies
type Colors = 'red' | 'green' | 'blue';

const palette: Record<string, Colors> = {
  primary: 'red',
  secondary: 'green',
  accent: 'blue'
};

// satisfies 사용 (TS 4.9+)
const palette2 = {
  primary: 'red',
  secondary: 'green',
  accent: 'blue'
} satisfies Record<string, Colors>;

// 2. 타입 유지
// palette2.primary 는 'red' 리터럴 타입
// palette.primary 는 Colors 유니온 타입

// 3. 객체 속성 접근
palette2.primary.toUpperCase();  // OK
// palette.primary.toUpperCase();  // 에러 (Colors 는 toUpperCase 없음)

// 4. 중첩 객체
type Theme = {
  colors: {
    primary: string;
    secondary: string;
  };
  spacing: {
    small: number;
    large: number;
  };
};

const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#10b981'
  },
  spacing: {
    small: 8,
    large: 16
  }
} satisfies Theme;

// 5. satisfies vs as
const wrong = {
  primary: 'red',
  invalid: 'yellow'  // 에러: yellow 는 Colors 아님
} satisfies Record<string, Colors>;

console.log('Satisfies 완료');`}
        />

        <InfoCard type="tip" title="satisfies vs as">
          <ul>
            <li>
              <strong>satisfies:</strong> 타입 검사만, 원래 타입 유지
            </li>
            <li>
              <strong>as:</strong> 타입 단언, 타입 변경
            </li>
            <li>
              <strong>안전성:</strong> satisfies 가 더 안전
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Type Guards:</strong> typeof, instanceof, in, 사용자 정의
          </li>
          <li>
            <strong>Assertion Functions:</strong> asserts 키워드, 런타임 체크
          </li>
          <li>
            <strong>Discriminated Unions:</strong> 태그 필드, exhaustiveness checking
          </li>
          <li>
            <strong>Const Assertions:</strong> as const, 리터럴 타입 추론
          </li>
          <li>
            <strong>Satisfies:</strong> 타입 호환성 검사, 원래 타입 유지
          </li>
        </ul>
      </section>
    </div>
  );
}
