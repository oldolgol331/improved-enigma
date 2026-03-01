/**
 * 메뉴 설정
 * 사이드바, Breadcrumb, 라우트, HomePage 학습 경로에서 공통으로 사용하는 중앙 설정
 */

export interface MenuItem {
  title: string;
  path?: string;
  children?: MenuItem[];
  description?: string;
  tags?: string[];
}

export interface MenuCategory {
  title: string;
  icon: string;
  children: MenuSection[];
}

export interface MenuSection {
  title: string;
  level: 'basics' | 'intermediate' | 'advanced';
  children: MenuItem[];
}

/**
 * 전체 메뉴 데이터
 * 사이드바와 Breadcrumb 에서 사용
 */
export const menuData: MenuItem[] = [
  {
    title: '📚 HTML',
    children: [
      {
        title: '기초 (Basics)',
        children: [
          { title: 'HTML 기초', path: '/html/basics/intro' },
          { title: 'HTML 폼', path: '/html/basics/forms' },
        ],
      },
      {
        title: '중급 (Intermediate)',
        children: [
          { title: '접근성과 시맨틱', path: '/html/intermediate/accessibility' },
          { title: '시맨틱 구조', path: '/html/intermediate/semantic-structure' },
          { title: 'Meta 태그와 SEO', path: '/html/intermediate/meta-seo' },
        ],
      },
    ],
  },
  {
    title: '🎨 CSS',
    children: [
      {
        title: '기초 (Basics)',
        children: [{ title: 'CSS 기초', path: '/css/basics/intro' }],
      },
      {
        title: '중급 (Intermediate)',
        children: [
          { title: 'Flexbox & Grid', path: '/css/intermediate/flexbox-grid' },
          { title: '박스 모델과 레이아웃', path: '/css/intermediate/box-model' },
        ],
      },
      {
        title: '고급 (Advanced)',
        children: [
          { title: 'TailwindCSS', path: '/css/advanced/tailwind' },
          { title: 'CSS 애니메이션', path: '/css/advanced/animations' },
          { title: 'CSS 변수와 변환', path: '/css/advanced/transitions-transforms' },
        ],
      },
    ],
  },
  {
    title: '📚 JavaScript',
    children: [
      {
        title: '기초 (Basics)',
        children: [
          { title: '변수와 타입', path: '/javascript/basics/variables-types' },
          { title: '연산자', path: '/javascript/basics/operators' },
          { title: '조건문', path: '/javascript/basics/conditionals' },
          { title: '반복문', path: '/javascript/basics/loops' },
          { title: '배열', path: '/javascript/basics/arrays' },
          { title: '객체', path: '/javascript/basics/objects' },
          { title: '문자열', path: '/javascript/basics/strings' },
          { title: '숫자와 JSON', path: '/javascript/basics/numbers-json' },
        ],
      },
      {
        title: '중급 (Intermediate)',
        children: [
          { title: '함수', path: '/javascript/intermediate/functions' },
          { title: '스코프와 호이스팅', path: '/javascript/intermediate/scope-hoisting' },
          { title: '클로저', path: '/javascript/intermediate/closure' },
          { title: 'DOM 과 이벤트', path: '/javascript/intermediate/dom-events' },
          { title: 'this 키워드', path: '/javascript/intermediate/this-keyword' },
          { title: 'Call/Apply/Bind', path: '/javascript/intermediate/call-apply-bind' },
          { title: 'Debounce/Throttle', path: '/javascript/intermediate/debounce-throttle' },
        ],
      },
      {
        title: '고급 (Advanced)',
        children: [
          { title: '프로토타입', path: '/javascript/advanced/prototype' },
          { title: '클래스', path: '/javascript/advanced/class' },
          { title: 'Promise', path: '/javascript/advanced/promise' },
          { title: 'async/await', path: '/javascript/advanced/async-await' },
          { title: '이벤트 루프', path: '/javascript/advanced/event-loop' },
          { title: '모듈 시스템', path: '/javascript/advanced/modules' },
          { title: '에러 처리', path: '/javascript/advanced/error-handling' },
          { title: 'fetch API', path: '/javascript/advanced/fetch-api' },
          { title: '디자인 패턴', path: '/javascript/advanced/design-patterns' },
          { title: 'Map/Set/WeakMap', path: '/javascript/advanced/map-set' },
          { title: '현대 JavaScript', path: '/javascript/advanced/modern-features' },
        ],
      },
    ],
  },
  {
    title: '📘 TypeScript',
    children: [
      {
        title: '기초 (Basics)',
        children: [
          { title: '타입 시스템 소개', path: '/typescript/basics/intro' },
          { title: '기본 타입', path: '/typescript/basics/basic-types' },
          { title: '인터페이스', path: '/typescript/basics/interface' },
          { title: 'Type vs Interface', path: '/typescript/basics/type-vs-interface' },
          { title: 'Enums & Tuples', path: '/typescript/basics/enums-tuples' },
          { title: 'tsconfig 설정', path: '/typescript/basics/tsconfig' },
        ],
      },
      {
        title: '중급 (Intermediate)',
        children: [
          { title: '제네릭', path: '/typescript/intermediate/generics' },
          { title: '유틸리티 타입', path: '/typescript/intermediate/utility-types' },
          { title: 'Union & Intersection', path: '/typescript/intermediate/union-intersection' },
          { title: 'Type Narrowing', path: '/typescript/intermediate/type-narrowing' },
          { title: '고급 타입', path: '/typescript/intermediate/advanced-types' },
        ],
      },
      {
        title: '고급 (Advanced)',
        children: [
          { title: '고급 타입', path: '/typescript/advanced/advanced-types' },
          { title: '데코레이터', path: '/typescript/advanced/decorators' },
          { title: '마이그레이션 가이드', path: '/typescript/advanced/migration-guide' },
        ],
      },
    ],
  },
  {
    title: '⚛️ React',
    children: [
      {
        title: '기초 (Basics)',
        children: [
          { title: 'React 소개', path: '/react/basics/intro' },
          { title: '컴포넌트', path: '/react/basics/components' },
          { title: 'State', path: '/react/basics/state' },
          { title: 'Props 심화', path: '/react/basics/props-advanced' },
          { title: '이벤트 핸들링', path: '/react/basics/event-handling' },
          { title: 'Refs & Portals', path: '/react/basics/refs-portals' },
        ],
      },
      {
        title: '중급 (Intermediate)',
        children: [
          { title: 'useEffect', path: '/react/intermediate/use-effect' },
          { title: 'useContext & useReducer', path: '/react/intermediate/context-reducer' },
          { title: '성능 최적화', path: '/react/intermediate/performance-hooks' },
          { title: '폼 처리', path: '/react/intermediate/form-handling' },
          { title: 'Custom Hooks', path: '/react/intermediate/custom-hooks' },
        ],
      },
      {
        title: '고급 (Advanced)',
        children: [
          { title: '고급 Hooks', path: '/react/advanced/advanced-hooks' },
          { title: 'Zustand 상태관리', path: '/react/advanced/zustand' },
          { title: 'Axios HTTP 클라이언트', path: '/react/advanced/axios' },
          { title: 'React Router', path: '/react/advanced/react-router' },
          { title: 'React Testing', path: '/react/advanced/testing' },
        ],
      },
    ],
  },
  {
    title: '🟢 Node.js',
    children: [
      {
        title: '기초 (Basics)',
        children: [
          { title: 'Node.js 소개', path: '/nodejs/basics/intro' },
          { title: 'NPM 패키지 관리', path: '/nodejs/basics/npm' },
          { title: '모듈 시스템', path: '/nodejs/basics/modules' },
          { title: 'Path & FS', path: '/nodejs/basics/path-fs' },
        ],
      },
      {
        title: '중급 (Intermediate)',
        children: [
          { title: 'HTTP 서버', path: '/nodejs/intermediate/http-server' },
          { title: 'Express 심화', path: '/nodejs/intermediate/express-advanced' },
        ],
      },
      {
        title: '고급 (Advanced)',
        children: [
          { title: '데이터베이스', path: '/nodejs/advanced/database' },
          { title: '인증과 보안', path: '/nodejs/advanced/auth' },
          { title: '배포와 운영', path: '/nodejs/advanced/deployment' },
          { title: 'Streams & Workers', path: '/nodejs/advanced/streams-workers' },
          { title: '백엔드 심화', path: '/nodejs/advanced/backend' },
        ],
      },
    ],
  },
  {
    title: '🐍 Python',
    children: [
      {
        title: '기초 (Basics)',
        children: [
          { title: 'Python 기초', path: '/python/basics/intro' },
          { title: '자료구조', path: '/python/basics/data-structures' },
        ],
      },
      {
        title: '중급 (Intermediate)',
        children: [
          { title: '제어 흐름', path: '/python/intermediate/control-flow' },
          { title: '함수와 클래스', path: '/python/intermediate/functions-classes' },
          { title: '파일 I/O 와 모듈', path: '/python/intermediate/file-io' },
        ],
      },
      {
        title: '고급 (Advanced)',
        children: [{ title: '고급 주제', path: '/python/advanced/advanced-topics' }],
      },
    ],
  },
];

