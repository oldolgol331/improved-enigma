import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactPropsAdvanced() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>React Props 심화</h1>
        <p className="page-description">
          children prop, render props, 컴포저블 패턴 등 고급 Props 패턴에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          Props 는 React 컴포넌트의 핵심 개념입니다. 기본 prop 전달을 넘어
          <code>children</code>, <strong>render props</strong>, <strong>컴포저블 패턴</strong> 등을
          활용하면 더 유연하고 재사용 가능한 컴포넌트를 만들 수 있습니다.
        </p>

        <InfoCard type="tip" title="Props 복습">
          <ul>
            <li>
              <strong>Props:</strong> 부모 → 자식 데이터 전달 (불변)
            </li>
            <li>
              <strong>children:</strong> 컴포넌트 태그 사이에 있는 내용
            </li>
            <li>
              <strong>단방향 데이터 흐름:</strong> 부모 → 자식만 전달
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="children-prop">1️⃣ children prop</h2>
        <p>
          <code>children</code> 은 컴포넌트 태그 사이에 있는 JSX 요소를 전달받는 특별한 prop 입니다.
        </p>

        <CodeDemo
          title="children prop 기본 사용법"
          description="자식 요소를 전달하고 렌더링합니다"
          defaultCode={`// 1. 기본 children 사용
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// 사용 예시
// <Card>
//   <h2>제목</h2>
//   <p>내용입니다</p>
// </Card>

// 2. children 과 다른 props 함께 사용
function Button({ children, variant = 'primary', onClick }) {
  const className = \`btn btn-\${variant}\`;
  
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

// 사용 예시
// <Button variant="primary" onClick={handleClick}>
//   클릭하세요
// </Button>

// 3. children 이 없는 경우
function EmptyCard() {
  return (
    <div className="card">
      {/* children 이 없으면 아무것도 렌더링 안 됨 */}
    </div>
  );
}

// 4. 여러 children 요소 처리
function List({ children }) {
  return (
    <ul className="list">
      {children}
    </ul>
  );
}

function ListItem({ children }) {
  return (
    <li className="list-item">
      {children}
    </li>
  );
}

// 사용 예시
// <List>
//   <ListItem>아이템 1</ListItem>
//   <ListItem>아이템 2</ListItem>
//   <ListItem>아이템 3</ListItem>
// </List>

// 5. children 조작 (권장하지 않음 - 명시적 props 선호)
function Wrapper({ children }) {
  // children 을 배열로 처리
  const childArray = Array.isArray(children) ? children : [children];
  
  return (
    <div>
      {childArray.map((child, index) => (
        <div key={index} className="wrapped">
          {child}
        </div>
      ))}
    </div>
  );
}

console.log('children 예시 완료');`}
        />

        <InfoCard type="warning" title="children 조작 주의">
          <p>
            <code>children</code> 을 배열로 조작하는 것은 <strong>권장되지 않습니다</strong>.
            가능한 한 명시적인 props 를 사용하거나 컴포저블 패턴을 활용하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="conditional-children">2️⃣ 조건부 children 렌더링</h2>
        <p>
          children 이 존재하는지 확인하고 조건부로 렌더링합니다.
        </p>

        <CodeDemo
          title="조건부 children"
          description="children 존재 여부와 타입 확인"
          defaultCode={`import { isValidElement } from 'react';

// 1. children 존재 여부 확인
function ConditionalCard({ children }) {
  return (
    <div className="card">
      {children ? children : <p>내용이 없습니다</p>}
    </div>
  );
}

// 2. children 타입 확인
function SmartCard({ children, title }) {
  return (
    <div className="smart-card">
      {title && <h2 className="title">{title}</h2>}
      <div className="content">
        {isValidElement(children) ? children : <span>{children}</span>}
      </div>
    </div>
  );
}

// 3. children 이 함수인 경우 (render props 패턴)
function DataFetcher({ children, url }) {
  // 실제로는 useEffect 로 데이터 페칭
  const data = { id: 1, name: '샘플 데이터' };
  
  // children 이 함수이면 호출하여 데이터 전달
  if (typeof children === 'function') {
    return children(data);
  }
  
  return <div>{children}</div>;
}

// 사용 예시 (render props)
// <DataFetcher url="/api/data">
//   {(data) => (
//     <div>
//       <h3>{data.name}</h3>
//     </div>
//   )}
// </DataFetcher>

// 4. React.Children API 활용
import { Children, cloneElement } from 'react';

function EnhancedList({ children, highlight }) {
  return (
    <ul>
      {Children.map(children, (child) => {
        // 각 자식에 prop 추가
        if (isValidElement(child)) {
          return cloneElement(child, {
            highlighted: highlight,
          });
        }
        return child;
      })}
    </ul>
  );
}

// 5. React.Children.count
function TabContainer({ children }) {
  const tabCount = Children.count(children);
  
  return (
    <div>
      <div className="tab-header">
        총 {tabCount}개 탭
      </div>
      <div className="tab-content">
        {children}
      </div>
    </div>
  );
}

console.log('조건부 children 예시 완료');`}
        />

        <InfoCard type="tip" title="React.Children API">
          <ul>
            <li>
              <code>Children.map</code>: children 순회 (배열 자동 처리)
            </li>
            <li>
              <code>Children.forEach</code>: children 순회 (반환 없음)
            </li>
            <li>
              <code>Children.count</code>: children 개수
            </li>
            <li>
              <code>Children.only</code>: 단일 요소 확인
            </li>
            <li>
              <code>Children.toArray</code>: 배열로 변환
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="named-children">3️⃣ named children (여러 children 슬롯)</h2>
        <p>
          children 외에도 prop 이름을 사용해 여러 슬롯을 만들 수 있습니다.
        </p>

        <CodeDemo
          title="named children 패턴"
          description="여러 children 슬롯 활용"
          defaultCode={`// 1. 명시적 named children
function Card({ header, footer, children }) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">
        {children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// 사용 예시
// <Card
//   header={<h2>제목</h2>}
//   footer={<button>확인</button>}
// >
//   <p>본문 내용</p>
// </Card>

// 2. 객체로 여러 슬롯 관리
function Layout({ slots }) {
  return (
    <div className="layout">
      <header>{slots.header}</header>
      <nav>{slots.nav}</nav>
      <main>{slots.main}</main>
      <aside>{slots.aside}</aside>
      <footer>{slots.footer}</footer>
    </div>
  );
}

// 사용 예시
// <Layout slots={{
//   header: <Header />,
//   nav: <Navigation />,
//   main: <MainContent />,
//   aside: <Sidebar />,
//   footer: <Footer />
// }} />

// 3. children 을 객체로 (compound components)
const CardCompound = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  );
};

CardCompound.Header = ({ children }) => (
  <div className="card-header">{children}</div>
);

CardCompound.Body = ({ children }) => (
  <div className="card-body">{children}</div>
);

CardCompound.Footer = ({ children }) => (
  <div className="card-footer">{children}</div>
);

// 사용 예시
// <CardCompound>
//   <CardCompound.Header>
//     <h2>제목</h2>
//   </CardCompound.Header>
//   <CardCompound.Body>
//     <p>본문 내용</p>
//   </CardCompound.Body>
//   <CardCompound.Footer>
//     <button>확인</button>
//   </CardCompound.Footer>
// </CardCompound>

console.log('named children 예시 완료');`}
        />

        <InfoCard type="tip" title="Compound Components 패턴">
          <p>
            <strong>Compound Components</strong> 는 React 의 강력한 패턴으로,
            컴포넌트 간 암묵적 상태 공유와 유연한 조합을 가능하게 합니다.
            (예: <code>&lt;Select&gt;</code>, <code>&lt;Option&gt;</code>)
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="render-props">4️⃣ render props 패턴</h2>
        <p>
          <strong>render props</strong> 는 함수인 prop 을 통해 컴포넌트 로직을 공유하는 패턴입니다.
        </p>

        <CodeDemo
          title="render props 패턴"
          description="함수 prop 으로 로직 공유"
          defaultCode={`// 1. 기본 render props
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {/* render prop: children 이 함수 */}
        {this.props.children(this.state)}
      </div>
    );
  }
}

// 사용 예시
// <MouseTracker>
//   {({ x, y }) => (
//     <div>
//       <h1>마우스 위치: ({x}, {y})</h1>
//     </div>
//   )}
// </MouseTracker>

// 2. render prop 이름 명시 (children 대신)
function DataProvider({ render, url }) {
  // 실제로는 useEffect 로 데이터 페칭
  const data = { id: 1, title: '샘플' };
  const loading = false;
  const error = null;

  if (loading) return render({ loading: true });
  if (error) return render({ error });
  
  return render({ data });
}

// 사용 예시
// <DataProvider
//   url="/api/data"
//   render={({ data, loading, error }) => {
//     if (loading) return <div>로딩 중...</div>;
//     if (error) return <div>에러: {error}</div>;
//     return <div>{data.title}</div>;
//   }}
// />

// 3. Hooks 로 대체 (현대적 접근)
function useMousePosition() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return position;
}

// Hooks 사용 (더 간단)
// function MouseDisplay() {
//   const { x, y } = useMousePosition();
//   return <div>마우스: ({x}, {y})</div>;
// }

console.log('render props 예시 완료');`}
        />

        <InfoCard type="tip" title="render props vs Hooks">
          <p>
            Hooks 등장 이후 render props 패턴은 <strong>상대적으로 덜 사용</strong>됩니다.
            Hooks 가 더 간결하고 재사용성도 뛰어나기 때문입니다.
            하지만 여전히 라이브러리 API 등에서는 유용하게 쓰입니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="function-as-child">5️⃣ Function as Child Components (FaCC)</h2>
        <p>
          children 이 함수인 패턴으로, render props 와 유사합니다.
        </p>

        <CodeDemo
          title="Function as Child"
          description="children 함수를 활용한 유연한 컴포넌트"
          defaultCode={`// 1. 기본 FaCC 패턴
function Counter({ children }) {
  const [count, setCount] = React.useState(0);

  return children({
    count,
    increment: () => setCount(count + 1),
    decrement: () => setCount(count - 1),
  });
}

// 사용 예시
// <Counter>
//   {({ count, increment, decrement }) => (
//     <div>
//       <p>카운트: {count}</p>
//       <button onClick={increment}>+</button>
//       <button onClick={decrement}>-</button>
//     </div>
//   )}
// </Counter>

// 2. 조건부 로직 위임
function AuthCheck({ children, user }) {
  if (!user) {
    return children({ isAuthenticated: false, user: null });
  }

  return children({ isAuthenticated: true, user });
}

// 사용 예시
// <AuthCheck user={currentUser}>
//   {({ isAuthenticated, user }) => {
//     if (!isAuthenticated) {
//       return <LoginPrompt />;
//     }
//     return <UserProfile user={user} />;
//   }}
// </AuthCheck>

// 3. 다중 콜백 처리
function AsyncOperation({ children, operation }) {
  const [state, setState] = React.useState({
    loading: false,
    data: null,
    error: null,
  });

  const execute = async () => {
    setState({ loading: true, data: null, error: null });
    try {
      const result = await operation();
      setState({ loading: false, data: result });
    } catch (err) {
      setState({ loading: false, error: err });
    }
  };

  return children({ ...state, execute });
}

// 사용 예시
// <AsyncOperation operation={() => fetch('/api/data')}>
//   {({ loading, data, error, execute }) => (
//     <div>
//       {loading && <div>로딩 중...</div>}
//       {error && <div>에러: {error.message}</div>}
//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//       <button onClick={execute} disabled={loading}>
//         데이터 가져오기
//       </button>
//     </div>
//   )}
// </AsyncOperation>

console.log('FaCC 예시 완료');`}
        />
      </section>

      <section className="content-section">
        <h2 id="props-destructuring">6️⃣ Props 구조분해할당과 기본값</h2>
        <p>
          props 를 깔끔하게 처리하는 패턴입니다.
        </p>

        <CodeDemo
          title="Props 구조분해할당"
          description="props 인자와 기본값 설정"
          defaultCode={`// 1. 기본 구조분해할당
function Card({ title, description, imageUrl }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <img src={imageUrl} alt={title} />
    </div>
  );
}

// 2. 기본값 (default parameters)
function Button({
  children,
  variant = 'primary',      // 기본값: 'primary'
  size = 'medium',          // 기본값: 'medium'
  disabled = false,         // 기본값: false
  onClick,
}) {
  const className = \`btn btn-\${variant} btn-\${size}\`;
  
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// 3. defaultProps (클래스 컴포넌트, 레거시)
// class Greeting extends React.Component {
//   static defaultProps = {
//     name: 'Guest',
//     greeting: 'Hello',
//   };
//
//   render() {
//     const { name, greeting } = this.props;
//     return <h1>{greeting}, {name}!</h1>;
//   }
// }

// 4. 함수형 컴포넌트 기본값 (권장)
function Greeting({ name = 'Guest', greeting = 'Hello' }) {
  return <h1>{greeting}, {name}!</h1>;
}

// 5. 나머지 props (rest props)
function Input({ label, error, ...restProps }) {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <input {...restProps} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// 사용 예시
// <Input
//   label="이름"
//   error="필수 입력 항목입니다"
//   type="text"
//   placeholder="이름을 입력하세요"
//   disabled={false}
// />

// 6. props 타입 가드 (TypeScript 아님)
function Avatar({ src, alt, size = 40 }) {
  // src 검증
  if (typeof src !== 'string' || !src) {
    return <div className="avatar-placeholder">{alt?.[0]}</div>;
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="avatar"
    />
  );
}

console.log('props 구조분해 예시 완료');`}
        />

        <InfoCard type="tip" title="TypeScript 와 props">
          <p>
            TypeScript 를 사용하면 <strong>인터페이스로 props 타입을 정의</strong>하고,
            기본값을 더 안전하게 처리할 수 있습니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="prop-drilling">7️⃣ prop drilling 과 해결책</h2>
        <p>
          깊은 컴포넌트 트리에 props 를 전달하는 문제와 해결 방법을 알아봅니다.
        </p>

        <CodeDemo
          title="prop drilling 문제와 해결"
          description="Context 와 컴포저블 패턴"
          defaultCode={`// 1. prop drilling 문제
function App() {
  const user = { name: '홍길동', theme: 'dark' };
  
  return (
    <Layout user={user} theme={user.theme}>
      <Header user={user} theme={user.theme}>
        <UserProfile user={user} theme={user.theme} />
      </Header>
    </Layout>
  );
}
// 문제: theme 이 모든 컴포넌트를 통과해야 함

// 2. Context 로 해결
const ThemeContext = React.createContext('light');
const UserContext = React.createContext(null);

function AppWithContext() {
  const user = { name: '홍길동' };
  const theme = 'dark';
  
  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={user}>
        <Layout>
          <Header>
            <UserProfile />
          </Header>
        </Layout>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// 사용 측
// function UserProfile() {
//   const theme = React.useContext(ThemeContext);
//   const user = React.useContext(UserContext);
//   return <div>{user.name} - {theme}</div>;
// }

// 3. 컴포저블 패턴으로 해결
function AppComposable() {
  const user = { name: '홍길동' };
  
  return (
    <Layout>
      <Header user={user}>
        <UserProfile user={user} />
      </Header>
    </Layout>
  );
}

function Layout({ children }) {
  return <div className="layout">{children}</div>;
}

function Header({ user, children }) {
  return (
    <header>
      <span>{user.name}</span>
      {children}
    </header>
  );
}

function UserProfile({ user }) {
  return <div>{user.name}</div>;
}

// 4. custom hook 으로 해결
function useUser() {
  // 실제로는 Context 에서 가져옴
  return { name: '홍길동', theme: 'dark' };
}

function AppWithHooks() {
  return (
    <Layout>
      <Header />
      <UserProfile />
    </Layout>
  );
}

function UserProfile() {
  const { name, theme } = useUser();
  return <div>{name} - {theme}</div>;
}

console.log('prop drilling 예시 완료');`}
        />

        <InfoCard type="tip" title="prop drilling 해결 전략">
          <ol>
            <li>
              <strong>컴포저블 패턴:</strong> children 활용 (단순한 경우)
            </li>
            <li>
              <strong>Context:</strong> 전역 상태 (테마, 인증 등)
            </li>
            <li>
              <strong>상태 관리 라이브러리:</strong> Zustand, Redux (복잡한 상태)
            </li>
            <li>
              <strong>Custom Hooks:</strong> 로직 추상화
            </li>
          </ol>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>children:</strong> 컴포넌트 태그 사이의 JSX 요소
          </li>
          <li>
            <strong>조건부 children:</strong> 존재 여부와 타입 확인
          </li>
          <li>
            <strong>named children:</strong> 여러 슬롯, compound components
          </li>
          <li>
            <strong>render props:</strong> 함수 prop 으로 로직 공유
          </li>
          <li>
            <strong>FaCC:</strong> Function as Child Components
          </li>
          <li>
            <strong>props 구조분해:</strong> 기본값, rest props
          </li>
          <li>
            <strong>prop drilling:</strong> Context, 컴포저블 패턴으로 해결
          </li>
        </ul>
      </section>
    </div>
  );
}