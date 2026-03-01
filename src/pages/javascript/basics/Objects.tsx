import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function Objects() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>객체 (Objects)</h1>
        <p className="page-description">
          JavaScript 객체의 생성, 접근, 그리고 다양한 조작 방법에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          객체는 키 - 값 쌍으로 데이터를 저장하는 데이터 구조입니다. JavaScript 에서 객체는
          <strong>참조 타입</strong>이며, 거의 모든 것의 기초가 됩니다 (배열, 함수 포함).
        </p>
      </section>

      <section className="content-section">
        <h2 id="creation">1️⃣ 객체 생성</h2>
        <p>객체 리터럴 또는 Object 생성자를 사용해 객체를 만들 수 있습니다.</p>

        <CodeDemo
          title="객체 생성"
          description="다양한 객체 생성 방법을 확인해보세요."
          defaultCode={`// 객체 리터럴 (권장)
const person = {
  name: 'Alice',
  age: 25,
  city: 'Seoul',
  isStudent: false,
  hobbies: ['reading', 'gaming'],
  address: {
    zip: '12345',
    street: 'Main St'
  },
  greet: function() {
    console.log('Hello!');
  }
};

console.log('person:', person);
console.log('person.name:', person.name);
console.log('person.hobbies:', person.hobbies);
console.log('person.address.zip:', person.address.zip);

// Object 생성자 (비권장)
const obj = new Object();
obj.name = 'Bob';
console.log('obj:', obj);

// Object.create (프로토타입 지정)
const proto = { species: 'Human' };
const human = Object.create(proto);
human.name = 'Charlie';
console.log('human:', human);
console.log('human.species:', human.species); // 프로토타입에서 찾음`}
        />
      </section>

      <section className="content-section">
        <h2 id="access">2️⃣ 객체 접근</h2>
        <p>마침표 표기법과 대괄호 표기법으로 속성에 접근할 수 있습니다.</p>

        <InfoCard type="tip" title="표기법 선택">
          <p>
            <strong>마침표 표기법</strong>: 키가 유효한 식별자일 때 (권장)
            <br />
            <strong>대괄호 표기법</strong>: 키가 동적이거나 특수문자가 포함될 때
          </p>
        </InfoCard>

        <CodeDemo
          title="객체 접근"
          description="두 가지 접근 방법을 비교해보세요."
          defaultCode={`const person = {
  name: 'Alice',
  age: 25,
  'favorite color': 'blue', // 특수문자 포함
  123: 'number key'
};

// 마침표 표기법 (권장)
console.log('person.name:', person.name); // Alice
console.log('person.age:', person.age); // 25

// 대괄호 표기법
console.log('person["age"]:', person["age"]); // 25
console.log('person["favorite color"]:', person['favorite color']); // blue
console.log('person[123]:', person[123]); // number key

// 동적 키 접근
const key = 'name';
console.log('person[key]:', person[key]); // Alice

// 존재하지 않는 속성
console.log('person.email:', person.email); // undefined

// 옵셔널 체이닝 (ES2020)
console.log('person.address?.city:', person.address?.city); // undefined (오류 없음)

// 속성 확인
console.log('name in person:', 'name' in person); // true
console.log('person.hasOwnProperty("name"):', person.hasOwnProperty('name')); // true`}
        />
      </section>

      <section className="content-section">
        <h2 id="modification">3️⃣ 객체 수정</h2>
        <p>속성 추가, 수정, 삭제를 수행할 수 있습니다.</p>

        <CodeDemo
          title="객체 수정"
          description="속성 추가, 수정, 삭제 방법입니다."
          defaultCode={`const person = {
  name: 'Alice',
  age: 25
};

// 속성 추가
person.city = 'Seoul';
console.log('after add city:', person);

// 속성 수정
person.age = 26;
console.log('after update age:', person);

// 속성 삭제
delete person.city;
console.log('after delete city:', person);

// 대괄호 표기법으로 추가
person['email'] = 'alice@example.com';
console.log('after add email:', person);

// 객체 복사 (얕은 복사)
const copy = { ...person };
console.log('copy:', copy);

// Object.assign 으로 복사
const copy2 = Object.assign({}, person);
console.log('copy2:', copy2);

// 깊은 복사 (JSON 활용 - 주의점 있음)
const deepCopy = JSON.parse(JSON.stringify(person));
console.log('deepCopy:', deepCopy);

// structuredClone (ES2022, 깊은 복사 권장)
const deepCopy2 = structuredClone(person);
console.log('deepCopy2:', deepCopy2);`}
        />
      </section>

      <section className="content-section">
        <h2 id="destructuring">4️⃣ 객체 구조 분해</h2>
        <p>객체의 속성을 개별 변수로 쉽게 추출할 수 있습니다.</p>

        <CodeDemo
          title="객체 구조 분해"
          description="객체에서 값을 추출하는 현대적인 방법입니다."
          defaultCode={`const person = {
  name: 'Alice',
  age: 25,
  city: 'Seoul',
  country: 'Korea'
};

// 기본 구조 분해
const { name, age, city } = person;
console.log(name, age, city); // Alice 25 Seoul

// 변수명 변경
const { name: userName, age: userAge } = person;
console.log(userName, userAge); // Alice 25

// 기본값
const { email = 'not provided' } = person;
console.log('email:', email); // not provided

// 나머지 연산자
const { name: n, ...rest } = person;
console.log('name:', n); // Alice
console.log('rest:', rest); // { age: 25, city: 'Seoul', country: 'Korea' }

// 중첩 구조 분해
const user = {
  name: 'Bob',
  address: {
    city: 'Busan',
    zip: '67890'
  }
};
const { address: { city: c } } = user;
console.log('city:', c); // Busan

// 함수 매개변수에서 구조 분해
function greet({ name, age }) {
  console.log(\`Hello, \${name}! You are \${age}.\`);
}
greet(person); // Hello, Alice! You are 25.`}
        />
      </section>

      <section className="content-section">
        <h2 id="spread">5️⃣ Spread 연산자</h2>
        <p>
          객체를 병합하거나 복사할 때 사용합니다. <strong>얕은 복사 (shallow copy)</strong> 를
          수행합니다.
        </p>

        <CodeDemo
          title="Spread 연산자"
          description="객체 병합과 복사입니다."
          defaultCode={`const person = {
  name: 'Alice',
  age: 25
};

// 객체 복사
const copy = { ...person };
console.log('copy:', copy);

// 객체 병합
const info = {
  city: 'Seoul',
  country: 'Korea'
};
const merged = { ...person, ...info };
console.log('merged:', merged);

// 속성 덮어쓰기
const updated = { ...person, age: 26 };
console.log('updated:', updated);

// 순서 중요 (나중이 우선)
const orderMatters = {
  ...info,
  ...person,
  age: 30
};
console.log('orderMatters:', orderMatters);

// 중첩 객체 주의 (얕은 복사)
const original = {
  name: 'Alice',
  address: {
    city: 'Seoul'
  }
};
const shallowCopy = { ...original };
shallowCopy.address.city = 'Busan';
console.log('original.address.city:', original.address.city); // Busan (원본도 변경!)
console.log('shallowCopy.address.city:', shallowCopy.address.city); // Busan`}
        />
      </section>

      <section className="content-section">
        <h2 id="methods">6️⃣ 객체 메서드</h2>
        <p>객체의 키, 값, 엔트리를 다루는 메서드들입니다.</p>

        <CodeDemo
          title="객체 메서드"
          description="Object 의 유틸리티 메서드들입니다."
          defaultCode={`const person = {
  name: 'Alice',
  age: 25,
  city: 'Seoul'
};

// Object.keys: 키 배열
const keys = Object.keys(person);
console.log('keys:', keys); // ['name', 'age', 'city']

// Object.values: 값 배열
const values = Object.values(person);
console.log('values:', values); // ['Alice', 25, 'Seoul']

// Object.entries: [키, 값] 쌍 배열
const entries = Object.entries(person);
console.log('entries:', entries);
// [['name', 'Alice'], ['age', 25], ['city', 'Seoul']]

// entries 로 순회
for (const [key, value] of Object.entries(person)) {
  console.log(\`\${key}: \${value}\`);
}

// Object.fromEntries: [키, 값] 배열 → 객체
const objFromEntries = Object.fromEntries(entries);
console.log('objFromEntries:', objFromEntries);

// Object.assign: 객체 병합
const merged = Object.assign({}, person, { email: 'alice@example.com' });
console.log('merged:', merged);

// hasOwnProperty: 자체 속성 확인
console.log('person.hasOwnProperty("name"):', person.hasOwnProperty('name')); // true`}
        />
      </section>

      <section className="content-section">
        <h2 id="this">7️⃣ this 키워드</h2>
        <p>
          메서드 내부의 <code>this</code> 는 해당 객체를 가리킵니다.
        </p>

        <InfoCard type="warning" title="this 주의사항">
          <p>
            <strong>일반 함수</strong> 에서 <code>this</code> 는 호출 주체에 따라 달라집니다.
            <br />
            <strong>화살표 함수</strong> 는 <code>this</code> 를 바인딩하지 않아 상위 스코프의{' '}
            <code>this</code> 를 사용합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="this 키워드"
          description="객체 메서드에서의 this 동작입니다."
          defaultCode={`const person = {
  name: 'Alice',
  age: 25,
  
  // 일반 함수 메서드
  greet: function() {
    console.log(\`Hello, I'm \${this.name}\`);
  },
  
  // 화살표 함수 메서드 (this 주의!)
  greetArrow: () => {
    console.log(\`Hello, I'm \${this.name}\`); // this 는 person 이 아님!
  },
  
  // 메서드 내에서 this 사용
  getIntro: function() {
    return \`My name is \${this.name}, I'm \${this.age}.\`;
  }
};

person.greet(); // Hello, I'm Alice
person.greetArrow(); // Hello, I'm undefined (this 가 window/global)
console.log(person.getIntro()); // My name is Alice, I'm 25.

// this 바인딩 문제 해결 (화살표 함수 사용 시)
const person2 = {
  name: 'Bob',
  hobbies: ['reading', 'gaming'],
  
  // 화살표 함수로 this 고정
  printHobbies: function() {
    this.hobbies.forEach(hobby => {
      console.log(\`\${this.name}: \${hobby}\`); // this 가 person2 를 가리킴
    });
  }
};

person2.printHobbies();
// Bob: reading
// Bob: gaming`}
        />
      </section>

      <section className="content-section">
        <h2 id="serialization">8️⃣ 객체 직렬화</h2>
        <p>객체를 JSON 문자열로 변환하거나, JSON 문자열을 객체로 파싱할 수 있습니다.</p>

        <CodeDemo
          title="객체 직렬화"
          description="JSON 변환과 주의사항입니다."
          defaultCode={`const person = {
  name: 'Alice',
  age: 25,
  city: 'Seoul'
};

// 객체 → JSON 문자열
const jsonString = JSON.stringify(person);
console.log('stringify:', jsonString);
// {"name":"Alice","age":25,"city":"Seoul"}

// JSON 문자열 → 객체
const parsed = JSON.parse(jsonString);
console.log('parse:', parsed);

// pretty print
const pretty = JSON.stringify(person, null, 2);
console.log('pretty:\\n', pretty);

// 주의사항: 함수, undefined, Symbol 은 무시됨
const objWithFunc = {
  name: 'Bob',
  greet: function() { console.log('Hi'); },
  value: undefined,
  id: Symbol('id')
};
console.log('stringify with func:', JSON.stringify(objWithFunc));
// {"name":"Bob"} (함수, undefined, Symbol 제거)

// Date 는 문자열로 변환
const withDate = {
  name: 'Charlie',
  createdAt: new Date()
};
console.log('with date:', JSON.stringify(withDate));`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              객체 생성: 리터럴 <code>{`{ key: value }`}</code> 권장
            </li>
            <li>
              접근: 마침표 (<code>obj.key</code>) 또는 대괄호 (<code>obj['key']</code>)
            </li>
            <li>
              구조 분해: <code>{`{ name, age }`}</code> 로 속성 추출
            </li>
            <li>
              Spread: <code>{`{ ...obj }`}</code> 로 복사/병합 (얕은 복사)
            </li>
            <li>
              메서드: <code>Object.keys</code>, <code>Object.values</code>,{' '}
              <code>Object.entries</code>
            </li>
            <li>
              <code>this</code>: 메서드 내에서 객체 자신을 참조 (화살표 함수 주의!)
            </li>
            <li>
              직렬화: <code>JSON.stringify</code>, <code>JSON.parse</code>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
