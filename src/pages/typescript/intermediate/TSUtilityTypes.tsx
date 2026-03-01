import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TSUtilityTypes() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>TypeScript 유틸리티 타입 (Utility Types)</h1>
        <p className="page-description">
          TypeScript 가 제공하는 내장 유틸리티 타입으로 타입 변환을 자유자재로 다룹니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>유틸리티 타입 (Utility Types)</strong> 은 기존 타입을 변형하여 새로운 타입을 만들
          수 있게 해주는 TypeScript 의 내장 제네릭 타입입니다. 자주 사용되는 패턴들을 미리 정의해
          두어 일관되고 안전한 타입 정의를 가능하게 합니다.
        </p>

        <InfoCard type="tip" title="유틸리티 타입의 장점">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>재사용성</strong>: 동일한 변형 로직을 재사용
            </li>
            <li>
              <strong>일관성</strong>: 프로젝트 전반에 걸친 일관된 타입 변환
            </li>
            <li>
              <strong>유지보수성</strong>: 타입 정의 중복 제거
            </li>
            <li>
              <strong>타입 안전성</strong>: 컴파일 타임 체크 유지
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="partial">1️⃣ Partial&lt;T&gt; - 모든 속성을 선택적으로</h2>
        <p>
          타입 <code>T</code> 의 <strong>모든 속성을 선택적 (optional)</strong>으로 변환합니다.
        </p>

        <CodeDemo
          title="Partial 사용법"
          description="모든 속성이 선택적으로 변환되는 것을 확인하세요."
          defaultCode={`// 기본 타입
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial 적용 - 모든 속성이 선택적
type PartialUser = Partial<User>;

// 모두 OK
const user1: PartialUser = {};
const user2: PartialUser = { id: 1 };
const user3: PartialUser = { name: 'Alice', email: 'alice@example.com' };
const user4: PartialUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 25
};

// 실전 예시: 업데이트 DTO
function updateUser(id: number, updates: Partial<User>) {
  console.log(\`Updating user \${id} with:\`, updates);
}

updateUser(1, { name: 'Bob' });
updateUser(2, { age: 30, email: 'new@example.com' });

console.log('user1:', user1);
console.log('user3:', user3);`}
          editable={true}
        />

        <InfoCard type="note" title="Partial 구현 (참고)">
          <pre style={{ margin: 0, fontSize: '0.8rem' }}>
            {`type Partial<T> = {
  [P in keyof T]?: T[P];
};`}
          </pre>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="required">2️⃣ Required&lt;T&gt; - 모든 속성을 필수로</h2>
        <p>
          <code>Partial</code> 과 반대로, 타입 <code>T</code> 의{' '}
          <strong>모든 속성을 필수 (required)</strong>로 변환합니다.
        </p>

        <CodeDemo
          title="Required 사용법"
          description="선택적 속성이 모두 필수로 변환됩니다."
          defaultCode={`// 선택적 속성이 있는 타입
interface Settings {
  theme?: 'light' | 'dark';
  notifications?: boolean;
  language: string;
}

// Required 적용 - 모든 속성이 필수
type RequiredSettings = Required<Settings>;

// 모두 필수이므로 아래 코드는 에러
// const settings1: RequiredSettings = {}; // 에러!
// const settings2: RequiredSettings = { theme: 'dark' }; // 에러!

const settings3: RequiredSettings = {
  theme: 'dark',
  notifications: true,
  language: 'ko'
}; // OK

console.log('Required settings:', settings3);

// 실전 예시: 기본값 병합
function applyDefaults(userSettings: Settings): RequiredSettings {
  const defaults: RequiredSettings = {
    theme: 'light',
    notifications: true,
    language: 'en'
  };
  
  return { ...defaults, ...userSettings };
}

const merged = applyDefaults({ theme: 'dark' });
console.log('Merged settings:', merged);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="readonly">3️⃣ Readonly&lt;T&gt; - 읽기 전용 속성으로</h2>
        <p>
          타입 <code>T</code> 의 <strong>모든 속성을 읽기 전용 (readonly)</strong>으로 변환합니다.
        </p>

        <CodeDemo
          title="Readonly 사용법"
          description="할당 후 수정할 수 없는 타입을 만듭니다."
          defaultCode={`interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

// Readonly 적용 - 할당 후 수정 불가
type ReadonlyConfig = Readonly<Config>;

const config: ReadonlyConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
};

// 수정 시도 - 에러!
// config.timeout = 10000;
// config.retries = 5;

