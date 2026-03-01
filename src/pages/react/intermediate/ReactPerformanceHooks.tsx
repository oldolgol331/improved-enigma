import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactPerformanceHooks() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>React 성능 최적화 Hooks</h1>
        <p className="page-description">
          useRef, useMemo, useCallback 을 활용한 성능 최적화 기법을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          React 는 기본적으로 효율적으로 렌더링하지만, <strong>대규모 애플리케이션</strong>에서는
          의도치 않은 리렌더링이 성능 저하를 유발할 수 있습니다. 이 페이지에서는 <code>useRef</code>
          , <code>useMemo</code>, <code>useCallback</code> 을 활용해 성능을 최적화하는 방법을
          다룹니다.
        </p>

        <InfoCard type="warning" title="최적화는 신중하게">
          <p>
            <strong>premature optimization 은 금물</strong>입니다.
            <br />
            실제로 성능 문제가 있을 때만 최적화를 적용하세요. React 는 기본적으로 매우 빠릅니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="useRef-basics">1️⃣ useRef 기본</h2>
        <p>
          <code>useRef</code> 는 <strong>렌더링에 영향을 주지 않는</strong> 변경 가능한 값을
          저장합니다.
        </p>

        <CodeDemo
          title="useRef 기본 사용법"
          description="ref 는 렌더링을 트리거하지 않습니다."
          defaultCode={`// useRef 개념 예시
// import { useRef, useState } from 'react';

// 1. DOM 접근
// function FocusInput() {
//   const inputRef = useRef(null);
//
//   const focusInput = () => {
//     inputRef.current.focus();
//   };
//
//   return (
//     <div>
//       <input ref={inputRef} type="text" />
//       <button onClick={focusInput}>Focus</button>
//     </div>
//   );
// }

// 2. 변경 가능한 값 저장 (렌더링 없음)
// function CounterWithRef() {
//   const countRef = useRef(0);
//   const [forceRender, setForceRender] = useState(0);
//
//   const increment = () => {
//     countRef.current += 1;
//     console.log('Count:', countRef.current);
//     // setForceRender(countRef.current); // 이거 없으면 리렌더링 안됨
//   };
//
//   return (
//     <div>
//       <p>Count (ref): {countRef.current}</p>
//       <p>Force Render: {forceRender}</p>
//       <button onClick={increment}>Increment</button>
//       <button onClick={() => setForceRender(f => f + 1)}>
//         Force Render
//       </button>
//     </div>
//   );
// }

// useState vs useRef 비교
// - useState: 값 변경 → 리렌더링
// - useRef: 값 변경 → 리렌더링 없음

console.log('useRef stores mutable value without re-rendering');`}
          editable={true}
        />

        <InfoCard type="tip" title="useRef vs useState">
          <table style={{ width: '100%', fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>기능</th>
                <th style={{ textAlign: 'left' }}>useState</th>
                <th style={{ textAlign: 'left' }}>useRef</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>리렌더링</td>
                <td>✅ 발생</td>
                <td>❌ 발생 안 함</td>
              </tr>
              <tr>
                <td>지속성</td>
                <td>✅ 렌더링 간 유지</td>
                <td>✅ 렌더링 간 유지</td>
              </tr>
              <tr>
                <td>초기값</td>
                <td>
                  <code>useState(initial)</code>
                </td>
                <td>
                  <code>useRef(initial)</code>
                </td>
              </tr>
              <tr>
                <td>접근</td>
                <td>그대로</td>
                <td>
                  <code>.current</code>
                </td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="useRef-advanced">2️⃣ useRef 심화 활용</h2>
        <p>
          ref 는 DOM 접근 외에도 <strong>이전 값 저장</strong>, <strong>타이머 관리</strong> 등
          다양한 용도로 사용됩니다.
        </p>

        <CodeDemo
          title="useRef 심화 활용"
          description="이전 값 저장, 타이머 관리 등에 활용합니다."
          defaultCode={`// useRef 고급 활용
// import { useRef, useEffect } from 'react';

// 1. 이전 값 추적
// function PreviousValue({ value }) {
//   const prevRef = useRef();
//   const prevValue = prevRef.current;
//
//   useEffect(() => {
//     prevRef.current = value;
//   }, [value]);
//
//   return (
//     <div>
//       <p>Current: {value}</p>
//       <p>Previous: {prevValue}</p>
//     </div>
//   );
// }

// 2. 타이머 ID 저장 (클린업 용이)
// function TimerComponent() {
//   const timerRef = useRef(null);
//   const [count, setCount] = useState(0);
//
//   useEffect(() => {
//     timerRef.current = setInterval(() => {
//       setCount(c => c + 1);
//     }, 1000);
//
//     // 클린업: 컴포넌트 언마운트 시 타이머 제거
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, []);
//
//   return <div>Count: {count}</div>;
// }

// 3. 함수 저장 (콜백 ref 패턴)
// function CallbackRefExample() {
//   const callbackRef = useRef(null);
//
//   useEffect(() => {
//     if (callbackRef.current) {
//       callbackRef.current('Mounted!');
//     }
//   }, []);
//
//   return <div>Callback ref example</div>;
// }

// 4. 렌더링 횟수 추적 (개발용)
// function RenderCounter() {
//   const renderCountRef = useRef(0);
//   renderCountRef.current += 1;
//
//   useEffect(() => {
//     console.log('Render count:', renderCountRef.current);
//   });
//
//   return <div>Render count: {renderCountRef.current}</div>;
// }

console.log('useRef advanced patterns');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="useMemo-deep">3️⃣ useMemo 심층 분석</h2>
        <p>
          <code>useMemo</code> 는 <strong>비싼 계산</strong> 결과를 캐싱하고, 의존성이 변경될 때만
          재계산합니다.
        </p>

        <InfoCard type="warning" title="useMemo 오용 주의">
          <p>
            <strong>모든 계산에 사용하지 마세요!</strong> useMemo 자체에도 오버헤드가 있습니다.
            <br />
            실제로 느린 계산이거나, 자주 계산되는 경우에만 사용하세요.
          </p>
        </InfoCard>

        <CodeDemo
          title="useMemo 심층 분석"
          description="올바른 useMemo 사용 패턴을 학습합니다."
          defaultCode={`// useMemo 올바른 사용
// import { useMemo, useState } from 'react';

// 1. 비싼 계산 캐싱
// function ExpensiveCalculation({ numbers }) {
//   const sum = useMemo(() => {
//     console.log('Computing sum...');
//     return numbers.reduce((acc, num) => acc + num, 0);
//   }, [numbers]);  // numbers 변경 시에만 재계산
//
//   return <div>Sum: {sum}</div>;
// }

// 2. 객체 참조 안정화 (자식 컴포넌트 리렌더링 방지)
// function Parent() {
//   const [count, setCount] = useState(0);
//   const [text, setText] = useState('');
//
//   // ❌ 나쁨: 매 렌더링마다 새 객체 생성
//   // const config = { theme: 'dark', lang: 'ko' };
//
//   // ✅ 좋음: 의존성 없으면 빈 배열
//   const config = useMemo(() => ({
//     theme: 'dark',
//     lang: 'ko'
//   }), []);
//
//   return (
//     <div>
//       <Child config={config} />
//       <input value={text} onChange={e => setText(e.target.value)} />
//       <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
//     </div>
//   );
// }

// 3. 배열 필터링/가공 메모이제이션
// function FilteredList({ items, filter }) {
//   const filtered = useMemo(() => {
//     console.log('Filtering items...');
//     return items
//       .filter(item => item.category === filter)
//       .sort((a, b) => a.name.localeCompare(b.name));
//   }, [items, filter]);
//
//   return (
//     <ul>
//       {filtered.map(item => <li key={item.id}>{item.name}</li>)}
//     </ul>
//   );
// }

console.log('useMemo for expensive calculations and reference stability');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="useCallback-deep">4️⃣ useCallback 심층 분석</h2>
        <p>
          <code>useCallback</code> 은 <strong>함수 참조를 메모이제이션</strong>합니다.
          <code>React.memo</code> 와 함께 사용할 때 효과적입니다.
        </p>

        <CodeDemo
          title="useCallback 심층 분석"
          description="함수 참조 안정화로 불필요한 리렌더링을 방지합니다."
          defaultCode={`// useCallback 올바른 사용
// import { useCallback, useState, memo } from 'react';

// 자식 컴포넌트 (React.memo 로 감쌈)
// const Child = memo(function Child({ onClick, data }) {
//   console.log('Child rendered');
//   return <button onClick={onClick}>{data}</button>;
// });

// 부모 컴포넌트
// function Parent() {
//   const [count, setCount] = useState(0);
//   const [text, setText] = useState('');
//
//   // ❌ 나쁨: 매번 새 함수 생성 → Child 불필요 리렌더링
//   // const handleClick = () => console.log('Clicked', count);
//
//   // ✅ 좋음: 함수 참조 메모이제이션
//   const handleClick = useCallback(() => {
//     console.log('Clicked', count);
//   }, [count]);  // count 변경 시에만 새 함수 생성
//
//   return (
//     <div>
//       <Child onClick={handleClick} data="Click me" />
//       <input value={text} onChange={e => setText(e.target.value)} />
//       <button onClick={() => setCount(c => c + 1)}>
//         Count: {count}
//       </button>
//     </div>
//   );
// }

// 콜백 의존성 관리
// function Form({ onSubmit }) {
//   const [formData, setFormData] = useState({});
//
//   // ✅ 의존성 최소화 패턴
//   const handleSubmit = useCallback(() => {
//     onSubmit(formData);
//   }, [formData, onSubmit]);
//
//   // ✅ 함수형 업데이트로 의존성 제거
//   const incrementCount = useCallback((setter) => {
//     setter(prev => prev + 1);
//   }, []);  // 의존성 없음!
//
//   return <button onClick={handleSubmit}>Submit</button>;
// }

console.log('useCallback for function reference stability');`}
          editable={true}
        />

        <InfoCard type="tip" title="useCallback vs useMemo">
          <p>
            <code>useCallback(fn, deps)</code> 는 <code>{'useMemo(() => fn, deps)'}</code> 와
            동일합니다.
            <br />
            <code>useCallback</code> 은 <strong>함수 자체</strong>를 메모이제이션하고,
            <br />
            <code>useMemo</code> 는 <strong>함수 실행 결과</strong>를 메모이제이션합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="react-memo">5️⃣ React.memo 와 조합</h2>
        <p>
          <code>React.memo</code> 는 props 가 변경되지 않았을 때 컴포넌트를 재렌더링하지 않습니다.
        </p>

        <CodeDemo
          title="React.memo 와 조합"
          description="useCallback, useMemo 와 함께 사용해 리렌더링을 최적화합니다."
          defaultCode={`// React.memo 기본
// import { memo, useState, useCallback } from 'react';

// 자식 컴포넌트 메모이제이션
// const MemoizedChild = memo(function Child({ value, onClick }) {
//   console.log('Child rendered with', value);
//   return (
//     <div>
//       <p>Value: {value}</p>
//       <button onClick={onClick}>Click</button>
//     </div>
//   );
// });

// 부모 컴포넌트
// function Parent() {
//   const [count, setCount] = useState(0);
//   const [text, setText] = useState('');
//
//   // useCallback 없으면 memo 의미 없음 (매번 새 함수 전달)
//   const handleClick = useCallback(() => {
//     console.log('Clicked');
//   }, []);
//
//   return (
//     <div>
//       <MemoizedChild value={count} onClick={handleClick} />
//       <input value={text} onChange={e => setText(e.target.value)} />
//       <button onClick={() => setCount(c => c + 1)}>
//         Count: {count}
//       </button>
//     </div>
//   );
// }

// custom comparison 함수
// const CustomChild = memo(function Child({ a, b }) {
//   return <div>{a} - {b}</div>;
// }, (prevProps, nextProps) => {
//   // 직접 비교 로직 (기본은 얕은 비교)
//   return prevProps.a === nextProps.a && prevProps.b === nextProps.b;
// });

console.log('React.memo prevents unnecessary re-renders');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="optimization-patterns">6️⃣ 최적화 패턴 정리</h2>
        <p>실제 애플리케이션에서 활용할 수 있는 최적화 패턴입니다.</p>

        <CodeDemo
          title="최적화 패턴 정리"
          description="실전 최적화 패턴을 적용합니다."
          defaultCode={`// 최적화 패턴 1: 리스트 가상화 (개념)
// function VirtualizedList({ items }) {
//   const containerRef = useRef(null);
//   const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
//
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
//
//     const handleScroll = () => {
//       const scrollTop = container.scrollTop;
//       const itemHeight = 50;
//       const start = Math.floor(scrollTop / itemHeight);
//       const end = start + 20;  // 화면에 보이는 항목 수
//       setVisibleRange({ start, end });
//     };
//
//     container.addEventListener('scroll', handleScroll);
//     return () => container.removeEventListener('scroll', handleScroll);
//   }, []);
//
//   const visibleItems = useMemo(() => {
//     return items.slice(visibleRange.start, visibleRange.end);
//   }, [items, visibleRange]);
//
//   return (
//     <div ref={containerRef} style={{ height: '400px', overflow: 'auto' }}>
//       <div style={{ height: items.length * 50 }}>
//         {visibleItems.map(item => (
//           <div key={item.id} style={{ height: 50 }}>{item.name}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

// 최적화 패턴 2: 디바운스
// function DebouncedSearch({ onSearch }) {
//   const timerRef = useRef(null);
//   const [query, setQuery] = useState('');
//
//   const handleSearch = useCallback((q) => {
//     if (timerRef.current) {
//       clearTimeout(timerRef.current);
//     }
//
//     timerRef.current = setTimeout(() => {
//       onSearch(q);
//     }, 300);  // 300ms 디바운스
//   }, [onSearch]);
//
//   useEffect(() => {
//     return () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//       }
//     };
//   }, []);
//
//   return (
//     <input
//       value={query}
//       onChange={e => {
//         setQuery(e.target.value);
//         handleSearch(e.target.value);
//       }}
//     />
//   );
// }

// 최적화 패턴 3: 지연 로딩
// function LazyImage({ src, alt }) {
//   const imgRef = useRef(null);
//   const [loaded, setLoaded] = useState(false);
//   const [visible, setVisible] = useState(false);
//
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { rootMargin: '100px' }
//     );
//
//     if (imgRef.current) {
//       observer.observe(imgRef.current);
//     }
//
//     return () => observer.disconnect();
//   }, []);
//
//   return (
//     <img
//       ref={imgRef}
//       src={visible ? src : ''}
//       alt={alt}
//       onLoad={() => setLoaded(true)}
//       style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
//     />
//   );
// }

console.log('Optimization patterns for real-world apps');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <code>useRef</code>: 렌더링 없이 값 저장 (DOM, 타이머, 이전 값)
            </li>
            <li>
              <code>useMemo</code>: 비싼 계산 결과 캐싱, 객체/배열 참조 안정화
            </li>
            <li>
              <code>useCallback</code>: 함수 참조 메모이제이션 (React.memo 와 함께)
            </li>
            <li>
              <code>React.memo</code>: props 변경 없으면 리렌더링 방지
            </li>
            <li>
              <strong>최적화는 측정 후</strong>: 실제로 필요한 곳에만 적용
            </li>
            <li>디바운스, 지연 로딩, 가상화 등 실전 패턴 활용</li>
          </ul>
        </div>
      </section>

      <style>{`
        .summary-box table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
          margin-top: 1rem;
        }
        
        .summary-box th,
        .summary-box td {
          padding: 0.5rem;
          border: 1px solid var(--border-light);
          text-align: left;
        }
        
        .summary-box th {
          background: var(--bg-tertiary);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
