import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function HTMLSemanticStructure() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>시맨틱 구조와 레이아웃</h1>
        <p className="page-description">
          HTML5 시맨틱 태그를 사용한 의미 있는 웹 페이지 구조화 방법을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>시맨틱 HTML(Semantic HTML)</strong> 은 태그의 의미와 목적에 따라 콘텐츠를 마킹하는 것입니다.
          단순히 보이는 것뿐만 아니라 콘텐츠의 구조와 의미를 명확히 전달합니다.
        </p>

        <InfoCard type="tip" title="시맨틱 태그의 이점">
          <ul>
            <li>
              <strong>접근성:</strong> 스크린 리더 사용자가 구조 이해 용이
            </li>
            <li>
              <strong>SEO:</strong> 검색 엔진이 콘텐츠 중요도 파악
            </li>
            <li>
              <strong>유지보수:</strong> 코드 가독성 향상
            </li>
            <li>
              <strong>일관성:</strong> 개발자 간 공통 언어 제공
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="semantic-tags">1️⃣ 주요 시맨틱 태그</h2>
        <p>
          HTML5 에서 추가된 대표적인 시맨틱 태그들입니다.
        </p>

        <CodeDemo
          title="시맨틱 태그 종류"
          description="header, nav, main, article, section, aside, footer"
          defaultCode={`<!-- 시맨틱 태그 예시 -->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>시맨틱 페이지</title>
</head>
<body>
  <!-- 헤더: 로고, 네비게이션, 사이트 제목 -->
  <header>
    <h1>웹사이트 제목</h1>
    <nav>
      <ul>
        <li><a href="#home">홈</a></li>
        <li><a href="#about">소개</a></li>
        <li><a href="#contact">연락처</a></li>
      </ul>
    </nav>
  </header>

  <!-- 메인 콘텐츠: 페이지의 주요 내용 -->
  <main>
    <!-- 아티클: 독립적으로 배포 가능한 콘텐츠 -->
    <article>
      <h2>블로그 포스트 제목</h2>
      <p>게시일: <time datetime="2024-01-15">2024 년 1 월 15 일</time></p>
      <p>콘텐츠 내용...</p>
    </article>

    <!-- 섹션: 주제별로 그룹화된 콘텐츠 -->
    <section>
      <h2>관련 게시물</h2>
      <p>연관된 콘텐츠들...</p>
    </section>
  </main>

  <!-- 사이드바: 보조 콘텐츠 -->
  <aside>
    <h3>인기 게시물</h3>
    <ul>
      <li><a href="#">게시물 1</a></li>
      <li><a href="#">게시물 2</a></li>
    </ul>
  </aside>

  <!-- 푸터: 저작권, 연락처 등 -->
  <footer>
    <p>&copy; 2024 웹사이트. All rights reserved.</p>
    <address>
      연락처: <a href="mailto:info@example.com">info@example.com</a>
    </address>
  </footer>
</body>
</html>

console.log('시맨틱 태그 구조 완료');`}
        />

        <InfoCard type="warning" title="시맨틱 태그 사용 시 주의">
          <ul>
            <li>
              <strong>div 대신 의미 있는 태그:</strong> 가능한 한 시맨틱 태그 사용
            </li>
            <li>
              <strong>중복 주의:</strong> article 안에 section, section 안에 article 가능
            </li>
            <li>
              <strong>heading hierarchy:</strong> h1 → h2 → h3 순서 유지
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="document-outline">2️⃣ 문서 개요 (Document Outline)</h2>
        <p>
          올바른 제목 (heading) 레벨을 사용하여 문서의 계층 구조를 만듭니다.
        </p>

        <CodeDemo
          title="문서 개요 작성"
          description="올바른 heading 레벨 사용"
          defaultCode={`<!-- 올바른 예 -->
<body>
  <header>
    <h1>사이트 제목</h1>  <!-- 레벨 1: 페이지당 하나 -->
  </header>
  
  <main>
    <article>
      <h2>기사 제목</h2>  <!-- 레벨 2: 주요 섹션 -->
      <section>
        <h3>하위 섹션 1</h3>  <!-- 레벨 3: 하위 주제 -->
        <p>내용...</p>
      </section>
      <section>
        <h3>하위 섹션 2</h3>
        <p>내용...</p>
      </section>
    </article>
  </main>
</body>

<!-- 잘못된 예: 레벨 건너뛰기 -->
<body>
  <h1>메인 제목</h1>
  <h3>잘못된 제목</h3>  <!-- h2 를 건너뜀! -->
</body>

console.log('문서 개요 완료');`}
        />

        <InfoCard type="tip" title="Heading 레벨 가이드">
          <ul>
            <li>
              <strong>h1:</strong> 페이지/문서의 주요 제목 (하나만)
            </li>
            <li>
              <strong>h2:</strong> 주요 섹션 제목
            </li>
            <li>
              <strong>h3:</strong> 하위 섹션 제목
            </li>
            <li>
              <strong>h4-h6:</strong> 더 세분화된 섹션
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="media">3️⃣ 미디어 콘텐츠</h2>
        <p>
          이미지, 비디오, 오디오 등을 의미 있게 포함합니다.
        </p>

        <CodeDemo
          title="미디어 태그"
          description="figure, figcaption, picture, video, audio"
          defaultCode={`<!-- figure: 이미지와 캡션 그룹화 -->
<figure>
  <img src="chart.png" alt="2024 년 매출 추이 차트">
  <figcaption>그림 1. 2024 년 분기별 매출 추이</figcaption>
</figure>

<!-- picture: 반응형 이미지 (여러 소스) -->
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg">
  <source media="(min-width: 400px)" srcset="medium.jpg">
  <img src="small.jpg" alt="반응형 이미지">
</picture>

<!-- video: 비디오 재생 -->
<video controls poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <track kind="subtitles" src="subtitles.vtt" srclang="ko">
  자막을 지원하는 브라우저가 필요합니다.
</video>

<!-- audio: 오디오 재생 -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  오디오를 지원하는 브라우저가 필요합니다.
</audio>

console.log('미디어 태그 완료');`}
        />

        <InfoCard type="tip" title="미디어 접근성">
          <ul>
            <li>
              <strong>alt 속성:</strong> 이미지의 목적 설명 (필수)
            </li>
            <li>
              <strong>자막:</strong> video 에 track 태그로 추가
            </li>
            <li>
              <strong>controls 속성:</strong> 사용자 조작 가능하게
            </li>
            <li>
              <strong>대체 콘텐츠:</strong> 지원 안 하는 경우 대안 제공
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="data-tables">4️⃣ 데이터 테이블</h2>
        <p>
          표 형태의 데이터를 의미 있게 마킹합니다.
        </p>

        <CodeDemo
          title="시맨틱 테이블"
          description="caption, thead, tbody, tfoot, th, scope"
          defaultCode={`<table>
  <!-- 테이블 제목 -->
  <caption>2024 년 분기별 매출 현황</caption>
  
  <!-- 테이블 헤더 -->
  <thead>
    <tr>
      <th scope="col">분기</th>
      <th scope="col">매출 (억원)</th>
      <th scope="col">전년비</th>
    </tr>
  </thead>
  
  <!-- 테이블 본문 -->
  <tbody>
    <tr>
      <th scope="row">1 분기</th>
      <td>1,200</td>
      <td>+15%</td>
    </tr>
    <tr>
      <th scope="row">2 분기</th>
      <td>1,350</td>
      <td>+18%</td>
    </tr>
    <tr>
      <th scope="row">3 분기</th>
      <td>1,280</td>
      <td>+12%</td>
    </tr>
  </tbody>
  
  <!-- 테이블 푸터 (요약) -->
  <tfoot>
    <tr>
      <th scope="row">총계</th>
      <td>3,830</td>
      <td>+15%</td>
    </tr>
  </tfoot>
</table>

console.log('시맨틱 테이블 완료');`}
        />

        <InfoCard type="warning" title="테이블 접근성">
          <ul>
            <li>
              <strong>caption:</strong> 테이블 설명 (필수)
            </li>
            <li>
              <strong>scope 속성:</strong> 헤더의 범위 지정 (col/row)
            </li>
            <li>
              <strong>레이아웃용 테이블 금지:</strong> CSS 로 레이아웃
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="forms">5️⃣ 시맨틱 폼</h2>
        <p>
          폼 요소에 의미와 접근성을 추가합니다.
        </p>

        <CodeDemo
          title="접근성 있는 폼"
          description="fieldset, legend, label, aria 속성"
          defaultCode={`<form action="/submit" method="POST">
  <!-- 관련 필드 그룹화 -->
  <fieldset>
    <legend>개인 정보</legend>
    
    <div>
      <label for="name">이름 *</label>
      <input 
        type="text" 
        id="name" 
        name="name"
        required
        aria-required="true"
        autocomplete="name"
      >
    </div>
    
    <div>
      <label for="email">이메일 *</label>
      <input 
        type="email" 
        id="email" 
        name="email"
        required
        aria-required="true"
        autocomplete="email"
      >
      <small id="email-help">회사 이메일을 입력하세요</small>
    </div>
  </fieldset>
  
  <fieldset>
    <legend>관심 분야</legend>
    
    <div>
      <input type="checkbox" id="frontend" name="interest" value="frontend">
      <label for="frontend">프론트엔드</label>
    </div>
    
    <div>
      <input type="checkbox" id="backend" name="interest" value="backend">
      <label for="backend">백엔드</label>
    </div>
  </fieldset>
  
  <button type="submit">제출하기</button>
</form>

console.log('시맨틱 폼 완료');`}
        />

        <InfoCard type="tip" title="폼 접근성 체크리스트">
          <ul>
            <li>
              <strong>label:</strong> 모든 입력 필드에 연결
            </li>
            <li>
              <strong>fieldset/legend:</strong> 관련 필드 그룹화
            </li>
            <li>
              <strong>required:</strong> 필수 필드 표시
            </li>
            <li>
              <strong>autocomplete:</strong> 자동 완성 지원
            </li>
            <li>
              <strong>aria-describedby:</strong> 추가 설명 연결
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>시맨틱 태그:</strong> header, nav, main, article, section, aside, footer
          </li>
          <li>
            <strong>Heading:</strong> h1 → h6 계층 구조 유지
          </li>
          <li>
            <strong>미디어:</strong> figure, figcaption, picture, video, audio
          </li>
          <li>
            <strong>테이블:</strong> caption, thead, tbody, tfoot, scope
          </li>
          <li>
            <strong>폼:</strong> fieldset, legend, label, aria 속성
          </li>
          <li>
            <strong>접근성:</strong> 모든 사용자를 위한 웹
          </li>
        </ul>
      </section>
    </div>
  );
}
