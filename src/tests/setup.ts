import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor() {
    // 의도적으로 빈 구현
  }
  observe(): void {
    // 의도적으로 빈 구현
  }
  unobserve(): void {
    // 의도적으로 빈 구현
  }
  disconnect(): void {
    // 의도적으로 빈 구현
  }
} as unknown as typeof globalThis.IntersectionObserver;
