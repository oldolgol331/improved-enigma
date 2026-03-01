import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import { QueryProvider } from './hooks/QueryProvider';
import { menuData, learningPaths } from '@config/menu';

import './styles/global.css';

// ============================================================================
// 페이지 컴포넌트 Lazy Loading
// 각 페이지는 사용자가 해당 경로로 이동할 때 비동기로 로드됩니다 (코드 스플리팅)
// ============================================================================

// HTML
const HTMLBasics = lazy(() => import('./pages/html/basics/HTMLBasics'));
const HTMLForms = lazy(() => import('./pages/html/basics/HTMLForms'));
const HTMLAccessibility = lazy(() => import('./pages/html/intermediate/HTMLAccessibility'));
const HTMLSemanticStructure = lazy(() => import('./pages/html/intermediate/HTMLSemanticStructure'));
const HTMLMetaSEO = lazy(() => import('./pages/html/intermediate/HTMLMetaSEO'));

// CSS
const CSSBasics = lazy(() => import('./pages/css/basics/CSSBasics'));
const CSSFlexboxGrid = lazy(() => import('./pages/css/intermediate/CSSFlexboxGrid'));
const CSSBoxLayout = lazy(() => import('./pages/css/intermediate/CSSBoxLayout'));
const TailwindCSS = lazy(() => import('./pages/css/advanced/TailwindCSS'));
const CSSAnimations = lazy(() => import('./pages/css/advanced/CSSAnimations'));
const CSSTransitionsTransforms = lazy(() => import('./pages/css/advanced/CSSTransitionsTransforms'));

// JavaScript Basics
const VariablesTypes = lazy(() => import('./pages/javascript/basics/VariablesTypes'));
const Operators = lazy(() => import('./pages/javascript/basics/Operators'));
const Conditionals = lazy(() => import('./pages/javascript/basics/Conditionals'));
const Loops = lazy(() => import('./pages/javascript/basics/Loops'));
const Arrays = lazy(() => import('./pages/javascript/basics/Arrays'));
const Objects = lazy(() => import('./pages/javascript/basics/Objects'));
const Strings = lazy(() => import('./pages/javascript/basics/Strings'));
const NumbersJSON = lazy(() => import('./pages/javascript/basics/NumbersJSON'));

// JavaScript Intermediate
const Functions = lazy(() => import('./pages/javascript/intermediate/Functions'));
const ScopeHoisting = lazy(() => import('./pages/javascript/intermediate/ScopeHoisting'));
const Closure = lazy(() => import('./pages/javascript/intermediate/Closure'));
const DOMEvents = lazy(() => import('./pages/javascript/intermediate/DOMEvents'));
const ThisKeyword = lazy(() => import('./pages/javascript/intermediate/ThisKeyword'));
const CallApplyBind = lazy(() => import('./pages/javascript/intermediate/CallApplyBind'));
const DebounceThrottle = lazy(() => import('./pages/javascript/intermediate/DebounceThrottle'));

// JavaScript Advanced
const Prototype = lazy(() => import('./pages/javascript/advanced/Prototype'));
const ClassSyntax = lazy(() => import('./pages/javascript/advanced/Class'));
const Promise = lazy(() => import('./pages/javascript/advanced/Promise'));
const AsyncAwait = lazy(() => import('./pages/javascript/advanced/AsyncAwait'));
const EventLoop = lazy(() => import('./pages/javascript/advanced/EventLoop'));
const Modules = lazy(() => import('./pages/javascript/advanced/Modules'));
const ErrorHandling = lazy(() => import('./pages/javascript/advanced/ErrorHandling'));
const FetchAPI = lazy(() => import('./pages/javascript/advanced/FetchAPI'));
const DesignPatterns = lazy(() => import('./pages/javascript/advanced/DesignPatterns'));
const MapSet = lazy(() => import('./pages/javascript/advanced/MapSet'));
const ModernFeatures = lazy(() => import('./pages/javascript/advanced/ModernFeatures'));

