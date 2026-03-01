import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function JSStrings() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Strings & String Methods</h1>
        <p className="page-description">
          JavaScript 문자열과 다양한 문자열 메서드에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          문자열 (String) 은 텍스트 데이터를 다루는 기본 타입입니다.
          JavaScript 는 다양한 문자열 메서드를 제공하여 텍스트 조작을 쉽게 합니다.
        </p>

        <InfoCard type="tip" title="문자열 생성 방법">
          <ul>
            <li>
              <strong>큰따옴표:</strong> <code>"Hello"</code>
            </li>
            <li>
              <strong>작은따옴표:</strong> <code>'Hello'</code>
            </li>
            <li>
              <strong>템플릿 리터럴:</strong> <code>{`Hello ${name}`}</code> (ES6)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="creation">1️⃣ 문자열 생성과 접근</h2>
        <p>
          문자열을 생성하고 인덱스로 접근하는 방법입니다.
        </p>

        <CodeDemo
          title="문자열 생성과 접근"
          description="기본적인 문자열 조작"
          defaultCode={`// 1. 문자열 생성
const str1 = 'Hello';
const str2 = "World";
const str3 = \`Template Literal\`;

// 2. 길이 확인
console.log('str1.length:', str1.length);  // 5

// 3. 인덱스 접근
console.log('str1[0]:', str1[0]);  // H
console.log('str1[1]:', str1[1]);  // e
console.log('str1[4]:', str1[4]);  // o

// 4. charAt 메서드
console.log('str1.charAt(0):', str1.charAt(0));  // H
console.log('str1.charAt(10):', str1.charAt(10));  // '' (빈 문자열)

// 5. charCodeAt (유니코드 값)
console.log('str1.charCodeAt(0):', str1.charCodeAt(0));  // 72

// 6. at 메서드 (ES2022, 음수 인덱스 지원)
console.log('str1.at(-1):', str1.at(-1));  // o
console.log('str1.at(-2):', str1.at(-2));  // l

// 7. 문자열은 불변 (immutable)
// str1[0] = 'h';  // 오류는 아니지만 적용 안 됨
console.log('str1:', str1);  // 여전히 'Hello'

console.log('문자열 기본 예시 완료');`}
        />

        <InfoCard type="warning" title="문자열 불변성">
          <p>
            JavaScript 문자열은 <strong>불변 (immutable)</strong>입니다.
            인덱스로 값을 변경할 수 없으며, 새로운 문자열을 생성해야 합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="slice-substring">2️⃣ 문자열 추출 (slice, substring, substr)</h2>
        <p>
          문자열의 일부분을 추출하는 세 가지 메서드를 비교합니다.
        </p>

        <CodeDemo
          title="문자열 추출 메서드 비교"
          description="slice, substring, substr"
          defaultCode={`const text = 'Hello, World!';

// 1. slice(start, end) - end 미포함, 음수 인덱스 가능
console.log("text.slice(0, 5):", text.slice(0, 5));  // 'Hello'
console.log("text.slice(7):", text.slice(7));  // 'World!'
console.log("text.slice(-6):", text.slice(-6));  // 'World!'
console.log("text.slice(0, -7):", text.slice(0, -7));  // 'Hello'

// 2. substring(start, end) - end 미포함, 음수 인덱스 불가
console.log("text.substring(0, 5):", text.substring(0, 5));  // 'Hello'
console.log("text.substring(7):", text.substring(7));  // 'World!'
console.log("text.substring(5, 0):", text.substring(5, 0));  // 'Hello' (swap 됨)

// 3. substr(start, length) - deprecated 하지만 여전히 사용됨
console.log("text.substr(0, 5):", text.substr(0, 5));  // 'Hello'
console.log("text.substr(7, 5):", text.substr(7, 5));  // 'World'

// 4. 실제 활용 예시
const email = 'user@example.com';
const username = email.slice(0, email.indexOf('@'));
const domain = email.slice(email.indexOf('@') + 1);

console.log('이메일:', email);
console.log('유저네임:', username);  // 'user'
console.log('도메인:', domain);  // 'example.com'

console.log('문자열 추출 예시 완료');`}
        />

        <InfoCard type="tip" title="추천 메서드">
          <p>
            <strong>slice</strong> 를 사용하는 것이 가장 안전하고 직관적입니다.
            <br />
            <code>substr</code> 은 deprecated 되었으므로 사용을 피하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="search">3️⃣ 문자열 검색 (indexOf, includes, search, match)</h2>
        <p>
          문자열 내에서 특정 패턴을 찾는 다양한 방법입니다.
        </p>

        <CodeDemo
          title="문자열 검색 메서드"
          description="indexOf, includes, search, match"
          defaultCode={`const text = 'Hello, World! Hello, JavaScript!';

// 1. indexOf - 첫 번째 위치 반환, 없으면 -1
console.log("text.indexOf('Hello'):", text.indexOf('Hello'));  // 0
console.log("text.indexOf('World'):", text.indexOf('World'));  // 7
console.log("text.indexOf('Python'):", text.indexOf('Python'));  // -1

// 2. lastIndexOf - 마지막 위치 반환
console.log("text.lastIndexOf('Hello'):", text.lastIndexOf('Hello'));  // 14

// 3. fromIndex 와 함께 사용
console.log("text.indexOf('Hello', 5):", text.indexOf('Hello', 5));  // 14

// 4. includes - 불리언 반환 (ES6)
console.log("text.includes('World'):", text.includes('World'));  // true
console.log("text.includes('Python'):", text.includes('Python'));  // false

// 5. startsWith, endsWith (ES6)
console.log("text.startsWith('Hello'):", text.startsWith('Hello'));  // true
console.log("text.endsWith('Script!'):", text.endsWith('Script!'));  // true

// 6. search - 정규식 지원, 위치 반환 또는 -1
console.log("text.search(/world/i):", text.search(/world/i));  // 7 (대소문자 무시)

// 7. match - 정규식 매칭, 배열 반환
const matches = text.match(/Hello/g);
console.log('모든 Hello:', matches);  // ['Hello', 'Hello']

// 8. matchAll - 모든 매칭 (이터레이터)
const allMatches = [...text.matchAll(/Hello/g)];
console.log('matchAll:', allMatches.length);  // 2

console.log('문자열 검색 예시 완료');`}
        />

        <InfoCard type="tip" title="메서드 선택 가이드">
          <ul>
            <li>
              <strong>위치만 필요:</strong> <code>indexOf</code>, <code>includes</code>
            </li>
            <li>
              <strong>정규식:</strong> <code>search</code>, <code>match</code>
            </li>
            <li>
              <strong>단순 포함 확인:</strong> <code>includes</code> (가장 직관적)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="transform">4️⃣ 문자열 변환 (toUpperCase, toLowerCase, trim)</h2>
        <p>
          문자열의 대소문자와 공백을 처리합니다.
        </p>

        <CodeDemo
          title="문자열 변환 메서드"
          description="대소문자 변환과 공백 제거"
          defaultCode={`const text = '  Hello, World!  ';

// 1. 대소문자 변환
console.log("text.toUpperCase():", text.toUpperCase());  // '  HELLO, WORLD!  '
console.log("text.toLowerCase():", text.toLowerCase());  // '  hello, world!  '

// 2. 공백 제거
console.log("text.trim():", text.trim());  // 'Hello, World!'
console.log("text.trimStart():", text.trimStart());  // 'Hello, World!  '
console.log("text.trimEnd():", text.trimEnd());  // '  Hello, World!'

// 3. 실제 활용 - 사용자 입력 처리
const userInput = '  User@Example.COM  ';
const normalized = userInput.trim().toLowerCase();
console.log('정규화:', normalized);  // 'user@example.com'

// 4. localeCompare - 로케일별 문자열 비교
const a = 'ä';
const b = 'z';
console.log("a.localeCompare(b, 'sv'):", a.localeCompare(b, 'sv'));  // 스웨덴어

// 5. caseFold (대소문자 구분 없이 비교)
console.log('HELLO'.toLowerCase() === 'hello'.toLowerCase());  // true

console.log('문자열 변환 예시 완료');`}
        />
      </section>

      <section className="content-section">
        <h2 id="replace">5️⃣ 문자열 치환 (replace, replaceAll)</h2>
        <p>
          문자열의 일부분을 다른 문자열로 교체합니다.
        </p>

        <CodeDemo
          title="문자열 치환 메서드"
          description="replace 와 replaceAll"
          defaultCode={`const text = 'Hello, World! Hello, JavaScript!';

// 1. replace - 첫 번째 매칭만 교체
console.log("text.replace('Hello', 'Hi'):", text.replace('Hello', 'Hi'));
// 'Hi, World! Hello, JavaScript!'

// 2. replaceAll - 모든 매칭 교체 (ES2021)
console.log("text.replaceAll('Hello', 'Hi'):", text.replaceAll('Hello', 'Hi'));
// 'Hi, World! Hi, JavaScript!'

// 3. 정규식으로 교체
console.log("text.replace(/Hello/g, 'Hi'):", text.replace(/Hello/g, 'Hi'));

// 4. 대소문자 무시 정규식
const caseText = 'Hello hello HELLO';
console.log("caseText.replace(/hello/gi, 'Hi'):", caseText.replace(/hello/gi, 'Hi'));
// 'Hi Hi Hi'

// 5. 치환 함수 사용
const priceText = 'The price is $100 and $200';
const updated = priceText.replace(/\\$\\d+/g, (match) => {
  const value = parseInt(match.slice(1));
  return \`$\${value * 1.1}\`;  // 10% 인상
});
console.log('가격 인상:', updated);  // 'The price is $110 and $220'

// 6. 실제 활용 - HTML 이스케이프
function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const userInput = '<script>alert("XSS")</script>';
console.log('이스케이프:', escapeHtml(userInput));

console.log('문자열 치환 예시 완료');`}
        />

        <InfoCard type="warning" title="replaceAll 주의">
          <p>
            <code>replaceAll</code> 은 ES2021 기능입니다. 구형 브라우저에서는
            정규식 <code>/pattern/g</code> 를 사용하거나 polyfill 이 필요합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="split-join">6️⃣ 문자열 분할과 결합 (split, join)</h2>
        <p>
          문자열을 배열로 나누고, 배열을 문자열로 결합합니다.
        </p>

        <CodeDemo
          title="문자열 분할과 결합"
          description="split 과 join"
          defaultCode={`// 1. split - 문자열을 배열로 분할
const csv = 'apple,banana,cherry';
const fruits = csv.split(',');
console.log('분할:', fruits);  // ['apple', 'banana', 'cherry']

// 2. 구분자 없이 분할 (각 문자로)
const chars = 'Hello'.split('');
console.log('문자 분할:', chars);  // ['H', 'e', 'l', 'l', 'o']

// 3. limit 사용 (배열 크기 제한)
const limited = csv.split(',', 2);
console.log('제한 분할:', limited);  // ['apple', 'banana']

// 4. join - 배열을 문자열로 결합
const joined = fruits.join(', ');
console.log('결합:', joined);  // 'apple, banana, cherry'

// 5. 다른 구분자로 결합
console.log("fruits.join(' | '):", fruits.join(' | '));  // 'apple | banana | cherry'
console.log("fruits.join(''):", fruits.join(''));  // 'applebananacherry'

// 6. 실제 활용 - URL 파라미터 파싱
const queryString = 'name=Alice&age=25&city=NYC';
const params = queryString.split('&').reduce((acc, param) => {
  const [key, value] = param.split('=');
  acc[key] = value;
  return acc;
}, {});
console.log('파라미터:', params);  // {name: 'Alice', age: '25', city: 'NYC'}

// 7. 실제 활용 - 경로 조작
const path = '/home/user/documents/file.txt';
const parts = path.split('/');
console.log('경로 부분:', parts);  // ['', 'home', 'user', 'documents', 'file.txt']
console.log('파일명:', parts.at(-1));  // 'file.txt'

console.log('문자열 분할 예시 완료');`}
        />
      </section>

      <section className="content-section">
        <h2 id="pad-repeat">7️⃣ 문자열 채우기와 반복 (padStart, padEnd, repeat)</h2>
        <p>
          문자열을 특정 길이로 채우거나 반복합니다.
        </p>

        <CodeDemo
          title="문자열 채우기와 반복"
          description="padStart, padEnd, repeat"
          defaultCode={`// 1. padStart - 왼쪽 채우기 (ES2017)
console.log("'5'.padStart(3, '0'):", '5'.padStart(3, '0'));  // '005'
console.log("'42'.padStart(5, '0'):", '42'.padStart(5, '0'));  // '00042'

// 2. padEnd - 오른쪽 채우기 (ES2017)
console.log("'5'.padEnd(3, '0'):", '5'.padEnd(3, '0'));  // '500'
console.log("'Hello'.padEnd(10, '.'):", 'Hello'.padEnd(10, '.'));  // 'Hello.....'

// 3. 실제 활용 - 포맷팅
function formatPrice(price) {
  return \`$\${price.toString().padStart(5, '0')}\`;
}
console.log('가격:', formatPrice(42));  // '$00042'

// 4. 실제 활용 - 시간 포맷
function formatTime(hours, minutes, seconds) {
  const h = hours.toString().padStart(2, '0');
  const m = minutes.toString().padStart(2, '0');
  const s = seconds.toString().padStart(2, '0');
  return \`\${h}:\${m}:\${s}\`;
}
console.log('시간:', formatTime(9, 5, 3));  // '09:05:03'

// 5. repeat - 문자열 반복 (ES2015)
console.log("'Ha'.repeat(3):", 'Ha'.repeat(3));  // 'HaHaHa'
console.log("'='.repeat(20):", '='.repeat(20));  // '===================='

// 6. 실제 활용 - 박스 그리기
function drawBox(width, height) {
  const border = '+'.repeat(width);
  const middle = '+' + ' '.repeat(width - 2) + '+';
  
  console.log(border);
  for (let i = 0; i < height - 2; i++) {
    console.log(middle);
  }
  console.log(border);
}

drawBox(20, 5);

console.log('문자열 채우기 예시 완료');`}
        />
      </section>

      <section className="content-section">
        <h2 id="template-literals">8️⃣ 템플릿 리터럴 심화</h2>
        <p>
          템플릿 리터럴의 고급 사용법입니다.
        </p>

        <CodeDemo
          title="템플릿 리터럴 심화"
          description="태그드 템플릿과 다중 줄"
          defaultCode={`const name = 'Alice';
const age = 25;

// 1. 기본 템플릿 리터럴
console.log(\`Hello, \${name}! You are \${age} years old.\`);

// 2. 다중 줄 문자열
const multiLine = \`
  <div>
    <h1>\${name}</h1>
    <p>Age: \${age}</p>
  </div>
\`;
console.log(multiLine);

// 3. 중첩 템플릿
const user = { name: 'Bob', age: 30 };
console.log(\`User: \${user.name} (\${user.age}세)\`);

// 4. 태그드 템플릿 (Tagged Templates)
function uppercase(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    return acc + str + (values[i] || '').toUpperCase();
  }, '');
}

const result = uppercase\`Hello \${name}, you are \${age}!\`;
console.log('태그드:', result);  // 'Hello ALICE, you are 25!'

// 5. HTML 인코딩 태그드 템플릿
function html(strings, ...values) {
  const escape = (str) => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  return strings.reduce((acc, str, i) => acc + str + escape(values[i] ?? ''), '');
}

const userInput = '<script>alert("XSS")</script>';
const safe = html\`<div>\${userInput}</div>\`;
console.log('안전한 HTML:', safe);

console.log('템플릿 리터럴 예시 완료');`}
        />

        <InfoCard type="tip" title="태그드 템플릿 활용">
          <p>
            태그드 템플릿은 <strong>styled-components</strong> 같은 라이브러리에서
            CSS-in-JS 구현에 사용됩니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>생성:</strong> 따옴표 3 종류 (', ", `)
          </li>
          <li>
            <strong>추출:</strong> <code>slice</code> 권장, <code>substring</code> 대체 가능
          </li>
          <li>
            <strong>검색:</strong> <code>indexOf</code>, <code>includes</code>, <code>match</code>
          </li>
          <li>
            <strong>변환:</strong> <code>toUpperCase</code>, <code>toLowerCase</code>, <code>trim</code>
          </li>
          <li>
            <strong>치환:</strong> <code>replace</code>, <code>replaceAll</code> (ES2021)
          </li>
          <li>
            <strong>분할/결합:</strong> <code>split</code>, <code>join</code>
          </li>
          <li>
            <strong>채우기:</strong> <code>padStart</code>, <code>padEnd</code>, <code>repeat</code>
          </li>
          <li>
            <strong>템플릿:</strong> 백틱 (<code>`</code>) 사용, 태그드 템플릿 가능
          </li>
        </ul>
      </section>
    </div>
  );
}