console.log('Config (immutable):', config);

// 실전 예시: 상수 객체
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' };

function createReducer() {
  const initialState: Readonly<{ count: number }> = { count: 0 };
  
  return function reducer(state = initialState, action: Action) {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      case 'DECREMENT':
        return { ...state, count: state.count - 1 };
      default:
        return state;
    }
  };
}

const reducer = createReducer();
console.log('Initial state:', reducer());
console.log('After INCREMENT:', reducer(undefined, { type: 'INCREMENT' }));`}
          editable={true}
        />

        <InfoCard type="warning" title="얕은 읽기 전용 (Shallow Readonly)">
          <p>
            <code>Readonly</code> 는 <strong>1 단계 깊이</strong>만 읽기 전용입니다. 중첩 객체는
            수정 가능합니다. 깊은 읽기 전용이 필요하면 <code>ReadonlyDeep</code> 유틸리티를
            고려하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="record">4️⃣ Record&lt;K, T&gt; - 키 - 값 매핑</h2>
        <p>
          타입 <code>K</code> 를 키로, 타입 <code>T</code> 를 값으로 하는 객체 타입을 생성합니다.
        </p>

        <CodeDemo
          title="Record 사용법"
          description="동적 객체 맵을 타입 안전하게 정의합니다."
          defaultCode={`// 키와 값 타입 지정
type UserRole = 'admin' | 'user' | 'guest';
type Permission = 'read' | 'write' | 'delete';

// Role → Permission 매핑
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};

console.log('Role permissions:', rolePermissions);

// 실전 예시: ID → 객체 매핑
interface User {
  id: number;
  name: string;
}

const users: Record<number, User> = {
  1: { id: 1, name: 'Alice' },
  2: { id: 2, name: 'Bob' },
  3: { id: 3, name: 'Charlie' }
};

console.log('User 1:', users[1]);

// 실전 예시: 문자열 키 ENUM 스타일
type StatusCode = 'success' | 'error' | 'pending';
interface StatusInfo {
  label: string;
  color: string;
}

const statusMap: Record<StatusCode, StatusInfo> = {
  success: { label: '성공', color: 'green' },
  error: { label: '오류', color: 'red' },
  pending: { label: '대기 중', color: 'yellow' }
};

console.log('Success status:', statusMap.success);`}
          editable={true}
        />

        <InfoCard type="note" title="Record 구현 (참고)">
          <pre style={{ margin: 0, fontSize: '0.8rem' }}>
            {`type Record<K extends keyof any, T> = {
  [P in K]: T;
};`}
          </pre>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="pick-omit">5️⃣ Pick&lt;T, K&gt; & Omit&lt;T, K&gt;</h2>
        <p>
          <strong>Pick</strong> 은 타입 <code>T</code> 에서 키 <code>K</code> 에 해당하는 속성만
          선택하고,
          <strong>Omit</strong> 은 키 <code>K</code> 에 해당하는 속성을 제외합니다.
        </p>

        <CodeDemo
          title="Pick 과 Omit 사용법"
          description="타입에서 원하는 속성만 선택하거나 제외합니다."
          defaultCode={`interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Pick: 원하는 속성만 선택
type ProductSummary = Pick<Product, 'id' | 'name' | 'price'>;

const summary: ProductSummary = {
  id: 1,
  name: 'Laptop',
  price: 999.99
};

// Omit: 원하는 속성 제외
type ProductCreateInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

const newProduct: ProductCreateInput = {
  name: 'Smartphone',
  price: 599.99,
  description: 'Latest model'
};

// 실전 예시: API 응답 필터링
type ProductListResponse = Pick<Product, 'id' | 'name' | 'price'>[];

const products: ProductListResponse = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Smartphone', price: 599.99 }
];

console.log('Product summary:', summary);
console.log('New product:', newProduct);
console.log('Products list:', products);

// Pick + Omit 조합
type ProductUpdateInput = Omit<Partial<Product>, 'id' | 'createdAt' | 'updatedAt'>;

const updateData: ProductUpdateInput = {
  name: 'Updated Laptop',
  price: 899.99
};

