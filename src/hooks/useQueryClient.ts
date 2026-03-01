import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query 클라이언트 인스턴스 생성
 *
 * 애플리케이션 전체에서 단일 인스턴스를 재사용하기 위해
 * 모듈 레벨에서 단 한 번만 생성합니다.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 기본 설정:
      // - 네트워크 오류 시 3 회 재시도
      // - 데이터는 5 분간 stale 상태로 유지
      // - 윈도우 포커스 시 refetch 하지 않음 (학습 앱 특성상)
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 분
      refetchOnWindowFocus: false,
      // 개발 모드에서는 에러를 콘솔에 로그
      throwOnError: import.meta.env.DEV,
    },
    mutations: {
      // 뮤테이션은 기본적으로 에러를 throw
      throwOnError: import.meta.env.DEV,
    },
  },
});
