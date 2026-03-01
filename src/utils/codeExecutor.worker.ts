/**
 * Code Execution Web Worker
 *
 * 사용자 코드를 메인 스레드에서 격리된 환경에서 실행하여
 * 보안 문제와 메인 스레드 블로킹을 방지합니다.
 */

// Worker 가 수신할 메시지 타입
interface WorkerMessage {
  type: 'execute';
  code: string;
}

// Worker 가 응답할 메시지 타입
interface WorkerResponse {
  success: boolean;
  output: string;
  error: string | null;
}

/**
 * console.log 캡처용 커스텀 로그 함수 생성
 */
function createConsoleCapture(): {
  console: {
    log: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    info: (...args: unknown[]) => void;
  };
  getLogs: () => string;
  clear: () => void;
} {
  const logs: string[] = [];

  const customLog = (...args: unknown[]) => {
    logs.push(args.map(stringifyValue).join(' '));
  };

  return {
    console: {
      log: customLog,
      error: customLog,
      warn: customLog,
      info: customLog,
    },
    getLogs: () => logs.join('\n') || '(출력 결과가 없습니다)',
    clear: () => {
      logs.length = 0;
    },
  };
}

/**
 * 객체를 문자열로 변환
 */
function stringifyValue(arg: unknown): string {
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
 * 코드를 안전하게 실행
 */
function executeCode(code: string): WorkerResponse {
  const { console: customConsole, getLogs } = createConsoleCapture();

  try {
    // Function 생성자로 코드 실행

    const fn = new Function(
      'console',
      `
      return (async () => {
        ${code}
      })();
    `
    );

    fn(customConsole);

    return {
      success: true,
      output: getLogs(),
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      output: '',
      error: err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다',
    };
  }
}

/**
 * Worker 메시지 핸들러
 */
self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { type, code } = event.data;

  if (type === 'execute') {
    const result = executeCode(code);
    self.postMessage(result);
  }
};