console.log('Update data:', updateData);`}
          editable={true}
        />

        <InfoCard type="tip" title="Pick 과 Omit 관계">
          <p>
            <code>Omit&lt;T, K&gt;</code> 는 <code>Pick&lt;T, Exclude&lt;keyof T, K&gt;&gt;</code>{' '}
            와 동일합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="exclude-extract">6️⃣ Exclude&lt;T, U&gt; & Extract&lt;T, U&gt;</h2>
        <p>
          유니온 타입에서 <strong>Exclude</strong> 는 <code>U</code> 를 제외하고,
          <strong>Extract</strong> 는 <code>U</code> 만 추출합니다.
        </p>

        <CodeDemo
          title="Exclude 와 Extract"
          description="유니온 타입에서 특정 타입을 제외하거나 추출합니다."
          defaultCode={`type EventType = 'click' | 'scroll' | 'mousemove' | 'keydown';
type MouseEvent = 'click' | 'scroll' | 'mousemove';
type KeyboardEvent = 'keydown';

// Extract: MouseEvent 에 포함된 것만 추출
type MouseEventType = Extract<EventType, MouseEvent>;
// 결과: 'click' | 'scroll' | 'mousemove'

// Exclude: MouseEvent 를 제외한 것만 추출
type NonMouseEvent = Exclude<EventType, MouseEvent>;
// 결과: 'keydown'

console.log('Mouse events:', 'click' as MouseEventType);
console.log('Non-mouse events:', 'keydown' as NonMouseEvent);

// 실전 예시: 액션 타입 필터링
type Action = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; data: string }
  | { type: 'FETCH_ERROR'; error: string }
  | { type: 'RESET' };

