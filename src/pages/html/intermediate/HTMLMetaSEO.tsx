import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function HTMLMetaSEO() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Meta 태그와 SEO</h1>
        <p className="page-description">
          검색 엔진 최적화 (SEO) 와 소셜 미디어 공유를 위한 meta 태그 활용법을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>Meta 태그</strong> 는 HTML 문서의 메타데이터를 정의합니다.
          브라우저, 검색 엔진, 소셜 미디어에 페이지 정보를 전달하며,
          SEO 와 사용자 경험에 중요한 역할을 합니다.
        </p>

        <InfoCard type="tip" title="Meta 태그의 역할">
          <ul>
            <li>
              <strong>검색 엔진:</strong> 페이지 내용 이해 (SEO)
            </li>
            <li>
              <strong>브라우저:</strong> 렌더링 방식 결정
            </li>
            <li>
              <strong>소셜 미디어:</strong> 공유 시 미리보기 표시
            </li>
            <li>
              <strong>보안:</strong> CSP 등 보안 정책 설정
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="basic-meta">1️⃣ 기본 Meta 태그</h2>
        <p>
          모든 페이지에 필수적인 기본 meta 태그들입니다.
        </p>

        <CodeDemo
          title="기본 Meta 태그"
          description="charset, viewport, description"
          defaultCode={`<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- 문자 인코딩 (반드시 첫 번째) -->
  <meta charset="UTF-8">
  
  <!-- 뷰포트 (반응형 웹 필수) -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- 페이지 설명 (SEO 중요) -->
  <meta name="description" content="React 와 TypeScript 로 배우는 현대 웹 개발">
  
  <!-- 저자 정보 -->
  <meta name="author" content="개발자 이름">
  
  <!-- 키워드 (현대 SEO 에는 거의 무의미) -->
  <meta name="keywords" content="React, TypeScript, 웹개발, 프론트엔드">
  
  <!-- 로봇 (검색 엔진 크롤러) 지시 -->
  <meta name="robots" content="index, follow">
  
  <title>페이지 제목</title>
</head>
<body>
  <!-- 콘텐츠 -->
</body>
</html>

console.log('기본 meta 태그 완료');`}
        />

        <InfoCard type="warning" title="Robots 지시어">
          <ul>
            <li>
              <code>index, follow</code>: 인덱싱 및 링크 따라감 (기본값)
            </li>
            <li>
              <code>noindex, follow</code>: 인덱싱 안 함, 링크는 따라감
            </li>
            <li>
              <code>index, nofollow</code>: 인덱싱 함, 링크는 안 따라감
            </li>
            <li>
              <code>noindex, nofollow</code>: 인덱싱 안 함, 링크도 안 따라감
            </li>
            <li>
              <code>none</code>: noindex, nofollow 와 동일
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="og-tags">2️⃣ Open Graph 태그</h2>
        <p>
          Facebook, LinkedIn 등 소셜 미디어에서 공유 시 미리보기를 제어합니다.
        </p>

        <CodeDemo
          title="Open Graph 태그"
          description="og:title, og:description, og:image, og:url"
          defaultCode={`<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Dev Learning Hub">
<meta property="og:locale" content="ko_KR">

<!-- 기본 정보 -->
<meta property="og:title" content="React & TypeScript 학습 허브">
<meta property="og:description" content="현대 웹 개발을 위한 종합 학습 플랫폼">
<meta property="og:url" content="https://example.com/react-typescript">

<!-- 이미지 (최소 1200x630 권장) -->
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="React TypeScript 배너">

<!-- 비디오 (선택) -->
<meta property="og:video" content="https://example.com/video.mp4">
<meta property="og:video:type" content="video/mp4">
<meta property="og:video:width" content="1280">
<meta property="og:video:height" content="720">

console.log('Open Graph 태그 완료');`}
        />

        <InfoCard type="tip" title="Open Graph 이미지 가이드">
          <ul>
            <li>
              <strong>크기:</strong> 1200 x 630 픽셀 이상
            </li>
            <li>
              <strong>비율:</strong> 1.91:1 (1200x630)
            </li>
            <li>
              <strong>형식:</strong> JPG 또는 PNG
            </li>
            <li>
              <strong>크기:</strong> 5MB 이하
            </li>
            <li>
              <strong>절대 URL:</strong> https:// 포함 전체 경로
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="twitter-cards">3️⃣ Twitter Card</h2>
        <p>
          Twitter 에서 공유 시 미리보기를 표시합니다.
        </p>

        <CodeDemo
          title="Twitter Card"
          description="summary, summary_large_image"
          defaultCode={`<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@twitter_username">
<meta name="twitter:creator" content="@creator_username">

<!-- 콘텐츠 -->
<meta name="twitter:title" content="React & TypeScript 학습 허브">
<meta name="twitter:description" content="현대 웹 개발을 위한 종합 학습 플랫폼">

<!-- 이미지 -->
<meta name="twitter:image" content="https://example.com/twitter-card.jpg">
<meta name="twitter:image:alt" content="React TypeScript 배너">

<!-- 비디오 (선택) -->
<meta name="twitter:player" content="https://example.com/player">
<meta name="twitter:player:width" content="1280">
<meta name="twitter:player:height" content="720">

console.log('Twitter Card 완료');`}
        />

        <InfoCard type="tip" title="Twitter Card 타입">
          <ul>
            <li>
              <strong>summary:</strong> 작은 썸네일 (120x120)
            </li>
            <li>
              <strong>summary_large_image:</strong> 큰 이미지 (1200x600)
            </li>
            <li>
              <strong>app:</strong> 앱 다운로드용
            </li>
            <li>
              <strong>player:</strong> 미디어 플레이어 임베드
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="canonical">4️⃣ Canonical 과 hreflang</h2>
        <p>
          중복 콘텐츠 문제와 다국어 사이트를 처리합니다.
        </p>

        <CodeDemo
          title="Canonical & Hreflang"
          description="중복 콘텐츠 방지, 다국어 지원"
          defaultCode={`<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- 기본 URL 지정 (중복 콘텐츠 방지) -->
  <link rel="canonical" href="https://example.com/react-typescript">
  
  <!-- 다국어 버전 연결 -->
  <link rel="alternate" hreflang="ko" href="https://example.com/ko/react-typescript">
  <link rel="alternate" hreflang="en" href="https://example.com/en/react-typescript">
  <link rel="alternate" hreflang="ja" href="https://example.com/ja/react-typescript">
  <link rel="alternate" hreflang="x-default" href="https://example.com/react-typescript">
  
  <!-- AMP 버전 (선택) -->
  <link rel="amphtml" href="https://example.com/amp/react-typescript">
  
  <!-- 이전/다음 페이지 (페이징) -->
  <link rel="prev" href="https://example.com/page/1">
  <link rel="next" href="https://example.com/page/3">
</head>
</html>

console.log('Canonical & Hreflang 완료');`}
        />

        <InfoCard type="warning" title="중복 콘텐츠 문제">
          <ul>
            <li>
              <strong>www vs non-www:</strong> 한 버전으로 통일
            </li>
            <li>
              <strong>HTTP vs HTTPS:</strong> HTTPS 로 리디렉션
            </li>
            <li>
              <strong>트레일링 슬래시:</strong> / 유무 통일
            </li>
            <li>
              <strong>대소문자:</strong> URL 대소문자 통일
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="pwa">5️⃣ PWA 와 앱 관련 태그</h2>
        <p>
          프로그레시브 웹 앱과 모바일 앱 연동을 위한 태그입니다.
        </p>

        <CodeDemo
          title="PWA & App Tags"
          description="manifest, theme-color, apple-touch-icon"
          defaultCode={`<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- PWA 매니페스트 -->
  <link rel="manifest" href="/manifest.json">
  
  <!-- 테마 색상 (브라우저 UI) -->
  <meta name="theme-color" content="#3b82f6">
  
  <!-- 모바일 앱 아이콘 -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  
  <!-- Apple 터치 아이콘 -->
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  
  <!-- iOS 웹 앱 설정 -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Dev Hub">
  
  <!-- Android Chrome -->
  <link rel="shortcut icon" href="/favicon.ico">
  <meta name="mobile-web-app-capable" content="yes">
  
  <!-- Microsoft 타일 -->
  <meta name="msapplication-TileColor" content="#3b82f6">
  <meta name="msapplication-TileImage" content="/mstile-144x144.png">
  <meta name="msapplication-config" content="/browserconfig.xml">
</head>
</html>

console.log('PWA & App 태그 완료');`}
        />

        <InfoCard type="tip" title="PWA 필수 요소">
          <ul>
            <li>
              <strong>HTTPS:</strong> 보안 연결 필수
            </li>
            <li>
              <strong>Manifest:</strong> 웹 앱 메타데이터
            </li>
            <li>
              <strong>Service Worker:</strong> 오프라인 지원
            </li>
            <li>
              <strong>App Icons:</strong> 다양한 크기 제공
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="security">6️⃣ 보안 Meta 태그</h2>
        <p>
          보안을 위한 HTTP 헤더와 meta 태그입니다.
        </p>

        <CodeDemo
          title="보안 태그"
          description="CSP, referrer-policy"
          defaultCode={`<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- Content Security Policy (메타 태그 버전) -->
  <meta http-equiv="Content-Security-Policy" 
        content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'">
  
  <!-- Referrer Policy -->
  <meta name="referrer" content="strict-origin-when-cross-origin">
  
  <!-- X-Content-Type-Options -->
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  
  <!-- X-Frame-Options (클릭재킹 방지) -->
  <meta http-equiv="X-Frame-Options" content="DENY">
  
  <!-- X-XSS-Protection (구식, CSP 권장) -->
  <meta http-equiv="X-XSS-Protection" content="1; mode=block">
  
  <!-- Permissions-Policy (구 Feature-Policy) -->
  <meta http-equiv="Permissions-Policy" 
        content="geolocation=(), microphone=(), camera=()">
</head>
</html>

console.log('보안 태그 완료');`}
        />

        <InfoCard type="warning" title="보안 주의사항">
          <ul>
            <li>
              <strong>CSP:</strong> HTTP 헤더로 설정 권장 (meta 보다 우선)
            </li>
            <li>
              <strong>HTTPS:</strong> 모든 트래픽 암호화
            </li>
            <li>
              <strong>HSTS:</strong> HTTPS 강제 (헤더 설정)
            </li>
            <li>
              <strong>서브리스무스 인티그리티:</strong> 외부 리소스 무결성 검증
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="performance">7️⃣ 성능 최적화 태그</h2>
        <p>
          로딩 성능을 향상시키는 태그들입니다.
        </p>

        <CodeDemo
          title="성능 최적화"
          description="preload, prefetch, preconnect, dns-prefetch"
          defaultCode={`<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- Preload: 현재 페이지에 필수적인 리소스 -->
  <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/css/critical.css" as="style">
  <link rel="preload" href="/js/main.js" as="script">
  
  <!-- Prefetch: 다음 페이지에서 사용할 리소스 -->
  <link rel="prefetch" href="/next-page.html">
  <link rel="prefetch" href="/api/data.json">
  
  <!-- Preconnect: 외부 도메인과의 연결 미리 설정 -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://cdn.example.com">
  
  <!-- DNS Prefetch: DNS 해결만 미리 -->
  <link rel="dns-prefetch" href="https://analytics.google.com">
  
  <!-- Modulepreload: ES 모듈 미리 로드 -->
  <link rel="modulepreload" href="/js/module.js">
</head>
</html>

console.log('성능 최적화 태그 완료');`}
        />

        <InfoCard type="tip" title="리소스 힌트 사용 가이드">
          <ul>
            <li>
              <strong>preload:</strong> 현재 페이지 필수 리소스 (과용 금지)
            </li>
            <li>
              <strong>prefetch:</strong> 다음 페이지 예상 리소스 (여유 대역폭 사용)
            </li>
            <li>
              <strong>preconnect:</strong> 외부 도메인 연결 (DNS+TCP+TLS)
            </li>
            <li>
              <strong>dns-prefetch:</strong> DNS 해결만 (가벼움)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>기본 meta:</strong> charset, viewport, description, robots
          </li>
          <li>
            <strong>Open Graph:</strong> 소셜 미디어 공유 최적화
          </li>
          <li>
            <strong>Twitter Card:</strong> Twitter 전용 미리보기
          </li>
          <li>
            <strong>Canonical:</strong> 중복 콘텐츠 방지
          </li>
          <li>
            <strong>PWA:</strong> manifest, theme-color, icons
          </li>
          <li>
            <strong>보안:</strong> CSP, referrer-policy, X-Frame-Options
          </li>
          <li>
            <strong>성능:</strong> preload, prefetch, preconnect
          </li>
        </ul>
      </section>
    </div>
  );
}
