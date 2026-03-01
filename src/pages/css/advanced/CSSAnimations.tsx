import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function CSSAnimations() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>CSS 애니메이션과 변환</h1>
        <p className="page-description">
          CSS transition, transform, animation 으로 동적인 효과를 만듭니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="transition">1️⃣ Transition (전환)</h2>
        <p>
          속성 값을 부드럽게 변경합니다.
        </p>

        <CodeDemo
          title="Transition"
          description="부드러운 속성 변화"
          defaultCode={`/* ============================================
   1. 기본 Transition
   ============================================ */
.button {
  background-color: blue;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: red;
}

/* ============================================
   2. Transition 단축 표기
   ============================================ */
/* transition: property duration timing-function delay */
.element {
  transition: all 0.3s ease-in-out 0s;
}

/* ============================================
   3. 여러 속성 전환
   ============================================ */
.card {
  transition: 
    transform 0.3s ease,
    box-shadow 0.3s ease,
    opacity 0.5s ease;
}

/* ============================================
   4. Timing Functions
   ============================================ */
.ease { transition-timing-function: ease; }
.linear { transition-timing-function: linear; }
.ease-in { transition-timing-function: ease-in; }
.ease-out { transition-timing-function: ease-out; }
.ease-in-out { transition-timing-function: ease-in-out; }

/* 커스텀 (cubic-bezier) */
.custom {
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* ============================================
   5. 실전 예시 - 버튼 호버
   ============================================ */
.btn {
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.btn:active {
  transform: translateY(0);
}

/* ============================================
   6. 실전 예시 - 카드 호버
   ============================================ */
.card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* ============================================
   7. 실전 예시 - 입력 필드 포커스
   ============================================ */
.input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

/* ============================================
   8. Transition 주의사항
   ============================================ */
/* ❌ 성능이 안 좋은 속성 */
.bad {
  transition: width 0.3s, height 0.3s, margin 0.3s;
}

/* ✅ 성능이 좋은 속성 */
.good {
  transition: transform 0.3s, opacity 0.3s;
}`}
        />

        <InfoCard type="tip" title="성능 좋은 속성">
          <ul>
            <li>
              <strong>transform:</strong> GPU 가속 사용
            </li>
            <li>
              <strong>opacity:</strong> 레이아웃 리플로우 없음
            </li>
            <li>
              <strong>피할 속성:</strong> width, height, margin, padding
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="transform">2️⃣ Transform (변환)</h2>
        <p>
          요소의 모양을 변형합니다.
        </p>

        <CodeDemo
          title="Transform"
          description="이동, 회전, 크기조절, 기울이기"
          defaultCode={`/* ============================================
   1. Translate (이동)
   ============================================ */
.translate {
  transform: translate(50px, 100px);  /* x, y */
}

.translate-x {
  transform: translateX(50px);
}

.translate-y {
  transform: translateY(-50px);
}

/* ============================================
   2. Rotate (회전)
   ============================================ */
.rotate {
  transform: rotate(45deg);  /* 시계방향 45 도 */
}

.rotate-x {
  transform: rotateX(180deg);  /* 3D X 축 회전 */
}

.rotate-y {
  transform: rotateY(180deg);  /* 3D Y 축 회전 */
}

/* ============================================
   3. Scale (크기조절)
   ============================================ */
.scale {
  transform: scale(1.5);  /* 1.5 배 */
}

.scale-x {
  transform: scaleX(2);  /* X 축 2 배 */
}

.scale-y {
  transform: scaleY(0.5);  /* Y 축 0.5 배 */
}

/* ============================================
   4. Skew (기울이기)
   ============================================ */
.skew {
  transform: skew(30deg, 10deg);  /* x, y */
}

.skew-x {
  transform: skewX(30deg);
}

/* ============================================
   5. Transform 조합
   ============================================ */
.combined {
  transform: translateX(50px) rotate(45deg) scale(1.2);
}

/* ============================================
   6. Transform Origin
   ============================================ */
.origin-center {
  transform-origin: center;  /* 기본값 */
}

.origin-top-left {
  transform-origin: top left;
}

.origin-bottom-right {
  transform-origin: bottom right;
}

.origin-custom {
  transform-origin: 50% 50%;
}

/* ============================================
   7. 실전 예시 - 로딩 스피너
   ============================================ */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* ============================================
   8. 실전 예시 - 플립 카드
   ============================================ */
.flip-card {
  width: 300px;
  height: 200px;
  perspective: 1000px;
}

.flip-card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}`}
        />

        <InfoCard type="tip" title="Transform 팁">
          <ul>
            <li>
              <strong>perspective:</strong> 3D 효과 깊이
            </li>
            <li>
              <strong>transform-style:</strong> 자식 3D 유지
            </li>
            <li>
              <strong>backface-visibility:</strong> 뒷면 표시 여부
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="animation">3️⃣ Animation (애니메이션)</h2>
        <p>
          키프레임을 사용한 복잡한 애니메이션입니다.
        </p>

        <CodeDemo
          title="Animation"
          description="keyframes, animation 속성"
          defaultCode={`/* ============================================
   1. 기본 Keyframes
   ============================================ */
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

.element {
  animation: slideIn 0.5s ease-out;
}

/* ============================================
   2. Animation 단축 표기
   ============================================ */
/* animation: name duration timing-function delay iteration-count direction fill-mode */
.element {
  animation: slideIn 0.5s ease-out 0s 1 normal forwards;
}

/* ============================================
   3. 복잡한 Keyframes
   ============================================ */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

.ball {
  animation: bounce 1s ease-in-out infinite;
}

/* ============================================
   4. Animation Direction
   ============================================ */
.normal { animation-direction: normal; }
.reverse { animation-direction: reverse; }
.alternate { animation-direction: alternate; }
.alternate-reverse { animation-direction: alternate-reverse; }

/* ============================================
   5. Animation Fill Mode
   ============================================ */
.none { animation-fill-mode: none; }
.forwards { animation-fill-mode: forwards; }  /* 마지막 상태 유지 */
.backwards { animation-fill-mode: backwards; }
.both { animation-fill-mode: both; }

/* ============================================
   6. 실전 예시 - 페이드인
   ============================================ */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}

/* ============================================
   7. 실전 예시 - 펄스
   ============================================ */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* ============================================
   8. 실전 예시 - 슬라이드업
   ============================================ */
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-up {
  animation: slideUp 0.5s ease-out;
}

/* ============================================
   9. 실전 예시 - 로딩 스케일
   ============================================ */
.loading-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  background: #007bff;
  border-radius: 50%;
  animation: scale 1.4s ease-in-out infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes scale {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* ============================================
   10. 애니메이션 제어
   ============================================ */
.element {
  animation-play-state: running;  /* 또는 paused */
}

.element:hover {
  animation-play-state: paused;
}`}
        />

        <InfoCard type="tip" title="Animation 팁">
          <ul>
            <li>
              <strong>infinite:</strong> 무한 반복
            </li>
            <li>
              <strong>forwards:</strong> 마지막 상태 유지
            </li>
            <li>
              <strong>animation-delay:</strong> 지연 시작
            </li>
            <li>
              <strong>nth-child:</strong> 순차적 애니메이션
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Transition:</strong> 속성 값 부드럽게 변경
          </li>
          <li>
            <strong>Transform:</strong> 이동, 회전, 크기조절, 기울이기
          </li>
          <li>
            <strong>Animation:</strong> keyframes 로 복잡한 애니메이션
          </li>
          <li>
            <strong>성능:</strong> transform, opacity 사용 권장
          </li>
          <li>
            <strong>접근성:</strong> prefers-reduced-motion 고려
          </li>
        </ul>
      </section>
    </div>
  );
}