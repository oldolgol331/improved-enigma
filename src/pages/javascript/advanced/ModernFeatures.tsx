import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function JavaScriptModernFeatures() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>현대 JavaScript 기능</h1>
        <p className="page-description">
          Optional Chaining, Nullish Coalescing, Intl API 등 현대 JavaScript 의 유용한 기능들을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="optional-chaining">1️⃣ Optional Chaining</h2>
        <p>
          <strong>Optional Chaining (?.)</strong> 은 중첩된 객체 속성에 안전하게 접근합니다.
          ES2020 에서 도입되었습니다.
        </p>

        <CodeDemo
          title="Optional Chaining"
          description="null/undefined 체크 간소화"
          defaultCode={`// 1. 기존 방식 (긴 null 체크)
const user = {
  profile: {
    name: 'Alice',
    address: {
      city: 'Seoul'
    }
  }
};

// 기존: 깊은 중첩 접근
const city1 = user && 
              user.profile && 
              user.profile.address && 
              user.profile.address.city;
console.log(city1);  // 'Seoul'

// 2. Optional Chaining (현대적)
const city2 = user?.profile?.address?.city;
console.log(city2);  // 'Seoul'

// 3. undefined 반환
const zipCode = user?.profile?.address?.zipCode;
console.log(zipCode);  // undefined (에러 없음!)

// 4. null 일 때
const nullUser = null;
const name = nullUser?.name;
console.log(name);  // undefined

// 5. 배열에서 사용
const users = [{ name: 'Alice' }, { name: 'Bob' }];
console.log(users?.[0]?.name);  // 'Alice'
console.log(users?.[5]?.name);  // undefined (에러 없음)

// 6. 함수 호출에서 사용
const obj = {
  greet: () => console.log('Hello')
};
obj?.greet?.();  // 'Hello'

const noFunc = {};
noFunc?.greet?.();  // undefined (에러 없음)

// 7. 동적 속성 접근
const key = 'name';
console.log(user?.profile?.[key]);  // 'Alice'

console.log('Optional Chaining 완료');`}
        />

        <InfoCard type="warning" title="Optional Chaining 주의">
          <ul>
            <li>
              <strong>남용 금지:</strong> 과도한 사용은 코드 가독성 저하
            </li>
            <li>
              <strong>에러 숨김:</strong> 실제 에러를 undefined 로 숨길 수 있음
            </li>
            <li>
              <strong>null 병합과 조합:</strong> <code>??</code> 연산자와 함께 사용
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="nullish-coalescing">2️⃣ Nullish Coalescing</h2>
        <p>
          <strong>Nullish Coalescing (??)</strong> 은 null 또는 undefined 일 때 기본값을 제공합니다.
          ES2020 에서 도입되었습니다.
        </p>

        <CodeDemo
          title="Nullish Coalescing"
          description="null/undefined 체크와 기본값 제공"
          defaultCode={`// 1. 기존 방식 (OR 연산자)
const value1 = null || 'default';
console.log(value1);  // 'default'

const value2 = 0 || 'default';
console.log(value2);  // 'default' (0 이 falsy 해서!)

const value3 = '' || 'default';
console.log(value3);  // 'default' (빈 문자열도!)

// 2. Nullish Coalescing (현대적)
const value4 = null ?? 'default';
console.log(value4);  // 'default'

const value5 = 0 ?? 'default';
console.log(value5);  // 0 (0 을 유효한 값으로 인정!)

const value6 = '' ?? 'default';
console.log(value6);  // '' (빈 문자열도 유효!)

// 3. 실제 사용 예시
const config = {
  timeout: 0,  // 0 도 유효한 값
  retries: null
};

// OR 연산자 문제
const timeout1 = config.timeout || 3000;
console.log(timeout1);  // 3000 (의도하지 않음!)

// Nullish Coalescing 해결
const timeout2 = config.timeout ?? 3000;
console.log(timeout2);  // 0 (의도한 대로!)

const retries = config.retries ?? 3;
console.log(retries);  // 3 (null 이므로 기본값)

// 4. 함수 파라미터 기본값
function fetchData(options = {}) {
  const limit = options.limit ?? 10;
  const offset = options.offset ?? 0;
  console.log(limit, offset);
}

fetchData({ limit: 0 });  // 0 0 (0 도 유효!)
fetchData({});  // 10 0

console.log('Nullish Coalescing 완료');`}
        />

        <InfoCard type="tip" title="OR vs Nullish Coalescing">
          <ul>
            <li>
              <strong>OR (||):</strong> 모든 falsy 값 (0, '', null, undefined, false)
            </li>
            <li>
              <strong>Nullish (??):</strong> null, undefined 만
            </li>
            <li>
              <strong>권장:</strong> 숫자/문자열 기본값은 ?? 사용
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="combined">3️⃣ 조합 사용</h2>
        <p>
          Optional Chaining 과 Nullish Coalescing 을 함께 사용하면 더 강력합니다.
        </p>

        <CodeDemo
          title="조합 사용"
          description="안전한 속성 접근과 기본값"
          defaultCode={`// 1. API 응답 처리
const apiResponse = {
  data: {
    user: {
      profile: {
        name: 'Alice'
      }
    }
  }
};

// 안전한 접근과 기본값
const userName = apiResponse?.data?.user?.profile?.name ?? 'Guest';
console.log(userName);  // 'Alice'

// 중첩이 없을 때
const emptyResponse = {};
const emptyName = emptyResponse?.data?.user?.profile?.name ?? 'Guest';
console.log(emptyName);  // 'Guest'

// 2. 설정 객체 처리
const settings = {
  theme: null,
  fontSize: 0
};

const theme = settings?.theme ?? 'light';
const fontSize = settings?.fontSize ?? 16;
console.log(theme, fontSize);  // 'light' 0

// 3. 배열 처리
const items = null;
const firstItem = items?.[0] ?? 'No items';
console.log(firstItem);  // 'No items'

// 4. 함수 호출
const api = {
  getData: () => ({ value: 42 })
};

const result = api?.getData?.() ?? { value: 0 };
console.log(result);  // { value: 42 }

const noApi = {};
const noResult = noApi?.getData?.() ?? { value: 0 };
console.log(noResult);  // { value: 0 }

console.log('조합 사용 완료');`}
        />

        <InfoCard type="tip" title="자주 쓰는 패턴">
          <ul>
            <li>
              <strong>API 응답:</strong> <code>response?.data?.value ?? defaultValue</code>
            </li>
            <li>
              <strong>설정 병합:</strong> <code>config?.option ?? defaultOption</code>
            </li>
            <li>
              <strong>배열 접근:</strong> <code>array?.[index] ?? fallback</code>
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="intl">4️⃣ Intl API</h2>
        <p>
          <strong>Intl API</strong> 는 국제화 (i18n) 를 위한 내장 객체입니다.
          날짜, 시간, 숫자, 통화 형식을 로케일에 맞게 표시합니다.
        </p>

        <CodeDemo
          title="Intl API"
          description="DateTimeFormat, NumberFormat, PluralRules"
          defaultCode={`// 1. 날짜/시간 형식
const date = new Date('2024-01-15T10:30:00');

// 한국식
const koDate = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
}).format(date);
console.log(koDate);  // '2024 년 1 월 15 일 월요일'

// 미국식
const usDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
}).format(date);
console.log(usDate);  // 'Monday, January 15, 2024'

// 2. 숫자 형식
const number = 1234567.89;

// 한국식
const koNum = new Intl.NumberFormat('ko-KR').format(number);
console.log(koNum);  // '1,234,567.89'

// 통화 형식
const koKRW = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW'
}).format(number);
console.log(koKRW);  // '₩1,234,568'

const usUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(number);
console.log(usUSD);  // '$1,234,567.89'

// 3. 상대적 시간
const relativeTime = new Intl.RelativeTimeFormat('ko-KR', {
  numeric: 'auto'
});
console.log(relativeTime.format(-1, 'day'));  // '어제'
console.log(relativeTime.format(3, 'day'));  // '3 일 후'

// 4. 복수 규칙
const pluralRules = new Intl.PluralRules('ko-KR');
console.log(pluralRules.select(0));  // 'other'
console.log(pluralRules.select(1));  // 'other' (한국어는 단복수 없음)

const enPlural = new Intl.PluralRules('en-US');
console.log(enPlural.select(1));  // 'one'
console.log(enPlural.select(2));  // 'other'

console.log('Intl API 완료');`}
        />

        <InfoCard type="tip" title="Intl API 활용">
          <ul>
            <li>
              <strong>DateTimeFormat:</strong> 날짜/시간 로케일 형식
            </li>
            <li>
              <strong>NumberFormat:</strong> 숫자, 통화, 백분율 형식
            </li>
            <li>
              <strong>RelativeTimeFormat:</strong> 상대적 시간 (어제, 내일)
            </li>
            <li>
              <strong>PluralRules:</strong> 복수 규칙 (영어: 1 book, 2 books)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="logical">5️⃣ 기타 현대 기능</h2>
        <p>
          추가로 알아두면 좋은 현대 JavaScript 기능들입니다.
        </p>

        <CodeDemo
          title="기타 현대 기능"
          description="Logical Assignment, Numeric Separators"
          defaultCode={`// 1. Logical Assignment Operators (ES2021)
let a = null;
let b = 'value';

// OR 할당 (||=)
a ||= 'default';  // a = a || 'default'
console.log(a);  // 'default'

b ||= 'default';
console.log(b);  // 'value' (변경 없음)

// AND 할당 (&&=)
let c = true;
let d = false;
c &&= 'yes';  // c = c && 'yes'
console.log(c);  // 'yes'
d &&= 'yes';
console.log(d);  // false

// Nullish 할당 (??=)
let e = null;
let f = 0;
e ??= 'default';  // e = e ?? 'default'
console.log(e);  // 'default'
f ??= 'default';
console.log(f);  // 0 (변경 없음)

// 2. Numeric Separators (ES2021)
const billion = 1_000_000_000;
console.log(billion);  // 1000000000

const bytes = 0xFF_FF_FF_FF;
console.log(bytes);  // 4294967295

const binary = 0b1010_0001;
console.log(binary);  // 161

// 3. Array.prototype.at() (ES2022)
const arr = ['a', 'b', 'c', 'd'];
console.log(arr.at(-1));  // 'd' (마지막 요소)
console.log(arr.at(-2));  // 'c' (뒤에서 두 번째)

// 4. Object.hasOwn() (ES2022)
const obj = { key: 'value' };
console.log(Object.hasOwn(obj, 'key'));  // true
console.log(Object.hasOwn(obj, 'toString'));  // false

console.log('현대 기능 완료');`}
        />

        <InfoCard type="tip" title="ES2021+ 기능">
          <ul>
            <li>
              <strong>Logical Assignment:</strong> ||=, &&=, ??=
            </li>
            <li>
              <strong>Numeric Separators:</strong> 1_000_000 (가독성)
            </li>
            <li>
              <strong>Array.at():</strong> 음수 인덱스 지원
            </li>
            <li>
              <strong>Object.hasOwn():</strong> 안전한 속성 확인
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Optional Chaining (?.):</strong> 안전한 중첩 접근
          </li>
          <li>
            <strong>Nullish Coalescing (??):</strong> null/undefined 기본값
          </li>
          <li>
            <strong>Intl API:</strong> 국제화 (날짜, 숫자, 통화)
          </li>
          <li>
            <strong>Logical Assignment:</strong> ||=, &&=, ??=
          </li>
          <li>
            <strong>Numeric Separators:</strong> 1_000_000 (가독성)
          </li>
          <li>
            <strong>Array.at():</strong> 음수 인덱스 지원
          </li>
        </ul>
      </section>
    </div>
  );
}
