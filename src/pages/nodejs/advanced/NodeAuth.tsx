import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function NodeAuth() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>인증과 보안</h1>
        <p className="page-description">
          JWT, 세션 기반 인증과 Node.js 보안 모범 사례에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          웹 애플리케이션에서 <strong>인증 (Authentication)</strong> 은 사용자 신원을 확인하는
          과정입니다.
          <strong>JWT</strong> 와 <strong>세션</strong> 이 대표적인 인증 방식이며, 각각의 장단점이
          있습니다.
        </p>

        <InfoCard type="tip" title="인증 방식 비교">
          <table style={{ width: '100%', fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>방식</th>
                <th style={{ textAlign: 'left' }}>장점</th>
                <th style={{ textAlign: 'left' }}>단점</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>세션</td>
                <td>서버에서 관리, 즉시 무효화 가능</td>
                <td>서버 메모리 사용, 확장성 제한</td>
              </tr>
              <tr>
                <td>JWT</td>
                <td>무상태, 확장성 좋음</td>
                <td>토큰 크기 큼, 즉시 무효화 어려움</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="jwt">1️⃣ JWT 인증</h2>
        <p>JWT(JSON Web Token) 는 클레임 (claim) 을 포함하는 토큰 기반 인증 방식입니다.</p>

        <CodeDemo
          title="JWT 인증"
          description="JWT 로 토큰 기반 인증을 구현합니다."
          defaultCode={`// ===== JWT 설치 =====
// npm install jsonwebtoken bcryptjs

// ===== JWT 토큰 생성 =====
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '1d';

// 비밀번호 해싱
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// 비밀번호 검증
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// 토큰 생성
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'my-app',
    audience: 'my-app-users'
  });
}

// 토큰 검증
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    }
    throw new Error('Invalid token');
  }
}

// ===== 인증 미들웨어 =====
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

// ===== 로그인 엔드포인트 =====
// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;
//   
//   // 사용자 조회 (DB)
//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }
//   
//   // 비밀번호 검증
//   const isValid = await verifyPassword(password, user.password);
//   if (!isValid) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }
//   
//   // 토큰 생성
//   const token = generateToken({
//     id: user.id,
//     email: user.email,
//     role: user.role
//   });
//   
//   res.json({ token, user: { id: user.id, email: user.email } });
// });

// ===== 보호된 라우트 =====
// app.get('/api/profile', authMiddleware, (req, res) => {
//   res.json({ user: req.user });
// });

console.log('JWT authentication');`}
        />

        <InfoCard type="warning" title="JWT 보안 주의사항">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>비밀번호는 반드시 해싱 (bcrypt, argon2)</li>
            <li>JWT_SECRET 은 환경 변수로 관리</li>
            <li>만료 시간 설정 (access token: 15 분 ~ 1 시간)</li>
            <li>HTTPS 필수 (토큰 탈취 방지)</li>
            <li>민감한 정보는 토큰에 포함 금지</li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="refresh-token">2️⃣ 리프레시 토큰</h2>
        <p>액세스 토큰과 리프레시 토큰을 함께 사용해 보안을 강화합니다.</p>

        <CodeDemo
          title="리프레시 토큰"
          description="이중 토큰 시스템을 구현합니다."
          defaultCode={`// ===== 이중 토큰 시스템 =====
const jwt = require('jsonwebtoken');

// 액세스 토큰 (짧은 만료)
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = '15m';  // 15 분

// 리프레시 토큰 (긴 만료)
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRY = '7d';  // 7 일

// 토큰 쌍 생성
function generateTokenPair(user) {
  const accessToken = jwt.sign(
    { userId: user.id, type: 'access' },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
  
  const refreshToken = jwt.sign(
    { userId: user.id, type: 'refresh' },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
  
  return { accessToken, refreshToken };
}

// 리프레시 토큰 저장 (DB 또는 Redis)
// async function storeRefreshToken(userId, token) {
//   await db.refreshToken.create({
//     data: { userId, token, expiresAt: new Date(Date.now() + 7*24*60*60*1000) }
//   });
// }

// 토큰 재발급
async function refreshAccessToken(refreshToken) {
  try {
    // 1. 리프레시 토큰 검증
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }
    
    // 2. DB 에서 토큰 유효성 확인 (선택)
    // const stored = await db.refreshToken.findUnique({
    //   where: { token: refreshToken }
    // });
    // if (!stored) throw new Error('Token revoked');
    
    // 3. 새로운 액세스 토큰 생성
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, type: 'access' },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    
    return { accessToken: newAccessToken };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
}

// 토큰 폐기
// async function revokeRefreshToken(token) {
//   await db.refreshToken.delete({ where: { token } });
// }

// ===== Express 라우트 =====
// app.post('/api/auth/refresh', async (req, res) => {
//   const { refreshToken } = req.body;
//   
//   try {
//     const { accessToken } = await refreshAccessToken(refreshToken);
//     res.json({ accessToken });
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// });

// app.post('/api/auth/logout', authMiddleware, async (req, res) => {
//   const { refreshToken } = req.body;
//   await revokeRefreshToken(refreshToken);
//   res.json({ message: 'Logged out' });
// });

console.log('Refresh token system');`}
        />

        <InfoCard type="tip" title="토큰 저장소">
          <p>
            <strong>액세스 토큰</strong>: 메모리 (JavaScript 변수) 에 저장
            <br />
            <strong>리프레시 토큰</strong>: HTTP-only 쿠키 또는 DB 에 저장
            <br />
            localStorage 는 XSS 공격에 취약하므로 피하세요!
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="session">3️⃣ 세션 기반 인증</h2>
        <p>서버에서 세션을 관리하는 전통적인 인증 방식입니다.</p>

        <CodeDemo
          title="세션 기반 인증"
          description="express-session 으로 세션을 관리합니다."
          defaultCode={`// ===== 세션 설치 =====
// npm install express-session connect-redis

// ===== 기본 세션 설정 =====
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');

// Redis 연결
const redisClient = createClient();
await redisClient.connect();

// 세션 미들웨어
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 'your-secret',
  resave: false,  // 변경 없으면 저장 안함
  saveUninitialized: false,  // 빈 세션 저장 안함
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // HTTPS 에서만
    httpOnly: true,  // XSS 방지
    maxAge: 24 * 60 * 60 * 1000,  // 24 시간
    sameSite: 'strict'  // CSRF 방지
  },
  name: 'sessionId'  // 쿠키 이름 (기본값 변경 권장)
}));

// ===== 로그인 처리 =====
// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;
//   
//   const user = await User.findOne({ email });
//   if (!user || !await verifyPassword(password, user.password)) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }
//   
//   // 세션에 사용자 정보 저장
//   req.session.userId = user.id;
//   req.session.role = user.role;
//   
//   res.json({ message: 'Logged in', user: { id: user.id, email: user.email } });
// });

// ===== 인증 미들웨어 =====
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
}

// ===== 로그아웃 =====
// app.post('/api/auth/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) return res.status(500).json({ error: 'Logout failed' });
//     res.clearCookie('sessionId');
//     res.json({ message: 'Logged out' });
//   });
// });

// ===== 세션 정보 조회 =====
// app.get('/api/auth/me', requireAuth, (req, res) => {
//   res.json({ user: { id: req.session.userId, role: req.session.role } });
// });

console.log('Session-based authentication');`}
        />
      </section>

      <section className="content-section">
        <h2 id="security">4️⃣ 보안 모범 사례</h2>
        <p>Node.js 애플리케이션 보안을 위한 필수 항목들입니다.</p>

        <CodeDemo
          title="보안 모범 사례"
          description="Node.js 보안을 강화합니다."
          defaultCode={`// ===== 보안 미들웨어 =====
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const cors = require('cors');

// 1. 보안 헤더 (Helmet)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// 2. Rate Limiting (Brute-force 방지)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 분
  max: 100,  // IP 당 100 요청
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);

// 로그인 엔드포인트는 더 엄격하게
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,  // 15 분당 5 회
  message: 'Too many login attempts'
});

// app.post('/api/auth/login', authLimiter, loginHandler);

// 3. CORS 설정
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 4. XSS 방지
app.use(xss());

// 5. 입력값 검증 (Zod)
const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// 6. SQL Injection 방지 (파라미터화 쿼리)
// Prisma 는 기본적으로 SQL Injection 방지
// const user = await prisma.user.findUnique({
//   where: { email }  // 안전
// });

// 7. 환경 변수 관리 (dotenv)
require('dotenv').config();

// 8. 민감 정보 로깅 방지
const safeLogger = (data) => {
  const sensitive = ['password', 'token', 'secret', 'apiKey'];
  const sanitized = { ...data };
  
  sensitive.forEach(key => {
    if (sanitized[key]) {
      sanitized[key] = '[REDACTED]';
    }
  });
  
  console.log(JSON.stringify(sanitized));
};

console.log('Security best practices');`}
        />

        <InfoCard type="tip" title="보안 체크리스트">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>✅ Helmet 으로 보안 헤더 설정</li>
            <li>✅ Rate Limiting 으로 Brute-force 방지</li>
            <li>✅ CORS 올바르게 설정</li>
            <li>✅ 입력값 검증 (Zod, Joi)</li>
            <li>✅ 비밀번호 해싱 (bcrypt, argon2)</li>
            <li>✅ HTTPS 사용</li>
            <li>✅ 환경 변수로 비밀 관리</li>
            <li>✅ 의존성 정기 업데이트 (npm audit)</li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <strong>JWT</strong>: 토큰 기반, 무상태, 확장성 좋음
            </li>
            <li>
              <strong>세션</strong>: 서버 관리, 즉시 무효화 가능
            </li>
            <li>
              <strong>리프레시 토큰</strong>: 액세스 토큰 재발급용
            </li>
            <li>
              <strong>비밀번호</strong>: bcrypt 로 해싱
            </li>
            <li>
              <strong>Helmet</strong>: 보안 헤더 설정
            </li>
            <li>
              <strong>Rate Limiting</strong>: Brute-force 방지
            </li>
            <li>
              <strong>CORS</strong>: 교차 출처 요청 제어
            </li>
            <li>
              <strong>입력 검증</strong>: Zod 로 SQL/XSS Injection 방지
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