// TypeScript Basics
const TSIntro = lazy(() => import('./pages/typescript/basics/TSIntro'));
const TSBasicTypes = lazy(() => import('./pages/typescript/basics/TSBasicTypes'));
const TSInterface = lazy(() => import('./pages/typescript/basics/TSInterface'));
const TSTypeVsInterface = lazy(() => import('./pages/typescript/basics/TSTypeVsInterface'));
const TSEnumsTuples = lazy(() => import('./pages/typescript/basics/TSEnumsTuples'));
const TSConfigGuide = lazy(() => import('./pages/typescript/basics/TSConfigGuide'));

// TypeScript Intermediate
const TSGenerics = lazy(() => import('./pages/typescript/intermediate/TSGenerics'));
const TSUtilityTypes = lazy(() => import('./pages/typescript/intermediate/TSUtilityTypes'));
const TSUnionIntersection = lazy(() => import('./pages/typescript/intermediate/TSUnionIntersection'));
const TSTypeNarrowing = lazy(() => import('./pages/typescript/intermediate/TSTypeNarrowing'));
const TSAdvancedDiscriminated = lazy(() => import('./pages/typescript/intermediate/TSAdvancedDiscriminated'));

// TypeScript Advanced
const TSAdvancedTypes = lazy(() => import('./pages/typescript/advanced/TSAdvancedTypes'));
const TSDecorators = lazy(() => import('./pages/typescript/advanced/TSDecorators'));
const TSMigrationGuide = lazy(() => import('./pages/typescript/advanced/TSMigrationGuide'));
const TSAdvancedNarrowing = lazy(() => import('./pages/typescript/advanced/TSAdvancedNarrowing'));

// React Basics
const ReactIntro = lazy(() => import('./pages/react/basics/ReactIntro'));
const ReactComponents = lazy(() => import('./pages/react/basics/ReactComponents'));
const ReactState = lazy(() => import('./pages/react/basics/ReactState'));
const ReactPropsAdvanced = lazy(() => import('./pages/react/basics/ReactPropsAdvanced'));
const ReactEventHandling = lazy(() => import('./pages/react/basics/ReactEventHandling'));
const ReactRefsPortals = lazy(() => import('./pages/react/basics/ReactRefsPortals'));

// React Intermediate
const ReactUseEffect = lazy(() => import('./pages/react/intermediate/ReactUseEffect'));
const ReactContextReducer = lazy(() => import('./pages/react/intermediate/ReactContextReducer'));
const ReactPerformanceHooks = lazy(() => import('./pages/react/intermediate/ReactPerformanceHooks'));
const ReactFormHandling = lazy(() => import('./pages/react/intermediate/ReactFormHandling'));
const ReactCustomHooks = lazy(() => import('./pages/react/intermediate/ReactCustomHooks'));

// React Advanced
const ReactAdvancedHooks = lazy(() => import('./pages/react/advanced/ReactAdvancedHooks'));
const ZustandStateManagement = lazy(() => import('./pages/react/advanced/ZustandStateManagement'));
const AxiosHTTPClient = lazy(() => import('./pages/react/advanced/AxiosHTTPClient'));
const ReactRouterGuide = lazy(() => import('./pages/react/advanced/ReactRouterGuide'));
const ReactTesting = lazy(() => import('./pages/react/advanced/ReactTesting'));
const ReactErrorBoundariesPortals = lazy(() => import('./pages/react/advanced/ReactErrorBoundariesPortals'));
const TestingAdvanced = lazy(() => import('./pages/react/advanced/TestingAdvanced'));
const BuildOptimization = lazy(() => import('./pages/react/advanced/BuildOptimization'));
const WebPerformance = lazy(() => import('./pages/react/advanced/WebPerformance'));
const WebSecurity = lazy(() => import('./pages/react/advanced/WebSecurity'));

// Node.js Basics
const NodeIntro = lazy(() => import('./pages/nodejs/basics/NodeIntro'));
const NodeNPM = lazy(() => import('./pages/nodejs/basics/NodeNPM'));
const NodeModules = lazy(() => import('./pages/nodejs/basics/NodeModules'));
const NodePathFS = lazy(() => import('./pages/nodejs/basics/NodePathFS'));

