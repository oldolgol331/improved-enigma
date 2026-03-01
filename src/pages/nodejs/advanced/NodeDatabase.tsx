import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function NodeDatabase() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>데이터베이스 연동</h1>
        <p className="page-description">
          Node.js 에서 MongoDB, PostgreSQL 등의 데이터베이스를 사용하는 방법을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          Node.js 는 다양한 데이터베이스와 연동할 수 있습니다.
          <strong>MongoDB</strong> 는 NoSQL, <strong>PostgreSQL/MySQL</strong> 은 SQL
          데이터베이스입니다.
          <strong>ORM/ODM</strong> 을 사용하면 타입 안전한 데이터베이스 연동이 가능합니다.
        </p>

        <InfoCard type="tip" title="데이터베이스 선택 가이드">
          <table style={{ width: '100%', fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>유형</th>
                <th style={{ textAlign: 'left' }}>데이터베이스</th>
                <th style={{ textAlign: 'left' }}>ORM/ODM</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NoSQL</td>
                <td>MongoDB</td>
                <td>Mongoose, Prisma</td>
              </tr>
              <tr>
                <td>SQL</td>
                <td>PostgreSQL</td>
                <td>Prisma, TypeORM, Sequelize</td>
              </tr>
              <tr>
                <td>SQL</td>
                <td>MySQL</td>
                <td>Prisma, TypeORM, Sequelize</td>
              </tr>
              <tr>
                <td>SQL</td>
                <td>SQLite</td>
                <td>Prisma, Better-SQLite3</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="mongodb">1️⃣ MongoDB 와 Mongoose</h2>
        <p>MongoDB 는 문서 기반 NoSQL 데이터베이스입니다. Mongoose 는 MongoDB ODM 입니다.</p>

        <CodeDemo
          title="MongoDB 와 Mongoose"
          description="Mongoose 로 MongoDB 를 연동합니다."
          defaultCode={`// ===== Mongoose 설치 =====
// npm install mongoose

// ===== 기본 연결 =====
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/myapp');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1);
  }
}

connectDB();

// ===== 스키마 정의 =====
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: 0,
    max: 150
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true  // createdAt, updatedAt 자동 생성
});

// ===== 모델 생성 =====
const User = mongoose.model('User', userSchema);

// ===== CRUD 연산 =====

// 생성
async function createUser() {
  const user = await User.create({
    name: 'Alice',
    email: 'alice@example.com',
    age: 25
  });
  console.log('Created:', user);
}

// 조회
async function findUsers() {
  // 모든 사용자
  const users = await User.find();
  
  // 조건 조회
  const adults = await User.find({ age: { $gte: 20 } });
  
  // 단일 문서
  const user = await User.findOne({ email: 'alice@example.com' });
  
  // ID 로 조회
  const userById = await User.findById('64...');
  
  console.log('Users:', users);
}

// 수정
async function updateUser(id, updates) {
  const user = await User.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  );
  console.log('Updated:', user);
}

// 삭제
async function deleteUser(id) {
  await User.findByIdAndDelete(id);
  console.log('Deleted');
}

// ===== 인덱스 =====
userSchema.index({ email: 1 });  // 단일 필드 인덱스
userSchema.index({ name: 1, age: -1 });  // 복합 인덱스

console.log('Mongoose CRUD operations');`}
        />

        <InfoCard type="tip" title="Mongoose 쿼리 연산자">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <code>$eq</code>: 같음
            </li>
            <li>
              <code>$ne</code>: 같지 않음
            </li>
            <li>
              <code>$gt, $gte</code>: 초과, 이상
            </li>
            <li>
              <code>$lt, $lte</code>: 미만, 이하
            </li>
            <li>
              <code>$in</code>: 배열 포함
            </li>
            <li>
              <code>$regex</code>: 정규식
            </li>
            <li>
              <code>$and, $or</code>: 논리 연산
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="postgresql">2️⃣ PostgreSQL 과 Prisma</h2>
        <p>Prisma 는 타입 안전한 ORM 으로, PostgreSQL, MySQL, SQLite 등을 지원합니다.</p>

        <CodeDemo
          title="PostgreSQL 과 Prisma"
          description="Prisma ORM 으로 SQL 데이터베이스를 연동합니다."
          defaultCode={`// ===== Prisma 설치 =====
// npm install prisma @prisma/client
// npx prisma init

// ===== schema.prisma =====
// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }
//
// generator client {
//   provider = "prisma-client-js"
// }
//
// model User {
//   id        Int      @id @default(autoincrement())
//   email     String   @unique
//   name      String
//   age       Int?
//   posts     Post[]
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }
//
// model Post {
//   id        Int      @id @default(autoincrement())
//   title     String
//   content   String?
//   published Boolean  @default(false)
//   author    User     @relation(fields: [authorId], references: [id])
//   authorId  Int
//   createdAt DateTime @default(now())
// }

// ===== Prisma Client 사용 =====
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ===== CRUD 연산 =====

// 생성
async function createUser() {
  const user = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      age: 25
    }
  });
  console.log('Created:', user);
}

// 조회
async function findUsers() {
  // 모든 사용자
  const users = await prisma.user.findMany();
  
  // 조건 조회
  const adults = await prisma.user.findMany({
    where: { age: { gte: 20 } }
  });
  
  // 단일 조회
  const user = await prisma.user.findUnique({
    where: { email: 'alice@example.com' }
  });
  
  // 관계 포함
  const userWithPosts = await prisma.user.findUnique({
    where: { id: 1 },
    include: { posts: true }
  });
  
  console.log('Users:', users);
}

// 수정
async function updateUser(id, updates) {
  const user = await prisma.user.update({
    where: { id },
    data: updates
  });
  console.log('Updated:', user);
}

// 삭제
async function deleteUser(id) {
  await prisma.user.delete({
    where: { id }
  });
  console.log('Deleted');
}

// 트랜잭션
async function transfer() {
  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: 1 },
      data: { balance: { decrement: 100 } }
    });
    
    await tx.user.update({
      where: { id: 2 },
      data: { balance: { increment: 100 } }
    });
  });
}

// 연결 종료
// await prisma.$disconnect();

console.log('Prisma ORM operations');`}
        />

        <InfoCard type="tip" title="Prisma 마이그레이션">
          <pre style={{ margin: 0, fontSize: '0.8rem' }}>
            {`# 스키마 변경 감지 및 마이그레이션 생성
npx prisma migrate dev --name init

# 프로덕션 마이그레이션
npx prisma migrate deploy

# 데이터베이스 초기화
npx prisma migrate reset

# Prisma Studio (GUI)
npx prisma studio`}
          </pre>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="redis">3️⃣ Redis 캐싱</h2>
        <p>Redis 는 인메모리 키 - 값 저장소로, 캐싱과 세션 관리에 사용됩니다.</p>

        <CodeDemo
          title="Redis 캐싱"
          description="Redis 로 성능을 최적화합니다."
          defaultCode={`// ===== Redis 설치 =====
// npm install redis

// ===== 기본 연결 =====
const { createClient } = require('redis');

const redis = createClient({
  url: 'redis://localhost:6379'
});

redis.on('error', (err) => console.error('Redis Error:', err));

async function connectRedis() {
  await redis.connect();
  console.log('Redis connected');
}

connectRedis();

// ===== 기본 연산 =====

// 문자열 설정/가져오기
async function stringOps() {
  await redis.set('key', 'value');
  const value = await redis.get('key');
  
  // 만료시간 설정 (초)
  await redis.setEx('temp', 3600, 'value');  // 1 시간
  
  console.log('Value:', value);
}

// 해시 (객체) 연산
async function hashOps() {
  await redis.hSet('user:1', {
    name: 'Alice',
    email: 'alice@example.com'
  });
  
  const user = await redis.hGetAll('user:1');
  const name = await redis.hGet('user:1', 'name');
  
  console.log('User:', user);
}

// 리스트 연산
async function listOps() {
  await redis.lPush('queue', 'task1', 'task2');
  const task = await redis.rPop('queue');
  
  console.log('Task:', task);
}

// 집합 연산
async function setOps() {
  await redis.sAdd('tags', 'nodejs', 'redis', 'cache');
  const tags = await redis.sMembers('tags');
  
  console.log('Tags:', tags);
}

// ===== 캐싱 패턴 =====

// 캐시 미들웨어 (Express)
const cache = (duration) => {
  return async (req, res, next) => {
    const key = '__cache__' + req.originalUrl;
    
    const cached = await redis.get(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    const original = res.json.bind(res);
    res.json = (data) => {
      redis.setEx(key, duration, JSON.stringify(data));
      return original(data);
    };
    
    next();
  };
};

// 사용 예시
// app.get('/api/users', cache(300), getUsers);

// ===== 세션 관리 =====
// npm install express-session connect-redis

// const session = require('express-session');
// const RedisStore = require('connect-redis').default;

// app.use(session({
//   store: new RedisStore({ client: redis }),
//   secret: 'your-secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false, maxAge: 3600000 }
// }));

console.log('Redis operations');`}
        />
      </section>

      <section className="content-section">
        <h2 id="connection-pool">4️⃣ 연결 풀 관리</h2>
        <p>데이터베이스 연결 풀을 올바르게 관리하는 방법을 학습합니다.</p>

        <CodeDemo
          title="연결 풀 관리"
          description="효율적인 데이터베이스 연결을 관리합니다."
          defaultCode={`// ===== 연결 풀 설정 (Prisma) =====
// .env
// DATABASE_URL="postgresql://user:password@localhost:5432/mydb?connection_limit=10"

// schema.prisma
// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
//   connectionLimit = 10
// }

// ===== 연결 풀 모범 사례 =====

// 1. 싱글톤 패턴
const { PrismaClient } = require('@prisma/client');

let prisma;

function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });
  }
  return prisma;
}

// 2. 우아한 종료 (Graceful Shutdown)
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

// 3. 재시도 로직
async function retryQuery(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // 지수 백오프
      const delay = Math.pow(2, i) * 100;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// 사용 예시
// const users = await retryQuery(() => prisma.user.findMany());

// 4. 연결 상태 확인
async function healthCheck() {
  try {
    await prisma.$queryRaw\`SELECT 1\`;
    return { status: 'healthy' };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
}

console.log('Connection pool management');`}
        />

        <InfoCard type="warning" title="연결 풀 크기 설정">
          <p>
            연결 풀 크기는 <strong>서버 코어 수 × 2 + 1</strong>이 일반적인 가이드라인입니다.
            <br />
            너무 크면 메모리 낭비, 너무 작으면 대기 시간이 증가합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="validation">5️⃣ 데이터 유효성 검사</h2>
        <p>Zod 를 사용해 타입 안전한 유효성 검사를 구현합니다.</p>

        <CodeDemo
          title="데이터 유효성 검사"
          description="Zod 로 입력값을 검증합니다."
          defaultCode={`// ===== Zod 설치 =====
// npm install zod

// ===== 기본 사용 =====
const { z } = require('zod');

// 스키마 정의
const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().int().min(0).max(150).optional(),
  role: z.enum(['user', 'admin']).default('user')
});

// 검증
function validateUser(data) {
  const result = userSchema.safeParse(data);
  
  if (!result.success) {
    return {
      error: 'Validation failed',
      details: result.error.errors
    };
  }
  
  return { data: result.data };
}

// Express 미들웨어
const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.errors
      });
    }
    
    req.body = result.data;
    next();
  };
};

// 사용 예시
// app.post('/api/users', validate(userSchema), createUser);

// ===== 고급 유효성 검사 =====

// 커스텀 검증
const passwordSchema = z.string()
  .min(8, '비밀번호는 8 자 이상')
  .regex(/[A-Z]/, '대문자 포함')
  .regex(/[a-z]/, '소문자 포함')
  .regex(/[0-9]/, '숫자 포함');

// 변환 (transform)
const numberSchema = z.string()
  .transform(val => parseInt(val, 10))
  .pipe(z.number());

// 정제 (refine)
const signupSchema = z.object({
  password: z.string(),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

// 부분 검증 (PATCH 용)
const updateUserSchema = userSchema.partial();

console.log('Zod validation');`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <strong>MongoDB</strong>: NoSQL, Mongoose ODM 사용
            </li>
            <li>
              <strong>PostgreSQL</strong>: SQL, Prisma ORM 권장
            </li>
            <li>
              <strong>Redis</strong>: 인메모리 캐싱, 세션 관리
            </li>
            <li>
              <strong>연결 풀</strong>: 적절한 크기 설정, 우아한 종료
            </li>
            <li>
              <strong>유효성 검사</strong>: Zod 로 타입 안전 검증
            </li>
            <li>
              <strong>트랜잭션</strong>: 원자적 연산 보장
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
