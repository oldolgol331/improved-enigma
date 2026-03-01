import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ZustandStateManagement() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Zustand 상태 관리</h1>
        <p className="page-description">
          현대적이고 간단한 React 상태 관리 라이브러리 Zustand 에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>Zustand</strong> 는 독일어로 "상태"를 의미하며, 작고 빠른 상태 관리 라이브러리입니다.
          Redux 보다 간단하고, Context 보다 성능이 우수하며, 보일러플레이트가 거의 없습니다.
        </p>

        <InfoCard type="tip" title="Zustand 특징">
          <ul>
            <li>
              <strong>간단함:</strong> 1KB 미만, 최소한의 보일러플레이트
            </li>
            <li>
              <strong>성능:</strong> 불필요한 리렌더링 없음 (selector 사용)
            </li>
            <li>
              <strong>유연성:</strong> Context Provider 불필요, 어디서나 사용 가능
            </li>
            <li>
              <strong>DevTools:</strong> Redux DevTools 지원
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="installation">1️⃣ 설치 및 기본 사용법</h2>
        <p>
          Zustand 는 매우 간단하게 사용할 수 있습니다.
        </p>

        <CodeDemo
          title="Zustand 기본 사용법"
          description="스토어 생성과 사용"
          defaultCode={`// 1. 설치
// npm install zustand

// 2. 스토어 생성
import { create } from 'zustand';

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// 3. 컴포넌트에서 사용
function Counter() {
  // 스토어에서 상태와 액션 가져오기
  const { count, increment, decrement } = useCounterStore();

  return (
    <div>
      <h1>카운트: {count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

// 4. 전체 상태 가져오기
const state = useCounterStore.getState();
console.log('현재 상태:', state);

// 5. 상태 구독하기 (컴포넌트 외부)
const unsubscribe = useCounterStore.subscribe(
  (state) => state.count,
  (count) => console.log('카운트 변경:', count)
);

// 구독 해제
// unsubscribe();

console.log('Zustand 기본 예시 완료');`}
        />

        <InfoCard type="tip" title="useStore 네이밍">
          <p>
            Zustand 훅은 <code>use</code> 접두사를 사용하는 것이 컨벤션입니다.
            예: <code>useCounterStore</code>, <code>useAuthStore</code>
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="selector">2️⃣ Selector (선택적 구독)</h2>
        <p>
          Selector 를 사용해 특정 값만 구독하면 불필요한 리렌더링을 방지할 수 있습니다.
        </p>

        <CodeDemo
          title="Selector 활용"
          description="성능 최적화"
          defaultCode={`// 1. 전체 상태 구독 (비효율적)
function MyComponent() {
  const { count, name, theme } = useCounterStore();
  // count, name, theme 중 하나라도 변경되면 리렌더링
}

// 2. Selector 사용 (권장)
function MyComponent() {
  // count 만 구독 (name, theme 변경 시 리렌더링 안 됨)
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);

  return (
    <div>
      <h1>카운트: {count}</h1>
      <button onClick={increment}>+</button>
    </div>
  );
}

// 3. 여러 값 선택
function UserInfo() {
  const { name, email } = useCounterStore((state) => ({
    name: state.user.name,
    email: state.user.email,
  }));

  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
    </div>
  );
}

// 4. 얕은 비교 사용 (객체 반환 시)
import { shallow } from 'zustand/shallow';

function UserInfoOptimized() {
  const { name, email } = useCounterStore(
    (state) => ({
      name: state.user.name,
      email: state.user.email,
    }),
    shallow  // 얕은 비교로 불필요한 리렌더링 방지
  );

  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
    </div>
  );
}

// 5. 파생 값 계산
function DerivedValue() {
  // count 가 변경될 때마다 계산
  const doubled = useCounterStore((state) => state.count * 2);
  
  return <p>두 배: {doubled}</p>;
}

console.log('Selector 예시 완료');`}
        />

        <InfoCard type="tip" title="Selector 성능 팁">
          <ul>
            <li>
              <strong>최소한의 상태:</strong> 필요한 값만 선택
            </li>
            <li>
              <strong>얕은 비교:</strong> 객체 반환 시 <code>shallow</code> 사용
            </li>
            <li>
              <strong>계산 최적화:</strong> 무거운 계산은 스토어 내부에서
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="actions">3️⃣ 액션과 비동기</h2>
        <p>
          Zustand 에서 액션은 일반 함수이며, 비동기 작업도 쉽게 처리할 수 있습니다.
        </p>

        <CodeDemo
          title="액션과 비동기 처리"
          description="동기/비동기 액션"
          defaultCode={`interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  fetchTodos: () => Promise<void>;
}

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  // 1. 동기 액션
  addTodo: (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    
    set((state) => ({
      todos: [...state.todos, newTodo],
    }));
  },

  // 2. 현재 상태 접근 (get 사용)
  toggleTodo: (id: number) => {
    const todos = get().todos;
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    set({ todos: updatedTodos });
  },

  // 3. 비동기 액션
  fetchTodos: async () => {
    set({ loading: true, error: null });
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const todos = await response.json();
      set({ todos, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false 
      });
    }
  },
}));

// 4. 컴포넌트에서 사용
function TodoList() {
  const { todos, loading, error, addTodo, fetchTodos } = useTodoStore();

  React.useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div>
      <button onClick={() => addTodo('새 할 일')}>추가</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

console.log('비동기 액션 예시 완료');`}
        />

        <InfoCard type="tip" title="비동기 패턴">
          <ul>
            <li>
              <strong>loading/error 상태:</strong> 비동기 작업 상태 관리
            </li>
            <li>
              <strong>try-catch:</strong> 에러 처리 필수
            </li>
            <li>
              <strong>TanStack Query:</strong> 복잡한 데이터 페칭은 고려
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="middleware">4️⃣ 미들웨어</h2>
        <p>
          Zustand 는 미들웨어를 통해 기능을 확장할 수 있습니다.
        </p>

        <CodeDemo
          title="미들웨어 활용"
          description="persist, devtools 미들웨어"
          defaultCode={`import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 1. persist 미들웨어 (localStorage 에 저장)
interface AuthState {
  user: { id: number; name: string } | null;
  token: string | null;
  login: (user: { id: number; name: string }, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',  // localStorage 키
      storage: createJSONStorage(() => localStorage),  // 저장소 (기본: localStorage)
      partialize: (state) => ({ token: state.token }),  // 일부만 저장
      // onRehydrateStorage: () => (state, error) => { ... },  // 복원 시 콜백
    }
  )
);

// 2. devtools 미들웨어 (Redux DevTools)
import { devtools } from 'zustand/middleware';

const useCounterStore = create<CounterStore>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set({ count: get().count + 1 }, false, 'increment'),
      decrement: () => set({ count: get().count - 1 }, false, 'decrement'),
    }),
    { name: 'CounterStore' }  // DevTools 에서 표시될 이름
  )
);

// 3. 미들웨어 체이닝 (여러 미들웨어 조합)
const useStore = create<MyState>()(
  devtools(
    persist(
      (set) => ({
        // ... 상태와 액션
      }),
      { name: 'my-storage' }
    ),
    { name: 'MyStore' }
  )
);

// 4. immer 미들웨어 (불변성 간소화)
// npm install zustand immer
import { immer } from 'zustand/middleware/immer';

interface State {
  users: { id: number; name: string }[];
  addUser: (name: string) => void;
}

const useUserStore = create<State>()(
  immer((set) => ({
    users: [],
    addUser: (name) => {
      set((state) => {
        // 직접 수정 가능 (immer 가 불변성 처리)
        state.users.push({ id: Date.now(), name });
      });
    },
  }))
);

console.log('미들웨어 예시 완료');`}
        />

        <InfoCard type="tip" title="주요 미들웨어">
          <ul>
            <li>
              <code>persist</code>: localStorage/sessionStorage 에 상태 저장
            </li>
            <li>
              <code>devtools</code>: Redux DevTools 연결
            </li>
            <li>
              <code>immer</code>: 불변성 간소화 (직접 수정 가능)
            </li>
            <li>
              <code>subscribeWithSelector</code>: 선택기 구독 향상
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="slices">5️⃣ 스토어 슬라이스 패턴</h2>
        <p>
          큰 스토어를 여러 슬라이스로 나누어 관리할 수 있습니다.
        </p>

        <CodeDemo
          title="스토어 슬라이스 패턴"
          description="모듈식 스토어 설계"
          defaultCode={`import { create } from 'zustand';

// 1. 개별 슬라이스 정의
type AuthSlice = {
  user: { id: number; name: string } | null;
  isAuthenticated: boolean;
  login: (user: { id: number; name: string }) => void;
  logout: () => void;
};

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
});

// 2. 카운터 슬라이스
type CounterSlice = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

const createCounterSlice: StateCreator<CounterSlice> = (set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
});

// 3. 슬라이스 병합
type MyStore = AuthSlice & CounterSlice;

const useStore = create<MyStore>()((...args) => ({
  ...createAuthSlice(...args),
  ...createCounterSlice(...args),
}));

// 4. 컴포넌트에서 사용
function MyComponent() {
  const { user, isAuthenticated } = useStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  }));
  
  const { count, increment } = useStore((state) => ({
    count: state.count,
    increment: state.increment,
  }));

  return (
    <div>
      <p>사용자: {user?.name || '게스트'}</p>
      <p>카운트: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}

// 5. 교차 슬라이스 액션 (한 액션이 여러 슬라이스 영향)
type CombinedSlice = AuthSlice & CounterSlice & {
  resetAll: () => void;
};

const useCombinedStore = create<CombinedSlice>()((...args) => ({
  ...createAuthSlice(...args),
  ...createCounterSlice(...args),
  resetAll: () =>
    set({
      ...createAuthSlice(() => {} as any),
      ...createCounterSlice(() => {} as any),
    }),
}));

console.log('슬라이스 패턴 예시 완료');`}
        />

        <InfoCard type="tip" title="슬라이스 패턴 장점">
          <ul>
            <li>
              <strong>모듈화:</strong> 관심사 분리
            </li>
            <li>
              <strong>재사용성:</strong> 슬라이스 재사용 가능
            </li>
            <li>
              <strong>테스트:</strong> 개별 슬라이스 테스트 용이
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="comparison">6️⃣ 상태 관리 비교</h2>
        <p>
          Zustand 를 다른 상태 관리 솔루션과 비교합니다.
        </p>

        <CodeDemo
          title="상태 관리 라이브러리 비교"
          description="Zustand vs Redux vs Context"
          defaultCode={`// ============================================
// 1. React Context (내장)
// ============================================
// 장점: 별도 설치 불필요, 내장
// 단점: 성능 (모든 구독자 리렌더링), 보일러플레이트
// 사용 사례:低频度 업데이트 (테마, 인증)

// const ThemeContext = createContext();
// <ThemeContext.Provider value={theme}>
//   <App />
// </ThemeContext.Provider>

// ============================================
// 2. Redux Toolkit (공식 권장)
// ============================================
// 장점: 강력한 DevTools, 미들웨어, 시간여행 디버깅
// 단점: 보일러플레이트, 러닝 커브
// 사용 사례: 대규모 앱, 복잡한 상태 로직

// import { createSlice } from '@reduxjs/toolkit';
// const counterSlice = createSlice({
//   name: 'counter',
//   initialState: { value: 0 },
//   reducers: { increment: (state) => { state.value += 1; } }
// });

// ============================================
// 3. Zustand (현대적 대안)
// ============================================
// 장점: 간단함, 성능, 최소 보일러플레이트
// 단점: Redux 보다 적은 기능
// 사용 사례: 대부분의 앱, 빠른 프로토타이핑

// import { create } from 'zustand';
// const useStore = create((set) => ({
//   count: 0,
//   increment: () => set((state) => ({ count: state.count + 1 }))
// }));

// ============================================
// 4. Jotai/Recoil (원자적 상태)
// ============================================
// 장점: 세밀한 리렌더링 제어, 파생 상태
// 단점: 새로운 패러다임 학습 필요
// 사용 사례: 세밀한 상태 제어 필요

// import { atom, useAtom } from 'jotai';
// const countAtom = atom(0);
// const [count, setCount] = useAtom(countAtom);

// ============================================
// 5. TanStack Query (서버 상태)
// ============================================
// 장점: 캐싱, 재요청, 로딩/에러 처리
// 단점: 클라이언트 상태용 아님
// 사용 사례: API 데이터 페칭

// import { useQuery } from '@tanstack/react-query';
// const { data, isLoading } = useQuery({
//   queryKey: ['todos'],
//   queryFn: () => fetch('/api/todos').then(r => r.json())
// });

console.log('비교 예시 완료');`}
        />

        <InfoCard type="tip" title="상태 관리 선택 가이드">
          <ul>
            <li>
              <strong>Context:</strong> 간단한 전역 상태 (테마, 언어)
            </li>
            <li>
              <strong>Zustand:</strong> 대부분의 앱 (권장)
            </li>
            <li>
              <strong>Redux:</strong> 대규모 엔터프라이즈 앱
            </li>
            <li>
              <strong>TanStack Query:</strong> 서버 상태 (API 데이터)
            </li>
            <li>
              <strong>Jotai/Recoil:</strong> 세밀한 원자적 상태
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Zustand:</strong> 간단하고 빠른 상태 관리 (1KB 미만)
          </li>
          <li>
            <strong>create:</strong> 스토어 생성, Provider 불필요
          </li>
          <li>
            <strong>Selector:</strong> 성능 최적화 (불필요한 리렌더링 방지)
          </li>
          <li>
            <strong>미들웨어:</strong> persist, devtools, immer 등
          </li>
          <li>
            <strong>슬라이스:</strong> 모듈식 스토어 설계
          </li>
          <li>
            <strong>비동기:</strong> async/await 로 간단 처리
          </li>
          <li>
            <strong>비교:</strong> Context 보다 성능, Redux 보다 간단
          </li>
        </ul>
      </section>
    </div>
  );
}