// Node.js Intermediate
const NodeHTTP = lazy(() => import('./pages/nodejs/intermediate/NodeHTTP'));
const NodeExpressAdvanced = lazy(() => import('./pages/nodejs/intermediate/NodeExpressAdvanced'));

// Node.js Advanced
const NodeDatabase = lazy(() => import('./pages/nodejs/advanced/NodeDatabase'));
const NodeAuth = lazy(() => import('./pages/nodejs/advanced/NodeAuth'));
const NodeDeployment = lazy(() => import('./pages/nodejs/advanced/NodeDeployment'));
const NodeStreamsWorkers = lazy(() => import('./pages/nodejs/advanced/NodeStreamsWorkers'));
const NodeBackendAdvanced = lazy(() => import('./pages/nodejs/advanced/NodeBackendAdvanced'));
const NodeJSRESTAPI = lazy(() => import('./pages/nodejs/advanced/NodeJSRESTAPI'));
const DeploymentDevOps = lazy(() => import('./pages/nodejs/advanced/DeploymentDevOps'));

// Python Basics
const PythonBasics = lazy(() => import('./pages/python/basics/PythonBasics'));
const PythonDataStructures = lazy(() => import('./pages/python/basics/PythonDataStructures'));
const PythonControlFlow = lazy(() => import('./pages/python/intermediate/PythonControlFlow'));
const PythonFunctionsClasses = lazy(() => import('./pages/python/intermediate/PythonFunctionsClasses'));
const PythonFileIO = lazy(() => import('./pages/python/intermediate/PythonFileIO'));
const PythonAdvanced = lazy(() => import('./pages/python/advanced/PythonAdvanced'));
const PythonAdvancedFeatures = lazy(() => import('./pages/python/advanced/PythonAdvancedFeatures'));

