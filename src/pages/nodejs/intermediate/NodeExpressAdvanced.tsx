import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function NodeExpressAdvanced() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Express 심화</h1>
        <p className="page-description">
          Express 미들웨어, 에러 처리, JWT 인증, WebSocket 에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          Express 는 Node.js 의 표준 웹 프레임워크입니다.
          미들웨어 기반 아키텍처로 유연하고 확장성이 뛰어납니다.
        </p>

        <InfoCard type="tip" title="Express 핵심 개념">
          <ul>
            <li>
              <strong>미들웨어:</strong> 요청/응답 처리 파이프라인
            </li>
            <li>
              <strong>라우팅:</strong> HTTP 메서드와 경로 기반 처리
            </li>
            <li>
              <strong>에러 처리:</strong> 전용 미들웨어로 통합 처리
            </li>
            <li>
              <strong>인증:</strong> JWT 기반 토큰 인증
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="middleware">1️⃣ 미들웨어 심화</h2>
        <p>
          Express 미들웨어의 고급 사용법입니다.
        </p>

        <CodeDemo
          title="Express 미들웨어 활용"
          description="커스텀 미들웨어와 체이닝"
          defaultCode={`const express = require('express');
const app = express();

// 1. 미들웨어 기본 구조
function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(\`[\${timestamp}] \${req.method} \${req.path}\`);
  next();  // 다음 미들웨어로
}

app.use(logger);

// 2. 미들웨어 체이닝
function validateId(req, res, next) {
  const { id } = req.params;
  
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  
  next();
}

function loadUser(req, res, next) {
  const { id } = req.params;
  // const user = await db.getUser(id);
  req.user = { id, name: 'Alice' };  // req 에 저장
  next();
}

app.get('/users/:id', validateId, loadUser, (req, res) => {
  res.json(req.user);
});

// 3. 라우트 전용 미들웨어
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: '인증 필요' });
  }
  
  // const decoded = verifyToken(token);
  req.userId = 123;
  next();
};

app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: '인증된 요청', userId: req.userId });
});

// 4. 에러 처리 미들웨어 (4 개의 인수)
function errorHandler(err, req, res, next) {
  console.error('에러:', err);
  
  const status = err.status || 500;
  const message = err.message || '서버 오류';
  
  res.status(status).json({
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
}

app.use(errorHandler);

// 5. 비동기 미들웨어 (래퍼 필요)
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users', asyncHandler(async (req, res) => {
  // const users = await db.getAllUsers();
  res.json([{ id: 1, name: 'Alice' }]);
}));

// 6. 실제 활용 - 로깅 미들웨어
const morgan = require('morgan');
app.use(morgan('combined'));  // Apache 결합 로그 형식

// 7. 실제 활용 - CORS 미들웨어
const cors = require('cors');
app.use(cors({
  origin: 'https://example.com',
  credentials: true,
}));

console.log('Express 미들웨어 예시 완료');`}
        />

        <InfoCard type="tip" title="미들웨어 순서">
          <p>
            미들웨어는 <strong>등록 순서대로</strong> 실행됩니다.
            <br />
            <code>app.use()</code> 순서가 중요하며, 에러 핸들러는 <strong>마지막</strong>에 등록합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="error-handling">2️⃣ 에러 처리</h2>
        <p>
          Express 의 통합 에러 처리 메커니즘입니다.
        </p>

        <CodeDemo
          title="Express 에러 처리"
          description="통합 에러 핸들링"
          defaultCode={`const express = require('express');
const app = express();

// 1. 동기 에러 처리
app.get('/sync-error', (req, res, next) => {
  const error = new Error('동기 에러 발생!');
  error.status = 400;
  next(error);  // 에러를 다음 미들웨어로 전달
});

// 2. 비동기 에러 처리 (try-catch)
app.get('/async-error', async (req, res, next) => {
  try {
    // const data = await db.query('SELECT * FROM ...');
    throw new Error('쿼리 실패');
  } catch (error) {
    next(error);  // 에러 전달
  }
});

// 3. 404 처리
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: \`\${req.method} \${req.path} 를 찾을 수 없습니다\`,
  });
});

// 4. 통합 에러 핸들러
app.use((err, req, res, next) => {
  console.error('에러:', err);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message),
    });
  }
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      error: 'Duplicate Key',
      field: Object.keys(err.keyValue),
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid Token' });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token Expired' });
  }
  
  // 기본 에러
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  });
});

// 5. 커스텀 에러 클래스
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// 사용 예시
app.post('/users', async (req, res, next) => {
  const { email } = req.body;
  
  // const existing = await db.getUserByEmail(email);
  // if (existing) {
  //   return next(new AppError('이미 사용 중인 이메일입니다', 409));
  // }
  
  next();
});

// 6. asyncHandler 유틸리티
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users/:id', asyncHandler(async (req, res) => {
  // const user = await db.getUser(req.params.id);
  // if (!user) {
  //   throw new AppError('사용자를 찾을 수 없습니다', 404);
  // }
  res.json({ id: 1, name: 'Alice' });
}));

console.log('에러 처리 예시 완료');`}
        />

        <InfoCard type="warning" title="에러 처리 주의">
          <ul>
            <li>
              <strong>4 인수:</strong> 에러 핸들러는 반드시 <code>(err, req, res, next)</code>
            </li>
            <li>
              <strong>비동기:</strong> try-catch 로 감싸거나 asyncHandler 사용
            </li>
            <li>
              <strong>404:</strong> 모든 라우트 뒤에 등록
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="jwt-auth">3️⃣ JWT 인증</h2>
        <p>
          JSON Web Token 기반 인증을 구현합니다.
        </p>

        <CodeDemo
          title="JWT 인증 구현"
          description="토큰 발급과 검증"
          defaultCode={`const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '1d';

// 1. 회원가입
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // 사용자 저장
    // const user = await db.createUser({
    //   email,
    //   password: hashedPassword,
    //   name,
    // });
    
    const user = { id: 1, email, name };
    
    res.status(201).json({
      message: '회원가입 완료',
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. 로그인 (토큰 발급)
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 사용자 조회
    // const user = await db.getUserByEmail(email);
    const user = { 
      id: 1, 
      email, 
      password: await bcrypt.hash('password123', 10) 
    };
    
    if (!user) {
      return res.status(401).json({ error: '이메일 또는 비밀번호가 잘못되었습니다' });
    }
    
    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: '이메일 또는 비밀번호가 잘못되었습니다' });
    }
    
    // 토큰 발급
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    res.json({
      message: '로그인 성공',
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. 인증 미들웨어
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: '인증 토큰이 필요합니다' });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: '토큰이 만료되었습니다' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: '유효하지 않은 토큰입니다' });
    }
    next(error);
  }
};

// 4. 보호된 라우트
app.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: '프로필 데이터',
    user: { id: req.userId, email: req.userEmail },
  });
});

// 5. 토큰 갱신
app.post('/auth/refresh', authMiddleware, (req, res) => {
  // 현재 토큰이 유효하면 새 토큰 발급
  const newToken = jwt.sign(
    { userId: req.userId, email: req.userEmail },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  
  res.json({ token: newToken });
});

// 6. 로그아웃 (클라이언트에서 토큰 삭제)
app.post('/auth/logout', authMiddleware, (req, res) => {
  // 서버 측에서는 토큰 블랙리스트에 추가 (선택)
  res.json({ message: '로그아웃 완료' });
});

console.log('JWT 인증 예시 완료');`}
        />

        <InfoCard type="warning" title="JWT 보안">
          <ul>
            <li>
              <strong>비밀키:</strong> 환경 변수로 관리, 강력한 값 사용
            </li>
            <li>
              <strong>만료시간:</strong> 짧은 시간 설정 (15 분~1 일)
            </li>
            <li>
              <strong>HTTPS:</strong> 토큰 탈취 방지
            </li>
            <li>
              <strong>Refresh Token:</strong> 장기 인증용 별도 토큰
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="validation">4️⃣ 입력 검증</h2>
        <p>
          사용자 입력을 검증하고 살균합니다.
        </p>

        <CodeDemo
          title="입력 검증 (Validation)"
          description="Joi 와 express-validator"
          defaultCode={`const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const app = express();

app.use(express.json());

// 1. express-validator 기본
app.post('/users', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('유효한 이메일을 입력하세요'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('비밀번호는 8 자 이상이어야 합니다')
    .matches(/\\d/)
    .withMessage('비밀번호는 숫자를 포함해야 합니다'),
  
  body('name')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('이름은 1-50 자 사이여야 합니다'),
  
  body('age')
    .optional()
    .isInt({ min: 1, max: 150 })
    .withMessage('나이는 1-150 사이여야 합니다'),
], (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Failed',
      details: errors.array(),
    });
  }
  
  // 검증 통과
  const { email, password, name, age } = req.body;
  res.json({ message: '사용자 생성됨', email, name, age });
});

// 2. 파라미터 검증
app.get('/users/:id', [
  param('id')
    .isInt({ min: 1 })
    .toInt(),  // 숫자로 변환
], (req, res) => {
  const { id } = req.params;  // 이제 숫자 타입
  res.json({ userId: id });
});

// 3. 쿼리 파라미터 검증
app.get('/posts', [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .toInt(),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .toInt(),
  
  query('search')
    .optional()
    .trim()
    .escape(),  // XSS 방지
], (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  res.json({ page, limit, search });
});

// 4. 커스텀 검증
app.post('/products', [
  body('price')
    .custom((value) => {
      if (value < 0) {
        throw new Error('가격은 0 이상이어야 합니다');
      }
      return true;
    }),
  
  body('category')
    .custom((value) => {
      const validCategories = ['electronics', 'clothing', 'books'];
      if (!validCategories.includes(value)) {
        throw new Error('유효하지 않은 카테고리입니다');
      }
      return true;
    }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({ message: '제품 생성됨' });
});

// 5. Joi 사용 (대안)
const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(1).max(50).required(),
  age: Joi.number().min(1).max(150),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    return res.status(400).json({
      error: 'Validation Failed',
      details: error.details.map(d => d.message),
    });
  }
  
  next();
};

app.post('/users-joi', validate(userSchema), (req, res) => {
  res.json({ message: '사용자 생성됨', ...req.body });
});

console.log('입력 검증 예시 완료');`}
        />

        <InfoCard type="tip" title="검증 라이브러리">
          <ul>
            <li>
              <strong>express-validator:</strong> Express 통합, 미들웨어 방식
            </li>
            <li>
              <strong>Joi:</strong> 스키마 기반, 독립적 사용 가능
            </li>
            <li>
              <strong>Zod:</strong> TypeScript 친화적, 런타임 검증
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="websocket">5️⃣ WebSocket</h2>
        <p>
          실시간 양방향 통신을 구현합니다.
        </p>

        <CodeDemo
          title="WebSocket 실시간 통신"
          description="Socket.IO 활용"
          defaultCode={`const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

// 1. 서버 측 Socket.IO
io.on('connection', (socket) => {
  console.log('클라이언트 연결:', socket.id);
  
  // 2. 이벤트 수신
  socket.on('chat:message', (data) => {
    console.log('메시지 수신:', data);
    
    // 브로드캐스트 (보낸 사람 제외)
    socket.broadcast.emit('chat:message', {
      id: Date.now(),
      ...data,
      timestamp: new Date().toISOString(),
    });
  });
  
  // 3. 룸 (방) 기능
  socket.on('room:join', (roomName) => {
    socket.join(roomName);
    console.log(\`사용자 \${socket.id} 가 \${roomName} 방 참여\`);
    
    // 룸에 알림
    socket.to(roomName).emit('room:userJoined', {
      userId: socket.id,
      room: roomName,
    });
  });
  
  socket.on('room:message', ({ room, message }) => {
    // 특정 룸으로만 전송
    io.to(room).emit('room:message', {
      id: Date.now(),
      userId: socket.id,
      message,
      timestamp: new Date().toISOString(),
    });
  });
  
  // 4. 이벤트 응답 (acknowledgement)
  socket.on('db:save', async (data, callback) => {
    try {
      // await db.save(data);
      callback({ success: true, id: Date.now() });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });
  
  // 5. 연결 종료
  socket.on('disconnect', () => {
    console.log('클라이언트 연결 종료:', socket.id);
  });
});

// 6. 클라이언트 측 코드 (참고)
/*
// npm install socket.io-client
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', {
  withCredentials: true,
});

// 연결
socket.on('connect', () => {
  console.log('서버 연결됨', socket.id);
});

// 메시지 전송
socket.emit('chat:message', { text: '안녕하세요!' });

// 메시지 수신
socket.on('chat:message', (data) => {
  console.log('새 메시지:', data);
});

// 룸 참여
socket.emit('room:join', 'room-1');

// 끊기
socket.disconnect();
*/

// 7. 실제 활용 - 채팅방
const rooms = new Map();

io.on('connection', (socket) => {
  socket.on('chat:join', ({ room, username }) => {
    socket.join(room);
    
    if (!rooms.has(room)) {
      rooms.set(room, new Set());
    }
    rooms.get(room).add(username);
    
    // 방 전체에 알림
    io.to(room).emit('chat:userList', {
      users: Array.from(rooms.get(room)),
    });
    
    socket.emit('chat:joined', { room, username });
  });
});

server.listen(3001, () => {
  console.log('Socket.IO 서버 실행 중: http://localhost:3001');
});

console.log('WebSocket 예시 완료');`}
        />

        <InfoCard type="tip" title="Socket.IO 특징">
          <ul>
            <li>
              <strong>자동 재연결:</strong> 연결 끊김 자동 복구
            </li>
            <li>
              <strong>룸:</strong> 그룹 통신 지원
            </li>
            <li>
              <strong>acknowledgement:</strong> 이벤트 응답 가능
            </li>
            <li>
              <strong>폴백:</strong> WebSocket 불가 시 long-polling
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>미들웨어:</strong> 요청/응답 파이프라인, <code>next()</code>
          </li>
          <li>
            <strong>에러 처리:</strong> 4 인수 핸들러, asyncHandler
          </li>
          <li>
            <strong>JWT:</strong> 토큰 발급/검증, auth 미들웨어
          </li>
          <li>
            <strong>검증:</strong> express-validator, Joi
          </li>
          <li>
            <strong>WebSocket:</strong> Socket.IO 실시간 통신
          </li>
          <li>
            <strong>룸:</strong> 그룹 브로드캐스트
          </li>
        </ul>
      </section>
    </div>
  );
}