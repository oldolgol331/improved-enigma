import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function NodeJSRESTAPI() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Node.js REST API 와 인증</h1>
        <p className="page-description">
          Express 를 사용한 REST API 설계, JWT 인증, WebSocket 실시간 통신을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="rest-api">1️⃣ REST API 설계</h2>
        <p>
          RESTful 한 API 를 설계하고 구현합니다.
        </p>

        <CodeDemo
          title="REST API 기본"
          description="CRUD 엔드포인트 설계"
          defaultCode={`const express = require('express');
const app = express();

app.use(express.json());

// 가상의 데이터베이스
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// ============================================
// CRUD 엔드포인트
// ============================================

// 1. 모든 사용자 조회 (READ All)
// GET /api/users
app.get('/api/users', (req, res) => {
  res.json({ success: true, data: users });
});

// 2. 단일 사용자 조회 (READ One)
// GET /api/users/:id
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  res.json({ success: true, data: user });
});

// 3. 사용자 생성 (CREATE)
// POST /api/users
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  // 유효성 검사
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'Name and email are required'
    });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// 4. 사용자 수정 (UPDATE)
// PUT /api/users/:id (전체 수정)
// PATCH /api/users/:id (부분 수정)
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  const { name, email } = req.body;
  user.name = name ?? user.name;
  user.email = email ?? user.email;
  
  res.json({ success: true, data: user });
});

// 5. 사용자 삭제 (DELETE)
// DELETE /api/users/:id
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  users.splice(index, 1);
  res.status(204).send();
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

console.log('REST API 완료');`}
        />

        <InfoCard type="tip" title="REST API 모범 사례">
          <ul>
            <li>
              <strong>명사형 경로:</strong> /api/users (O), /api/getUsers (X)
            </li>
            <li>
              <strong>HTTP 메서드:</strong> GET, POST, PUT, PATCH, DELETE
            </li>
            <li>
              <strong>상태 코드:</strong> 200, 201, 204, 400, 404, 500
            </li>
            <li>
              <strong>버전 관리:</strong> /api/v1/users
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="middleware">2️⃣ 미들웨어</h2>
        <p>
          Express 미들웨어를 활용한 로깅, 인증, 에러 처리입니다.
        </p>

        <CodeDemo
          title="Middleware"
          description="로깅, 인증, 에러 처리 미들웨어"
          defaultCode={`const express = require('express');
const app = express();

// ============================================
// 1. 로깅 미들웨어
// ============================================
function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(\`[\${timestamp}] \${req.method} \${req.url}\`);
  next();
}

app.use(logger);

// ============================================
// 2. 인증 미들웨어
// ============================================
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized'
    });
  }
  
  const token = authHeader.split(' ')[1];
  
  // 토큰 검증 (실제로는 JWT 검증)
  if (token !== 'valid-token') {
    return res.status(403).json({
      success: false,
      error: 'Invalid token'
    });
  }
  
  // 사용자 정보 추가
  req.user = { id: 1, name: 'Alice' };
  next();
}

// 인증이 필요한 라우트
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ success: true, data: req.user });
});

// ============================================
// 3. 에러 처리 미들웨어
// ============================================
function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
}

// 에러 발생 라우트
app.get('/api/error', (req, res, next) => {
  const error = new Error('Something went wrong');
  error.status = 400;
  next(error);
});

// 에러 처리 미들웨어 등록 (반드시 마지막)
app.use(errorHandler);

console.log('Middleware 완료');`}
        />

        <InfoCard type="warning" title="미들웨어 순서">
          <ul>
            <li>
              <strong>순서 중요:</strong> 위에서 아래로 순차 실행
            </li>
            <li>
              <strong>next():</strong> 다음 미들웨어로 전달
            </li>
            <li>
              <strong>에러 처리:</strong> 반드시 마지막에 등록
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="jwt">3️⃣ JWT 인증</h2>
        <p>
          JSON Web Token 을 사용한 인증 시스템입니다.
        </p>

        <CodeDemo
          title="JWT 인증"
          description="토큰 발급, 검증, 갱신"
          defaultCode={`const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const JWT_SECRET = 'your-secret-key';  // 환경 변수로 관리!

// 가상의 사용자 데이터베이스
const users = [
  { id: 1, username: 'alice', password: 'hashed-password' }
];

// ============================================
// 1. 로그인 (토큰 발급)
// ============================================
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // 사용자 확인 (실제로는 DB 조회 및 비밀번호 검증)
  const user = users.find(u => u.username === username);
  
  if (!user || password !== 'hashed-password') {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }
  
  // JWT 토큰 발급
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }  // 1 시간 후 만료
  );
  
  res.json({
    success: true,
    data: {
      token,
      expiresIn: 3600
    }
  });
});

// ============================================
// 2. 인증 미들웨어
// ============================================
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized'
    });
  }
  
  const token = authHeader.split(' ')[1];
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }
    
    req.user = decoded;
    next();
  });
}

// ============================================
// 3. 보호된 라우트
// ============================================
app.get('/api/protected', authenticateJWT, (req, res) => {
  res.json({
    success: true,
    data: {
      message: 'Access granted',
      user: req.user
    }
  });
});

// ============================================
// 4. 토큰 갱신
// ============================================
app.post('/api/refresh', (req, res) => {
  const { refreshToken } = req.body;
  
  // 리프레시 토큰 검증 및 새 액세스 토큰 발급
  // (실제로는 DB 에 리프레시 토큰 저장 및 검증)
  
  res.json({
    success: true,
    data: {
      token: 'new-access-token',
      expiresIn: 3600
    }
  });
});

console.log('JWT 인증 완료');`}
        />

        <InfoCard type="tip" title="JWT 보안">
          <ul>
            <li>
              <strong>비밀 키:</strong> 환경 변수로 관리
            </li>
            <li>
              <strong>만료 시간:</strong> 짧은 액세스 토큰 + 리프레시 토큰
            </li>
            <li>
              <strong>HTTPS:</strong> 토큰 탈취 방지
            </li>
            <li>
              <strong>저장소:</strong> localStorage 보다 httpOnly 쿠키
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="websocket">4️⃣ WebSocket 실시간 통신</h2>
        <p>
          WebSocket 을 사용한 양방향 실시간 통신입니다.
        </p>

        <CodeDemo
          title="WebSocket"
          description="Socket.IO 를 사용한 실시간 통신"
          defaultCode={`// 서버 (server.js)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// 연결된 클라이언트 저장
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // 1. 클라이언트에서 메시지 수신
  socket.on('chat message', (data) => {
    console.log('Message received:', data);
    
    // 모든 클라이언트에게 브로드캐스트
    io.emit('chat message', {
      id: socket.id,
      message: data.message,
      timestamp: new Date().toISOString()
    });
  });
  
  // 2. 사용자 참여
  socket.on('user joined', (username) => {
    connectedUsers.set(socket.id, username);
    
    // 모든 사람에게 알림
    io.emit('user joined', {
      username,
      userId: socket.id,
      timestamp: new Date().toISOString()
    });
  });
  
  // 3. 개인 메시지
  socket.on('private message', ({ to, message }) => {
    socket.to(to).emit('private message', {
      from: socket.id,
      message,
      timestamp: new Date().toISOString()
    });
  });
  
  // 4. 연결 끊김
  socket.on('disconnect', () => {
    const username = connectedUsers.get(socket.id);
    connectedUsers.delete(socket.id);
    
    console.log('Client disconnected:', socket.id);
    
    io.emit('user left', {
      username,
      userId: socket.id,
      timestamp: new Date().toISOString()
    });
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

// ============================================
// 클라이언트 (client.js)
// ============================================
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

// 서버에서 메시지 수신
socket.on('chat message', (data) => {
  console.log('New message:', data.message);
});

// 메시지 전송
socket.emit('chat message', {
  message: 'Hello, World!'
});

// 사용자 참여
socket.emit('user joined', 'Alice');

// 개인 메시지
socket.emit('private message', {
  to: 'user-id',
  message: 'Private message'
});

console.log('WebSocket 완료');`}
        />

        <InfoCard type="tip" title="WebSocket 활용">
          <ul>
            <li>
              <strong>실시간 채팅:</strong> 메시지 브로드캐스트
            </li>
            <li>
              <strong>알림:</strong> 푸시 알림
            </li>
            <li>
              <strong>협업:</strong> 동시 편집
            </li>
            <li>
              <strong>게임:</strong> 실시간 멀티플레이어
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>REST API:</strong> CRUD 엔드포인트, HTTP 메서드
          </li>
          <li>
            <strong>Middleware:</strong> 로깅, 인증, 에러 처리
          </li>
          <li>
            <strong>JWT:</strong> 토큰 발급, 검증, 갱신
          </li>
          <li>
            <strong>WebSocket:</strong> 양방향 실시간 통신
          </li>
          <li>
            <strong>Socket.IO:</strong> 이벤트 기반 통신
          </li>
        </ul>
      </section>
    </div>
  );
}
