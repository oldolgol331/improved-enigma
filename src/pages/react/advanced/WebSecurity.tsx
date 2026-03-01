import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function WebSecurity() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>웹 보안</h1>
        <p className="page-description">
          XSS, CSRF, CSP 등 웹 애플리케이션 보안 위협과 대응 방법을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="xss">1️⃣ XSS (Cross-Site Scripting)</h2>
        <p>
          악성 스크립트 삽입 공격과 방어입니다.
        </p>

        <CodeDemo
          title="XSS Prevention"
          description="인코딩, CSP, sanitization"
          defaultCode={`// ============================================
// 1. XSS 공격 예시
// ============================================
// 사용자 입력: <script>alert('XSS')</script>
// 인코딩 안 함: <script>alert('XSS')</script> 실행됨!

// ============================================
// 2. React 의 자동 인코딩 (안전)
// ============================================
function SafeComponent({ userInput }) {
  // React 는 자동으로 HTML 인코딩
  return <div>{userInput}</div>;
  // <script> → &lt;script&gt; 로 인코딩됨
}

// ============================================
// 3. 위험한 패턴 (금지)
// ============================================
function DangerousComponent({ userInput }) {
  // dangerouslySetInnerHTML 사용 시 주의
  return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
  // userInput 에 <script> 가 있으면 실행됨!
}

// ============================================
// 4. 안전한 사용법 (Sanitization)
// ============================================
import DOMPurify from 'dompurify';

function SafeHTMLComponent({ userInput }) {
  // 허용된 태그만 남기고 제거
  const clean = DOMPurify.sanitize(userInput);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}

// ============================================
// 5. 속성 인코딩
// ============================================
// 나쁜 예
<img src={userInput} />  // userInput: "x" onerror="alert('XSS')"

// 좋은 예 (React 는 자동 인코딩)
<img src={userInput} />  // 자동으로 인코딩됨

// ============================================
// 6. URL 인코딩
// ============================================
function SafeLink({ url }) {
  // 프로토콜 확인
  const safeUrl = url.startsWith('http://') || url.startsWith('https://')
    ? url
    : 'https://' + url;
  
  return <a href={safeUrl}>Link</a>;
}

// ============================================
// 7. Content Security Policy (CSP)
// ============================================
// meta 태그 (권장 안 함 - 헤더로 설정)
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'">

// Nginx 헤더 설정
add_header Content-Security-Policy 
  "default-src 'self'; 
   script-src 'self' https://trusted.com; 
   style-src 'self' 'unsafe-inline';
   img-src 'self' data: https:;
   font-src 'self';
   connect-src 'self' https://api.example.com;
   frame-ancestors 'none';" always;

console.log('XSS Prevention 완료');`}
        />

        <InfoCard type="warning" title="XSS 방어 체크리스트">
          <ul>
            <li>
              <strong>인코딩:</strong> 출력 컨텍스트에 맞게 인코딩
            </li>
            <li>
              <strong>dangerouslySetInnerHTML:</strong> DOMPurify 사용
            </li>
            <li>
              <strong>CSP:</strong> 스크립트 소스 제한
            </li>
            <li>
              <strong>입력 검증:</strong> 허용된 값만 통과
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="csrf">2️⃣ CSRF (Cross-Site Request Forgery)</h2>
        <p>
          위조된 요청 공격과 방어입니다.
        </p>

        <CodeDemo
          title="CSRF Prevention"
          description="Token, SameSite, Origin 검증"
          defaultCode={`// ============================================
// 1. CSRF 공격 예시
// ============================================
// 공격자가 만든 폼
// <form action="https://bank.com/transfer" method="POST">
//   <input type="hidden" name="amount" value="1000">
//   <input type="hidden" name="to" value="attacker">
// </form>
// 사용자가 로그인한 상태에서 이 폼을 보면 송금됨!

// ============================================
// 2. CSRF Token (가장 일반적)
// ============================================
// 서버에서 토큰 발급
const csrfToken = crypto.randomBytes(32).toString('hex');

// 폼에 토큰 포함
<form method="POST">
  <input type="hidden" name="_csrf" value={csrfToken} />
  <button>Submit</button>
</form>

// 서버에서 검증
app.post('/transfer', (req, res) => {
  if (req.body._csrf !== req.session.csrfToken) {
    return res.status(403).send('Invalid CSRF token');
  }
  // 처리 계속
});

// ============================================
// 3. Axios 에서 자동 처리
// ============================================
import axios from 'axios';

const api = axios.create({
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  withCredentials: true,  // 쿠키 포함
});

// ============================================
// 4. SameSite 쿠키
// ============================================
// Express 설정
app.use(session({
  secret: 'your-secret',
  cookie: {
    sameSite: 'strict',  // 또는 'lax'
    secure: true,        // HTTPS 만
    httpOnly: true,      // JavaScript 접근 불가
  }
}));

// SameSite 옵션:
// - strict: 모든 크로스 사이트 요청에서 쿠키 안 보냄
// - lax: 안전한 요청 (GET) 만 보냄
// - none: 모든 요청에서 보냄 (secure 필수)

// ============================================
// 5. Origin/Referer 검증
// ============================================
app.post('/api/transfer', (req, res) => {
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  
  if (origin !== 'https://yoursite.com') {
    return res.status(403).send('Invalid origin');
  }
  
  // 처리 계속
});

console.log('CSRF Prevention 완료');`}
        />

        <InfoCard type="tip" title="CSRF 방어">
          <ul>
            <li>
              <strong>CSRF Token:</strong> 모든 상태 변경 요청에 포함
            </li>
            <li>
              <strong>SameSite:</strong> strict 또는 lax 설정
            </li>
            <li>
              <strong>Origin 검증:</strong> 요청 출처 확인
            </li>
            <li>
              <strong>GET 금지:</strong> 상태 변경에 GET 사용 안 함
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="headers">3️⃣ 보안 헤더</h2>
        <p>
          HTTP 보안 헤더를 설정합니다.
        </p>

        <CodeDemo
          title="Security Headers"
          description="CSP, HSTS, X-Frame-Options"
          defaultCode={`// ============================================
// 1. Helmet 사용 (Express)
// ============================================
import helmet from 'helmet';

app.use(helmet());

// 개별 설정
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://trusted.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.example.com"],
      fontSrc: ["'self'"],
      frameAncestors: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,  // 1 년
    includeSubDomains: true,
    preload: true,
  },
}));

// ============================================
// 2. Nginx 설정
// ============================================
# nginx.conf
server {
  # CSP
  add_header Content-Security-Policy 
    "default-src 'self'; script-src 'self'" always;
  
  # HSTS (HTTPS 강제)
  add_header Strict-Transport-Security 
    "max-age=31536000; includeSubDomains; preload" always;
  
  # 클릭재킹 방지
  add_header X-Frame-Options "DENY" always;
  
  # MIME 타입 스니핑 방지
  add_header X-Content-Type-Options "nosniff" always;
  
  # XSS 필터 (구식 브라우저)
  add_header X-XSS-Protection "1; mode=block" always;
  
  # Referrer 정책
  add_header Referrer-Policy 
    "strict-origin-when-cross-origin" always;
  
  # 권한 정책
  add_header Permissions-Policy 
    "geolocation=(), microphone=(), camera=()" always;
}

// ============================================
// 3. 각 헤더 설명
// ============================================
// Content-Security-Policy: 리소스 로드 제한
// Strict-Transport-Security: HTTPS 강제
// X-Frame-Options: iframe 삽입 방지
// X-Content-Type-Options: MIME 스니핑 방지
// X-XSS-Protection: 브라우저 XSS 필터
// Referrer-Policy: Referer 정보 제한
// Permissions-Policy: 브라우저 기능 제한

console.log('Security Headers 완료');`}
        />

        <InfoCard type="tip" title="필수 보안 헤더">
          <ul>
            <li>
              <strong>CSP:</strong> 스크립트 소스 제한
            </li>
            <li>
              <strong>HSTS:</strong> HTTPS 강제 (max-age=31536000)
            </li>
            <li>
              <strong>X-Frame-Options:</strong> DENY 또는 SAMEORIGIN
            </li>
            <li>
              <strong>X-Content-Type-Options:</strong> nosniff
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="auth">4️⃣ 인증 보안</h2>
        <p>
          안전한 인증 구현 방법입니다.
        </p>

        <CodeDemo
          title="Authentication Security"
          description="비밀번호, JWT, 세션 관리"
          defaultCode={`import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ============================================
// 1. 비밀번호 해싱
// ============================================
// 나쁜 예: 평문 저장 (절대 금지!)
const password = "user123";  // DB 에 저장 X

// 좋은 예: bcrypt 해싱
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// 비밀번호 검증
const isValid = await bcrypt.compare(password, hashedPassword);

// ============================================
// 2. JWT 보안
// ============================================
const JWT_SECRET = process.env.JWT_SECRET;  // 환경 변수
const JWT_EXPIRES_IN = '1h';

// 토큰 발급
const token = jwt.sign(
  { userId: user.id, role: user.role },
  JWT_SECRET,
  { expiresIn: JWT_EXPIRES_IN }
);

// 토큰 검증
try {
  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded;
} catch (err) {
  return res.status(401).send('Invalid token');
}

// ============================================
// 3. 토큰 저장소
// ============================================
// 나쁜 예: localStorage (XSS 에 취약)
localStorage.setItem('token', token);

// 좋은 예: httpOnly 쿠키 (JavaScript 접근 불가)
res.cookie('token', token, {
  httpOnly: true,
  secure: true,      // HTTPS 만
  sameSite: 'strict',
  maxAge: 3600000,   // 1 시간
});

// ============================================
// 4. Refresh Token
// ============================================
// 짧은 액세스 토큰 + 긴 리프레시 토큰
const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

// 리프레시 토큰은 DB 에 저장 (취소 가능하게)
await db.refreshTokens.create({ userId, token: refreshToken });

// ============================================
// 5. Rate Limiting (무차별 대입 방지)
// ============================================
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 분
  max: 5,  // 5 회 시도
  message: 'Too many login attempts',
});

app.post('/login', loginLimiter, loginHandler);

console.log('Authentication Security 완료');`}
        />

        <InfoCard type="warning" title="인증 보안 체크리스트">
          <ul>
            <li>
              <strong>비밀번호:</strong> bcrypt/argon2 해싱 (salt rounds ≥ 10)
            </li>
            <li>
              <strong>JWT:</strong> httpOnly 쿠키에 저장
            </li>
            <li>
              <strong>Rate Limiting:</strong> 로그인 시도 제한
            </li>
            <li>
              <strong>HTTPS:</strong> 모든 통신 암호화
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="dependencies">5️⃣ 의존성 보안</h2>
        <p>
          npm 패키지의 보안 취약점을 관리합니다.
        </p>

        <CodeDemo
          title="Dependency Security"
          description="감사, 업데이트, lock 파일"
          defaultCode={`# ============================================
# 1. 취약점 감사
# ============================================
# npm 감사
npm audit
npm audit fix        # 자동 수정
npm audit fix --force  # 강제 수정 (주의!)

# yarn 감사
yarn audit

# ============================================
# 2. lock 파일 (필수)
# ============================================
# package-lock.json 또는 yarn.lock 커밋
# 모든 개발자가 동일한 버전 사용

# .gitignore 에 포함 안 됨 (확인!)
# npm install 시 자동 생성

# ============================================
# 3. 자동 업데이트
# ============================================
# npm-check-updates 설치
npm install -g npm-check-updates

# 업데이트 가능한 패키지 확인
ncu

# package.json 업데이트
ncu -u

# 의존성 재설치
npm install

# ============================================
# 4. 보안 스캐닝 (CI/CD)
# ============================================
# .github/workflows/security.yml
name: Security Audit

on:
  push:
    paths:
      - 'package.json'
      - 'package-lock.json'

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run audit
        run: npm audit --audit-level=moderate

# ============================================
# 5. 안전한 패키지 사용
# ============================================
// 나쁜 예: 모든 권한 허용
import * as lodash from 'lodash';

// 좋은 예: 필요한 것만 import
import { debounce } from 'lodash-es';

// 검증된 패키지 사용
// - 다운로드 수 많음
// - 유지보수 활발
// - 보안 이슈 기록 확인

console.log('Dependency Security 완료');`}
        />

        <InfoCard type="tip" title="의존성 보안">
          <ul>
            <li>
              <strong>npm audit:</strong> 정기적 취약점 검사
            </li>
            <li>
              <strong>lock 파일:</strong> package-lock.json 커밋
            </li>
            <li>
              <strong>업데이트:</strong> 보안 패치 신속 적용
            </li>
            <li>
              <strong>CI/CD:</strong> 자동 감사 워크플로우
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>XSS:</strong> 인코딩, CSP, DOMPurify
          </li>
          <li>
            <strong>CSRF:</strong> Token, SameSite, Origin 검증
          </li>
          <li>
            <strong>보안 헤더:</strong> CSP, HSTS, X-Frame-Options
          </li>
          <li>
            <strong>인증:</strong> bcrypt, JWT, httpOnly 쿠키
          </li>
          <li>
            <strong>의존성:</strong> npm audit, lock 파일
          </li>
        </ul>
      </section>
    </div>
  );
}
