import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactRefs() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>React Refs & Portals</h1>
        <p className="page-description">
          useRef 로 DOM 에 접근하고, Portals 로 DOM 계층을 벗어난 렌더링을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>Refs</strong> 는 React 가 관리하는 DOM 이나 값을 직접 참조할 수 있게 합니다.
          <strong>Portals</strong> 는 컴포넌트를 DOM 의 다른 위치에 렌더링합니다.
        </p>

        <InfoCard type="tip" title="사용 시기">
          <ul>
            <li>
              <strong>Refs:</strong> DOM 조작, 포커스, 애니메이션, 라이브러리 통합
            </li>
            <li>
              <strong>Portals:</strong> 모달, 툴팁, 드롭다운 (z-index 문제 해결)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="useref-dom">1️⃣ useRef 로 DOM 접근</h2>
        <p>
          useRef 는 DOM 요소에 직접 접근할 수 있게 합니다.
        </p>

        <CodeDemo
          title="useRef 로 DOM 조작"
          description="포커스, 선택, 측정"
          defaultCode={`import { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef(null);
  
  const handleFocus = () => {
    // DOM 요소에 직접 접근
    inputRef.current.focus();
    inputRef.current.select();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="입력창" />
      <button onClick={handleFocus}>포커스하기</button>
    </div>
  );
}

// 2. 여러 DOM 요소 참조
function MultiRefs() {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  
  const handleSwap = () => {
    const temp = input1Ref.current.value;
    input1Ref.current.value = input2Ref.current.value;
    input2Ref.current.value = temp;
  };
  
  return (
    <div>
      <input ref={input1Ref} placeholder="첫 번째" />
      <input ref={input2Ref} placeholder="두 번째" />
      <button onClick={handleSwap}>값 교환</button>
    </div>
  );
}

// 3. DOM 측정 (크기, 위치)
function MeasureElement() {
  const boxRef = useRef(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  
  const handleMeasure = () => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setSize({
        width: rect.width,
        height: rect.height,
      });
    }
  };
  
  return (
    <div>
      <div
        ref={boxRef}
        style={{ width: 200, height: 100, background: 'lightblue' }}
      >
        측정할 박스
      </div>
      <button onClick={handleMeasure}>크기 측정</button>
      <p>너비: {size.width}, 높이: {size.height}</p>
    </div>
  );
}

// 4. 이전 값 저장 (렌더링 트리거 안 함)
function CounterWithPrevious() {
  const [count, setCount] = React.useState(0);
  const prevCountRef = useRef();
  
  // 렌더링 후에 이전 값 저장
  React.useEffect(() => {
    prevCountRef.current = count;
  }, [count]);
  
  const prevCount = prevCountRef.current;
  
  return (
    <div>
      <p>현재: {count}, 이전: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

console.log('useRef DOM 예시 완료');`}
        />

        <InfoCard type="warning" title="Refs 사용 주의">
          <p>
            Refs 는 <strong>탈출구 (escape hatch)</strong>입니다.
            가능한 한 상태 (state) 를 사용하고, Refs 는 최소한으로 사용하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="useref-value">2️⃣ useRef 로 값 저장</h2>
        <p>
          useRef 는 렌더링을 트리거하지 않는 값 저장소로 사용할 수 있습니다.
        </p>

        <CodeDemo
          title="useRef 로 상태 저장"
          description="렌더링 없이 값 유지"
          defaultCode={`import { useRef, useEffect } from 'react';

// 1. 인터벌 ID 저장 (클린업 용이)
function TimerComponent() {
  const [count, setCount] = React.useState(0);
  const intervalRef = useRef(null);
  
  const handleStart = () => {
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
  };
  
  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={handleStart}>시작</button>
      <button onClick={handleStop}>중지</button>
    </div>
  );
}

// 2. 이전 값 추적
function TrackPreviousValue({ value }) {
  const prevRef = useRef(value);
  const prevValue = prevRef.current;
  
  useEffect(() => {
    prevRef.current = value;
  }, [value]);
  
  return (
    <div>
      <p>현재: {value}</p>
      <p>이전: {prevValue}</p>
    </div>
  );
}

// 3. 초기화 시에만 계산 (매 렌더링마다 계산 방지)
function ExpensiveCalculation({ data }) {
  const computedRef = useRef(null);
  
  if (computedRef.current === null) {
    // 초기 렌더링에서만 계산
    computedRef.current = expensiveComputation(data);
  }
  
  return <div>결과: {computedRef.current}</div>;
}

function expensiveComputation(data) {
  console.log('고비용 계산 실행');
  return data.reduce((acc, val) => acc + val, 0);
}

// 4. 함수 호출 시기 제어 (이전 호출 시간 저장)
function ThrottledButton() {
  const lastClickRef = useRef(0);
  const [count, setCount] = React.useState(0);
  
  const handleClick = () => {
    const now = Date.now();
    
    // 1 초 이내 중복 클릭 무시
    if (now - lastClickRef.current < 1000) {
      console.log('너무 빠릅니다!');
      return;
    }
    
    lastClickRef.current = now;
    setCount((c) => c + 1);
  };
  
  return (
    <button onClick={handleClick}>
      클릭 ({count})
    </button>
  );
}

console.log('useRef 값 저장 예시 완료');`}
        />

        <InfoCard type="tip" title="useRef vs useState">
          <table>
            <thead>
              <tr>
                <th>기능</th>
                <th>useRef</th>
                <th>useState</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>렌더링</td>
                <td>트리거 안 함</td>
                <td>트리거 함</td>
              </tr>
              <tr>
                <td>값 접근</td>
                <td>ref.current</td>
                <td>변수 직접</td>
              </tr>
              <tr>
                <td>용도</td>
                <td>DOM, 이전 값, ID</td>
                <td>UI 상태</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="forwarding-refs">3️⃣ Forwarding Refs</h2>
        <p>
          자식 컴포넌트에 ref 를 전달합니다.
        </p>

        <CodeDemo
          title="Ref Forwarding"
          description="자식 DOM 에 접근"
          defaultCode={`import { forwardRef, useImperativeHandle } from 'react';

// 1. 기본 Forwarding
const FancyInput = forwardRef(function FancyInput(props, ref) {
  return (
    <input
      ref={ref}
      {...props}
      style={{ border: '2px solid blue', padding: '8px' }}
    />
  );
});

function ParentComponent() {
  const inputRef = React.useRef(null);
  
  const handleFocus = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <FancyInput ref={inputRef} placeholder="고급 입력창" />
      <button onClick={handleFocus}>포커스</button>
    </div>
  );
}

// 2. useImperativeHandle (메서드 노출)
const FancyInputWithMethods = forwardRef(function FancyInput(props, ref) {
  const innerInputRef = React.useRef(null);
  
  // 부모에게 특정 메서드만 노출
  useImperativeHandle(ref, () => ({
    focus: () => {
      innerInputRef.current.focus();
    },
    select: () => {
      innerInputRef.current.select();
    },
    getValue: () => {
      return innerInputRef.current.value;
    },
  }));
  
  return <input ref={innerInputRef} {...props} />;
});

function ParentWithMethods() {
  const inputRef = React.useRef(null);
  
  const handleGetValue = () => {
    const value = inputRef.current.getValue();
    console.log('입력값:', value);
  };
  
  return (
    <div>
      <FancyInputWithMethods ref={inputRef} placeholder="메서드 노출" />
      <button onClick={handleGetValue}>값 가져오기</button>
    </div>
  );
}

// 3. 클래스 컴포넌트에서 forwarding
class ClassInput extends React.Component {
  render() {
    return <input ref={this.props.ref} {...this.props} />;
  }
}

// forwardRef 로 감싸야 함
const ClassInputWithRef = forwardRef((props, ref) => (
  <ClassInput {...props} ref={ref} />
));

console.log('Forwarding Refs 예시 완료');`}
        />

        <InfoCard type="tip" title="useImperativeHandle">
          <p>
            자식 컴포넌트의 <strong>내부 구현을 숨기고</strong> 특정 메서드만 노출할 때 사용합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="portals">4️⃣ Portals</h2>
        <p>
          컴포넌트를 DOM 의 다른 위치에 렌더링합니다.
        </p>

        <CodeDemo
          title="Portals 사용법"
          description="모달과 툴팁 렌더링"
          defaultCode={`import { createPortal } from 'react-dom';

// 1. 기본 Portal
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>닫기</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')  // #modal-root 에 렌더링
  );
}

// 2. 사용 예시
function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        모달 열기
      </button>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>모달 제목</h2>
        <p>모달 내용입니다.</p>
      </Modal>
    </div>
  );
}

// 3. 툴팁 Portal
function Tooltip({ target, children }) {
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  
  React.useEffect(() => {
    if (target?.current) {
      const rect = target.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
      });
    }
  }, [target]);
  
  return createPortal(
    <div
      className="tooltip"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
      }}
    >
      {children}
    </div>,
    document.body
  );
}

// 4. 전역 알림 (Toast)
function ToastContainer({ toasts }) {
  return createPortal(
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={\`toast toast-\${toast.type}\`}>
          {toast.message}
        </div>
      ))}
    </div>,
    document.getElementById('toast-root')
  );
}

// 5. Portal 과 이벤트 버블링
// Portal 은 DOM 계층은 벗어나지만,
// React 이벤트 버블링은 계속 동작합니다!
function PortalChild({ onClick }) {
  return (
    <div onClick={onClick}>
      Portal 자식 (이벤트 버블링됨)
    </div>
  );
}

function PortalParent() {
  const handleClick = () => {
    console.log('부모에서 이벤트 캐치!');
  };
  
  return (
    <div onClick={handleClick}>
      {createPortal(
        <PortalChild onClick={() => console.log('자식 클릭')} />,
        document.body
      )}
    </div>
  );
}

console.log('Portals 예시 완료');`}
        />

        <InfoCard type="tip" title="Portals 사용 사례">
          <ul>
            <li>
              <strong>모달:</strong> z-index 문제 해결
            </li>
            <li>
              <strong>툴팁:</strong> overflow: hidden 우회
            </li>
            <li>
              <strong>드롭다운:</strong> 컨테이너 제한 벗어남
            </li>
            <li>
              <strong>알림 (Toast):</strong> 전역 표시
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="error-boundaries">5️⃣ Error Boundaries</h2>
        <p>
          자식 컴포넌트의 에러를 캐치하고 표시합니다.
        </p>

        <CodeDemo
          title="Error Boundaries"
          description="에러 처리와 복구"
          defaultCode={`// Error Boundary 는 클래스 컴포넌트로만 구현 가능
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  // 정적 메서드: 에러 발생 시 상태 설정
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  // 에러 로깅
  componentDidCatch(error, errorInfo) {
    console.error('에러 캐치:', error, errorInfo);
    // 에러 보고 서비스로 전송 (Sentry 등)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>문제가 발생했습니다</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            다시 시도
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// 2. 사용 예시
function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}

function BuggyComponent() {
  const [shouldThrow, setShouldThrow] = React.useState(false);
  
  if (shouldThrow) {
    throw new Error('의도적 에러!');
  }
  
  return (
    <div>
      <p>정상 렌더링</p>
      <button onClick={() => setShouldThrow(true)}>
        에러 발생시키기
      </button>
    </div>
  );
}

// 3. 함수형 컴포넌트에서 사용
function FunctionApp() {
  const [key, setKey] = React.useState(0);
  
  const handleReset = () => {
    setKey((k) => k + 1);  // key 변경으로 컴포넌트 재생성
  };
  
  return (
    <ErrorBoundary key={key}>
      <BuggyComponent />
      <button onClick={handleReset}>초기화</button>
    </ErrorBoundary>
  );
}

// 4. 주의: Error Boundary 가 캐치하지 못하는 에러
// - 이벤트 핸들러 내부 에러
// - setTimeout/setInterval
// - 서버 사이드 렌더링
// - 자신보다 위에서 발생한 에러

console.log('Error Boundary 예시 완료');`}
        />

        <InfoCard type="warning" title="Error Boundary 제한">
          <ul>
            <li>
              <strong>클래스 컴포넌트:</strong> 현재 클래스로만 구현 가능
            </li>
            <li>
              <strong>이벤트 핸들러:</strong> try-catch 로 직접 처리
            </li>
            <li>
              <strong>비동기:</strong> Promise.catch() 필요
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>useRef:</strong> DOM 접근, 렌더링 없이 값 저장
          </li>
          <li>
            <strong>Forwarding:</strong> <code>forwardRef</code> 로 자식 DOM 전달
          </li>
          <li>
            <strong>useImperativeHandle:</strong> 특정 메서드만 노출
          </li>
          <li>
            <strong>Portals:</strong> <code>createPortal</code> 로 DOM 다른 위치 렌더링
          </li>
          <li>
            <strong>Error Boundaries:</strong> 클래스로 에러 캐치
          </li>
          <li>
            <strong>이벤트 버블링:</strong> Portal 도 React 이벤트 계속 동작
          </li>
        </ul>
      </section>
    </div>
  );
}