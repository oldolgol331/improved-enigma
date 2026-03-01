import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactUseEffect() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>useEffect Hook</h1>
        <p className="page-description">사이드 이펙트를 처리하는 useEffect 에 대해 학습합니다.</p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>useEffect</strong> 는 함수형 컴포넌트에서 <strong>사이드 이펙트</strong>를 수행할
          수 있게 합니다. 데이터 fetching, 구독, 수동 DOM 조작 등에 사용됩니다.
        </p>

        <InfoCard type="tip" title="사이드 이펙트란?">
          <p>
            <strong>사이드 이펙트</strong> 는 컴포넌트 렌더링 외에 발생하는 작업입니다:
          </p>
          <ul style={{ margin: '0.5rem 0 0 1.2rem' }}>
            <li>API 호출 (데이터 fetching)</li>
            <li>타이머 설정 (setTimeout, setInterval)</li>
            <li>이벤트 리스너 등록</li>
            <li>DOM 직접 조작</li>
            <li>localStorage 접근</li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="basic">1️⃣ useEffect 기본</h2>
        <p>useEffect 의 기본 사용법과 의존성 배열입니다.</p>

        <CodeDemo
          title="useEffect 기본"
          description="사이드 이펙트를 처리합니다."
          defaultCode={`// useEffect 기본 (개념 예시)
// import { useEffect, useState } from 'react';

// 1. 마운트 시 한 번만 실행
// function MountEffect() {
//   useEffect(() => {
//     console.log('Component mounted!');
//   }, []);  // 빈 의존성 배열
//   
//   return <div>Mount Effect</div>;
// }

// 2. 특정 상태 변경 시 실행
// function UpdateEffect() {
//   const [count, setCount] = useState(0);
//   
//   useEffect(() => {
//     console.log('Count changed:', count);
//   }, [count]);  // count 가 변경될 때마다 실행
//   
//   return (
//     <button onClick={() => setCount(count + 1)}>
//       Count: {count}
//     </button>
//   );
// }

// 3. 매 렌더링마다 실행 (주의!)
// function EveryRender() {
//   useEffect(() => {
//     console.log('Every render!');
//   });  // 의존성 배열 없음
//   
//   return <div>Every Render</div>;
// }

// 4. 언마운트 시 정리 (cleanup)
// function CleanupEffect() {
//   useEffect(() => {
//     console.log('Mounted');
//     
//     return () => {
//       console.log('Unmounting...');
//     };  // cleanup 함수
//   }, []);
//   
//   return <div>Cleanup Effect</div>;
// }

console.log('useEffect basic patterns');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="dependency">2️⃣ 의존성 배열</h2>
        <p>의존성 배열은 useEffect 가 언제 실행될지 결정합니다.</p>

        <InfoCard type="warning" title="의존성 배열 주의사항">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              의존성에 없는 변수를 사용하면 <strong>stale closure</strong> 문제 발생
            </li>
            <li>
              불필요한 의존성을 추가하면 <strong>무한 루프</strong> 발생 가능
            </li>
            <li>ESLint 플러그인이 올바른 의존성 체크</li>
          </ul>
        </InfoCard>

        <CodeDemo
          title="의존성 배열"
          description="의존성 배열의 동작을 이해합니다."
          defaultCode={`// 의존성 배열 패턴
// function DependencyExample() {
//   const [count, setCount] = useState(0);
//   const [name, setName] = useState('Alice');
//   
//   // 1. 빈 배열: 마운트 시 한 번
//   useEffect(() => {
//     console.log('Mount only');
//   }, []);
//   
//   // 2. count 의존: count 변경 시마다
//   useEffect(() => {
//     console.log('Count changed:', count);
//   }, [count]);
//   
//   // 3. 여러 의존성
//   useEffect(() => {
//     console.log('Count or name changed');
//   }, [count, name]);
//   
//   // 4. 모든 렌더링마다
//   useEffect(() => {
//     console.log('Every render');
//   });
//   
//   return <div>Dependency Example</div>;
// }

// ❌ 나쁜 예: 의존성 누락
// function BadDependency() {
//   const [count, setCount] = useState(0);
//   
//   useEffect(() => {
//     const timer = setInterval(() => {
//       console.log('Count:', count);  // 항상 0! (stale closure)
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);  // count 가 의존성에 없음!
//   
//   return <div>Bad Dependency</div>;
// }

