import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ClassSyntax() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>클래스 (Class)</h1>
        <p className="page-description">
          ES6 클래스 문법과 객체지향 프로그래밍 패턴에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          ES6 에서 도입된 <code>class</code> 문법은 프로토타입 기반 상속을 더 깔끔하게 표현하는{' '}
          <strong>문법적 설탕 (Syntactic Sugar)</strong> 입니다. 내부적으로는 여전히 프로토타입을
          사용합니다.
        </p>

        <InfoCard type="tip" title="클래스의 특징">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>클래스 선언은 호이스팅되지 않습니다 (TDZ)</li>
            <li>
              <code>new</code> 없이 호출할 수 없습니다
            </li>
            <li>메서드는 자동으로 프로토타입에 추가됩니다</li>
            <li>
              상속은 <code>extends</code> 키워드로 구현
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="basic">1️⃣ 클래스 기본</h2>
        <p>클래스 선언과 표현식, 그리고 인스턴스 생성 방법을 학습합니다.</p>

        <CodeDemo
          title="클래스 기본"
          description="클래스 선언과 인스턴스 생성입니다."
          defaultCode={`// 클래스 선언
class Person {
  // 생성자
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // 인스턴스 메서드 (프로토타입에 추가됨)
  sayHello() {
    console.log(\`Hello, I'm \${this.name}\`);
  }
  
  sayAge() {
    console.log(\`I'm \${this.age} years old\`);
  }
}

// 인스턴스 생성
const alice = new Person('Alice', 25);
const bob = new Person('Bob', 30);

alice.sayHello(); // Hello, I'm Alice
bob.sayAge(); // I'm 30 years old

// 클래스 표현식
const Animal = class {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(\`\${this.name} makes a sound\`);
  }
};

const dog = new Animal('Dog');
dog.speak(); // Dog makes a sound

// 타입 확인
console.log('typeof Person:', typeof Person); // function
console.log('alice instanceof Person:', alice instanceof Person); // true`}
        />
      </section>

      <section className="content-section">
        <h2 id="methods">2️⃣ 클래스 메서드</h2>
        <p>인스턴스 메서드, 스태틱 메서드, 게터/세터를 정의할 수 있습니다.</p>

        <CodeDemo
          title="클래스 메서드"
          description="다양한 종류의 메서드를 정의해보세요."
          defaultCode={`class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  // 인스턴스 메서드
  getArea() {
    return this.width * this.height;
  }
  
  getPerimeter() {
    return 2 * (this.width + this.height);
  }
  
  // 게터 (getter)
  get isSquare() {
    return this.width === this.height;
  }
  
  // 세터 (setter)
  set dimensions({ width, height }) {
    this.width = width;
    this.height = height;
  }
  
  // 스태틱 메서드 (클래스 레벨)
  static createSquare(size) {
    return new Rectangle(size, size);
  }
  
  static compareAreas(rect1, rect2) {
    return rect1.getArea() - rect2.getArea();
  }
}

// 인스턴스 사용
const rect = new Rectangle(5, 3);
console.log('Area:', rect.getArea()); // 15
console.log('Perimeter:', rect.getPerimeter()); // 16
console.log('Is Square:', rect.isSquare); // false

// 세터 사용
rect.dimensions = { width: 4, height: 4 };
console.log('Is Square after update:', rect.isSquare); // true

// 스태틱 메서드 사용 (인스턴스 없이 호출)
const square = Rectangle.createSquare(5);
console.log('Square area:', square.getArea()); // 25

const rect2 = new Rectangle(3, 4);
console.log('Area difference:', Rectangle.compareAreas(rect, rect2)); // 4

// 스태틱 메서드는 인스턴스에서 호출 불가
// square.createSquare(10); // 오류!`}
        />
      </section>

      <section className="content-section">
        <h2 id="inheritance">3️⃣ 클래스 상속</h2>
        <p>
          <code>extends</code> 키워드로 클래스를 상속할 수 있습니다.
        </p>

        <InfoCard type="warning" title="super 사용">
          <p>
            자식 클래스의 생성자에서는 반드시 <code>super()</code> 를 호출해야 합니다.
            <code>super</code> 는 부모 클래스의 생성자를 호출합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="클래스 상속"
          description="extends 와 super 를 활용한 상속입니다."
          defaultCode={`// 부모 클래스
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(\`\${this.name} makes a sound\`);
  }
  
  getInfo() {
    return \`Animal: \${this.name}\`;
  }
}

// 자식 클래스
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 부모 생성자 호출 (필수!)
    this.breed = breed;
  }
  
  // 메서드 오버라이딩
  speak() {
    console.log(\`\${this.name} barks\`);
  }
  
  // 부모 메서드 호출
  getInfo() {
    return \`\${super.getInfo()}, Breed: \${this.breed}\`;
  }
  
  // 자식 전용 메서드
  fetch() {
    console.log(\`\${this.name} fetches the ball\`);
  }
}

const dog = new Dog('Buddy', 'Golden Retriever');

dog.speak(); // Buddy barks (오버라이딩됨)
dog.fetch(); // Buddy fetches the ball
console.log(dog.getInfo()); // Animal: Buddy, Breed: Golden Retriever

// instanceof 확인
console.log('dog instanceof Dog:', dog instanceof Dog); // true
console.log('dog instanceof Animal:', dog instanceof Animal); // true
console.log('dog instanceof Object:', dog instanceof Object); // true`}
        />
      </section>

      <section className="content-section">
        <h2 id="fields">4️⃣ 클래스 필드</h2>
        <p>클래스 필드 문법을 사용하면 생성자 밖에서도 인스턴스 속성을 정의할 수 있습니다.</p>

        <InfoCard type="note" title="클래스 필드">
          <p>
            클래스 필드는 비교적 새로운 문법입니다.
            <strong>인스턴스 필드</strong> 는 각 인스턴스마다 독립적이며,
            <strong>스타틱 필드</strong> 는 클래스 레벨에서 공유됩니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="클래스 필드"
          description="클래스 필드 문법을 확인해보세요."
          defaultCode={`class Counter {
    // 인스턴스 필드 (각 인스턴스마다 독립적)
    count = 0;
    
    // 프라이빗 필드 (ES2022, # 사용)
    #privateCount = 0;
    
    increment() {
      this.count++;
      this.#privateCount++;
      console.log('count:', this.count);
      console.log('privateCount:', this.#privateCount);
    }
    
    getPrivateCount() {
      return this.#privateCount;
    }
  }
  
  const counter1 = new Counter();
  const counter2 = new Counter();
  
  counter1.increment(); // count: 1, privateCount: 1
  counter2.increment(); // count: 1, privateCount: 1 (독립적)
  
  // 프라이빗 필드는 외부에서 접근 불가
  // console.log(counter1.#privateCount); // 오류!
  
  // 스태틱 필드
  class MathUtils {
    static PI = Math.PI;
    static E = Math.E;
    
    static getPI() {
      return this.PI;
    }
  }
  
  console.log('PI:', MathUtils.PI); // 3.14159...
  console.log('E:', MathUtils.E); // 2.718...`}
        />
      </section>

      <section className="content-section">
        <h2 id="this-binding">5️⃣ this 바인딩</h2>
        <p>
          클래스 메서드에서 <code>this</code> 바인딩은 중요한 문제입니다.
        </p>

        <InfoCard type="warning" title="this 손실 문제">
          <p>
            메서드를 콜백으로 전달할 때 <code>this</code> 가 손실될 수 있습니다. 해결 방법은{' '}
            <strong>화살표 함수</strong>, <strong>bind</strong>,<strong>클래스 필드 문법</strong> 을
            사용하는 것입니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="this 바인딩"
          description="클래스에서 this 바인딩 문제를 해결해보세요."
          defaultCode={`class Button {
  constructor(label) {
    this.label = label;
    this.clickCount = 0;
  }
  
  // 문제: 일반 메서드는 this 손실 발생
  handleClickBad() {
    this.clickCount++;
    console.log(\`\${this.label} clicked \${this.clickCount} times\`);
  }
  
  // 해결 1: 클래스 필드 + 화살표 함수 (권장)
  handleClickGood = () => {
    this.clickCount++;
    console.log(\`\${this.label} clicked \${this.clickCount} times\`);
  };
  
  // 해결 2: 생성자에서 bind
  handleClickBound() {
    this.clickCount++;
    console.log(\`\${this.label} clicked \${this.clickCount} times\`);
  }
  
  init() {
    // bad: this 손실
    // setTimeout(this.handleClickBad, 100);
    
    // good: 화살표 함수 필드
    setTimeout(this.handleClickGood, 100);
    
    // good: bind 사용
    // setTimeout(this.handleClickBound.bind(this), 100);
  }
}

const btn = new Button('Submit');

// 직접 호출은 정상
btn.handleClickBad(); // Submit clicked 1 times

// 콜백으로 전달 시 this 손실
const callback = btn.handleClickBad;
// callback(); // 오류! this 가 undefined

// 화살표 함수 필드는 정상
const goodCallback = btn.handleClickGood;
goodCallback(); // Submit clicked 1 times`}
        />
      </section>

      <section className="content-section">
        <h2 id="abstract">6️⃣ 추상 클래스 패턴</h2>
        <p>JavaScript 는 공식적인 추상 클래스를 지원하지 않지만, 패턴으로 구현할 수 있습니다.</p>

        <CodeDemo
          title="추상 클래스 패턴"
          description="추상 클래스를 모방하는 패턴입니다."
          defaultCode={`// 추상 클래스 패턴
class AbstractAnimal {
  constructor(name) {
    if (this.constructor === AbstractAnimal) {
      throw new Error('Cannot instantiate abstract class');
    }
    this.name = name;
  }
  
  // 추상 메서드 (자식에서 구현 필수)
  speak() {
    throw new Error('Method "speak" must be implemented');
  }
  
  // 일반 메서드
  getInfo() {
    return \`Animal: \${this.name}\`;
  }
}

// 구체 클래스
class Cat extends AbstractAnimal {
  speak() {
    console.log(\`\${this.name} meows\`);
  }
}

class Bird extends AbstractAnimal {
  speak() {
    console.log(\`\${this.name} chirps\`);
  }
}

// 사용
// const animal = new AbstractAnimal('Test'); // 오류!
const cat = new Cat('Kitty');
const bird = new Bird('Tweety');

cat.speak(); // Kitty meows
bird.speak(); // Tweety chirps

console.log(cat.getInfo()); // Animal: Kitty
console.log(bird.getInfo()); // Animal: Tweety`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <code>class</code>: 프로토타입 기반 상속의 문법적 설탕
            </li>
            <li>
              생성자: <code>constructor</code>, <code>new</code> 필수
            </li>
            <li>
              메서드: 인스턴스 메서드, 스태틱 메서드 (<code>static</code>)
            </li>
            <li>
              게터/세터: <code>get</code>, <code>set</code>
            </li>
            <li>
              상속: <code>extends</code>, <code>super</code>
            </li>
            <li>
              클래스 필드: 인스턴스 속성 직접 정의, 프라이빗 필드 (<code>#</code>)
            </li>
            <li>this 바인딩: 화살표 함수 필드 또는 bind 로 해결</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
