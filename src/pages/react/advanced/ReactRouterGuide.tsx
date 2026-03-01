import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactRouterGuide() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>React Router</h1>
        <p className="page-description">
          React Router v6 를 사용한 클라이언트 사이드 라우팅에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>React Router</strong> 는 React 애플리케이션에 라우팅 기능을 추가하는 표준 라이브러리입니다.
          v6 에서는 API 가 대폭 개선되어 더 직관적이고 사용하기 쉬워졌습니다.
        </p>

        <InfoCard type="tip" title="React Router v6 특징">
          <ul>
            <li>
              <strong>간단한 API:</strong> <code>&lt;Routes&gt;</code>, <code>&lt;Route&gt;</code>
            </li>
            <li>
              <strong>상대 경로:</strong> 중첩 라우트 자동 처리
            </li>
            <li>
              <strong>useHooks:</strong> <code>useNavigate</code>, <code>useParams</code>, <code>useLocation</code>
            </li>
            <li>
              <strong>Lazy Loading:</strong> 코드 스플리팅 내장 지원
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="installation">1️⃣ 설치와 기본 설정</h2>
        <p>
          React Router 를 설치하고 기본 설정을 합니다.
        </p>

        <CodeDemo
          title="React Router 설치와 설정"
          description="BrowserRouter 와 Routes"
          defaultCode={`// 1. 설치
// npm install react-router-dom

// 2. 기본 설정 (main.tsx 또는 index.tsx)
/*
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
*/

// 3. 라우트 설정 (App.tsx)
/*
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/about">소개</Link>
        <Link to="/users">사용자</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
*/

// 4. 페이지 컴포넌트
/*
function Home() {
  return <h1>홈 페이지</h1>;
}

function About() {
  return <h1>소개 페이지</h1>;
}

function Users() {
  return <h1>사용자 목록</h1>;
}

function NotFound() {
  return <h1>404 - 페이지를 찾을 수 없습니다</h1>;
}
*/

console.log('React Router 기본 설정 완료');`}
        />

        <InfoCard type="tip" title="BrowserRouter vs HashRouter">
          <ul>
            <li>
              <strong>BrowserRouter:</strong> HTML5 History API 사용 (권장)
            </li>
            <li>
              <strong>HashRouter:</strong> URL 해시 사용 (구형 브라우저)
            </li>
            <li>
              <strong>서버 설정:</strong> 모든 경로를 index.html 로 리다이렉트 필요
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="navigation">2️⃣ 페이지 이동</h2>
        <p>
          사용자를 다른 페이지로 이동합니다.
        </p>

        <CodeDemo
          title="페이지 이동 방법"
          description="Link 와 useNavigate"
          defaultCode={`import { Link, useNavigate } from 'react-router-dom';

// 1. Link 컴포넌트 (선언적 이동)
function Navigation() {
  return (
    <nav>
      {/* 일반 링크 */}
      <Link to="/about">소개</Link>
      
      {/* active 스타일 적용 */}
      <NavLink 
        to="/users" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        사용자
      </NavLink>
      
      {/* 상태 전달 */}
      <Link 
        to="/dashboard" 
        state={{ from: 'navigation' }}
      >
        대시보드
      </Link>
      
      {/* 외부 링크 */}
      <a href="https://example.com">외부 사이트</a>
    </nav>
  );
}

// 2. useNavigate 훅 (프로그래밍 방식 이동)
function LoginForm() {
  const navigate = useNavigate();
  
  const handleLogin = async (credentials) => {
    const success = await login(credentials);
    
    if (success) {
      // 이동
      navigate('/dashboard');
      
      // 상태와 함께 이동
      navigate('/dashboard', { state: { user: 'Alice' } });
      
      // 히스토리 스택 대체 (뒤로가기 불가)
      navigate('/dashboard', { replace: true });
      
      // 뒤로가기
      navigate(-1);
      
      // 앞으로가기
      navigate(1);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="사용자명" />
      <input name="password" type="password" placeholder="비밀번호" />
      <button type="submit">로그인</button>
    </form>
  );
}

// 3. 조건부 리다이렉트
function ProtectedRoute({ children }) {
  const isAuthenticated = false;  // 인증 확인
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  
  return isAuthenticated ? children : null;
}

// 4. 제출 후 이동
function CreateUser() {
  const navigate = useNavigate();
  
  const handleSubmit = async (data) => {
    await createUser(data);
    navigate('/users', { replace: true });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="이름" />
      <button type="submit">생성</button>
    </form>
  );
}

console.log('네비게이션 예시 완료');`}
        />

        <InfoCard type="tip" title="Link vs useNavigate">
          <ul>
            <li>
              <strong>Link:</strong> 링크 클릭, 선언적, 접근성 좋음
            </li>
            <li>
              <strong>useNavigate:</strong> 이벤트 처리 후, 프로그래밍 방식, 조건부 이동
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="params">3️⃣ 동적 라우트</h2>
        <p>
          URL 파라미터를 사용해 동적 페이지를 만듭니다.
        </p>

        <CodeDemo
          title="동적 라우트 파라미터"
          description="useParams 와 URL 패턴"
          defaultCode={`import { useParams, Link } from 'react-router-dom';

// 1. 기본 동적 라우트
// App.tsx
/*
<Routes>
  <Route path="/users/:userId" element={<UserProfile />} />
  <Route path="/posts/:postId/comments/:commentId" element={<Comment />} />
</Routes>
*/

// 2. useParams 로 파라미터 읽기
function UserProfile() {
  const { userId } = useParams();
  
  return (
    <div>
      <h1>사용자 프로필</h1>
      <p>사용자 ID: {userId}</p>
      <Link to={\`/users/\${userId}/posts\`}>게시물 보기</Link>
    </div>
  );
}

// 3. 여러 파라미터
function Comment() {
  const { postId, commentId } = useParams();
  
  return (
    <div>
      <h1>댓글</h1>
      <p>게시글 ID: {postId}</p>
      <p>댓글 ID: {commentId}</p>
    </div>
  );
}

// 4. 선택적 파라미터
// App.tsx
/*
<Routes>
  <Route path="/users/:userId?" element={<UserPage />} />
</Routes>
*/

function UserPage() {
  const { userId } = useParams();
  
  if (userId) {
    return <div>사용자 {userId} 상세</div>;
  }
  
  return <div>사용자 목록</div>;
}

// 5. 와일드카드 파라미터
// App.tsx
/*
<Routes>
  <Route path="/files/*" element={<Files />} />
</Routes>
*/

function Files() {
  const { '*': filePath } = useParams();
  
  return (
    <div>
      <h1>파일</h1>
      <p>경로: {filePath}</p>
    </div>
  );
}

// 6. 데이터 페칭과 함께
function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    async function fetchPost() {
      const response = await fetch(\`/api/posts/\${postId}\`);
      const data = await response.json();
      setPost(data);
      setLoading(false);
    }
    
    fetchPost();
  }, [postId]);
  
  if (loading) return <div>로딩 중...</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다</div>;
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

console.log('동적 라우트 예시 완료');`}
        />

        <InfoCard type="tip" title="useParams 활용">
          <ul>
            <li>
              <strong>타입 변환:</strong> <code>Number(userId)</code>
            </li>
            <li>
              <strong>유효성 검사:</strong> 파라미터 값 검증
            </li>
            <li>
              <strong>404 처리:</strong> 데이터 없음 처리
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="nested">4️⃣ 중첩 라우트</h2>
        <p>
          레이아웃을 공유하는 중첩 라우트를 만듭니다.
        </p>

        <CodeDemo
          title="중첩 라우트 (Nested Routes)"
          description="Outlet 과 상대 경로"
          defaultCode={`import { Outlet, Link, useMatch } from 'react-router-dom';

// 1. 레이아웃 컴포넌트
function DashboardLayout() {
  return (
    <div className="dashboard">
      <nav>
        <Link to="overview">개요</Link>
        <Link to="stats">통계</Link>
        <Link to="settings">설정</Link>
      </nav>
      
      {/* 자식 라우트가 렌더링될 위치 */}
      <Outlet />
    </div>
  );
}

// 2. 자식 라우트 컴포넌트
function DashboardOverview() {
  return <h2>개요 페이지</h2>;
}

function DashboardStats() {
  return <h2>통계 페이지</h2>;
}

function DashboardSettings() {
  return <h2>설정 페이지</h2>;
}

// 3. 라우트 설정
/*
<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardOverview />} />
    <Route path="stats" element={<DashboardStats />} />
    <Route path="settings" element={<DashboardSettings />} />
  </Route>
</Routes>
*/

// 4. 상대 경로 Link
function UserNavigation() {
  return (
    <nav>
      {/* /users/123/profile */}
      <Link to="profile">프로필</Link>
      
      {/* /users/123/posts */}
      <Link to="posts">게시물</Link>
      
      {/* /users/123/settings */}
      <Link to="../settings">설정 (상위)</Link>
      
      {/* /users/123/settings (절대) */}
      <Link to="/users/123/settings">설정 (절대)</Link>
    </nav>
  );
}

// 5. useMatch 로 현재 라우트 확인
function Breadcrumbs() {
  const match = useMatch('/dashboard/:section');
  
  if (match) {
    return <div>현재 섹션: {match.params.section}</div>;
  }
  
  return null;
}

// 6. 실제 활용 - 대시보드
/*
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<UserDetail />} />
        <Route path="posts" element={<Posts />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
*/

console.log('중첩 라우트 예시 완료');`}
        />

        <InfoCard type="tip" title="Outlet 활용">
          <ul>
            <li>
              <strong>레이아웃:</strong> 공통 UI (네비게이션, 사이드바)
            </li>
            <li>
              <strong>인덱스 라우트:</strong> <code>index</code> 요소로 기본 페이지
            </li>
            <li>
              <strong>상대 경로:</strong> 중첩 깊이 자동 처리
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="loaders">5️⃣ 데이터 로딩 (v6.4+)</h2>
        <p>
          React Router v6.4+ 의 데이터 API 를 사용합니다.
        </p>

        <CodeDemo
          title="데이터 로딩 (Data API)"
          description="loader 와 action"
          defaultCode={`// v6.4+ Data API
import { 
  createBrowserRouter, 
  useLoaderData, 
  useActionData,
  Form,
  redirect
} from 'react-router-dom';

// 1. loader 로 데이터 로딩
async function userLoader({ params }) {
  const response = await fetch(\`/api/users/\${params.userId}\`);
  const user = await response.json();
  return user;
}

function UserProfile() {
  const user = useLoaderData();
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// 2. action 으로 데이터 변형
async function updateUserAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  
  await fetch(\`/api/users/\${params.userId}\`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  
  return redirect('/users');
}

function EditUser() {
  const actionData = useActionData();
  
  return (
    <Form method="post">
      <input name="name" placeholder="이름" />
      <input name="email" placeholder="이메일" />
      <button type="submit">저장</button>
      {actionData?.error && <p className="error">{actionData.error}</p>}
    </Form>
  );
}

// 3. 라우터 설정
const router = createBrowserRouter([
  {
    path: '/users/:userId',
    element: <UserProfile />,
    loader: userLoader,
  },
  {
    path: '/users/:userId/edit',
    element: <EditUser />,
    action: updateUserAction,
  },
]);

// 4. 메인 앱
/*
function App() {
  return <RouterProvider router={router} />;
}
*/

// 5. 에러 처리
function ErrorBoundary() {
  const error = useRouteError();
  
  return (
    <div>
      <h1>에러 발생!</h1>
      <p>{error.message}</p>
    </div>
  );
}

const routerWithError = createBrowserRouter([
  {
    path: '/users/:userId',
    element: <UserProfile />,
    loader: userLoader,
    errorElement: <ErrorBoundary />,
  },
]);

// 6. 병렬 로딩
const routerWithParallel = createBrowserRouter([
  {
    path: '/dashboard',
    element: <Dashboard />,
    loader: async () => {
      // 병렬 로딩
      const [users, posts, stats] = await Promise.all([
        fetch('/api/users').then(r => r.json()),
        fetch('/api/posts').then(r => r.json()),
        fetch('/api/stats').then(r => r.json()),
      ]);
      
      return { users, posts, stats };
    },
  },
]);

console.log('데이터 로딩 예시 완료');`}
        />

        <InfoCard type="tip" title="Data API 장점">
          <ul>
            <li>
              <strong>병렬 로딩:</strong> 여러 데이터 동시 요청
            </li>
            <li>
              <strong>에러 처리:</strong> 라우트별 에러 바운더리
            </li>
            <li>
              <strong>리다이렉트:</strong> action 에서 직접 반환
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="code-splitting">6️⃣ 코드 스플리팅</h2>
        <p>
          Lazy Loading 으로 번들 크기를 최적화합니다.
        </p>

        <CodeDemo
          title="코드 스플리팅과 Lazy Loading"
          description="React.lazy 와 Suspense"
          defaultCode={`import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. Lazy Loading
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Users = lazy(() => import('./pages/Users'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// 2. 로딩 폴백
function PageLoading() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>로딩 중...</p>
    </div>
  );
}

// 3. 라우트 설정
function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

// 4. 중첩 Lazy Loading
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const DashboardOverview = lazy(() => import('./pages/DashboardOverview'));
const DashboardStats = lazy(() => import('./pages/DashboardStats'));

function DashboardRoutes() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="stats" element={<DashboardStats />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

// 5. 에러 처리
function LazyComponent({ children }) {
  return (
    <Suspense fallback={<PageLoading />}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Suspense>
  );
}

// 6. 실제 활용 - 라우트별 청크
/*
// webpackChunkName: "users"
const Users = lazy(() => import(/* webpackChunkName: "users" *\/ './pages/Users'));

// webpackChunkName: "admin"
const Admin = lazy(() => import(/* webpackChunkName: "admin" *\/ './pages/Admin'));
*/

console.log('코드 스플리팅 예시 완료');`}
        />

        <InfoCard type="tip" title="코드 스플리팅 효과">
          <ul>
            <li>
              <strong>초기 로딩:</strong> 번들 크기 감소
            </li>
            <li>
              <strong>온디맨드:</strong> 필요할 때 로드
            </li>
            <li>
              <strong>캐싱:</strong> 변경되지 않은 청크 재사용
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>BrowserRouter:</strong> HTML5 History API 기반
          </li>
          <li>
            <strong>Routes/Route:</strong> v6 라우트 설정
          </li>
          <li>
            <strong>Link:</strong> 선언적 네비게이션
          </li>
          <li>
            <strong>useNavigate:</strong> 프로그래밍 방식 이동
          </li>
          <li>
            <strong>useParams:</strong> URL 파라미터 읽기
          </li>
          <li>
            <strong>Outlet:</strong> 중첩 라우트
          </li>
          <li>
            <strong>loader/action:</strong> 데이터 API (v6.4+)
          </li>
          <li>
            <strong>lazy/Suspense:</strong> 코드 스플리팅
          </li>
        </ul>
      </section>
    </div>
  );
}