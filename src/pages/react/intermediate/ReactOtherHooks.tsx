import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactOtherHooks() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>React 기타 Hooks</h1>
        <p className="page-description">
          useContext, useReducer, useCallback, useMemo 에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="useContext">1️⃣ useContext</h2>
        <p>Context API 를 사용해 컴포넌트 트리를 통과하지 않고 데이터를 전달합니다.</p>

        <InfoCard type="tip" title="Context 사용 시기">
          <p>
            <strong>전역 상태</strong> (테마, 인증, 언어 등) 를 여러 컴포넌트에서 사용할 때
            유용합니다.
            <br />
            Props drilling 을 피할 수 있습니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="useContext"
          description="Context 로 전역 상태를 공유합니다."
          defaultCode={`// Context 생성 (개념 예시)
// import { createContext, useContext, useState } from 'react';

// 1. Context 생성
// const ThemeContext = createContext('light');

// 2. Provider 로 감싸기
// function App() {
//   const [theme, setTheme] = useState('dark');
//   
//   return (
//     <ThemeContext.Provider value={theme}>
//       <Toolbar />
//     </ThemeContext.Provider>
//   );
// }

// 3. Consumer 에서 사용
// function ThemedButton() {
//   const theme = useContext(ThemeContext);
//   
//   return (
//     <button className={\`btn-\${theme}\`}>
//       Themed Button
//     </button>
//   );
// }

// 중첩 Context
// const UserContext = createContext(null);
// const ThemeContext = createContext('light');

// function App() {
//   return (
//     <UserContext.Provider value={{ name: 'Alice' }}>
//       <ThemeContext.Provider value="dark">
//         <Profile />
//       </ThemeContext.Provider>
//     </UserContext.Provider>
//   );
// }

// function Profile() {
//   const user = useContext(UserContext);
//   const theme = useContext(ThemeContext);
//   
//   return (
//     <div className={theme}>
//       <p>{user.name}</p>
//     </div>
//   );
// }

console.log('useContext for global state sharing');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="useReducer">2️⃣ useReducer</h2>
        <p>복잡한 상태 로직을 reducer 함수로 분리합니다.</p>

        <CodeDemo
          title="useReducer"
          description="복잡한 상태를 reducer 로 관리합니다."
          defaultCode={`// useReducer 기본 (개념 예시)
// import { useReducer } from 'react';

// reducer 함수 정의
// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return { count: state.count + 1 };
//     case 'decrement':
//       return { count: state.count - 1 };
//     case 'reset':
//       return { count: 0 };
//     default:
//       throw new Error('Unknown action');
//   }
// }

// 컴포넌트에서 사용
// function Counter() {
//   const [state, dispatch] = useReducer(reducer, { count: 0 });
//   
//   return (
//     <div>
//       <p>Count: {state.count}</p>
//       <button onClick={() => dispatch({ type: 'increment' })}>
//         +
//       </button>
//       <button onClick={() => dispatch({ type: 'decrement' })}>
//         -
//       </button>
//       <button onClick={() => dispatch({ type: 'reset' })}>
//         Reset
//       </button>
//     </div>
//   );
// }

// 복잡한 상태 예시
// function todoReducer(state, action) {
//   switch (action.type) {
//     case 'ADD':
//       return [...state, { id: Date.now(), text: action.text, done: false }];
//     case 'TOGGLE':
//       return state.map(todo =>
//         todo.id === action.id ? { ...todo, done: !todo.done } : todo
//       );
//     case 'DELETE':
//       return state.filter(todo => todo.id !== action.id);
//     default:
//       return state;
//   }
// }

// function TodoApp() {
//   const [todos, dispatch] = useReducer(todoReducer, []);
//   
//   return (
//     <div>
//       <button onClick={() => dispatch({ type: 'ADD', text: 'New Todo' })}>
//         Add Todo
//       </button>
//       {todos.map(todo => (
//         <div key={todo.id}>
//           <span>{todo.text}</span>
//           <button onClick={() => dispatch({ type: 'TOGGLE', id: todo.id })}>
//             {todo.done ? 'Undo' : 'Done'}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

console.log('useReducer for complex state logic');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="useCallback">3️⃣ useCallback</h2>
        <p>함수를 메모이제이션하여 불필요한 재생성을 방지합니다.</p>

        <InfoCard type="warning" title="useCallback 사용 시기">
          <p>
            <strong>모든 함수에 사용하지 마세요!</strong> 성능 문제가 있을 때만 사용하세요.
            <br />
            자식 컴포넌트에 함수를 props 로 전달할 때 유용합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="useCallback"
          description="함수를 메모이제이션합니다."
          defaultCode={`// useCallback 기본 (개념 예시)
// import { useCallback, useState } from 'react';

// function Form() {
//   const [value, setValue] = useState('');
//   
//   // 매 렌더링마다 새 함수 생성
//   const handleChange = (e) => setValue(e.target.value);
//   
//   return <input value={value} onChange={handleChange} />;
// }

// useCallback 사용
// function OptimizedForm() {
//   const [value, setValue] = useState('');
//   
//   // 의존성이 변경되지 않으면 같은 함수 참조 사용
//   const handleChange = useCallback((e) => {
//     setValue(e.target.value);
//   }, []);
//   
//   return <input value={value} onChange={handleChange} />;
// }

// 자식 컴포넌트에 전달 시 유용
// function Parent() {
//   const [count, setCount] = useState(0);
//   const [text, setText] = useState('');
//   
//   // 매번 새 함수 생성 → Child 불필요 리렌더링
//   // const handleClick = () => console.log('Clicked');
//   
//   // useCallback 으로 메모이제이션
//   const handleClick = useCallback(() => {
//     console.log('Clicked');
//   }, []);
//   
//   return (
//     <div>
//       <Child onClick={handleClick} />
//       <input value={text} onChange={e => setText(e.target.value)} />
//       <button onClick={() => setCount(count + 1)}>
//         Count: {count}
//       </button>
//     </div>
//   );
// }

// useMemo 와 비교
// const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);
// const memoizedCallback = useCallback(() => doSomething(id), [id]);
// // 위 아래는 동일 (useCallback 은 useMemo 의 특수한 경우)
// const memoizedCallback2 = useMemo(() => () => doSomething(id), [id]);

console.log('useCallback for function memoization');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="useMemo">4️⃣ useMemo</h2>
        <p>비싼 계산 결과를 메모이제이션합니다.</p>

        <CodeDemo
          title="useMemo"
          description="비싼 계산을 메모이제이션합니다."
          defaultCode={`// useMemo 기본 (개념 예시)
// import { useMemo, useState } from 'react';

// 비싼 계산 함수
// function expensiveCalculation(num) {
//   console.log('Calculating...');
//   for (let i = 0; i < 1000000000; i++) {}
//   return num * 2;
// }

// function ExpensiveComponent() {
//   const [count, setCount] = useState(0);
//   const [text, setText] = useState('');
//   
//   // 매 렌더링마다 계산 수행 (비효율)
//   // const doubled = expensiveCalculation(count);
//   
//   // useMemo 로 메모이제이션
//   const doubled = useMemo(() => {
//     return expensiveCalculation(count);
//   }, [count]);  // count 변경 시에만 재계산
//   
//   return (
//     <div>
//       <p>Doubled: {doubled}</p>
//       <input value={text} onChange={e => setText(e.target.value)} />
//       <button onClick={() => setCount(count + 1)}>
//         Count: {count}
//       </button>
//     </div>
//   );
// }

// 필터링된 리스트 메모이제이션
// function FilteredList({ items, filter }) {
//   const filteredItems = useMemo(() => {
//     console.log('Filtering...');
//     return items.filter(item => item.category === filter);
//   }, [items, filter]);
//   
//   return (
//     <ul>
//       {filteredItems.map(item => <li key={item.id}>{item.name}</li>)}
//     </ul>
//   );
// }

// 객체 생성 메모이제이션
// function Form({ onSubmit }) {
//   const [formData, setFormData] = useState({});
//   
//   // 매번 새 객체 생성 → 자식 컴포넌트 불필요 리렌더링
//   // const style = { color: 'red', fontSize: '16px' };
//   
//   // useMemo 로 메모이제이션
//   const style = useMemo(() => ({ 
//     color: 'red', 
//     fontSize: '16px' 
//   }), []);
//   
//   return <Child style={style} />;
// }

console.log('useMemo for expensive calculations');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="custom-hooks">5️⃣ Custom Hooks</h2>
        <p>재사용 가능한 로직을 커스텀 Hook 으로 추출합니다.</p>

        <InfoCard type="tip" title="Custom Hook 규칙">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              이름은 <code>use</code> 로 시작
            </li>
            <li>내부에서 다른 Hooks 사용 가능</li>
            <li>로직과 UI 분리에 유용</li>
          </ul>
        </InfoCard>

        <CodeDemo
          title="Custom Hooks"
          description="재사용 가능한 로직을 추출합니다."
          defaultCode={`// Custom Hook: useCounter
// function useCounter(initialValue = 0) {
//   const [count, setCount] = useState(initialValue);
//   
//   const increment = () => setCount(prev => prev + 1);
//   const decrement = () => setCount(prev => prev - 1);
//   const reset = () => setCount(initialValue);
//   
//   return { count, increment, decrement, reset };
// }

// 사용 예시
// function Counter1() {
//   const { count, increment, decrement, reset } = useCounter(0);
//   
//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={increment}>+</button>
//       <button onClick={decrement}>-</button>
//       <button onClick={reset}>Reset</button>
//     </div>
//   );
// }

// Custom Hook: useLocalStorage
// function useLocalStorage(key, initialValue) {
//   const [storedValue, setStoredValue] = useState(() => {
//     const item = localStorage.getItem(key);
//     return item ? JSON.parse(item) : initialValue;
//   });
//   
//   const setValue = (value) => {
//     setStoredValue(value);
//     localStorage.setItem(key, JSON.stringify(value));
//   };
//   
//   return [storedValue, setValue];
// }

// 사용 예시
// function ThemeToggle() {
//   const [theme, setTheme] = useLocalStorage('theme', 'light');
//   
//   return (
//     <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
//       Current: {theme}
//     </button>
//   );
// }

// Custom Hook: useFetch
// function useFetch(url) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     
//     fetchData();
//   }, [url]);
//   
//   return { data, loading, error };
// }

console.log('Custom Hooks for logic reuse');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="hooks-rules">📜 Hooks 규칙</h2>
        <p>Hooks 사용 시 반드시 지켜야 할 규칙입니다.</p>

        <InfoCard type="warning" title="Hooks 규칙">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>최상단에서만 호출</strong>: 루프, 조건, 중첩 함수 내에서 호출 금지
            </li>
            <li>
              <strong>React 함수 내에서만 호출</strong>: 일반 JavaScript 함수에서 금지
            </li>
            <li>
              ESLint 플러그인 (<code>eslint-plugin-react-hooks</code>) 사용 권장
            </li>
          </ul>
        </InfoCard>

        <CodeDemo
          title="Hooks 규칙"
          description="Hooks 의 규칙을 준수하세요."
          defaultCode={`// ❌ 나쁜 예: 조건부 호출
// function BadExample({ condition }) {
//   if (condition) {
//     useEffect(() => {  // 조건부 호출 - 금지!
//       console.log('Effect');
//     });
//   }
//   return <div>Bad</div>;
// }

// ✅ 좋은 예: 조건부 실행은 effect 내부에서
// function GoodExample({ condition }) {
//   useEffect(() => {
//     if (condition) {
//       console.log('Effect');
//     }
//   }, [condition]);
//   
//   return <div>Good</div>;
// }

// ❌ 나쁜 예: 루프 내 호출
// function BadLoop({ items }) {
//   for (let i = 0; i < items.length; i++) {
//     useEffect(() => {  // 루프 내 호출 - 금지!
//       console.log('Effect');
//     });
//   }
//   return <div>Bad Loop</div>;
// }

// ✅ 좋은 예: 루프 밖에서 호출
// function GoodLoop({ items }) {
//   useEffect(() => {
//     items.forEach(item => {
//       console.log('Item:', item);
//     });
//   }, [items]);
//   
//   return <div>Good Loop</div>;
// }

console.log('Follow Rules of Hooks');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <code>useContext</code>: Context 로 전역 상태 공유
            </li>
            <li>
              <code>useReducer</code>: 복잡한 상태 로직 분리
            </li>
            <li>
              <code>useCallback</code>: 함수 메모이제이션 (자식 props 전달 시)
            </li>
            <li>
              <code>useMemo</code>: 비싼 계산 메모이제이션
            </li>
            <li>
              <code>Custom Hooks</code>: 재사용 가능한 로직 추출
            </li>
            <li>Hooks 규칙: 최상단에서만, React 함수 내에서만</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
