import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from './useQueryClient';

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * TanStack Query 프로바이더 컴포넌트
 *
 * 애플리케이션 전체에서 TanStack Query 기능을 사용할 수 있도록
 * QueryClientProvider 로 감싸는 래퍼 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 * ```
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 모드에서만 DevTools 표시 */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
