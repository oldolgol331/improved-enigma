import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function JSNumbersJSON() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Numbers, Math & JSON</h1>
        <p className="page-description">
          JavaScript 숫자 타입, Math 객체, 그리고 JSON 직렬화에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          JavaScript 는 숫자 처리를 위한 <code>Number</code> 타입과 <code>Math</code> 객체를 제공합니다.
          또한 데이터 교환을 위한 <code>JSON</code> 을 기본적으로 지원합니다.
        </p>

        <InfoCard type="warning" title="JavaScript 숫자의 특징">
          <ul>
            <li>
              <strong>단일 타입:</strong> 정수와 실수 구분 없음 (모두 number)
            </li>
            <li>
              <strong>64 비트 부동소수점:</strong> IEEE 754 표준 준수
            </li>
            <li>
              <strong>정밀도 문제:</strong> 부동소수점 연산 시 주의 필요
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="number-basics">1️⃣ 숫자 생성과 확인</h2>
        <p>
          숫자를 생성하고 타입을 확인하는 방법입니다.
        </p>

        <CodeDemo
          title="숫자 생성과 확인"
          description="Number 타입과 확인 메서드"
          defaultCode={`// 1. 숫자 생성
const int = 42;           // 정수
const float = 3.14;       // 실수
const negative = -10;     // 음수
const hex = 0xFF;         // 16 진수 (255)
const binary = 0b1010;    // 2 진수 (10)
const octal = 0o77;       // 8 진수 (63)

console.log('int:', int);
console.log('float:', float);
console.log('hex:', hex);
console.log('binary:', binary);
console.log('octal:', octal);

// 2. 숫자 리터럴 (구분자, ES2021)
const bigNumber = 1_000_000_000;
console.log('bigNumber:', bigNumber);  // 1000000000

// 3. Number 타입 확인
console.log('typeof 42:', typeof 42);  // 'number'
console.log('typeof 3.14:', typeof 3.14);  // 'number'

// 4. Number.isFinite, Number.isNaN (권장)
console.log('Number.isFinite(42):', Number.isFinite(42));  // true
console.log('Number.isFinite(Infinity):', Number.isFinite(Infinity));  // false
console.log('Number.isNaN(NaN):', Number.isNaN(NaN));  // true
console.log('Number.isNaN(42):', Number.isNaN(42));  // false

// 5. 전역 함수 (레거시, 주의)
console.log('isFinite(42):', isFinite(42));  // true
console.log('isFinite(Infinity):', isFinite(Infinity));  // false
console.log('isNaN(NaN):', isNaN(NaN));  // true
console.log('isNaN("hello"):', isNaN('hello'));  // true (문제를 일으킬 수 있음)

// 6. 정수 확인
console.log('Number.isInteger(42):', Number.isInteger(42));  // true
console.log('Number.isInteger(3.14):', Number.isInteger(3.14));  // false
console.log('Number.isInteger(1e10):', Number.isInteger(1e10));  // true

console.log('숫자 확인 예시 완료');`}
        />

        <InfoCard type="tip" title="isNaN vs Number.isNaN">
          <p>
            <code>isNaN('hello')</code> 는 <code>true</code> 를 반환하지만,
            <code>Number.isNaN('hello')</code> 는 <code>false</code> 를 반환합니다.
            <br />
            항상 <strong>Number.isNaN</strong> 을 사용하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="number-methods">2️⃣ Number 메서드</h2>
        <p>
          Number 객체의 다양한 메서드를 활용합니다.
        </p>

        <CodeDemo
          title="Number 메서드 활용"
          description="변환, 반올림, 소수점 처리"
          defaultCode={`// 1. toString - 진법 변환
const num = 255;
console.log('num.toString():', num.toString());  // '255'
console.log('num.toString(2):', num.toString(2));  // '11111111' (2 진수)
console.log('num.toString(8):', num.toString(8));  // '377' (8 진수)
console.log('num.toString(16):', num.toString(16));  // 'ff' (16 진수)

// 2. toFixed - 소수점 이하 자리수 고정
const price = 1234.567;
console.log('price.toFixed(2):', price.toFixed(2));  // '1234.57' (문자열)
console.log('price.toFixed(0):', price.toFixed(0));  // '1235'

// 3. toPrecision - 유효숫자 지정
const big = 12345.6789;
console.log('big.toPrecision(3):', big.toPrecision(3));  // '1.23e+4'
console.log('big.toPrecision(7):', big.toPrecision(7));  // '12345.68'

// 4. toExponential - 지수 표기법
console.log('big.toExponential():', big.toExponential());  // '1.23456789e+4'
console.log('big.toExponential(2):', big.toExponential(2));  // '1.23e+4'

// 5. valueOf - 원시 값 반환 (일반적으로 숫자 자체)
console.log('num.valueOf():', num.valueOf());  // 255

// 6. 실제 활용 - 통화 포맷
function formatCurrency(amount) {
  return Number(amount).toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
}
console.log('통화:', formatCurrency(1234567.89));  // '1,234,567.89'

console.log('Number 메서드 예시 완료');`}
        />
      </section>

      <section className="content-section">
        <h2 id="math">3️⃣ Math 객체</h2>
        <p>
          수학 상수와 함수를 제공합니다.
        </p>

        <CodeDemo
          title="Math 객체 활용"
          description="수학 상수와 함수"
          defaultCode={`// 1. 수학 상수
console.log('Math.PI:', Math.PI);  // 3.141592653589793
console.log('Math.E:', Math.E);  // 2.718281828459045 (자연상수)
console.log('Math.SQRT2:', Math.SQRT2);  // 1.4142135623730951 (√2)

// 2. 반올림, 올림, 내림
console.log('Math.round(3.5):', Math.round(3.5));  // 4
console.log('Math.round(3.4):', Math.round(3.4));  // 3
console.log('Math.ceil(3.1):', Math.ceil(3.1));  // 4
console.log('Math.floor(3.9):', Math.floor(3.9));  // 3

// 3. 절대값
console.log('Math.abs(-5):', Math.abs(-5));  // 5
console.log('Math.abs(5):', Math.abs(5));  // 5

// 4. 제곱, 제곱근
console.log('Math.pow(2, 3):', Math.pow(2, 3));  // 8
console.log('2 ** 3:', 2 ** 3);  // 8 (현대적 문법)
console.log('Math.sqrt(16):', Math.sqrt(16));  // 4

// 5. 최대값, 최소값
console.log('Math.max(1, 5, 3):', Math.max(1, 5, 3));  // 5
console.log('Math.min(1, 5, 3):', Math.min(1, 5, 3));  // 3

// 6. 스프레드와 함께 사용
const numbers = [1, 5, 3, 9, 2];
console.log('Math.max(...numbers):', Math.max(...numbers));  // 9

// 7. 랜덤 (0 이상 1 미만)
console.log('Math.random():', Math.random());

// 8. 랜덤 정수 (범위 내)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log('1~10 랜덤:', randomInt(1, 10));

// 9. 삼각함수 (라디안)
console.log('Math.sin(Math.PI / 2):', Math.sin(Math.PI / 2));  // 1
console.log('Math.cos(0):', Math.cos(0));  // 1

// 10. 실제 활용 - 랜덤 색상 생성
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return \`rgb(\${r}, \${g}, \${b})\`;
}
console.log('랜덤 색상:', randomColor());

console.log('Math 객체 예시 완료');`}
        />

        <InfoCard type="tip" title="Math.random 범위">
          <p>
            <code>Math.random()</code> 은 <strong>0 이상 1 미만</strong>의 값을 반환합니다.
            <br />
            <code>Math.floor(Math.random() * 10)</code> 은 0~9 의 정수를 반환합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="precision">4️⃣ 부동소수점 정밀도</h2>
        <p>
          JavaScript 의 부동소수점 연산에서 발생할 수 있는 정밀도 문제입니다.
        </p>

        <CodeDemo
          title="부동소수점 정밀도 문제"
          description="정밀도 문제와 해결 방법"
          defaultCode={`// 1. 고전적인 문제
console.log('0.1 + 0.2:', 0.1 + 0.2);  // 0.30000000000000004
console.log('0.1 + 0.2 === 0.3:', 0.1 + 0.2 === 0.3);  // false

// 2. 해결 방법 1: toFixed 사용 후 변환
const sum = (0.1 + 0.2).toFixed(2);
console.log('(0.1 + 0.2).toFixed(2):', sum);  // '0.30'
console.log('parseFloat(sum):', parseFloat(sum));  // 0.3

// 3. 해결 방법 2: 정수로 변환 후 계산
console.log('(0.1 * 10 + 0.2 * 10) / 10:', (0.1 * 10 + 0.2 * 10) / 10);  // 0.3

// 4. 해결 방법 3: 라이브러리 사용 (production)
// import Decimal from 'decimal.js';
// const result = new Decimal(0.1).plus(0.2);
// console.log(result.toString());  // '0.3'

// 5. 정밀도 확인
console.log('Number.EPSILON:', Number.EPSILON);  // 2.220446049250313e-16

// 6. EPSILON 을 사용한 비교
function equal(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}
console.log('equal(0.1 + 0.2, 0.3):', equal(0.1 + 0.2, 0.3));  // true

// 7. 큰 수의 한계
console.log('Number.MAX_SAFE_INTEGER:', Number.MAX_SAFE_INTEGER);  // 9007199254740991
console.log('Number.MAX_SAFE_INTEGER + 1:', Number.MAX_SAFE_INTEGER + 1);
console.log('Number.MAX_SAFE_INTEGER + 2:', Number.MAX_SAFE_INTEGER + 2);
// 둘 다 같은 값 (정밀도 손실)

// 8. BigInt (큰 정수용, ES2020)
const bigInt = 9007199254740992n;
console.log('BigInt:', bigInt);
console.log('BigInt + 1n:', bigInt + 1n);

console.log('정밀도 예시 완료');`}
        />

        <InfoCard type="warning" title="금전 계산 주의">
          <p>
            돈 관련 계산은 <strong>정밀도 문제</strong>로 인해 오류가 발생할 수 있습니다.
            <br />
            프로덕션에서는 <code>decimal.js</code>, <code>bignumber.js</code> 같은
            라이브러리를 사용하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="json">5️⃣ JSON 기초</h2>
        <p>
          JSON(JavaScript Object Notation) 은 데이터 교환 형식입니다.
        </p>

        <CodeDemo
          title="JSON 직렬화와 파싱"
          description="JSON.stringify 와 JSON.parse"
          defaultCode={`// 1. JavaScript 객체
const user = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 25,
  active: true,
  hobbies: ['reading', 'coding'],
  address: {
    city: 'NYC',
    zip: '10001'
  },
  sayHi: function() {  // 함수는 JSON 으로 변환 안 됨
    console.log('Hi!');
  }
};

// 2. JSON 문자열로 변환 (직렬화)
const jsonString = JSON.stringify(user);
console.log('JSON 문자열:', jsonString);
// {"id":1,"name":"Alice","email":"alice@example.com","age":25,"active":true,"hobbies":["reading","coding"],"address":{"city":"NYC","zip":"10001"}}

// 3. JSON 파싱 (역직렬화)
const parsed = JSON.parse(jsonString);
console.log('파싱된 객체:', parsed);
console.log('이름:', parsed.name);  // 'Alice'

// 4. 함수와 undefined 는 제외됨
console.log('sayHi 존재:', parsed.sayHi);  // undefined

// 5. pretty print (들여쓰기)
const pretty = JSON.stringify(user, null, 2);
console.log('Pretty JSON:');
console.log(pretty);

// 6. replacer 함수 (특정 속성만 선택)
const filtered = JSON.stringify(user, ['name', 'email'], 2);
console.log('필터링:', filtered);

// 7. replacer 함수 (값 변환)
const transformed = JSON.stringify(user, (key, value) => {
  if (key === 'email') {
    return '***@***.***';  // 마스킹
  }
  if (key === 'age') {
    return value >= 20 ? 'adult' : 'minor';
  }
  return value;
}, 2);
console.log('변환:', transformed);

// 8. 실제 활용 - API 데이터 처리
const apiResponse = '{"status":"success","data":{"id":1,"name":"Product"}}';
try {
  const data = JSON.parse(apiResponse);
  console.log('상태:', data.status);
  console.log('제품:', data.data.name);
} catch (error) {
  console.error('JSON 파싱 에러:', error.message);
}

console.log('JSON 예시 완료');`}
        />

        <InfoCard type="warning" title="JSON 보안 주의">
          <ul>
            <li>
              <strong>신뢰할 수 없는 출처:</strong> <code>JSON.parse</code> 는 안전하지만
              <code>eval</code> 은 절대 사용하지 마세요
            </li>
            <li>
              <strong>함수/날짜:</strong> JSON 으로 변환되지 않음 (문자열로 변환 필요)
            </li>
            <li>
              <strong>순환 참조:</strong> <code>JSON.stringify</code> 는 순환 참조에서 에러 발생
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="json-advanced">6️⃣ JSON 고급 처리</h2>
        <p>
          날짜, 순환 참조 등 복잡한 JSON 처리입니다.
        </p>

        <CodeDemo
          title="JSON 고급 처리"
          description="날짜와 순환 참조 처리"
          defaultCode={`// 1. 날짜 처리
const eventData = {
  name: 'Conference',
  date: new Date('2024-01-15'),
};

const json = JSON.stringify(eventData);
console.log('날짜 JSON:', json);
// {"name":"Conference","date":"2024-01-15T00:00:00.000Z"}

// 2. 날짜 복원 (reviver 함수)
const restored = JSON.parse(json, (key, value) => {
  if (key === 'date' && typeof value === 'string') {
    return new Date(value);
  }
  return value;
});
console.log('복원된 날짜:', restored.date);
console.log('Date 타입:', restored.date instanceof Date);  // true

// 3. 순환 참조 문제
const obj = { name: 'Parent' };
obj.self = obj;  // 순환 참조

// console.log(JSON.stringify(obj));  // 에러!

// 4. 순환 참조 해결 (WeakMap 사용)
function safeStringify(obj) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
    }
    return value;
  });
}

const circular = { name: 'A' };
circular.ref = circular;
console.log('안전한 직렬화:', safeStringify(circular));

// 5. 실제 활용 - localStorage 저장
function saveToStorage(key, data) {
  try {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
  } catch (error) {
    console.error('저장 실패:', error);
  }
}

function loadFromStorage(key) {
  try {
    const json = localStorage.getItem(key);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error('로딩 실패:', error);
    return null;
  }
}

// 6. 깊은 복사 (shallow copy vs deep copy)
const original = { a: 1, b: { c: 2 } };
const shallow = { ...original };  // 얕은 복사
const deep = JSON.parse(JSON.stringify(original));  // 깊은 복사 (단순한 경우)

shallow.b.c = 999;
console.log('original.b.c:', original.b.c);  // 999 (영향 받음)
console.log('deep.b.c:', deep.b.c);  // 2 (영향 없음)

console.log('JSON 고급 예시 완료');`}
        />

        <InfoCard type="tip" title="깊은 복사 대안">
          <p>
            <code>JSON.parse(JSON.stringify(obj))</code> 는 간단한 깊은 복사에 사용되지만,
            함수와 날짜는 손실됩니다.
            <br />
            프로덕션에서는 <code>structuredClone()</code> (최신 브라우저) 나
            <code>lodash.cloneDeep</code> 을 사용하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>숫자:</strong> 정수/실수 구분 없음, 64 비트 부동소수점
          </li>
          <li>
            <strong>확인:</strong> <code>Number.isFinite</code>, <code>Number.isNaN</code> 권장
          </li>
          <li>
            <strong>Math:</strong> <code>Math.round</code>, <code>Math.floor</code>, <code>Math.random</code>
          </li>
          <li>
            <strong>정밀도:</strong> 부동소수점 문제 주의, 금전 계산은 라이브러리 사용
          </li>
          <li>
            <strong>JSON.stringify:</strong> 객체 → JSON 문자열
          </li>
          <li>
            <strong>JSON.parse:</strong> JSON 문자열 → 객체
          </li>
          <li>
            <strong>reviver/replacer:</strong> 변환 콜백
          </li>
          <li>
            <strong>깊은 복사:</strong> <code>JSON.parse(JSON.stringify(obj))</code> (단순한 경우)
          </li>
        </ul>
      </section>
    </div>
  );
}