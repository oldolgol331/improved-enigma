import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactContextReducer() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Context API 와 useReducer</h1>
        <p className="page-description">
          React 의 전역 상태 관리와 복잡한 상태 로직을 다루는 방법을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>Context API</strong> 는 컴포넌트 트리 전체에 데이터를 공유할 수 있게 합니다.
          <strong>useReducer</strong> 는 복잡한 상태 로직을 관리할 때 useState 보다 효과적입니다.
          둘을 함께 사용하면 전역 상태 관리 솔루션을 만들 수 있습니다.
        </p>

        <InfoCard type="tip" title="사용 시기">
          <ul>
            <li>
              <strong>Context:</strong> 여러 컴포넌트가 공유하는 데이터 (테마, 인증, 언어)
            </li>
            <li>
              <strong>useReducer:</strong> 복잡한 상태 업데이트 (폼, 장바구니, 게임)
            </li>
            <li>
              <strong>함께 사용:</strong> 전역 상태 관리 (Zustand/R Redux 대안)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="context">1️⃣ Context API 기본</h2>
        <p>
          Context 를 생성하고 제공하는 기본 방법입니다.
        </p>

        <CodeDemo
          title="Context API 기본"
          description="createContext, Provider, useContext"
          defaultCode={`import { createContext, useContext, useState } from 'react';

// 1. Context 생성
const ThemeContext = createContext(null);

// 2. Provider 로 감싸기
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. Consumer 에서 사용
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  // 4. useContext 로 값 읽기
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
    >
      현재 테마: {theme}
    </button>
  );
}

console.log('Context API 완료');`}
        />

        <InfoCard type="warning" title="Context 사용 시 주의">
          <ul>
            <li>
              <strong>불필요한 사용 금지:</strong> Props 로 충분하면 Context 금지
            </li>
            <li>
              <strong>성능:</strong> Provider 값 변경 시 모든 Consumer 리렌더링
            </li>
            <li>
              <strong>분리:</strong> 값과 업데이트 함수 Context 분리 고려
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="usereducer">2️⃣ useReducer 기본</h2>
        <p>
          useReducer 는 상태 업데이트 로직을 컴포넌트 밖으로 분리합니다.
        </p>

        <CodeDemo
          title="useReducer 기본"
          description="reducer, dispatch, action"
          defaultCode={`import { useReducer } from 'react';

// 1. Reducer 함수 정의
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.payload };
    default:
      throw new Error('Unknown action');
  }
}

// 2. 컴포넌트에서 사용
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <p>카운트: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        +1
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        -1
      </button>
      <button onClick={() => dispatch({ type: 'RESET' })}>
        리셋
      </button>
      <button onClick={() => dispatch({ type: 'SET', payload: 100 })}>
        100 으로 설정
      </button>
    </div>
  );
}

console.log('useReducer 완료');`}
        />

        <InfoCard type="tip" title="useReducer vs useState">
          <ul>
            <li>
              <strong>useState:</strong> 간단한 상태, 독립적인 값
            </li>
            <li>
              <strong>useReducer:</strong> 복잡한 상태, 여러 하위 값, 다음 상태가 이전 상태에 의존
            </li>
            <li>
              <strong>테스트:</strong> reducer 는 순수 함수라 테스트 용이
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="combined">3️⃣ Context + useReducer</h2>
        <p>
          둘을 조합하여 전역 상태 관리 솔루션을 만듭니다.
        </p>

        <CodeDemo
          title="Context + useReducer"
          description="전역 상태 관리 패턴"
          defaultCode={`import { createContext, useContext, useReducer, createContext } from 'react';

// 1. Context 생성
const StateContext = createContext(null);
const DispatchContext = createContext(null);

// 2. Reducer 정의
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    default:
      throw new Error('Unknown action');
  }
}

// 3. Provider 컴포넌트
const initialState = {
  user: null,
  theme: 'light',
  notifications: []
};

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// 4. 커스텀 훅
function useState() {
  return useContext(StateContext);
}

function useDispatch() {
  return useContext(DispatchContext);
}

// 5. 사용 예시
function UserProfile() {
  const state = useState();
  const dispatch = useDispatch();
  
  return (
    <div>
      {state.user ? (
        <p>환영합니다, {state.user.name}님!</p>
      ) : (
        <button onClick={() => dispatch({
          type: 'SET_USER',
          payload: { name: 'Alice' }
        })}>
          로그인
        </button>
      )}
    </div>
  );
}

console.log('Context + useReducer 완료');`}
        />

        <InfoCard type="tip" title="전역 상태 관리 패턴">
          <ul>
            <li>
              <strong>Context 분리:</strong> 상태와 디스패치 분리 (불필요한 리렌더링 방지)
            </li>
            <li>
              <strong>커스텀 훅:</strong> useState, useDispatch 같은 훅 제공
            </li>
            <li>
              <strong>액션 타입:</strong> 상수로 정의하여 오타 방지
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="shopping-cart">4️⃣ 실전: 장바구니</h2>
        <p>
          장바구니 상태를 useReducer 로 관리하는 실전 예제입니다.
        </p>

        <CodeDemo
          title="장바구니 상태 관리"
          description="add, remove, update 액션"
          defaultCode={`import { useReducer, createContext, useContext } from 'react';

// 1. Cart Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        item => item.id === action.payload.id
      );
      
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    default:
      throw new Error('Unknown action');
  }
}

// 2. Context 생성
const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

// 3. Provider
const initialState = { items: [] };

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  
  // 파생 값 계산
  const totalItems = cart.items.reduce(
    (sum, item) => sum + item.quantity, 0
  );
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  
  const value = { ...cart, totalItems, totalPrice };
  
  return (
    <CartContext.Provider value={value}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

// 4. 커스텀 훅
function useCart() {
  return useContext(CartContext);
}

function useCartDispatch() {
  return useContext(CartDispatchContext);
}

console.log('장바구니 완료');`}
        />

        <InfoCard type="tip" title="장바구니 패턴">
          <ul>
            <li>
              <strong>파생 값:</strong> totalItems, totalPrice 는 reducer 밖에서 계산
            </li>
            <li>
              <strong>불변성:</strong> 항상 새 객체 반환
            </li>
            <li>
              <strong>액션 그룹화:</strong> 관련 액션은 파일로 분리
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="performance">5️⃣ 성능 최적화</h2>
        <p>
          Context 와 useReducer 를 성능 최적화하는 방법입니다.
        </p>

        <CodeDemo
          title="성능 최적화"
          description="메모이제이션, Context 분리"
          defaultCode={`import { 
  createContext, useContext, useReducer, 
  useMemo, useCallback 
} from 'react';

// 1. Context 분리 (상태와 액션)
const StateContext = createContext(null);
const ActionsContext = createContext(null);

// 2. 메모이제이션된 Provider
function OptimizedProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // 액션 함수 메모이제이션
  const actions = useMemo(() => ({
    addUser: (user) => dispatch({ type: 'ADD_USER', payload: user }),
    removeUser: (id) => dispatch({ type: 'REMOVE_USER', payload: id }),
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme })
  }), []);
  
  // 상태는 그대로 전달
  return (
    <StateContext.Provider value={state}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </StateContext.Provider>
  );
}

// 3. 선택적 구독 (필요한 상태만)
function useUser() {
  const state = useContext(StateContext);
  return state.user;  // user 만 구독
}

function useTheme() {
  const state = useContext(StateContext);
  return state.theme;  // theme 만 구독
}

// 4. 액션 훅
function useActions() {
  return useContext(ActionsContext);
}

// 5. 사용 예시
function ThemedComponent() {
  const theme = useTheme();  // theme 변경 시만 리렌더링
  const { setTheme } = useActions();
  
  return <button onClick={() => setTheme('dark')}>Dark</button>;
}

console.log('성능 최적화 완료');`}
        />

        <InfoCard type="tip" title="성능 최적화 기법">
          <ul>
            <li>
              <strong>Context 분리:</strong> 상태/액션 분리하여 불필요한 리렌더링 방지
            </li>
            <li>
              <strong>useMemo:</strong> 액션 함수 메모이제이션
            </li>
            <li>
              <strong>선택적 구독:</strong> 필요한 상태만 useContext
            </li>
            <li>
              <strong>대안:</strong> Zustand, Jotai 같은 라이브러리 고려
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Context API:</strong> 전역 데이터 공유 (테마, 인증)
          </li>
          <li>
            <strong>useReducer:</strong> 복잡한 상태 로직 관리
          </li>
          <li>
            <strong>조합:</strong> 전역 상태 관리 솔루션 구축
          </li>
          <li>
            <strong>Context 분리:</strong> 상태와 액션 분리 (성능)
          </li>
          <li>
            <strong>커스텀 훅:</strong> 편리한 인터페이스 제공
          </li>
          <li>
            <strong>대안:</strong> Zustand (간단함), Redux (대규모)
          </li>
        </ul>
      </section>
    </div>
  );
}
