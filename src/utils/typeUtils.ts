/**
 * Type Utilities
 * TypeScript 유틸리티 함수들
 */

/**
 * 값이 null 또는 undefined 인지 확인
 */
export function isNullOrUndefined<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * 값이 존재하는지 확인 (null, undefined 제외)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * 빈 객체인지 확인
 */
export function isEmptyObject(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * 빈 문자열인지 확인 (공백 포함)
 */
export function isEmptyString(str: string | null | undefined): boolean {
  if (str === null || str === undefined) return true;
  return str.trim() === '';
}

/**
 * 배열이 비어있는지 확인
 */
export function isEmptyArray<T>(arr: T[] | null | undefined): boolean {
  if (arr === null || arr === undefined) return true;
  return arr.length === 0;
}

/**
 * 객체에서 지정된 키만 추출
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
}

/**
 * 객체에서 지정된 키 제외
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result as Omit<T, K>;
}

/**
 * 깊은 복사 (JSON 직렬화 방식)
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 안전한 JSON 파싱
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}
