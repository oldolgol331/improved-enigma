import { useEffect, useState, useCallback } from 'react';

/**
 * ScrollSpy Hook 의 옵션 타입
 */
export interface UseScrollSpyOptions {
  /** 스크롤 마진 (픽셀) */
  rootMargin?: string;
  /** 관찰할 요소들의 CSS 선택자 */
  selector?: string;
  /** IntersectionObserver threshold */
  threshold?: number | number[];
}

/**
 * 목차 항목 타입
 */
export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

/**
 * useScrollSpy
 * 스크롤에 따라 활성 섹션을 감지하는 커스텀 Hook
 *
 * @example
 * ```tsx
 * const { activeId, items } = useScrollSpy({
 *   selector: 'h2, h3',
 *   rootMargin: '-100px 0px -66%'
 * });
 * ```
 */
export function useScrollSpy(options: UseScrollSpyOptions = {}) {
  const { rootMargin = '-100px 0px -66%', selector = 'h2, h3', threshold = 0 } = options;

  const [activeId, setActiveId] = useState<string>('');
  const [items, setItems] = useState<TOCItem[]>([]);

  // 목차 항목 생성
  useEffect(() => {
    const headings = document.querySelectorAll<HTMLElement>(selector);
    const tocItems: TOCItem[] = Array.from(headings)
      .filter((heading) => heading.id)
      .map((heading) => ({
        id: heading.id,
        title: heading.textContent || '',
        level: heading.tagName === 'H2' ? 2 : 3,
      }));

    setItems(tocItems);

    // IntersectionObserver 설정
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin, threshold }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [selector, rootMargin, threshold]);

  return { activeId, items };
}

/**
 * useSmoothScroll
 * 부드러운 스크롤 이동을 위한 커스텀 Hook
 *
 * @example
 * ```tsx
 * const { scrollTo } = useSmoothScroll();
 *
 * // 사용
 * scrollTo('section-id');
 * ```
 */
export function useSmoothScroll() {
  const scrollTo = useCallback((id: string, offset = 0) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - offset;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  }, []);

  return { scrollTo };
}

/**
 * useTableOfContents
 * useScrollSpy 와 useSmoothScroll 를 결합한 Hook
 *
 * @example
 * ```tsx
 * const { activeId, items, scrollTo } = useTableOfContents({
 *   selector: 'h2, h3',
 *   rootMargin: '-100px 0px -66%'
 * });
 * ```
 */
export function useTableOfContents(options: UseScrollSpyOptions = {}) {
  const { activeId, items } = useScrollSpy(options);
  const { scrollTo } = useSmoothScroll();

  const handleScrollTo = useCallback(
    (id: string) => {
      scrollTo(id, 80); // 헤더 높이만큼 오프셋
    },
    [scrollTo]
  );

  return {
    activeId,
    items,
    scrollTo: handleScrollTo,
  };
}