// 페이지 컴포넌트 매핑 (경로 → 컴포넌트)
const pageComponents: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
  // HTML
  '/html/basics/intro': HTMLBasics,
  '/html/basics/forms': HTMLForms,
  '/html/intermediate/accessibility': HTMLAccessibility,
  '/html/intermediate/semantic-structure': HTMLSemanticStructure,
  '/html/intermediate/meta-seo': HTMLMetaSEO,

  // CSS
  '/css/basics/intro': CSSBasics,
  '/css/intermediate/flexbox-grid': CSSFlexboxGrid,
  '/css/intermediate/box-model': CSSBoxLayout,
  '/css/advanced/tailwind': TailwindCSS,
  '/css/advanced/animations': CSSAnimations,
  '/css/advanced/transitions-transforms': CSSTransitionsTransforms,

  // JavaScript Basics
  '/javascript/basics/variables-types': VariablesTypes,
  '/javascript/basics/operators': Operators,
  '/javascript/basics/conditionals': Conditionals,
  '/javascript/basics/loops': Loops,
  '/javascript/basics/arrays': Arrays,
  '/javascript/basics/objects': Objects,
  '/javascript/basics/strings': Strings,
  '/javascript/basics/numbers-json': NumbersJSON,

  // JavaScript Intermediate
  '/javascript/intermediate/functions': Functions,
  '/javascript/intermediate/scope-hoisting': ScopeHoisting,
  '/javascript/intermediate/closure': Closure,
  '/javascript/intermediate/dom-events': DOMEvents,
  '/javascript/intermediate/this-keyword': ThisKeyword,
  '/javascript/intermediate/call-apply-bind': CallApplyBind,
  '/javascript/intermediate/debounce-throttle': DebounceThrottle,

  // JavaScript Advanced
  '/javascript/advanced/prototype': Prototype,
  '/javascript/advanced/class': ClassSyntax,
  '/javascript/advanced/promise': Promise,
  '/javascript/advanced/async-await': AsyncAwait,
  '/javascript/advanced/event-loop': EventLoop,
  '/javascript/advanced/modules': Modules,
  '/javascript/advanced/error-handling': ErrorHandling,
  '/javascript/advanced/fetch-api': FetchAPI,
  '/javascript/advanced/design-patterns': DesignPatterns,
  '/javascript/advanced/map-set': MapSet,
  '/javascript/advanced/modern-features': ModernFeatures,

  // TypeScript Basics
  '/typescript/basics/intro': TSIntro,
  '/typescript/basics/basic-types': TSBasicTypes,
  '/typescript/basics/interface': TSInterface,
  '/typescript/basics/type-vs-interface': TSTypeVsInterface,
  '/typescript/basics/enums-tuples': TSEnumsTuples,
  '/typescript/basics/tsconfig': TSConfigGuide,

  // TypeScript Intermediate
  '/typescript/intermediate/generics': TSGenerics,
  '/typescript/intermediate/utility-types': TSUtilityTypes,
  '/typescript/intermediate/union-intersection': TSUnionIntersection,
  '/typescript/intermediate/type-narrowing': TSTypeNarrowing,
  '/typescript/intermediate/advanced-types': TSAdvancedDiscriminated,

  // TypeScript Advanced
  '/typescript/advanced/advanced-types': TSAdvancedTypes,
  '/typescript/advanced/decorators': TSDecorators,
  '/typescript/advanced/migration-guide': TSMigrationGuide,
  '/typescript/advanced/advanced-narrowing': TSAdvancedNarrowing,

  // React Basics
  '/react/basics/intro': ReactIntro,
  '/react/basics/components': ReactComponents,
  '/react/basics/state': ReactState,
  '/react/basics/props-advanced': ReactPropsAdvanced,
  '/react/basics/event-handling': ReactEventHandling,
  '/react/basics/refs-portals': ReactRefsPortals,

  // React Intermediate
  '/react/intermediate/use-effect': ReactUseEffect,
  '/react/intermediate/context-reducer': ReactContextReducer,
  '/react/intermediate/performance-hooks': ReactPerformanceHooks,
  '/react/intermediate/form-handling': ReactFormHandling,
  '/react/intermediate/custom-hooks': ReactCustomHooks,

  // React Advanced
  '/react/advanced/advanced-hooks': ReactAdvancedHooks,
  '/react/advanced/zustand': ZustandStateManagement,
  '/react/advanced/axios': AxiosHTTPClient,
  '/react/advanced/react-router': ReactRouterGuide,
  '/react/advanced/testing': ReactTesting,
  '/react/advanced/error-boundaries-portals': ReactErrorBoundariesPortals,
  '/react/advanced/testing-advanced': TestingAdvanced,
  '/react/advanced/build-optimization': BuildOptimization,
  '/react/advanced/web-performance': WebPerformance,
  '/react/advanced/web-security': WebSecurity,

  // Node.js Basics
  '/nodejs/basics/intro': NodeIntro,
  '/nodejs/basics/npm': NodeNPM,
  '/nodejs/basics/modules': NodeModules,
  '/nodejs/basics/path-fs': NodePathFS,

  // Node.js Intermediate
  '/nodejs/intermediate/http-server': NodeHTTP,
  '/nodejs/intermediate/express-advanced': NodeExpressAdvanced,

  // Node.js Advanced
  '/nodejs/advanced/database': NodeDatabase,
  '/nodejs/advanced/auth': NodeAuth,
  '/nodejs/advanced/deployment': NodeDeployment,
  '/nodejs/advanced/streams-workers': NodeStreamsWorkers,
  '/nodejs/advanced/backend': NodeBackendAdvanced,
  '/nodejs/advanced/rest-api': NodeJSRESTAPI,
  '/nodejs/advanced/deployment-devops': DeploymentDevOps,

  // Python Basics
  '/python/basics/intro': PythonBasics,
  '/python/basics/data-structures': PythonDataStructures,

  // Python Intermediate
  '/python/intermediate/control-flow': PythonControlFlow,
  '/python/intermediate/functions-classes': PythonFunctionsClasses,
  '/python/intermediate/file-io': PythonFileIO,

  // Python Advanced
  '/python/advanced/advanced-topics': PythonAdvanced,
  '/python/advanced/advanced-features': PythonAdvancedFeatures,
};

