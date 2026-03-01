import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function CSSTransitionsTransforms() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>CSS 변수, 전환, 변환</h1>
        <p className="page-description">
          CSS Custom Properties, Transitions, Transforms 를 활용한 동적 스타일링을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="css-variables">1️⃣ CSS 변수 (Custom Properties)</h2>
        <p>
          CSS 변수를 사용하면 값을 재사용하고 쉽게 변경할 수 있습니다.
        </p>

        <CodeDemo
          title="CSS 변수"
          description="선언, 사용, JavaScript 와 연동"
          defaultCode={`<!DOCTYPE html>
<html>
<head>
  <style>
    /* 1. 전역 변수 정의 (:root) */
    :root {
      --primary-color: #3b82f6;
      --secondary-color: #10b981;
      --text-color: #1e293b;
      --bg-color: #ffffff;
      --spacing-sm: 0.5rem;
      --spacing-md: 1rem;
      --spacing-lg: 2rem;
      --border-radius: 8px;
      --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    /* 2. 변수 사용 */
    .button {
      background-color: var(--primary-color);
      color: white;
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
    }
    
    /* 3. 지역 변수 (스코프 있음) */
    .card {
      --card-bg: #f8fafc;
      background-color: var(--card-bg);
    }
    
    /* 4. 폴백 값 */
    .fallback {
      color: var(--nonexistent, #000);  # 검은색 사용
    }
    
    /* 5. 다크모드 */
    .dark-mode {
      --primary-color: #2563eb;
      --text-color: #f1f5f9;
      --bg-color: #1e293b;
    }
  </style>
</head>
<body>
  <button class="button">버튼</button>
  <div class="card">카드</div>
</body>
</html>

// JavaScript 에서 변수 조작
const root = document.documentElement;

// 변수 읽기
const primary = getComputedStyle(root)
  .getPropertyValue('--primary-color');

// 변수 설정
root.style.setProperty('--primary-color', '#ef4444');

// 변수 삭제
root.style.removeProperty('--primary-color');

console.log('CSS 변수 완료');`}
        />

        <InfoCard type="tip" title="CSS 변수 장점">
          <ul>
            <li>
              <strong>재사용:</strong> 한 곳 정의, 여러 곳 사용
            </li>
            <li>
              <strong>일관성:</strong> 디자인 시스템 구축
            </li>
            <li>
              <strong>동적 변경:</strong> JavaScript 로 실시간 수정
            </li>
            <li>
              <strong>테마:</strong> 다크모드 등 테마 전환 용이
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="transitions">2️⃣ CSS Transitions</h2>
        <p>
          속성 값을 부드럽게 변경합니다.
        </p>

        <CodeDemo
          title="Transitions"
          description="부드러운 상태 변화"
          defaultCode={`<!DOCTYPE html>
<html>
<head>
  <style>
    /* 1. 기본 Transition */
    .box {
      width: 100px;
      height: 100px;
      background: #3b82f6;
      
      /* transition: 속성 지속시간 타이밍함수 지연시간 */
      transition: all 0.3s ease;
    }
    
    .box:hover {
      width: 200px;
      background: #2563eb;
    }
    
    /* 2. 여러 속성 개별 지정 */
    .multi-transition {
      transition: 
        width 0.5s ease,
        height 0.3s ease-in-out,
        background-color 0.4s ease-out 0.1s;
    }
    
    /* 3. 타이밍 함수 */
    .timing-ease { transition: width 0.5s ease; }
    .timing-linear { transition: width 0.5s linear; }
    .timing-ease-in { transition: width 0.5s ease-in; }
    .timing-ease-out { transition: width 0.5s ease-out; }
    .timing-ease-in-out { transition: width 0.5s ease-in-out; }
    .timing-cubic-bezier { 
      transition: width 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    /* 4. 버튼 호버 효과 */
    .button {
      padding: 12px 24px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    
    .button:hover {
      background: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    }
    
    .button:active {
      transform: translateY(0);
    }
  </style>
</head>
<body>
  <div class="box"></div>
  <button class="button">호버하세요</button>
</body>
</html>

console.log('Transitions 완료');`}
        />

        <InfoCard type="warning" title="Transition 주의사항">
          <ul>
            <li>
              <strong>성능:</strong> transform, opacity 는 GPU 가속
            </li>
            <li>
              <strong>피할 속성:</strong> width, height, margin (리플로우 발생)
            </li>
            <li>
              <strong>지연시간:</strong> 0.1s~0.5s 가 자연스러움
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="transforms">3️⃣ CSS Transforms</h2>
        <p>
          요소를 이동, 회전, 크기 조절합니다.
        </p>

        <CodeDemo
          title="Transforms"
          description="translate, rotate, scale, skew"
          defaultCode={`<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
    
    .box {
      width: 100px;
      height: 100px;
      background: #3b82f6;
      transition: transform 0.3s ease;
    }
    
    /* 1. 이동 (Translate) */
    .box-translate {
      transform: translate(50px, 30px);
    }
    .box-translate:hover {
      transform: translateX(100px);
    }
    
    /* 2. 회전 (Rotate) */
    .box-rotate {
      transform: rotate(45deg);
    }
    .box-rotate:hover {
      transform: rotate(180deg);
    }
    
    /* 3. 크기 조절 (Scale) */
    .box-scale {
      transform: scale(1);
    }
    .box-scale:hover {
      transform: scale(1.2);
    }
    
    /* 4. 기울이기 (Skew) */
    .box-skew {
      transform: skew(20deg, 10deg);
    }
    
    /* 5. 3D Transform */
    .box-3d {
      transform: perspective(500px) rotateY(45deg);
    }
    
    /* 6. 복합 Transform */
    .box-complex {
      transform: translate(20px, 0) rotate(15deg) scale(1.1);
    }
    
    /* 7. Transform Origin 변경 */
    .box-origin {
      transform-origin: top left;
      transform: rotate(45deg);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box box-translate">Translate</div>
    <div class="box box-rotate">Rotate</div>
    <div class="box box-scale">Scale</div>
    <div class="box box-skew">Skew</div>
  </div>
</body>
</html>

console.log('Transforms 완료');`}
        />

        <InfoCard type="tip" title="Transform 활용">
          <ul>
            <li>
              <strong>성능:</strong> GPU 가속 (컴포지트만 발생)
            </li>
            <li>
              <strong>원점:</strong> <code>transform-origin</code> 변경
            </li>
            <li>
              <strong>3D:</strong> <code>perspective</code> 추가
            </li>
            <li>
              <strong>복합:</strong> 여러 변환 조합 가능
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="animations">4️⃣ CSS Animations</h2>
        <p>
          키프레임을 사용한 애니메이션입니다.
        </p>

        <CodeDemo
          title="Animations"
          description="@keyframes, animation 속성"
          defaultCode={`<!DOCTYPE html>
<html>
<head>
  <style>
    /* 1. 키프레임 정의 */
    @keyframes slideIn {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    /* 2. 애니메이션 적용 */
    .slide {
      animation: slideIn 0.5s ease-out;
    }
    
    /* 3. 복잡한 키프레임 */
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-30px);
      }
    }
    
    .bounce {
      animation: bounce 1s ease-in-out infinite;
    }
    
    /* 4. 여러 애니메이션 */
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .multi {
      animation: 
        spin 2s linear infinite,
        pulse 1s ease-in-out infinite;
    }
    
    /* 5. Animation 속성 */
    .animated {
      animation-name: slideIn;
      animation-duration: 1s;
      animation-timing-function: ease-out;
      animation-delay: 0.2s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-fill-mode: forwards;
    }
    
    /* 6. 로딩 스피너 */
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e2e8f0;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  </style>
</head>
<body>
  <div class="slide">슬라이드 인</div>
  <div class="bounce">바운스</div>
  <div class="spinner"></div>
</body>
</html>

console.log('Animations 완료');`}
        />

        <InfoCard type="tip" title="Animation vs Transition">
          <ul>
            <li>
              <strong>Transition:</strong> 상태 변화에 반응 (호버 등)
            </li>
            <li>
              <strong>Animation:</strong> 자동 재생, 반복, 키프레임
            </li>
            <li>
              <strong>반복:</strong> Animation 은 infinite 가능
            </li>
            <li>
              <strong>제어:</strong> Animation 은 재생/일시정지 가능
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="practical">5️⃣ 실전 활용</h2>
        <p>
          실제 프로젝트에서 자주 쓰는 패턴입니다.
        </p>

        <CodeDemo
          title="실전 패턴"
          description="로딩, 모달, 토글 효과"
          defaultCode={`<!DOCTYPE html>
<html>
<head>
  <style>
    :root {
      --primary: #3b82f6;
      --transition: all 0.3s ease;
    }
    
    /* 1. 스켈레톤 로딩 */
    .skeleton {
      background: linear-gradient(
        90deg,
        #f0f0f0 25%,
        #e0e0e0 50%,
        #f0f0f0 75%
      );
      background-size: 200% 100%;
      animation: loading 1.5s ease-in-out infinite;
    }
    
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    /* 2. 모달 페이드 인 */
    .modal {
      opacity: 0;
      visibility: hidden;
      transform: scale(0.9);
      transition: var(--transition);
    }
    
    .modal.show {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
    
    /* 3. 아코디언 슬라이드 */
    .accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }
    
    .accordion-content.open {
      max-height: 500px;
    }
    
    /* 4. 다크모드 전환 */
    body {
      transition: background-color 0.3s, color 0.3s;
    }
    
    body.dark {
      background-color: #1a1a1a;
      color: #fff;
    }
    
    /* 5. 버튼 클릭 효과 */
    .btn-press {
      transition: transform 0.1s;
    }
    
    .btn-press:active {
      transform: scale(0.95);
    }
    
    /* 6. 카드 호버 효과 */
    .card {
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
  </style>
</head>
<body>
  <div class="skeleton" style="height: 20px;"></div>
  <button class="btn-press">클릭</button>
  <div class="card">카드</div>
</body>
</html>

console.log('실전 패턴 완료');`}
        />

        <InfoCard type="tip" title="성능 최적화">
          <ul>
            <li>
              <strong>GPU 가속:</strong> transform, opacity 사용
            </li>
            <li>
              <strong>will-change:</strong> 변경 예정 속성 알림
            </li>
            <li>
              <strong>최소화:</strong> 동시 애니메이션 제한
            </li>
            <li>
              <strong>접근성:</strong> prefers-reduced-motion 고려
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>CSS 변수:</strong> 재사용, 테마, 동적 변경
          </li>
          <li>
            <strong>Transitions:</strong> 부드러운 상태 변화
          </li>
          <li>
            <strong>Transforms:</strong> 이동, 회전, 크기 조절 (GPU 가속)
          </li>
          <li>
            <strong>Animations:</strong> 키프레임, 반복, 자동 재생
          </li>
          <li>
            <strong>실전:</strong> 로딩, 모달, 아코디언, 호버 효과
          </li>
          <li>
            <strong>성능:</strong> transform/opacity 우선, will-change
          </li>
        </ul>
      </section>
    </div>
  );
}
