import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function CSSFlexboxGrid() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>CSS Flexbox & Grid</h1>
        <p className="page-description">
          현대적인 CSS 레이아웃 시스템인 Flexbox 와 Grid 에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>Flexbox</strong> 는 1 차원 레이아웃 (행 또는 열) 에,
          <strong>Grid</strong> 는 2 차원 레이아웃 (행과 열 동시) 에 사용됩니다.
        </p>

        <InfoCard type="tip" title="사용 시기">
          <ul>
            <li>
              <strong>Flexbox:</strong> 네비게이션, 카드 정렬, 중앙 정렬
            </li>
            <li>
              <strong>Grid:</strong> 전체 페이지 레이아웃, 갤러리, 대시보드
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="flexbox">1️⃣ Flexbox</h2>
        <p>
          유연한 박스 레이아웃을 만듭니다.
        </p>

        <CodeDemo
          title="Flexbox"
          description="container 와 item 속성"
          defaultCode={`/* ============================================
   Flex Container
   ============================================ */
.flex-container {
  display: flex;
  
  /* ============================================
    主轴 (main axis) 방향
     ============================================ */
  flex-direction: row;          /* 기본: 왼쪽 → 오른쪽 */
  flex-direction: row-reverse;  /* 오른쪽 → 왼쪽 */
  flex-direction: column;       /* 위 → 아래 */
  flex-direction: column-reverse; /* 아래 → 위 */
  
  /* ============================================
     줄바꿈
     ============================================ */
  flex-wrap: nowrap;    /* 기본: 한 줄 */
  flex-wrap: wrap;      /* 여러 줄 */
  flex-wrap: wrap-reverse;
  
  /* 단축 표기 */
  flex-flow: row wrap;  /* flex-direction flex-wrap */
  
  /* ============================================
    主轴 정렬
     ============================================ */
  justify-content: flex-start;    /* 시작점 정렬 */
  justify-content: flex-end;      /* 끝점 정렬 */
  justify-content: center;        /* 중앙 정렬 */
  justify-content: space-between; /* 양쪽 정렬 (균등 간격) */
  justify-content: space-around;  /* 주변 간격 균등 */
  justify-content: space-evenly;  /* 모든 간격 균등 */
  
  /* ============================================
     교차축 정렬
     ============================================ */
  align-items: stretch;   /* 기본: 늘리기 */
  align-items: flex-start; /* 시작점 */
  align-items: flex-end;   /* 끝점 */
  align-items: center;     /* 중앙 */
  align-items: baseline;   /* 텍스트 기준선 */
  
  /* ============================================
     여러 줄 정렬
     ============================================ */
  align-content: flex-start;
  align-content: center;
  align-content: space-between;
}

/* ============================================
   Flex Items
   ============================================ */
.flex-item {
  /* ============================================
     순서
     ============================================ */
  order: 0;  /* 숫자가 작을수록 앞 */
  
  /* ============================================
     축소/확대
     ============================================ */
  flex-grow: 0;     /* 남는 공간 분배 (0: 안 커짐) */
  flex-shrink: 1;   /* 공간 부족 시 축소 (1: 축소함) */
  flex-basis: auto; /* 기본 크기 (auto: 콘텐츠 기준) */
  
  /* 단축 표기 */
  flex: 0 1 auto;  /* flex-grow flex-shrink flex-basis */
  flex: 1;         /* flex: 1 1 0% */
  flex: 2;         /* flex: 2 2 0% (2 배 성장) */
  
  /* ============================================
     개별 정렬
     ============================================ */
  align-self: auto;         /* 부모 align-items 따름 */
  align-self: flex-start;
  align-self: center;
  align-self: stretch;
}

/* ============================================
   Flexbox 예시
   ============================================ */

/* 1. 중앙 정렬 (완벽한 중앙) */
.center-perfect {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* 2. 네비게이션 바 */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 3. 카드 그리드 */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;  /* 간격 */
}

.card {
  flex: 1 1 300px;  /* 300px 기준, 성장/축소 가능 */
}

/* 4. Sticky Footer */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-main {
  flex: 1;  /* 남은 공간 모두 차지 */
}

/* 5. 반응형 메뉴 */
.menu {
  display: flex;
  gap: 10px;
}

@media (max-width: 768px) {
  .menu {
    flex-direction: column;
  }
}`}
        />

        <InfoCard type="tip" title="Flexbox 팁">
          <ul>
            <li>
              <code>justify-content</code>: 主轴 정렬
            </li>
            <li>
              <code>align-items</code>: 교차축 정렬
            </li>
            <li>
              <code>gap</code>: 항목 간격 (최신 브라우저)
            </li>
            <li>
              <code>flex: 1</code>: 남은 공간 균등 분배
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="grid">2️⃣ CSS Grid</h2>
        <p>
          2 차원 그리드 레이아웃을 만듭니다.
        </p>

        <CodeDemo
          title="CSS Grid"
          description="grid-template, grid-area"
          defaultCode={`/* ============================================
   Grid Container
   ============================================ */
.grid-container {
  display: grid;
  
  /* ============================================
     열과 행 정의
     ============================================ */
  grid-template-columns: 200px 200px 200px;  /* 3 열, 각각 200px */
  grid-template-rows: 100px 100px;           /* 2 행, 각각 100px */
  
  /* 반복 함수 */
  grid-template-columns: repeat(3, 1fr);     /* 3 열, 동일 너비 */
  grid-template-columns: repeat(4, 100px);   /* 4 열, 각각 100px */
  
  /* 혼합 */
  grid-template-columns: 200px 1fr 2fr;      /* 200px, 1 비율, 2 비율 */
  grid-template-columns: 100px auto 100px;   /* 100px, 자동, 100px */
  
  /* 행도 동일 */
  grid-template-rows: repeat(3, 1fr);
  grid-template-rows: 100px auto 100px;
  
  /* ============================================
     간격
     ============================================ */
  gap: 20px;              /* 행과 열 간격 */
  row-gap: 10px;          /* 행 간격 */
  column-gap: 20px;       /* 열 간격 */
  
  /* ============================================
     영역 정의 (명명된 그리드)
     ============================================ */
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  
  /* ============================================
     정렬
     ============================================ */
  justify-content: center;    /* 가로 정렬 */
  align-content: center;      /* 세로 정렬 */
  justify-items: center;      /* 항목 가로 정렬 */
  align-items: center;        /* 항목 세로 정렬 */
  place-items: center;        /* 가로 + 세로 정렬 */
}

/* ============================================
   Grid Items
   ============================================ */
.grid-item {
  /* ============================================
     위치 지정 (선 기준)
     ============================================ */
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
  
  /* 단축 표기 */
  grid-column: 1 / 3;     /* 1 번선부터 3 번선까지 */
  grid-row: 1 / 3;
  
  /* span 사용 */
  grid-column: span 2;    /* 2 칸 차지 */
  grid-row: span 2;
  
  /* ============================================
     영역 이름으로 지정
     ============================================ */
  grid-area: header;    /* 위에서 정의한 영역 이름 */
  grid-area: sidebar;
  grid-area: main;
  grid-area: footer;
}

/* ============================================
   Grid 예시
   ============================================ */

/* 1. 기본 3 컬럼 레이아웃 */
.layout-3col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* 2. 반응형 그리드 (자동 fitting) */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* 3. 전체 페이지 레이아웃 */
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* 4. 중앙 정렬 (완벽한 중앙) */
.center-grid {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

/* 5. 갤러리 */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

/* 6. 대시보드 */
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
  min-height: 100vh;
}

.sidebar {
  grid-row: 1 / -1;  /* 첫 번째부터 마지막까지 */
}

/* 7. 프랙탈 그리드 */
.complex-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  gap: 10px;
}

.item-1 {
  grid-column: 1 / span 8;
  grid-row: 1 / span 8;
}

.item-2 {
  grid-column: 9 / span 4;
  grid-row: 1 / span 4;
}`}
        />

        <InfoCard type="tip" title="Grid 팁">
          <ul>
            <li>
              <code>repeat(auto-fit, minmax(250px, 1fr))</code>: 반응형 그리드
            </li>
            <li>
              <code>grid-template-areas</code>: 직관적인 레이아웃
            </li>
            <li>
              <code>1fr</code>: 남은 공간 비율 분배
            </li>
            <li>
              <code>span n</code>: n 칸 차지
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="comparison">3️⃣ Flexbox vs Grid</h2>
        <p>
          두 레이아웃 시스템을 비교합니다.
        </p>

        <CodeDemo
          title="Flexbox vs Grid 비교"
          description="적절한 사용처"
          defaultCode={`/* ============================================
   Flexbox - 1 차원 레이아웃
   ============================================ */

/* ✅ Flexbox 가 좋은 경우 */

/* 1. 네비게이션 바 */
.nav-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 2. 카드 행 정렬 */
.card-row {
  display: flex;
  gap: 20px;
}

/* 3. 중앙 정렬 */
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* 4. 폼 요소 정렬 */
.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 5. Sticky Footer */
.page-flex {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-content {
  flex: 1;
}

/* ============================================
   Grid - 2 차원 레이아웃
   ============================================ */

/* ✅ Grid 가 좋은 경우 */

/* 1. 전체 페이지 레이아웃 */
.page-grid {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

/* 2. 갤러리/그리드 */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

/* 3. 대시보드 */
.dashboard-grid {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: 60px 1fr;
}

/* 4. 복잡한 레이아웃 */
.complex-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
}

/* ============================================
   함께 사용하기
   ============================================ */

/* Grid 로 전체 레이아웃, Flexbox 로 내부 정렬 */
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.main-content {
  display: flex;
  flex-direction: column;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}`}
        />

        <InfoCard type="tip" title="선택 가이드">
          <ul>
            <li>
              <strong>1 차원:</strong> Flexbox
            </li>
            <li>
              <strong>2 차원:</strong> Grid
            </li>
            <li>
              <strong>내용 기반:</strong> Flexbox
            </li>
            <li>
              <strong>레이아웃 기반:</strong> Grid
            </li>
            <li>
              <strong>함께 사용:</strong> Grid(전체) + Flexbox(내부)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Flexbox:</strong> 1 차원, <code>justify-content</code>, <code>align-items</code>
          </li>
          <li>
            <strong>Grid:</strong> 2 차원, <code>grid-template-columns</code>, <code>grid-area</code>
          </li>
          <li>
            <strong>반응형:</strong> <code>auto-fit</code>, <code>minmax()</code>
          </li>
          <li>
            <strong>중앙 정렬:</strong> Flexbox 또는 <code>place-items: center</code>
          </li>
          <li>
            <strong>함께 사용:</strong> Grid(전체) + Flexbox(내부)
          </li>
        </ul>
      </section>
    </div>
  );
}