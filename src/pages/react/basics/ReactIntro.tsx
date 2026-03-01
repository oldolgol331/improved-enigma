import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactIntro() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>React 소개</h1>
        <p className="page-description">React 의 기본 개념과 특징에 대해 학습합니다.</p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>React</strong> 는 Meta(Facebook) 에서 개발한 <strong>UI 라이브러리</strong>입니다.
          컴포넌트 기반 아키텍처로 재사용 가능한 UI 를 구축할 수 있습니다.
        </p>

        <InfoCard type="tip" title="React 의 핵심 개념">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>컴포넌트 (Component)</strong>: 재사용 가능한 UI 조각
            </li>
            <li>
              <strong>JSX</strong>: JavaScript + XML 문법
            </li>
            <li>
              <strong>Props</strong>: 컴포넌트에 데이터 전달
            </li>
            <li>
              <strong>State</strong>: 컴포넌트 내부 상태
            </li>
            <li>
              <strong>Virtual DOM</strong>: 효율적인 렌더링
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="jsx">1️⃣ JSX (JavaScript XML)</h2>
        <p>JSX 는 JavaScript 안에서 HTML 을 작성할 수 있게 하는 문법 확장입니다.</p>

        <InfoCard type="warning" title="JSX 주의사항">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <code>class</code> 대신 <code>className</code> 사용
            </li>
            <li>
              인라인 스타일은 객체 형태 (<code>style=&#123;&#123; color: 'red' &#125;&#125;</code>)
            </li>
            <li>
              태그는 반드시 닫아야 함 (<code>&lt;img /&gt;</code>)
            </li>
            <li>
              루트 엘리먼트는 하나여야 함 (또는 <code>&lt;&gt;&lt;/&gt;</code> Fragment)
            </li>
          </ul>
        </InfoCard>

        <CodeDemo
          title="JSX 기본"
          description="JSX 문법과 규칙을 확인해보세요."
          defaultCode={`// JSX 예시 (React 코드 개념)
// 실제 실행은 React 환경에서 가능합니다

// 1. 변수 사용
const name = 'Alice';
const element = <h1>Hello, {name}!</h1>;

// 2. 표현식 사용
const count = 5;
const message = count >= 5 ? '5 이상' : '5 미만';

// 3. className 사용 (class 아님!)
const divElement = <div className="container">Content</div>;

// 4. 인라인 스타일
const styleElement = (
  <div style={{ color: 'red', fontSize: '20px' }}>
    Styled Text
  </div>
);

// 5. Fragment (불필요한 div 방지)
const fragment = (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
);

// 6. 주석
const withComment = (
  <div>
    {/* JSX 내 주석은 중괄호 안에 */}
    <span>Content</span>
  </div>
);

console.log('JSX elements created successfully');
console.log('element:', element);
console.log('message:', message);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="components">2️⃣ 컴포넌트 (Components)</h2>
        <p>React 의 기본 빌딩 블록입니다. 함수형 컴포넌트를 사용합니다.</p>

        <CodeDemo
          title="컴포넌트 기본"
          description="함수형 컴포넌트를 정의하고 사용합니다."
          defaultCode={`// 함수형 컴포넌트 정의
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// 화살표 함수 컴포넌트
const Greeting = (props) => {
  return <h2>Hi, {props.name}!</h2>;
};

// 컴포넌트 사용 (JSX)
// <Welcome name="Alice" />
// <Greeting name="Bob" />

// 중첩 컴포넌트
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}

// 컴포넌트 조합
function Header() {
  return <header><h1>My App</h1></header>;
}

function Footer() {
  return <footer><p>© 2024</p></footer>;
}

function Layout() {
  return (
    <>
      <Header />
      <main>Content</main>
      <Footer />
    </>
  );
}

console.log('Components defined successfully');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="props">3️⃣ Props</h2>
        <p>부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달합니다.</p>

        <InfoCard type="tip" title="Props 특징">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>읽기 전용</strong>: props 는 수정 불가 (immutable)
            </li>
            <li>
              <strong>단방향 데이터 흐름</strong>: 부모 → 자식
            </li>
            <li>
              <strong>구조 분해</strong>: <code>{`{ name, age }`}</code> 로 추출
            </li>
          </ul>
        </InfoCard>

        <CodeDemo
          title="Props"
          description="컴포넌트에 데이터를 전달합니다."
          defaultCode={`// Props 받는 컴포넌트
function UserCard(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>Age: {props.age}</p>
      <p>Email: {props.email}</p>
    </div>
  );
}

// 구조 분해 할당 사용 (권장)
function UserCardDestructured({ name, age, email }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

// 기본값 설정
function Greeting({ name = 'Guest' }) {
  return <h1>Hello, {name}!</h1>;
}

// children props
function Container({ children }) {
  return <div className="container">{children}</div>;
}

// 사용 예시 (JSX)
// <UserCard name="Alice" age={25} email="alice@example.com" />
// <UserCardDestructured name="Bob" age={30} email="bob@example.com" />
// <Greeting />  // Hello, Guest!
// <Greeting name="Charlie" />  // Hello, Charlie!

// children 사용
// <Container>
//   <UserCard name="Alice" age={25} email="alice@example.com" />
// </Container>

console.log('Props examples completed');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="state">4️⃣ State</h2>
        <p>
          컴포넌트의 내부 상태입니다. <code>useState</code> Hook 으로 관리합니다.
        </p>

        <CodeDemo
          title="State 기본"
          description="useState 로 상태를 관리합니다."
          defaultCode={`// useState Hook (개념 예시)
// import { useState } from 'react';

// 카운터 컴포넌트
// function Counter() {
//   const [count, setCount] = useState(0);
//   
//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>
//         Increment
//       </button>
//     </div>
//   );
// }

// 상태 업데이트 패턴
// function StateExample() {
//   const [value, setValue] = useState(0);
//   
//   // 직접 업데이트
//   const increment = () => setValue(value + 1);
//   
//   // 함수형 업데이트 (권장 - 이전 상태 기반)
//   const incrementSafe = () => setValue(prev => prev + 1);
//   
//   // 객체 상태
//   const [user, setUser] = useState({ name: 'Alice', age: 25 });
//   
//   // 객체 업데이트 (전체 교체)
//   const updateName = () => {
//     setUser({ ...user, name: 'Bob' });
//   };
//   
//   return <div>State Example</div>;
// }

// 배열 상태
// function ListExample() {
//   const [items, setItems] = useState([]);
//   
//   // 항목 추가
//   const addItem = (item) => {
//     setItems([...items, item]);
//   };
//   
//   // 항목 제거
//   const removeItem = (index) => {
//     setItems(items.filter((_, i) => i !== index));
//   };
//   
//   return <div>List Example</div>;
// }

console.log('State concepts explained');
console.log('useState returns: [currentState, setStateFunction]');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="events">5️⃣ 이벤트 핸들링</h2>
        <p>React 의 이벤트 시스템은 브라우저의 네이티브 이벤트와 유사합니다.</p>

        <CodeDemo
          title="이벤트 핸들링"
          description="React 에서 이벤트를 처리합니다."
          defaultCode={`// 이벤트 핸들러 예시
// function EventExample() {
//   // 클릭 이벤트
//   const handleClick = (event) => {
//     console.log('Clicked!', event);
//   };
//   
//   // 변경 이벤트
//   const handleChange = (event) => {
//     console.log('Input:', event.target.value);
//   };
//   
//   // 제출 이벤트
//   const handleSubmit = (event) => {
//     event.preventDefault(); // 폼 제출 기본 동작 방지
//     console.log('Form submitted');
//   };
//   
//   return (
//     <div>
//       <button onClick={handleClick}>Click</button>
//       <input onChange={handleChange} />
//       <form onSubmit={handleSubmit}>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// 인라인 이벤트 핸들러
// function InlineExample() {
//   return (
//     <button onClick={() => console.log('Clicked!')}>
//       Click
//     </button>
//   );
// }

// 이벤트 객체 주요 속성
// event.target: 이벤트를 발생시킨 요소
// event.currentTarget: 이벤트 핸들러가 attached 된 요소
// event.preventDefault(): 기본 동작 방지
// event.stopPropagation(): 이벤트 전파 중지

console.log('Event handling concepts explained');
console.log('React events are camelCase: onClick, onChange, onSubmit');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="conditional">6️⃣ 조건부 렌더링</h2>
        <p>조건에 따라 다른 UI 를 렌더링합니다.</p>

        <CodeDemo
          title="조건부 렌더링"
          description="조건에 따라 다른 요소를 렌더링합니다."
          defaultCode={`// if 문 사용
// function IfExample({ isLoggedIn }) {
//   if (isLoggedIn) {
//     return <h1>Welcome back!</h1>;
//   }
//   return <h1>Please log in.</h1>;
// }

// 삼항 연산자 (자주 사용)
// function TernaryExample({ isLoggedIn }) {
//   return (
//     <div>
//       {isLoggedIn ? (
//         <h1>Welcome back!</h1>
//       ) : (
//         <h1>Please log in.</h1>
//       )}
//     </div>
//   );
// }

// && 연산자 (조건이 참일 때만 렌더링)
// function AndExample({ showMessage, message }) {
//   return (
//     <div>
//       {showMessage && <p>{message}</p>}
//     </div>
//   );
// }

// switch 문
// function SwitchExample({ status }) {
//   switch (status) {
//     case 'loading':
//       return <div>Loading...</div>;
//     case 'success':
//       return <div>Success!</div>;
//     case 'error':
//       return <div>Error occurred</div>;
//     default:
//       return <div>Unknown</div>;
//   }
// }

// 객체 매핑 (고급)
// function ObjectMappingExample({ status }) {
//   const statusComponents = {
//     loading: <div>Loading...</div>,
//     success: <div>Success!</div>,
//     error: <div>Error occurred</div>
//   };
//   return statusComponents[status] || <div>Unknown</div>;
// }

console.log('Conditional rendering patterns explained');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="lists">7️⃣ 리스트 렌더링</h2>
        <p>
          배열을 순회하며 요소를 렌더링합니다. <code>key</code> prop 이 필수입니다.
        </p>

        <InfoCard type="warning" title="key prop">
          <p>
            <code>key</code> 는 React 가 어떤 항목이 변경/추가/제거되었는지 식별하는 데 사용합니다.
            <br />
            <strong>고유하고 안정적인 값</strong>을 사용하세요 (인덱스는 피하세요).
          </p>
        </InfoCard>

        <CodeDemo
          title="리스트 렌더링"
          description="배열을 순회하며 요소를 렌더링합니다."
          defaultCode={`// map 으로 리스트 렌더링
// function ListExample() {
//   const items = ['Apple', 'Banana', 'Orange'];
//   
//   return (
//     <ul>
//       {items.map((item, index) => (
//         <li key={index}>{item}</li>
//       ))}
//     </ul>
//   );
// }

// 객체 배열 렌더링
// function UserList() {
//   const users = [
//     { id: 1, name: 'Alice' },
//     { id: 2, name: 'Bob' },
//     { id: 3, name: 'Charlie' }
//   ];
//   
//   return (
//     <ul>
//       {users.map((user) => (
//         <li key={user.id}>{user.name}</li>
//       ))}
//     </ul>
//   );
// }

// Fragment 와 리스트
// function TableExample() {
//   const items = [
//     { id: 1, name: 'Item 1', price: 100 },
//     { id: 2, name: 'Item 2', price: 200 }
//   ];
//   
//   return (
//     <table>
//       <tbody>
//         {items.map((item) => (
//           <tr key={item.id}>
//             <td>{item.name}</td>
//             <td>{item.price}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// 빈 배열 처리
// function EmptyList() {
//   const items = [];
//   
//   return (
//     <div>
//       {items.length === 0 ? (
//         <p>No items found.</p>
//       ) : (
//         <ul>
//           {items.map((item) => (
//             <li key={item.id}>{item.name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

console.log('List rendering with key prop explained');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              JSX: JavaScript + XML, <code>className</code>, 인라인 스타일
            </li>
            <li>컴포넌트: 함수형 컴포넌트 사용, 재사용 가능한 UI</li>
            <li>Props: 부모 → 자식 데이터 전달, 읽기 전용</li>
            <li>
              State: <code>useState</code> Hook 으로 관리, 내부 상태
            </li>
            <li>
              이벤트: camelCase (<code>onClick</code>, <code>onChange</code>)
            </li>
            <li>
              조건부 렌더링: 삼항 연산자, <code>&&</code> 연산자
            </li>
            <li>
              리스트: <code>map()</code> 으로 렌더링, <code>key</code> 필수
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
