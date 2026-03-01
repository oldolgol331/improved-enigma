import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function Conditionals() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>조건문 (Conditionals)</h1>
        <p className="page-description">
          JavaScript 의 조건문과 조건부 렌더링 패턴에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          조건문은 프로그램의 실행 흐름을 제어하는 기본 구조입니다. JavaScript 는{' '}
          <code>if-else</code>, <code>switch</code>, 그리고 삼항 연산자를 지원합니다.
        </p>
      </section>

      <section className="content-section">
        <h2 id="if-else">1️⃣ if-else 문</h2>
        <p>가장 기본적인 조건문으로, 조건이 참일 때와 거짓일 때의 실행 경로를 나눕니다.</p>

        <CodeDemo
          title="if-else 문"
          description="기본적인 조건문 구조입니다."
          defaultCode={`const score = 85;

if (score >= 90) {
  console.log('등급: A');
} else if (score >= 80) {
  console.log('등급: B');
} else if (score >= 70) {
  console.log('등급: C');
} else {
  console.log('등급: D');
}

// 불리언 조건
const isLoggedIn = true;
if (isLoggedIn) {
  console.log('환영합니다!');
} else {
  console.log('로그인이 필요합니다.');
}

// falsy 값 확인
const emptyArray = [];
if (emptyArray.length === 0) {
  console.log('배열이 비었습니다');
}

// truthy/falsy 활용
const name = '';
if (!name) {
  console.log('이름을 입력해주세요');
}`}
        />
      </section>

      <section className="content-section">
        <h2 id="switch">2️⃣ switch 문</h2>
        <p>
          여러 경우 중 하나를 선택할 때 사용합니다. <code>break</code> 를 잊지 마세요!
        </p>

        <InfoCard type="warning" title="break 문 주의">
          <p>
            <code>break</code> 를忘记하면 다음 case 로 fall-through 됩니다. 의도적인 경우가 아니라면
            항상 <code>break</code> 를 추가하세요.
          </p>
        </InfoCard>

        <CodeDemo
          title="switch 문"
          description="여러 경우를 처리하는 switch 문입니다."
          defaultCode={`const day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = '월요일';
    break;
  case 2:
    dayName = '화요일';
    break;
  case 3:
    dayName = '수요일';
    break;
  case 4:
    dayName = '목요일';
    break;
  case 5:
    dayName = '금요일';
    break;
  case 6:
  case 7:
    dayName = '주말';
    break;
  default:
    dayName = '잘못된 값';
}

console.log(dayName); // 수요일

// 문자열 switch
const fruit = 'apple';
switch (fruit) {
  case 'apple':
    console.log('사과: 1000 원');
    break;
  case 'banana':
    console.log('바나나: 500 원');
    break;
  default:
    console.log('재고 없음');
}`}
        />
      </section>

      <section className="content-section">
        <h2 id="ternary">3️⃣ 삼항 연산자</h2>
        <p>간단한 조건부 표현에 사용합니다. React 에서 조건부 렌더링 시 자주 활용됩니다.</p>

        <CodeDemo
          title="삼항 연산자"
          description="간결한 조건부 표현입니다."
          defaultCode={`const age = 20;

// if-else 를 삼항으로
const canVote = age >= 18 ? '투표 가능' : '투표 불가';
console.log(canVote);

// 중첩 삼항 (복잡하면 if-else 권장)
const score = 85;
const grade = score >= 90 ? 'A' 
            : score >= 80 ? 'B' 
            : score >= 70 ? 'C' 
            : 'D';
console.log('grade:', grade);

// React 스타일 조건부 렌더링
const isLoggedIn = true;
const buttonColor = isLoggedIn ? 'blue' : 'gray';
console.log('button color:', buttonColor);

// 단축 평가와 조합
const user = null;
const userName = user ? user.name : 'Guest';
console.log(userName); // Guest`}
        />
      </section>

      <section className="content-section">
        <h2 id="logical">4️⃣ 논리 연산자를 활용한 조건부</h2>
        <p>
          <code>&&</code> 와 <code>||</code> 를 활용해 간결하게 조건을 처리할 수 있습니다.
        </p>

        <CodeDemo
          title="논리 연산자 조건부"
          description="단축 평가를 활용한 조건부 처리입니다."
          defaultCode={`// && 연산자: 조건이 참일 때만 실행
const isLoggedIn = true;
isLoggedIn && console.log('로그인 상태입니다');

// React 에서의 활용
const hasPermission = true;
const showButton = hasPermission && <button>삭제</button>;
console.log('showButton:', showButton);

// || 연산자: 기본값 제공
const userName = '';
const displayName = userName || 'Guest';
console.log(displayName); // Guest

// ?? 연산자: null/undefined 일 때만 기본값
const count = 0;
const displayCount = count ?? 10;
console.log(displayCount); // 0 (0 도 유효한 값!)

// 복합 조건
const age = 25;
const hasId = true;
const canEnter = age >= 20 && hasId;
console.log('canEnter:', canEnter); // true`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <code>if-else</code>: 기본적인 조건 분기
            </li>
            <li>
              <code>switch</code>: 여러 경우 중 선택 (break 주의!)
            </li>
            <li>삼항 연산자: 간단한 조건부 표현, React 에서 자주 사용</li>
            <li>
              <code>&&</code>: 조건이 참일 때만 실행
            </li>
            <li>
              <code>||</code>: 첫 번째 truthy 값 또는 기본값
            </li>
            <li>
              <code>??</code>: null/undefined 일 때만 기본값
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
