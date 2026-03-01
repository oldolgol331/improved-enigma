import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactState() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>React State</h1>
        <p className="page-description">useState Hook 을 사용한 상태 관리에 대해 학습합니다.</p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>State</strong> 는 컴포넌트의 내부 데이터로, 변경되면 컴포넌트가 리렌더링됩니다.
          <code>useState</code> Hook 을 사용하여 상태를 관리합니다.
        </p>

        <InfoCard type="tip" title="State 특징">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>불변성</strong>: 직접 수정하지 않고 setter 로 업데이트
            </li>
            <li>
              <strong>비동기</strong>: 상태 업데이트는 비동기로 처리
            </li>
            <li>
              <strong>배치</strong>: 여러 업데이트가 배치되어 처리
            </li>
            <li>
              <strong>함수형 업데이트</strong>: 이전 상태 기반 업데이트
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="useState">1️⃣ useState 기본</h2>
        <p>useState Hook 의 기본 사용법입니다.</p>

        <CodeDemo
          title="useState 기본"
          description="상태를 생성하고 업데이트합니다."
          defaultCode={`// useState Hook (개념 예시)
// import { useState } from 'react';

// 기본 사용법
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

// useState 반환값:
// - count: 현재 상태 값
// - setCount: 상태 업데이트 함수

// 다양한 초기값
// const [text, setText] = useState('');  // 문자열
// const [items, setItems] = useState([]);  // 배열
// const [user, setUser] = useState(null);  // null
// const [loading, setLoading] = useState(true);  // boolean

// 상태 업데이트 패턴
// function UpdatePatterns() {
//   const [count, setCount] = useState(0);
//   
//   // 직접 업데이트 (간단한 경우)
//   const increment = () => setCount(count + 1);
//   
//   // 함수형 업데이트 (권장 - 이전 상태 기반)
//   const incrementSafe = () => setCount(prev => prev + 1);
//   
//   // 여러 번 업데이트
//   const incrementThree = () => {
//     setCount(prev => prev + 1);
//     setCount(prev => prev + 1);
//     setCount(prev => prev + 1);
//     // 결과: +3 (함수형 업데이트)
//   };
//   
//   return <div>Update Patterns</div>;
// }

console.log('useState basic concepts');
console.log('useState(initialValue) returns [state, setState]');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="object-state">2️⃣ 객체 상태</h2>
        <p>객체를 상태로 사용할 때는 불변성을 유지하며 업데이트해야 합니다.</p>

        <CodeDemo
          title="객체 상태"
          description="객체 상태를 불변하게 업데이트합니다."
          defaultCode={`// 객체 상태 관리
// function UserProfile() {
//   const [user, setUser] = useState({
//     name: 'Alice',
//     age: 25,
//     email: 'alice@example.com'
//   });
//   
//   // ❌ 나쁜 예: 직접 수정
//   // user.age = 26;  // React 가 변경을 감지 못함!
//   
//   // ✅ 좋은 예: 새 객체 생성
//   const updateAge = () => {
//     setUser({ ...user, age: 26 });
//   };
//   
//   const updateName = () => {
//     setUser(prev => ({ ...prev, name: 'Bob' }));
//   };
//   
//   const updateEmail = (newEmail) => {
//     setUser(prev => ({ ...prev, email: newEmail }));
//   };
//   
//   return (
//     <div>
//       <p>Name: {user.name}</p>
//       <p>Age: {user.age}</p>
//       <p>Email: {user.email}</p>
//       <button onClick={updateAge}>Update Age</button>
//     </div>
//   );
// }

// 중첩 객체 상태
// function NestedState() {
//   const [state, setState] = useState({
//     user: {
//       name: 'Alice',
//       address: {
//         city: 'Seoul',
//         zip: '12345'
//       }
//     }
//   });
//   
//   // 중첩 객체 업데이트
//   const updateCity = () => {
//     setState(prev => ({
//       ...prev,
//       user: {
//         ...prev.user,
//         address: {
//           ...prev.user.address,
//           city: 'Busan'
//         }
//       }
//     }));
//   };
//   
//   return <div>Nested State</div>;
// }

console.log('Object state with immutability');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="array-state">3️⃣ 배열 상태</h2>
        <p>배열을 상태로 사용할 때도 불변성을 유지해야 합니다.</p>

        <InfoCard type="warning" title="배열 상태 주의사항">
          <p>
            <code>push</code>, <code>pop</code>, <code>splice</code> 등 원본 배열을 변경하는
            메서드는 사용하지 마세요.
            <br />
            대신 <code>[...arr, item]</code>, <code>filter</code>, <code>map</code> 등을 사용하세요.
          </p>
        </InfoCard>

        <CodeDemo
          title="배열 상태"
          description="배열 상태를 불변하게 업데이트합니다."
          defaultCode={`// 배열 상태 관리
// function TodoList() {
//   const [todos, setTodos] = useState([
//     { id: 1, text: 'Learn React', done: false },
//     { id: 2, text: 'Build App', done: false }
//   ]);
//   
//   // 항목 추가
//   const addTodo = (text) => {
//     setTodos([
//       ...todos,
//       { id: Date.now(), text, done: false }
//     ]);
//   };
//   
//   // 항목 제거
//   const removeTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };
//   
//   // 항목 수정
//   const toggleTodo = (id) => {
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, done: !todo.done } : todo
//     ));
//   };
//   
//   return (
//     <div>
//       {todos.map(todo => (
//         <div key={todo.id}>
//           <span>{todo.text}</span>
//           <button onClick={() => toggleTodo(todo.id)}>
//             {todo.done ? 'Undo' : 'Done'}
//           </button>
//           <button onClick={() => removeTodo(todo.id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// 배열 메서드 패턴
// const [items, setItems] = useState([]);

// 추가: setItems([...items, newItem])
// 제거: setItems(items.filter(item => item.id !== id))
// 수정: setItems(items.map(item => item.id === id ? newItem : item))
// 정렬: setItems([...items].sort((a, b) => a - b))

console.log('Array state with immutability patterns');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="form-state">4️⃣ 폼 상태</h2>
        <p>입력 폼의 상태를 관리하는 방법입니다.</p>

        <CodeDemo
          title="폼 상태"
          description="입력 폼의 상태를 관리합니다."
          defaultCode={`// 폼 상태 관리
// function LoginForm() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   
//   // 입력 핸들러
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
//   
//   // 제출 핸들러
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     // API 호출 등
//   };
//   
//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         placeholder="Password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// 간단한 입력 상태
// function SimpleInput() {
//   const [text, setText] = useState('');
//   
//   return (
//     <input
//       value={text}
//       onChange={(e) => setText(e.target.value)}
//     />
//   );
// }

// 체크박스 상태
// function Checkbox() {
//   const [checked, setChecked] = useState(false);
//   
//   return (
//     <label>
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={(e) => setChecked(e.target.checked)}
//       />
//       Agree to terms
//     </label>
//   );
// }

console.log('Form state management');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="async-state">5️⃣ 비동기 상태</h2>
        <p>API 호출 등 비동기 작업의 상태를 관리합니다.</p>

        <InfoCard type="tip" title="비동기 상태 패턴">
          <p>
            <strong>loading</strong>: 로딩 중 여부
            <br />
            <strong>data</strong>: 성공한 데이터
            <br />
            <strong>error</strong>: 에러 정보
            <br />이 세 가지 상태를 함께 관리하는 것이 일반적입니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="비동기 상태"
          description="API 호출 상태를 관리합니다."
          defaultCode={`// API 호출 상태 관리
// function UserData() {
//   const [state, setState] = useState({
//     loading: false,
//     data: null,
//     error: null
//   });
//   
//   const fetchUser = async (userId) => {
//     setState({ loading: true, data: null, error: null });
//     
//     try {
//       const response = await fetch(\`/api/users/\${userId}\`);
//       const data = await response.json();
//       setState({ loading: false, data, error: null });
//     } catch (error) {
//       setState({ 
//         loading: false, 
//         data: null, 
//         error: error.message 
//       });
//     }
//   };
//   
//   if (state.loading) return <div>Loading...</div>;
//   if (state.error) return <div>Error: {state.error}</div>;
//   if (!state.data) return <div>No data</div>;
//   
//   return (
//     <div>
//       <h2>{state.data.name}</h2>
//       <p>{state.data.email}</p>
//     </div>
//   );
// }

// 별도 상태로 분리
// function SeparateState() {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('/api/data');
//       const result = await response.json();
//       setData(result);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   
//   return <div>Separate State</div>;
// }

console.log('Async state management patterns');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="derived-state">6️⃣ 파생 상태</h2>
        <p>기존 상태에서 계산된 값은 별도의 상태로 저장하지 않습니다.</p>

        <InfoCard type="warning" title="파생 상태 주의">
          <p>
            <strong>중복 상태는 버그의 원인</strong>입니다.
            <br />
            기존 상태로 계산할 수 있는 값은 별도 상태로 저장하지 마세요.
          </p>
        </InfoCard>

        <CodeDemo
          title="파생 상태"
          description="계산된 값은 별도 상태로 저장하지 않습니다."
          defaultCode={`// ❌ 나쁜 예: 중복 상태
// function BadExample() {
//   const [items, setItems] = useState([]);
//   const [count, setCount] = useState(0);  // items.length 로 계산 가능!
//   
//   const addItem = (item) => {
//     setItems([...items, item]);
//     setCount(count + 1);  // 실수로 카운트가 어긋날 수 있음!
//   };
//   
//   return <div>Bad Example</div>;
// }

// ✅ 좋은 예: 파생 값
// function GoodExample() {
//   const [items, setItems] = useState([]);
//   
//   // 파생 값 (별도 상태 불필요)
//   const count = items.length;
//   const hasItems = items.length > 0;
//   const isEmpty = items.length === 0;
//   
//   const addItem = (item) => {
//     setItems([...items, item]);
//     // count 는 자동으로 업데이트됨
//   };
//   
//   const removeItem = (id) => {
//     setItems(items.filter(item => item.id !== id));
//   };
//   
//   return (
//     <div>
//       <p>Count: {count}</p>
//       <p>Has items: {hasItems}</p>
//       <p>Empty: {isEmpty}</p>
//     </div>
//   );
// }

// 필터링된 리스트 (파생 상태)
// function FilteredList() {
//   const [items, setItems] = useState([
//   { id: 1, name: 'Apple', category: 'fruit' },
//   { id: 2, name: 'Carrot', category: 'vegetable' }
//   ]);
//   const [filter, setFilter] = useState('all');
//   
//   // 파생 값: 필터링된 리스트
//   const filteredItems = items.filter(item =>
//     filter === 'all' || item.category === filter
//   );
//   
//   return <div>Filtered List</div>;
// }

console.log('Derived state - avoid duplication');`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <code>useState</code>: <code>[state, setState] = useState(initial)</code>
            </li>
            <li>불변성: 직접 수정하지 않고 새 값 생성</li>
            <li>
              함수형 업데이트: <code>setState(prev ={'>'} newValue)</code>
            </li>
            <li>객체 상태: Spread 연산자로 복사 후 수정</li>
            <li>
              배열 상태: <code>filter</code>, <code>map</code> 등 불변 메서드 사용
            </li>
            <li>
              폼 상태: <code>value</code> 와 <code>onChange</code> 로 제어
            </li>
            <li>
              비동기 상태: <code>loading</code>, <code>data</code>, <code>error</code>
            </li>
            <li>파생 상태: 중복 상태 피하기</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