// ✅ 좋은 예: 올바른 의존성
// function GoodDependency() {
//   const [count, setCount] = useState(0);
//   
//   useEffect(() => {
//     const timer = setInterval(() => {
//       console.log('Count:', count);  // 최신 count 값
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [count]);  // count 를 의존성에 추가
//   
//   return <div>Good Dependency</div>;
// }

console.log('Dependency array patterns');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="cleanup">3️⃣ 정리 함수 (Cleanup)</h2>
        <p>메모리 누수를 방지하기 위해 컴포넌트가 언마운트될 때 정리를 수행합니다.</p>

        <CodeDemo
          title="정리 함수"
          description="메모리 누수를 방지합니다."
          defaultCode={`// 타이머 정리
// function TimerCleanup() {
//   useEffect(() => {
//     const timerId = setTimeout(() => {
//       console.log('Timer executed');
//     }, 1000);
//     
//     // 정리 함수
//     return () => {
//       clearTimeout(timerId);
//       console.log('Timer cleared');
//     };
//   }, []);
//   
//   return <div>Timer Cleanup</div>;
// }

// 이벤트 리스너 정리
// function EventListenerCleanup() {
//   useEffect(() => {
//     const handleResize = () => {
//       console.log('Window resized');
//     };
//     
//     window.addEventListener('resize', handleResize);
//     
//     // 정리 함수
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);
//   
//   return <div>Event Listener Cleanup</div>;
// }

// 구독 정리
// function SubscriptionCleanup() {
//   useEffect(() => {
//     const subscription = someAPI.subscribe(data => {
//       console.log('Received:', data);
//     });
//     
//     // 정리 함수
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);
//   
//   return <div>Subscription Cleanup</div>;
// }

// 비동기 작업 취소
// function AsyncCleanup() {
//   useEffect(() => {
//     let cancelled = false;
//     
//     const fetchData = async () => {
//       const data = await fetchAPI();
//       if (!cancelled) {
//         setData(data);
//       }
//     };
//     
//     fetchData();
//     
//     // 정리 함수
//     return () => {
//       cancelled = true;
//     };
//   }, []);
//   
//   return <div>Async Cleanup</div>;
// }

console.log('Cleanup function patterns');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="data-fetching">4️⃣ 데이터 Fetching</h2>
        <p>useEffect 를 사용해 API 에서 데이터를 가져옵니다.</p>

        <InfoCard type="warning" title="데이터 Fetching 주의">
          <p>
            실제 프로덕션에서는 <strong>TanStack Query (React Query)</strong> 같은 라이브러리 사용을
            권장합니다. 에러 처리, 캐싱, 재시도 등을 자동으로 처리합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="데이터 Fetching"
          description="API 에서 데이터를 가져옵니다."
          defaultCode={`// 기본 데이터 Fetching
// function UserData() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch('/api/user/1');
//         const data = await response.json();
//         setUser(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     
//     fetchUser();
//   }, []);
//   
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!user) return <div>No user</div>;
//   
//   return <div>{user.name}</div>;
// }

