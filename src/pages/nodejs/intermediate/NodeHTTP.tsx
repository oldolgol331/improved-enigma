import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function NodeHTTP() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>HTTP 서버와 Express</h1>
        <p className="page-description">
          Node.js 내장 HTTP 모듈과 Express 프레임워크로 웹 서버를 구축합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          Node.js 는 <strong>HTTP 모듈</strong> 을 내장하고 있으며, <strong>Express</strong> 는 가장
          인기 있는 웹 프레임워크입니다. Express 는 라우팅, 미들웨어, 템플릿 엔진 등을 제공합니다.
        </p>
      </section>

      <section className="content-section">
        <h2 id="http-module">1️⃣ HTTP 모듈</h2>
        <p>
          Node.js 내장 <code>http</code> 모듈로 기본 웹 서버를 만듭니다.
        </p>

        <CodeDemo
          title="HTTP 모듈 기본"
          description="내장 HTTP 모듈로 서버를 만듭니다."
          defaultCode={`// ===== 기본 HTTP 서버 =====
const http = require('http');

const server = http.createServer((req, res) => {
  // 요청 정보
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  
  // 응답 보내기
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

// ===== 라우팅 구현 =====
const server2 = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  
  // 홈 페이지
  if (url === '/' && method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Home</h1>');
  }
  // About 페이지
  else if (url === '/about' && method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>About</h1>');
  }
  // API 엔드포인트
  else if (url === '/api/users' && method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ users: ['Alice', 'Bob'] }));
  }
  // 404
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

// ===== JSON 파싱 =====
const server3 = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/data') {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      const data = JSON.parse(body);
      console.log('Received:', data);
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ received: data }));
    });
  }
});

console.log('HTTP module examples');`}
        />

        <InfoCard type="warning" title="내장 HTTP 모듈의 한계">
          <p>
            내장 HTTP 모듈은 <strong>저수준 API</strong>로, 모든 라우팅과 미들웨어를 직접 구현해야
            합니다.
            <br />
            실제 프로젝트에서는 <strong>Express</strong> 같은 프레임워크를 사용하세요!
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="express-basic">2️⃣ Express 기본</h2>
        <p>Express 는 간결한 문법으로 웹 서버를 구축할 수 있게 합니다.</p>

        <CodeDemo
          title="Express 기본"
          description="Express 로 웹 서버를 만듭니다."
          defaultCode={`// ===== Express 설치 =====
// npm install express

// ===== 기본 서버 =====
const express = require('express');
const app = express();
const PORT = 3000;

// JSON 파싱 미들웨어
app.use(express.json());

// 폼 데이터 파싱
app.use(express.urlencoded({ extended: true }));

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// API 라우트
app.get('/api/users', (req, res) => {
  res.json({ users: ['Alice', 'Bob', 'Charlie'] });
});

// 동적 라우트 (파라미터)
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, name: 'User' });
});

// 쿼리 파라미터
app.get('/search', (req, res) => {
  const { q, page = 1 } = req.query;
  res.json({ query: q, page: Number(page) });
});

// POST 요청
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ 
    id: Date.now(), 
    name, 
    email 
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});

console.log('Express basic server');`}
        />

        <InfoCard type="tip" title="Express 응답 메서드">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <code>res.send()</code>: 문자열, HTML, JSON 자동 감지
            </li>
            <li>
              <code>res.json()</code>: JSON 응답 (Content-Type 자동 설정)
            </li>
            <li>
              <code>res.sendFile()</code>: 파일 전송
            </li>
            <li>
              <code>res.redirect()</code>: 리다이렉트
            </li>
            <li>
              <code>res.status()</code>: 상태 코드 설정 (체인 가능)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="routing">3️⃣ 라우팅</h2>
        <p>Express 의 라우팅 기능을 자세히 학습합니다.</p>

        <CodeDemo
          title="Express 라우팅"
          description="다양한 라우팅 패턴입니다."
          defaultCode={`// ===== Express 라우팅 =====
const express = require('express');
const app = express();

// HTTP 메서드별 라우트
app.get('/users', (req, res) => {
  res.send('Get all users');
});

app.post('/users', (req, res) => {
  res.send('Create user');
});

app.put('/users/:id', (req, res) => {
  res.send('Update user');
});

app.delete('/users/:id', (req, res) => {
  res.send('Delete user');
});

app.patch('/users/:id', (req, res) => {
  res.send('Partial update');
});

// 라우트 파라미터
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// 파라미터 검증
app.get('/users/:id(\\d+)', (req, res) => {
  // 숫자만 허용
  res.send('Valid user ID');
});

// 여러 미들웨어
app.get('/api/data',
  (req, res, next) => {
    console.log('Middleware 1');
    next();
  },
  (req, res, next) => {
    console.log('Middleware 2');
    next();
  },
  (req, res) => {
    res.send('Data');
  }
);

// 라우터 분리 (routes/users.js)
// const express = require('express');
// const router = express.Router();

// router.get('/', (req, res) => {
//   res.json({ users: [] });
// });

// router.get('/:id', (req, res) => {
//   res.json({ id: req.params.id });
// });

// module.exports = router;

// app.js 에서 사용
// const userRoutes = require('./routes/users');
// app.use('/users', userRoutes);

console.log('Express routing patterns');`}
        />
      </section>

      <section className="content-section">
        <h2 id="middleware">4️⃣ 미들웨어</h2>
        <p>미들웨어는 요청과 응답을 처리하는 함수입니다.</p>

        <CodeDemo
          title="Express 미들웨어"
          description="미들웨어의 개념과 활용입니다."
          defaultCode={`// ===== 미들웨어 기본 =====
const express = require('express');
const app = express();

// 미들웨어 정의
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(\`[\${timestamp}] \${req.method} \${req.url}\`);
  next(); // 다음 미들웨어로 전달
};

// 전역 미들웨어
app.use(logger);

// 특정 경로에만 적용
app.use('/api', (req, res, next) => {
  console.log('API request');
  next();
});

// ===== 인증 미들웨어 =====
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const token = authHeader.split(' ')[1];
  
  // 토큰 검증 로직
  if (token === 'valid-token') {
    req.user = { id: 1, name: 'Alice' };
    next();
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// 보호된 라우트
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// ===== 에러 처리 미들웨어 =====
// 404 처리
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// 전역 에러 핸들러 (4 개의 파라미터)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message
  });
});

// ===== 서드파티 미들웨어 =====
// npm install cors morgan helmet compression
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

app.use(cors());  // CORS 허용
app.use(morgan('dev'));  // HTTP 로깅
app.use(helmet());  // 보안 헤더
app.use(compression());  // Gzip 압축

console.log('Express middleware patterns');`}
        />

        <InfoCard type="tip" title="자주 쓰는 Express 미들웨어">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <code>cors</code>: Cross-Origin Resource Sharing
            </li>
            <li>
              <code>helmet</code>: 보안 헤더 설정
            </li>
            <li>
              <code>morgan</code>: HTTP 요청 로깅
            </li>
            <li>
              <code>compression</code>: Gzip 압축
            </li>
            <li>
              <code>cookie-parser</code>: 쿠키 파싱
            </li>
            <li>
              <code>express-rate-limit</code>: Rate Limiting
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="static-files">5️⃣ 정적 파일</h2>
        <p>Express 로 이미지, CSS, JavaScript 등의 정적 파일을 제공합니다.</p>

        <CodeDemo
          title="정적 파일 제공"
          description="static 미들웨어를 사용합니다."
          defaultCode={`// ===== 정적 파일 제공 =====
const express = require('express');
const path = require('path');
const app = express();

// public 폴더를 정적 폴더로 설정
app.use(express.static('public'));

// http://localhost:3000/style.css
// http://localhost:3000/images/logo.png
// http://localhost:3000/js/app.js

// 여러 정적 폴더
app.use('/static', express.static('public'));
app.use('/uploads', express.static('uploads'));

// http://localhost:3000/static/style.css
// http://localhost:3000/uploads/photo.jpg

// 옵션 설정
app.use('/static', express.static('public', {
  maxAge: '1d',  // 캐시 1 일
  etag: true,    // ETag 생성
  lastModified: true  // Last-Modified 헤더
}));

// SPA 라우팅 (React, Vue 등)
app.use(express.static('dist'));

// 모든 GET 요청을 index.html 로 리다이렉트
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 파일 다운로드
app.get('/download/:file', (req, res) => {
  const file = path.join(__dirname, 'files', req.params.file);
  res.download(file);  // 자동 Content-Disposition 헤더
});

// 파일 스트리밍 (대용량 파일)
app.get('/stream/:file', (req, res) => {
  const file = path.join(__dirname, 'videos', req.params.file);
  res.sendFile(file, { acceptRanges: true });
});

console.log('Static file serving');`}
        />
      </section>

      <section className="content-section">
        <h2 id="api-design">6️⃣ REST API 설계</h2>
        <p>RESTful API 설계 원칙을 따르는 Express 서버를 만듭니다.</p>

        <CodeDemo
          title="REST API 설계"
          description="RESTful API 패턴입니다."
          defaultCode={`// ===== RESTful API 예시 =====
const express = require('express');
const app = express();

app.use(express.json());

// 가상의 데이터베이스
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// ===== CRUD 연산 =====

// GET /api/users - 모든 사용자 조회
app.get('/api/users', (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  
  let filtered = users;
  if (search) {
    filtered = users.filter(u => 
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + Number(limit);
  
  res.json({
    data: filtered.slice(startIndex, endIndex),
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: filtered.length
    }
  });
});

// GET /api/users/:id - 단일 사용자 조회
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

// POST /api/users - 사용자 생성
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  // 유효성 검사
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  
  const newUser = {
    id: Date.now(),
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);  // 201 Created
});

// PUT /api/users/:id - 전체 수정
app.put('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === Number(req.params.id));
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...req.body
  };
  
  res.json(users[userIndex]);
});

// PATCH /api/users/:id - 부분 수정
app.patch('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  Object.assign(user, req.body);
  res.json(user);
});

// DELETE /api/users/:id - 사용자 삭제
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === Number(req.params.id));
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users.splice(userIndex, 1);
  res.status(204).send();  // 204 No Content
});

console.log('RESTful API design');`}
        />

        <InfoCard type="tip" title="REST API 상태 코드">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <code>200 OK</code>: 성공
            </li>
            <li>
              <code>201 Created</code>: 리소스 생성
            </li>
            <li>
              <code>204 No Content</code>: 성공 (본문 없음)
            </li>
            <li>
              <code>400 Bad Request</code>: 잘못된 요청
            </li>
            <li>
              <code>401 Unauthorized</code>: 인증 필요
            </li>
            <li>
              <code>403 Forbidden</code>: 권한 없음
            </li>
            <li>
              <code>404 Not Found</code>: 리소스 없음
            </li>
            <li>
              <code>500 Internal Server Error</code>: 서버 에러
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <strong>HTTP 모듈</strong>: Node.js 내장, 저수준 API
            </li>
            <li>
              <strong>Express</strong>: 인기 웹 프레임워크, 간결한 라우팅
            </li>
            <li>
              <strong>라우팅</strong>: <code>app.get/post/put/delete</code>
            </li>
            <li>
              <strong>미들웨어</strong>: 요청/응답 처리 함수, <code>next()</code> 로 전달
            </li>
            <li>
              <strong>정적 파일</strong>: <code>express.static()</code> 사용
            </li>
            <li>
              <strong>REST API</strong>: CRUD 연산, 적절한 상태 코드
            </li>
            <li>
              <strong>에러 처리</strong>: 4 개 파라미터 미들웨어
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