type FetchAction = Extract<
  Action, 
  { type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' }
>;

type NonFetchAction = Exclude<
  Action, 
  { type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' }
>;

console.log('Fetch actions can be handled separately');
console.log('Non-fetch actions:', 'RESET' as NonFetchAction);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="return-type">7️⃣ ReturnType&lt;T&gt; & ParameterType&lt;T&gt;</h2>
        <p>
          함수 타입의 <strong>반환 타입</strong> 또는 <strong>파라미터 타입</strong>을 추출합니다.
        </p>

        <CodeDemo
          title="ReturnType 와 ParameterType"
          description="함수에서 반환 타입과 파라미터 타입을 추출합니다."
          defaultCode={`// 함수 타입 정의
function createUser(id: number, name: string) {
  return { id, name, createdAt: new Date() };
}

function getUser(id: number) {
  return { id, name: 'Alice', email: 'alice@example.com' };
}

// ReturnType: 함수 반환 타입 추출
type User = ReturnType<typeof createUser>;
type UserDetail = ReturnType<typeof getUser>;

const user: User = { 
  id: 1, 
  name: 'Bob', 
  createdAt: new Date() 
};

// 실전 예시: API 응답 타입
async function fetchUser(id: number) {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}

type UserResponse = Awaited<ReturnType<typeof fetchUser>>;

// Parameters: 함수 파라미터 타입 추출 (튜플)
type CreateUserParams = Parameters<typeof createUser>;
// [number, string]

type GetUserParams = Parameters<typeof getUser>;
// [number]

// 첫 번째 파라미터 타입만 추출
type UserIdParam = Parameters<typeof getUser>[0];
// number

console.log('User:', user);
console.log('CreateUserParams type:', ['id: number', 'name: string']);
console.log('GetUserParams type:', ['id: number']);`}
          editable={true}
        />

        <InfoCard type="tip" title="Awaited 유틸리티">
          <p>
            <code>Awaited&lt;T&gt;</code> 는 Promise 를 언랩핑합니다.
            <code>Awaited&lt;Promise&lt;string&gt;&gt;</code> → <code>string</code>
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="instance-type">8️⃣ InstanceType&lt;T&gt;</h2>
        <p>
          생성자 함수의 <strong>인스턴스 타입</strong>을 추출합니다.
        </p>

        <CodeDemo
          title="InstanceType 사용법"
          description="클래스 인스턴스 타입을 추출합니다."
          defaultCode={`// 클래스 정의
class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number
  ) {}
  
  getTotal(tax: number): number {
    return this.price * (1 + tax);
  }
}

class ShoppingCart {
  items: Product[] = [];
  
  add(product: Product) {
    this.items.push(product);
  }
  
  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

// InstanceType: 생성자 함수 → 인스턴스 타입
type ProductInstance = InstanceType<typeof Product>;
type CartInstance = InstanceType<typeof ShoppingCart>;

// 실제 인스턴스 생성
const laptop = new Product(1, 'Laptop', 999.99);
const cart = new ShoppingCart();

cart.add(laptop);

console.log('Product instance:', laptop);
console.log('Cart total:', cart.getTotal());
console.log('Cart items count:', cart.items.length);

// 실전 예시: 팩토리 패턴
type Constructor<T = any> = new (...args: any[]) => T;

function createInstance<T>(ctor: Constructor<T>, ...args: ConstructorParameters<typeof ctor>): T {
  return new ctor(...args);
}

const phone = createInstance(Product, 2, 'Phone', 599.99);
console.log('Phone instance:', phone);`}
          editable={true}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <table className="utility-table">
            <thead>
              <tr>
                <th>유틸리티</th>
                <th>기능</th>
                <th>예시</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>Partial&lt;T&gt;</code>
                </td>
                <td>모든 속성 선택적</td>
                <td>업데이트 DTO</td>
              </tr>
              <tr>
                <td>
                  <code>Required&lt;T&gt;</code>
                </td>
                <td>모든 속성 필수</td>
                <td>기본값 병합</td>
              </tr>
              <tr>
                <td>
                  <code>Readonly&lt;T&gt;</code>
                </td>
                <td>읽기 전용 속성</td>
                <td>상수 객체</td>
              </tr>
              <tr>
                <td>
                  <code>Record&lt;K, T&gt;</code>
                </td>
                <td>키 - 값 매핑</td>
                <td>동적 객체</td>
              </tr>
              <tr>
                <td>
                  <code>Pick&lt;T, K&gt;</code>
                </td>
                <td>속성 선택</td>
                <td>응답 필터링</td>
              </tr>
              <tr>
                <td>
                  <code>Omit&lt;T, K&gt;</code>
                </td>
                <td>속성 제외</td>
                <td>입력 DTO</td>
              </tr>
              <tr>
                <td>
                  <code>Exclude&lt;T, U&gt;</code>
                </td>
                <td>유니온 제외</td>
                <td>타입 필터링</td>
              </tr>
              <tr>
                <td>
                  <code>Extract&lt;T, U&gt;</code>
                </td>
                <td>유니온 추출</td>
                <td>타입 필터링</td>
              </tr>
              <tr>
                <td>
                  <code>ReturnType&lt;T&gt;</code>
                </td>
                <td>반환 타입 추출</td>
                <td>함수 응답</td>
              </tr>
              <tr>
                <td>
                  <code>InstanceType&lt;T&gt;</code>
                </td>
                <td>인스턴스 타입</td>
                <td>클래스 인스턴스</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-section">
        <h2 id="quiz">🎯 퀴즈</h2>
        <CodeDemo
          title="퀴즈: 유틸리티 타입 적용하기"
          description="각 상황에 맞는 유틸리티 타입을 작성해보세요."
          defaultCode={`interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

// 퀴즈 1: 게시글 작성 시 사용할 타입 (id, createdAt, updatedAt 제외)
type ArticleCreateInput = Omit<Article, 'id' | 'createdAt' | 'updatedAt'>;

// 퀴즈 2: 게시글 수정 시 사용할 타입 (모든 속성 선택적, id 제외)
type ArticleUpdateInput = Omit<Partial<Article>, 'id'>;

// 퀴즈 3: 게시글 목록 응답용 (id, title, author, published 만 포함)
type ArticleSummary = Pick<Article, 'id' | 'title' | 'author' | 'published'>;

// 퀴즈 4: 읽기 전용 설정 객체
interface Settings {
  theme: 'light' | 'dark';
  fontSize: number;
  notifications: boolean;
}
type ReadonlySettings = Readonly<Settings>;

// 퀴즈 5: 이벤트 타입에서 마우스 이벤트만 추출
type AllEvents = 'click' | 'scroll' | 'keydown' | 'mousemove';
type MouseEvents = 'click' | 'scroll' | 'mousemove';
type MouseEventType = Extract<AllEvents, MouseEvents>;

console.log('Quiz completed!');
console.log('Check each type definition above.');`}
          editable={true}
        />
      </section>

      <style>{`
        .utility-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }
        
        .utility-table th,
        .utility-table td {
          padding: 0.75rem;
          border: 1px solid var(--border-light);
          text-align: left;
        }
        
        .utility-table th {
          background: var(--bg-tertiary);
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .utility-table td {
          color: var(--text-secondary);
        }
        
        .utility-table code {
          background: var(--bg-code);
          color: var(--color-accent);
          padding: 0.2em 0.4em;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
        }
        
        .utility-table tr:hover {
          background: var(--bg-secondary);
        }
      `}</style>
    </div>
  );
}
