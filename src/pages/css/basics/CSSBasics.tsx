import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function CSSBasics() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>CSS 기초</h1>
        <p className="page-description">
          CSS(Cascading Style Sheets) 의 기본 개념과 선택자에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>CSS</strong> 는 HTML 요소의 스타일 (색상, 크기, 레이아웃 등) 을 정의하는 언어입니다.
          웹 페이지의 시각적 표현을 담당합니다.
        </p>

        <InfoCard type="tip" title="CSS 특징">
          <ul>
            <li>
              <strong>캐스케이딩:</strong> 여러 규칙이 계층적으로 적용
            </li>
            <li>
              <strong>상속:</strong> 자식 요소가 부모 스타일 상속
            </li>
            <li>
              <strong>선택자:</strong> 스타일 적용할 요소 지정
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="syntax">1️⃣ CSS 문법</h2>
        <p>
          CSS 의 기본 문법 구조입니다.
        </p>

        <CodeDemo
          title="CSS 기본 문법"
          description="선택자, 속성, 값"
          defaultCode={`/* ============================================
   CSS 기본 구조
   ============================================ */
   
/* 선택자 { 속성: 값; } */
h1 {
  color: blue;
  font-size: 24px;
}

/* ============================================
   주석
   ============================================ */
/* 한 줄 주석 */

/*
  여러 줄
  주석
*/

/* ============================================
   적용 방법 1: 인라인 스타일
   ============================================ */
// <div style="color: red; font-size: 16px;">내용</div>

/* ============================================
   적용 방법 2: 내부 스타일시트
   ============================================ */
/*
<head>
  <style>
    p { color: blue; }
  </style>
</head>
*/

/* ============================================
   적용 방법 3: 외부 스타일시트 (권장)
   ============================================ */
/*
<head>
  <link rel="stylesheet" href="style.css">
</head>
*/

/* ============================================
   여러 선택자
   ============================================ */

/* 쉼표로 구분: 여러 요소에 동일 스타일 */
h1, h2, h3 {
  color: #333;
  font-family: Arial, sans-serif;
}

/* ============================================
   값의 단위
   ============================================ */
.example {
  /* 절대 단위 */
  font-size: 16px;      /* 픽셀 */
  font-size: 12pt;      /* 포인트 */
  font-size: 1cm;       /* 센티미터 */
  
  /* 상대 단위 */
  font-size: 1em;       /* 부모 요소 기준 */
  font-size: 1rem;      /* 루트 (html) 기준 */
  width: 50%;           /* 부모의 50% */
  width: 50vw;          /* 뷰포트 너비의 50% */
  height: 50vh;         /* 뷰포트 높이의 50% */
  
  /* 색상 */
  color: red;                    /* 이름 */
  color: #ff0000;                /* 16 진수 */
  color: #f00;                   /* 16 진수 (단축) */
  color: rgb(255, 0, 0);         /* RGB */
  color: rgba(255, 0, 0, 0.5);   /* RGB + 투명도 */
  color: hsl(0, 100%, 50%);      /* HSL */
}`}
        />

        <InfoCard type="tip" title="단위 비교">
          <table>
            <thead>
              <tr>
                <th>단위</th>
                <th>기준</th>
                <th>사용처</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>px</code></td>
                <td>절대적</td>
                <td>정밀한 크기</td>
              </tr>
              <tr>
                <td><code>em</code></td>
                <td>부모 font-size</td>
                <td>상대적 크기</td>
              </tr>
              <tr>
                <td><code>rem</code></td>
                <td>루트 font-size</td>
                <td>일관된 크기 (권장)</td>
              </tr>
              <tr>
                <td><code>%</code></td>
                <td>부모의 100%</td>
                <td>반응형 레이아웃</td>
              </tr>
              <tr>
                <td><code>vw/vh</code></td>
                <td>뷰포트</td>
                <td>전체 화면 기준</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="selectors">2️⃣ 선택자</h2>
        <p>
          스타일을 적용할 요소를 선택하는 방법입니다.
        </p>

        <CodeDemo
          title="CSS 선택자"
          description="기본, 클래스, ID, 속성 선택자"
          defaultCode={`<!-- HTML 예시 -->
<!--
<div id="app">
  <p class="text highlight">문단 1</p>
  <p class="text">문단 2</p>
  <span data-type="important">중요</span>
  <a href="https://example.com">링크</a>
</div>
-->

/* ============================================
   1. 기본 선택자
   ============================================ */

/* 전체 선택자 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 요소 선택자 */
p {
  color: blue;
}

/* ============================================
   2. 클래스 선택자 (.)
   ============================================ */

.text {
  font-size: 16px;
}

/* 여러 클래스 */
.highlight {
  background-color: yellow;
}

/* 여러 클래스 동시 적용 */
.text.highlight {
  font-weight: bold;
}

/* ============================================
   3. ID 선택자 (#)
   ============================================ */

#app {
  max-width: 1200px;
  margin: 0 auto;
}

/* ============================================
   4. 속성 선택자
   ============================================ */

/* 속성 존재 */
[data-type] {
  color: red;
}

/* 속성 값 일치 */
[data-type="important"] {
  font-weight: bold;
}

/* 속성 값 포함 */
[class*="text"] {
  /* text 가 포함된 클래스 */
}

/* 속성 값으로 시작 */
[href^="https"] {
  /* https 로 시작하는 링크 */
  color: green;
}

/* 속성 값으로 끝남 */
[href$=".pdf"] {
  /* .pdf 로 끝나는 링크 */
  color: red;
}

/* ============================================
   5. 가상 클래스
   ============================================ */

/* 마우스 오버 */
a:hover {
  text-decoration: underline;
}

/* 클릭 중 */
a:active {
  color: darkred;
}

/* 방문한 링크 */
a:visited {
  color: purple;
}

/* 첫 번째 자식 */
p:first-child {
  color: blue;
}

/* 마지막 자식 */
p:last-child {
  color: red;
}

/* n 번째 자식 */
li:nth-child(2n) {
  /* 짝수 번째 */
  background: #f0f0f0;
}

li:nth-child(2n+1) {
  /* 홀수 번째 */
  background: #fff;
}

/* ============================================
   6. 가상 요소
   ============================================ */

/* 첫 줄 */
p::first-line {
  font-weight: bold;
}

/* 첫 문자 */
p::first-letter {
  font-size: 2em;
}

/* trước 내용 */
p::before {
  content: "→ ";
  color: gray;
}

/* 후 내용 */
p::after {
  content: " ←";
  color: gray;
}

/* 선택된 텍스트 */
::selection {
  background: yellow;
  color: black;
}`}
        />

        <InfoCard type="warning" title="선택자 우선순위">
          <p>
            <strong>ID &gt; 클래스 &gt; 요소</strong> 순으로 우선순위가 높습니다.
            <br />
            <code>!important</code> 는 최우선 적용 (남용 금지)
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="box-model">3️⃣ 박스 모델</h2>
        <p>
          모든 HTML 요소는 사각형 박스로 구성됩니다.
        </p>

        <CodeDemo
          title="박스 모델"
          description="content, padding, border, margin"
          defaultCode={`/* ============================================
   박스 모델 구성
   ============================================ */
/*
  ┌─────────────────────────────────┐
  │           Margin                │
  │  ┌───────────────────────────┐  │
  │  │         Border            │  │
  │  │  ┌─────────────────────┐  │  │
  │  │  │      Padding        │  │  │
  │  │  │  ┌───────────────┐  │  │  │
  │  │  │  │   Content     │  │  │  │
  │  │  │  └───────────────┘  │  │  │
  │  │  └─────────────────────┘  │  │
  │  └───────────────────────────┘  │
  └─────────────────────────────────┘
*/

.box {
  /* 1. 콘텐츠 크기 */
  width: 300px;
  height: 200px;
  
  /* 2. 패딩 (콘텐츠와 테두리 사이) */
  padding: 20px;              /* 상우하좌 */
  padding: 10px 20px;         /* 상하 좌우 */
  padding: 10px 20px 30px;    /* 상 좌우 하 */
  padding: 10px 20px 30px 40px; /* 상 우 하 좌 (시계방향) */
  
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 40px;
  
  /* 3. 테두리 */
  border: 1px solid black;    /* 두께 스타일 색상 */
  border-width: 1px;
  border-style: solid;        /* solid, dashed, dotted, none */
  border-color: #333;
  
  border-top: 2px solid red;
  border-right: 2px dashed blue;
  border-bottom: 2px dotted green;
  border-left: 2px solid yellow;
  
  /* 4. 마진 (외부 여백) */
  margin: 20px;
  margin: 10px 20px;
  margin: 10px 20px 30px 40px;
  
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 30px;
  margin-left: 40px;
  
  /* 5. 마진 자동 (가운데 정렬) */
  margin: 0 auto;  /* 좌우 자동 */
  
  /* 6. 음수 마진 (겹치기) */
  margin-top: -10px;
  
  /* 7. 마진 상쇄 (인접한 수직 마진) */
  /* 위 요소 margin-bottom + 아래 요소 margin-top 중 큰 값 적용 */
}

/* ============================================
   box-sizing
   ============================================ */

/* 기본값: 콘텐츠만 크기 지정 */
.box-default {
  box-sizing: content-box;  /* width = 콘텐츠 너비 */
  /* 실제 너비 = width + padding + border */
}

/* 권장: 패딩과 테두리 포함 */
.box-border {
  box-sizing: border-box;   /* width = 콘텐츠 + 패딩 + 테두리 */
  /* 실제 너비 = width */
}

/* 전체 적용 권장 */
*, *::before, *::after {
  box-sizing: border-box;
}

/* ============================================
   디스플레이
   ============================================ */

/* 블록 요소 (전체 너비, 줄바꿈) */
div, p, h1-h6, ul, li {
  display: block;
}

/* 인라인 요소 (내용만큼, 줄바꿈 없음) */
span, a, strong, em {
  display: inline;
  /* width, height, margin-top/bottom 무시 */
}

/* 인라인 블록 (인라인 + 크기 지정 가능) */
img, input, button {
  display: inline-block;
}

/* 없음 (화면에 표시되지 않음) */
.hidden {
  display: none;
}

/* 숨김 (공간은 유지) */
.invisible {
  visibility: hidden;
}`}
        />

        <InfoCard type="tip" title="box-sizing 권장">
          <p>
            <code>box-sizing: border-box</code> 를 전체 적용하면
            <br />
            너비 계산이 직관적이고 레이아웃이 쉬워집니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="text-style">4️⃣ 텍스트 스타일</h2>
        <p>
          텍스트의 모양을 꾸밉니다.
        </p>

        <CodeDemo
          title="텍스트 스타일"
          description="font, color, align 등"
          defaultCode={`.text-style {
  /* ============================================
     폰트
     ============================================ */
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  font-weight: normal;      /* normal, bold, 100-900 */
  font-style: normal;       /* normal, italic */
  line-height: 1.5;         /* 줄 높이 (배수) */
  
  /* 단축 표기 */
  font: italic bold 16px/1.5 "Helvetica Neue", Arial;
  /* font-style font-weight font-size/line-height font-family */
  
  /* ============================================
     색상
     ============================================ */
  color: #333;
  
  /* ============================================
     정렬
     ============================================ */
  text-align: left;         /* left, center, right, justify */
  text-align: center;
  
  /* ============================================
     장식
     ============================================ */
  text-decoration: none;    /* none, underline, line-through */
  text-decoration: underline;
  text-decoration: line-through;
  
  text-decoration-color: red;
  text-decoration-style: wavy;  /* solid, double, dotted, wavy */
  text-decoration-thickness: 2px;
  
  /* ============================================
     변환
     ============================================ */
  text-transform: none;     /* none, uppercase, lowercase, capitalize */
  text-transform: uppercase;    /* 대문자 */
  text-transform: lowercase;    /* 소문자 */
  text-transform: capitalize;   /* 첫 문자 대문자 */
  
  /* ============================================
     간격
     ============================================ */
  letter-spacing: 1px;      /* 자간 */
  word-spacing: 5px;        /* 단어 간격 */
  
  /* ============================================
     들여쓰기
     ============================================ */
  text-indent: 20px;        /* 첫 줄 들여쓰기 */
  
  /* ============================================
     그림자
     ============================================ */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  /* 가로세로오프셋 블러 색상 */
  
  text-shadow: 
    1px 1px 0 red,
    2px 2px 0 blue;  /* 여러 그림자 */
  
  /* ============================================
     줄바꿈
     ============================================ */
  white-space: normal;      /* normal, nowrap, pre, pre-wrap */
  white-space: nowrap;      /* 줄바꿈 금지 */
  
  word-break: break-all;    /* 단어 중간에서도 줄바꿈 */
  word-wrap: break-word;    /* 긴 단어 줄바꿈 */
  
  /* ============================================
     말줄임
     ============================================ */
  overflow: hidden;
  text-overflow: ellipsis;  /* ... */
  white-space: nowrap;
  
  /* 여러 줄 말줄임 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`}
        />

        <InfoCard type="tip" title="웹 폰트">
          <p>
            <code>@font-face</code> 로 커스텀 폰트를 사용하거나,
            <br />
            Google Fonts 등의 서비스를 활용할 수 있습니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="background">5️⃣ 배경</h2>
        <p>
          요소의 배경을 설정합니다.
        </p>

        <CodeDemo
          title="배경 스타일"
          description="color, image, gradient"
          defaultCode={`.background {
  /* ============================================
     배경색
     ============================================ */
  background-color: #f0f0f0;
  
  /* ============================================
     배경 이미지
     ============================================ */
  background-image: url('image.jpg');
  
  /* ============================================
     배경 반복
     ============================================ */
  background-repeat: no-repeat;   /* repeat, repeat-x, repeat-y */
  
  /* ============================================
     배경 위치
     ============================================ */
  background-position: center;
  background-position: top left;
  background-position: 10px 20px;
  background-position: 50% 50%;
  
  /* ============================================
     배경 크기
     ============================================ */
  background-size: cover;     /* 요소 전체 덮기 (비율 유지) */
  background-size: contain;   /* 요소 안에 전체 표시 */
  background-size: 100% 100%; /* 늘려서 채우기 (비율 무시) */
  background-size: 200px 200px;
  
  /* ============================================
     배경 고정 (스크롤 시 고정)
     ============================================ */
  background-attachment: fixed;
  
  /* ============================================
     단축 표기
     ============================================ */
  background: #f0f0f0 url('image.jpg') no-repeat center center / cover;
  /* color image repeat position / size */
  
  /* ============================================
     그라디언트
     ============================================ */
  
  /* 선형 그라디언트 */
  background: linear-gradient(to right, red, blue);
  background: linear-gradient(90deg, red, blue);
  background: linear-gradient(to bottom right, red, blue);
  
  /* 여러 색상 */
  background: linear-gradient(90deg, red, yellow, blue);
  
  /* 각도 지정 */
  background: linear-gradient(45deg, 
    rgba(255,0,0,0.5) 0%, 
    rgba(0,255,0,0.5) 50%, 
    rgba(0,0,255,0.5) 100%
  );
  
  /* 방사형 그라디언트 */
  background: radial-gradient(circle, red, blue);
  background: radial-gradient(ellipse at center, red, blue);
  
  /* ============================================
     여러 배경 (겹쳐서 표시)
     ============================================ */
  background: 
    url('overlay.png') center center / cover,
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('background.jpg') center center / cover;
}`}
        />

        <InfoCard type="tip" title="그라디언트 활용">
          <ul>
            <li>
              <strong>linear-gradient:</strong> 선형 그라디언트
            </li>
            <li>
              <strong>radial-gradient:</strong> 방사형 그라디언트
            </li>
            <li>
              <strong>conic-gradient:</strong> 원뿔형 그라디언트
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>문법:</strong> <code>선택자 {`{ 속성: 값; }`}</code>
          </li>
          <li>
            <strong>선택자:</strong> 요소, 클래스 (<code>.</code>), ID (<code>#</code>), 속성
          </li>
          <li>
            <strong>박스 모델:</strong> content, padding, border, margin
          </li>
          <li>
            <strong>box-sizing:</strong> <code>border-box</code> 권장
          </li>
          <li>
            <strong>텍스트:</strong> font, color, text-align, text-decoration
          </li>
          <li>
            <strong>배경:</strong> background-color, image, gradient
          </li>
          <li>
            <strong>단위:</strong> px, em, rem, %, vw, vh
          </li>
        </ul>
      </section>
    </div>
  );
}