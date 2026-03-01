import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function HTMLBasics() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>HTML 기초</h1>
        <p className="page-description">
          HTML(HyperText Markup Language) 의 기본 구조와 태그에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>HTML</strong> 은 웹 페이지의 구조를 정의하는 마크업 언어입니다.
          태그 (tag) 를 사용하여 문서를 구성하며, 웹 브라우저가 이를 해석하여 화면에 표시합니다.
        </p>

        <InfoCard type="tip" title="HTML 특징">
          <ul>
            <li>
              <strong>마크업 언어:</strong> 문서를 구조화하고 의미를 부여
            </li>
            <li>
              <strong>태그 기반:</strong> <code>&lt;tag&gt;내용&lt;/tag&gt;</code> 형태
            </li>
            <li>
              <strong>대소문자 구분 안 함:</strong> <code>&lt;DIV&gt;</code> 와 <code>&lt;div&gt;</code> 동일
            </li>
            <li>
              <strong>중첩 가능:</strong> 태그 안에 다른 태그 포함 가능
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="structure">1️⃣ HTML 문서 구조</h2>
        <p>
          모든 HTML 문서는 기본 구조를 따릅니다.
        </p>

        <CodeDemo
          title="HTML 기본 구조"
          description="문서 타입과 루트 요소"
          defaultCode={`<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- 메타데이터 영역 -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>페이지 제목</title>
  <meta name="description" content="페이지 설명">
</head>
<body>
  <!-- 실제 콘텐츠 영역 -->
  <h1>안녕하세요!</h1>
  <p>이것은 첫 번째 HTML 페이지입니다.</p>
</body>
</html>`}
        />

        <InfoCard type="tip" title="구조 요소 설명">
          <ul>
            <li>
              <code>&lt;!DOCTYPE html&gt;</code>: HTML5 문서 선언
            </li>
            <li>
              <code>&lt;html&gt;</code>: 루트 요소, <code>lang</code> 속성으로 언어 지정
            </li>
            <li>
              <code>&lt;head&gt;</code>: 메타데이터 (타이틀, 문자셋, 스타일시트 등)
            </li>
            <li>
              <code>&lt;body&gt;</code>: 실제 표시될 콘텐츠
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="text">2️⃣ 텍스트 태그</h2>
        <p>
          문단, 제목, 강조 등 텍스트를 구성하는 태그입니다.
        </p>

        <CodeDemo
          title="텍스트 태그"
          description="heading, paragraph, emphasis"
          defaultCode={`<!-- 1. 제목 (Heading) -->
<h1>최대 제목 (페이지당 하나)</h1>
<h2>중간 제목</h2>
<h3>작은 제목</h3>
<h4>더 작은 제목</h4>
<h5>아주 작은 제목</h5>
<h6>최소 제목</h6>

<!-- 2. 문단 (Paragraph) -->
<p>이것은 문단입니다.</p>
<p>여러 문단을 만들어 내용을 구분할 수 있습니다.</p>

<!-- 3. 강조 (Emphasis) -->
<p>이것은 <strong>강조</strong>된 텍스트입니다.</p>
<p>이것은 <em>이탤릭체</em> 강조입니다.</p>
<p><b>볼드체</b> (의미 없음, 스타일만)</p>
<p><i>이탤릭</i> (의미 없음, 스타일만)</p>

<!-- 4. 기타 텍스트 태그 -->
<p><mark>마커로 표시</mark></p>
<p><small>작은 글씨</small></p>
<p><del>취소선</del> <ins>밑줄</ins></p>
<p>위 첨자: H<sub>2</sub>O</p>
<p>아래 첨자: E = mc<sup>2</sup></p>

<!-- 5. 인용과 코드 -->
<blockquote>
  <p>긴 인용문은 blockquote 를 사용합니다.</p>
</blockquote>

<p>인라인 인용: <q>짧은 인용문</q></p>

<p>코드: <code>console.log('Hello')</code></p>
<pre>
  function hello() {
    console.log('Hello');
  }
</pre>`}
        />

        <InfoCard type="warning" title="h1 태그 사용법">
          <p>
            <code>&lt;h1&gt;</code> 은 <strong>페이지당 하나</strong>만 사용하는 것이 좋습니다.
            <br />
            SEO 와 접근성에 중요합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="links">3️⃣ 링크 (Anchor)</h2>
        <p>
          다른 페이지나 리소스로 이동하는 링크를 만듭니다.
        </p>

        <CodeDemo
          title="링크 (Anchor 태그)"
          description="href, target, id 속성"
          defaultCode={`<!-- 1. 기본 링크 -->
<a href="https://www.google.com">구글로 이동</a>

<!-- 2. 새 창에서 열기 -->
<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
  새 창에서 열기
</a>

<!-- 3. 같은 페이지 내 이동 (앵커) -->
<a href="#section1">섹션 1 로 이동</a>
<a href="#section2">섹션 2 로 이동</a>

<!-- 섹션 -->
<h2 id="section1">섹션 1</h2>
<p>섹션 1 내용...</p>

<h2 id="section2">섹션 2</h2>
<p>섹션 2 내용...</p>

<!-- 4. 이메일 링크 -->
<a href="mailto:email@example.com">이메일 보내기</a>

<!-- 5. 전화번호 링크 -->
<a href="tel:+82-10-1234-5678">전화 걸기</a>

<!-- 6. 파일 다운로드 -->
<a href="/files/document.pdf" download>
  PDF 다운로드
</a>

<!-- 7. 링크 속성 -->
<a href="https://example.com"
   hreflang="ko"
   title="예제 사이트"
   rel="nofollow">
  예제 링크
</a>`}
        />

        <InfoCard type="tip" title="링크 속성">
          <ul>
            <li>
              <code>href</code>: 링크 대상 URL
            </li>
            <li>
              <code>target="_blank"</code>: 새 창/탭에서 열기
            </li>
            <li>
              <code>rel="noopener noreferrer"</code>: 보안 강화
            </li>
            <li>
              <code>download</code>: 파일 다운로드
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="images">4️⃣ 이미지</h2>
        <p>
          웹 페이지에 이미지를 삽입합니다.
        </p>

        <CodeDemo
          title="이미지 태그"
          description="src, alt, width, height"
          defaultCode={`<!-- 1. 기본 이미지 -->
<img src="image.jpg" alt="이미지 설명">

<!-- 2. 크기 지정 -->
<img src="image.jpg" alt="설명" width="300" height="200">

<!-- 3. 반응형 이미지 -->
<img src="image.jpg" alt="설명" style="max-width: 100%; height: auto;">

<!-- 4. 여러 크기 제공 (반응형) -->
<img 
  src="image-small.jpg" 
  srcset="image-small.jpg 480w, image-medium.jpg 800w, image-large.jpg 1200w"
  sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
  alt="반응형 이미지"
>

<!-- 5. 이미지와 캡션 -->
<figure>
  <img src="photo.jpg" alt="풍경 사진">
  <figcaption>그림 1. 아름다운 풍경</figcaption>
</figure>

<!-- 6. 배경 이미지 (CSS) -->
<!-- 
<div style="background-image: url('bg.jpg'); width: 400px; height: 300px;">
  콘텐츠
</div>
-->

<!-- 7. SVG 이미지 -->
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="blue" />
</svg>`}
        />

        <InfoCard type="warning" title="alt 속성 필수">
          <p>
            <code>alt</code> 속성은 <strong>접근성</strong>과 <strong>SEO</strong>에 중요합니다.
            <br />
            이미지가 표시되지 않을 때 대체 텍스트로도 사용됩니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="lists">5️⃣ 리스트</h2>
        <p>
          항목을 나열하는 리스트를 만듭니다.
        </p>

        <CodeDemo
          title="리스트 태그"
          description="unordered, ordered, description"
          defaultCode={`<!-- 1. 순서 없는 리스트 (글머리 기호) -->
<ul>
  <li>항목 1</li>
  <li>항목 2</li>
  <li>항목 3</li>
</ul>

<!-- 2. 순서 있는 리스트 (번호) -->
<ol>
  <li>첫 번째 단계</li>
  <li>두 번째 단계</li>
  <li>세 번째 단계</li>
</ol>

<!-- 3. 번호 타입 변경 -->
<ol type="A">  <!-- A, B, C... -->
  <li>항목 A</li>
  <li>항목 B</li>
</ol>

<ol type="I">  <!-- I, II, III... -->
  <li>항목 I</li>
  <li>항목 II</li>
</ol>

<ol start="5">  <!-- 5 부터 시작 -->
  <li>항목 5</li>
  <li>항목 6</li>
</ol>

<!-- 4. 중첩 리스트 -->
<ul>
  <li>프론트엔드
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>백엔드
    <ul>
      <li>Node.js</li>
      <li>Python</li>
    </ul>
  </li>
</ul>

<!-- 5. 설명 리스트 -->
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language - 웹 페이지 구조</dd>
  
  <dt>CSS</dt>
  <dd>Cascading Style Sheets - 스타일링</dd>
  
  <dt>JavaScript</dt>
  <dd>웹 페이지 동작 및 상호작용</dd>
</dl>`}
        />
      </section>

      <section className="content-section">
        <h2 id="tables">6️⃣ 테이블</h2>
        <p>
          표 형태의 데이터를 표현합니다.
        </p>

        <CodeDemo
          title="테이블 태그"
          description="table, tr, th, td"
          defaultCode={`<!-- 1. 기본 테이블 -->
<table>
  <tr>
    <th>이름</th>
    <th>나이</th>
    <th>도시</th>
  </tr>
  <tr>
    <td>홍길동</td>
    <td>25</td>
    <td>서울</td>
  </tr>
  <tr>
    <td>김철수</td>
    <td>30</td>
    <td>부산</td>
  </tr>
</table>

<!-- 2. 테이블 구조화 (권장) -->
<table>
  <thead>
    <tr>
      <th>제품</th>
      <th>가격</th>
      <th>수량</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>노트북</td>
      <td>1,000,000 원</td>
      <td>5</td>
    </tr>
    <tr>
      <td>마우스</td>
      <td>30,000 원</td>
      <td>20</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">총계</td>
      <td>25</td>
    </tr>
  </tfoot>
</table>

<!-- 3. 셀 병합 -->
<table border="1">
  <tr>
    <th colspan="2">이름과 나이</th>
    <th rowspan="2">도시</th>
  </tr>
  <tr>
    <td>홍길동</td>
    <td>25</td>
  </tr>
  <tr>
    <td>김철수</td>
    <td>30</td>
    <td>부산</td>
  </tr>
</table>

<!-- 4. 테이블 스타일링 -->
<!-- 
<style>
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #4CAF50;
  color: white;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
-->`}
        />

        <InfoCard type="tip" title="테이블 접근성">
          <ul>
            <li>
              <code>&lt;caption&gt;</code>: 테이블 제목
            </li>
            <li>
              <code>scope</code> 속성: 헤더와 데이터 연결
            </li>
            <li>
              <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tfoot&gt;</code>: 구조화
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="semantic">7️⃣ 시맨틱 HTML</h2>
        <p>
          콘텐츠의 의미를 명확히 하는 시맨틱 태그입니다.
        </p>

        <CodeDemo
          title="시맨틱 태그"
          description="header, nav, main, footer 등"
          defaultCode={`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>시맨틱 HTML 예제</title>
</head>
<body>
  <!-- 헤더 (로고, 네비게이션) -->
  <header>
    <h1>웹사이트 제목</h1>
    <nav>
      <ul>
        <li><a href="/">홈</a></li>
        <li><a href="/about">소개</a></li>
        <li><a href="/contact">연락처</a></li>
      </ul>
    </nav>
  </header>

  <!-- 메인 콘텐츠 (페이지당 하나) -->
  <main>
    <!-- 독립적인 콘텐츠 -->
    <article>
      <header>
        <h2>블로그 포스트 제목</h2>
        <p>작성일: <time datetime="2024-01-15">2024 년 1 월 15 일</time></p>
      </header>
      
      <section>
        <h3>섹션 1</h3>
        <p>콘텐츠 내용...</p>
      </section>
      
      <section>
        <h3>섹션 2</h3>
        <p>콘텐츠 내용...</p>
      </section>
      
      <footer>
        <p>작성자: 홍길동</p>
      </footer>
    </article>

    <!-- 관련 콘텐츠 그룹 -->
    <aside>
      <h3>관련 링크</h3>
      <ul>
        <li><a href="#">링크 1</a></li>
        <li><a href="#">링크 2</a></li>
      </ul>
    </aside>
  </main>

  <!-- 푸터 (저작권, 연락처) -->
  <footer>
    <p>&copy; 2024 웹사이트. All rights reserved.</p>
    <address>
      연락처: <a href="mailto:info@example.com">info@example.com</a>
    </address>
  </footer>
</body>
</html>`}
        />

        <InfoCard type="tip" title="시맨틱 태그 장점">
          <ul>
            <li>
              <strong>SEO:</strong> 검색 엔진이 콘텐츠 이해
            </li>
            <li>
              <strong>접근성:</strong> 스크린 리더가 구조 인식
            </li>
            <li>
              <strong>유지보수:</strong> 코드 가독성 향상
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>HTML 구조:</strong> <code>&lt;!DOCTYPE&gt;</code>, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, <code>&lt;body&gt;</code>
          </li>
          <li>
            <strong>텍스트:</strong> <code>&lt;h1-h6&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>
          </li>
          <li>
            <strong>링크:</strong> <code>&lt;a href&gt;</code>, <code>target</code>, <code>download</code>
          </li>
          <li>
            <strong>이미지:</strong> <code>&lt;img src alt&gt;</code>
          </li>
          <li>
            <strong>리스트:</strong> <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, <code>&lt;dl&gt;</code>
          </li>
          <li>
            <strong>테이블:</strong> <code>&lt;table&gt;</code>, <code>&lt;tr&gt;</code>, <code>&lt;th&gt;</code>, <code>&lt;td&gt;</code>
          </li>
          <li>
            <strong>시맨틱:</strong> <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;footer&gt;</code>
          </li>
        </ul>
      </section>
    </div>
  );
}