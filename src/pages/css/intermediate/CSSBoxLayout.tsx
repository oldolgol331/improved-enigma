import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function CSSBoxModelLayout() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>CSS 박스 모델과 레이아웃</h1>
        <p className="page-description">
          CSS 박스 모델의 이해와 다양한 레이아웃 기법을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>박스 모델 (Box Model)</strong> 은 CSS 레이아웃의 기본 개념으로,
          모든 HTML 요소가 사각형 박스로 구성되어 있습니다.
          박스 모델을 정확히 이해해야 의도한 레이아웃을 구현할 수 있습니다.
        </p>

        <InfoCard type="tip" title="박스 모델 구성 요소">
          <ul>
            <li>
              <strong>Content:</strong> 실제 콘텐츠 (텍스트, 이미지 등)
            </li>
            <li>
              <strong>Padding:</strong> 콘텐츠와 테두리 사이 여백
            </li>
            <li>
              <strong>Border:</strong> 패딩과 마진 사이 테두리
            </li>
            <li>
              <strong>Margin:</strong> 요소 바깥쪽 여백
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="box-model">1️⃣ 박스 모델 이해</h2>
        <p>
          박스 모델의 각 구성 요소와 box-sizing 속성입니다.
        </p>

        <CodeDemo
          title="박스 모델 시각화"
          description="margin, border, padding, content"
          defaultCode={`<!DOCTYPE html>
<html>
<head>
  <style>
    .box {
      width: 300px;
      padding: 20px;
      border: 5px solid #3b82f6;
      margin: 30px;
      background-color: #f0f9ff;
    }
    
    /* box-sizing 비교 */
    .content-box {
      box-sizing: content-box; /* 기본값: width 는 콘텐츠만 */
      width: 200px;
      padding: 20px;
      border: 5px solid #10b981;
      /* 실제 너비: 200 + 40 + 10 = 250px */
    }
    
    .border-box {
      box-sizing: border-box; /* 권장: width 가 전체 포함 */
      width: 200px;
      padding: 20px;
      border: 5px solid #f59e0b;
      /* 콘텐츠 너비: 200 - 40 - 10 = 150px */
    }
  </style>
</head>
<body>
  <div class="box">
    <h3>박스 모델</h3>
    <p>margin → border → padding → content</p>
  </div>
  
  <div class="content-box">content-box</div>
  <div class="border-box">border-box</div>
</body>
</html>

console.log('박스 모델 완료');`}
        />

        <InfoCard type="warning" title="box-sizing 권장사항">
          <ul>
            <li>
              <strong>border-box 사용:</strong> 예측 가능한 레이아웃
            </li>
            <li>
              <strong>전역 적용:</strong> <code>* {'{'} box-sizing: border-box; {'}'}</code>
            </li>
            <li>
              <strong>계산 간편:</strong> width 가 전체 크기 포함
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="display">2️⃣ Display 속성</h2>
        <p>
          요소의 표시 방식을 제어하는 display 속성입니다.
        </p>

        <CodeDemo
          title="Display 속성"
          description="block, inline, inline-block, none, flex, grid"
          defaultCode={`<!DOCTYPE html>
<html>
<head>
  <style>
    /* 블록 레벨: 한 줄 전체, 줄바꿈 발생 */
    .block {
      display: block;
      width: 200px;
      background: #3b82f6;
    }
    
    /* 인라인: 내용만큼, 줄바꿈 없음 */
    .inline {
      display: inline;
      background: #10b981;
      /* width, height, margin-top/bottom 무시 */
    }
    
    /* 인라인블록: 인라인 + 크기 지정 가능 */
    .inline-block {
      display: inline-block;
      width: 100px;
      height: 50px;
      background: #f59e0b;
    }
    
    /* 숨김 */
    .none {
      display: none; /* 완전히 제거 (공간 없음) */
    }
    
    .hidden {
      visibility: hidden; /* 숨김 but 공간 유지 */
    }
  </style>
</head>
<body>
  <div class="block">블록 (div, p, h1 등)</div>
  <div class="block">블록 (줄바꿈)</div>
  
  <span class="inline">인라인 (span, a 등)</span>
  <span class="inline">인라인 (같은 줄)</span>
  
  <div class="inline-block">인라인블록</div>
  <div class="inline-block">인라인블록</div>
</body>
</html>

console.log('display 속성 완료');`}
        />

        <InfoCard type="tip" title="주요 display 값">
          <ul>
            <li>
              <strong>block:</strong> div, p, h1-h6, ul, li
            </li>
            <li>
              <strong>inline:</strong> span, a, strong, em
            </li>
            <li>
              <strong>inline-block:</strong> img, input, button
            </li>
            <li>
              <strong>flex:</strong> 플렉스박스 컨테이너
            </li>
            <li>
              <strong>grid:</strong> 그리드 컨테이너
            </li>
            <li>
              <strong>none:</strong> 요소 완전히 제거
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="position">3️⃣ Position 속성</h2>
        <p>
          요소의 위치를 제어하는 position 속성입니다.
        </p>

        <CodeDemo
          title="Position 속성"
          description="static, relative, absolute, fixed, sticky"
          defaultCode={`<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      position: relative; /* 기준점 */
      width: 400px;
      height: 300px;
      border: 2px solid #333;
    }
    
    /* static: 기본 위치 (top/left 무시) */
    .static {
      position: static;
    }
    
    /* relative: 원래 위치 기준 상대 이동 */
    .relative {
      position: relative;
      top: 20px;
      left: 30px;
    }
    
    /* absolute: 가장 가까운 position 요소 기준 */
    .absolute {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    
    /* fixed: 뷰포트 기준 (스크롤해도 고정) */
    .fixed {
      position: fixed;
      bottom: 20px;
      right: 20px;
    }
    
    /* sticky: 스크롤 시 특정 위치에서 고정 */
    .sticky {
      position: sticky;
      top: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="static">static</div>
    <div class="relative">relative</div>
    <div class="absolute">absolute</div>
  </div>
  
  <button class="fixed">고정 버튼</button>
  
  <nav class="sticky">
    스티키 네비게이션
  </nav>
</body>
</html>

console.log('position 속성 완료');`}
        />

        <InfoCard type="warning" title="Position 사용 시 주의">
          <ul>
            <li>
              <strong>absolute 기준:</strong> position 이 있는 가장 가까운 조상
            </li>
            <li>
              <strong>relative 기준:</strong> 원래 자신의 위치
            </li>
            <li>
              <strong>fixed 기준:</strong> 브라우저 뷰포트
            </li>
            <li>
              <strong>sticky:</strong> 부모 컨테이너 내에서만 작동
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="flexbox">4️⃣ Flexbox 복습</h2>
        <p>
          1 차원 레이아웃을 위한 플렉스박스입니다.
        </p>

        <CodeDemo
          title="Flexbox 주요 속성"
          description="flex-direction, justify-content, align-items"
          defaultCode={`<!DOCTYPE html>
<html>
<head>
  <style>
    .flex-container {
      display: flex;
      gap: 10px;
      
      /*主轴 (메인 축) 방향 */
      flex-direction: row; /* row | row-reverse | column | column-reverse */
      
      /* 메인 축 정렬 */
      justify-content: flex-start; /* flex-start | center | flex-end | space-between | space-around */
      
      /* 교차축 정렬 */
      align-items: stretch; /* stretch | flex-start | center | flex-end | baseline */
      
      /* 여러 줄일 때 */
      align-content: flex-start; /* flex-start | center | flex-end | space-between | space-around */
      flex-wrap: nowrap; /* nowrap | wrap | wrap-reverse */
    }
    
    .flex-item {
      /* 개별 아이템 */
      flex: 1; /* flex-grow | flex-shrink | flex-basis */
      order: 0; /* 표시 순서 */
      align-self: auto; /* 개별 align-items */
    }
  </style>
</head>
<body>
  <div class="flex-container">
    <div class="flex-item">1</div>
    <div class="flex-item">2</div>
    <div class="flex-item">3</div>
  </div>
</body>
</html>

console.log('Flexbox 완료');`}
        />

        <InfoCard type="tip" title="Flexbox 자주 쓰는 패턴">
          <ul>
            <li>
              <strong>가운데 정렬:</strong> <code>justify-content: center; align-items: center;</code>
            </li>
            <li>
              <strong>양끝 정렬:</strong> <code>justify-content: space-between;</code>
            </li>
            <li>
              <strong>균등 간격:</strong> <code>justify-content: space-around;</code>
            </li>
            <li>
              <strong>수직 중앙:</strong> <code>align-items: center;</code>
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="grid">5️⃣ CSS Grid</h2>
        <p>
          2 차원 레이아웃을 위한 그리드 시스템입니다.
        </p>

        <CodeDemo
          title="CSS Grid"
          description="grid-template-columns, grid-template-rows, gap"
          defaultCode={`<!DOCTYPE html>
<html>
<head>
  <style>
    .grid-container {
      display: grid;
      gap: 20px;
      
      /* 컬럼 정의 (3 컬럼) */
      grid-template-columns: 1fr 1fr 1fr;
      /* 또는: repeat(3, 1fr) */
      
      /* 행 정의 (2 행) */
      grid-template-rows: 100px 200px;
      
      /* 영역 정의 */
      grid-template-areas:
        "header header header"
        "sidebar content content"
        "footer footer footer";
    }
    
    .header { grid-area: header; }
    .sidebar { grid-area: sidebar; }
    .content { grid-area: content; }
    .footer { grid-area: footer; }
    
    /* 아이템 위치 지정 */
    .item {
      grid-column: 1 / 3; /* 1 번째 라인부터 3 번째 라인까지 */
      grid-row: 1 / 2;
    }
  </style>
</head>
<body>
  <div class="grid-container">
    <div class="header">Header</div>
    <div class="sidebar">Sidebar</div>
    <div class="content">Content</div>
    <div class="footer">Footer</div>
  </div>
</body>
</html>

console.log('CSS Grid 완료');`}
        />

        <InfoCard type="tip" title="Grid 자주 쓰는 패턴">
          <ul>
            <li>
              <strong>반응형 컬럼:</strong> <code>grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));</code>
            </li>
            <li>
              <strong>간격:</strong> <code>gap: 20px;</code> (row-gap + column-gap)
            </li>
            <li>
              <strong>중앙 정렬:</strong> <code>place-items: center;</code>
            </li>
            <li>
              <strong>전체 너비:</strong> <code>grid-column: 1 / -1;</code>
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="responsive">6️⃣ 반응형 레이아웃</h2>
        <p>
          미디어 쿼리를 사용한 반응형 디자인입니다.
        </p>

        <CodeDemo
          title="반응형 레이아웃"
          description="media queries, mobile-first"
          defaultCode={`<!DOCTYPE html>
<html>
<head>
  <style>
    /* 모바일 퍼스트 (기본 스타일) */
    .container {
      width: 100%;
      padding: 1rem;
    }
    
    .grid {
      display: grid;
      grid-template-columns: 1fr; /* 1 컬럼 */
      gap: 1rem;
    }
    
    /* 태블릿 (768px 이상) */
    @media (min-width: 768px) {
      .container {
        max-width: 720px;
        margin: 0 auto;
      }
      
      .grid {
        grid-template-columns: repeat(2, 1fr); /* 2 컬럼 */
      }
    }
    
    /* 데스크톱 (1024px 이상) */
    @media (min-width: 1024px) {
      .container {
        max-width: 960px;
      }
      
      .grid {
        grid-template-columns: repeat(3, 1fr); /* 3 컬럼 */
        gap: 2rem;
      }
    }
    
    /* 대형 데스크톱 (1280px 이상) */
    @media (min-width: 1280px) {
      .container {
        max-width: 1200px;
      }
    }
    
    /* 다크모드 */
    @media (prefers-color-scheme: dark) {
      body {
        background: #1a1a1a;
        color: #fff;
      }
    }
    
    /* 축소된 모션 (접근성) */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
        transition: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="grid">
      <div>카드 1</div>
      <div>카드 2</div>
      <div>카드 3</div>
    </div>
  </div>
</body>
</html>

console.log('반응형 레이아웃 완료');`}
        />

        <InfoCard type="tip" title="모바일 퍼스트 원칙">
          <ul>
            <li>
              <strong>기본 스타일:</strong> 모바일용 (작은 화면)
            </li>
            <li>
              <strong>min-width:</strong> 화면이 커질수록 추가 스타일
            </li>
            <li>
              <strong>성능:</strong> 모바일에 불필요한 CSS 로드 방지
            </li>
            <li>
              <strong>접근성:</strong> prefers-* 미디어 쿼리 활용
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>박스 모델:</strong> content, padding, border, margin
          </li>
          <li>
            <strong>box-sizing:</strong> border-box 권장
          </li>
          <li>
            <strong>display:</strong> block, inline, flex, grid
          </li>
          <li>
            <strong>position:</strong> static, relative, absolute, fixed, sticky
          </li>
          <li>
            <strong>flexbox:</strong> 1 차원 레이아웃
          </li>
          <li>
            <strong>grid:</strong> 2 차원 레이아웃
          </li>
          <li>
            <strong>반응형:</strong> 모바일 퍼스트, 미디어 쿼리
          </li>
        </ul>
      </section>
    </div>
  );
}
