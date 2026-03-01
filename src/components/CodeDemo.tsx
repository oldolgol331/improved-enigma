import { useState, useCallback, useMemo } from 'react';

import { executeCode } from '@utils/consoleCapture';
import './CodeDemo.css';

interface CodeDemoProps {
  title: string;
  description?: string;
  defaultCode: string;
  initialOutput?: string;
  hideConsole?: boolean;
  editable?: boolean;
}

export default function CodeDemo({
  title,
  description,
  defaultCode,
  initialOutput = '',
  hideConsole = false,
  editable = true,
}: CodeDemoProps) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState(initialOutput);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // 코드 실행 핸들러 - useCallback 으로 메모이제이션
  const runCode = useCallback(async () => {
    setIsRunning(true);
    setError(null);
    setOutput('');

    try {
      const result = await executeCode(code);
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

  // 코드 초기화 핸들러 - useCallback 으로 메모이제이션
  const resetCode = useCallback(() => {
    setCode(defaultCode);
    setOutput(initialOutput);
    setError(null);
  }, [defaultCode, initialOutput]);

  // 에디터 변경 핸들러 - useCallback 으로 메모이제이션
  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  }, []);

  // 콘솔 초기화 핸들러 - useCallback 으로 메모이제이션
  const clearConsole = useCallback(() => {
    setOutput('');
  }, []);

  // 버튼 비활성화 상태 - useMemo 로 계산
  const isRunDisabled = useMemo(() => isRunning, [isRunning]);

  // 실행 버튼 텍스트 - useMemo 로 계산
  const runButtonText = useMemo(() => (isRunning ? '⏳ 실행 중...' : '▶ 실행'), [isRunning]);

  return (
    <div className="code-demo">
      <div className="code-demo-header">
        <div className="code-demo-title">
          <span className="title-icon">💻</span>
          <h3>{title}</h3>
        </div>
        <div className="code-demo-actions">
          {editable && (
            <button className="btn-reset" onClick={resetCode} title="코드 초기화" type="button">
              🔄 초기화
            </button>
          )}
          <button className="btn-run" onClick={runCode} disabled={isRunDisabled} type="button">
            {runButtonText}
          </button>
        </div>
      </div>

      {description && <p className="code-demo-description">{description}</p>}

      <div className="code-editor-wrapper">
        <div className="code-editor-header">
          <span className="editor-label">JavaScript</span>
        </div>
        {editable ? (
          <textarea
            className="code-editor"
            value={code}
            onChange={handleCodeChange}
            spellCheck={false}
            aria-label="Code editor"
          />
        ) : (
          <pre className="code-display">
            <code>{code}</code>
          </pre>
        )}
      </div>

      {!hideConsole && (
        <div className="console-wrapper">
          <div className="console-header">
            <span className="console-label">📋 Console</span>
            {output && (
              <button
                className="btn-clear"
                onClick={clearConsole}
                title="콘솔 지우기"
                type="button"
              >
                지우기
              </button>
            )}
          </div>
          <div className={`console-output ${error ? 'error' : ''}`}>
            {error ? (
              <div className="console-error">
                <span className="error-icon">❌</span>
                <pre>{error}</pre>
              </div>
            ) : (
              <pre>{output || '코드 실행 버튼을 눌러 결과를 확인하세요.'}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
