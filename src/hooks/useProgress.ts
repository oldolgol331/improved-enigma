import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * 학습 진행도 타입
 */
export interface Progress {
  id: string;
  userId: string;
  pagePath: string;
  completedAt: string;
  score?: number;
}

/**
 * 학습 진행도 목록을 가져오는 Query Hook
 *
 * @example
 * ```tsx
 * const { data: progress, isLoading, error } = useProgress();
 * ```
 */
export function useProgress() {
  return useQuery({
    queryKey: ['progress'],
    // 실제 구현에서는 API 호출
    // 예: queryFn: () => fetch('/api/progress').then(res => res.json())
    queryFn: async () => {
      // 목 데이터 (실제 구현 시 제거)
      await new Promise((resolve) => setTimeout(resolve, 100));
      return [] as Progress[];
    },
  });
}

/**
 * 특정 페이지의 학습 진행도를 가져오는 Query Hook
 *
 * @param pagePath - 페이지 경로 (예: '/javascript/basics/variables-types')
 * @example
 * ```tsx
 * const { data: pageProgress } = usePageProgress('/javascript/basics/variables-types');
 * ```
 */
export function usePageProgress(pagePath: string) {
  return useQuery({
    queryKey: ['progress', pagePath],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return null as Progress | null;
    },
    // 페이지 경로가 없으면 쿼리 실행 안 함
    enabled: !!pagePath,
  });
}

/**
 * 학습 진행도를 업데이트하는 Mutation Hook
 *
 * @example
 * ```tsx
 * const { mutate: saveProgress } = useSaveProgress();
 * saveProgress({ pagePath: '/javascript/basics/variables-types', score: 100 });
 * ```
 */
export function useSaveProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (progress: Omit<Progress, 'id' | 'userId' | 'completedAt'>) => {
      // 실제 구현에서는 API 호출
      await new Promise((resolve) => setTimeout(resolve, 100));
      return {
        ...progress,
        id: crypto.randomUUID(),
        userId: 'current-user',
        completedAt: new Date().toISOString(),
      } as Progress;
    },
    // 성공 시 progress 쿼리 무효화 (최신 데이터로 refetch)
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
}
