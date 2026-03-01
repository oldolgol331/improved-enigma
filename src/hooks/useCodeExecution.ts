import { useState, useCallback } from 'react';

import { executeCode, type CodeExecutionResult } from '@utils/consoleCapture';

/**
 * useCodeExecution
 * JavaScript 코드 실행을 위한 커스텀 Hook
 *
 * @example
 * ```tsx
 * const { code, output, error, isRunning, runCode, setCode, clearError } = useCodeExecution(defaultCode);
 * ```
 */
export function useCodeExecution(defaultCode: string) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // 코드 실행
  const runCode = useCallback(async () => {
    setIsRunning(true);
    setError(null);
    setOutput('');

    try {
      const result: CodeExecutionResult = await executeCode(code);
      if (result.success) {
        setOutput(result.output);
      } else {
        setError(result.error);
      }
    } catch {
      setError('알 수 없는 오류가 발생했습니다');
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  // 에러 초기화
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 출력 초기화
  const clearOutput = useCallback(() => {
    setOutput('');
  }, []);

  // 코드 리셋
  const resetCode = useCallback(() => {
    setCode(defaultCode);
    setOutput('');
    setError(null);
  }, [defaultCode]);

  return {
    // State
    code,
    output,
    error,
    isRunning,

    // Actions
    setCode,
    setOutput,
    runCode,
    clearError,
    clearOutput,
    resetCode,
  };
}

/**
 * useCodeExecution 의 옵션 타입
 */
export interface UseCodeExecutionOptions {
  /** 초기 출력값 */
  initialOutput?: string;
  /** 자동 실행 여부 */
  autoExecute?: boolean;
}

/**
 * useCodeExecution with options
 *
 * @example
 * ```tsx
 * const { code, output, error, isRunning, runCode } = useCodeExecutionWithOptions(defaultCode, {
 *   initialOutput: 'Ready',
 *   autoExecute: true
 * });
 * ```
 */
export function useCodeExecutionWithOptions(
  defaultCode: string,
  options: UseCodeExecutionOptions = {}
) {
  const { initialOutput = '', autoExecute = false } = options;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState(initialOutput);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setError(null);
    setOutput('');

    try {
      const result: CodeExecutionResult = await executeCode(code);
      if (result.success) {
        setOutput(result.output);
      } else {
        setError(result.error);
      }
    } catch {
      setError('알 수 없는 오류가 발생했습니다');
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  const clearError = useCallback(() => setError(null), []);
  const clearOutput = useCallback(() => setOutput(''), []);
  const resetCode = useCallback(() => {
    setCode(defaultCode);
    setOutput(initialOutput);
    setError(null);
  }, [defaultCode, initialOutput]);

  return {
    code,
    output,
    error,
    isRunning,
    setCode,
    setOutput,
    runCode,
    clearError,
    clearOutput,
    resetCode,
  };
}
