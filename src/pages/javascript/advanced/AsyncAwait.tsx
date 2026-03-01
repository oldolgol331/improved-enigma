import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function AsyncAwait() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>async/await</h1>
        <p className="page-description">
          ES2017 에서 도입된 async/await 으로 비동기 코드를 동기적으로 작성합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <code>async/await</code> 은 Promise 기반 비동기 코드를{' '}
          <strong>동기 코드처럼 읽히고 작성</strong>할 수 있게 합니다. 내부적으로는 Promise 를
          사용하며, 더 깔끔하고 에러 처리도 쉽습니다.
        </p>

        <InfoCard type="tip" title="async/await 특징">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <code>async</code> 함수는 항상 Promise 를 반환합니다
            </li>
            <li>
              <code>await</code> 은 Promise 가 완료될 때까지 기다립니다
            </li>
            <li>
              <code>await</code> 은 async 함수 내부에서만 사용 가능합니다
            </li>
            <li>
              에러 처리는 <code>try-catch</code> 로 합니다
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="basic">1️⃣ async/await 기본</h2>
        <p>async/await 의 기본 문법과 동작 방식을 확인합니다.</p>

        <CodeDemo
          title="async/await 기본"
          description="Promise 를 동기 코드처럼 작성합니다."
          defaultCode={`// async 함수 (항상 Promise 반환)
async function fetchData() {
  return 'Data'; // 자동으로 Promise.resolve('Data')
}

// 확인
fetchData().then(data => console.log('fetchData:', data));

// await 사용 (Promise 대기)
async function example() {
  console.log('Start');
  
  const result = await fetchData();
  console.log('Result:', result);
  
  console.log('End');
}

example();

// delay 함수와 함께
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedExample() {
  console.log('Before delay');
  await delay(1000); // 1 초 대기
  console.log('After 1 second');
  await delay(1000); // 또 1 초 대기
  console.log('After 2 seconds total');
}

// delayedExample();

// await 은 Promise 가 아니면 즉시 반환
async function immediateExample() {
  const value = await 42; // Promise 아님
  console.log('value:', value); // 42
}`}
        />
      </section>

      <section className="content-section">
        <h2 id="error-handling">2️⃣ 에러 처리</h2>
        <p>
          async/await 에서 에러는 <code>try-catch</code> 로 처리합니다.
        </p>

        <InfoCard type="warning" title="에러 처리 주의">
          <p>
            <code>await</code> 을 사용한 Promise 가 거부되면 에러가 throw 됩니다. 반드시{' '}
            <code>try-catch</code> 로 감싸야 합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="async/await 에러 처리"
          description="try-catch 로 에러를 처리합니다."
          defaultCode={`// 실패하는 Promise
function failingAPI() {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('API Error')), 500);
  });
}

// 성공하는 Promise
function successAPI() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Success!'), 500);
  });
}

// try-catch 에러 처리
async function withTryCatch() {
  try {
    console.log('Calling API...');
    const result = await failingAPI();
    console.log('Result:', result);
  } catch (error) {
    console.log('Caught error:', error.message);
  } finally {
    console.log('Finally always runs');
  }
}

withTryCatch();

// 여러 비동기 작업 에러 처리
async function multipleOperations() {
  try {
    const result1 = await successAPI();
    console.log('Result 1:', result1);
    
    const result2 = await successAPI();
    console.log('Result 2:', result2);
    
    return result1 + result2;
  } catch (error) {
    console.log('Operation failed:', error.message);
    throw error; // 에러 재전파
  }
}

// multipleOperations();

// .catch() 와 비교
successAPI()
  .then(result => console.log('Then:', result))
  .catch(err => console.log('Catch:', err.message));`}
        />
      </section>

      <section className="content-section">
        <h2 id="parallel">3️⃣ 병렬 실행</h2>
        <p>여러 비동기 작업을 병렬로 실행하는 방법입니다.</p>

        <InfoCard type="tip" title="병렬 vs 순차">
          <p>
            <strong>순차 실행</strong>: 각 <code>await</code> 이 완료될 때까지 기다림
            <br />
            <strong>병렬 실행</strong>: <code>Promise.all()</code> 으로 모두 동시에 시작
          </p>
        </InfoCard>

        <CodeDemo
          title="병렬 실행"
          description="Promise.all 로 병렬 처리합니다."
          defaultCode={`function delay(ms, value) {
  return new Promise(resolve => 
    setTimeout(() => resolve(value), ms)
  );
}

// 순차 실행 (느림)
async function sequential() {
  console.log('Sequential start');
  const start = Date.now();
  
  const result1 = await delay(1000, 'A');
  const result2 = await delay(1000, 'B');
  const result3 = await delay(1000, 'C');
  
  console.log('Results:', result1, result2, result3);
  console.log('Time:', Date.now() - start, 'ms'); // 약 3000ms
}

// 병렬 실행 (빠름)
async function parallel() {
  console.log('\\nParallel start');
  const start = Date.now();
  
  const [result1, result2, result3] = await Promise.all([
    delay(1000, 'A'),
    delay(1000, 'B'),
    delay(1000, 'C')
  ]);
  
  console.log('Results:', result1, result2, result3);
  console.log('Time:', Date.now() - start, 'ms'); // 약 1000ms
}

// sequential();
// parallel();

// Promise.allSettled 사용 (일부 실패해도 모두 기다림)
async function allSettledExample() {
  const results = await Promise.allSettled([
    delay(500, 'A'),
    Promise.reject('Error!'),
    delay(500, 'C')
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(\`Task \${index}:\`, result.value);
    } else {
      console.log(\`Task \${index} failed:\`, result.reason);
    }
  });
}

// allSettledExample();`}
        />
      </section>

      <section className="content-section">
        <h2 id="real-world">4️⃣ 실전 예제</h2>
        <p>실제 API 호출 시나리오를 구현합니다.</p>

        <CodeDemo
          title="실전 API 호출"
          description="실제적인 비동기 처리 패턴입니다."
          defaultCode={`// API 시뮬레이션
function fetchUser(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: userId, name: \`User \${userId}\` });
    }, 500);
  });
}

function fetchPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([\`Post 1 by \${userId}\`, \`Post 2 by \${userId}\`]);
    }, 500);
  });
}

function fetchComments(postId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([\`Comment A on \${postId}\`, \`Comment B on \${postId}\`]);
    }, 500);
  });
}

// 사용자 데이터와 게시글 가져오기
async function getUserData(userId) {
  try {
    const user = await fetchUser(userId);
    console.log('User:', user);
    
    const posts = await fetchPosts(user.id);
    console.log('Posts:', posts);
    
    return { user, posts };
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// getUserData(1);

// 여러 사용자 병렬로 가져오기
async function getAllUsers() {
  const userIds = [1, 2, 3];
  
  const users = await Promise.all(
    userIds.map(id => fetchUser(id))
  );
  
  console.log('All users:', users);
  return users;
}

// getAllUsers();

// 재시도 로직
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(\`Attempt \${i + 1}\`);
      // 실제 API 호출: const response = await fetch(url);
      const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (i < retries - 1) reject(new Error('Random error'));
          else resolve('Success');
        }, 500);
      });
      return result;
    } catch (error) {
      console.log(\`Failed, retrying...\`);
    }
  }
  throw new Error('All retries failed');
}

// fetchWithRetry('/api/data');`}
        />
      </section>

      <section className="content-section">
        <h2 id="top-level">5️⃣ Top-level await</h2>
        <p>
          ES2022 에서 도입된 top-level await 은 모듈 최상단에서도 await 을 사용할 수 있게 합니다.
        </p>

        <InfoCard type="note" title="Top-level await">
          <p>
            모듈 (ESM) 환경에서만 동작하며, 스크립트 전체가 Promise 처럼 동작합니다. 초기화 코드에서
            비동기 작업을 간결하게 작성할 수 있습니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="Top-level await"
          description="모듈 최상단에서 await 사용 (ES2022)."
          defaultCode={`// 이 코드는 모듈 환경에서만 동작합니다
// 실제 파일에서는 아래 코드를 주석 해제하세요

// Top-level await 예시
// const data = await fetch('/api/data').then(r => r.json());
// console.log('Loaded:', data);

// 모듈 초기화
// const config = await loadConfig();
// const db = await connectDatabase(config);

// export const api = createAPI(db);

// 비교: 기존 방식
// let data;
// fetch('/api/data')
//   .then(r => r.json())
//   .then(d => {
//     data = d;
//     console.log('Loaded:', data);
//   });

// Top-level await 사용 시
// const data = await fetch('/api/data').then(r => r.json());
// console.log('Loaded:', data);
// export { data };

// 참고: 이 데모는 브라우저 콘솔에서도 동작합니다
(async () => {
  const data = await Promise.resolve({ name: 'Test' });
  console.log('Simulated top-level await:', data);
})();`}
        />
      </section>

      <section className="content-section">
        <h2 id="comparison">📊 Promise vs async/await</h2>
        <p>두 방식의 코드를 비교합니다.</p>

        <CodeDemo
          title="Promise vs async/await"
          description="동일한 로직을 다른 방식으로 구현합니다."
          defaultCode={`function fetchData() {
  return Promise.resolve({ data: 'test' });
}

// Promise 체이닝
fetchData()
  .then(result => {
    console.log('Promise:', result);
    return result.data;
  })
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.log('Error:', error);
  });

// async/await (더 읽기 쉬움)
async function asyncExample() {
  try {
    const result = await fetchData();
    console.log('Async/await:', result);
    const data = result.data;
    console.log('Data:', data);
  } catch (error) {
    console.log('Error:', error);
  }
}

asyncExample();

// 조건부 비동기
// Promise
fetchData()
  .then(result => {
    if (result.data === 'test') {
      return Promise.resolve('matched');
    }
    return Promise.resolve('not matched');
  });

// async/await (더 직관적)
async function conditionalExample() {
  const result = await fetchData();
  if (result.data === 'test') {
    return 'matched';
  }
  return 'not matched';
}`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <code>async</code> 함수: 항상 Promise 반환
            </li>
            <li>
              <code>await</code>: Promise 완료 대기, async 함수 내부에서만 사용
            </li>
            <li>
              에러 처리: <code>try-catch</code> 사용
            </li>
            <li>
              병렬 실행: <code>Promise.all()</code> 과 함께 사용
            </li>
            <li>순차 vs 병렬: 필요에 따라 선택</li>
            <li>Top-level await: 모듈 최상단에서 await 사용 (ES2022)</li>
            <li>Promise 체이닝보다 가독성이 좋음</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
