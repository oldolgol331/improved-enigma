import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactTesting() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>React Testing</h1>
        <p className="page-description">
          React Testing Library 와 Vitest 로 컴포넌트를 테스트합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>React Testing Library</strong> 는 사용자 관점에서 컴포넌트를 테스트합니다.
          구현 세부사항이 아닌 실제 사용자의 상호작용을 검증합니다.
        </p>

        <InfoCard type="tip" title="테스트 원칙">
          <ul>
            <li>
              <strong>사용자 관점:</strong> 실제 사용자가 보는 대로 테스트
            </li>
            <li>
              <strong>구현 세부사항 금지:</strong> 내부 상태보다 결과 검증
            </li>
            <li>
              <strong>접근성:</strong> role, label 기반 쿼리 사용
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="setup">1️⃣ 테스트 설정</h2>
        <p>
          Vitest 와 React Testing Library 를 설정합니다.
        </p>

        <CodeDemo
          title="테스트 설정"
          description="Vitest, React Testing Library"
          defaultCode={`// ============================================
// 1. 설치
// ============================================
// npm install -D vitest @testing-library/react 
//   @testing-library/jest-dom @testing-library/user-event
//   happy-dom

// ============================================
// 2. Vitest 설정 (vitest.config.ts)
// ============================================
/*
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/tests/setup.ts'],
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
});
*/

// ============================================
// 3. 테스트 설정 파일 (src/tests/setup.ts)
// ============================================
/*
import '@testing-library/jest-dom';
*/

// ============================================
// 4. 테스트 유틸리티 (src/tests/utils.tsx)
// ============================================
/*
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export const customRender = (ui, options) =>
  render(ui, { wrapper: createWrapper(), ...options });

export * from '@testing-library/react';
*/

// ============================================
// 5. 테스트 예시 구조
// ============================================
/*
// src/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('렌더링 확인', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByText('클릭')).toBeInTheDocument();
  });
  
  it('클릭 이벤트', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>클릭</Button>);
    
    fireEvent.click(screen.getByText('클릭'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
*/

console.log('테스트 설정 완료');`}
        />

        <InfoCard type="tip" title="테스트 파일 규칙">
          <ul>
            <li>
              <strong>위치:</strong> 테스트할 파일과 같은 디렉토리
            </li>
            <li>
              <strong>이름:</strong> <code>.test.tsx</code> 또는 <code>.spec.tsx</code>
            </li>
            <li>
              <strong>구조:</strong> describe → it/expect
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="queries">2️⃣ 쿼리 (Queries)</h2>
        <p>
          요소를 찾는 다양한 방법입니다.
        </p>

        <CodeDemo
          title="쿼리 (Queries)"
          description="getBy, queryBy, findBy"
          defaultCode={`import { render, screen } from '@testing-library/react';

// ============================================
// 1. 쿼리 우선순위 (접근성 기준)
// ============================================
/*
1. getByRole         - role 기반 (권장)
2. getByLabelText    - label 기반
3. getByPlaceholder  - placeholder 기반
4. getByText         - 텍스트 기반
5. getByTestId       - data-testid 기반 (최후의 수단)
*/

// ============================================
// 2. getByRole (권장)
// ============================================
render(
  <div>
    <button>클릭</button>
    <a href="/link">링크</a>
    <input type="text" aria-label="이름" />
    <h1>제목</h1>
  </div>
);

screen.getByRole('button', { name: '클릭' });
screen.getByRole('link', { name: '링크' });
screen.getByRole('textbox', { name: '이름' });
screen.getByRole('heading', { level: 1 });

// ============================================
// 3. getByLabelText
// ============================================
render(
  <div>
    <label for="email">이메일</label>
    <input id="email" type="email" />
  </div>
);

screen.getByLabelText('이메일');

// ============================================
// 4. getByPlaceholderText
// ============================================
render(<input placeholder="이름을 입력하세요" />);

screen.getByPlaceholderText('이름을 입력하세요');

// ============================================
// 5. getByText
// ============================================
render(<div>안녕하세요</div>);

screen.getByText('안녕하세요');

// 정규식 사용
screen.getByText(/^안녕/);

// ============================================
// 6. getByTestId (최후의 수단)
// ============================================
render(<div data-testid="custom-element">내용</div>);

screen.getByTestId('custom-element');

// ============================================
// 7. 쿼리 변형
// ============================================
// getBy - 요소 없으면 에러
screen.getByText('없음');  // 에러 발생

// queryBy - 요소 없으면 null
screen.queryByText('없음');  // null 반환

// findBy - 요소 찾을 때까지 대기 (비동기)
await screen.findByText('로딩 완료');

// getAllBy - 여러 요소
const items = screen.getAllByRole('listitem');

// queryAllBy - 여러 요소 (없으면 빈 배열)
const items = screen.queryAllByRole('listitem');

// findAllBy - 여러 요소 대기 (비동기)
const items = await screen.findAllByRole('listitem');

// ============================================
// 8. within 으로 범위 제한
// ============================================
import { within } from '@testing-library/react';

const nav = screen.getByRole('navigation');
const links = within(nav).getAllByRole('link');

// ============================================
// 9. ignores 옵션
// ============================================
// 숨김 요소도 포함
screen.getByText('내용', { hidden: true });

// 정규식 옵션
screen.getByText(/hello/i);  // 대소문자 무시`}
        />

        <InfoCard type="warning" title="쿼리 선택 가이드">
          <ol>
            <li>
              <strong>getByRole:</strong> 가능한 경우 항상 사용
            </li>
            <li>
              <strong>getByLabelText:</strong> 폼 입력
            </li>
            <li>
              <strong>getByText:</strong> 일반 텍스트
            </li>
            <li>
              <strong>getByTestId:</strong> 다른 방법이 없을 때만
            </li>
          </ol>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="events">3️⃣ 이벤트 테스트</h2>
        <p>
          사용자 상호작용을 테스트합니다.
        </p>

        <CodeDemo
          title="이벤트 테스트"
          description="fireEvent, user-event"
          defaultCode={`import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ============================================
// 1. fireEvent (기본)
// ============================================
const handleClick = vi.fn();
render(<button onClick={handleClick}>클릭</button>);

fireEvent.click(screen.getByText('클릭'));
expect(handleClick).toHaveBeenCalledTimes(1);

// ============================================
// 2. user-event (권장 - 더 현실적)
// ============================================
const user = userEvent.setup();

await user.click(screen.getByText('클릭'));
await user.hover(screen.getByText('호버'));
await user.type(screen.getByRole('textbox'), '입력');

// ============================================
// 3. 폼 입력 테스트
// ============================================
const handleSubmit = vi.fn();

render(
  <form onSubmit={handleSubmit}>
    <input type="text" name="username" />
    <input type="email" name="email" />
    <button type="submit">제출</button>
  </form>
);

await user.type(screen.getByRole('textbox', { name: /username/i }), 'alice');
await user.type(screen.getByRole('textbox', { name: /email/i }), 'alice@example.com');
await user.click(screen.getByRole('button', { name: /제출/i }));

expect(handleSubmit).toHaveBeenCalled();

// ============================================
// 4. 키보드 이벤트
// ============================================
const handleKeyDown = vi.fn();
render(<input onKeyDown={handleKeyDown} />);

await user.keyboard('Enter');
await user.keyboard('{Enter}');
await user.keyboard('{ArrowDown}');

// ============================================
// 5. 드래그 앤 드롭
// ============================================
await user.pointer([
  { keys: '[MouseLeft>]', target: screen.getByText('드래그') },
  { target: screen.getByText('드롭') },
  { keys: '[/MouseLeft]' },
]);

// ============================================
// 6. 선택 테스트
// ============================================
render(
  <select>
    <option value="1">옵션 1</option>
    <option value="2">옵션 2</option>
  </select>
);

await user.selectOptions(screen.getByRole('combobox'), '2');

// ============================================
// 7. 체크박스/라디오
// ============================================
render(
  <div>
    <input type="checkbox" name="agree" />
    <input type="radio" name="gender" value="male" />
  </div>
);

await user.click(screen.getByRole('checkbox'));
await user.click(screen.getByRole('radio', { name: /male/i }));

expect(screen.getByRole('checkbox')).toBeChecked();

// ============================================
// 8. 호버/포커스
// ============================================
const element = screen.getByText('호버');

await user.hover(element);
expect(element).toHaveClass('hovered');

await user.unhover(element);
expect(element).not.toHaveClass('hovered');

await user.tab(element);
expect(element).toHaveFocus();`}
        />

        <InfoCard type="tip" title="fireEvent vs user-event">
          <ul>
            <li>
              <strong>fireEvent:</strong> 저수준 이벤트 직접 발생
            </li>
            <li>
              <strong>user-event:</strong> 실제 사용자 행동 시뮬레이션 (권장)
            </li>
            <li>
              <strong>user-event:</strong> focus, blur, delay 자동 처리
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="async">4️⃣ 비동기 테스트</h2>
        <p>
          비동기 작업을 테스트합니다.
        </p>

        <CodeDemo
          title="비동기 테스트"
          description="waitFor, findBy, MSW"
          defaultCode={`import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

// ============================================
// 1. findBy 사용 (권장)
// ============================================
render(<AsyncComponent />);

// 요소가 나타날 때까지 대기
const content = await screen.findByText('로딩 완료');

// ============================================
// 2. waitFor 사용
// ============================================
render(<AsyncComponent />);

await waitFor(() => {
  expect(screen.getByText('완료')).toBeInTheDocument();
}, {
  timeout: 3000,
  interval: 100,
});

// ============================================
// 3. waitForElementToBeRemoved
// ============================================
render(<LoadingComponent />);

// 로딩 스피너가 사라질 때까지 대기
await waitForElementToBeRemoved(() => screen.getByText('로딩 중...'));

// ============================================
// 4. MSW 로 API 목킹
// ============================================
const server = setupServer(
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ============================================
// 5. MSW 에러 처리
// ============================================
http.get('/api/users', () => {
  return new HttpResponse(null, { status: 500 });
});

// ============================================
// 6. 전체 예시
// ============================================
describe('UserList', () => {
  it('사용자 목록 로드', async () => {
    render(<UserList />);
    
    // 로딩 상태 확인
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
    
    // 데이터 로드 후 확인
    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(2);
    
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
  
  it('에러 처리', async () => {
    server.use(
      http.get('/api/users', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    
    render(<UserList />);
    
    const error = await screen.findByText(/에러/i);
    expect(error).toBeInTheDocument();
  });
});

// ============================================
// 7. Mock 함수 사용
// ============================================
const mockFetch = vi.fn().mockResolvedValue({
  json: () => Promise.resolve({ data: [] }),
});

global.fetch = mockFetch;

render(<DataComponent />);

await waitFor(() => {
  expect(mockFetch).toHaveBeenCalledWith('/api/data');
});`}
        />

        <InfoCard type="tip" title="비동기 테스트 팁">
          <ul>
            <li>
              <strong>findBy:</strong> 가장 간단하고 권장
            </li>
            <li>
              <strong>waitFor:</strong> 복잡한 조건 확인
            </li>
            <li>
              <strong>MSW:</strong> 실제 API 와 유사한 목킹
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>React Testing Library:</strong> 사용자 관점 테스트
          </li>
          <li>
            <strong>Queries:</strong> <code>getByRole</code> 권장
          </li>
          <li>
            <strong>Events:</strong> <code>user-event</code> 사용
          </li>
          <li>
            <strong>Async:</strong> <code>findBy</code>, <code>waitFor</code>
          </li>
          <li>
            <strong>MSW:</strong> API 목킹
          </li>
          <li>
            <strong>Vitest:</strong> 빠른 테스트 러너
          </li>
        </ul>
      </section>
    </div>
  );
}