import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactComponents() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>React 컴포넌트</h1>
        <p className="page-description">React 컴포넌트의 구조와 작성법에 대해 학습합니다.</p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>컴포넌트</strong> 는 React 의 기본 빌딩 블록입니다. UI 를 독립적이고 재사용 가능한
          조각으로 나눕니다.
        </p>

        <InfoCard type="tip" title="함수형 vs 클래스형 컴포넌트">
          <p>
            <strong>함수형 컴포넌트</strong>: 현대 React 표준, Hooks 사용
            <br />
            <strong>클래스형 컴포넌트</strong>: 레거시, lifecycle 메서드 사용
            <br />
            <strong>새 프로젝트는 항상 함수형 컴포넌트를 사용하세요!</strong>
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="function-component">1️⃣ 함수형 컴포넌트</h2>
        <p>JavaScript 함수로 컴포넌트를 정의합니다.</p>

        <CodeDemo
          title="함수형 컴포넌트"
          description="함수로 컴포넌트를 정의합니다."
          defaultCode={`// 기본 함수형 컴포넌트
function Welcome() {
  return <h1>Hello, React!</h1>;
}

// 화살표 함수 컴포넌트
const Greeting = () => {
  return <h2>Hi there!</h2>;
};

// JSX 반환
function Profile() {
  const name = 'Alice';
  const age = 25;
  
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
    </div>
  );
}

// 컴포넌트 합성
function App() {
  return (
    <div>
      <Welcome />
      <Greeting />
      <Profile />
    </div>
  );
}

// 암시적 반환 (소괄호 사용)
const Card = () => (
  <div className="card">
    <h3>Card Title</h3>
    <p>Card content</p>
  </div>
);

console.log('Functional components defined');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="props">2️⃣ Props 심화</h2>
        <p>Props 를 활용한 컴포넌트 통신을 자세히 학습합니다.</p>

        <CodeDemo
          title="Props 심화"
          description="다양한 Props 패턴입니다."
          defaultCode={`// 구조 분해 할당
function UserCard({ name, age, email }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

// 나머지 props (rest props)
function Button(props) {
  return <button {...props}>Click</button>;
}

// 사용 예시:
// <Button className="btn" onClick={handleClick} disabled />

// children props
function Container({ children }) {
  return <div className="container">{children}</div>;
}

// 사용:
// <Container>
//   <h1>Title</h1>
//   <p>Content</p>
// </Container>

// 기본값 (default values)
function Greeting({ name = 'Guest', count = 0 }) {
  return (
    <div>
      <p>Hello, {name}!</p>
      <p>Count: {count}</p>
    </div>
  );
}

// defaultProps (클래스형에서 주로 사용)
// Greeting.defaultProps = {
//   name: 'Guest',
//   count: 0
// };

// children 과 함께 사용
function Card({ title, children, footer }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="content">{children}</div>
      {footer && <div className="footer">{footer}</div>}
    </div>
  );
}

// 사용:
// <Card title="My Card" footer={<button>Actions</button>}>
//   <p>Card content here</p>
// </Card>

console.log('Props patterns explained');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="prop-types">3️⃣ Props 타입 지정</h2>
        <p>TypeScript 로 Props 의 타입을 안전하게 지정합니다.</p>

        <InfoCard type="tip" title="TypeScript 와 React">
          <p>
            TypeScript 를 사용하면 Props 타입을 컴파일 시점에 체크할 수 있습니다.
            <br />
            <code>interface</code> 또는 <code>type</code> 을 사용하세요.
          </p>
        </InfoCard>

        <CodeDemo
          title="Props 타입 지정"
          description="TypeScript 로 Props 를 타입 안전하게."
          defaultCode={`// TypeScript 예시 (개념)

// interface 로 Props 정의
interface UserCardProps {
  name: string;
  age: number;
  email?: string;  // 선택적
  onClick?: () => void;  // 콜백
}

// 컴포넌트 정의
function UserCard({ name, age, email, onClick }: UserCardProps) {
  return (
    <div onClick={onClick}>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      {email && <p>Email: {email}</p>}
    </div>
  );
}

// type 으로 Props 정의
type ButtonProps = {
  label: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  children?: React.ReactNode;
};

function Button({ 
  label, 
  disabled = false, 
  variant = 'primary',
  children 
}: ButtonProps) {
  return (
    <button disabled={disabled} className={\`btn-\${variant}\`}>
      {children || label}
    </button>
  );
}

// React.FC (함수 컴포넌트 타입)
type GreetingProps = {
  name: string;
};

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

// React.ReactNode (자식 노드 타입)
type ContainerProps = {
  children: React.ReactNode;
};

function Container({ children }: ContainerProps) {
  return <div>{children}</div>;
}

console.log('Props typing with TypeScript');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="composition">4️⃣ 컴포넌트 합성</h2>
        <p>컴포넌트를 조합하여 복잡한 UI 를 만듭니다.</p>

        <CodeDemo
          title="컴포넌트 합성"
          description="컴포넌트를 조합하여 UI 를 구축합니다."
          defaultCode={`// 레이아웃 컴포넌트
function Header() {
  return <header><h1>My App</h1></header>;
}

function Sidebar() {
  return <aside><nav>Sidebar</nav></aside>;
}

function Footer() {
  return <footer><p>© 2024</p></footer>;
}

// 레이아웃 합성
function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        <Sidebar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}

// 사용:
// <Layout>
//   <Dashboard />
// </Layout>

// 고차 컴포넌트 (HOC) 패턴
function withLogging(WrappedComponent) {
  return function LoggedComponent(props) {
    console.log('Rendering', WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };
}

// 사용:
// const LoggedButton = withLogging(Button);

// 렌더링 props 패턴
function MouseTracker({ render }) {
  // 마우스 위치 추적 로직
  const position = { x: 0, y: 0 };
  return render(position);
}

// 사용:
// <MouseTracker render={({ x, y }) => (
//   <p>Mouse at: {x}, {y}</p>
// )} />

console.log('Component composition patterns');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="best-practices">5️⃣ 모범 사례</h2>
        <p>React 컴포넌트 작성 시 권장되는 패턴입니다.</p>

        <InfoCard type="warning" title="컴포넌트 설계 원칙">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>단일 책임</strong>: 하나의 역할만 수행
            </li>
            <li>
              <strong>작은 크기</strong>: 200 줄 이내 권장
            </li>
            <li>
              <strong>명확한 이름</strong>: 의도가 드러나는 네이밍
            </li>
            <li>
              <strong>Props 최소화</strong>: 5 개 이하 권장
            </li>
          </ul>
        </InfoCard>

        <CodeDemo
          title="모범 사례"
          description="React 컴포넌트 작성 모범 사례입니다."
          defaultCode={`// 1. 작은 컴포넌트로 분리
// ❌ 나쁜 예
function BadProfile({ user }) {
  return (
    <div>
      <div className="header">
        <img src={user.avatar} alt={user.name} />
        <h2>{user.name}</h2>
      </div>
      <div className="info">
        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
      </div>
      <div className="actions">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

// ✅ 좋은 예
function Avatar({ src, alt }) {
  return <img src={src} alt={alt} />;
}

function UserInfo({ user }) {
  return (
    <div>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

function UserActions() {
  return (
    <div>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}

function GoodProfile({ user }) {
  return (
    <div>
      <div className="header">
        <Avatar src={user.avatar} alt={user.name} />
        <h2>{user.name}</h2>
      </div>
      <UserInfo user={user} />
      <UserActions />
    </div>
  );
}

// 2. 커스텀 Hooks 로 로직 분리
// useUser Hook 으로 사용자 로직 분리
// const { user, loading, error } = useUser(userId);

// 3. 메모이제이션 활용
// const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);
// const memoizedCallback = useCallback(() => doSomething(id), [id]);

console.log('Component best practices');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>함수형 컴포넌트: 현대 React 표준</li>
            <li>Props: 구조 분해 할당, children, rest props</li>
            <li>TypeScript: Props 인터페이스 정의</li>
            <li>컴포넌트 합성: 레이아웃, HOC, render props</li>
            <li>모범 사례: 작은 컴포넌트, 단일 책임, Hooks 활용</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
