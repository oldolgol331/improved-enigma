import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function WebPerformance() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>웹 성능 최적화</h1>
        <p className="page-description">
          Web Vitals, 로딩 최적화, 런타임 성능 향상을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="web-vitals">1️⃣ Web Vitals</h2>
        <p>
          Google 의 사용자 경험 지표입니다.
        </p>

        <CodeDemo
          title="Web Vitals"
          description="LCP, FID, CLS, INP"
          defaultCode={`import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

// ============================================
// 1. Core Web Vitals
// ============================================

// LCP (Largest Contentful Paint)
// - 주요 콘텐츠가 표시되는 시간
// - 권장: 2.5 초 이내
onLCP((metric) => {
  console.log('LCP:', metric.value);  // ms
  // 2500ms 이면 좋음, 4000ms 초과면 나쁨
});

// FID (First Input Delay)
// - 첫 상호작용 응답 시간
// - 권장: 100ms 이내
onFID((metric) => {
  console.log('FID:', metric.value);  // ms
  // 100ms 이면 좋음, 300ms 초과면 나쁨
});

// CLS (Cumulative Layout Shift)
// - 레이아웃 이동 누적 점수
// - 권장: 0.1 이하
onCLS((metric) => {
  console.log('CLS:', metric.value);  // score
  // 0.1 이면 좋음, 0.25 초과면 나쁨
});

// ============================================
// 2. 기타 지표
// ============================================

// FCP (First Contentful Paint)
// - 첫 콘텐츠 표시 시간
onFCP((metric) => {
  console.log('FCP:', metric.value);
});

// TTFB (Time to First Byte)
// - 서버 응답 시간
onTTFB((metric) => {
  console.log('TTFB:', metric.value);
});

// INP (Interaction to Next Paint)
// - 상호작용 반응성 (FID 대체)
onINP((metric) => {
  console.log('INP:', metric.value);
});

// ============================================
// 3. 분석 서비스로 전송
// ============================================
function sendToAnalytics(metric) {
  const body = {
    id: metric.id,
    name: metric.name,
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
    url: window.location.href,
  };
  
  // 비동기 전송 (페이지 블로킹 안 함)
  navigator.sendBeacon('/analytics', JSON.stringify(body));
}

onLCP(sendToAnalytics);
onCLS(sendToAnalytics);
onINP(sendToAnalytics);

// ============================================
// 4. Chrome DevTools
// ============================================
// Lighthouse: 성능 감사
// Performance 패널: 런타임 분석
// Coverage: 사용하지 않는 코드 확인

console.log('Web Vitals 완료');`}
        />

        <InfoCard type="tip" title="Core Web Vitals 목표">
          <ul>
            <li>
              <strong>LCP:</strong> 2.5 초 이하 (로딩 성능)
            </li>
            <li>
              <strong>INP:</strong> 200ms 이하 (반응성)
            </li>
            <li>
              <strong>CLS:</strong> 0.1 이하 (시각적 안정성)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="loading-optimization">2️⃣ 로딩 최적화</h2>
        <p>
          초기 로딩 시간을 단축하는 방법입니다.
        </p>

        <CodeDemo
          title="Loading Optimization"
          description="Code Splitting, Preload, Lazy Loading"
          defaultCode={`// ============================================
// 1. Code Splitting (Lazy Loading)
// ============================================
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}

// ============================================
// 2. Preload 중요 자산
// ============================================
// index.html
<head>
  <!-- 폰트 미리 로드 -->
  <link rel="preload" href="/fonts/Inter.woff2" as="font" crossorigin>
  
  <!-- LCP 이미지 미리 로드 -->
  <link rel="preload" href="/hero-image.webp" as="image">
  
  <!-- 중요 CSS 미리 로드 -->
  <link rel="preload" href="/assets/critical.css" as="style">
  
  <!-- DNS 미리 해결 -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="dns-prefetch" href="//api.example.com">
  
  <!-- 연결 미리 설정 -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
</head>

// ============================================
// 3. 이미지 최적화
// ============================================
// 현대 형식 사용 (WebP, AVIF)
<img 
  src="image.webp" 
  alt="Description"
  loading="lazy"
  width="800"
  height="600"
/>

// srcset 으로 반응형 이미지
<img
  src="image-800.webp"
  srcSet="
    image-400.webp 400w,
    image-800.webp 800w,
    image-1200.webp 1200w
  "
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="Description"
/>

// ============================================
// 4. CSS 최적화
// ============================================
// 1. Critical CSS 인라인
<head>
  <style>
    /* Above-the-fold CSS */
    body { font-family: Inter, sans-serif; }
    .header { height: 60px; }
  </style>
  <link rel="preload" href="/styles.css" as="style">
  <link rel="stylesheet" href="/styles.css" media="print" onload="this.media='all'">
</head>

// 2. CSS 파일 분할
// vendor.css, main.css 분리

// ============================================
// 5. JavaScript 최적화
// ============================================
// 1. 스크립트 지연
<script src="/app.js" defer></script>
<script src="/analytics.js" async></script>

// 2. Tree Shaking (불필요 코드 제거)
// import { debounce } from 'lodash-es';  // 좋음
// import _ from 'lodash';  // 나쁨

console.log('Loading Optimization 완료');`}
        />

        <InfoCard type="tip" title="로딩 최적화 체크리스트">
          <ul>
            <li>
              <strong>Code Splitting:</strong> Lazy Loading
            </li>
            <li>
              <strong>Preload:</strong> 중요 자산 미리 로드
            </li>
            <li>
              <strong>이미지:</strong> WebP, lazy loading
            </li>
            <li>
              <strong>CSS:</strong> Critical CSS 인라인
            </li>
            <li>
              <strong>JS:</strong> defer/async, tree shaking
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="runtime-performance">3️⃣ 런타임 성능</h2>
        <p>
          실행 중 성능을 최적화합니다.
        </p>

        <CodeDemo
          title="Runtime Performance"
          description="Memoization, Debounce, Virtual List"
          defaultCode={`import { useMemo, useCallback, memo } from 'react';

// ============================================
// 1. Memoization (메모이제이션)
// ============================================

// useMemo: 값 메모이제이션
function ExpensiveComponent({ data, filter }) {
  const filteredData = useMemo(() => {
    console.log('Filtering...');
    return data.filter(item => item.category === filter);
  }, [data, filter]);  // 의존성 변경 시에만 재계산
  
  return <List items={filteredData} />;
}

// useCallback: 함수 메모이제이션
function Parent() {
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);  // 의존성 없으면 한 번만 생성
  
  return <Child onClick={handleClick} />;
}

// React.memo: 컴포넌트 메모이제이션
const MemoizedChild = memo(function Child({ value }) {
  return <div>{value}</div>;
});

// ============================================
// 2. Debounce & Throttle
// ============================================
import { debounce, throttle } from 'lodash-es';

// Debounce: 마지막 호출만 실행 (검색어 입력)
function SearchInput() {
  const [query, setQuery] = useState('');
  
  const debouncedSearch = useMemo(
    () => debounce((q) => {
      fetchResults(q);
    }, 300),
    []
  );
  
  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };
  
  return <input value={query} onChange={handleChange} />;
}

// Throttle: 일정 간격으로 실행 (스크롤 이벤트)
const handleScroll = throttle(() => {
  console.log('Scroll:', window.scrollY);
}, 100);

window.addEventListener('scroll', handleScroll);

// ============================================
// 3. Virtual List (대량 데이터)
// ============================================
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index].name}
        </div>
      )}
    </FixedSizeList>
  );
}

// ============================================
// 4. Web Worker (무거운 작업)
// ============================================
// worker.js
self.onmessage = (e) => {
  const result = heavyComputation(e.data);
  self.postMessage(result);
};

// 메인 스레드
const worker = new Worker('/worker.js');
worker.postMessage(data);
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

console.log('Runtime Performance 완료');`}
        />

        <InfoCard type="tip" title="런타임 최적화">
          <ul>
            <li>
              <strong>useMemo:</strong> 비싼 계산 결과 캐시
            </li>
            <li>
              <strong>useCallback:</strong> 함수 참조 안정화
            </li>
            <li>
              <strong>Debounce:</strong> 빈번한 호출 제한
            </li>
            <li>
              <strong>Virtual List:</strong> 대량 데이터 렌더링
            </li>
            <li>
              <strong>Web Worker:</strong> 메인 스레드 블로킹 방지
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="rendering-optimization">4️⃣ 렌더링 최적화</h2>
        <p>
          React 렌더링을 최적화합니다.
        </p>

        <CodeDemo
          title="Rendering Optimization"
          description="불필요한 리렌더링 방지"
          defaultCode={`import { memo, useMemo, useCallback } from 'react';

// ============================================
// 1. 불필요한 리렌더링 식별
// ============================================
import { whyDidYouRender } from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
  trackAllPureComponents: true,
});

// ============================================
// 2. React.memo 사용
// ============================================
// 자식 컴포넌트 메모이제이션
const Child = memo(function Child({ name, count }) {
  return <div>{name}: {count}</div>;
});

// 비교 함수 사용 (얕은 비교)
const MemoChild = memo(Child, (prevProps, nextProps) => {
  // true 반환 시 리렌더링 안 함
  return prevProps.name === nextProps.name;
});

// ============================================
// 3. Props 안정화
// ============================================
function Parent() {
  const [count, setCount] = useState(0);
  
  // 나쁜 예: 매 렌더링마다 새 객체
  <Child config={{ theme: 'dark' }} />
  
  // 좋은 예: useMemo 로 객체 안정화
  const config = useMemo(() => ({ theme: 'dark' }), []);
  <Child config={config} />
  
  // 좋은 예: useCallback 으로 함수 안정화
  const handleClick = useCallback(() => {}, []);
  <Child onClick={handleClick} />
}

// ============================================
// 4. Key 최적화
// ============================================
// 나쁜 예: index 사용 (데이터 변경 시 문제)
{items.map((item, index) => (
  <Item key={index} data={item} />
))}

// 좋은 예: 고유 ID 사용
{items.map((item) => (
  <Item key={item.id} data={item} />
))}

// ============================================
// 5. Context 최적화
// ============================================
// Context 분리 (값과 업데이트)
const StateContext = createContext(null);
const ActionsContext = createContext(null);

// 필요한 것만 구독
const state = useContext(StateContext);
const actions = useContext(ActionsContext);

console.log('Rendering Optimization 완료');`}
        />

        <InfoCard type="tip" title="렌더링 최적화">
          <ul>
            <li>
              <strong>React.memo:</strong> props 변경 없으면 스킵
            </li>
            <li>
              <strong>useMemo/useCallback:</strong> 참조 안정화
            </li>
            <li>
              <strong>Key:</strong> 고유 ID 사용 (index 금지)
            </li>
            <li>
              <strong>Context 분리:</strong> 불필요한 리렌더링 방지
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="caching">5️⃣ 캐싱 전략</h2>
        <p>
          데이터 캐싱을 통한 성능 향상입니다.
        </p>

        <CodeDemo
          title="Caching"
          description="TanStack Query, HTTP 캐싱"
          defaultCode={`import { useQuery, useQueryClient } from '@tanstack/react-query';

// ============================================
// 1. TanStack Query (서버 상태 캐싱)
// ============================================
function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],  // 캐시 키
    queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),
    staleTime: 5 * 60 * 1000,    // 5 분간 신선함
    cacheTime: 30 * 60 * 1000,   // 30 분간 캐시 유지
    retry: 3,                    // 실패 시 3 재시도
    refetchOnWindowFocus: false, // 포커스 시 재요청 안 함
  });
}

// ============================================
// 2. 수동 캐시 업데이트
// ============================================
const queryClient = useQueryClient();

// 캐시 설정
queryClient.setQueryData(['user', userId], newData);

// 캐시 무효화 (재요청)
queryClient.invalidateQueries({ queryKey: ['user'] });

// ============================================
// 3. Prefetching (미리 가져오기)
// ============================================
// 호버 시 미리 데이터 로드
<button
  onMouseEnter={() => {
    queryClient.prefetchQuery({
      queryKey: ['user', userId],
      queryFn: fetchUser,
      staleTime: 5000,  // 5 초간 유지
    });
  }}
>
  프로필 보기
</button>

// ============================================
// 4. HTTP 캐싱
// ============================================
// Cache-Control 헤더
// max-age=3600: 1 시간간 캐시
// no-cache: 검증 후 사용
// no-store: 캐싱 안 함
// immutable: 변경 안 됨

// fetch 캐시 옵션
fetch('/api/data', {
  cache: 'force-cache'      // 캐시 사용
  cache: 'no-cache'         // 검증 후 사용
  cache: 'no-store'         // 캐싱 안 함
  cache: 'reload'           // 서버에서 fresh 하게
});

console.log('Caching 완료');`}
        />

        <InfoCard type="tip" title="캐싱 전략">
          <ul>
            <li>
              <strong>TanStack Query:</strong> 서버 상태 자동 캐싱
            </li>
            <li>
              <strong>staleTime:</strong> 데이터 신선도 유지 시간
            </li>
            <li>
              <strong>Prefetching:</strong> 필요하기 전에 미리 로드
            </li>
            <li>
              <strong>HTTP 캐싱:</strong> Cache-Control 헤더
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Web Vitals:</strong> LCP, INP, CLS 측정
          </li>
          <li>
            <strong>로딩 최적화:</strong> Code Splitting, Preload, Lazy Loading
          </li>
          <li>
            <strong>런타임:</strong> Memoization, Debounce, Virtual List
          </li>
          <li>
            <strong>렌더링:</strong> React.memo, useMemo, useCallback
          </li>
          <li>
            <strong>캐싱:</strong> TanStack Query, HTTP 캐싱
          </li>
        </ul>
      </section>
    </div>
  );
}
