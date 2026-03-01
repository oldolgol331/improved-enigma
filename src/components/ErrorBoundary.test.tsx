import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ErrorBoundary from './ErrorBoundary';

// 테스트용 에러 컴포넌트 - 렌더링 시 에러를 발생시킵니다
function ThrowError(): null {
  throw new Error('테스트 에러입니다');
}

describe('ErrorBoundary', () => {
  it('자식 컴포넌트에 에러가 없으면 정상적으로 렌더링한다', () => {
    render(
      <ErrorBoundary>
        <div>정상 콘텐츠</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('정상 콘텐츠')).toBeInTheDocument();
  });

  it('자식 컴포넌트에서 에러가 발생하면 폴백 UI 를 표시한다', () => {
    // console.error 를 모킹하여 테스트 출력 정리
    vi.spyOn(console, 'error').mockImplementation(() => {
      // 의도적으로 빈 구현
    });

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('문제가 발생했습니다')).toBeInTheDocument();
    expect(screen.getByText('페이지를 로드하는 중 오류가 발생했습니다.')).toBeInTheDocument();
    expect(screen.getByText('🔄 페이지 새로고침')).toBeInTheDocument();

    // 정리
    vi.restoreAllMocks();
  });

  it('커스텀 폴백이 제공되면 커스텀 폴백을 표시한다', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {
      // 의도적으로 빈 구현
    });

    const customFallback = <div data-testid="custom-fallback">커스텀 폴백</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.queryByText('문제가 발생했습니다')).not.toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it('에러 상세 정보를 토글할 수 있다', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {
      // 의도적으로 빈 구현
    });

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const details = screen.getByRole('group') as HTMLDetailsElement;
    expect(details).not.toHaveAttribute('open');

    const summary = screen.getByText('에러 상세 보기');
    summary.click();

    expect(details).toHaveAttribute('open');
    expect(screen.getByText(/테스트 에러입니다/)).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it('여러 자식 컴포넌트 중 하나에서 에러가 발생해도 캐치한다', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {
      // 의도적으로 빈 구현
    });

    render(
      <ErrorBoundary>
        <div>정상 컴포넌트</div>
        <ThrowError />
        <div>다른 컴포넌트</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('문제가 발생했습니다')).toBeInTheDocument();
    expect(screen.queryByText('정상 컴포넌트')).not.toBeInTheDocument();

    vi.restoreAllMocks();
  });
});
