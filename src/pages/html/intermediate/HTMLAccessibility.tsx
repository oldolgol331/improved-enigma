import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function HTMLAccessibility() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>HTML 접근성과 시맨틱</h1>
        <p className="page-description">
          웹 접근성 (A11y) 과 시맨틱 HTML, SEO 에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>웹 접근성 (Web Accessibility, A11y)</strong> 은 장애인, 고령자 등 모든 사용자가
          웹 사이트를 이용할 수 있도록 보장하는 것입니다.
        </p>

        <InfoCard type="tip" title="접근성 중요성">
          <ul>
            <li>
              <strong>법적 요구:</strong> 많은 국가에서 의무화
            </li>
            <li>
              <strong>SEO 향상:</strong> 검색 엔진 최적화
            </li>
            <li>
              <strong>사용자 경험:</strong> 모든 사용자에게 편리
            </li>
            <li>
              <strong>시장 확대:</strong> 더 많은 사용자 도달
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="semantic">1️⃣ 시맨틱 HTML</h2>
        <p>
          콘텐츠의 의미를 명확히 하는 태그 사용법입니다.
        </p>

        <CodeDemo
          title="시맨틱 태그"
          description="적절한 태그 선택"
          defaultCode={`<!-- ============================================
     1. 문서 구조
     ============================================ -->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="페이지 설명 - SEO 에 중요">
  <title>페이지 제목</title>
</head>
<body>
  <!-- ============================================
       2. 헤더 (로고, 네비게이션)
       ============================================ -->
  <header>
    <h1>웹사이트 제목</h1>
    <nav aria-label="메인 네비게이션">
      <ul>
        <li><a href="/">홈</a></li>
        <li><a href="/about">소개</a></li>
        <li><a href="/contact">연락처</a></li>
      </ul>
    </nav>
  </header>

  <!-- ============================================
       3. 메인 콘텐츠 (페이지당 하나)
       ============================================ -->
  <main id="main-content">
    <!-- 독립적인 콘텐츠 -->
    <article>
      <header>
        <h2>블로그 포스트 제목</h2>
        <p>
          작성자: <span itemprop="author">홍길동</span>
          <time datetime="2024-01-15">2024 년 1 월 15 일</time>
        </p>
      </header>
      
      <section>
        <h3>섹션 1</h3>
        <p>콘텐츠 내용...</p>
      </section>
      
      <footer>
        <p>태그: #HTML #접근성</p>
      </footer>
    </article>

    <!-- 관련 콘텐츠 (사이드바) -->
    <aside>
      <h3>관련 링크</h3>
      <ul>
        <li><a href="#">링크 1</a></li>
        <li><a href="#">링크 2</a></li>
      </ul>
    </aside>
  </main>

  <!-- ============================================
       4. 푸터 (저작권, 연락처)
       ============================================ -->
  <footer>
    <p>&copy; 2024 웹사이트</p>
    <address>
      연락처: <a href="mailto:info@example.com">info@example.com</a>
    </address>
  </footer>
</body>
</html>`}
        />

        <InfoCard type="warning" title="시맨틱 태그 사용">
          <ul>
            <li>
              <strong>&lt;div&gt; 대신:</strong> &lt;article&gt;, &lt;section&gt;, &lt;nav&gt;
            </li>
            <li>
              <strong>&lt;span&gt; 대신:</strong> &lt;strong&gt;, &lt;em&gt;, &lt;time&gt;
            </li>
            <li>
              <strong>h1 태그:</strong> 페이지당 하나만 사용
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="aria">2️⃣ ARIA 속성</h2>
        <p>
          ARIA(Accessible Rich Internet Applications) 는 동적 콘텐츠의 접근성을 향상시킵니다.
        </p>

        <CodeDemo
          title="ARIA 속성"
          description="role, aria-label, aria-describedby"
          defaultCode={`<!-- ============================================
     1. 역할 (role)
     ============================================ -->
<!-- 네비게이션 -->
<nav role="navigation">
  <ul>
    <li><a href="/">홈</a></li>
    <li><a href="/about">소개</a></li>
  </ul>
</nav>

<!-- 검색 -->
<div role="search">
  <input type="search" placeholder="검색">
</div>

<!-- 알림 -->
<div role="alert">
  중요한 알림이 있습니다!
</div>

<!-- ============================================
     2. 레이블 (aria-label, aria-labelledby)
     ============================================ -->
<!-- 아이콘 버튼 (텍스트 없음) -->
<button aria-label="닫기">
  <span aria-hidden="true">&times;</span>
</button>

<!-- 레이블이 없는 입력 -->
<input 
  type="text" 
  aria-label="검색어 입력"
  placeholder="검색"
>

<!-- 기존 요소로 레이블 -->
<h2 id="search-heading">검색</h2>
<input type="text" aria-labelledby="search-heading">

<!-- ============================================
     3. 설명 (aria-describedby)
     ============================================ -->
<input 
  type="password" 
  aria-describedby="password-help"
>
<p id="password-help">
  비밀번호는 8 자 이상, 대문자와 숫자를 포함해야 합니다.
</p>

<!-- ============================================
     4. 상태 (aria-expanded, aria-hidden)
     ============================================ -->
<!-- 접을 수 있는 메뉴 -->
<button 
  aria-expanded="false" 
  aria-controls="menu"
>
  메뉴 열기
</button>
<ul id="menu" hidden>
  <li><a href="#">항목 1</a></li>
  <li><a href="#">항목 2</a></li>
</ul>

<!-- 숨김 콘텐츠 -->
<span aria-hidden="true">→</span>
<span class="visually-hidden">새 창에서 열림</span>

<!-- ============================================
     5. 라이브 영역 (실시간 업데이트)
     ============================================ -->
<!-- polite: 변경사항을 자연스럽게 알림 -->
<div aria-live="polite" aria-atomic="true">
  <p id="status">로딩 중...</p>
</div>

<!-- assertive: 즉시 알림 (중요한 경우) -->
<div aria-live="assertive">
  <p>에러가 발생했습니다!</p>
</div>

<!-- ============================================
     6. 폼 접근성
     ============================================ -->
<form>
  <div>
    <label for="email">이메일 *</label>
    <input 
      type="email" 
      id="email" 
      name="email"
      required
      aria-required="true"
      aria-invalid="false"
      aria-describedby="email-error"
    >
    <span id="email-error" role="alert" hidden>
      유효한 이메일을 입력하세요
    </span>
  </div>
  
  <button type="submit">제출</button>
</form>

<!-- ============================================
     7. 테이블 접근성
     ============================================ -->
<table>
  <caption>2024 년 월별 판매 현황</caption>
  <thead>
    <tr>
      <th scope="col">월</th>
      <th scope="col">판매액</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1 월</td>
      <td>1,000,000 원</td>
    </tr>
  </tbody>
</form>`}
        />

        <InfoCard type="tip" title="ARIA 사용 원칙">
          <ol>
            <li>
              <strong>첫 번째 규칙:</strong> 네이티브 HTML 요소 사용
            </li>
            <li>
              <strong>두 번째 규칙:</strong> 네이티브가 없으면 ARIA 사용
            </li>
            <li>
              <strong>세 번째 규칙:</strong> 모든 ARIA 속성은 필수 관리
            </li>
          </ol>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="keyboard">3️⃣ 키보드 접근성</h2>
        <p>
          마우스 없이 키보드만으로 모든 기능을 사용할 수 있어야 합니다.
        </p>

        <CodeDemo
          title="키보드 접근성"
          description="탭 순서, 포커스, 단축키"
          defaultCode={`<!-- ============================================
     1. 탭 순서 (tabindex)
     ============================================ -->
<!-- 기본 탭 순서 (권장) -->
<a href="#">링크</a>
<button>버튼</button>
<input type="text">

<!-- 탭 순서 명시 -->
<input type="text" tabindex="1" placeholder="첫 번째">
<input type="text" tabindex="2" placeholder="두 번째">

<!-- 탭 순서 제외 (비권장) -->
<div tabindex="-1">탭으로 이동 불가</div>

<!-- ============================================
     2. 커스텀 요소에 포커스
     ============================================ -->
<!-- 클릭 가능한 div (키보드 접근성 추가) -->
<div 
  role="button"
  tabindex="0"
  onclick="handleClick()"
  onkeydown="handleKeyDown(event)"
>
  클릭하세요
</div>

<script>
function handleKeyDown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
}
</script>

<!-- ============================================
     3. 포커스 스타일
     ============================================ -->
<style>
/* 기본 포커스 스타일 (절대 제거하지 않기) */
:focus {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* 커스텀 포커스 스타일 */
.button:focus {
  outline: 3px solid #005fcc;
  box-shadow: 0 0 0 4px rgba(0, 95, 204, 0.3);
}

/* 포커스_within (자식 요소 포커스 시 스타일) */
.card:focus-within {
  border-color: #005fcc;
  box-shadow: 0 0 0 2px #005fcc;
}
</style>

<!-- ============================================
     4. 스킵 링크 (본문으로 이동)
     ============================================ -->
<a href="#main-content" class="skip-link">
  본문으로 이동
</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #005fcc;
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>

<!-- ============================================
     5. 모달 다이얼로그
     ============================================ -->
<div 
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">확인</h2>
  <p>정말로 삭제하시겠습니까?</p>
  <button>확인</button>
  <button>취소</button>
</div>

<!-- ============================================
     6. 드롭다운 메뉴
     ============================================ -->
<div class="dropdown">
  <button 
    aria-expanded="false"
    aria-haspopup="true"
    onclick="toggleMenu()"
  >
    메뉴
  </button>
  <ul 
    role="menu" 
    hidden
  >
    <li role="none">
      <a role="menuitem" href="#">항목 1</a>
    </li>
    <li role="none">
      <a role="menuitem" href="#">항목 2</a>
    </li>
  </ul>
</div>`}
        />

        <InfoCard type="tip" title="키보드 단축키">
          <ul>
            <li>
              <strong>Tab:</strong> 다음 요소로 이동
            </li>
            <li>
              <strong>Shift+Tab:</strong> 이전 요소로 이동
            </li>
            <li>
              <strong>Enter/Space:</strong> 버튼/링크 활성화
            </li>
            <li>
              <strong>Escape:</strong> 모달/메뉴 닫기
            </li>
            <li>
              <strong>화살표:</strong> 메뉴/탭 이동
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="images">4️⃣ 미디어 접근성</h2>
        <p>
          이미지, 비디오, 오디오의 접근성을 보장합니다.
        </p>

        <CodeDemo
          title="미디어 접근성"
          description="alt 텍스트, 캡션, 자막"
          defaultCode={`<!-- ============================================
     1. 이미지 alt 텍스트
     ============================================ -->
<!-- 정보성 이미지 (설명 필요) -->
<img src="chart.png" alt="2024 년 분기별 매출 그래프">

<!-- 장식용 이미지 (빈 alt) -->
<img src="decorative-border.png" alt="">

<!-- 텍스트가 포함된 이미지 -->
<img src="logo.png" alt="회사명 로고">

<!-- 복잡한 이미지 (상세 설명) -->
<figure>
  <img src="infographic.png" alt="인포그래픽 개요">
  <figcaption>
    <p>2024 년 판매 현황 인포그래픽. 상세 데이터는 
    <a href="data.html">데이터 페이지</a> 참조.</p>
  </figcaption>
</figure>

<!-- ============================================
     2. 비디오 접근성
     ============================================ -->
<video controls poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  
  <!-- 자막 -->
  <track 
    kind="captions" 
    src="captions-ko.vtt" 
    srclang="ko" 
    label="한국어"
    default
  >
  <track 
    kind="captions" 
    src="captions-en.vtt" 
    srclang="en" 
    label="English"
  >
  
  <!-- 대체 콘텐츠 -->
  <p>
    비디오를 재생할 수 없습니다.
    <a href="transcript.html">대본 보기</a>
  </p>
</video>

<!-- ============================================
     3. 오디오 접근성
     ============================================ -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  
  <p>
    <a href="transcript.html">대본 다운로드</a>
  </p>
</audio>

<!-- ============================================
     4. SVG 접근성
     ============================================ -->
<svg role="img" aria-labelledby="icon-title">
  <title id="icon-title">검색 아이콘</title>
  <circle cx="10" cy="10" r="8" />
  <line x1="16" y1="16" x2="22" y2="22" />
</svg>

<!-- ============================================
     5. iframe 접근성
     ============================================ -->
<iframe 
  src="video.html" 
  title="소개 비디오"
  aria-label="회사 소개 비디오"
></iframe>`}
        />

        <InfoCard type="tip" title="alt 텍스트 작성법">
          <ul>
            <li>
              <strong>간결하게:</strong> 125 자 이내
            </li>
            <li>
              <strong>맥락 고려:</strong> 페이지 목적에 맞게
            </li>
            <li>
              <strong>"이미지" 생략:</strong> 스크린 리더가 이미 알림
            </li>
            <li>
              <strong>텍스트 이미지:</strong> 텍스트 내용 포함
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="seo">5️⃣ SEO (검색 엔진 최적화)</h2>
        <p>
          검색 엔진에서 잘 노출되도록 최적화합니다.
        </p>

        <CodeDemo
          title="SEO 최적화"
          description="메타 태그, 구조화된 데이터"
          defaultCode={`<!-- ============================================
     1. 기본 메타 태그
     ============================================ -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- 페이지 제목 (50-60 자) -->
  <title>페이지 제목 | 브랜드명</title>
  
  <!-- 메타 설명 (150-160 자) -->
  <meta name="description" content="페이지에 대한 간결하고 매력적인 설명">
  
  <!-- 저자 -->
  <meta name="author" content="작성자 이름">
  
  <!-- 로봇 (크롤링 제어) -->
  <meta name="robots" content="index, follow">
  <!-- noindex, nofollow, noarchive -->
</head>

<!-- ============================================
     2. Open Graph (소셜 미디어)
     ============================================ -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/page">
<meta property="og:title" content="페이지 제목">
<meta property="og:description" content="페이지 설명">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="ko_KR">
<meta property="og:site_name" content="사이트명">

<!-- ============================================
     3. Twitter Card
     ============================================ -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@username">
<meta name="twitter:title" content="페이지 제목">
<meta name="twitter:description" content="페이지 설명">
<meta name="twitter:image" content="https://example.com/image.jpg">

<!-- ============================================
     4. 구조화된 데이터 (Schema.org)
     ============================================ -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "기사 제목",
  "author": {
    "@type": "Person",
    "name": "작성자"
  },
  "datePublished": "2024-01-15",
  "image": "https://example.com/image.jpg"
}
</script>

<!-- ============================================
     5. 캐노니컬 URL
     ============================================ -->
<link rel="canonical" href="https://example.com/page">

<!-- ============================================
     6. favicon
     ============================================ -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<!-- ============================================
     7. 성능 최적화
     ============================================ -->
<!-- 프리로드 -->
<link rel="preload" href="font.woff2" as="font" crossorigin>
<link rel="preload" href="critical.css" as="style">

<!-- 프리페치 -->
<link rel="prefetch" href="next-page.html">

<!-- DNS 프리커넥트 -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- ============================================
     8. 사이트맵과 robots.txt
     ============================================ -->
<!-- robots.txt -->
/*
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://example.com/sitemap.xml
*/

<!-- sitemap.xml -->
/*
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
*/`}
        />

        <InfoCard type="tip" title="SEO 체크리스트">
          <ul>
            <li>
              <strong>제목 태그:</strong> 50-60 자, 키워드 포함
            </li>
            <li>
              <strong>메타 설명:</strong> 150-160 자, 매력적으로
            </li>
            <li>
              <strong>헤딩 구조:</strong> h1 → h2 → h3 계층적
            </li>
            <li>
              <strong>이미지:</strong> alt 텍스트 필수
            </li>
            <li>
              <strong>속도:</strong> 페이지 로딩 시간 최적화
            </li>
            <li>
              <strong>모바일:</strong> 반응형 디자인
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>시맨틱 HTML:</strong> 적절한 태그 사용
          </li>
          <li>
            <strong>ARIA:</strong> 동적 콘텐츠 접근성
          </li>
          <li>
            <strong>키보드:</strong> 탭 순서, 포커스 스타일
          </li>
          <li>
            <strong>미디어:</strong> alt 텍스트, 캡션, 자막
          </li>
          <li>
            <strong>SEO:</strong> 메타 태그, 구조화된 데이터
          </li>
          <li>
            <strong>성능:</strong> 프리로드, 프리페치
          </li>
        </ul>
      </section>
    </div>
  );
}