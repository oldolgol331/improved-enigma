import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TSInterface() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>TypeScript 인터페이스</h1>
        <p className="page-description">인터페이스의 정의와 활용법에 대해 학습합니다.</p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>인터페이스 (Interface)</strong> 는 객체의 모양 (shape) 을 정의하는 타입입니다.
          클래스 구현의 계약, API 응답 타입 정의 등에 널리 사용됩니다.
        </p>

        <InfoCard type="tip" title="Interface vs Type Alias">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>Interface</strong>: 객체 지향, 선언 병합 가능, 클래스 구현
            </li>
            <li>
              <strong>Type Alias</strong>: 유니온/교차 타입, 맵드 타입, 더 유연
            </li>
            <li>대부분의 경우互换 가능 - 일관성 있게 사용!</li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="basic">1️⃣ 인터페이스 기본</h2>
        <p>인터페이스를 정의하고 사용하는 기본 방법입니다.</p>

        <CodeDemo
          title="인터페이스 기본"
          description="인터페이스 정의와 사용법입니다."
          defaultCode={`// 인터페이스 정의
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // 선택적 속성
  readonly createdAt: Date;  // 읽기 전용
}

// 인터페이스 구현
const user: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 25,
  createdAt: new Date()
};

console.log('user:', user);
// user.createdAt = new Date(); // 에러! readonly

// 함수 매개변수로 사용
function printUser(user: User) {
  console.log(\`\${user.name} (\${user.email})\`);
}

printUser(user);

// 인터페이스 확장
interface Employee extends User {
  employeeId: string;
  department: string;
  manager?: Employee;  // 자기 참조
}

const employee: Employee = {
  id: 2,
  name: 'Bob',
  email: 'bob@example.com',
  createdAt: new Date(),
  employeeId: 'EMP001',
  department: 'Engineering'
};

console.log('employee:', employee);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="function-type">2️⃣ 함수 타입 인터페이스</h2>
        <p>인터페이스로 함수의 시그니처를 정의할 수 있습니다.</p>

        <CodeDemo
          title="함수 타입 인터페이스"
          description="함수의 매개변수와 반환 타입을 정의합니다."
          defaultCode={`// 함수 시그니처 인터페이스
interface MathFunc {
  (a: number, b: number): number;
}

const add: MathFunc = (a, b) => a + b;
const multiply: MathFunc = (a, b) => a * b;

console.log('add(2, 3):', add(2, 3));
console.log('multiply(2, 3):', multiply(2, 3));

// 제네릭 함수 인터페이스
interface IdentityFunc {
  <T>(arg: T): T;
}

const identity: IdentityFunc = <T>(arg: T): T => arg;

console.log('identity(42):', identity(42));
console.log('identity("Hello"):', identity('Hello'));

// 콜백 함수 인터페이스
interface EventHandler {
  (event: { type: string; target: any }): void;
}

function addHandler(handler: EventHandler) {
  handler({ type: 'click', target: null });
}

addHandler((event) => {
  console.log('Event:', event.type);
});

// 오버로드 (overload) 인터페이스
interface OverloadedFunc {
  (value: string): string;
  (value: number): number;
  (value: string | number): string | number;
}

const overloaded: OverloadedFunc = (value: string | number) => {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value * 2;
};

console.log('overloaded("hello"):', overloaded('hello'));
console.log('overloaded(5):', overloaded(5));`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="class-implementation">3️⃣ 클래스 구현</h2>
        <p>인터페이스를 구현하는 클래스를 만들 수 있습니다.</p>

        <InfoCard type="note" title="클래스와 인터페이스">
          <p>
            클래스는 인터페이스를 <code>implements</code> 하여 정의된 속성과 메서드를 반드시
            구현해야 합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="클래스 구현"
          description="인터페이스를 구현하는 클래스입니다."
          defaultCode={`// 인터페이스 정의
interface Animal {
  name: string;
  age: number;
  
  move(distance: number): void;
  speak(): string;
}

// 클래스 구현
class Dog implements Animal {
  name: string;
  age: number;
  breed: string;  // 추가 속성 가능
  
  constructor(name: string, age: number, breed: string) {
    this.name = name;
    this.age = age;
    this.breed = breed;
  }
  
  move(distance: number): void {
    console.log(\`\${this.name} runs \${distance}m\`);
  }
  
  speak(): string {
    return \`\${this.name} says: Woof!\`;
  }
}

const dog = new Dog('Buddy', 3, 'Golden Retriever');
console.log('dog.speak():', dog.speak());
dog.move(10);

// 추상 클래스와 인터페이스
interface Flyable {
  fly(): void;
}

class Bird implements Animal, Flyable {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  move(distance: number): void {
    console.log(\`\${this.name} moves \${distance}m\`);
  }
  
  speak(): string {
    return \`\${this.name} chirps\`;
  }
  
  fly(): void {
    console.log(\`\${this.name} is flying!\`);
  }
}

const bird = new Bird('Tweety', 1);
bird.speak();
bird.fly();`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="index-signature">4️⃣ 인덱스 시그니처</h2>
        <p>객체가 어떤 키로 접근될 수 있는지 정의합니다.</p>

        <CodeDemo
          title="인덱스 시그니처"
          description="동적 키를 가진 객체 타입입니다."
          defaultCode={`// 문자열 인덱스 시그니처
interface StringMap {
  [key: string]: string;
}

const stringMap: StringMap = {
  name: 'Alice',
  city: 'Seoul'
};

console.log('stringMap:', stringMap);
console.log('stringMap["name"]:', stringMap['name']);

// 숫자 인덱스 시그니처
interface NumberMap {
  [key: number]: string;
}

const numberMap: NumberMap = {
  0: 'zero',
  1: 'one',
  2: 'two'
};

console.log('numberMap:', numberMap);

// 혼합 인덱스 (readonly)
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

const myArray: ReadonlyStringArray = ['A', 'B', 'C'];
// myArray[0] = 'X'; // 에러! readonly

// 실전 예시: CSS 스타일
interface CSSStyles {
  [property: string]: string | number | undefined;
}

const styles: CSSStyles = {
  color: 'red',
  fontSize: 16,
  margin: '10px',
  padding: undefined
};

console.log('styles:', styles);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="declaration-merging">5️⃣ 선언 병합 (Declaration Merging)</h2>
        <p>같은 이름의 인터페이스를 여러 번 선언하면 자동으로 병합됩니다.</p>

        <InfoCard type="tip" title="선언 병합 활용">
          <p>
            라이브러리 타입 확장, 모듈 증강 등에 사용됩니다.
            <br />
            단, 의도치 않은 병합을 주의하세요!
          </p>
        </InfoCard>

        <CodeDemo
          title="선언 병합"
          description="같은 이름의 인터페이스가 병합됩니다."
          defaultCode={`// 첫 번째 선언
interface Box {
  height: number;
  width: number;
}

// 두 번째 선언 (자동 병합)
interface Box {
  scale: number;
  color?: string;
}

// 병합된 결과 사용
const box: Box = {
  height: 10,
  width: 20,
  scale: 1.5,
  color: 'red'
};

console.log('box:', box);

// 메서드도 병합됨
interface Box {
  calculateVolume(): number;
}

const boxWithMethod: Box = {
  height: 10,
  width: 20,
  scale: 1.5,
  calculateVolume() {
    return this.height * this.width * this.scale;
  }
};

console.log('volume:', boxWithMethod.calculateVolume());

// 실전 예시: 전역 인터페이스 확장
interface Window {
  myCustomProperty?: string;
}

// 이제 window 에 myCustomProperty 추가 가능
(window as any).myCustomProperty = 'test';
console.log('window.myCustomProperty:', (window as any).myCustomProperty);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>인터페이스: 객체의 모양 (shape) 정의</li>
            <li>
              선택적 속성: <code>prop?: type</code>, 읽기 전용: <code>readonly</code>
            </li>
            <li>
              확장: <code>interface Child extends Parent</code>
            </li>
            <li>함수 타입: 매개변수와 반환 타입 정의</li>
            <li>
              클래스 구현: <code>class implements Interface</code>
            </li>
            <li>
              인덱스 시그니처: <code>[key: string]: type</code>
            </li>
            <li>선언 병합: 같은 이름 인터페이스 자동 병합</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
