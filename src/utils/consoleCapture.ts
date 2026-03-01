/**
 * Console Capture Utility
 * console.log 출력을 캡처하여 문자열로 변환합니다.
 *
 * Web Worker 를 사용하여 사용자 코드를 메인 스레드에서 격리된 환경에서 실행합니다.
 */

export interface LogEntry {
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: number;
}

/**
 * 객체를 문자열로 변환
 */
export function stringifyValue(arg: unknown): string {
  if (typeof arg === 'object' && arg !== null) {
    try {
      return JSON.stringify(arg, null, 2);
    } catch {
      return String(arg);
    }
  }
  return String(arg);
}

/**
 * 코드 실행 결과 타입
 */
export interface CodeExecutionResult {
  success: boolean;
  output: string;
  error: string | null;
}

/**
 * Web Worker 메시지 타입
 */
interface WorkerMessage {
  type: 'execute';
  code: string;
}

interface WorkerResponse {
  success: boolean;
  output: string;
  error: string | null;
}

/**
 * JavaScript 코드를 Web Worker 에서 안전하게 실행
 *
 * Web Worker 를 사용하여 다음 이점을 제공합니다:
 * 1. 메인 스레드 블로킹 방지 (긴 실행 시간 코드도 UI 를 멈추지 않음)
 * 2. 보안 격리 (사용자 코드가 메인 스레드 접근 불가)
 * 3. 메모리 누수 방지 (Worker 종료로 정리)
 *
 * @param code - 실행할 JavaScript 코드
 * @returns 실행 결과 (성공/실패, 출력, 에러)
 */
export async function executeCode(code: string): Promise<CodeExecutionResult> {
  return new Promise((resolve) => {
    // Web Worker 생성
    // Vite 가 .worker.ts 파일을 자동으로 처리합니다
    const worker = new Worker(new URL('./codeExecutor.worker.ts', import.meta.url), {
      type: 'module',
    });

    // 실행 타임아웃 설정 (10 초)
    const timeoutId = setTimeout(() => {
      worker.terminate();
      resolve({
        success: false,
        output: '',
        error: '코드 실행 시간이 초과되었습니다 (10 초).',
      });
    }, 10000);

    // Worker 로부터 결과 수신
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      clearTimeout(timeoutId);
      worker.terminate();
      resolve(event.data);
    };

    // Worker 에러 처리
    worker.onerror = (error) => {
      clearTimeout(timeoutId);
      worker.terminate();
      resolve({
        success: false,
        output: '',
        error: `Worker 에러: ${error.message}`,
      });
    };

    // Worker 로 코드 실행 요청
    worker.postMessage({ type: 'execute', code } as WorkerMessage);
  });
}
