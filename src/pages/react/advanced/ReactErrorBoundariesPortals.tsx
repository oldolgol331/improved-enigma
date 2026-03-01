import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactErrorBoundariesPortals() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>React Error Boundaries 와 Portals</h1>
        <p className="page-description">
          React 의 고급 기능인 Error Boundaries 와 Portals 를 활용한 오류 처리와 DOM 렌더링을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="error-boundaries">1️⃣ Error Boundaries</h2>
        <p>
          Error Boundary 는 자식 컴포넌트 트리에서 발생한 JavaScript 에러를 캐치하고,
          에러가 발생한 컴포넌트 대신 폴백 UI 를 표시합니다.
        </p>

        <CodeDemo
          title="Error Boundaries 기본"
          description="class component 기반 에러 처리"
          defaultCode={`import { Component } from 'react';

// Error Boundary 컴포넌트 (Class 만 가능)
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  // 에러 발생 시 상태 업데이트
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // 에러 정보 기록
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    
    // 에러 모니터링 서비스로 전송
    // logErrorToService(error, errorInfo);
    
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI
      return (
        <div className="error-fallback">
          <h1>문제가 발생했습니다</h1>
          <p>페이지를 새로고침하거나 나중에 다시 시도해주세요.</p>
          <button onClick={() => window.location.reload()}>
            새로고침
          </button>
          
          {/* 개발 모드에서만 에러 상세 표시 */}
          {process.env.NODE_ENV === 'development' && (
            <details>
              <summary>에러 상세</summary>
              <pre>{this.state.error?.toString()}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================
// 사용 예시
// ============================================

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <MainContent />
      <Footer />
    </ErrorBoundary>
  );
}

// 에러 발생 컴포넌트
function BuggyComponent() {
  const [shouldError, setShouldError] = useState(false);
  
  if (shouldError) {
    throw new Error('의도적인 에러!');
  }
  
  return (
    <button onClick={() => setShouldError(true)}>
      에러 발생시키기
    </button>
  );
}

console.log('Error Boundaries 완료');`}
        />

        <InfoCard type="warning" title="Error Boundary 제한사항">
          <ul>
            <li>
              <strong>Class 만 가능:</strong> 함수 컴포넌트에서는 불가
            </li>
            <li>
              <strong>자식 에러만:</strong> 자신의 에러는 캐치 못함
            </li>
            <li>
              <strong>이벤트 핸들러:</strong> 캐치 못함 (try-catch 사용)
            </li>
            <li>
              <strong>비동기:</strong> setTimeout, requestAnimationFrame 은 캐치 못함
            </li>
            <li>
              <strong>SSR:</strong> 서버 사이드 렌더링에서는 작동 안 함
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="error-boundary-patterns">2️⃣ Error Boundary 패턴</h2>
        <p>
          실제 프로젝트에서 활용하는 Error Boundary 패턴입니다.
        </p>

        <CodeDemo
          title="Error Boundary 패턴"
          description="전역/로컬 Error Boundary"
          defaultCode={`// ============================================
// 1. 전역 Error Boundary (앱 전체)
// ============================================
function App() {
  return (
    <ErrorBoundary 
      fallback={\`
        <div className="global-error">
          <h1>앱에 문제가 발생했습니다</h1>
          <button onClick={() => window.location.reload()}>
            앱 재시작
          </button>
        </div>
      \`}
    >
      <Router>
        <Routes>...</Routes>
      </Router>
    </ErrorBoundary>
  );
}

// ============================================
// 2. 로컬 Error Boundary (특정 섹션)
// ============================================
function Dashboard() {
  return (
    <div>
      <Header />
      
      {/* 위젯별로 별도 에러 처리 */}
      <ErrorBoundary fallback={<WidgetError />}>
        <AnalyticsWidget />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<WidgetError />}>
        <ChartWidget />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<WidgetError />}>
        <NotificationWidget />
      </ErrorBoundary>
    </div>
  );
}

// ============================================
// 3. 함수형 컴포넌트용 래퍼
// ============================================
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

function ErrorBoundaryWrapper({ children, fallback }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback}
      onError={(error, info) => {
        console.error('Error:', error);
        // 에러 보고
      }}
      resetKeys={[children]}  // 키 변경 시 리셋
    >
      {children}
    </ReactErrorBoundary>
  );
}

// 사용
function Page() {
  return (
    <ErrorBoundaryWrapper fallback={<PageError />}>
      <ComplexComponent />
    </ErrorBoundaryWrapper>
  );
}

// ============================================
// 4. 에러 복구 (Retry)
// ============================================
function RetryableErrorBoundary({ children }) {
  const [retryCount, setRetryCount] = useState(0);
  
  return (
    <ErrorBoundary
      fallback={
        <div>
          <p>에러가 발생했습니다</p>
          <button onClick={() => setRetryCount(c => c + 1)}>
            다시 시도 ({retryCount})
          </button>
        </div>
      }
      key={retryCount}  // 키 변경으로 컴포넌트 재생
    >
      {children}
    </ErrorBoundary>
  );
}

console.log('Error Boundary 패턴 완료');`}
        />

        <InfoCard type="tip" title="Error Boundary 라이브러리">
          <ul>
            <li>
              <strong>react-error-boundary:</strong> 함수형 컴포넌트 지원
            </li>
            <li>
              <strong>useErrorBoundary:</strong> 훅 기반 에러 처리
            </li>
            <li>
              <strong>에러 보고:</strong> Sentry, LogRocket 연동
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="portals">3️⃣ Portals</h2>
        <p>
          Portals 는 자식 컴포넌트를 DOM 트리의 다른 위치에 렌더링합니다.
          모달, 툴팁, 드롭다운 등에 유용합니다.
        </p>

        <CodeDemo
          title="Portals 기본"
          description="createPortal 사용법"
          defaultCode={`import { createPortal } from 'react-dom';

// ============================================
// 1. 기본 Portal
// ============================================
function Modal({ children, onClose }) {
  return createPortal(
    // 렌더링할 콘텐츠
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    // 렌더링할 DOM 위치
    document.getElementById('modal-root')
  );
}

// ============================================
// 2. 사용 예시
// ============================================
function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        모달 열기
      </button>
      
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>모달 제목</h2>
          <p>모달 내용입니다.</p>
        </Modal>
      )}
    </div>
  );
}

// ============================================
// 3. HTML 구조
// ============================================
// index.html
// <body>
//   <div id="root"></div>
//   <div id="modal-root"></div>  <!-- Portal 대상 -->
//   <div id="tooltip-root"></div>
// </body>

// ============================================
// 4. 이벤트 버블링
// ============================================
// Portal 내부 이벤트는 React 트리를 따라 버블링
// DOM 위치와 무관하게 React 트리 기준

function Modal({ children }) {
  const handleModalClick = () => {
    console.log('Modal clicked');
  };
  
  return createPortal(
    <div onClick={handleModalClick}>
      {children}  // 자식에서 발생한 이벤트도 캐치
    </div>,
    document.getElementById('modal-root')
  );
}

console.log('Portals 완료');`}
        />

        <InfoCard type="tip" title="Portal 사용 사례">
          <ul>
            <li>
              <strong>모달/다이얼로그:</strong> 오버레이 표시
            </li>
            <li>
              <strong>툴팁/팝오버:</strong> 컨테이너 overflow 영향 받지 않음
            </li>
            <li>
              <strong>드롭다운:</strong> z-index 문제 해결
            </li>
            <li>
              <strong>알림/토스트:</strong> 화면 상단 표시
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="portal-patterns">4️⃣ Portal 패턴</h2>
        <p>
          실제 프로젝트에서 활용하는 Portal 패턴입니다.
        </p>

        <CodeDemo
          title="Portal 패턴"
          description="모달, 툴팁, 드롭다운 구현"
          defaultCode={`// ============================================
// 1. 재사용 가능한 모달
// ============================================
function ModalPortal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-backdrop">
      <div 
        className="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button 
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </header>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

// ============================================
// 2. 툴팁
// ============================================
function TooltipPortal({ target, children, position }) {
  const [tooltipStyle, setTooltipStyle] = useState({});
  
  useEffect(() => {
    if (target) {
      const rect = target.getBoundingClientRect();
      setTooltipStyle({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX + (rect.width / 2)
      });
    }
  }, [target]);
  
  return createPortal(
    <div 
      className="tooltip"
      style={tooltipStyle}
      role="tooltip"
    >
      {children}
    </div>,
    document.getElementById('tooltip-root')
  );
}

// ============================================
// 3. 드롭다운 메뉴
// ============================================
function DropdownPortal({ isOpen, anchorRef, children }) {
  const [dropdownStyle, setDropdownStyle] = useState({});
  
  useEffect(() => {
    if (anchorRef.current && isOpen) {
      const rect = anchorRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        minWidth: rect.width
      });
    }
  }, [anchorRef, isOpen]);
  
  if (!isOpen) return null;
  
  return createPortal(
    <div 
      className="dropdown-menu"
      style={dropdownStyle}
    >
      {children}
    </div>,
    document.getElementById('dropdown-root')
  );
}

// ============================================
// 4. 전역 알림 (Toast)
// ============================================
function ToastContainer({ toasts, removeToast }) {
  return createPortal(
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast 
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    document.getElementById('toast-root')
  );
}

console.log('Portal 패턴 완료');`}
        />

        <InfoCard type="warning" title="Portal 사용 시 주의">
          <ul>
            <li>
              <strong>접근성:</strong> focus trapping, aria 속성
            </li>
            <li>
              <strong>스타일:</strong> 포지셔닝, z-index
            </li>
            <li>
              <strong>이벤트:</strong> 바깥 클릭 감지
            </li>
            <li>
              <strong>SSR:</strong> useEffect 에서 렌더링
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="ssr">5️⃣ SSR 에서 Portals</h2>
        <p>
          서버 사이드 렌더링 환경에서 Portals 를 안전하게 사용합니다.
        </p>

        <CodeDemo
          title="SSR 와 Portals"
          description="useEffect 에서 안전한 렌더링"
          defaultCode={`import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// ============================================
// 1. SSR 안전한 Portal 컴포넌트
// ============================================
function SSRPortal({ children, selector }) {
  const [mounted, setMounted] = useState(false);
  const [element, setElement] = useState(null);
  
  useEffect(() => {
    // 클라이언트에서만 실행
    setMounted(true);
    setElement(document.querySelector(selector));
  }, [selector]);
  
  // SSR 중에는 null 반환
  if (!mounted || !element) {
    return null;
  }
  
  return createPortal(children, element);
}

// ============================================
// 2. 사용 예시
// ============================================
function Modal({ isOpen, children }) {
  return (
    <SSRPortal selector="#modal-root">
      {isOpen && (
        <div className="modal">
          {children}
        </div>
      )}
    </SSRPortal>
  );
}

// ============================================
// 3. Next.js 에서 사용
// ============================================
// 'use client' 지시문 필요 (Next.js 13+)
'use client';

import dynamic from 'next/dynamic';

// 동적 임포트로 SSR 비활성화
const Modal = dynamic(
  () => import('./Modal').then(mod => mod.Modal),
  { ssr: false }
);

function Page() {
  return (
    <div>
      <Modal isOpen={true}>
        <p>모달 내용</p>
      </Modal>
    </div>
  );
}

console.log('SSR Portals 완료');`}
        />

        <InfoCard type="tip" title="SSR 고려사항">
          <ul>
            <li>
              <strong>useEffect:</strong> 클라이언트 마운트 후 렌더링
            </li>
            <li>
              <strong>동적 임포트:</strong> ssr: false 옵션
            </li>
            <li>
              <strong>하이드레이션:</strong> 서버/클라이언트 DOM 일치
            </li>
            <li>
              <strong>'use client':</strong> Next.js App Router
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Error Boundaries:</strong> 클래스 기반 에러 캐치
          </li>
          <li>
            <strong>getDerivedStateFromError:</strong> 폴백 UI 표시
          </li>
          <li>
            <strong>componentDidCatch:</strong> 에러 로깅
          </li>
          <li>
            <strong>Portals:</strong> DOM 다른 위치 렌더링
          </li>
          <li>
            <strong>createPortal:</strong> 모달, 툴팁, 드롭다운
          </li>
          <li>
            <strong>SSR:</strong> useEffect 에서 안전한 렌더링
          </li>
        </ul>
      </section>
    </div>
  );
}
