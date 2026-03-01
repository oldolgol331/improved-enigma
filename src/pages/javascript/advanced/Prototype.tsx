import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function Prototype() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>프로토타입 (Prototype)</h1>
        <p className="page-description">
          JavaScript 의 프로토타입 기반 상속 시스템에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          JavaScript 는 <strong>프로토타입 기반 (Prototype-based)</strong> 언어입니다. 클래스 기반
          상속과 달리, 객체가 직접 다른 객체를 프로토타입으로 상속받습니다.
        </p>

        <InfoCard type="tip" title="프로토타입 체인">
          <p>
            모든 JavaScript 객체는 <code>null</code> 을 프로토타입 체인의 끝으로 하는 프로토타입
            체인을 가지고 있습니다. 속성을 찾을 때 체인을 따라 위로 올라가며 검색합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="prototype-basics">1️⃣ 프로토타입 기본</h2>
        <p>
          모든 함수는 <code>prototype</code> 속성을 가지며, 객체는 <code>__proto__</code> 로
          프로토타입에 접근할 수 있습니다.
        </p>

        <CodeDemo
          title="프로토타입 기본"
          description="프로토타입의 기본 구조를 확인해보세요."
          defaultCode={`// 함수와 프로토타입
function Person(name) {
  this.name = name;
}

// 프로토타입에 메서드 추가
Person.prototype.sayHello = function() {
  console.log(\`Hello, I'm \${this.name}\`);
};

const alice = new Person('Alice');
const bob = new Person('Bob');

alice.sayHello(); // Hello, I'm Alice
bob.sayHello(); // Hello, I'm Bob

// 프로토타입 확인
console.log('alice.__proto__ === Person.prototype:', 
  alice.__proto__ === Person.prototype); // true

console.log('Person.prototype.constructor === Person:', 
  Person.prototype.constructor === Person); // true

// 프로토타입 체인
console.log('alice.__proto__.__proto__ === Object.prototype:', 
  alice.__proto__.__proto__ === Object.prototype); // true

console.log('Object.prototype.__proto__ === null:', 
  Object.prototype.__proto__ === null); // true`}
        />
      </section>

      <section className="content-section">
        <h2 id="prototype-chain">2️⃣ 프로토타입 체인</h2>
        <p>
          속성을 찾을 때 JavaScript 는 먼저 객체 자체를 검색하고, 없으면 프로토타입 체인을 따라
          올라갑니다.
        </p>

        <CodeDemo
          title="프로토타입 체인"
          description="속성 검색이 프로토타입 체인을 따라 이루어집니다."
          defaultCode={`// 프로토타입 체인 예제
const obj = {
  ownProp: 'I am own property'
};

// Object.prototype 에 정의된 메서드들
console.log('obj.toString():', obj.toString());
console.log('obj.hasOwnProperty("ownProp"):', obj.hasOwnProperty('ownProp'));

// 프로토타입 체인 확인
console.log('obj.__proto__ === Object.prototype:', 
  obj.__proto__ === Object.prototype); // true

// 배열의 프로토타입 체인
const arr = [1, 2, 3];
console.log('arr.__proto__ === Array.prototype:', 
  arr.__proto__ === Array.prototype); // true

console.log('Array.prototype.__proto__ === Object.prototype:', 
  Array.prototype.__proto__ === Object.prototype); // true

// map 메서드는 Array.prototype 에 있음
console.log('arr.map === Array.prototype.map:', 
  arr.map === Array.prototype.map); // true

// 프로토타입 확장 (권장하지 않음)
Array.prototype.first = function() {
  return this[0];
};

console.log('[1,2,3].first():', [1, 2, 3].first()); // 1`}
        />
      </section>

      <section className="content-section">
        <h2 id="inheritance">3️⃣ 프로토타입 상속</h2>
        <p>프로토타입 체인을 활용해 상속을 구현할 수 있습니다.</p>

        <InfoCard type="note" title="현대 JavaScript">
          <p>
            현대 JavaScript 에서는 <code>class</code> 문법을 사용합니다. 하지만 클래스도
            내부적으로는 프로토타입을 사용하므로 이해하는 것이 중요합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="프로토타입 상속"
          description="프로토타입을 활용한 상속 구현입니다."
          defaultCode={`// 부모 생성자
function Animal(name) {
  this.name = name;
}

Animal.prototype.sayName = function() {
  console.log(\`My name is \${this.name}\`);
};

// 자식 생성자
function Dog(name, breed) {
  Animal.call(this, name); // 부모 생성자 호출
  this.breed = breed;
}

// 프로토타입 상속
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 자식 메서드 추가
Dog.prototype.sayHello = function() {
  console.log(\`Woof! I'm \${this.name}, a \${this.breed}\`);
};

const dog = new Dog('Buddy', 'Golden Retriever');

dog.sayName(); // My name is Buddy (상속받은 메서드)
dog.sayHello(); // Woof! I'm Buddy, a Golden Retriever

// 프로토타입 체인 확인
console.log('dog instanceof Dog:', dog instanceof Dog); // true
console.log('dog instanceof Animal:', dog instanceof Animal); // true
console.log('dog instanceof Object:', dog instanceof Object); // true

console.log('Dog.prototype.isPrototypeOf(dog):', 
  Dog.prototype.isPrototypeOf(dog)); // true
console.log('Animal.prototype.isPrototypeOf(dog):', 
  Animal.prototype.isPrototypeOf(dog)); // true`}
        />
      </section>

      <section className="content-section">
        <h2 id="object-create">4️⃣ Object.create</h2>
        <p>
          <code>Object.create</code> 는 지정된 프로토타입을 가진 새 객체를 생성합니다.
        </p>

        <CodeDemo
          title="Object.create"
          description="프로토타입을 지정하여 객체 생성입니다."
          defaultCode={`// Object.create 기본
const proto = {
  sayHello: function() {
    console.log(\`Hello, I'm \${this.name}\`);
  }
};

const obj = Object.create(proto);
obj.name = 'Alice';
obj.sayHello(); // Hello, I'm Alice

// 프로토타입 확인
console.log('Object.getPrototypeOf(obj) === proto:', 
  Object.getPrototypeOf(obj) === proto); // true

// null 프로토타입 객체 (맵으로 사용)
const nullProto = Object.create(null);
nullProto.name = 'Test';
console.log('nullProto:', nullProto);

// nullProto.toString(); // 오류! Object.prototype 메서드 없음

// 상속 체인 생성
const grandParent = {
  greet: function() {
    console.log('Hello from grandParent');
  }
};

const parent = Object.create(grandParent);
parent.sayHi = function() {
  console.log('Hi from parent');
};

const child = Object.create(parent);
child.name = 'Child';

child.greet(); // Hello from grandParent (체인 따라 올라감)
child.sayHi(); // Hi from parent
console.log('child.name:', child.name); // Child`}
        />
      </section>

      <section className="content-section">
        <h2 id="new-operator">5️⃣ new 연산자</h2>
        <p>
          <code>new</code> 연산자는 생성자 함수를 호출하여 새로운 객체를 생성합니다.
        </p>

        <InfoCard type="tip" title="new 의 동작">
          <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>빈 객체 생성</li>
            <li>새 객체의 프로토타입을 생성자의 prototype 으로 설정</li>
            <li>
              생성자 함수 실행 (<code>this</code> 는 새 객체)
            </li>
            <li>생성자가 객체를 반환하지 않으면 새 객체 반환</li>
          </ol>
        </InfoCard>

        <CodeDemo
          title="new 연산자"
          description="new 의 내부 동작을 확인해보세요."
          defaultCode={`// 생성자 함수
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function() {
  console.log(\`Hello, I'm \${this.name}\`);
};

// new 연산자 사용
const alice = new Person('Alice', 25);

// new 없이 호출 (this 가 window/global)
// const bob = Person('Bob', 30); // 오류 발생 가능

// new 의 동작을 수동으로 구현
function manualNew(Constructor, ...args) {
  // 1. 빈 객체 생성
  const obj = {};
  
  // 2. 프로토타입 설정
  Object.setPrototypeOf(obj, Constructor.prototype);
  
  // 3. 생성자 실행
  const result = Constructor.apply(obj, args);
  
  // 4. 객체 반환 (생성자가 객체 반환했으면 그거 사용)
  return result || obj;
}

const bob = manualNew(Person, 'Bob', 30);
bob.sayHello(); // Hello, I'm Bob

// new.target (ES6)
function Animal(name) {
  if (!new.target) {
    throw new Error('Must use new with Animal');
  }
  this.name = name;
}

// const invalid = Animal('Test'); // 오류!
const valid = new Animal('Test');
console.log('valid.name:', valid.name);`}
        />
      </section>

      <section className="content-section">
        <h2 id="built-in-prototypes">6️⃣ 내장 프로토타입</h2>
        <p>JavaScript 내장 생성자들의 프로토타입을 확인합니다.</p>

        <CodeDemo
          title="내장 프로토타입"
          description="배열, 문자열, 객체의 프로토타입입니다."
          defaultCode={`// Array.prototype
const arr = [1, 2, 3];
console.log('arr.__proto__ === Array.prototype:', 
  arr.__proto__ === Array.prototype); // true

// Array.prototype 메서드들
console.log('arr.map === Array.prototype.map:', true);
console.log('arr.filter === Array.prototype.filter:', true);

// String.prototype
const str = 'Hello';
console.log('str.__proto__ === String.prototype:', 
  str.__proto__ === String.prototype); // true

console.log('str.toUpperCase === String.prototype.toUpperCase:', true);

// Object.prototype
const obj = {};
console.log('obj.__proto__ === Object.prototype:', 
  obj.__proto__ === Object.prototype); // true

console.log('obj.toString === Object.prototype.toString:', true);

// 프로토타입 메서드 오버라이드 (권장하지 않음)
const originalToString = Object.prototype.toString;
Object.prototype.toString = function() {
  return 'Custom toString';
};
console.log('{}.toString():', {}.toString()); // Custom toString

// 복원
Object.prototype.toString = originalToString;`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              JavaScript 는 <strong>프로토타입 기반</strong> 언어
            </li>
            <li>
              모든 객체는 <code>__proto__</code> 로 프로토타입에 접근
            </li>
            <li>
              함수는 <code>prototype</code> 속성을 가짐
            </li>
            <li>프로토타입 체인: 속성 검색 시 체인을 따라 올라감</li>
            <li>
              <code>Object.create(proto)</code>: 지정된 프로토타입 객체 생성
            </li>
            <li>
              <code>new</code>: 생성자 호출, 빈 객체 생성 → 프로토타입 설정 → 실행 → 반환
            </li>
            <li>
              <code>instanceof</code>: 프로토타입 체인에 특정 객체 있는지 확인
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
