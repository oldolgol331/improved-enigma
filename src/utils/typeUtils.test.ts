import { describe, it, expect } from 'vitest';

import {
  isNullOrUndefined,
  isDefined,
  isEmptyObject,
  isEmptyString,
  isEmptyArray,
  pick,
  omit,
  deepClone,
  safeJsonParse,
} from '@utils/typeUtils';

describe('typeUtils', () => {
  describe('isNullOrUndefined', () => {
    it('null 이면 true 를 반환한다', () => {
      expect(isNullOrUndefined(null)).toBe(true);
    });

    it('undefined 이면 true 를 반환한다', () => {
      expect(isNullOrUndefined(undefined)).toBe(true);
    });

    it('값이 있으면 false 를 반환한다', () => {
      expect(isNullOrUndefined(0)).toBe(false);
      expect(isNullOrUndefined('')).toBe(false);
      expect(isNullOrUndefined(false)).toBe(false);
      expect(isNullOrUndefined({})).toBe(false);
      expect(isNullOrUndefined([])).toBe(false);
    });
  });

  describe('isDefined', () => {
    it('값이 있으면 true 를 반환한다', () => {
      expect(isDefined(0)).toBe(true);
      expect(isDefined('')).toBe(true);
      expect(isDefined(false)).toBe(true);
    });

    it('null 이면 false 를 반환한다', () => {
      expect(isDefined(null)).toBe(false);
    });

    it('undefined 이면 false 를 반환한다', () => {
      expect(isDefined(undefined)).toBe(false);
    });
  });

  describe('isEmptyObject', () => {
    it('빈 객체이면 true 를 반환한다', () => {
      expect(isEmptyObject({})).toBe(true);
    });

    it('속성이 있는 객체이면 false 를 반환한다', () => {
      expect(isEmptyObject({ a: 1 })).toBe(false);
    });
  });

  describe('isEmptyString', () => {
    it('빈 문자열이면 true 를 반환한다', () => {
      expect(isEmptyString('')).toBe(true);
    });

    it('null 이면 true 를 반환한다', () => {
      expect(isEmptyString(null)).toBe(true);
    });

    it('undefined 이면 true 를 반환한다', () => {
      expect(isEmptyString(undefined)).toBe(true);
    });

    it('공백만 있는 문자열이면 true 를 반환한다', () => {
      expect(isEmptyString('   ')).toBe(true);
    });

    it('값이 있는 문자열이면 false 를 반환한다', () => {
      expect(isEmptyString('hello')).toBe(false);
    });
  });

  describe('isEmptyArray', () => {
    it('빈 배열이면 true 를 반환한다', () => {
      expect(isEmptyArray([])).toBe(true);
    });

    it('null 이면 true 를 반환한다', () => {
      expect(isEmptyArray(null)).toBe(true);
    });

    it('undefined 이면 true 를 반환한다', () => {
      expect(isEmptyArray(undefined)).toBe(true);
    });

    it('요소가 있는 배열이면 false 를 반환한다', () => {
      expect(isEmptyArray([1])).toBe(false);
    });
  });

  describe('pick', () => {
    it('지정된 키만 추출한다', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = pick(obj, ['a', 'c']);
      expect(result).toEqual({ a: 1, c: 3 });
    });
  });

  describe('omit', () => {
    it('지정된 키를 제외한다', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = omit(obj, ['b']);
      expect(result).toEqual({ a: 1, c: 3 });
    });
  });

  describe('deepClone', () => {
    it('객체를 깊게 복사한다', () => {
      const obj = { a: 1, b: { c: 2 } };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.b).not.toBe(obj.b);
    });

    it('배열을 깊게 복사한다', () => {
      const arr = [1, [2, 3]];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
    });
  });

  describe('safeJsonParse', () => {
    it('유효한 JSON 을 파싱한다', () => {
      const result = safeJsonParse('{"a": 1}', {});
      expect(result).toEqual({ a: 1 });
    });

    it('무효한 JSON 이면 fallback 을 반환한다', () => {
      const result = safeJsonParse('invalid', { default: true });
      expect(result).toEqual({ default: true });
    });
  });
});
