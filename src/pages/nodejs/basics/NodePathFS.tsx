import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function NodePathFS() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Path & File System</h1>
        <p className="page-description">
          Node.js 의 path 모듈과 fs 모듈로 파일 시스템을 다루는 방법에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>path 모듈</strong> 은 파일 경로를 처리하고,
          <strong>fs 모듈</strong> 은 파일 시스템을 조작합니다.
          이 두 모듈은 Node.js 개발에서 가장 기본적으로 사용됩니다.
        </p>

        <InfoCard type="tip" title="모듈 특징">
          <ul>
            <li>
              <strong>path:</strong> 크로스플랫폼 경로 처리 (Windows/Unix)
            </li>
            <li>
              <strong>fs:</strong> 동기/비동기 파일 조작
            </li>
            <li>
              <strong>fs/promises:</strong> Promise 기반 API (현대적)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="path-basics">1️⃣ Path 모듈 기본</h2>
        <p>
          파일 경로를 조작하는 기본 메서드입니다.
        </p>

        <CodeDemo
          title="Path 모듈 기본 메서드"
          description="join, resolve, normalize"
          defaultCode={`const path = require('path');

// 1. path.join - 경로 결합 (구분자 자동 처리)
console.log("path.join('src', 'app.js'):", path.join('src', 'app.js'));
// 'src/app.js' (Unix), 'src\\app.js' (Windows)

console.log("path.join('src/', '/app.js'):", path.join('src/', '/app.js'));
// 'src/app.js' (중복 구분자 제거)

// 2. path.resolve - 절대 경로 생성
console.log("path.resolve('src', 'app.js'):", path.resolve('src', 'app.js'));
// '/home/user/project/src/app.js'

console.log("path.resolve():", path.resolve());
// 현재 작업 디렉토리

// 3. path.normalize - 경로 정규화
console.log("path.normalize('src//app.js'):", path.normalize('src//app.js'));
// 'src/app.js'

console.log("path.normalize('src/../dist'):", path.normalize('src/../dist'));
// 'dist'

// 4. path.sep - 플랫폼별 구분자
console.log('path.sep:', path.sep);  // '/' 또는 '\\'

// 5. path.delimiter - 환경 변수 구분자
console.log('path.delimiter:', path.delimiter);  // ':' 또는 ';'

// 6. 실제 활용 - 프로젝트 경로
const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');
const distDir = path.join(projectRoot, 'dist');

console.log('프로젝트 루트:', projectRoot);
console.log('src 디렉토리:', srcDir);
console.log('dist 디렉토리:', distDir);

console.log('Path 기본 예시 완료');`}
        />

        <InfoCard type="tip" title="__dirname 과 __filename">
          <ul>
            <li>
              <code>__dirname</code>: 현재 파일의 디렉토리 경로
            </li>
            <li>
              <code>__filename</code>: 현재 파일의 절대 경로
            </li>
            <li>
              ES Modules 에서는 <code>import.meta.url</code> 사용
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="path-advanced">2️⃣ Path 모듈 심화</h2>
        <p>
          경로에서 파일 정보를 추출합니다.
        </p>

        <CodeDemo
          title="Path 모듈 심화 메서드"
          description="basename, extname, dirname, parse"
          defaultCode={`const path = require('path');

const filePath = '/home/user/projects/app/src/index.js';

// 1. path.basename - 파일명 추출
console.log("path.basename(filePath):", path.basename(filePath));
// 'index.js'

console.log("path.basename(filePath, '.js'):", path.basename(filePath, '.js'));
// 'index'

// 2. path.extname - 확장자 추출
console.log("path.extname(filePath):", path.extname(filePath));
// '.js'

console.log("path.extname('archive.tar.gz'):", path.extname('archive.tar.gz'));
// '.gz'

// 3. path.dirname - 디렉토리 경로 추출
console.log("path.dirname(filePath):", path.dirname(filePath));
// '/home/user/projects/app/src'

// 4. path.parse - 경로 분석 (객체 반환)
const parsed = path.parse(filePath);
console.log('parsed:', parsed);
/*
{
  root: '/',
  dir: '/home/user/projects/app/src',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}
*/

// 5. path.format - 객체를 경로로 변환
const formatted = path.format({
  dir: '/home/user',
  base: 'file.txt'
});
console.log('formatted:', formatted);  // '/home/user/file.txt'

// 6. path.relative - 상대 경로 계산
const from = '/home/user/projects';
const to = '/home/user/projects/app/src';
console.log("path.relative(from, to):", path.relative(from, to));
// 'app/src'

// 7. path.isAbsolute - 절대 경로 확인
console.log("path.isAbsolute('/src'):", path.isAbsolute('/src'));  // true
console.log("path.isAbsolute('src'):", path.isAbsolute('src'));  // false

// 8. 실제 활용 - 파일명 변경
function renameFile(filePath, newExt) {
  const { dir, name } = path.parse(filePath);
  return path.format({ dir, name, ext: newExt });
}

console.log('변경:', renameFile('/src/app.js', '.ts'));  // '/src/app.ts'

console.log('Path 심화 예시 완료');`}
        />
      </section>

      <section className="content-section">
        <h2 id="fs-read">3️⃣ FS 모듈 - 파일 읽기</h2>
        <p>
          파일을 읽는 세 가지 방법 (동기, 비동기 콜백, Promise) 을 비교합니다.
        </p>

        <CodeDemo
          title="파일 읽기 메서드"
          description="readFileSync, readFile, promises.readFile"
          defaultCode={`const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, 'example.txt');

// ============================================
// 1. 동기 읽기 (간단한 스크립트)
// ============================================
// try {
//   const content = fs.readFileSync(filePath, 'utf8');
//   console.log('동기 읽기:', content);
// } catch (error) {
//   console.error('읽기 실패:', error.message);
// }

// ============================================
// 2. 비동기 읽기 (콜백)
// ============================================
// fs.readFile(filePath, 'utf8', (error, content) => {
//   if (error) {
//     console.error('읽기 실패:', error.message);
//     return;
//   }
//   console.log('비동기 읽기:', content);
// });

// ============================================
// 3. Promise 기반 읽기 (권장)
// ============================================
async function readExample() {
  try {
    const content = await fsPromises.readFile(filePath, 'utf8');
    console.log('Promise 읽기:', content);
  } catch (error) {
    console.error('읽기 실패:', error.message);
  }
}

// readExample();

// 4. 인코딩 옵션
// 'utf8' (텍스트), null (Buffer), 'base64' 등
const buffer = fs.readFileSync(filePath);  // Buffer 반환
const text = fs.readFileSync(filePath, 'utf8');  // 문자열 반환

// 5. 실제 활용 - JSON 파일 읽기
async function readJSON(filePath) {
  const content = await fsPromises.readFile(filePath, 'utf8');
  return JSON.parse(content);
}

// const config = await readJSON('./config.json');

// 6. 대용량 파일 - 스트림 (성능 최적화)
// const readable = fs.createReadStream(filePath, {
//   encoding: 'utf8',
//   highWaterMark: 1024  // 청크 크기
// });
//
// readable.on('data', (chunk) => {
//   console.log('청크:', chunk);
// });

console.log('FS 읽기 예시 완료');`}
        />

        <InfoCard type="warning" title="동기 vs 비동기">
          <ul>
            <li>
              <strong>동기:</strong> 블로킹, 간단한 스크립트만
            </li>
            <li>
              <strong>비동기:</strong> 논블로킹, 서버 애플리케이션
            </li>
            <li>
              <strong>Promise:</strong> async/await 와 함께 사용 (권장)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="fs-write">4️⃣ FS 모듈 - 파일 쓰기</h2>
        <p>
          파일을 생성하고 내용을 씁니다.
        </p>

        <CodeDemo
          title="파일 쓰기 메서드"
          description="writeFile, appendFile, stream"
          defaultCode={`const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, 'output.txt');

// ============================================
// 1. 파일 쓰기 (존재하면 덮어쓰기)
// ============================================
async function writeExample() {
  try {
    await fsPromises.writeFile(filePath, 'Hello, World!', 'utf8');
    console.log('쓰기 완료');
  } catch (error) {
    console.error('쓰기 실패:', error.message);
  }
}

// writeExample();

// ============================================
// 2. 파일 추가 (append)
// ============================================
async function appendExample() {
  try {
    await fsPromises.appendFile(filePath, '\\n추가 내용', 'utf8');
    console.log('추가 완료');
  } catch (error) {
    console.error('추가 실패:', error.message);
  }
}

// appendExample();

// ============================================
// 3. 옵션 지정
// ============================================
// fsPromises.writeFile(filePath, 'content', {
//   encoding: 'utf8',
//   mode: 0o644,  // 권한 (rw-r--r--)
//   flag: 'w',    // 'w': 쓰기, 'wx': 배타적 쓰기
// });

// ============================================
// 4. 대용량 쓰기 - 스트림
// ============================================
// const writable = fs.createWriteStream(filePath);
//
// writable.write('첫 번째 줄\\n');
// writable.write('두 번째 줄\\n');
// writable.end();  // 스트림 종료
//
// writable.on('finish', () => {
//   console.log('스트림 쓰기 완료');
// });

// ============================================
// 5. 백업 생성
// ============================================
async function createBackup(filePath) {
  const content = await fsPromises.readFile(filePath, 'utf8');
  const backupPath = filePath + '.bak';
  await fsPromises.writeFile(backupPath, content, 'utf8');
  console.log(\`백업 생성: \${backupPath}\`);
}

// createBackup('./important.txt');

// ============================================
// 6. 원자적 쓰기 (atomic write)
// ============================================
async function atomicWrite(filePath, content) {
  const tempPath = filePath + '.tmp';
  
  try {
    // 임시 파일에 쓰기
    await fsPromises.writeFile(tempPath, content, 'utf8');
    // 원본으로 이동 (원자적 연산)
    await fsPromises.rename(tempPath, filePath);
    console.log('원자적 쓰기 완료');
  } catch (error) {
    // 실패 시 임시 파일 정리
    await fsPromises.unlink(tempPath).catch(() => {});
    throw error;
  }
}

console.log('FS 쓰기 예시 완료');`}
        />

        <InfoCard type="tip" title="원자적 쓰기">
          <p>
            중요한 파일은 <strong>임시 파일에 쓴 후 rename</strong>하는 것이 안전합니다.
            쓰기 중 프로세스가 종료되어도 데이터 손실을 방지할 수 있습니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="fs-directory">5️⃣ FS 모듈 - 디렉토리 조작</h2>
        <p>
          디렉토리를 생성, 삭제, 조회합니다.
        </p>

        <CodeDemo
          title="디렉토리 조작 메서드"
          description="mkdir, readdir, rm"
          defaultCode={`const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const dirPath = path.join(__dirname, 'test-dir');

// ============================================
// 1. 디렉토리 생성
// ============================================
async function createDirectory() {
  try {
    // 재귀적 생성 (중첩 디렉토리)
    await fsPromises.mkdir(dirPath, { recursive: true });
    console.log('디렉토리 생성 완료');
  } catch (error) {
    console.error('생성 실패:', error.message);
  }
}

// createDirectory();

// ============================================
// 2. 디렉토리 내용 조회
// ============================================
async function listDirectory(dir) {
  try {
    const files = await fsPromises.readdir(dir, { withFileTypes: true });
    
    files.forEach((file) => {
      const type = file.isDirectory() ? 'DIR' : 'FILE';
      console.log(\`[\${type}]\`, file.name);
    });
    
    return files;
  } catch (error) {
    console.error('조회 실패:', error.message);
  }
}

// listDirectory(__dirname);

// ============================================
// 3. 재귀적 파일 목록
// ============================================
async function walkDirectory(dir, indent = 0) {
  const files = await fsPromises.readdir(dir, { withFileTypes: true });
  const prefix = '  '.repeat(indent);
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    console.log(\`\${prefix}\${file.name}\`);
    
    if (file.isDirectory()) {
      await walkDirectory(fullPath, indent + 1);
    }
  }
}

// walkDirectory(__dirname);

// ============================================
// 4. 디렉토리 삭제
// ============================================
async function removeDirectory(dir) {
  try {
    // 재귀적 삭제 (Node.js 14.14+)
    await fsPromises.rm(dir, { recursive: true, force: true });
    console.log('디렉토리 삭제 완료');
  } catch (error) {
    console.error('삭제 실패:', error.message);
  }
}

// removeDirectory(dirPath);

// ============================================
// 5. 디렉토리 존재 확인
// ============================================
async function ensureDirectory(dir) {
  try {
    await fsPromises.access(dir);
    console.log('디렉토리 존재함');
    return true;
  } catch {
    console.log('디렉토리 없음, 생성');
    await fsPromises.mkdir(dir, { recursive: true });
    return false;
  }
}

console.log('디렉토리 조작 예시 완료');`}
        />
      </section>

      <section className="content-section">
        <h2 id="fs-file-ops">6️⃣ FS 모듈 - 파일 조작</h2>
        <p>
          파일 복사, 이동, 삭제, 정보 조회입니다.
        </p>

        <CodeDemo
          title="파일 조작 메서드"
          description="copyFile, rename, unlink, stat"
          defaultCode={`const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const srcFile = path.join(__dirname, 'source.txt');
const destFile = path.join(__dirname, 'dest.txt');

// ============================================
// 1. 파일 복사
// ============================================
async function copyExample() {
  try {
    await fsPromises.copyFile(srcFile, destFile);
    console.log('복사 완료');
  } catch (error) {
    console.error('복사 실패:', error.message);
  }
}

// copyExample();

// ============================================
// 2. 파일 이동 (이름 변경)
// ============================================
async function moveExample() {
  try {
    await fsPromises.rename(destFile, path.join(__dirname, 'moved.txt'));
    console.log('이동 완료');
  } catch (error) {
    console.error('이동 실패:', error.message);
  }
}

// moveExample();

// ============================================
// 3. 파일 삭제
// ============================================
async function deleteExample() {
  try {
    await fsPromises.unlink(destFile);
    console.log('삭제 완료');
  } catch (error) {
    console.error('삭제 실패:', error.message);
  }
}

// deleteExample();

// ============================================
// 4. 파일 정보 조회
// ============================================
async function statExample() {
  try {
    const stats = await fsPromises.stat(srcFile);
    
    console.log('파일 크기:', stats.size, 'bytes');
    console.log('생성 시간:', stats.birthtime);
    console.log('수정 시간:', stats.mtime);
    console.log('파일인가?', stats.isFile());
    console.log('디렉토리인가?', stats.isDirectory());
  } catch (error) {
    console.error('정보 조회 실패:', error.message);
  }
}

// statExample();

// ============================================
// 5. 실제 활용 - 파일 크기 포맷팅
// ============================================
function formatFileSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  let size = bytes;
  
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  
  return \`\${size.toFixed(2)} \${units[i]}\`;
}

// const size = formatFileSize(1234567);
// console.log('포맷:', size);  // '1.18 MB'

// ============================================
// 6. 실제 활용 - 임시 파일 생성
// ============================================
async function createTempFile(prefix = 'tmp') {
  const tempDir = require('os').tmpdir();
  const random = Math.random().toString(36).substring(2, 8);
  const tempPath = path.join(tempDir, \`\${prefix}-\${random}\`);
  
  await fsPromises.writeFile(tempPath, '', 'utf8');
  return tempPath;
}

// const tempFile = await createTempFile();
// console.log('임시 파일:', tempFile);

console.log('파일 조작 예시 완료');`}
        />

        <InfoCard type="tip" title="파일 권한 (mode)">
          <p>
            <code>0o644</code>: 소유자 읽기/쓰기, 그룹 읽기, 기타 읽기
            <br />
            <code>0o755</code>: 소유자 읽기/쓰기/실행, 그룹/기타 읽기/실행
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>path.join:</strong> 경로 결합, <strong>path.resolve:</strong> 절대 경로
          </li>
          <li>
            <strong>path.basename:</strong> 파일명, <strong>path.extname:</strong> 확장자
          </li>
          <li>
            <strong>fs.readFile:</strong> 읽기, <strong>fs.writeFile:</strong> 쓰기
          </li>
          <li>
            <strong>동기/비동기:</strong> 서버에서는 비동기 (Promise) 사용
          </li>
          <li>
            <strong>스트림:</strong> 대용량 파일 처리
          </li>
          <li>
            <strong>mkdir recursive:</strong> 중첩 디렉토리 생성
          </li>
          <li>
            <strong>원자적 쓰기:</strong> 임시 파일 → rename
          </li>
        </ul>
      </section>
    </div>
  );
}