import { useEffect, useCallback } from 'react';

import { useLocalStorage } from '@hooks/useStorage';

/**
 * Theme 타입
 */
export type Theme = 'light' | 'dark';

/**
 * useTheme
 * 다크모드/라이트모드 토글을 위한 커스텀 Hook
 *
 * @example
 * ```tsx
 * const { theme, toggleTheme } = useTheme();
 * ```
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  // 다크모드 적용
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  // 테마 토글
  const toggleTheme = useCallback(() => {
    setTheme((prev: Theme) => (prev === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  // 테마 직접 설정
  const setThemeMode = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme);
    },
    [setTheme]
  );

  return { theme, toggleTheme, setTheme: setThemeMode };
}
