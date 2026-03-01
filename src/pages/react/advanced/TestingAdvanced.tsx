import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TestingAdvanced() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Testing 심화: Vitest 와 E2E</h1>
        <p className="page-description">
          Vitest 고급 기능과 Playwright 를 사용한 E2E 테스트를 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="vitest-advanced">1️⃣ Vitest 고급 기능</h2>
        <p>
          Vitest 의 고급 테스트 기능을 활용합니다.
        </p>

        <CodeDemo
          title="Vitest Advanced"
          description="Mocking, Spy, Fixture, Parameterized Tests"
          defaultCode={`import { 
  describe, it, expect, vi, 
  beforeEach, afterEach 
} from 'vitest';

// ============================================
// 1. Mocking (모의 객체)
// ============================================

// 함수 Mock
const mockFn = vi.fn();
mockFn('hello');
mockFn('world');

expect(mockFn).toHaveBeenCalledTimes(2);
expect(mockFn).toHaveBeenCalledWith('hello');

// 모듈 Mock
vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: { id: 1 } }))
  }
}));

// ============================================
// 2. Spy (스파이)
// ============================================
const obj = {
  greet(name: string) {
    return \`Hello, \${name}!\`;
  }
};

const spy = vi.spyOn(obj, 'greet');
obj.greet('Alice');

expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledWith('Alice');

spy.mockRestore();  // 원본 함수 복구

// ============================================
// 3. Timer Mock (가상 시간)
// ============================================
vi.useFakeTimers();

const callback = vi.fn();
setInterval(callback, 1000);

vi.advanceTimersByTime(3000);
expect(callback).toHaveBeenCalledTimes(3);

vi.useRealTimers();  // 실제 시간 복구

// ============================================
// 4. Fixture (테스트 준비)
// ============================================
describe('UserService', () => {
  let userService: UserService;
  let mockDb: MockDatabase;
  
  beforeEach(() => {
    // 각 테스트 전 준비
    mockDb = new MockDatabase();
    userService = new UserService(mockDb);
  });
  
  afterEach(() => {
    // 각 테스트 후 정리
    mockDb.clear();
  });
  
  it('should create user', () => {
    const user = userService.create('Alice');
    expect(user.name).toBe('Alice');
  });
  
  it('should delete user', () => {
    const user = userService.create('Bob');
    userService.delete(user.id);
    expect(userService.findById(user.id)).toBeNull();
  });
});

// ============================================
// 5. Parameterized Tests
// ============================================
it.each([
  { input: 1, expected: 2 },
  { input: 2, expected: 4 },
  { input: 3, expected: 6 },
])('double(%p) = %p', ({ input, expected }) => {
  expect(double(input)).toBe(expected);
});

// ============================================
// 6. Async Testing
// ============================================
it('fetches data', async () => {
  const data = await fetchData();
  expect(data).toHaveProperty('id');
});

it('throws error', async () => {
  await expect(asyncFunction()).rejects.toThrow('Error');
});

// ============================================
// 7. Snapshot Testing
// ============================================
it('renders correctly', () => {
  const component = render(<MyComponent />);
  expect(component).toMatchSnapshot();
});

console.log('Vitest Advanced 완료');`}
        />

        <InfoCard type="tip" title="Vitest 고급 기능">
          <ul>
            <li>
              <strong>Mocking:</strong> vi.fn(), vi.mock()
            </li>
            <li>
              <strong>Spy:</strong> vi.spyOn(), mockRestore()
            </li>
            <li>
              <strong>Timer:</strong> useFakeTimers(), advanceTimersByTime()
            </li>
            <li>
              <strong>Fixture:</strong> beforeEach, afterEach
            </li>
            <li>
              <strong>Snapshot:</strong> toMatchSnapshot()
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="component-testing">2️⃣ 컴포넌트 테스트</h2>
        <p>
          React Testing Library 를 사용한 컴포넌트 테스트입니다.
        </p>

        <CodeDemo
          title="컴포넌트 테스트"
          description="RTL, user-event, Query"
          defaultCode={`import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

// ============================================
// 1. 기본 렌더링 테스트
// ============================================
describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('handles click', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// ============================================
// 2. Query 방법
// ============================================
// getBy: 요소 찾기 (없으면 에러)
const element = screen.getByRole('button');
const element = screen.getByText('Submit');
const element = screen.getByTestId('my-element');

// queryBy: 요소 찾기 (없으면 null)
const element = screen.queryByRole('button');

// findBy: 비동기 요소 찾기
const element = await screen.findByText('Loaded');

// getAllBy: 여러 요소 찾기
const elements = screen.getAllByRole('listitem');

// ============================================
// 3. Form 테스트
// ============================================
describe('LoginForm', () => {
  it('submits form', async () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    await userEvent.type(
      screen.getByLabelText('Email'),
      'test@example.com'
    );
    
    await userEvent.type(
      screen.getByLabelText('Password'),
      'password123'
    );
    
    await userEvent.click(screen.getByRole('button'));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
});

// ============================================
// 4. 비동기 컴포넌트
// ============================================
it('loads data', async () => {
  render(<DataFetcher />);
  
  // 로딩 상태 확인
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // 데이터 로드 후 확인
  const data = await screen.findByText('Data loaded');
  expect(data).toBeInTheDocument();
});

// ============================================
// 5. Custom Render
// ============================================
function renderWithProviders(ui: ReactElement) {
  return render(
    <Providers>
      {ui}
    </Providers>
  );
}

// 사용
renderWithProviders(<MyComponent />);

console.log('컴포넌트 테스트 완료');`}
        />

        <InfoCard type="tip" title="Testing Library 원칙">
          <ul>
            <li>
              <strong>사용자 관점:</strong> 구현細節 아닌 사용자 행동 테스트
            </li>
            <li>
              <strong>Query 우선순위:</strong> getByRole &gt; getByText &gt; getByTestId
            </li>
            <li>
              <strong>user-event:</strong> fireEvent 보다 실제 사용자 행동
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="e2e-testing">3️⃣ E2E 테스트 (Playwright)</h2>
        <p>
          Playwright 를 사용한 엔드투엔드 테스트입니다.
        </p>

        <CodeDemo
          title="E2E Testing"
          description="Playwright 기본, 셀렉터, 어설션"
          defaultCode={`import { test, expect } from '@playwright/test';

// ============================================
// 1. 기본 테스트
// ============================================
test('homepage has title', async ({ page }) => {
  await page.goto('https://example.com');
  
  // 페이지 제목 확인
  await expect(page).toHaveTitle(/Example/);
  
  // 요소 확인
  await expect(page.locator('h1')).toBeVisible();
});

// ============================================
// 2. 클릭과 입력
// ============================================
test('login flow', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // 입력
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password');
  
  // 클릭
  await page.click('button[type="submit"]');
  
  // 네비게이션 대기
  await page.waitForURL('**/dashboard');
  
  // 로그인 확인
  await expect(page.locator('.user-name')).toHaveText('Test User');
});

// ============================================
// 3. 셀렉터
// ============================================
// CSS 셀렉터
await page.click('.button.primary');

// Text 셀렉터
await page.click('text=Submit');
await page.click('"Submit"');

// Role 셀렉터 (접근성)
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByLabelText('Email').fill('test@example.com');
await page.getByPlaceholder('Enter name').fill('Alice');

// Test ID (권장)
await page.getByTestId('submit-button').click();

// ============================================
// 4. 어설션
// ============================================
// 가시성
await expect(locator).toBeVisible();
await expect(locator).toBeHidden();

// 텍스트
await expect(locator).toHaveText('Hello');
await expect(locator).toContainText('Hello');

// 속성
await expect(locator).toHaveAttribute('type', 'submit');
await expect(locator).toHaveClass('active');

// 상태
await expect(locator).toBeEnabled();
await expect(locator).toBeDisabled();
await expect(locator).toBeChecked();

// ============================================
// 5. 대기
// ============================================
// 명시적 대기
await page.waitForTimeout(1000);  // 권장 안 함

// 요소 대기
await page.waitForSelector('.loaded');
await page.waitForLoadState('networkidle');

// 네비게이션 대기
await page.waitForURL('**/success');

// ============================================
// 6. 프레임/탭
// ============================================
// iframe
const frame = page.frameLocator('iframe');
await frame.locator('button').click();

// 새 탭
const [newPage] = await Promise.all([
  page.waitForEvent('popup'),
  page.click('a[target="_blank"]')
]);
await newPage.goto('https://example.com');

console.log('E2E 테스트 완료');`}
        />

        <InfoCard type="tip" title="Playwright 장점">
          <ul>
            <li>
              <strong>멀티 브라우저:</strong> Chromium, Firefox, WebKit
            </li>
            <li>
              <strong>자동 대기:</strong> 요소 준비될 때까지 대기
            </li>
            <li>
              <strong>디버깅:</strong> Playwright Inspector, trace viewer
            </li>
            <li>
              <strong>병렬:</strong> 자동 병렬 실행
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="e2e-patterns">4️⃣ E2E 패턴</h2>
        <p>
          실제 프로젝트에서 활용하는 E2E 패턴입니다.
        </p>

        <CodeDemo
          title="E2E 패턴"
          description="Page Object, Fixture, API Mocking"
          defaultCode={`import { test, expect } from '@playwright/test';

// ============================================
// 1. Page Object 패턴
// ============================================
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
  }
  
  async goto() {
    await this.page.goto('/login');
  }
  
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.userName = page.getByTestId('user-name');
  }
  
  async waitForLoad() {
    await this.userName.waitFor();
  }
}

// 테스트에서 사용
test('login and navigate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  
  await loginPage.goto();
  await loginPage.login('test@example.com', 'password');
  await dashboard.waitForLoad();
  
  await expect(dashboard.userName).toHaveText('Test User');
});

// ============================================
// 2. Fixture 사용
// ============================================
// test/fixtures/auth.ts
export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // 로그인 수행
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
    
    await use(page);
  }
});

// 테스트에서 사용
import { test } from '../fixtures/auth';

test('dashboard page', async ({ authenticatedPage }) => {
  // 이미 로그인된 상태
  await expect(authenticatedPage.locator('h1'))
    .toHaveText('Dashboard');
});

// ============================================
// 3. API Mocking
// ============================================
test('handles API error', async ({ page }) => {
  // API 응답 Mock
  await page.route('**/api/users', route => 
    route.fulfill({
      status: 500,
      body: JSON.stringify({ error: 'Server error' })
    })
  );
  
  await page.goto('/users');
  
  // 에러 메시지 확인
  await expect(page.getByText('Failed to load'))
    .toBeVisible();
});

// ============================================
// 4. 시각적 회귀 테스트
// ============================================
test('screenshot', async ({ page }) => {
  await page.goto('/dashboard');
  
  // 스크린샷 비교
  await expect(page).toHaveScreenshot('dashboard.png');
  
  // 요소 스크린샷
  await expect(page.locator('nav'))
    .toHaveScreenshot('navigation.png');
});

// ============================================
// 5. 병렬 실행
// ============================================
// playwright.config.ts
export default {
  workers: 4,  // 4 개 병렬
  fullyParallel: true,
  retries: 2,  // 실패 시 2 재시도
};

console.log('E2E 패턴 완료');`}
        />

        <InfoCard type="tip" title="E2E 모범 사례">
          <ul>
            <li>
              <strong>Page Object:</strong> 재사용 가능한 페이지 클래스
            </li>
            <li>
              <strong>Fixture:</strong> 공통 준비 코드
            </li>
            <li>
              <strong>API Mock:</strong> 외부 의존성 제거
            </li>
            <li>
              <strong>접근성:</strong> role 기반 셀렉터
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="ci-cd">5️⃣ CI/CD 통합</h2>
        <p>
          GitHub Actions 에서 테스트 자동화입니다.
        </p>

        <CodeDemo
          title="CI/CD 통합"
          description="GitHub Actions 워크플로우"
          defaultCode={`# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # ============================================
  # 1. 단위 테스트
  # ============================================
  unit-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run type check
        run: npm run typecheck
      
      - name: Run linter
        run: npm run lint
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  # ============================================
  # 2. E2E 테스트
  # ============================================
  e2e-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Build app
        run: npm run build
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/

  # ============================================
  # 3. 빌드 및 배포
  # ============================================
  deploy:
    needs: [unit-test, e2e-test]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}

console.log('CI/CD 완료');`}
        />

        <InfoCard type="tip" title="CI/CD 체크리스트">
          <ul>
            <li>
              <strong>타입 체크:</strong> tsc --noEmit
            </li>
            <li>
              <strong>린트:</strong> eslint, prettier
            </li>
            <li>
              <strong>단위 테스트:</strong> vitest --coverage
            </li>
            <li>
              <strong>E2E 테스트:</strong> playwright test
            </li>
            <li>
              <strong>빌드:</strong> npm run build
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Vitest:</strong> Mocking, Spy, Timer, Snapshot
          </li>
          <li>
            <strong>RTL:</strong> 사용자 관점 컴포넌트 테스트
          </li>
          <li>
            <strong>Playwright:</strong> E2E 테스트, 멀티 브라우저
          </li>
          <li>
            <strong>Page Object:</strong> 재사용 가능한 테스트 코드
          </li>
          <li>
            <strong>CI/CD:</strong> GitHub Actions 자동화
          </li>
        </ul>
      </section>
    </div>
  );
}
