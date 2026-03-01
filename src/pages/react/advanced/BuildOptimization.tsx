import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function BuildOptimization() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>빌드 최적화</h1>
        <p className="page-description">
          Vite 플러그인, 번들 분석, 코드 스플리팅을 통한 빌드 최적화를 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="vite-plugins">1️⃣ Vite 플러그인</h2>
        <p>
          Vite 플러그인을 활용한 빌드 최적화입니다.
        </p>

        <CodeDemo
          title="Vite Plugins"
          description="공식 플러그인, 서드파티 플러그인"
          defaultCode={`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { compression } from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    // 1. React 플러그인
    react({
      // JSX 변환
      include: '**/*.{jsx,tsx}',
      // Fast Refresh
      fastRefresh: true,
    }),
    
    // 2. SVG in React
    svgr({
      svgrOptions: {
        icon: true,
        exportType: 'named',
        namedExport: 'ReactComponent',
      },
    }),
    
    // 3. 번들 시각화
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    
    // 4. Gzip/Brotli 압축
    compression({
      algorithm: 'brotliCompress',  // 'gzip'
      ext: '.br',
      threshold: 10240,  // 10KB 이상
    }),
    
    // 5. PWA (Progressive Web App)
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24,  // 1 일
              },
            },
          },
        ],
      },
    }),
  ],
});`}
        />

        <InfoCard type="tip" title="추천 Vite 플러그인">
          <ul>
            <li>
              <strong>@vitejs/plugin-react:</strong> React Fast Refresh
            </li>
            <li>
              <strong>vite-plugin-svgr:</strong> SVG import
            </li>
            <li>
              <strong>rollup-plugin-visualizer:</strong> 번들 분석
            </li>
            <li>
              <strong>vite-plugin-compression:</strong> Gzip/Brotli
            </li>
            <li>
              <strong>vite-plugin-pwa:</strong> PWA 지원
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="code-splitting">2️⃣ 코드 스플리팅</h2>
        <p>
          청크 분할을 통한 초기 로딩 최적화입니다.
        </p>

        <CodeDemo
          title="Code Splitting"
          description="Lazy Loading, Manual Chunks"
          defaultCode={`// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 1. Manual Chunks (수동 분할)
        manualChunks: {
          // React 벤더
          'react-vendor': [
            'react',
            'react-dom',
            'react-router-dom'
          ],
          
          // TanStack Query
          'tanstack-vendor': [
            '@tanstack/react-query',
            '@tanstack/react-query-devtools'
          ],
          
          // UI 라이브러리
          'ui-vendor': [
            'zustand',
            'axios'
          ],
        },
      },
    },
  },
});

// ============================================
// 2. Dynamic Import (Lazy Loading)
// ============================================
// App.tsx
import { lazy, Suspense } from 'react';

// 페이지 지연 로딩
const HomePage = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/About'));
const DashboardPage = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Suspense>
  );
}

// ============================================
// 3. Route-based Code Splitting
// ============================================
// React Router v6+
const AdminPage = lazy(() => import('./pages/Admin'));

function AdminRoute() {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminPage />
    </Suspense>
  );
}

// ============================================
// 4. Component-based Splitting
// ============================================
// 큰 컴포넌트 분리
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Dashboard() {
  return (
    <div>
      <Header />
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart data={data} />
      </Suspense>
    </div>
  );
}

// ============================================
// 5. Library-based Splitting
// ============================================
// 큰 라이브러리 부분 import
import { debounce } from 'lodash-es';  // 전체 lodash 아님
import dayjs from 'dayjs';  // moment 대신 가벼운 dayjs

console.log('Code Splitting 완료');`}
        />

        <InfoCard type="tip" title="코드 스플리팅 전략">
          <ul>
            <li>
              <strong>Vendor Chunks:</strong> 라이브러리는 별도 번들
            </li>
            <li>
              <strong>Route-based:</strong> 페이지별 지연 로딩
            </li>
            <li>
              <strong>Component-based:</strong> 큰 컴포넌트 분리
            </li>
            <li>
              <strong>Dynamic Import:</strong> 필요할 때 로드
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="bundle-analysis">3️⃣ 번들 분석</h2>
        <p>
          번들 크기를 분석하고 최적화합니다.
        </p>

        <CodeDemo
          title="Bundle Analysis"
          description="Visualizer, Bundle Analyzer"
          defaultCode={`// 1. Rollup Visualizer 설정
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      filename: 'dist/stats.html',
      open: true,  // 분석 후 자동 오픈
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});

// 2. 분석 결과 해석
// ============================================
// stats.html 에서 확인:
// - 각 모듈의 크기
// - 의존성 그래프
// - 중복 import 확인
// - 큰 번들 식별

// 3. 번들 크기 제한 설정
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    // 청크 크기 경고
    chunkSizeWarningLimit: 500,  // 500KB
  },
});

// 4. Tree Shaking (불필요 코드 제거)
// ============================================
// 좋은 예: Tree Shaking 작동
import { debounce } from 'lodash-es';
import { format } from 'date-fns';

// 나쁜 예: 전체 라이브러리 import
import _ from 'lodash';  // 전체 lodash 포함
import moment from 'moment';  // 전체 moment 포함

// 5. 번들 크기 비교
// ============================================
// npm run build 후:
// - dist/assets/*.js 파일 크기 확인
// - gzip/brotli 크기 비교
// - 이전 빌드와 비교

// 6. Import 분석
// ============================================
// 어떤 모듈이 큰지 확인
npm install -g import-size

import-size react react-dom
// Output:
// react: 6.4 KB (gzip)
// react-dom: 36.2 KB (gzip)

console.log('Bundle Analysis 완료');`}
        />

        <InfoCard type="tip" title="번들 최적화 팁">
          <ul>
            <li>
              <strong>Visualizer:</strong> dist/stats.html 확인
            </li>
            <li>
              <strong>Tree Shaking:</strong> ES 모듈 사용
            </li>
            <li>
              <strong>경량 라이브러리:</strong> dayjs, lodash-es
            </li>
            <li>
              <strong>중복 제거:</strong> dedupe 설정
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="asset-optimization">4️⃣ 자산 최적화</h2>
        <p>
          이미지, 폰트 등 정적 자산 최적화입니다.
        </p>

        <CodeDemo
          title="Asset Optimization"
          description="이미지, 폰트, 아이콘 최적화"
          defaultCode={`// vite.config.ts
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    // 1. 이미지 최적화
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      webp: {
        quality: 75,
        lossless: false,
      },
      avif: {
        quality: 70,
      },
    }),
  ],
  
  build: {
    assetsInlineLimit: 4096,  // 4KB 이하는 base64 인라인
    assetsDir: 'assets',
  },
});

// ============================================
// 2. 폰트 최적화
// ============================================
// font-display: swap 사용
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter.woff2') format('woff2');
  font-display: swap;  // 폰트 로드 중 텍스트 표시
}

// 서브셋팅 (필요한 문자만)
// pyftsubset Inter.woff2 --text="Hello World"

// ============================================
// 3. 아이콘 최적화
// ============================================
// SVG 스프라이트 사용
// sprite.svg
<svg class="icon">
  <use href="/sprite.svg#icon-home"></use>
</svg>

// 또는 Icon Library
import { HomeIcon } from '@heroicons/react/24/solid';

// ============================================
// 4. Preload 중요 자산
// ============================================
// index.html
<head>
  <!-- 중요 폰트 미리 로드 -->
  <link rel="preload" href="/fonts/Inter.woff2" as="font" crossorigin>
  
  <!-- 중요 CSS 미리 로드 -->
  <link rel="preload" href="/assets/critical.css" as="style">
  
  <!-- LCP 이미지 미리 로드 -->
  <link rel="preload" href="/hero-image.webp" as="image">
</head>

// ============================================
// 5. 레이지 로딩
// ============================================
// 이미지
<img 
  src="image.jpg" 
  loading="lazy" 
  alt="Description"
/>

// iframe
<iframe src="..." loading="lazy"></iframe>

// ============================================
// 6. 현대 이미지 형식
// ============================================
// WebP/AVIF 사용 (JPEG 보다 30-50% 작음)
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>

console.log('Asset Optimization 완료');`}
        />

        <InfoCard type="tip" title="자산 최적화 도구">
          <ul>
            <li>
              <strong>vite-plugin-image-optimizer:</strong> 이미지 압축
            </li>
            <li>
              <strong>font-display: swap:</strong> 폰트 로드 최적화
            </li>
            <li>
              <strong>WebP/AVIF:</strong> 현대 이미지 형식
            </li>
            <li>
              <strong>loading="lazy":</strong> 네이티브 레이지 로딩
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="caching">5️⃣ 캐싱 전략</h2>
        <p>
          브라우저와 CDN 캐싱을 최적화합니다.
        </p>

        <CodeDemo
          title="Caching Strategy"
          description="Hash, Cache-Control, Service Worker"
          defaultCode={`// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // 1. 파일명 해시 (Cache Busting)
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    
    // 2. Manifest 파일 생성
    manifest: true,
  },
});

// ============================================
// 3. 서버 Cache-Control 헤더
// ============================================
// Nginx 설정 예시
location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

// HTML 은 캐싱 안 함
location ~* \\.html$ {
  expires -1;
  add_header Cache-Control "no-cache, no-store, must-revalidate";
}

// ============================================
// 4. Service Worker (Workbox)
// ============================================
// vite-plugin-pwa 설정
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // 캐싱 전략
        runtimeCaching: [
          {
            // API 응답: Network First
            urlPattern: /^https:\\/\\/api\\.example\\.com\\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24,  // 1 일
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // 이미지: Cache First
            urlPattern: /\\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,  // 30 일
              },
            },
          },
          {
            // JS/CSS: Stale While Revalidate
            urlPattern: /\\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
            },
          },
        ],
      },
    }),
  ],
});

// ============================================
// 5. CDN 설정
// ============================================
// Cloudflare, CloudFront 등 CDN 사용
// - 정적 자산은 CDN 에서 제공
// - Origin Shield 로 원본 보호
// - Browser Cache TTL 설정

console.log('Caching Strategy 완료');`}
        />

        <InfoCard type="tip" title="캐싱 전략">
          <ul>
            <li>
              <strong>Hash:</strong> 파일명 해시로 캐시 무효화
            </li>
            <li>
              <strong>Cache-Control:</strong> immutable (변경 없음)
            </li>
            <li>
              <strong>Service Worker:</strong> 오프라인 지원
            </li>
            <li>
              <strong>CDN:</strong> 전 세계 엣지 캐시
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Vite Plugins:</strong> react, svgr, visualizer, compression
          </li>
          <li>
            <strong>Code Splitting:</strong> Manual Chunks, Lazy Loading
          </li>
          <li>
            <strong>Bundle Analysis:</strong> Visualizer, Tree Shaking
          </li>
          <li>
            <strong>Asset Optimization:</strong> 이미지, 폰트, 아이콘
          </li>
          <li>
            <strong>Caching:</strong> Hash, Cache-Control, Service Worker
          </li>
        </ul>
      </section>
    </div>
  );
}
