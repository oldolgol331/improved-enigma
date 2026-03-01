import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function NodeStreamsWorkers() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Streams & Worker Threads</h1>
        <p className="page-description">
          Node.js 의 Stream 과 Worker Threads 로 대용량 데이터 처리와 병렬 연산을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>Stream</strong> 은 대용량 데이터를 청크 단위로 처리하며,
          <strong>Worker Threads</strong> 는 CPU 집약적 작업을 병렬로 실행합니다.
          둘 다 Node.js 성능 최적화의 핵심 기술입니다.
        </p>

        <InfoCard type="tip" title="사용 시기">
          <ul>
            <li>
              <strong>Stream:</strong> 대용량 파일, 실시간 데이터, 네트워크 통신
            </li>
            <li>
              <strong>Worker Threads:</strong> CPU 집약적 작업 (이미지 처리, 암호화, 계산)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="stream-basics">1️⃣ Stream 기본</h2>
        <p>
          Stream 은 데이터를 한 번에 한 청크씩 처리합니다.
        </p>

        <CodeDemo
          title="Stream 기본 사용법"
          description="Readable, Writable, Transform"
          defaultCode={`const fs = require('fs');
const { Readable, Writable, Transform } = require('stream');

// ============================================
// 1. Readable Stream (읽기)
// ============================================

// 파일에서 읽기
const readable = fs.createReadStream('large-file.txt', {
  highWaterMark: 1024,  // 버퍼 크기 (1KB)
  encoding: 'utf8',
});

readable.on('data', (chunk) => {
  console.log('청크 수신:', chunk.length, 'bytes');
});

readable.on('end', () => {
  console.log('읽기 완료');
});

readable.on('error', (err) => {
  console.error('읽기 에러:', err);
});

// ============================================
// 2. Writable Stream (쓰기)
// ============================================

const writable = fs.createWriteStream('output.txt');

writable.write('첫 번째 줄\\n');
writable.write('두 번째 줄\\n');
writable.write('세 번째 줄\\n');

writable.end();  // 스트림 종료

writable.on('finish', () => {
  console.log('쓰기 완료');
});

writable.on('error', (err) => {
  console.error('쓰기 에러:', err);
});

// ============================================
// 3. Pipe (연결)
// ============================================

// 읽기 → 쓰기 연결
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

// 여러 스트림 연결
readStream
  .pipe(transformStream)
  .pipe(writeStream);

// ============================================
// 4. Transform Stream (변환)
// ============================================

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const upper = chunk.toString().toUpperCase();
    this.push(upper);
    callback();
  }
});

fs.createReadStream('input.txt')
  .pipe(upperCaseTransform)
  .pipe(fs.createWriteStream('output.txt'));

// ============================================
// 5. 비동기 이터레이션 (현대적 방식)
// ============================================

async function processStream() {
  const stream = fs.createReadStream('file.txt', { encoding: 'utf8' });
  
  for await (const chunk of stream) {
    console.log('청크:', chunk);
  }
}

// processStream();

console.log('Stream 기본 예시 완료');`}
        />

        <InfoCard type="tip" title="Stream 장점">
          <ul>
            <li>
              <strong>메모리 효율:</strong> 전체 데이터를 메모리에 로드하지 않음
            </li>
            <li>
              <strong>시간 효율:</strong> 데이터 도착 즉시 처리 시작
            </li>
            <li>
              <strong>조합성:</strong> pipe 로 스트림 연결
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="stream-advanced">2️⃣ Stream 심화</h2>
        <p>
          Stream 의 고급 기능과 백프레셔 처리입니다.
        </p>

        <CodeDemo
          title="Stream 심화 활용"
          description="백프레셔와 에러 처리"
          defaultCode={`const fs = require('fs');
const { Transform } = require('stream');
const zlib = require('zlib');

// ============================================
// 1. 백프레셔 (Backpressure) 처리
// ============================================

// 느린 쓰기 → 빠른 읽기 문제 해결
function slowWrite() {
  const readable = fs.createReadStream('large-file.txt');
  const writable = fs.createWriteStream('output.txt', {
    highWaterMark: 1024,  // 작은 버퍼로 테스트
  });
  
  readable.on('data', (chunk) => {
    const canContinue = writable.write(chunk);
    
    if (!canContinue) {
      // 버퍼가 가득 참 - 읽기 일시정지
      readable.pause();
      console.log('버퍼 가득 참 - 읽기 일시정지');
    }
  });
  
  writable.on('drain', () => {
    // 버퍼가 비워짐 - 읽기 재개
    readable.resume();
    console.log('버퍼 비워짐 - 읽기 재개');
  });
}

// ============================================
// 2. pipe 와 에러 처리
// ============================================

function pipeWithErrorHandling() {
  const source = fs.createReadStream('input.txt');
  const destination = fs.createWriteStream('output.txt');
  
  source.on('error', (err) => {
    console.error('소스 에러:', err);
    destination.close();
  });
  
  destination.on('error', (err) => {
    console.error('목적지 에러:', err);
    source.destroy();
  });
  
  destination.on('finish', () => {
    console.log('파이프 완료');
  });
  
  source.pipe(destination);
}

// ============================================
// 3. gzip 압축 스트림
// ============================================

function compressFile() {
  const gzip = zlib.createGzip();
  const input = fs.createReadStream('input.txt');
  const output = fs.createWriteStream('input.txt.gz');
  
  input
    .pipe(gzip)
    .pipe(output)
    .on('finish', () => {
      console.log('압축 완료');
    });
}

// ============================================
// 4. 압축 해제 스트림
// ============================================

function decompressFile() {
  const gunzip = zlib.createGunzip();
  const input = fs.createReadStream('input.txt.gz');
  const output = fs.createWriteStream('output.txt');
  
  input
    .pipe(gunzip)
    .pipe(output)
    .on('finish', () => {
      console.log('압축 해제 완료');
    });
}

// ============================================
// 5. 커스텀 Transform Stream
// ============================================

const { Transform } = require('stream');

class LineSplitter extends Transform {
  constructor(options) {
    super(options);
    this._buffer = '';
  }
  
  _transform(chunk, encoding, callback) {
    this._buffer += chunk.toString();
    const lines = this._buffer.split('\\n');
    
    // 마지막 줄은 불완전할 수 있음
    this._buffer = lines.pop();
    
    // 완전한 줄만 전송
    for (const line of lines) {
      this.push(line + '\\n');
    }
    
    callback();
  }
  
  _flush(callback) {
    if (this._buffer) {
      this.push(this._buffer);
    }
    callback();
  }
}

// 사용 예시
fs.createReadStream('input.txt')
  .pipe(new LineSplitter())
  .pipe(fs.createWriteStream('output.txt'));

console.log('Stream 심화 예시 완료');`}
        />

        <InfoCard type="warning" title="백프레셔 주의">
          <p>
            <strong>백프레셔</strong> 는 읽기 속도가 쓰기 속도보다 빠를 때 발생합니다.
            <br />
            <code>write()</code> 의 반환값을 확인하고 <code>pause()</code>/<code>resume()</code> 으로 제어하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="worker-threads">3️⃣ Worker Threads</h2>
        <p>
          CPU 집약적 작업을 별도 스레드에서 실행합니다.
        </p>

        <CodeDemo
          title="Worker Threads 기본"
          description="별도 스레드에서 작업 실행"
          defaultCode={`const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// ============================================
// 메인 스레드 (main.js)
// ============================================

if (isMainThread) {
  // 1. 워커 생성
  const worker = new Worker(__filename, {
    workerData: { numbers: [1, 2, 3, 4, 5] },
  });
  
  // 2. 메시지 수신
  worker.on('message', (result) => {
    console.log('워커로부터 결과:', result);
  });
  
  worker.on('error', (err) => {
    console.error('워커 에러:', err);
  });
  
  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(\`워커 종료 코드: \${code}\`);
    } else {
      console.log('워커 정상 종료');
    }
  });
  
  // 3. 메시지 전송
  worker.postMessage({ type: 'start' });
  
  // 4. 워커 종료
  // worker.terminate();
  
} else {
  // ============================================
  // 워커 스레드 (동일 파일)
  // ============================================
  
  // 워커 데이터 수신
  const { numbers } = workerData;
  
  // 부모 스레드로부터 메시지 수신
  parentPort.on('message', (message) => {
    if (message.type === 'start') {
      // CPU 집약적 작업 수행
      const result = heavyComputation(numbers);
      
      // 결과 전송
      parentPort.postMessage(result);
    }
  });
}

// CPU 집약적 함수
function heavyComputation(numbers) {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += numbers.reduce((a, b) => a + b, 0);
  }
  return sum;
}

console.log('Worker Threads 기본 예시 완료');`}
        />

        <InfoCard type="tip" title="Worker Threads 사용 사례">
          <ul>
            <li>
              <strong>이미지 처리:</strong> 리사이즈, 필터 적용
            </li>
            <li>
              <strong>암호화:</strong> 해시 계산, 암호화/복호화
            </li>
            <li>
              <strong>데이터 분석:</strong> 대용량 데이터 집계
            </li>
            <li>
              <strong>JSON 파싱:</strong> 대용량 JSON 처리
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="worker-advanced">4️⃣ Worker Threads 심화</h2>
        <p>
          워커 풀과 메시지 통신 고급 기능입니다.
        </p>

        <CodeDemo
          title="Worker Threads 심화"
          description="워커 풀과 고급 통신"
          defaultCode={`const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const path = require('path');

// ============================================
// 워커 풀 (Worker Pool)
// ============================================

class WorkerPool {
  constructor(scriptPath, size = 4) {
    this.workers = [];
    this.tasks = [];
    this.workerId = 0;
    
    // 워커 생성
    for (let i = 0; i < size; i++) {
      const worker = new Worker(scriptPath);
      
      worker.on('message', (result) => {
        // 작업 완료 처리
        const { taskId, result: data } = result;
        this.tasks[taskId](null, data);
      });
      
      worker.on('error', (err) => {
        console.error('워커 에러:', err);
      });
      
      this.workers.push(worker);
    }
  }
  
  run(data) {
    return new Promise((resolve, reject) => {
      const taskId = this.tasks.length;
      this.tasks.push((err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
      
      // 라운드 로빈으로 워커 선택
      const worker = this.workers[this.workerId];
      this.workerId = (this.workerId + 1) % this.workers.length;
      
      worker.postMessage({ taskId, data });
    });
  }
  
  async shutdown() {
    await Promise.all(this.workers.map(w => w.terminate()));
  }
}

// ============================================
// 사용 예시
// ============================================

async function workerPoolExample() {
  const pool = new WorkerPool(path.join(__dirname, 'worker.js'), 4);
  
  try {
    // 여러 작업 병렬 처리
    const [result1, result2, result3] = await Promise.all([
      pool.run({ operation: 'hash', data: 'data1' }),
      pool.run({ operation: 'hash', data: 'data2' }),
      pool.run({ operation: 'hash', data: 'data3' }),
    ]);
    
    console.log('결과:', result1, result2, result3);
  } finally {
    await pool.shutdown();
  }
}

// workerPoolExample();

// ============================================
// 워커 스크립트 (worker.js)
// ============================================

/*
const { parentPort, workerData } = require('worker_threads');
const crypto = require('crypto');

parentPort.on('message', ({ taskId, data }) => {
  let result;
  
  switch (data.operation) {
    case 'hash':
      result = crypto.createHash('sha256').update(data.data).digest('hex');
      break;
    case 'fibonacci':
      result = fibonacci(data.n);
      break;
    default:
      result = 'Unknown operation';
  }
  
  parentPort.postMessage({ taskId, result });
});

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
*/

// ============================================
// Transferable Objects (메모리 복사 없음)
// ============================================

function transferExample() {
  const worker = new Worker(__filename, {
    eval: true,
  });

  // ArrayBuffer 생성
  const buffer = new ArrayBuffer(1024);
  const array = new Uint8Array(buffer);

  // 메모리 복사 없이 전송 (소유권 이전)
  worker.postMessage(buffer, [buffer]);

  worker.on('message', (result) => {
    console.log('워커 결과:', result);
  });
}

console.log('Worker Threads 심화 예시 완료');`}
        />

        <div className="worker-warning">
          <h4>Worker Threads 주의</h4>
          <ul>
            <li>
              <strong>오버헤드:</strong> 작은 작업은 메인 스레드가 더 빠름
            </li>
            <li>
              <strong>메모리:</strong> 워커당 별도 메모리 공간
            </li>
            <li>
              <strong>공유 상태:</strong> 공유 메모리 없으면 데이터 복사 필요
            </li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <h2 id="cluster">5️⃣ Cluster 모듈</h2>
        <p>
          멀티 코어를 활용한 프로세스 포킹입니다.
        </p>

        <CodeDemo
          title="Cluster 모듈"
          description="멀티 프로세스 아키텍처"
          defaultCode={`const cluster = require('cluster');
const http = require('http');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  // ============================================
  // 마스터 프로세스
  // ============================================
  
  console.log(\`마스터 프로세스 \${process.pid} 시작\`);
  
  // 워커 생성
  const workers = [];
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    workers.push(worker);
    
    worker.on('message', (message) => {
      console.log(\`워커 \${worker.process.pid} 로부터:\`, message);
    });
  }
  
  // 워커 종료 시 재생성
  cluster.on('exit', (worker, code, signal) => {
    console.log(\`워커 \${worker.process.pid} 종료 (\${code})\`);
    
    // 자동 재생성
    const newWorker = cluster.fork();
    workers[workers.indexOf(worker)] = newWorker;
  });
  
  // 워커에게 메시지 브로드캐스트
  function broadcast(message) {
    workers.forEach(w => w.send(message));
  }
  
  // 10 초마다 상태 확인
  setInterval(() => {
    broadcast({ type: 'ping' });
  }, 10000);
  
} else {
  // ============================================
  // 워커 프로세스
  // ============================================
  
  console.log(\`워커 프로세스 \${process.pid} 시작\`);
  
  // 마스터로부터 메시지 수신
  process.on('message', (message) => {
    if (message.type === 'ping') {
      process.send({ type: 'pong', pid: process.pid });
    }
  });
  
  // HTTP 서버 생성 (포트 공유)
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(\`워커 \${process.pid} 가 처리합니다\\n\`);
  }).listen(3000);
}

// ============================================
// Graceful Shutdown
// ============================================

if (cluster.isPrimary) {
  let shuttingDown = false;
  
  process.on('SIGTERM', () => {
    if (shuttingDown) return;
    shuttingDown = true;
    
    console.log('SIGTERM 수신 - 정상 종료 시작');
    
    // 모든 워커에 종료 신호
    Object.values(cluster.workers).forEach(worker => {
      worker.send('shutdown');
    });
    
    // 워커 종료 대기
    setTimeout(() => {
      Object.values(cluster.workers).forEach(worker => {
        worker.process.kill('SIGTERM');
      });
      process.exit(0);
    }, 5000);
  });
} else {
  process.on('message', (message) => {
    if (message === 'shutdown') {
      // 연결 중인 요청 처리 완료 후 종료
      server.close(() => {
        process.exit(0);
      });
    }
  });
}

console.log('Cluster 예시 완료');`}
        />

        <InfoCard type="tip" title="Cluster vs Worker Threads">
          <table>
            <thead>
              <tr>
                <th>기능</th>
                <th>Cluster</th>
                <th>Worker Threads</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>격리</td>
                <td>프로세스 (완전 격리)</td>
                <td>스레드 (메모리 공유)</td>
              </tr>
              <tr>
                <td>용도</td>
                <td>HTTP 서버, I/O</td>
                <td>CPU 집약적 작업</td>
              </tr>
              <tr>
                <td>메모리</td>
                <td>많음 (프로세스당)</td>
                <td>적음 (스레드당)</td>
              </tr>
              <tr>
                <td>통신</td>
                <td>IPC (메시지)</td>
                <td>공유 메모리 가능</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Stream:</strong> 대용량 데이터 청크 처리
          </li>
          <li>
            <strong>Readable/Writable:</strong> 읽기/쓰기 스트림
          </li>
          <li>
            <strong>Pipe:</strong> 스트림 연결, 백프레셔 처리
          </li>
          <li>
            <strong>Transform:</strong> 데이터 변환 스트림
          </li>
          <li>
            <strong>Worker Threads:</strong> CPU 집약적 작업 병렬화
          </li>
          <li>
            <strong>Worker Pool:</strong> 워커 재사용 풀
          </li>
          <li>
            <strong>Cluster:</strong> 멀티 프로세스 아키텍처
          </li>
        </ul>
      </section>
    </div>
  );
}