import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactAdvancedHooks() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>React 고급 Hooks</h1>
        <p className="page-description">
          useRef, useImperativeHandle, useLayoutEffect, useDebugValue 에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          React 는 기본 Hooks 외에도 <strong>고급 Hooks</strong> 를 제공합니다. 이들은 특수한
          상황에서 사용되며, 더 세밀한 제어가 필요할 때 활용합니다.
        </p>
      </section>

      <section className="content-section">
        <h2 id="useRef-advanced">1️⃣ useRef 심화</h2>
        <p>
          <code>useRef</code> 는 DOM 접근 외에도 <strong>렌더링을 트리거하지 않는 상태</strong>로
          활용됩니다.
        </p>

        <CodeDemo
          title="useRef 심화 활용"
          description="다양한 useRef 활용 패턴입니다."
          defaultCode={`// useRef 심화 패턴
// import { useRef, useState, useEffect } from 'react';

// 1. 이전 값 저장 (Previous Value)
// function usePrevious(value) {
//   const ref = useRef();
//   
//   useEffect(() => {
//     ref.current = value;
//   }, [value]);
//   
//   return ref.current;
// }

// function Counter() {
//   const [count, setCount] = useState(0);
//   const prevCount = usePrevious(count);
//   
//   return (
//     <div>
//       <p>Current: {count}</p>
//       <p>Previous: {prevCount}</p>
//       <button onClick={() => setCount(c => c + 1)}>+</button>
//     </div>
//   );
// }

// 2. 렌더링 횟수 추적 (개발용)
// function RenderCounter() {
//   const renderCount = useRef(0);
//   renderCount.current += 1;
//   
//   useEffect(() => {
//     console.log('Render count:', renderCount.current);
//   });
//   
//   return <div>Rendered {renderCount.current} times</div>;
// }

// 3. 인터벌 ID 저장 (클린업 용이)
// function IntervalComponent() {
//   const intervalRef = useRef(null);
//   const [count, setCount] = useState(0);
//   
//   useEffect(() => {
//     intervalRef.current = setInterval(() => {
//       setCount(c => c + 1);
//     }, 1000);
//     
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, []);
//   
//   return <div>Count: {count}</div>;
// }

// 4. 초기 렌더링 감지
// function useIsFirstRender() {
//   const isFirst = useRef(true);
//   
//   useEffect(() => {
//     isFirst.current = false;
//   }, []);
//   
//   return isFirst.current;
// }

// function MyComponent() {
//   const isFirstRender = useIsFirstRender();
//   
//   useEffect(() => {
//     if (isFirstRender) {
//       console.log('First render - skip API call');
//     } else {
//       console.log('Re-render - fetch data');
//     }
//   });
//   
//   return <div>Check console</div>;
// }

console.log('useRef advanced patterns');`}
        />
      </section>

      <section className="content-section">
        <h2 id="useImperativeHandle">2️⃣ useImperativeHandle</h2>
        <p>자식 컴포넌트가 부모에게 노출할 메서드를 커스터마이징합니다.</p>

        <InfoCard type="warning" title="useImperativeHandle 사용 주의">
          <p>
            <strong>가능하면 피하세요!</strong> React 는 선언적 패턴을 지향합니다.
            <br />
            ref 는 <strong>마지막 수단 (escape hatch)</strong> 으로 사용해야 합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="useImperativeHandle"
          description="자식 컴포넌트의 메서드를 노출합니다."
          defaultCode={`// useImperativeHandle 기본
// import { useRef, useImperativeHandle, forwardRef } from 'react';

// 자식 컴포넌트 (forwardRef 필요)
// const Child = forwardRef((props, ref) => {
//   const inputRef = useRef(null);
//   
//   useImperativeHandle(ref, () => ({
//     // 부모에게 노출할 메서드
//     focus: () => {
//       inputRef.current?.focus();
//     },
//     getValue: () => {
//       return inputRef.current?.value;
//     },
//     clear: () => {
//       inputRef.current!.value = '';
//     }
//   }));
//   
//   return <input ref={inputRef} />;
// });

// 부모 컴포넌트
// function Parent() {
//   const childRef = useRef(null);
//   
//   const handleFocus = () => {
//     childRef.current?.focus();
//   };
//   
//   const handleGetValue = () => {
//     console.log('Value:', childRef.current?.getValue());
//   };
//   
//   return (
//     <div>
//       <Child ref={childRef} />
//       <button onClick={handleFocus}>Focus Input</button>
//       <button onClick={handleGetValue}>Get Value</button>
//     </div>
//   );
// }

// 실전 예시: 폼 리셋
// const Form = forwardRef((props, ref) => {
//   const formRef = useRef(null);
//   
//   useImperativeHandle(ref, () => ({
//     reset: () => {
//       formRef.current?.reset();
//     },
//     submit: () => {
//       formRef.current?.requestSubmit();
//     }
//   }));
//   
//   return (
//     <form ref={formRef}>
//       <input name="email" />
//       <input name="password" type="password" />
//     </form>
//   );
// });

// function App() {
//   const formRef = useRef(null);
//   
//   return (
//     <div>
//       <Form ref={formRef} />
//       <button onClick={() => formRef.current?.reset()}>Reset</button>
//     </div>
//   );
// }

console.log('useImperativeHandle pattern');`}
        />
      </section>

      <section className="content-section">
        <h2 id="useLayoutEffect">3️⃣ useLayoutEffect</h2>
        <p>
          <code>useEffect</code> 와 유사하지만, <strong>DOM 변경 후 브라우저 페인트 전</strong>에
          동기적으로 실행됩니다.
        </p>

        <CodeDemo
          title="useLayoutEffect"
          description="DOM 측정 및 동기 레이아웃 조정에 사용합니다."
          defaultCode={`// useLayoutEffect vs useEffect
// import { useEffect, useLayoutEffect, useState, useRef } from 'react';

// useLayoutEffect 사용 사례: DOM 측정
// function Tooltip({ targetRef, content }) {
//   const [position, setPosition] = useState({ top: 0, left: 0 });
//   
//   useLayoutEffect(() => {
//     if (targetRef.current) {
//       const rect = targetRef.current.getBoundingClientRect();
//       setPosition({
//         top: rect.bottom + window.scrollY,
//         left: rect.left + window.scrollX
//       });
//     }
//   }, [targetRef]);
//   
//   return (
//     <div 
//       style={{ 
//         position: 'absolute', 
//         top: position.top, 
//         left: position.left 
//       }}
//     >
//       {content}
//     </div>
//   );
// }

// useLayoutEffect 사용 사례: 스크롤 위치 복원
// function ScrollRestoration() {
//   const containerRef = useRef(null);
//   
//   useLayoutEffect(() => {
//     const savedScroll = sessionStorage.getItem('scroll');
//     if (savedScroll && containerRef.current) {
//       containerRef.current.scrollTop = parseInt(savedScroll);
//     }
//   }, []);
//   
//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef.current) {
//         sessionStorage.setItem(
//           'scroll', 
//           containerRef.current.scrollTop.toString()
//         );
//       }
//     };
//     
//     containerRef.current?.addEventListener('scroll', handleScroll);
//     return () => containerRef.current?.removeEventListener('scroll', handleScroll);
//   }, []);
//   
//   return <div ref={containerRef}>Content</div>;
// }

// useEffect vs useLayoutEffect 비교
// - useEffect: 비동기, 브라우저 페인트 후 실행
// - useLayoutEffect: 동기, 브라우저 페인트 전 실행 (깜빡임 방지)

console.log('useLayoutEffect for DOM measurements');`}
        />

        <InfoCard type="tip" title="useEffect vs useLayoutEffect">
          <table style={{ width: '100%', fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>기능</th>
                <th style={{ textAlign: 'left' }}>useEffect</th>
                <th style={{ textAlign: 'left' }}>useLayoutEffect</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>실행 시점</td>
                <td>페인트 후 (비동기)</td>
                <td>페인트 전 (동기)</td>
              </tr>
              <tr>
                <td>블로킹</td>
                <td>아니오</td>
                <td>예 (렌더링 블로킹)</td>
              </tr>
              <tr>
                <td>사용 사례</td>
                <td>대부분의 사이드 이펙트</td>
                <td>DOM 측정, 레이아웃 조정</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="useDebugValue">4️⃣ useDebugValue</h2>
        <p>커스텀 Hook 의 디버깅 정보를 React DevTools 에 표시합니다.</p>

        <CodeDemo
          title="useDebugValue"
          description="커스텀 Hook 의 디버깅 정보를 표시합니다."
          defaultCode={`// useDebugValue 기본
// import { useState, useDebugValue } from 'react';

// 커스텀 Hook 에서 사용
// function useFriendStatus(friendID) {
//   const [isOnline, setIsOnline] = useState(null);
//   
//   // DevTools 에 표시될 라벨
//   useDebugValue(isOnline ? 'Online' : 'Offline');
//   
//   // ... 구독 로직
//   
//   return isOnline;
// }

// 조건부 useDebugValue (성능 최적화)
// function useCustomHook(value) {
//   const [data, setData] = useState(value);
//   
//   // expensiveValue 는 DevTools 에서만 계산
//   useDebugValue(data, data => \`Value: \${data}\`);
//   
//   return data;
// }

// 실전 예시: 비동기 상태 Hook
// function useAsyncState(initialValue) {
//   const [state, setState] = useState({
//     data: initialValue,
//     loading: false,
//     error: null
//   });
//   
//   // DevTools 에 상태 표시
//   useDebugValue(state, s => 
//     s.loading ? 'Loading...' : s.error ? 'Error' : 'Ready'
//   );
//   
//   return state;
// }

// 사용 예시 (DevTools 에서 확인)
// function MyComponent() {
//   const asyncState = useAsyncState(null);
//   // DevTools: useAsyncState: "Ready" 또는 "Loading..." 또는 "Error"
//   return <div>Check DevTools</div>;
// }

console.log('useDebugValue for DevTools');`}
        />

        <InfoCard type="note" title="useDebugValue 사용처">
          <p>
            <strong>커스텀 Hook 개발 시</strong> 에만 사용합니다. 일반 컴포넌트에서는 효과가
            없습니다.
            <br />
            프로덕션에서는 제거되므로 성능 영향은 없습니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="error-boundaries">5️⃣ 에러 바운더리 (Error Boundaries)</h2>
        <p>자식 컴포넌트에서 발생한 에러를 캐치하고 UI 를 표시합니다.</p>

        <InfoCard type="warning" title="에러 바운더리 제한">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>클래스형 컴포넌트로만 구현 가능 (2024 년 기준)</li>
            <li>이벤트 핸들러 내 에러는 캐치하지 못함</li>
            <li>비동기 코드 (setTimeout, requestAnimationFrame) 에러는 캐치하지 못함</li>
            <li>SSR 에러는 캐치하지 못함</li>
          </ul>
        </InfoCard>

        <CodeDemo
          title="에러 바운더리"
          description="자식 컴포넌트 에러를 처리합니다."
          defaultCode={`// 에러 바운더리 (클래스 컴포넌트 필요)
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }
//   
//   static getDerivedStateFromError(error) {
//     // 에러 발생 시 상태 업데이트
//     return { hasError: true, error };
//   }
//   
//   componentDidCatch(error, errorInfo) {
//     // 에러 로깅
//     console.error('Error caught:', error, errorInfo);
//     // logErrorToService(error, errorInfo);
//   }
//   
//   render() {
//     if (this.state.hasError) {
//       return (
//         <div>
//           <h1>Something went wrong.</h1>
//           <p>{this.state.error?.message}</p>
//           <button onClick={() => this.setState({ hasError: false })}>
//             Try again
//           </button>
//         </div>
//       );
//     }
//     
//     return this.props.children;
//   }
// }

// 사용 예시
// function App() {
//   return (
//     <ErrorBoundary>
//       <Header />
//       <MainContent />  {/* 이 컴포넌트 에러를 캐치 */}
//       <Footer />
//     </ErrorBoundary>
//   );
// }

// 함수형 컴포넌트에서 에러 처리 대안
// function SafeComponent({ children }) {
//   const [hasError, setHasError] = useState(false);
//   
//   // useEffect 로 에러 리스너 등록 (전역 에러만)
//   useEffect(() => {
//     const handleError = (error) => {
//       setHasError(true);
//     };
//     
//     window.addEventListener('error', handleError);
//     return () => window.removeEventListener('error', handleError);
//   }, []);
//   
//   if (hasError) {
//     return <div>Something went wrong</div>;
//   }
//   
//   return children;
// }

console.log('Error boundaries concept');`}
        />
      </section>

      <section className="content-section">
        <h2 id="hooks-best-practices">6️⃣ Hooks 모범 사례</h2>
        <p>React Hooks 를 효과적으로 사용하는 패턴과 주의사항입니다.</p>

        <CodeDemo
          title="Hooks 모범 사례"
          description="실전 Hooks 패턴과 주의사항입니다."
          defaultCode={`// 1. 커스텀 Hooks 로 로직 추출
// function useLocalStorage(key, initialValue) {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch {
//       return initialValue;
//     }
//   });
//   
//   const setValue = (value) => {
//     try {
//       setStoredValue(value);
//       window.localStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       console.error('localStorage error:', error);
//     }
//   };
//   
//   return [storedValue, setValue];
// }

// 2. 의존성 배열 관리
// function Counter() {
//   const [count, setCount] = useState(0);
//   
//   // ❌ 의존성 누락
//   // useEffect(() => {
//   //   const timer = setInterval(() => {
//   //     setCount(count + 1);  // stale closure!
//   //   }, 1000);
//   //   return () => clearInterval(timer);
//   // }, []);
//   
//   // ✅ 함수형 업데이트로 의존성 제거
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCount(c => c + 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);
// }

// 3. 메모이제이션 신중하게 사용
// function ExpensiveComponent({ items, filter }) {
//   // ❌ 불필요한 useMemo
//   // const count = useMemo(() => items.length, [items]);
//   // 단순 계산은 useMemo 불필요!
//   
//   // ✅ 비싼 계산만 메모이제이션
//   const filtered = useMemo(() => {
//     return items
//       .filter(item => item.category === filter)
//       .sort((a, b) => a.name.localeCompare(b.name));
//   }, [items, filter]);
//   
//   return <div>{/* ... */}</div>;
// }

// 4. Hook 호출 순서 지키기
// function ConditionalHook({ condition }) {
//   const [state, setState] = useState(0);  // 항상 첫 번째
//   
//   // ❌ 조건부 Hook 호출 금지!
//   // if (condition) {
//   //   useEffect(() => { /* ... */ });
//   // }
//   
//   // ✅ 조건부 실행은 Hook 내부에서
//   useEffect(() => {
//     if (condition) {
//       // ...
//     }
//   }, [condition]);
// }

console.log('Hooks best practices');`}
        />

        <InfoCard type="tip" title="Hooks 규칙 요약">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>✅ 최상단에서만 호출 (조건부/루프 내 금지)</li>
            <li>✅ React 함수 내에서만 호출</li>
            <li>✅ 의존성 배열 정확히 채우기</li>
            <li>✅ 함수형 업데이트로 stale closure 방지</li>
            <li>✅ 커스텀 Hooks 로 로직 재사용</li>
            <li>⚠️ useMemo/useCallback 은 성능 문제 있을 때만</li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <code>useRef</code>: DOM 접근, 렌더링 없는 상태, 이전 값 저장
            </li>
            <li>
              <code>useImperativeHandle</code>: 자식 메서드 노출 (forwardRef 필요)
            </li>
            <li>
              <code>useLayoutEffect</code>: DOM 측정, 페인트 전 동기 실행
            </li>
            <li>
              <code>useDebugValue</code>: 커스텀 Hook DevTools 라벨
            </li>
            <li>
              <strong>에러 바운더리</strong>: 클래스 컴포넌트로 구현, 자식 에러 캐치
            </li>
            <li>
              <strong>모범 사례</strong>: 커스텀 Hooks, 의존성 관리, 메모이제이션 신중하게
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
