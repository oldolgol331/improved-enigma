import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function Promise() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>비동기와 Promise</h1>
        <p className="page-description">
          JavaScript 의 비동기 프로그래밍과 Promise 에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          JavaScript 는 <strong>단일 스레드</strong> 환경이지만, 비동기 작업을 통해 블로킹 없이 여러
          작업을 처리할 수 있습니다. Promise 는 비동기 작업의 최종 완료 (또는 실패) 를 나타내는
          객체입니다.
        </p>

        <InfoCard type="tip" title="비동기 처리 방식 변천사">
          <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>콜백 함수 (Callback) - 콜백 지옥 문제</li>
            <li>Promise (ES6) - 체이닝 가능</li>
            <li>async/await (ES2017) - 동기 코드처럼 작성</li>
          </ol>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="callback">1️⃣ 콜백 함수와 비동기</h2>
        <p>전통적인 비동기 처리 방식이지만, 중첩이 깊어지면 "콜백 지옥" 문제가 발생합니다.</p>

        <CodeDemo
          title="콜백 함수 비동기"
          description="setTimeout 과 콜백 패턴입니다."
          defaultCode={`// 동기 코드
console.log('Before');

// 비동기 코드 (setTimeout)
setTimeout(() => {
  console.log('Timeout executed (after 1 second)');
}, 1000);

console.log('After');

// 실행 순서:
// 1. Before
// 2. After
// 3. Timeout executed (after 1 second)

// 콜백 지옥 예시 (안티패턴)
function fetchData(callback) {
  setTimeout(() => {
    callback('Data fetched');
  }, 500);
}

fetchData((result) => {
  console.log(result);
  setTimeout(() => {
    console.log('Processing:', result);
    setTimeout(() => {
      console.log('Saving:', result);
      setTimeout(() => {
        console.log('Done!');
      }, 500);
    }, 500);
  }, 500);
});
// 콜백이 중첩되어 가독성 떨어짐`}
        />
      </section>

      <section className="content-section">
        <h2 id="promise-basic">2️⃣ Promise 기본</h2>
        <p>
          Promise 는 <strong>pending (대기)</strong>, <strong>fulfilled (이행)</strong>,
          <strong>rejected (거부)</strong> 의 세 가지 상태를 가집니다.
        </p>

        <CodeDemo
          title="Promise 기본"
          description="Promise 생성과 사용 방법입니다."
          defaultCode={`// Promise 생성
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('Operation successful!');
    } else {
      reject('Operation failed!');
    }
  }, 1000);
});

// Promise 사용
promise
  .then((result) => {
    console.log('Success:', result);
  })
  .catch((error) => {
    console.log('Error:', error);
  })
  .finally(() => {
    console.log('Finally: Always executed');
  });

// Promise 상태
// pending → fulfilled (resolve)
// pending → rejected (reject)

// 이미 이행된 Promise
const resolved = Promise.resolve('Success');
resolved.then(data => console.log('resolved:', data));

// 이미 거부된 Promise
const rejected = Promise.reject('Error');
rejected.catch(err => console.log('rejected:', err));`}
        />
      </section>

      <section className="content-section">
        <h2 id="chaining">3️⃣ Promise 체이닝</h2>
        <p>
          <code>.then()</code> 을 연속적으로 호출하여 비동기 작업을 순차적으로 처리할 수 있습니다.
        </p>

        <InfoCard type="tip" title="then 체이닝">
          <p>
            각 <code>.then()</code> 은 새로운 Promise 를 반환하므로 체이닝이 가능합니다.
            <code>.then()</code> 내에서 반환한 값은 다음 <code>.then()</code> 의 인수로 전달됩니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="Promise 체이닝"
          description="비동기 작업을 순차적으로 처리합니다."
          defaultCode={`// Promise 체이닝 예시
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ userId: 1 });
      console.log('Step 1: User data fetched');
    }, 500);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Post 1', 'Post 2', 'Post 3']);
      console.log('Step 2: Posts fetched for user', userId);
    }, 500);
  });
}

function fetchComments(post) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Comment A', 'Comment B']);
      console.log('Step 3: Comments fetched for', post);
    }, 500);
  });
}

// Promise 체이닝
fetchData()
  .then((user) => fetchPosts(user.userId))
  .then((posts) => {
    console.log('Posts:', posts);
    return fetchComments(posts[0]);
  })
  .then((comments) => {
    console.log('Comments:', comments);
  })
  .catch((error) => {
    console.log('Error:', error);
  })
  .finally(() => {
    console.log('All done!');
  });`}
        />
      </section>

      <section className="content-section">
        <h2 id="promise-all">4️⃣ Promise 병렬 처리</h2>
        <p>여러 Promise 를 병렬로 실행하고 결과를 한 번에 받을 수 있습니다.</p>

        <CodeDemo
          title="Promise 병렬 처리"
          description="Promise.all, Promise.race, Promise.allSettled 입니다."
          defaultCode={`// Promise.all: 모두 완료될 때까지 기다림
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log('Promise.all:', values); // [1, 2, 3]
  });

// Promise.all: 하나라도 실패하면 즉시 거부
const promiseFail = Promise.reject('Error!');

Promise.all([promise1, promiseFail, promise3])
  .catch((error) => {
    console.log('Promise.all caught:', error);
  });

// Promise.allSettled: 모두 완료될 때까지 기다림 (성공/실패 모두 포함)
Promise.allSettled([promise1, promiseFail, promise3])
  .then((results) => {
    console.log('Promise.allSettled:', results);
    // [
    //   { status: 'fulfilled', value: 1 },
    //   { status: 'rejected', reason: 'Error!' },
    //   { status: 'fulfilled', value: 3 }
    // ]
  });

// Promise.race: 가장 먼저 완료된 Promise 하나만 반환
const slow = new Promise(resolve => 
  setTimeout(() => resolve('slow'), 1000)
);
const fast = new Promise(resolve => 
  setTimeout(() => resolve('fast'), 500)
);

Promise.race([slow, fast])
  .then((value) => {
    console.log('Promise.race:', value); // fast
  });

// Promise.any: 가장 먼저 성공한 Promise 반환 (ES2021)
Promise.any([promiseFail, promise1, promise2])
  .then((value) => {
    console.log('Promise.any:', value); // 1
  });`}
        />
      </section>

      <section className="content-section">
        <h2 id="error-handling">5️⃣ 에러 처리</h2>
        <p>Promise 에서 에러를 처리하는 여러 방법을 확인합니다.</p>

        <InfoCard type="warning" title="에러 처리 주의사항">
          <p>
            <code>.catch()</code> 는 체인 내 모든 거부된 Promise 를 캐치합니다. 각{' '}
            <code>.then()</code> 이후에 <code>.catch()</code> 를 추가하면 에러를 복구하고 체인을
            계속할 수 있습니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="Promise 에러 처리"
          description="다양한 에러 처리 방법을 확인해보세요."
          defaultCode={`// 에러 처리 기본
const failingPromise = new Promise((_, reject) => {
  setTimeout(() => reject('Something failed!'), 500);
});

failingPromise
  .then((result) => {
    console.log('This won't run');
  })
  .catch((error) => {
    console.log('Caught error:', error);
  })
  .finally(() => {
    console.log('Finally always runs');
  });

// 에러 복구 (체인 계속)
Promise.reject('Initial error')
  .catch((error) => {
    console.log('Recovered from:', error);
    return 'Recovery value'; // 체인 계속
  })
  .then((value) => {
    console.log('Chain continues with:', value);
  });

// try-catch 스타일 에러 처리
new Promise((resolve, reject) => {
  throw new Error('Test error');
})
.catch((error) => {
  console.log('Caught:', error.message);
});

// async/await 에서의 에러 처리 (다음 섹션)`}
        />
      </section>

      <section className="content-section">
        <h2 id="practical">6️⃣ 실용적 예제</h2>
        <p>Promise 를 활용한 실제적인 비동기 처리 패턴입니다.</p>

        <CodeDemo
          title="Promise 실용 예제"
          description="실제 비동기 처리 패턴입니다."
          defaultCode={`// 지연 (delay) 함수
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 사용 예시
async function example() {
  console.log('Start');
  await delay(1000);
  console.log('After 1 second');
  await delay(1000);
  console.log('After 2 seconds');
}

// retry 패턴 (재시도)
function retry(fn, retries = 3) {
  return function(...args) {
    return fn(...args).catch((err) => {
      if (retries <= 0) throw err;
      console.log(\`Retrying... \${retries} attempts left\`);
      return retry(fn, retries - 1)(...args);
    });
  };
}

// 실패할 수 있는 함수
const flakyFunction = () => {
  return new Promise((_, reject) => {
    setTimeout(() => reject('Random failure'), 500);
  });
};

// retry 적용
// retry(flakyFunction, 3)().catch(console.log);

// timeout 패턴
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), ms);
  });
  return Promise.race([promise, timeout]);
}

// 사용
const slowPromise = new Promise(resolve => {
  setTimeout(() => resolve('Done'), 3000);
});

// withTimeout(slowPromise, 1000)
//   .then(console.log)
//   .catch(err => console.log('Error:', err.message));

// Promise 로 API 호출 시뮬레이션
function fetchAPI(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === '/users') {
        resolve([{ id: 1, name: 'Alice' }]);
      } else {
        reject(new Error('Not found'));
      }
    }, 500);
  });
}

fetchAPI('/users')
  .then(users => console.log('Users:', users))
  .catch(err => console.log('API Error:', err.message));`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>Promise: 비동기 작업의 완료/실패를 나타내는 객체</li>
            <li>상태: pending → fulfilled 또는 rejected</li>
            <li>
              <code>.then()</code>: 성공 시 처리, <code>.catch()</code>: 에러 처리
            </li>
            <li>
              <code>.finally()</code>: 항상 실행
            </li>
            <li>
              체이닝: <code>.then().then().catch()</code>
            </li>
            <li>
              <code>Promise.all()</code>: 모두 완료 대기, 하나 실패 시 즉시 거부
            </li>
            <li>
              <code>Promise.allSettled()</code>: 모두 완료 대기 (성공/실패 모두)
            </li>
            <li>
              <code>Promise.race()</code>: 가장 먼저 완료된 하나만
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