/**
 * 카테고리별 메뉴 데이터 (홈페이지 학습 경로용)
 */
export const learningPaths: MenuCategory[] = [
  {
    title: 'HTML',
    icon: '📝',
    children: [
      {
        title: '기초 (Basics)',
        level: 'basics',
        children: [
          { title: 'HTML 기초', path: '/html/basics/intro' },
          { title: 'HTML 폼', path: '/html/basics/forms' },
        ],
      },
      {
        title: '중급 (Intermediate)',
        level: 'intermediate',
        children: [
          { title: '접근성과 시맨틱', path: '/html/intermediate/accessibility' },
          { title: '시맨틱 구조', path: '/html/intermediate/semantic-structure' },
          { title: 'Meta 태그와 SEO', path: '/html/intermediate/meta-seo' },
        ],
      },
    ],
  },
  {
    title: 'CSS',
    icon: '🎨',
    children: [
      {
        title: '기초 (Basics)',
        level: 'basics',
        children: [
          { title: 'CSS 기초', path: '/css/basics/intro' },
        ],
      },
      {
        title: '중급 (Intermediate)',
        level: 'intermediate',
        children: [
          { title: 'Flexbox & Grid', path: '/css/intermediate/flexbox-grid' },
          { title: '박스 모델과 레이아웃', path: '/css/intermediate/box-model' },
        ],
      },
      {
        title: '고급 (Advanced)',
        level: 'advanced',
        children: [
          { title: 'TailwindCSS', path: '/css/advanced/tailwind' },
          { title: 'CSS 애니메이션', path: '/css/advanced/animations' },
          { title: 'CSS 변수와 변환', path: '/css/advanced/transitions-transforms' },
        ],
      },
    ],
  },
  {
    title: 'JavaScript',
    icon: '📚',
    children: [
      {
        title: '기초 (Basics)',
        level: 'basics',
        children: [
          { title: '변수와 타입', path: '/javascript/basics/variables-types' },
          { title: '연산자', path: '/javascript/basics/operators' },
          { title: '조건문', path: '/javascript/basics/conditionals' },
          { title: '반복문', path: '/javascript/basics/loops' },
          { title: '배열', path: '/javascript/basics/arrays' },
          { title: '객체', path: '/javascript/basics/objects' },
          { title: '문자열', path: '/javascript/basics/strings' },
          { title: '숫자와 JSON', path: '/javascript/basics/numbers-json' },
        ],
      },
      {
        title: '중급 (Intermediate)',
        level: 'intermediate',
        children: [
          { title: '함수', path: '/javascript/intermediate/functions' },
          { title: '스코프와 호이스팅', path: '/javascript/intermediate/scope-hoisting' },
          { title: '클로저', path: '/javascript/intermediate/closure' },
          { title: 'DOM 과 이벤트', path: '/javascript/intermediate/dom-events' },
          { title: 'this 키워드', path: '/javascript/intermediate/this-keyword' },
          { title: 'Call/Apply/Bind', path: '/javascript/intermediate/call-apply-bind' },
          { title: 'Debounce/Throttle', path: '/javascript/intermediate/debounce-throttle' },
        ],
      },
      {
        title: '고급 (Advanced)',
        level: 'advanced',
        children: [
          { title: '프로토타입', path: '/javascript/advanced/prototype' },
          { title: '클래스', path: '/javascript/advanced/class' },
          { title: 'Promise', path: '/javascript/advanced/promise' },
          { title: 'async/await', path: '/javascript/advanced/async-await' },
          { title: '이벤트 루프', path: '/javascript/advanced/event-loop' },
          { title: '모듈 시스템', path: '/javascript/advanced/modules' },
          { title: '에러 처리', path: '/javascript/advanced/error-handling' },
          { title: 'fetch API', path: '/javascript/advanced/fetch-api' },
          { title: '디자인 패턴', path: '/javascript/advanced/design-patterns' },
        ],
      },
    ],
  },
  {
    title: 'TypeScript',
    icon: '📘',
    children: [
      {
        title: '기초 (Basics)',
        level: 'basics',
        children: [
          { title: '타입 시스템 소개', path: '/typescript/basics/intro' },
          { title: '기본 타입', path: '/typescript/basics/basic-types' },
          { title: '인터페이스', path: '/typescript/basics/interface' },
          { title: 'Type vs Interface', path: '/typescript/basics/type-vs-interface' },
          { title: 'Enums & Tuples', path: '/typescript/basics/enums-tuples' },
          { title: 'tsconfig 설정', path: '/typescript/basics/tsconfig' },
        ],
      },
      {
        title: '중급 (Intermediate)',
        level: 'intermediate',
        children: [
          { title: '제네릭', path: '/typescript/intermediate/generics' },
          { title: '유틸리티 타입', path: '/typescript/intermediate/utility-types' },
          { title: 'Union & Intersection', path: '/typescript/intermediate/union-intersection' },
          { title: 'Type Narrowing', path: '/typescript/intermediate/type-narrowing' },
          { title: '고급 타입', path: '/typescript/intermediate/advanced-types' },
        ],
      },
      {
        title: '고급 (Advanced)',
        level: 'advanced',
        children: [
          { title: '고급 타입', path: '/typescript/advanced/advanced-types' },
          { title: '데코레이터', path: '/typescript/advanced/decorators' },
          { title: '마이그레이션 가이드', path: '/typescript/advanced/migration-guide' },
          { title: '고급 Narrowing', path: '/typescript/advanced/advanced-narrowing' },
        ],
      },
    ],
  },
  {
    title: 'React',
    icon: '⚛️',
    children: [
      {
        title: '기초 (Basics)',
        level: 'basics',
        children: [
          { title: 'React 소개', path: '/react/basics/intro' },
          { title: '컴포넌트', path: '/react/basics/components' },
          { title: 'State', path: '/react/basics/state' },
          { title: 'Props 심화', path: '/react/basics/props-advanced' },
          { title: '이벤트 핸들링', path: '/react/basics/event-handling' },
          { title: 'Refs & Portals', path: '/react/basics/refs-portals' },
        ],
      },
      {
        title: '중급 (Intermediate)',
        level: 'intermediate',
        children: [
          { title: 'useEffect', path: '/react/intermediate/use-effect' },
          { title: 'useContext & useReducer', path: '/react/intermediate/other-hooks' },
          { title: '성능 최적화', path: '/react/intermediate/performance-hooks' },
          { title: '폼 처리', path: '/react/intermediate/form-handling' },
          { title: 'Custom Hooks', path: '/react/intermediate/custom-hooks' },
        ],
      },
      {
        title: '고급 (Advanced)',
        level: 'advanced',
        children: [
          { title: '고급 Hooks', path: '/react/advanced/advanced-hooks' },
          { title: 'Zustand 상태관리', path: '/react/advanced/zustand' },
          { title: 'Axios HTTP 클라이언트', path: '/react/advanced/axios' },
          { title: 'React Router', path: '/react/advanced/react-router' },
          { title: 'React Testing', path: '/react/advanced/testing' },
          { title: 'Error Boundaries & Portals', path: '/react/advanced/error-boundaries-portals' },
          { title: 'Testing 심화', path: '/react/advanced/testing-advanced' },
          { title: '빌드 최적화', path: '/react/advanced/build-optimization' },
          { title: '웹 성능', path: '/react/advanced/web-performance' },
          { title: '웹 보안', path: '/react/advanced/web-security' },
        ],
      },
    ],
  },
  {
    title: 'Node.js',
    icon: '🟢',
    children: [
      {
        title: '기초 (Basics)',
        level: 'basics',
        children: [
          { title: 'Node.js 소개', path: '/nodejs/basics/intro' },
          { title: 'NPM 패키지 관리', path: '/nodejs/basics/npm' },
          { title: '모듈 시스템', path: '/nodejs/basics/modules' },
          { title: 'Path & FS', path: '/nodejs/basics/path-fs' },
        ],
      },
      {
        title: '중급 (Intermediate)',
        level: 'intermediate',
        children: [
          { title: 'HTTP 서버', path: '/nodejs/intermediate/http-server' },
          { title: 'Express 심화', path: '/nodejs/intermediate/express-advanced' },
        ],
      },
      {
        title: '고급 (Advanced)',
        level: 'advanced',
        children: [
          { title: '데이터베이스', path: '/nodejs/advanced/database' },
          { title: '인증과 보안', path: '/nodejs/advanced/auth' },
          { title: '배포와 운영', path: '/nodejs/advanced/deployment' },
          { title: 'Streams & Workers', path: '/nodejs/advanced/streams-workers' },
          { title: '백엔드 심화', path: '/nodejs/advanced/backend' },
          { title: 'REST API 와 인증', path: '/nodejs/advanced/rest-api' },
          { title: '배포와 DevOps', path: '/nodejs/advanced/deployment-devops' },
        ],
      },
    ],
  },
  {
    title: 'Python',
    icon: '🐍',
    children: [
      {
        title: '기초 (Basics)',
        level: 'basics',
        children: [
          { title: 'Python 기초', path: '/python/basics/intro' },
          { title: '자료구조', path: '/python/basics/data-structures' },
        ],
      },
      {
        title: '중급 (Intermediate)',
        level: 'intermediate',
        children: [
          { title: '제어 흐름', path: '/python/intermediate/control-flow' },
          { title: '함수와 클래스', path: '/python/intermediate/functions-classes' },
        ],
      },
      {
        title: '고급 (Advanced)',
        level: 'advanced',
        children: [
          { title: '고급 주제', path: '/python/advanced/advanced-topics' },
          { title: '데코레이터와 제너레이터', path: '/python/advanced/advanced-features' },
        ],
      },
    ],
  },
];

/**
 * 경로에서 메뉴 항목 찾기
 * @param path - 현재 경로
 * @returns Breadcrumb 항목 배열
 */
export function findBreadcrumbItems(path: string): { title: string; path: string }[] {
  if (path === '/') return [];

  const removeEmojis = (str: string) =>
    str
      .replace(
        /[\p{Emoji}\p{Emoji_Modifier}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}\p{Emoji_Component}]/gu,
        ''
      )
      .trim();

  for (const category of menuData) {
    for (const section of category.children || []) {
      for (const item of section.children || []) {
        if (item.path === path) {
          return [
            { title: removeEmojis(category.title), path: '' },
            { title: section.title, path: '' },
            { title: item.title, path },
          ];
        }
      }
    }
  }
  return [];
}

/**
 * 모든 라우트 경로 추출 (재귀적)
 */
export function getAllRoutes(items: MenuItem[] = menuData): string[] {
  const routes: string[] = [];

  for (const item of items) {
    if (item.path) {
      routes.push(item.path);
    }
    if (item.children) {
      routes.push(...getAllRoutes(item.children));
    }
  }

  return routes;
}
