import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function AxiosHTTPClient() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Axios HTTP 클라이언트</h1>
        <p className="page-description">
          현대 웹 개발에서 가장 널리 사용되는 HTTP 클라이언트 Axios 에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>Axios</strong> 는 브라우저와 Node.js 에서 작동하는 Promise 기반 HTTP 클라이언트입니다.
          fetch 보다 간편한 API 와 풍부한 기능을 제공합니다.
        </p>

        <InfoCard type="tip" title="Axios vs fetch">
          <table>
            <thead>
              <tr>
                <th>기능</th>
                <th>Axios</th>
                <th>fetch</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>JSON 파싱</td>
                <td>자동</td>
                <td>수동 (<code>.json()</code>)</td>
              </tr>
              <tr>
                <td>에러 처리</td>
                <td>자동 (4xx, 5xx)</td>
                <td>직접 확인 필요</td>
              </tr>
              <tr>
                <td>요청/응답 변환</td>
                <td>인터셉터 내장</td>
                <td>직접 구현</td>
              </tr>
              <tr>
                <td>취소</td>
                <td>CancelToken / AbortController</td>
                <td>AbortController</td>
              </tr>
              <tr>
                <td>브라우저</td>
                <td>구형 브라우저 지원</td>
                <td>최신 브라우저</td>
              </tr>
              <tr>
                <td>크기</td>
                <td>~13KB (gzip)</td>
                <td>내장 (0KB)</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="installation">1️⃣ 설치와 기본 사용법</h2>
        <p>
          Axios 설치하고 기본 CRUD 연산을 수행합니다.
        </p>

        <CodeDemo
          title="Axios 기본 사용법"
          description="설치와 CRUD 연산"
          defaultCode={`// 1. 설치
// npm install axios

import axios from 'axios';

// 2. 기본 GET 요청
async function fetchPost() {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    
    // response.data 에 파싱된 데이터
    console.log('데이터:', response.data);
    console.log('상태 코드:', response.status);
    console.log('헤더:', response.headers);
  } catch (error) {
    console.error('에러:', error);
  }
}

// 3. POST 요청 (데이터 생성)
async function createPost() {
  try {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        title: '새 게시글',
        body: '내용입니다',
        userId: 1,
      }
      // Content-Type: application/json 자동 설정
    );
    
    console.log('생성됨:', response.data);
  } catch (error) {
    console.error('에러:', error);
  }
}

// 4. PUT 요청 (전체 수정)
async function updatePost(id: number) {
  try {
    const response = await axios.put(
      \`https://jsonplaceholder.typicode.com/posts/\${id}\`,
      {
        id,
        title: '수정된 제목',
        body: '수정된 내용',
        userId: 1,
      }
    );
    
    console.log('수정됨:', response.data);
  } catch (error) {
    console.error('에러:', error);
  }
}

// 5. PATCH 요청 (일부 수정)
async function patchPost(id: number) {
  try {
    const response = await axios.patch(
      \`https://jsonplaceholder.typicode.com/posts/\${id}\`,
      {
        title: '일부 수정',
      }
    );
    
    console.log('일부 수정됨:', response.data);
  } catch (error) {
    console.error('에러:', error);
  }
}

// 6. DELETE 요청 (삭제)
async function deletePost(id: number) {
  try {
    const response = await axios.delete(
      \`https://jsonplaceholder.typicode.com/posts/\${id}\`
    );
    
    console.log('삭제 완료');
  } catch (error) {
    console.error('에러:', error);
  }
}

fetchPost();
console.log('Axios 기본 예시 완료');`}
        />

        <InfoCard type="tip" title="Response 객체 구조">
          <ul>
            <li>
              <code>response.data</code>: 실제 응답 데이터 (자동 JSON 파싱)
            </li>
            <li>
              <code>response.status</code>: HTTP 상태 코드
            </li>
            <li>
              <code>response.headers</code>: 응답 헤더
            </li>
            <li>
              <code>response.config</code>: 요청 설정
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="config">2️⃣ 요청 설정</h2>
        <p>
          Axios 는 다양한 설정 옵션을 제공합니다.
        </p>

        <CodeDemo
          title="요청 설정 옵션"
          description="헤더, 파라미터, 타임아웃 등"
          defaultCode={`// 1. 상세 설정
async function fetchWithConfig() {
  const response = await axios.get('/api/posts', {
    // 쿼리 파라미터
    params: {
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      order: 'desc',
    },
    
    // 헤더
    headers: {
      'Authorization': 'Bearer token123',
      'X-Custom-Header': 'value',
    },
    
    // 타임아웃 (ms)
    timeout: 5000,
    
    // 인증 쿠키 전송 (크로스도메인)
    withCredentials: true,
    
    // 응답 타입
    responseType: 'json',  // 'arraybuffer', 'blob', 'document', 'text'
    
    // 진행 상황 추적 (다운로드)
    onDownloadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / (progressEvent.total || 1)
      );
      console.log(\`다운로드: \${percentCompleted}%\`);
    },
  });
  
  return response.data;
}

// 2. POST 와 데이터 변환
async function postData() {
  const response = await axios.post(
    '/api/posts',
    {
      title: '게시글',
      content: '내용',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123',
      },
      
      // 업로드 진행 상황
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        console.log(\`업로드: \${percentCompleted}%\`);
      },
    }
  );
  
  return response.data;
}

// 3. URLSearchParams 와 함께
async function fetchWithParams() {
  const params = new URLSearchParams({
    q: 'react',
    tags: 'javascript,frontend',
  });
  
  const response = await axios.get(\`/api/search?\${params}\`);
  return response.data;
}

console.log('요청 설정 예시 완료');`}
        />

        <InfoCard type="tip" title="params vs 직접 URL">
          <p>
            <code>params</code> 옵션을 사용하면 Axios 가 자동으로 URL 인코딩을 처리합니다.
            특수 문자가 포함된 경우 직접 URL 을 구성하는 것보다 안전합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="instance">3️⃣ Axios 인스턴스</h2>
        <p>
          인스턴스를 생성해 공통 설정을 재사용할 수 있습니다.
        </p>

        <CodeDemo
          title="Axios 인스턴스 생성"
          description="공통 설정과 재사용"
          defaultCode={`import axios from 'axios';

// 1. 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'https://api.example.com',  // 기본 URL
  timeout: 10000,  // 10 초 타임아웃
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'MyApp',
  },
});

// 2. 인스턴스 사용 (간단해짐)
async function fetchPosts() {
  // baseURL + '/posts'
  const response = await apiClient.get('/posts');
  return response.data;
}

async function createPost(data: any) {
  const response = await apiClient.post('/posts', data);
  return response.data;
}

// 3. 여러 인스턴스 (용도별)
const publicApi = axios.create({
  baseURL: 'https://api.public.com',
});

const privateApi = axios.create({
  baseURL: 'https://api.private.com',
  headers: {
    'Authorization': \`Bearer \${localStorage.getItem('token')}\`,
  },
});

// 4. 인스턴스 설정 변경
apiClient.defaults.timeout = 20000;
apiClient.defaults.headers.common['X-New-Header'] = 'value';

// 5. 인터셉터 추가 (토큰 자동 추가)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

// 6. 인스턴스 내보내기 (재사용)
// api.ts
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// 사용处
// import { apiClient } from './api';
// apiClient.get('/posts');

console.log('인스턴스 예시 완료');`}
        />

        <InfoCard type="tip" title="인스턴스 사용 장점">
          <ul>
            <li>
              <strong>DRY:</strong> 공통 설정 반복 방지
            </li>
            <li>
              <strong>유지보수:</strong> 한 곳에서 설정 관리
            </li>
            <li>
              <strong>테스트:</strong> 목 (mock) 인스턴스 생성 용이
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="interceptors">4️⃣ 인터셉터</h2>
        <p>
          요청/응답을 가로채어 전처리를 수행합니다.
        </p>

        <CodeDemo
          title="인터셉터 활용"
          description="토큰 갱신, 에러 처리"
          defaultCode={`import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
});

// 1. 요청 인터셉터 (모든 요청에 적용)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 토큰 추가
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    
    // 로딩 시작
    console.log('요청 시작:', config.method?.toUpperCase(), config.url);
    
    return config;
  },
  (error: AxiosError) => {
    // 요청 에러
    console.error('요청 에러:', error);
    return Promise.reject(error);
  }
);

// 2. 응답 인터셉터 (모든 응답에 적용)
apiClient.interceptors.response.use(
  (response) => {
    // 성공 응답
    console.log('응답 받음:', response.status);
    return response;
  },
  async (error: AxiosError) => {
    // 에러 응답
    const originalRequest = error.config;
    
    // 401: 인증 만료 - 토큰 갱신
    if (error.response?.status === 401 && !originalRequest?.headers['X-Retry']) {
      console.log('토큰 갱신 시도...');
      
      // 토큰 갱신 요청
      // const newToken = await refreshAccessToken();
      // localStorage.setItem('accessToken', newToken);
      
      // 원래 요청 재시도
      if (originalRequest) {
        originalRequest.headers['X-Retry'] = 'true';
        // originalRequest.headers.Authorization = \`Bearer \${newToken}\`;
        // return apiClient(originalRequest);
      }
    }
    
    // 500: 서버 에러
    if (error.response?.status === 500) {
      console.error('서버 에러 발생');
      // toast.error('서버 오류가 발생했습니다');
    }
    
    return Promise.reject(error);
  }
);

// 3. 인터셉터 제거 (메모리 누수 방지)
// const interceptorId = apiClient.interceptors.request.use(...);
// apiClient.interceptors.request.eject(interceptorId);

// 4. 특정 인스턴스에만 인터셉터 적용
const authClient = axios.create();
authClient.interceptors.request.use((config) => {
  config.headers.Authorization = \`Bearer \${localStorage.getItem('token')}\`;
  return config;
});

console.log('인터셉터 예시 완료');`}
        />

        <InfoCard type="warning" title="인터셉터 주의사항">
          <ul>
            <li>
              <strong>에러 처리:</strong> 인터셉터에서 에러를 캐치하면 <code>catch</code> 로 전파 안 됨
            </li>
            <li>
              <strong>무한 루프:</strong> 토큰 갱신 시 재시도 로직 주의
            </li>
            <li>
              <strong>메모리 누수:</strong> 컴포넌트 언마운트 시 <code>eject</code> 고려
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="error-handling">5️⃣ 에러 처리</h2>
        <p>
          Axios 의 에러 처리 패턴을 알아봅니다.
        </p>

        <CodeDemo
          title="Axios 에러 처리"
          description="상세한 에러 정보와 처리"
          defaultCode={`import axios, { AxiosError, AxiosResponse } from 'axios';

async function fetchWithDetailedError() {
  try {
    const response = await axios.get('/api/posts/1');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios 에러
      const axiosError = error as AxiosError;
      
      console.log('에러 메시지:', axiosError.message);
      console.log('코드:', axiosError.code);
      
      // 응답이 있는 경우 (서버 응답)
      if (axiosError.response) {
        const { status, data } = axiosError.response;
        console.log('상태 코드:', status);
        console.log('응답 데이터:', data);
        
        // 상태 코드별 처리
        switch (status) {
          case 400:
            console.error('잘못된 요청');
            break;
          case 401:
            console.error('인증 필요');
            // 로그인 페이지로 리다이렉트
            break;
          case 403:
            console.error('권한 없음');
            break;
          case 404:
            console.error('리소스를 찾을 수 없음');
            break;
          case 500:
            console.error('서버 오류');
            break;
          default:
            console.error(\`HTTP 에러: \${status}\`);
        }
      } 
      // 요청은 보내졌으나 응답 없음
      else if (axiosError.request) {
        console.error('응답 없음 (네트워크 오류)');
      } 
      // 요청 설정 중 에러
      else {
        console.error('요청 설정 에러:', axiosError.message);
      }
    } else {
      // Axios 에러 아님
      console.error('알 수 없는 에러:', error);
    }
    
    throw error;  // 상위로 전파
  }
}

// 2. 타입 안전한 에러 처리
type APIError = {
  code: string;
  message: string;
  details?: Record<string, string>;
};

async function fetchWithTypedError() {
  try {
    const response = await axios.get('/api/posts/1');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data as APIError | undefined;
      
      if (errorData) {
        console.error(\`API 에러 [\${errorData.code}]: \${errorData.message}\`);
        
        // 필드별 에러 표시
        if (errorData.details) {
          Object.entries(errorData.details).forEach(([field, message]) => {
            console.error(\`\${field}: \${message}\`);
          });
        }
      }
    }
    throw error;
  }
}

// 3. 전역 에러 핸들러
function setupGlobalErrorHandler() {
  axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // 전역 에러 처리 (토스트, 로그 등)
      console.error('전역 에러:', error.message);
      // toast.error(error.message);
      return Promise.reject(error);
    }
  );
}

console.log('에러 처리 예시 완료');`}
        />

        <InfoCard type="tip" title="에러 처리 모범 사례">
          <ul>
            <li>
              <strong>타입 가드:</strong> <code>axios.isAxiosError()</code> 사용
            </li>
            <li>
              <strong>상태 코드별 처리:</strong> 401, 403, 404, 500 등
            </li>
            <li>
              <strong>사용자 피드백:</strong> 토스트, 알림으로 에러 표시
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="concurrent">6️⃣ 병렬 요청과 취소</h2>
        <p>
          여러 요청을 병렬로 처리하고, 필요 시 취소할 수 있습니다.
        </p>

        <CodeDemo
          title="병렬 요청과 취소"
          description="Promise.all 과 AbortController"
          defaultCode={`import axios, { CancelTokenSource } from 'axios';

// 1. 병렬 요청 (Promise.all)
async function fetchMultiplePosts() {
  try {
    const [post1, post2, post3] = await Promise.all([
      axios.get('/api/posts/1'),
      axios.get('/api/posts/2'),
      axios.get('/api/posts/3'),
    ]);
    
    console.log('포스트 1:', post1.data);
    console.log('포스트 2:', post2.data);
    console.log('포스트 3:', post3.data);
  } catch (error) {
    // 하나라도 실패하면 전체 실패
    console.error('병렬 요청 실패:', error);
  }
}

// 2. 모두 완료 대기 (Promise.allSettled)
async function fetchAllSettled() {
  const results = await Promise.allSettled([
    axios.get('/api/posts/1'),
    axios.get('/api/posts/2'),
    axios.get('/api/posts/invalid'),  // 404
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(\`요청 \${index} 성공:\`, result.value.data);
    } else {
      console.error(\`요청 \${index} 실패:\`, result.reason.message);
    }
  });
}

// 3. 요청 취소 (CancelToken - 레거시)
function fetchWithCancelToken() {
  const cancelTokenSource: CancelTokenSource = axios.CancelToken.source();
  
  const promise = axios.get('/api/posts', {
    cancelToken: cancelTokenSource.token,
  });
  
  // 취소 필요 시
  // cancelTokenSource.cancel('사용자에 의한 취소');
  
  return promise;
}

// 4. 요청 취소 (AbortController - 권장)
function fetchWithAbortController() {
  const controller = new AbortController();
  
  const promise = axios.get('/api/posts', {
    signal: controller.signal,
  });
  
  // 취소 필요 시
  // controller.abort();
  
  return promise;
}

// 5. 컴포넌트에서 취소 (React)
function PostList() {
  const [posts, setPosts] = React.useState([]);
  
  React.useEffect(() => {
    const controller = new AbortController();
    
    async function fetchPosts() {
      try {
        const response = await axios.get('/api/posts', {
          signal: controller.signal,
        });
        setPosts(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('요청 취소됨:', error.message);
        } else {
          console.error('에러:', error);
        }
      }
    }
    
    fetchPosts();
    
    // 클린업: 컴포넌트 언마운트 시 취소
    return () => {
      controller.abort();
    };
  }, []);
  
  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

console.log('병렬/취소 예시 완료');`}
        />

        <InfoCard type="tip" title="요청 취소 사용 사례">
          <ul>
            <li>
              <strong>컴포넌트 언마운트:</strong> 불필요한 요청 취소
            </li>
            <li>
              <strong>연속 입력:</strong> 이전 요청 취소 (디바운싱)
            </li>
            <li>
              <strong>사용자 취소:</strong> "취소" 버튼으로 긴 작업 중단
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="react-query">7️⃣ TanStack Query 와 함께</h2>
        <p>
          Axios 를 TanStack Query 와 함께 사용하는 패턴입니다.
        </p>

        <CodeDemo
          title="Axios + TanStack Query"
          description="서버 상태 관리"
          defaultCode={`import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
});

// 1. Query Key 팩토리
const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: Record<string, string>) => [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
};

// 2. useQuery 와 함께
function usePosts(filters: Record<string, string>) {
  return useQuery({
    queryKey: postKeys.list(filters),
    queryFn: async () => {
      const response = await apiClient.get('/posts', { params: filters });
      return response.data;
    },
  });
}

function usePost(id: number) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get(\`/posts/\${id}\`);
      return response.data;
    },
    enabled: !!id,  // id 가 있을 때만 실행
  });
}

// 3. useMutation 과 함께
function useCreatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { title: string; body: string }) => {
      const response = await apiClient.post('/posts', data);
      return response.data;
    },
    onSuccess: () => {
      // 캐시 무효화 (새로고침)
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

function useUpdatePost(id: number) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { title?: string; body?: string }) => {
      const response = await apiClient.put(\`/posts/\${id}\`, data);
      return response.data;
    },
    onSuccess: () => {
      // 특정 쿼리만 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

// 4. 컴포넌트에서 사용
function PostListPage() {
  const { data, isLoading, error } = usePosts({ page: '1', limit: '10' });
  
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {(error as AxiosError).message}</div>;
  
  return (
    <ul>
      {data.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

console.log('TanStack Query 예시 완료');`}
        />

        <InfoCard type="tip" title="Axios + TanStack Query">
          <ul>
            <li>
              <strong>Axios:</strong> HTTP 클라이언트 (요청/응답 처리)
            </li>
            <li>
              <strong>TanStack Query:</strong> 서버 상태 관리 (캐싱, 재요청, 동기화)
            </li>
            <li>
              <strong>함께 사용:</strong> 최고의 조합 (권장)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Axios:</strong> Promise 기반 HTTP 클라이언트
          </li>
          <li>
            <strong>장점:</strong> 자동 JSON, 인터셉터, 에러 처리, 구형 브라우저 지원
          </li>
          <li>
            <strong>인스턴스:</strong> 공통 설정 재사용
          </li>
          <li>
            <strong>인터셉터:</strong> 요청/응답 전처리 (토큰, 에러)
          </li>
          <li>
            <strong>에러 처리:</strong> <code>axios.isAxiosError()</code> 타입 가드
          </li>
          <li>
            <strong>취소:</strong> AbortController 로 요청 취소
          </li>
          <li>
            <strong>TanStack Query:</strong> 서버 상태 관리와 함께 사용 권장
          </li>
        </ul>
      </section>
    </div>
  );
}