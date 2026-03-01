/**
 * Tailwind CSS 유틸리티 클래스 사용 예시 컴포넌트
 *
 * 이 컴포넌트는 Tailwind CSS 가 제대로 설정되었는지 확인하고,
 * 기존 CSS 와 Tailwind CSS 의 혼용 방법을 보여줍니다.
 */

interface TailwindDemoProps {
  title?: string;
}

export default function TailwindDemo({ title = 'Tailwind CSS Demo' }: TailwindDemoProps) {
  return (
    <div className="p-6 bg-background rounded-lg shadow-md border border-border-light">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
        <span className="px-3 py-1 text-sm bg-primary text-text-inverse rounded-md">Tailwind</span>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="p-4 bg-background-secondary rounded-md hover:shadow-lg transition-shadow duration-200">
          <div className="text-2xl mb-2">📚</div>
          <h3 className="text-sm font-medium text-text-primary mb-1">빠른 개발</h3>
          <p className="text-xs text-text-secondary">유틸리티 클래스로 빠르게 스타일링</p>
        </div>

        {/* Card 2 */}
        <div className="p-4 bg-background-secondary rounded-md hover:shadow-lg transition-shadow duration-200">
          <div className="text-2xl mb-2">🎨</div>
          <h3 className="text-sm font-medium text-text-primary mb-1">일관된 디자인</h3>
          <p className="text-xs text-text-secondary">디자인 토큰 기반 통일성 유지</p>
        </div>

        {/* Card 3 */}
        <div className="p-4 bg-background-secondary rounded-md hover:shadow-lg transition-shadow duration-200">
          <div className="text-2xl mb-2">📱</div>
          <h3 className="text-sm font-medium text-text-primary mb-1">반응형 디자인</h3>
          <p className="text-xs text-text-secondary">브레이크포인트 기반 적응형 레이아웃</p>
        </div>
      </div>

      {/* Button Examples */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Primary Button
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        >
          Secondary Button
        </button>
        <button
          type="button"
          className="px-4 py-2 border border-border-medium text-text-primary bg-background rounded-md hover:bg-bg-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-border-medium focus:ring-offset-2"
        >
          Outline Button
        </button>
      </div>

      {/* Dark Mode Support */}
      <div className="mt-6 p-4 rounded-md bg-bg-tertiary">
        <p className="text-sm text-text-secondary">
          💡 <strong>Tip:</strong> 이 컴포넌트는 Tailwind CSS 의 유틸리티 클래스를 사용하여 기존 CSS
          Variables 와 호환되도록 설계되었습니다.
        </p>
      </div>
    </div>
  );
}
