import { useEffect, useState, useCallback } from 'react';

/**
 * useLocalStorage
 * 로컬 스토리지에 상태를 저장하고 불러오는 커스텀 Hook
 *
 * @template T 저장할 값의 타입
 * @param {string} key 로컬 스토리지 키
 * @param {T} initialValue 초기값
 * @returns {[T, (value: T) => void]} [상태, 설정함수]
 *
 * @example
 * ```tsx
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // 초기 상태에서 로컬 스토리지 읽기
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 값 설정 및 로컬 스토리지 저장
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const newValue = value instanceof Function ? value(prev) : value;

          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(newValue));
            window.dispatchEvent(new Event('local-storage'));
          }

          return newValue;
        });
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
}

/**
 * useSessionStorage
 * 세션 스토리지에 상태를 저장하고 불러오는 커스텀 Hook
 *
 * @template T 저장할 값의 타입
 * @param {string} key 세션 스토리지 키
 * @param {T} initialValue 초기값
 * @returns {[T, (value: T) => void]} [상태, 설정함수]
 *
 * @example
 * ```tsx
 * const [formData, setFormData] = useSessionStorage('form', { name: '', email: '' });
 * ```
 */
export function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);

        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
}

/**
 * usePrefersDark
 * 사용자의 시스템 다크모드 선호도를 감지하는 Hook
 *
 * @returns {boolean} 다크모드 선호 여부
 *
 * @example
 * ```tsx
 * const prefersDark = usePrefersDark();
 * ```
 */
export function usePrefersDark(): boolean {
  const [prefersDark, setPrefersDark] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersDark(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersDark;
}
