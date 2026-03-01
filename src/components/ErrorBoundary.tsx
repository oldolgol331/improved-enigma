import { Component, type ErrorInfo, type ReactNode } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary 컴포넌트
 * 자식 컴포넌트에서 발생한 에러를 캐치하고 폴백 UI 를 표시합니다.
 * React 19 의 componentDidCatch 와 getDerivedStateFromError 를 사용합니다.
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * 에러 발생 시 상태를 업데이트합니다.
   * 정적 메서드로, 인스턴스 없이 호출됩니다.
   */
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * 에러 정보를 로그로 기록합니다.
   * 프로덕션에서는 에러 모니터링 서비스 (Sentry 등) 로 전송할 수 있습니다.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // 프로덕션에서는 에러 모니터링 서비스로 전송
    // if (import.meta.env.PROD) {
    //   sendToErrorMonitoringService(error, errorInfo);
    // }
  }

  /**
   * 에러 발생 시 폴백 UI 를 표시합니다.
   */
  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">❌</div>
            <h2>문제가 발생했습니다</h2>
            <p className="error-message">페이지를 로드하는 중 오류가 발생했습니다.</p>
            {error && (
              <details className="error-details">
                <summary>에러 상세 보기</summary>
                <pre>{error.toString()}</pre>
              </details>
            )}
            <button
              className="error-retry-button"
              onClick={() => window.location.reload()}
              type="button"
            >
              🔄 페이지 새로고침
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}
