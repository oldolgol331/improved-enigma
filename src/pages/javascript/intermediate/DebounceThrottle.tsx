import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function JSDebounceThrottle() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Debounce & Throttle</h1>
        <p className="page-description">
          JavaScript 성능 최적화를 위한 디바운싱과 쓰로틀링 기법에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>Debounce</strong> 와 <strong>Throttle</strong> 은
          고빈도 이벤트를 제어하여 성능을 최적화하는 기법입니다.
          스크롤, 리사이즈, 입력 필드, API 호출 등에서 널리 사용됩니다.
        </p>

        <InfoCard type="tip" title="핵심 개념">
          <ul>
            <li>
              <strong>Debounce:</strong> "마지막 호출만 실행" - 입력 완료 후 처리
            </li>
            <li>
              <strong>Throttle:</strong> "일정 간격으로 실행" - 빈도 제한
            </li>
            <li>
              <strong>공통 목적:</strong> 불필요한 호출 감소, 성능 향상
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="debounce">1️⃣ Debounce (디바운싱)</h2>
        <p>
          여러 호출 중 <strong>마지막 호출만 실행</strong>합니다.
          입력이 완료될 때까지 기다렸다가 처리합니다.
        </p>

        <CodeDemo
          title="Debounce 구현과 사용"
          description="입력 필드 최적화"
          defaultCode={`// 1. 기본 debounce 구현
function debounce(func, delay) {
  let timerId = null;
  
  return function(...args) {
    // 이전 타이머 취소
    clearTimeout(timerId);
    
    // delay 후 함수 실행
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 2. 사용 예시 - 검색어 입력
const searchInput = document.querySelector('#search');

const handleSearch = (event) => {
  const query = event.target.value;
  console.log('검색어:', query);
  // API 호출: fetch(\`/api/search?q=\${query}\`)
};

// 500ms 디바운스 적용
const debouncedSearch = debounce(handleSearch, 500);
// searchInput.addEventListener('input', debouncedSearch);

// 3. 실제 활용 - API 호출 최적화
async function fetchSuggestions(query) {
  try {
    const response = await fetch(\`/api/suggestions?q=\${query}\`);
    const data = await response.json();
    console.log('제안 목록:', data);
  } catch (error) {
    console.error('에러:', error);
  }
}

const debouncedFetch = debounce(fetchSuggestions, 300);
// searchInput.addEventListener('input', (e) => {
//   debouncedFetch(e.target.value);
// });

// 4. leading edge 옵션 (첫 호출 즉시 실행)
function debounceWithLeading(func, delay) {
  let timerId = null;
  let leading = true;
  
  return function(...args) {
    if (leading) {
      func.apply(this, args);
      leading = false;
    }
    
    clearTimeout(timerId);
    
    timerId = setTimeout(() => {
      if (!leading) {
        func.apply(this, args);
      }
      leading = true;
    }, delay);
  };
}

// 5. cancel 메서드 추가 (취소 가능)
function cancellableDebounce(func, delay) {
  let timerId = null;
  
  const debounced = function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
  
  debounced.cancel = function() {
    clearTimeout(timerId);
    timerId = null;
  };
  
  return debounced;
}

// 사용 예시
// const debouncedSave = cancellableDebounce(saveData, 1000);
// debouncedSave(data);
// // 필요 시 취소: debouncedSave.cancel();

console.log('Debounce 예시 완료');`}
        />

        <InfoCard type="tip" title="Debounce 사용 사례">
          <ul>
            <li>
              <strong>검색 입력:</strong> 입력 완료 후 API 호출
            </li>
            <li>
              <strong>폼 저장:</strong> 입력 멈춤 후 자동 저장
            </li>
            <li>
              <strong>윈도우 리사이즈:</strong> 리사이즈 완료 후 레이아웃 계산
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="throttle">2️⃣ Throttle (쓰로틀링)</h2>
        <p>
          일정 시간 간격으로 <strong>최대 한 번만 실행</strong>합니다.
          빈번한 이벤트를 적절한 빈도로 제한합니다.
        </p>

        <CodeDemo
          title="Throttle 구현과 사용"
          description="스크롤 이벤트 최적화"
          defaultCode={`// 1. 기본 throttle 구현 (timestamp 기반)
function throttle(func, limit) {
  let lastCall = 0;
  
  return function(...args) {
    const now = Date.now();
    
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// 2. 사용 예시 - 스크롤 이벤트
const handleScroll = () => {
  const scrollTop = window.scrollY;
  console.log('스크롤 위치:', scrollTop);
};

// 100ms 쓰로틀 적용
const throttledScroll = throttle(handleScroll, 100);
// window.addEventListener('scroll', throttledScroll);

// 3. setTimeout 기반 throttle
function throttleWithTimeout(func, limit) {
  let timerId = null;
  
  return function(...args) {
    if (!timerId) {
      func.apply(this, args);
      timerId = setTimeout(() => {
        timerId = null;
      }, limit);
    }
  };
}

// 4. 실제 활용 - 무한 스크롤
function loadMoreItems() {
  console.log('아이템 로딩 중...');
  // API 호출: fetch('/api/items?page=2')
}

const throttledLoad = throttle(loadMoreItems, 500);

// window.addEventListener('scroll', () => {
//   const scrollTop = window.scrollY;
//   const windowHeight = window.innerHeight;
//   const documentHeight = document.documentElement.scrollHeight;
//   
//   // 바닥에 가까우면 로딩
//   if (scrollTop + windowHeight >= documentHeight - 100) {
//     throttledLoad();
//   }
// });

// 5. leading/trailing 옵션
function advancedThrottle(func, limit, options = {}) {
  const { leading = true, trailing = true } = options;
  let timerId = null;
  let lastCall = 0;
  let lastArgs = null;
  
  return function(...args) {
    const now = Date.now();
    lastArgs = args;
    
    if (!lastCall && !leading) {
      lastCall = now;
    }
    
    if (now - lastCall >= limit) {
      func.apply(this, args);
      lastCall = now;
      lastArgs = null;
    } else if (trailing && !timerId) {
      timerId = setTimeout(() => {
        func.apply(this, lastArgs);
        lastCall = Date.now();
        timerId = null;
        lastArgs = null;
      }, limit - (now - lastCall));
    }
  };
}

console.log('Throttle 예시 완료');`}
        />

        <InfoCard type="tip" title="Throttle 사용 사례">
          <ul>
            <li>
              <strong>스크롤:</strong> 스크롤 위치 추적, 무한 스크롤
            </li>
            <li>
              <strong>리사이즈:</strong> 반응형 레이아웃 계산
            </li>
            <li>
              <strong>마우스 이동:</strong> 드래그 앤 드롭, 툴팁 위치
            </li>
            <li>
              <strong>버튼 클릭:</strong> 중복 제출 방지
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="comparison">3️⃣ Debounce vs Throttle 비교</h2>
        <p>
          두 기법의 차이점과 적절한 사용 상황을 비교합니다.
        </p>

        <CodeDemo
          title="Debounce vs Throttle"
          description="차이점과 선택 가이드"
          defaultCode={`// ============================================
// 시각적 비교
// ============================================
// 시간 축: 0ms ---- 100ms ---- 200ms ---- 300ms ---- 400ms

// 호출:    |---|---|---|---|---|---|---|---|---|
// Debounce(100ms): 마지막 호출 후 100ms 에 한 번만 실행
// 실행:                              [실행]

// Throttle(100ms): 100ms 간격으로 최대 한 번 실행
// 실행:    [실행]          [실행]          [실행]

// ============================================
// 동시 구현 (비교용)
// ============================================

// Debounce
function debounce(func, delay) {
  let timerId = null;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Throttle
function throttle(func, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// ============================================
// 선택 가이드
// ============================================
// 상황 | 기법 | 이유
// ------|--------|------
// 입력 필드 | Debounce | 입력 완료 후 처리
// 스크롤 이벤트 | Throttle | 꾸준한 피드백 필요
// 리사이즈 | Debounce | 완료 후 한 번 계산
// 버튼 클릭 | Throttle | 중복 클릭 방지
// 자동 저장 | Debounce | 입력 멈춤 후 저장
// 애니메이션 | Throttle | 부드러운 움직임 유지

// ============================================
// 테스트 코드
// ============================================
const logDebounce = debounce(() => {
  console.log('Debounce 실행:', Date.now());
}, 100);

const logThrottle = throttle(() => {
  console.log('Throttle 실행:', Date.now());
}, 100);

// 50ms 간격으로 10 회 호출
// for (let i = 0; i < 10; i++) {
//   setTimeout(() => logDebounce(), i * 50);
//   setTimeout(() => logThrottle(), i * 50);
// }

console.log('비교 예시 완료');`}
        />

        <InfoCard type="warning" title="주의사항">
          <ul>
            <li>
              <strong>Debounce:</strong> 첫 번째 호출이 무시될 수 있음
            </li>
            <li>
              <strong>Throttle:</strong> 마지막 호출이 실행되지 않을 수 있음
            </li>
            <li>
              <strong>메모리:</strong> 타이머 정리 (clearTimeout) 필수
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="raf">4️⃣ requestAnimationFrame</h2>
        <p>
          애니메이션 성능 최적화를 위한 브라우저 API 입니다.
        </p>

        <CodeDemo
          title="requestAnimationFrame 활용"
          description="부드러운 애니메이션"
          defaultCode={`// 1. 기본 사용법
const box = document.querySelector('#box');
let start = null;

function animate(timestamp) {
  if (!start) start = timestamp;
  const elapsed = timestamp - start;
  
  // box 이동 (100ms 당 10px)
  box.style.transform = \`translateX(\${elapsed / 10}px)\`;
  
  if (elapsed < 3000) {
    requestAnimationFrame(animate);
  }
}

// requestAnimationFrame(animate);

// 2. throttle 과 함께 사용
function throttleRAF(func) {
  let ticking = false;
  
  return function(...args) {
    if (!ticking) {
      requestAnimationFrame(() => {
        func.apply(this, args);
        ticking = false;
      });
      ticking = true;
    }
  };
}

// 3. 스크롤 위치 추적 (성능 최적화)
const trackScroll = throttleRAF(() => {
  const scrollTop = window.scrollY;
  console.log('스크롤:', scrollTop);
});

// window.addEventListener('scroll', trackScroll);

// 4. debounce 와 requestAnimationFrame
function debounceRAF(func, delay) {
  let timerId = null;
  let rafId = null;
  
  return function(...args) {
    clearTimeout(timerId);
    
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    
    timerId = setTimeout(() => {
      rafId = requestAnimationFrame(() => {
        func.apply(this, args);
      });
    }, delay);
  };
}

// 5. 실제 활용 - 패럴랙스 효과
const parallaxElements = document.querySelectorAll('.parallax');

const updateParallax = throttleRAF(() => {
  const scrollTop = window.scrollY;
  
  parallaxElements.forEach((el) => {
    const speed = el.dataset.speed || 0.5;
    el.style.transform = \`translateY(\${scrollTop * speed}px)\`;
  });
});

// window.addEventListener('scroll', updateParallax);

console.log('requestAnimationFrame 예시 완료');`}
        />

        <InfoCard type="tip" title="requestAnimationFrame 장점">
          <ul>
            <li>
              <strong>성능:</strong> 브라우저 최적화 (보통 60fps)
            </li>
            <li>
              <strong>배터리:</strong> 탭 비활성 시 자동 일시정지
            </li>
            <li>
              <strong>부드러움:</strong> 화면 주기와 동기화
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="lodash">5️⃣ Lodash 활용</h2>
        <p>
          Lodash 는 잘 검증된 debounce/throttle 함수를 제공합니다.
        </p>

        <CodeDemo
          title="Lodash debounce/throttle"
          description="프로덕션급 구현"
          defaultCode={`// import { debounce, throttle } from 'lodash';

// ============================================
// Lodash debounce (고급 옵션)
// ============================================
// const debouncedFunc = debounce(func, delay, {
//   leading: false,    // 첫 호출 즉시 실행
//   trailing: true,    // 마지막 호출 실행
//   maxWait: 500,      // 최대 대기 시간
// });

// 사용 예시
// const searchHandler = debounce((query) => {
//   fetchSuggestions(query);
// }, 300, { leading: false, trailing: true });

// ============================================
// Lodash throttle (고급 옵션)
// ============================================
// const throttledFunc = throttle(func, limit, {
//   leading: true,     // 첫 호출 즉시 실행
//   trailing: false,   // 마지막 호출 실행 여부
// });

// 사용 예시
// const scrollHandler = throttle(() => {
//   updateScrollPosition();
// }, 100, { leading: true, trailing: false });

// ============================================
// 메서드 제공
// ============================================
// debouncedFunc.cancel();  // 취소
// debouncedFunc.flush();   // 즉시 실행

// ============================================
// React 에서 사용
// ============================================
// function SearchComponent() {
//   const [query, setQuery] = useState('');
//   
//   const debouncedSearch = useMemo(
//     () => debounce((q) => {
//       fetchSuggestions(q);
//     }, 300),
//     []
//   );
//   
//   useEffect(() => {
//     debouncedSearch(query);
//     return () => debouncedSearch.cancel();
//   }, [query]);
//   
//   return (
//     <input
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//     />
//   );
// }

console.log('Lodash 예시 완료');`}
        />

        <InfoCard type="tip" title="Lodash 사용 권장">
          <p>
            프로덕션에서는 <strong>Lodash</strong> 의 구현을 사용하는 것이 안전합니다.
            <br />
            경량화: <code>lodash.debounce</code>, <code>lodash.throttle</code> 별도 설치 가능
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Debounce:</strong> 마지막 호출만 실행, 입력 완료 후 처리
          </li>
          <li>
            <strong>Throttle:</strong> 일정 간격으로 최대 한 번 실행, 빈도 제한
          </li>
          <li>
            <strong>Debounce 사용:</strong> 검색 입력, 폼 저장, 리사이즈
          </li>
          <li>
            <strong>Throttle 사용:</strong> 스크롤, 마우스 이동, 버튼 클릭
          </li>
          <li>
            <strong>requestAnimationFrame:</strong> 애니메이션 성능 최적화
          </li>
          <li>
            <strong>Lodash:</strong> 프로덕션급 구현 권장
          </li>
          <li>
            <strong>메모리 관리:</strong> 타이머 정리 필수
          </li>
        </ul>
      </section>
    </div>
  );
}