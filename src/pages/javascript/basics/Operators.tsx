import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function Operators() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>연산자 (Operators)</h1>
        <p className="page-description">
          JavaScript 의 다양한 연산자와 그 사용법에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          연산자는 값에 대해 특정 연산을 수행하는 기호입니다. JavaScript 는 산술, 비교, 논리, 할당,
          삼항, null 병합 연산자 등 다양한 연산자를 제공합니다.
        </p>
      </section>

      <section className="content-section">
        <h2 id="arithmetic">1️⃣ 산술 연산자 (Arithmetic Operators)</h2>
        <p>숫자 연산에 사용되는 기본적인 연산자입니다.</p>

        <CodeDemo
          title="산술 연산자"
          description="기본 산술 연산과 증가/감소 연산자를 확인해보세요."
          defaultCode={`// 기본 산술 연산
let a = 10;
let b = 3;

console.log('a + b =', a + b);  // 13
console.log('a - b =', a - b);  // 7
console.log('a * b =', a * b);  // 30
console.log('a / b =', a / b);  // 3.333...
console.log('a % b =', a % b);  // 1 (나머지)
console.log('a ** b =', a ** b); // 1000 (거듭제곱, ES7)

// 증가/감소 연산자
let x = 5;
console.log('x++ (후위):', x++); // 5 (먼저 반환, 후 증가)
console.log('x:', x); // 6

console.log('++x (전위):', ++x); // 7 (먼저 증가, 후 반환)
console.log('x:', x); // 7

let y = 5;
console.log('y--:', y--); // 5
console.log('y:', y); // 4

console.log('--y:', --y); // 3`}
        />
      </section>

      <section className="content-section">
        <h2 id="comparison">2️⃣ 비교 연산자 (Comparison Operators)</h2>
        <p>두 값을 비교하여 참/거짓을 반환합니다.</p>

        <InfoCard type="warning" title="== vs ===">
          <p>
            <code>==</code> (일치 연산자) 는 타입 변환을 수행한 후 비교합니다.
            <br />
            <code>===</code> (일치 연산자) 는 타입과 값을 모두 비교합니다.
            <br />
            <strong>
              항상 <code>===</code> 와 <code>!==</code> 를 사용하세요!
            </strong>
          </p>
        </InfoCard>

        <CodeDemo
          title="비교 연산자"
          description="일치 (==) 와 엄밀일치 (===) 의 차이를 확인해보세요."
          defaultCode={`const num = 5;
const str = '5';

// == (타입 변환 후 비교)
console.log('5 == "5":', num == str);   // true
console.log('5 == 5:', num == 5);       // true
console.log('0 == false:', 0 == false); // true
console.log('"" == false:', '' == false); // true
console.log('null == undefined:', null == undefined); // true

// === (타입과 값 모두 비교 - 권장)
console.log('5 === "5":', num === str);   // false (타입 다름)
console.log('5 === 5:', num === 5);       // true
console.log('0 === false:', 0 === false); // false (타입 다름)
console.log('"" === false:', '' === false); // false

// 기타 비교 연산자
console.log('5 > 3:', 5 > 3);   // true
console.log('5 < 3:', 5 < 3);   // false
console.log('5 >= 5:', 5 >= 5); // true
console.log('5 <= 4:', 5 <= 4); // false

// NaN 주의사항
console.log('NaN == NaN:', NaN == NaN);   // false!
console.log('NaN === NaN:', NaN === NaN); // false!
console.log('isNaN(NaN):', Number.isNaN(NaN)); // true`}
        />
      </section>

      <section className="content-section">
        <h2 id="logical">3️⃣ 논리 연산자 (Logical Operators)</h2>
        <p>불리언 값을 조합하거나 단축 평가를 수행합니다.</p>

        <InfoCard type="tip" title="단축 평가 (Short-circuit Evaluation)">
          <p>
            <code>&&</code> 는 첫 번째 falsy 값을 반환하거나 마지막 값을 반환합니다.
            <br />
            <code>||</code> 는 첫 번째 truthy 값을 반환하거나 마지막 값을 반환합니다.
            <br />이 특성을 활용해 조건부 렌더링과 기본값 설정에 활용합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="논리 연산자"
          description="AND, OR, NOT 연산과 단축 평가를 확인해보세요."
          defaultCode={`// AND (&&) - 모든 조건이 true 일 때 true
console.log('true && true:', true && true);     // true
console.log('true && false:', true && false);   // false
console.log('false && true:', false && true);   // false

// OR (||) - 하나라도 true 면 true
console.log('true || false:', true || false);   // true
console.log('false || false:', false || false); // false

// NOT (!) - 반대로
console.log('!true:', !true);   // false
console.log('!false:', !false); // true

// 단축 평가 (실무에서 자주 사용!)
const name = '';
const defaultName = 'Guest';
console.log('이름:', name || defaultName); // "Guest"

const user = { name: 'Alice' };
console.log('사용자 이름:', user && user.name); // "Alice"

// null/undefined 일 때 기본값 제공
const config = null;
const defaultConfig = { theme: 'dark' };
console.log('설정:', config ?? defaultConfig); // { theme: 'dark' }

// 복잡한 단축 평가
console.log('0 || "hello":', 0 || 'hello');     // "hello"
console.log('"hi" && "hello":', 'hi' && 'hello'); // "hello"
console.log('null || undefined || 0 || "result":', null || undefined || 0 || 'result'); // "result"`}
        />
      </section>

      <section className="content-section">
        <h2 id="nullish">4️⃣ Null 병합 연산자 (Nullish Coalescing)</h2>
        <p>
          <code>??</code> 연산자는 왼쪽 피연산자가 <code>null</code> 또는 <code>undefined</code> 일
          때 오른쪽 피연산자를 반환합니다.
        </p>

        <CodeDemo
          title="Null 병합 연산자"
          description="|| 와 ?? 의 차이를 확인해보세요."
          defaultCode={`// || 연산자의 문제점
const count = 0;
const defaultCount = 10;
console.log('count || defaultCount:', count || defaultCount); // 10 (0 이 falsy 라서!)

// ?? 연산자 (권장)
console.log('count ?? defaultCount:', count ?? defaultCount); // 0 (0 은 유효한 값!)

// null/undefined 일 때만 기본값
const name1 = '';
const name2 = null;
const name3 = undefined;
const defaultName = 'Guest';

console.log('"" ?? defaultName:', name1 ?? defaultName);     // "" (빈 문자열도 유효!)
console.log('null ?? defaultName:', name2 ?? defaultName);   // "Guest"
console.log('undefined ?? defaultName:', name3 ?? defaultName); // "Guest"

// 실무 예시: API 응답 처리
const apiResponse = { count: 0, data: [] };
console.log('count:', apiResponse.count ?? 10); // 0 (유효한 값)
console.log('data:', apiResponse.data ?? []);   // []`}
        />
      </section>

      <section className="content-section">
        <h2 id="ternary">5️⃣ 삼항 연산자 (Ternary Operator)</h2>
        <p>
          조건에 따라 두 값 중 하나를 선택합니다. <code>if-else</code> 를 간결하게 표현할 수
          있습니다.
        </p>

        <CodeDemo
          title="삼항 연산자"
          description="if-else 를 삼항 연산자로 표현해보세요."
          defaultCode={`const age = 20;

// if-else
let canVote;
if (age >= 18) {
  canVote = '투표 가능';
} else {
  canVote = '투표 불가';
}
console.log('if-else:', canVote);

// 삼항 연산자 (권장)
const result = age >= 18 ? '투표 가능' : '투표 불가';
console.log('ternary:', result);

// 중첩 삼항 연산자 (복잡하면 if-else 사용 권장)
const score = 85;
const grade = score >= 90 ? 'A' 
            : score >= 80 ? 'B' 
            : score >= 70 ? 'C' 
            : 'D';
console.log('grade:', grade); // B

// React 에서의 활용 (조건부 렌더링)
const isLoggedIn = true;
const welcomeMessage = isLoggedIn ? '환영합니다!' : '로그인하세요';
console.log(welcomeMessage);`}
        />
      </section>

      <section className="content-section">
        <h2 id="assignment">6️⃣ 할당 연산자 (Assignment Operators)</h2>
        <p>변수에 값을 할당하거나 연산과 할당을 동시에 수행합니다.</p>

        <CodeDemo
          title="할당 연산자"
          description="다양한 할당 연산자를 확인해보세요."
          defaultCode={`let x = 10;

// 기본 할당
x = 10;
console.log('x = 10:', x);

// 산술 연산과 할당
x += 5;  // x = x + 5
console.log('x += 5:', x); // 15

x -= 3;  // x = x - 3
console.log('x -= 3:', x); // 12

x *= 2;  // x = x * 2
console.log('x *= 2:', x); // 24

x /= 4;  // x = x / 4
console.log('x /= 4:', x); // 6

x %= 4;  // x = x % 4
console.log('x %= 4:', x); // 2

x **= 3; // x = x ** 3
console.log('x **= 3:', x); // 8

// 문자열 연결 할당
let str = 'Hello';
str += ' World';
console.log('str += " World":', str); // "Hello World"`}
        />
      </section>

      <section className="content-section">
        <h2 id="optional-chaining">7️⃣ 옵셔널 체이닝 (Optional Chaining)</h2>
        <p>
          <code>?.</code> 연산자를 사용하면 중첩된 객체 접근 시 안전하게 속성에 접근할 수 있습니다.
          ES2020 에서 도입된 기능입니다.
        </p>

        <InfoCard type="tip" title="옵셔널 체이닝 활용">
          <p>
            React 에서 API 응답이나 중첩 데이터를 다룰 때 매우 유용합니다.
            <br />
            <code>user?.address?.city</code> 는 <code>user</code> 나 <code>address</code> 가
            <code>null/undefined</code> 여도 오류 없이 <code>undefined</code> 를 반환합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="옵셔널 체이닝"
          description="중첩 객체를 안전하게 접근하는 방법입니다."
          defaultCode={`// 중첩 객체
const user = {
  name: 'Alice',
  address: {
    city: 'Seoul',
    zip: '12345'
  }
};

// 기존 방식 (오류 발생 가능)
// console.log(user.address.city); // OK
// console.log(user.profile?.address); // undefined

// 옵셔널 체이닝 (안전)
console.log('user?.name:', user?.name);           // "Alice"
console.log('user?.address?.city:', user?.address?.city); // "Seoul"
console.log('user?.profile?.name:', user?.profile?.name); // undefined (오류 없음!)

// 배열에서 안전하게 접근
const items = [1, 2, 3];
console.log('items?.[0]:', items?.[0]);     // 1
console.log('items?.[10]:', items?.[10]);   // undefined
console.log('nullArray?.[0]:', null?.[0]);  // undefined (오류 없음!)

// 함수도 안전하게 호출
const obj = {
  greet: () => 'Hello!'
};
console.log('obj?.greet?.():', obj?.greet?.()); // "Hello!"
console.log('obj?.missing?.():', obj?.missing?.()); // undefined`}
        />
      </section>

      <section className="content-section">
        <h2 id="operator-precedence">📊 연산자 우선순위</h2>
        <p>연산자 우선순위가 높을수록 먼저 계산됩니다.</p>

        <div className="type-grid">
          <div className="type-card">
            <h4>우선순위 높음 → 낮음</h4>
            <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
              <li>
                <code>()</code> - 그룹화
              </li>
              <li>
                <code>++</code>, <code>--</code> - 증가/감소
              </li>
              <li>
                <code>!</code>, <code>~</code> - 단항 연산자
              </li>
              <li>
                <code>**</code> - 거듭제곱
              </li>
              <li>
                <code>*</code>, <code>/</code>, <code>%</code> - 곱셈/나눗셈
              </li>
              <li>
                <code>+</code>, <code>-</code> - 덧셈/뺄셈
              </li>
              <li>
                <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code> - 비교
              </li>
              <li>
                <code>===</code>, <code>!==</code>, <code>==</code>, <code>!=</code> - 일치
              </li>
              <li>
                <code>&&</code> - 논리곱
              </li>
              <li>
                <code>||</code>, <code>??</code> - 논리합
              </li>
              <li>
                <code>? :</code> - 삼항
              </li>
              <li>
                <code>=</code>, <code>+=</code>, <code>-=</code> 등 - 할당
              </li>
            </ol>
          </div>
        </div>

        <CodeDemo
          title="연산자 우선순위"
          description="우선순위에 따라 계산 결과가 달라집니다."
          defaultCode={`// 우선순위 확인
console.log('2 + 3 * 4:', 2 + 3 * 4);     // 14 (곱셈 먼저)
console.log('(2 + 3) * 4:', (2 + 3) * 4); // 20 (그룹화 먼저)

// 논리 연산자 우선순위
console.log('true || false && false:', true || false && false); 
// true (&& 가 || 보다 우선)
// 실제: true || (false && false) = true || false = true

// 비교와 논리
console.log('5 > 3 && 2 < 4:', 5 > 3 && 2 < 4); // true

// null 병합과 논리합
console.log('null || 0 ?? 5:', null || 0 ?? 5); // 5
// 실제: (null || 0) ?? 5 = 0 ?? 5 = 5

// 명시적 그룹화로 가독성 향상
const result = (5 > 3) && (2 < 4);
console.log('explicit grouping:', result);`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              산술 연산자: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>,{' '}
              <code>%</code>, <code>**</code>
            </li>
            <li>
              비교 연산자: 항상 <code>===</code>, <code>!==</code> 사용 (타입 변환 주의)
            </li>
            <li>
              논리 연산자: <code>&&</code>, <code>||</code>, <code>!</code> - 단축 평가 활용
            </li>
            <li>
              Null 병합: <code>??</code> - <code>null/undefined</code> 일 때만 기본값
            </li>
            <li>
              삼항 연산자: <code>조건 ? 참 : 거짓</code> - 조건부 표현
            </li>
            <li>
              옵셔널 체이닝: <code>?.</code> - 중첩 객체 안전 접근
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