// 로딩 중 표시될 폴백 컴포넌트
function PageLoadingFallback() {
  return (
    <div className="page-loading-fallback">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>페이지를 로딩 중입니다...</p>
      </div>
      <style>{`
        .page-loading-fallback {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }
        .loading-spinner {
          text-align: center;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--border-light);
          border-top-color: var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .loading-spinner p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}

// 홈 페이지 컴포넌트
function HomePage() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>🚀 Dev Learning Hub</h1>
        <p className="page-description">
          HTML, CSS, JavaScript, TypeScript, React, Node.js, Python 학습을 위한 인터랙티브 학습 플랫폼
        </p>
      </div>

      <div className="home-content">
        <section className="welcome-section">
          <h2>환영합니다!</h2>
          <p>
            이 사이트는 웹 개발과 프로그래밍을 처음 학습하는 사람들을 위해 설계되었습니다.
            HTML, CSS, JavaScript 부터 React, Node.js, Python 까지 체계적으로 학습하세요.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 기능</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <span className="feature-icon">💻</span>
              <h3>인터랙티브 코드 데모</h3>
              <p>코드를 직접 수정하고 실행 결과를 즉시 확인할 수 있습니다.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📚</span>
              <h3>체계적인 커리큘럼</h3>
              <p>기초 문법부터 고급 개념까지 단계별로 학습할 수 있습니다.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🎯</span>
              <h3>실전 예제</h3>
              <p>실제 개발 환경에서 활용되는 실용적인 예제들을 제공합니다.</p>
            </div>
          </div>
        </section>

        <section className="learning-path-section">
          <h2>학습 경로</h2>
          <div className="path-grid">
            {learningPaths.map((category, categoryIndex) => (
              <div key={categoryIndex} className="path-card">
                <h3>
                  {categoryIndex + 1}. {category.icon} {category.title}
                </h3>
                {category.children.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="path-section">
                    <h4>{section.title}</h4>
                    <ul>
                      {section.children.slice(0, 5).map((item, itemIndex) => (
                        <li key={itemIndex}>{item.title}</li>
                      ))}
                      {section.children.length > 5 && (
                        <li className="more-items">
                          외 {section.children.length - 5}개...
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="start-section">
          <h2>학습 시작하기</h2>
          <p>
            왼쪽 사이드바에서 <strong>HTML → 기초 (Basics) → HTML 기초</strong>를 선택하여
            학습을 시작하세요.
          </p>
        </section>
      </div>

      <style>{`
        .home-content {
          max-width: 1200px;
        }

        .welcome-section,
        .features-section,
        .learning-path-section,
        .start-section {
          margin-bottom: 3rem;
          padding: 2rem;
          background: var(--bg-primary);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }

        .welcome-section h2,
        .features-section h2,
        .learning-path-section h2,
        .start-section h2 {
          margin-bottom: 1rem;
          color: var(--color-primary);
        }

        .feature-grid,
        .path-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .feature-card,
        .path-card {
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          transition: all var(--transition-fast);
          max-height: 500px;
          overflow-y: auto;
        }

        .feature-card:hover,
        .path-card:hover {
          border-color: var(--color-primary);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .feature-icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 1rem;
        }

        .feature-card h3,
        .path-card h3 {
          font-size: 1.125rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .feature-card p {
          font-size: 0.875rem;
          margin: 0;
          color: var(--text-secondary);
        }

        .path-section {
          margin-bottom: 1rem;
        }

        .path-section h4 {
          font-size: 0.9375rem;
          margin-bottom: 0.5rem;
          color: var(--color-primary);
          font-weight: 600;
        }

        .path-card ul {
          margin: 0;
          padding-left: 1.2rem;
          font-size: 0.8125rem;
        }

        .path-card li {
          margin-bottom: 0.25rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .path-card li.more-items {
          color: var(--text-muted);
          font-style: italic;
        }

        .start-section {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));
          border: 2px solid var(--color-primary);
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />

              {/* 동적 라우트 생성 (menuData 기반) */}
              {Object.entries(pageComponents).map(([path, Component]) => (
                <Route key={path} path={path.slice(1)} element={<Component />} />
              ))}

              {/* 404 - 모든 정의되지 않은 경로는 홈으로 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