// AbortController 로 취소 가능하게
// function FetchWithAbort() {
//   const [data, setData] = useState(null);
//   
//   useEffect(() => {
//     const controller = new AbortController();
//     
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/data', {
//           signal: controller.signal
//         });
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         if (err.name !== 'AbortError') {
//           console.error('Fetch error:', err);
//         }
//       }
//     };
//     
//     fetchData();
//     
//     // 정리 함수에서 요청 취소
//     return () => {
//       controller.abort();
//     };
//   }, []);
//   
//   return <div>Fetch with Abort</div>;
// }

console.log('Data fetching patterns');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="common-patterns">5️⃣ 흔한 패턴</h2>
        <p>useEffect 를 활용한 일반적인 패턴들입니다.</p>

        <CodeDemo
          title="흔한 패턴"
          description="자주 사용되는 useEffect 패턴입니다."
          defaultCode={`// 1. 문서 제목 업데이트
// function DocumentTitle({ title }) {
//   useEffect(() => {
//     document.title = title;
//   }, [title]);
//   
//   return <div>Title: {title}</div>;
// }

// 2. 로컬 스토리지 동기화
// function LocalStorageSync({ key, value }) {
//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);
//   
//   return <div>Synced to localStorage</div>;
// }

// 3. 키보드 이벤트
// function KeyboardHandler() {
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       console.log('Key pressed:', e.key);
//     };
//     
//     window.addEventListener('keydown', handleKeyDown);
//     
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);
//   
//   return <div>Press any key</div>;
// }

// 4. 마운트 상태 추적
// function MountStatus() {
//   const [isMounted, setIsMounted] = useState(false);
//   
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);
//   
//   return <div>{isMounted ? 'Mounted' : 'Mounting...'}</div>;
// }

// 5. 디바운스 (debounce)
// function DebouncedSearch({ query }) {
//   const [debouncedQuery, setDebouncedQuery] = useState(query);
//   
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedQuery(query);
//     }, 500);
//     
//     return () => clearTimeout(timer);
//   }, [query]);
//   
//   return <div>Searching: {debouncedQuery}</div>;
// }

console.log('Common useEffect patterns');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="pitfalls">⚠️ 흔한 함정</h2>
        <p>useEffect 사용 시 주의해야 할 점들입니다.</p>

        <InfoCard type="warning" title="무한 루프 주의">
          <p>
            의존성 배열에 상태 업데이트 함수를 포함하면 <strong>무한 루프</strong>가 발생할 수
            있습니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="흔한 함정"
          description="주의해야 할 useEffect 함정입니다."
          defaultCode={`// ❌ 무한 루프
// function InfiniteLoop() {
//   const [count, setCount] = useState(0);
//   
//   useEffect(() => {
//     setCount(count + 1);  // count 가 변경 → effect 재실행 → 무한 루프!
//   }, [count]);  // count 를 의존성에 포함
//   
//   return <div>Count: {count}</div>;
// }

// ✅ 해결: 조건부 실행
// function FixedLoop() {
//   const [count, setCount] = useState(0);
//   
//   useEffect(() => {
//     if (count < 10) {
//       setCount(count + 1);
//     }
//   }, [count]);
//   
//   return <div>Count: {count}</div>;
// }

// ❌ 객체를 의존성에 직접 사용
// function ObjectDependency() {
//   const [config, setConfig] = useState({ theme: 'dark' });
//   
//   useEffect(() => {
//     console.log('Effect ran');  // 매 렌더링마다 실행!
//   }, [config]);  // 객체는 참조 비교
//   
//   return <div>Object Dependency</div>;
// }

// ✅ 해결: 개별 값 사용
// function FixedObject() {
//   const [theme, setTheme] = useState('dark');
//   
//   useEffect(() => {
//     console.log('Effect ran');  // theme 변경 시에만 실행
//   }, [theme]);  // 원시 타입
//   
//   return <div>Fixed Object</div>;
// }

console.log('useEffect pitfalls and solutions');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>useEffect: 사이드 이펙트 처리 (API 호출, 이벤트, 타이머)</li>
            <li>
              의존성 배열: <code>[]</code> 마운트 1 회, <code>[dep]</code> dep 변경 시, 없음 매
              렌더링
            </li>
            <li>
              정리 함수: 메모리 누수 방지 (return () ={'>'} {'{...}'})
            </li>
            <li>데이터 Fetching: try-catch 로 에러 처리, AbortController 로 취소</li>
            <li>흔한 패턴: 문서 제목, localStorage, 키보드 이벤트, 디바운스</li>
            <li>주의: 무한 루프, stale closure, 객체 의존성</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
