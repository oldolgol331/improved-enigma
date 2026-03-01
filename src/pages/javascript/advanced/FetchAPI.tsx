import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function JSFetchAPI() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>fetch 와 API 통신</h1>
        <p className="page-description">
          fetch API 를 사용한 HTTP 통신과 비동기 데이터 처리에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          현대 웹 애플리케이션은 서버와 비동기 통신을 통해 데이터를 주고받습니다.
          <code>fetch</code> 는 브라우저에 내장된 HTTP 통신 API 로, Promise 를 기반으로
          깔끔한 비동기 코드를 작성할 수 있습니다.
        </p>

        <InfoCard type="tip" title="fetch 와 XMLHttpRequest">
          <p>
            <strong>fetch:</strong> 현대적 API, Promise 기반, 문법이 간단함
            <br />
            <strong>XMLHttpRequest:</strong> 레거시 API, 콜백 기반, 구형 브라우저 호환
            <br />
            <strong>권장:</strong> 특별한 이유가 없으면 fetch 사용 (구형 브라우저는 polyfill)
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="basic-fetch">1️⃣ fetch 기본 사용법</h2>
        <p>
          <code>fetch()</code> 는 URL 을 인자로 받아 Promise 를 반환합니다.
        </p>

        <CodeDemo
          title="fetch 기본 예시"
          description="간단한 GET 요청과 응답 처리"
          defaultCode={`// fetch 기본 사용법
// fetch(url) 는 Promise<Response> 를 반환합니다

// 1. 기본 GET 요청
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => {
    console.log('상태 코드:', response.status);
    console.log('응답 헤더:', response.headers);
    
    // response.json() 도 Promise 를 반환합니다
    return response.json();
  })
  .then((data) => {
    console.log('응답 데이터:', data);
  })
  .catch((error) => {
    console.error('에러 발생:', error);
  });

// 2. 응답 상태 확인 (권장 패턴)
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => {
    if (!response.ok) {
      // HTTP 에러 (4xx, 5xx) 처리
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return response.json();
  })
  .then((data) => {
    console.log('데이터:', data);
  })
  .catch((error) => {
    console.error('에러:', error.message);
  });

console.log('fetch 요청 시작...');`}
        />

        <InfoCard type="warning" title="fetch 에러 처리 주의사항">
          <ul>
            <li>
              <code>catch</code> 는 <strong>네트워크 오류</strong> 만 잡습니다
            </li>
            <li>
              HTTP 404, 500 등은 <code>response.ok === false</code>로 직접 확인해야 합니다
            </li>
            <li>
              반드시 <code>response.ok</code> 체크를 권장합니다
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="async-await">2️⃣ async/await 와 fetch</h2>
        <p>
          async/await 문법을 사용하면 fetch 코드를 더 읽기 쉽게 작성할 수 있습니다.
        </p>

        <CodeDemo
          title="async/await 로 fetch 사용하기"
          description="더 깔끔한 비동기 코드 작성"
          defaultCode={`// async/await 패턴 (권장)

// 1. 기본 async/await
async function fetchPost() {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('응답 데이터:', data);
    return data;
  } catch (error) {
    console.error('에러 발생:', error.message);
    throw error;  // 필요시 재전파
  }
}

// 2. IIFE 에서 사용 (top-level await 대용)
(async () => {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('IIFE 데이터:', data);
  } catch (error) {
    console.error('IIFE 에러:', error.message);
  }
})();

// 3. 여러 fetch 병렬 처리 (성능 최적화)
async function fetchMultiplePosts() {
  try {
    // Promise.all 로 병렬 처리
    const [post1, post2, post3] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json()),
      fetch('https://jsonplaceholder.typicode.com/posts/2').then(r => r.json()),
      fetch('https://jsonplaceholder.typicode.com/posts/3').then(r => r.json()),
    ]);
    
    console.log('병렬 처리 결과:', { post1, post2, post3 });
  } catch (error) {
    console.error('병렬 처리 에러:', error.message);
  }
}

fetchPost();
fetchMultiplePosts();`}
        />

        <InfoCard type="tip" title="Promise.all vs Promise.allSettled">
          <ul>
            <li>
              <code>Promise.all</code>: 하나라도 실패하면 전체 실패 (fast fail)
            </li>
            <li>
              <code>Promise.allSettled</code>: 모두 완료될 때까지 기다림 (결과 배열로 확인)
            </li>
            <li>
              <strong>상황에 따라 선택:</strong> 모두 성공해야 하면 all, 일부 실패도 허용하면 allSettled
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="http-methods">3️⃣ HTTP 메서드 (POST, PUT, DELETE)</h2>
        <p>
          fetch 옵션을 사용해 POST, PUT, DELETE 등의 요청을 보낼 수 있습니다.
        </p>

        <CodeDemo
          title="HTTP 메서드 활용"
          description="POST, PUT, DELETE 요청과 헤더 설정"
          defaultCode={`// POST 요청 (데이터 생성)
async function createPost() {
  const newPost = {
    title: '새로운 게시글',
    body: '내용입니다',
    userId: 1,
  };

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // JSON 명시
        },
        body: JSON.stringify(newPost),  // 객체를 JSON 문자열로
      }
    );

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    console.log('생성된 게시글:', data);
    return data;
  } catch (error) {
    console.error('POST 에러:', error.message);
  }
}

// PUT 요청 (데이터 전체 수정)
async function updatePost(id) {
  const updatedPost = {
    id,
    title: '수정된 제목',
    body: '수정된 내용',
    userId: 1,
  };

  try {
    const response = await fetch(
      \`https://jsonplaceholder.typicode.com/posts/\${id}\`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      }
    );

    const data = await response.json();
    console.log('수정된 게시글:', data);
    return data;
  } catch (error) {
    console.error('PUT 에러:', error.message);
  }
}

// PATCH 요청 (데이터 일부 수정)
async function patchPost(id) {
  const partialUpdate = {
    title: '일부 수정된 제목',
  };

  try {
    const response = await fetch(
      \`https://jsonplaceholder.typicode.com/posts/\${id}\`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(partialUpdate),
      }
    );

    const data = await response.json();
    console.log('일부 수정된 게시글:', data);
    return data;
  } catch (error) {
    console.error('PATCH 에러:', error.message);
  }
}

// DELETE 요청 (데이터 삭제)
async function deletePost(id) {
  try {
    const response = await fetch(
      \`https://jsonplaceholder.typicode.com/posts/\${id}\`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    console.log(\`게시글 \${id} 삭제 완료\`);
    return true;
  } catch (error) {
    console.error('DELETE 에러:', error.message);
  }
}

// 실행 예시
createPost();
// updatePost(1);
// deletePost(1);`}
        />

        <InfoCard type="tip" title="Content-Type 헤더">
          <p>
            <code>Content-Type: application/json</code> 은 서버에 <strong>JSON 데이터를 보냄</strong>을
            명시합니다. 이 헤더가 없으면 서버가 데이터를 파싱하지 못할 수 있습니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="query-params">4️⃣ 쿼리 파라미터</h2>
        <p>
          URL 에 쿼리 파라미터를 추가해 필터링, 정렬, 페이지네이션 등을 수행할 수 있습니다.
        </p>

        <CodeDemo
          title="쿼리 파라미터 처리"
          description="URLSearchParams 를 활용한 안전한 파라미터 생성"
          defaultCode={`// 1. 수동으로 파라미터 추가 (간단한 경우)
const page = 2;
const limit = 10;
fetch(\`https://api.example.com/posts?page=\${page}&limit=\${limit}\`)
  .then((res) => res.json())
  .then((data) => console.log('페이지네이션:', data));

// 2. URLSearchParams 사용 (권장 - 인코딩 자동 처리)
const params = new URLSearchParams({
  page: '2',
  limit: '10',
  sortBy: 'createdAt',
  order: 'desc',
});

fetch(\`https://api.example.com/posts?\${params.toString()}\`)
  .then((res) => res.json())
  .then((data) => console.log('정렬된 데이터:', data));

// 3. 동적 파라미터 추가
async function fetchFilteredPosts(filters) {
  const params = new URLSearchParams();
  
  // 조건부 파라미터 추가
  if (filters.userId) {
    params.append('userId', filters.userId.toString());
  }
  if (filters.search) {
    params.append('q', filters.search);
  }
  if (filters.tags) {
    filters.tags.forEach((tag) => params.append('tags', tag));
  }

  const response = await fetch(
    \`https://api.example.com/posts?\${params.toString()}\`
  );
  
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  
  return response.json();
}

// 사용 예시
fetchFilteredPosts({
  userId: 1,
  search: 'react',
  tags: ['javascript', 'frontend'],
}).then((data) => console.log('필터링 결과:', data));

// 4. 특수 문자 인코딩 (자동 처리됨)
const searchParams = new URLSearchParams({
  q: 'hello world',  // 자동으로 'hello+world' 로 인코딩
  filter: 'name=홍길동',  // 한글도 자동 인코딩
});

console.log('인코딩된 파라미터:', params.toString());`}
        />

        <InfoCard type="tip" title="URLSearchParams 장점">
          <ul>
            <li>
              <strong>자동 인코딩:</strong> 특수 문자, 한글 등 자동 처리
            </li>
            <li>
              <strong>유연성:</strong> 동적 파라미터 추가 용이
            </li>
            <li>
              <strong>가독성:</strong> 객체로 명확하게 표현
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="headers-auth">5️⃣ 헤더와 인증</h2>
        <p>
          API 요청 시 인증 토큰이나 커스텀 헤더를 포함할 수 있습니다.
        </p>

        <CodeDemo
          title="인증 헤더 처리"
          description="Authorization 토큰과 커스텀 헤더"
          defaultCode={`// 1. 기본 인증 헤더
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

async function fetchWithAuth(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${token}\`,  // JWT 토큰
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // 인증 실패: 토큰 갱신 또는 로그인 페이지로
      console.error('인증이 만료되었습니다');
    }
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  return response.json();
}

// 2. 커스텀 헤더
async function fetchWithCustomHeaders(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'your-api-key-here',  // API 키
      'X-Request-ID': crypto.randomUUID(),  // 요청 추적 ID
      'Accept': 'application/json',  // 응답 형식 명시
    },
  });

  // 응답 헤더 읽기
  const contentType = response.headers.get('Content-Type');
  const rateLimit = response.headers.get('X-RateLimit-Remaining');
  
  console.log('Content-Type:', contentType);
  console.log('Rate Limit Remaining:', rateLimit);

  return response.json();
}

// 3. 토큰 갱신 패턴 (401 처리)
async function fetchWithTokenRefresh(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${localStorage.getItem('accessToken')}\`,
        ...options.headers,
      },
    });

    if (response.status === 401) {
      // 토큰 갱신 시도
      console.log('토큰 갱신 시도...');
      // const newToken = await refreshAccessToken();
      // localStorage.setItem('accessToken', newToken);
      
      // 원래 요청 재시도
      // return fetch(url, { ...options, headers: { ... } });
      
      throw new Error('인증 만료 - 로그인 필요');
    }

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    return response.json();
  } catch (error) {
    console.error('요청 실패:', error.message);
    throw error;
  }
}

// 사용 예시
fetchWithAuth('https://api.example.com/user/profile')
  .then((data) => console.log('유저 프로필:', data));`}
        />

        <InfoCard type="warning" title="보안 주의사항">
          <ul>
            <li>
              <strong>토큰 저장:</strong> localStorage 는 XSS 에 취약, 가능하면 httpOnly 쿠키 사용
            </li>
            <li>
              <strong>CORS:</strong> 다른 도메인 API 호출 시 CORS 정책 확인
            </li>
            <li>
              <strong>민감 정보:</strong> API 키, 시크릿은 서버 사이드에서 관리
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="error-handling">6️⃣ 에러 처리 전략</h2>
        <p>
          네트워크 오류, HTTP 에러, 타임아웃 등 다양한 에러 상황을 처리합니다.
        </p>

        <CodeDemo
          title="에러 처리 패턴"
          description="다양한 에러 상황 처리와 재시도 로직"
          defaultCode={`// 1. 상세한 에러 처리
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url, {
      // 네트워크 타임아웃 (5 초)
      signal: AbortSignal.timeout(5000),
    });

    // HTTP 상태 코드별 처리
    switch (response.status) {
      case 200:
        return await response.json();
      case 204:
        return null;  // 내용 없음
      case 400:
        throw new Error('잘못된 요청입니다');
      case 401:
        throw new Error('인증이 필요합니다');
      case 403:
        throw new Error('접근 권한이 없습니다');
      case 404:
        throw new Error('리소스를 찾을 수 없습니다');
      case 500:
        throw new Error('서버 오류가 발생했습니다');
      default:
        throw new Error(\`HTTP error! status: \${response.status}\`);
    }
  } catch (error) {
    // 에러 타입별 처리
    if (error.name === 'AbortError') {
      console.error('요청이 타임아웃되었습니다');
    } else if (error.name === 'TypeError') {
      // 네트워크 오류 (CORS, 오프라인 등)
      console.error('네트워크 오류:', error.message);
    } else {
      console.error('기타 에러:', error.message);
    }
    throw error;
  }
}

// 2. 재시도 로직 (Exponential Backoff)
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        return response.json();
      }
      
      // 5xx 에러는 재시도 가능
      if (response.status >= 500 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000;  // 지수 백오프
        console.log(\`\${response.status} 에러, \${delay}ms 후 재시도...\`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      
      throw new Error(\`HTTP error! status: \${response.status}\`);
    } catch (error) {
      // 마지막 시도에서 실패하면 에러 전파
      if (i === maxRetries - 1) {
        console.error('최대 재시도 횟수 초과:', error.message);
        throw error;
      }
    }
  }
}

// 3. 에러 바운더리 패턴 (React 에서 활용)
class APIError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

async function safeFetch(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new APIError(response.status, \`HTTP \${response.status}\`);
    }
    
    return { success: true, data: await response.json() };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      status: error.status 
    };
  }
}

// 사용 예시
safeFetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((result) => {
    if (result.success) {
      console.log('성공:', result.data);
    } else {
      console.error('실패:', result.error);
    }
  });`}
        />

        <InfoCard type="tip" title="AbortSignal.timeout">
          <p>
            <code>AbortSignal.timeout(ms)</code> 는 지정한 시간 후에 요청을 자동 중단합니다.
            (최신 브라우저) 구형 브라우저에서는 수동으로 AbortController 를 사용하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="FormData">7️⃣ FormData 와 파일 업로드</h2>
        <p>
          폼 데이터와 파일을 서버로 업로드할 수 있습니다.
        </p>

        <CodeDemo
          title="FormData 와 파일 업로드"
          description="폼 데이터와 멀티파트 업로드"
          defaultCode={`// 1. FormData 로 폼 데이터 전송
async function submitForm(formData) {
  // formData 는 객체가 아니라 FormData 인스턴스입니다
  const data = new FormData();
  data.append('name', formData.name);
  data.append('email', formData.email);
  data.append('message', formData.message);

  try {
    const response = await fetch('https://api.example.com/contact', {
      method: 'POST',
      body: data,
      // Content-Type 헤더를 수동으로 설정하지 않음
      // (boundary 가 자동 추가됨)
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    return await response.json();
  } catch (error) {
    console.error('폼 제출 에러:', error.message);
    throw error;
  }
}

// 2. 파일 업로드
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('description', '업로드된 파일');

  try {
    const response = await fetch('https://api.example.com/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const result = await response.json();
    console.log('업로드 완료:', result);
    return result;
  } catch (error) {
    console.error('파일 업로드 에러:', error.message);
    throw error;
  }
}

// 3. 여러 파일 업로드
async function uploadMultipleFiles(files) {
  const formData = new FormData();
  
  // 여러 파일 추가 (동일한 키)
  Array.from(files).forEach((file) => {
    formData.append('files', file);
  });
  
  formData.append('uploadType', 'multiple');

  try {
    const response = await fetch('https://api.example.com/upload', {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error('여러 파일 업로드 에러:', error.message);
  }
}

// 4. FormData 에서 값 읽기
const fd = new FormData();
fd.append('username', 'hong');
fd.append('age', '25');

console.log('username:', fd.get('username'));
console.log('all values:', Array.from(fd.entries()));

// HTML 폼에서 직접 추출
const form = document.querySelector('form');
const formFromElement = new FormData(form);
const nameValue = formFromElement.get('name');

console.log('폼 데이터:', nameValue);`}
        />

        <InfoCard type="warning" title="FormData Content-Type">
          <p>
            FormData 를 사용할 때는 <code>Content-Type</code> 헤더를 <strong>수동으로 설정하지
            않습니다</strong>. 브라우저가 자동으로 <code>multipart/form-data</code> 와 boundary 를
            설정합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="axios-compare">📊 fetch vs Axios</h2>
        
        <InfoCard type="tip" title="fetch 와 Axios 비교">
          <table>
            <thead>
              <tr>
                <th>기능</th>
                <th>fetch</th>
                <th>Axios</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>크기</td>
                <td>내장 (0 KB)</td>
                <td>별도 설치 (~13 KB)</td>
              </tr>
              <tr>
                <td>JSON 파싱</td>
                <td>수동 (<code>.json()</code>)</td>
                <td>자동</td>
              </tr>
              <tr>
                <td>에러 처리</td>
                <td>직접 확인 필요</td>
                <td>자동 (4xx, 5xx)</td>
              </tr>
              <tr>
                <td>인터셉터</td>
                <td>직접 구현</td>
                <td>내장</td>
              </tr>
              <tr>
                <td>취소</td>
                <td>AbortController</td>
                <td>CancelToken</td>
              </tr>
              <tr>
                <td>브라우저</td>
                <td>최신 브라우저</td>
                <td>구형 브라우저 지원</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>

        <CodeDemo
          title="Axios 사용 예시 (참고)"
          description="Axios 를 사용하는 경우의 코드"
          defaultCode={`// Axios 설치: npm install axios
// import axios from 'axios';

// 1. 기본 GET 요청
// axios.get('https://api.example.com/posts/1')
//   .then((response) => {
//     console.log('데이터:', response.data);  // 자동으로 JSON 파싱
//   })
//   .catch((error) => {
//     console.error('에러:', error);  // 4xx, 5xx 자동 캐치
//   });

// 2. POST 요청
// axios.post('https://api.example.com/posts', {
//   title: '새 게시글',
//   body: '내용',
//   userId: 1,
// })
// .then((response) => {
//   console.log('생성됨:', response.data);
// });

// 3. 인스턴스 생성 (baseURL, 헤더 등 공통 설정)
// const apiClient = axios.create({
//   baseURL: 'https://api.example.com',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // 인스턴스 사용
// apiClient.get('/posts');

// 4. 인터셉터 (토큰 자동 추가)
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = \`Bearer \${token}\`;
//   }
//   return config;
// });

// console.log('Axios 예시 (주석 처리됨)');`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>fetch 기본:</strong> Promise 기반 HTTP 통신 API
          </li>
          <li>
            <strong>에러 처리:</strong> <code>response.ok</code> 체크 필수, <code>catch</code> 는 네트워크 오류만
          </li>
          <li>
            <strong>async/await:</strong> 더 읽기 쉬운 비동기 코드
          </li>
          <li>
            <strong>HTTP 메서드:</strong> POST/PUT/PATCH/DELETE 와 헤더 설정
          </li>
          <li>
            <strong>쿼리 파라미터:</strong> <code>URLSearchParams</code> 활용
          </li>
          <li>
            <strong>인증:</strong> Authorization 헤더에 Bearer 토큰
          </li>
          <li>
            <strong>에러 처리:</strong> 상태 코드별 처리, 재시도 로직
          </li>
          <li>
            <strong>FormData:</strong> 폼 데이터와 파일 업로드
          </li>
        </ul>
      </section>
    </div>
  );
}