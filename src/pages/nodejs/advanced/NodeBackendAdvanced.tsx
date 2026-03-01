import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function NodeBackendAdvanced() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Node.js 백엔드 심화</h1>
        <p className="page-description">
          ORM, Docker, CI/CD, 보안 등 Node.js 백엔드 고급 주제에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="orm">1️⃣ ORM (Prisma)</h2>
        <p>
          Prisma 로 타입세이프한 데이터베이스 연동을 합니다.
        </p>

        <CodeDemo
          title="Prisma ORM"
          description="스키마, 마이그레이션, CRUD"
          defaultCode={`// ============================================
// 1. Prisma 설치
// ============================================
// npm install prisma --save-dev
// npm install @prisma/client
// npx prisma init

// ============================================
// 2. 스키마 정의 (schema.prisma)
// ============================================
/*
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
*/

// ============================================
// 3. 마이그레이션
// ============================================
// npx prisma migrate dev --name init
// npx prisma generate

// ============================================
// 4. Prisma Client 사용
// ============================================
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================
// 5. CRUD 연산
// ============================================

// 생성 (Create)
async function createUser() {
  const user = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      posts: {
        create: { title: '첫 게시글', content: '내용' }
      }
    }
  });
  console.log(user);
}

// 읽기 (Read)
async function getUsers() {
  // 모든 사용자
  const users = await prisma.user.findMany();
  
  // 조건부 조회
  const filtered = await prisma.user.findMany({
    where: {
      name: { contains: 'Alice' }
    },
    include: {
      posts: true  // 관계 포함
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10,      // 개수 제한
    skip: 0        // 건너뛰기
  });
  
  // 단일 조회
  const user = await prisma.user.findUnique({
    where: { email: 'alice@example.com' }
  });
  
  return users;
}

// 수정 (Update)
async function updateUser(id: number) {
  const user = await prisma.user.update({
    where: { id },
    data: {
      name: 'Updated Name',
      posts: {
        create: { title: '새 게시글' }
      }
    }
  });
  return user;
}

// 삭제 (Delete)
async function deleteUser(id: number) {
  await prisma.user.delete({
    where: { id }
  });
}

// ============================================
// 6. 트랜잭션
// ============================================
async function transferMoney(fromId: number, toId: number, amount: number) {
  return await prisma.$transaction(async (tx) => {
    await tx.account.update({
      where: { id: fromId },
      data: { balance: { decrement: amount } }
    });
    
    await tx.account.update({
      where: { id: toId },
      data: { balance: { increment: amount } }
    });
  });
}

// ============================================
// 7. Raw Query
// ============================================
async function rawQuery() {
  const users = await prisma.$queryRaw\`
    SELECT * FROM "User" WHERE email LIKE \${'%@example.com'}
  \`;
  
  const result = await prisma.$executeRaw\`
    UPDATE "User" SET name = \${'New Name'} WHERE id = \${1}
  \`;
  
  return users;
}

console.log('Prisma 예시 완료');`}
        />

        <InfoCard type="tip" title="Prisma 장점">
          <ul>
            <li>
              <strong>타입세이프:</strong> 자동 생성된 타입
            </li>
            <li>
              <strong>마이그레이션:</strong> 버전 관리된 스키마
            </li>
            <li>
              <strong>관계:</strong> 쉬운 조인 처리
            </li>
            <li>
              <strong>트랜잭션:</strong> 원자적 연산
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="docker">2️⃣ Docker</h2>
        <p>
          컨테이너로 애플리케이션을 패키징합니다.
        </p>

        <CodeDemo
          title="Docker"
          description="Dockerfile, docker-compose"
          defaultCode={`# ============================================
# 1. Dockerfile (Node.js)
# ============================================
/*
# 베이스 이미지
FROM node:18-alpine

# 작업 디렉토리
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 빌드 (필요시)
RUN npm run build

# 포트 노출
EXPOSE 3000

# 실행 명령
CMD ["node", "dist/index.js"]
*/

# ============================================
# 2. .dockerignore
# ============================================
/*
node_modules
npm-debug.log
.git
.gitignore
.env
dist
*/

# ============================================
# 3. Docker 명령어
# ============================================
// 이미지 빌드
// docker build -t my-app .

// 컨테이너 실행
// docker run -p 3000:3000 my-app

// 백그라운드 실행
// docker run -d -p 3000:3000 --name my-app my-app

// 로그 확인
// docker logs my-app
// docker logs -f my-app  # 실시간

// 컨테이너 중지
// docker stop my-app

// 컨테이너 삭제
// docker rm my-app

// 이미지 삭제
// docker rmi my-app

// ============================================
# 4. docker-compose.yml
# ============================================
/*
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
*/

// ============================================
# 5. Docker Compose 명령어
# ============================================
// 시작
// docker-compose up

// 백그라운드
// docker-compose up -d

// 중지
// docker-compose down

// 로그
// docker-compose logs -f

// 재시작
// docker-compose restart

// 빌드
// docker-compose build

console.log('Docker 예시 완료');`}
        />

        <InfoCard type="tip" title="Docker 팁">
          <ul>
            <li>
              <strong>멀티스테이지:</strong> 빌드 이미지와 실행 이미지 분리
            </li>
            <li>
              <strong>.dockerignore:</strong> 불필요한 파일 제외
            </li>
            <li>
              <strong>볼륨:</strong> 데이터 영속성
            </li>
            <li>
              <strong>네트워크:</strong> 서비스 간 통신
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="cicd">3️⃣ CI/CD</h2>
        <p>
          GitHub Actions 로 자동화 파이프라인을 구축합니다.
        </p>

        <CodeDemo
          title="CI/CD (GitHub Actions)"
          description="워크플로우, 자동화"
          defaultCode={`# ============================================
# 1. .github/workflows/ci.yml
# ============================================
/*
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/testdb
      
      - name: Build
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
*/

# ============================================
# 2. 환경 변수 (Secrets)
# ============================================
// GitHub Settings > Secrets and variables > Actions
// - VERCEL_TOKEN
// - VERCEL_ORG_ID
// - VERCEL_PROJECT_ID
// - DATABASE_URL

# ============================================
# 3. 배포 스크립트
# ============================================
/*
// deploy.sh
#!/bin/bash

set -e  # 에러 시 즉시 종료

echo "Building..."
npm run build

echo "Running tests..."
npm test

echo "Deploying to production..."
vercel --prod

echo "Deployment complete!"
*/

# ============================================
# 4. Docker 배포
# ============================================
/*
name: Docker Deploy

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: \${{ secrets.DOCKER_USERNAME }}
          password: \${{ secrets.DOCKER_PASSWORD }}
      
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          push: true
          tags: user/app:\${{ github.ref_name }}
*/

console.log('CI/CD 예시 완료');`}
        />

        <InfoCard type="tip" title="CI/CD 팁">
          <ul>
            <li>
              <strong>Secrets:</strong> 민감 정보 암호화 저장
            </li>
            <li>
              <strong>Caching:</strong> npm 캐시로 속도 향상
            </li>
            <li>
              <strong>Matrix:</strong> 여러 Node.js 버전 테스트
            </li>
            <li>
              <strong>Environments:</strong> staging/production 분리
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="security">4️⃣ 보안</h2>
        <p>
          웹 애플리케이션 보안을 강화합니다.
        </p>

        <CodeDemo
          title="보안"
          description="XSS, CSRF, Rate Limiting"
          defaultCode={`const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const cors = require('cors');

const app = express();

// ============================================
// 1. 보안 미들웨어
// ============================================

// HTTP 보안 헤더
app.use(helmet());

// CORS 설정
app.use(cors({
  origin: 'https://trusted-domain.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting (DDoS 방지)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 분
  max: 100,  // IP 당 100 요청
  message: '너무 많은 요청이 발생했습니다'
});
app.use('/api/', limiter);

// XSS 방지
app.use(xss());

// ============================================
// 2. 입력 검증
// ============================================
const { body, validationResult } = require('express-validator');

app.post('/api/users', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 })
    .matches(/\\d/).matches(/[A-Z]/),
  body('name').trim().isLength({ min: 1, max: 50 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // 처리 계속
});

// ============================================
// 3. 비밀번호 해싱
// ============================================
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// ============================================
// 4. JWT 토큰 보안
// ============================================
const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }  // 짧은 만료시간
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// ============================================
// 5. SQL 인젝션 방지 (Prisma 사용)
// ============================================
// ❌ 위험: Raw query with string concatenation
// const user = await prisma.$queryRaw\`
//   SELECT * FROM "User" WHERE email = '\${userInput}'
// \`;

// ✅ 안전: Parameterized query
// const user = await prisma.$queryRaw\`
//   SELECT * FROM "User" WHERE email = \${userInput}
// \`;

// ✅ 더 안전: Prisma Client
// const user = await prisma.user.findUnique({
//   where: { email: userInput }
// });

// ============================================
// 6. 환경 변수 관리
// ============================================
// .env (gitignore 에 추가)
/*
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=super-secret-key-change-in-production
API_KEY=your-api-key
*/

require('dotenv').config();

// ============================================
// 7. 보안 체크리스트
// ============================================
/*
- [ ] HTTPS 사용
- [ ] 보안 헤더 설정 (helmet)
- [ ] 입력 검증
- [ ] 비밀번호 해싱
- [ ] Rate Limiting
- [ ] CORS 설정
- [ ] SQL 인젝션 방지
- [ ] XSS 방지
- [ ] CSRF 토큰
- [ ] 환경 변수 관리
- [ ] 의존성 업데이트 (npm audit)
- [ ] 로그 관리 (민감 정보 제외)
*/

console.log('보안 예시 완료');`}
        />

        <InfoCard type="warning" title="보안 필수 항목">
          <ul>
            <li>
              <strong>HTTPS:</strong> 암호화 통신
            </li>
            <li>
              <strong>입력 검증:</strong> 모든 입력 검증
            </li>
            <li>
              <strong>비밀번호:</strong> bcrypt 해싱
            </li>
            <li>
              <strong>의존성:</strong> <code>npm audit</code> 정기 점검
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Prisma:</strong> 타입세이프 ORM, 마이그레이션
          </li>
          <li>
            <strong>Docker:</strong> 컨테이너화, docker-compose
          </li>
          <li>
            <strong>CI/CD:</strong> GitHub Actions, 자동화
          </li>
          <li>
            <strong>보안:</strong> helmet, rate limiting, 입력 검증
          </li>
          <li>
            <strong>JWT:</strong> 토큰 인증, 짧은 만료시간
          </li>
          <li>
            <strong>환경 변수:</strong> .env, gitignore
          </li>
        </ul>
      </section>
    </div>
  );
}