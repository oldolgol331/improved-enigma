import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactCustomHooks() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>React Custom Hooks</h1>
        <p className="page-description">
          재사용 가능한 로직을 추출하는 Custom Hooks 패턴에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>Custom Hooks</strong> 는 여러 컴포넌트에서 재사용할 수 있는 로직을
          함수로 추출한 것입니다. <code>use</code> 접두사를 사용하며,
          다른 Hooks 를 호출할 수 있습니다.
        </p>

        <InfoCard type="tip" title="Custom Hooks 사용 시기">
          <ul>
            <li>
              <strong>로직 재사용:</strong> 여러 컴포넌트에서 같은 로직 사용
            </li>
            <li>
              <strong>컴포넌트 단순화:</strong> 복잡한 로직 분리
            </li>
            <li>
              <strong>테스트 용이:</strong> 비즈니스 로직 별도 테스트
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="basic-custom">1️⃣ 기본 Custom Hook</h2>
        <p>
          간단한 Custom Hook 을 만들어봅니다.
        </p>

        <CodeDemo
          title="Custom Hook 기본"
          description="카운터 로직 추출"
          defaultCode={`import { useState, useCallback } from 'react';

// 1. 카운터 로직 추출
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);
  
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  return { count, increment, decrement, reset };
}

// 2. 사용 예시
function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>초기화</button>
    </div>
  );
}

// 3. 여러 곳에서 재사용
function AnotherComponent() {
  const { count, increment } = useCounter(10);  // 다른 초기값
  
  return (
    <div>
      <p>시작값 10: {count}</p>
      <button onClick={increment}>증가</button>
    </div>
  );
}

// 4. 투플 반환 (useState 스타일)
function useCounterTuple(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);
  
  return [
    count,
    { increment, decrement, reset }
  ];
}

// 사용
// const [count, actions] = useCounterTuple(0);
// const { increment } = actions;

console.log('기본 Custom Hook 예시 완료');`}
        />

        <InfoCard type="tip" title="반환 값 패턴">
          <ul>
            <li>
              <strong>객체:</strong> <code>{`{ count, increment, decrement }`}</code> - 명확함
            </li>
            <li>
              <strong>배열:</strong> <code>[count, actions]</code> - useState 스타일
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="useinput">2️⃣ useInput - 입력 처리</h2>
        <p>
          폼 입력 관리를 위한 Custom Hook 입니다.
        </p>

        <CodeDemo
          title="useInput Hook"
          description="입력값 관리"
          defaultCode={`import { useState, useCallback } from 'react';

// 1. 기본 useInput
function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  
  const onChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  
  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);
  
  return {
    value,
    onChange,
    reset,
    setValue,
  };
}

// 2. 사용 예시
function LoginForm() {
  const username = useInput('');
  const password = useInput('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인:', {
      username: username.value,
      password: password.value,
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={username.value}
        onChange={username.onChange}
        placeholder="사용자명"
      />
      <input
        name="password"
        type="password"
        value={password.value}
        onChange={password.onChange}
        placeholder="비밀번호"
      />
      <button type="submit">로그인</button>
      <button type="button" onClick={() => {
        username.reset();
        password.reset();
      }}>초기화</button>
    </form>
  );
}

// 3. 검증 포함 useInput
function useInputWithValidation(initialValue = '', validate) {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  
  const error = touched && validate ? validate(value) : '';
  
  const onChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  
  const onBlur = useCallback(() => {
    setTouched(true);
  }, []);
  
  const reset = useCallback(() => {
    setValue(initialValue);
    setTouched(false);
  }, [initialValue]);
  
  return {
    value,
    onChange,
    onBlur,
    reset,
    error,
    touched,
  };
}

// 4. 사용 예시
function ValidatedForm() {
  const validateEmail = (email) => {
    if (!email) return '이메일은 필수입니다';
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      return '올바른 이메일 형식이 아닙니다';
    }
    return '';
  };
  
  const email = useInputWithValidation('', validateEmail);
  
  return (
    <div>
      <input
        value={email.value}
        onChange={email.onChange}
        onBlur={email.onBlur}
        placeholder="이메일"
      />
      {email.error && <span className="error">{email.error}</span>}
    </div>
  );
}

console.log('useInput 예시 완료');`}
        />
      </section>

      <section className="content-section">
        <h2 id="usefetch">3️⃣ useFetch - 데이터 페칭</h2>
        <p>
          API 데이터 페칭 로직을 추출합니다.
        </p>

        <CodeDemo
          title="useFetch Hook"
          description="데이터 페칭과 상태 관리"
          defaultCode={`import { useState, useEffect, useCallback } from 'react';

// 1. 기본 useFetch
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);
  
  useEffect(() => {
    refetch();
  }, [refetch]);
  
  return { data, loading, error, refetch };
}

// 2. 사용 예시
function UserProfile({ userId }) {
  const { data, loading, error, refetch } = useFetch(
    \`https://api.example.com/users/\${userId}\`
  );
  
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  if (!data) return null;
  
  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
      <button onClick={refetch}>새로고침</button>
    </div>
  );
}

// 3. 옵션 포함 useFetch (POST 등)
function useApiCall() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const call = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
      
      if (!response.ok) {
        throw new Error(\`HTTP error! \${response.status}\`);
      }
      
      const result = await response.json();
      setData(result);
      return { data: result, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, []);
  
  return { data, loading, error, call };
}

// 4. 사용 예시
function CreateUser() {
  const { call, loading, error } = useApiCall();
  
  const handleSubmit = async (userData) => {
    const { data, error } = await call('/api/users', {
      method: 'POST',
      body: userData,
    });
    
    if (error) {
      console.error('생성 실패:', error);
    } else {
      console.log('생성 완료:', data);
    }
  };
  
  return (
    <button onClick={() => handleSubmit({ name: 'Alice' })} disabled={loading}>
      {loading ? '처리 중...' : '사용자 생성'}
    </button>
  );
}

console.log('useFetch 예시 완료');`}
        />

        <InfoCard type="tip" title="TanStack Query 권장">
          <p>
            프로덕션에서는 <strong>TanStack Query</strong> 사용을 권장합니다.
            <br />
            캐싱, 재요청, deduplication 등 고급 기능을 제공합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="uselocalstorage">4️⃣ useLocalStorage - 지속성</h2>
        <p>
          localStorage 와 동기화된 상태를 관리합니다.
        </p>

        <CodeDemo
          title="useLocalStorage Hook"
          description="localStorage 동기화"
          defaultCode={`import { useState, useEffect } from 'react';

// 1. 기본 useLocalStorage
function useLocalStorage(key, initialValue) {
  // 초기 상태: localStorage 에서 읽기
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('localStorage 읽기 실패:', error);
      return initialValue;
    }
  });
  
  // localStorage 에 쓰기
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('localStorage 쓰기 실패:', error);
    }
  };
  
  // 다른 탭과 동기화
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.error('localStorage 동기화 실패:', error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);
  
  return [storedValue, setValue];
}

// 2. 사용 예시 - 테마
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <div>
      <p>현재 테마: {theme}</p>
      <button onClick={toggleTheme}>테마 전환</button>
    </div>
  );
}

// 3. 사용 예시 - 폼 데이터 자동 저장
function AutoSaveForm() {
  const [formData, setFormData] = useLocalStorage('draft-form', {
    title: '',
    content: '',
  });
  
  return (
    <form>
      <input
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="제목"
      />
      <textarea
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        placeholder="내용"
      />
      <p>자동 저장됨!</p>
    </form>
  );
}

// 4. useSessionStorage (세션 동안만)
function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('sessionStorage 쓰기 실패:', error);
    }
  };
  
  return [storedValue, setValue];
}

console.log('useLocalStorage 예시 완료');`}
        />

        <InfoCard type="warning" title="localStorage 주의">
          <ul>
            <li>
              <strong>동기식:</strong> 대용량 데이터는 성능 저하
            </li>
            <li>
              <strong>보안:</strong> 민감 정보 저장 금지
            </li>
            <li>
              <strong>용량:</strong> 도메인당 약 5MB
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="advanced-hooks">5️⃣ 고급 Custom Hooks</h2>
        <p>
          실전에서 유용한 고급 Hooks 입니다.
        </p>

        <CodeDemo
          title="고급 Custom Hooks"
          description="useDebounce, usePrevious, useKeyPress"
          defaultCode={`import { useState, useEffect, useRef } from 'react';

// 1. useDebounce - 값 지연
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// 사용 예시 - 검색
function SearchComponent() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  
  // debouncedQuery 가 변경될 때만 API 호출
  useEffect(() => {
    if (debouncedQuery) {
      fetchSearchResults(debouncedQuery);
    }
  }, [debouncedQuery]);
  
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="검색어 입력"
    />
  );
}

// 2. usePrevious - 이전 값
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// 사용 예시
function CounterWithPrevious() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  
  return (
    <div>
      <p>현재: {count}, 이전: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// 3. useKeyPress - 키보드 단축키
function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);
  
  const handleKeyDown = (event) => {
    if (event.key === targetKey) {
      setKeyPressed(true);
    }
  };
  
  const handleKeyUp = (event) => {
    if (event.key === targetKey) {
      setKeyPressed(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [targetKey]);
  
  return keyPressed;
}

// 사용 예시
function ShortcutDemo() {
  const isEnterPressed = useKeyPress('Enter');
  
  return (
    <div>
      <p>Enter 키를 누르세요</p>
      {isEnterPressed && <span>Enter 감지!</span>}
    </div>
  );
}

// 4. useClickOutside - 외부 클릭 감지
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// 사용 예시 - 드롭다운
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  
  useClickOutside(ref, () => setIsOpen(false));
  
  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>메뉴</button>
      {isOpen && <div className="dropdown">메뉴 항목</div>}
    </div>
  );
}

console.log('고급 Hooks 예시 완료');`}
        />

        <InfoCard type="tip" title="Custom Hooks 작성 팁">
          <ul>
            <li>
              <strong>이름:</strong> 반드시 <code>use</code> 로 시작
            </li>
            <li>
              <strong>단일 책임:</strong> 한 가지 일에 집중
            </li>
            <li>
              <strong>의존성:</strong> useCallback/useMemo 로 최적화
            </li>
            <li>
              <strong>클린업:</strong> useEffect 에서 정리
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Custom Hooks:</strong> 재사용 가능한 로직 추출
          </li>
          <li>
            <strong>useInput:</strong> 폼 입력 관리
          </li>
          <li>
            <strong>useFetch:</strong> 데이터 페칭 (TanStack Query 권장)
          </li>
          <li>
            <strong>useLocalStorage:</strong> localStorage 동기화
          </li>
          <li>
            <strong>useDebounce:</strong> 값 지연 (검색 최적화)
          </li>
          <li>
            <strong>usePrevious:</strong> 이전 값 추적
          </li>
          <li>
            <strong>useKeyPress:</strong> 키보드 단축키
          </li>
          <li>
            <strong>useClickOutside:</strong> 외부 클릭 감지
          </li>
        </ul>
      </section>
    </div>
  );
}