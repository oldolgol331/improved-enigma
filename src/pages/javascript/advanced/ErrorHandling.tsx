import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ErrorHandling() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>에러 처리 (Error Handling)</h1>
        <p className="page-description">
          JavaScript 의 에러 처리 전략과 모범 사례에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>에러 처리 (Error Handling)</strong> 는 애플리케이션의 안정성과 사용자 경험에
          중요합니다. JavaScript 는 <code>try-catch-finally</code>, Promise 기반 에러 처리, 그리고
          다양한 에러 타입을 제공합니다.
        </p>

        <InfoCard type="tip" title="에러 처리의 중요성">
          <ul style={{ margin: '0.5rem 0 0 1.2rem' }}>
            <li>
              <strong>사용자 경험</strong>: 친절한 에러 메시지 제공
            </li>
            <li>
              <strong>디버깅</strong>: 명확한 에러 스택 트레이스
            </li>
            <li>
              <strong>애플리케이션 안정성</strong>: 예기치 않은 종료 방지
            </li>
            <li>
              <strong>보안</strong>: 민감한 정보 노출 방지
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="try-catch">1️⃣ try-catch-finally</h2>
        <p>동기 코드에서 에러를 처리하는 기본 메커니즘입니다.</p>

        <CodeDemo
          title="try-catch-finally 기본"
          description="기본적인 에러 처리 구조입니다."
          defaultCode={`// try-catch-finally 기본 구조
function divide(a, b) {
  try {
    if (b === 0) {
      throw new Error('0 으로 나눌 수 없습니다');
    }
    return a / b;
  } catch (error) {
    console.error('에러 발생:', error.message);
    return null;
  } finally {
    console.log('항상 실행됨 (정리 작업)');
  }
}

console.log('divide(10, 2):', divide(10, 2));
console.log('divide(10, 0):', divide(10, 0));

// 출력:
// 항상 실행됨 (정리 작업)
// divide(10, 2): 5
// 에러 발생: 0 으로 나눌 수 없습니다
// 항상 실행됨 (정리 작업)
// divide(10, 0): null

// finally 는 return 보다 나중에 실행
function returnExample() {
  try {
    return 'try';
  } catch {
    return 'catch';
  } finally {
    console.log('finally 실행');
  }
}

console.log('returnExample:', returnExample());
// 출력: finally 실행 → returnExample: try`}
        />

        <InfoCard type="warning" title="catch 절 주의사항">
          <p>
            에러를 catch 하고 아무것도 하지 않으면 <strong>에러가 숨겨집니다</strong>. 반드시
            로깅하거나 적절한 처리를 해야 합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="error-types">2️⃣ 에러 타입</h2>
        <p>JavaScript 는 다양한 내장 에러 타입을 제공합니다.</p>

        <CodeDemo
          title="에러 타입"
          description="다양한 내장 에러 타입을 확인해보세요."
          defaultCode={`// 내장 에러 타입들

// 1. Error - 기본 에러
const error = new Error('기본 에러');
console.log('name:', error.name);      // "Error"
console.log('message:', error.message); // "기본 에러"
console.log('stack:', error.stack);     // 스택 트레이스

// 2. TypeError - 타입 관련 에러
try {
  null.someMethod();
} catch (e) {
  console.log('TypeError:', e.name);
}

// 3. ReferenceError - 존재하지 않는 변수
try {
  console.log(notDefined);
} catch (e) {
  console.log('ReferenceError:', e.name);
}

// 4. SyntaxError - 문법 에러
try {
  JSON.parse('invalid json');
} catch (e) {
  console.log('SyntaxError:', e.name);
}

// 5. RangeError - 범위 초과
try {
  new Array(-1);
} catch (e) {
  console.log('RangeError:', e.name);
}

// 6. URIError - URI 관련 에러
try {
  decodeURIComponent('%');
} catch (e) {
  console.log('URIError:', e.name);
}

// 커스텀 에러 타입
class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
    this.timestamp = new Date();
  }
}

try {
  throw new CustomError('커스텀 에러 발생', 'ERR_CUSTOM');
} catch (e) {
  if (e instanceof CustomError) {
    console.log('CustomError:', e.message, e.code);
  }
}`}
        />
      </section>

      <section className="content-section">
        <h2 id="async-errors">3️⃣ 비동기 에러 처리</h2>
        <p>Promise 와 async/await 에서 에러를 처리하는 방법입니다.</p>

        <CodeDemo
          title="비동기 에러 처리"
          description="Promise 와 async/await 에서 에러를 처리합니다."
          defaultCode={`// Promise 에러 처리
function fetchWithPromise() {
  return new Promise((resolve, reject) => {
    const success = false;
    if (success) {
      resolve('Success!');
    } else {
      reject(new Error('Fetch failed'));
    }
  });
}

// .catch() 로 에러 처리
fetchWithPromise()
  .then(result => console.log('result:', result))
  .catch(error => console.error('Error:', error.message))
  .finally(() => console.log('완료'));

// async/await 에러 처리
async function fetchWithAsync() {
  try {
    const result = await fetchWithPromise();
    console.log('result:', result);
  } catch (error) {
    console.error('Async Error:', error.message);
  } finally {
    console.log('Async 완료');
  }
}

fetchWithAsync();

// 여러 Promise 에러 처리
async function multiplePromises() {
  try {
    const [result1, result2] = await Promise.all([
      Promise.resolve('성공 1'),
      Promise.reject(new Error('실패 2'))
    ]);
    console.log(result1, result2);
  } catch (error) {
    // 하나라도 실패하면 즉시 catch
    console.error('Promise.all Error:', error.message);
  }
}

// Promise.allSettled - 모두 완료 후 결과 확인
async function allSettledExample() {
  const results = await Promise.allSettled([
    Promise.resolve('성공 1'),
    Promise.reject(new Error('실패 2')),
    Promise.resolve('성공 3')
  ]);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(\`Promise \${index} 성공:\`, result.value);
    } else {
      console.error(\`Promise \${index} 실패:\`, result.reason.message);
    }
  });
}

allSettledExample();`}
        />

        <InfoCard type="tip" title="Promise.all vs Promise.allSettled">
          <p>
            <strong>Promise.all</strong>: 하나라도 실패하면 즉시 거부 (fail-fast)
            <br />
            <strong>Promise.allSettled</strong>: 모두 완료 후 결과 반환 (전체 상태 확인)
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="error-propagation">4️⃣ 에러 전파</h2>
        <p>에러를 상위로 전파하거나 재throw 하는 방법입니다.</p>

        <CodeDemo
          title="에러 전파"
          description="에러를 적절하게 전파하는 방법입니다."
          defaultCode={`// 에러 전파 패턴

// 1. 에러를 그대로 전파
function lowerLevel() {
  throw new Error('하위 레벨 에러');
}

function middleLevel() {
  try {
    lowerLevel();
  } catch (error) {
    console.log('중간 레벨 로깅:', error.message);
    throw error; // 에러 재전파
  }
}

function upperLevel() {
  try {
    middleLevel();
  } catch (error) {
    console.log('상위 레벨 처리:', error.message);
  }
}

upperLevel();

// 2. 에러 래핑 (컨텍스트 추가)
class DatabaseError extends Error {
  constructor(message, originalError) {
    super(message);
    this.name = 'DatabaseError';
    this.cause = originalError; // ES2022 cause 속성
  }
}

function databaseOperation() {
  try {
    throw new Error('DB 연결 실패');
  } catch (originalError) {
    throw new DatabaseError('데이터베이스 작업 실패', originalError);
  }
}

try {
  databaseOperation();
} catch (error) {
  if (error instanceof DatabaseError) {
    console.log('DatabaseError:', error.message);
    console.log('원인:', error.cause?.message);
  }
}

// 3. 에러 필터링 (특정 에러만 처리)
function riskyOperation() {
  throw new TypeError('타입 에러');
}

try {
  riskyOperation();
} catch (error) {
  if (error instanceof TypeError) {
    console.log('타입 에러 처리:', error.message);
  } else {
    throw error; // 다른 에러는 전파
  }
}`}
        />
      </section>

      <section className="content-section">
        <h2 id="global-handling">5️⃣ 전역 에러 처리</h2>
        <p>처리되지 않은 에러를 전역적으로 캐치하는 방법입니다.</p>

        <CodeDemo
          title="전역 에러 처리"
          description="브라우저와 Node.js 에서 전역 에러를 처리합니다."
          defaultCode={`// 브라우저 전역 에러 처리 (개념)

// 1. window.onerror
// window.onerror = (message, source, lineno, colno, error) => {
//   console.error('Global Error:', message);
//   console.error('Source:', source);
//   console.error('Line:', lineno);
//   console.error('Error:', error);
//   return true; // 기본 처리 방지
// };

// 2. unhandledrejection (Promise 에러)
// window.addEventListener('unhandledrejection', (event) => {
//   console.error('Unhandled Promise Rejection:', event.reason);
//   event.preventDefault(); // 기본 처리 방지
// });

// 3. 에러 모니터링 서비스 연동
// function reportError(error) {
//   // Sentry, LogRocket 등으로 전송
//   fetch('/api/log-error', {
//     method: 'POST',
//     body: JSON.stringify({
//       message: error.message,
//       stack: error.stack,
//       url: window.location.href,
//       userAgent: navigator.userAgent
//     })
//   });
// }

// Node.js 전역 에러 처리 (개념)
// process.on('uncaughtException', (error) => {
//   console.error('Uncaught Exception:', error);
//   process.exit(1); // 권장: 프로세스 종료
// });

// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Unhandled Rejection:', reason);
// });

console.log('Global error handling concepts');`}
        />

        <InfoCard type="warning" title="전역 에러 처리 주의">
          <p>
            전역 에러 처리는 <strong>마지막 안전망</strong>으로 사용하세요.
            <br />
            에러는 가능한 한 발생한 곳에서 처리하는 것이 좋습니다.
            <br />
            <code>uncaughtException</code> 에서 프로세스를 계속 실행하면{' '}
            <strong>예측 불가능한 상태</strong>가 될 수 있습니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="best-practices">6️⃣ 에러 처리 모범 사례</h2>
        <p>프로덕션 환경에서 권장되는 에러 처리 패턴입니다.</p>

        <CodeDemo
          title="에러 처리 모범 사례"
          description="실제 프로젝트에서 활용하는 패턴입니다."
          defaultCode={`// 모범 사례 1: 에러 유틸리티 클래스
class AppError extends Error {
  constructor(message, code, statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = true; // 운영 에러 여부
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends AppError {
  constructor(resource) {
    super(\`\${resource} 를 찾을 수 없습니다\`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

// 사용 예시
function getUser(id) {
  if (!id) {
    throw new ValidationError('ID 가 필요합니다');
  }
  const user = null; // DB 조회 결과
  if (!user) {
    throw new NotFoundError('사용자');
  }
  return user;
}

// 모범 사례 2: 에러 핸들러 래퍼
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Express 에서 사용
// app.get('/users/:id', asyncHandler(async (req, res) => {
//   const user = await getUser(req.params.id);
//   res.json(user);
// }));

// 모범 사례 3: 에러 로깅
function logError(error, context = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack,
    name: error.name,
    ...context
  };
  
  // 개발 환경: 콘솔 출력
  if (process.env.NODE_ENV === 'development') {
    console.error(logEntry);
  }
  
  // 프로덕션: 외부 서비스 전송
  // sendToSentry(logEntry);
}

try {
  throw new Error('테스트 에러');
} catch (error) {
  logError(error, { userId: 123, action: 'test' });
}

console.log('Error handling best practices');`}
        />

        <InfoCard type="tip" title="에러 처리 체크리스트">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>✅ 모든 비동기 작업에 try-catch 또는 .catch() 적용</li>
            <li>✅ 에러는 구체적으로 catch (TypeError, ValidationError 등)</li>
            <li>✅ 에러 메시지는 사용자에게 친절하게</li>
            <li>✅ 민감한 정보 (스택 트레이스 등) 는 프로덕션에서 숨김</li>
            <li>✅ 전역 에러 핸들러로 마지막 안전망 구축</li>
            <li>✅ 에러 로깅 및 모니터링 서비스 연동 (Sentry 등)</li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <code>try-catch-finally</code>: 동기 에러 처리 기본
            </li>
            <li>
              <code>.catch()</code> / <code>try-catch</code>: Promise/async 에러 처리
            </li>
            <li>
              내장 에러: <code>Error</code>, <code>TypeError</code>, <code>ReferenceError</code> 등
            </li>
            <li>
              커스텀 에러: <code>extends Error</code> 로 확장
            </li>
            <li>
              에러 전파: <code>throw error</code> 로 상위 전달
            </li>
            <li>에러 래핑: 컨텍스트 추가하여 재throw</li>
            <li>
              전역 처리: <code>window.onerror</code>, <code>unhandledrejection</code>
            </li>
            <li>모범 사례: 구체적 catch, 사용자 친화적 메시지, 로깅</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
