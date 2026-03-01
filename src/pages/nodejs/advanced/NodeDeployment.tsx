import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function NodeDeployment() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>배포와 운영</h1>
        <p className="page-description">
          Node.js 애플리케이션을 프로덕션에 배포하고 운영하는 방법을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          Node.js 애플리케이션을 프로덕션에 배포하려면{' '}
          <strong>빌드, 컨테이너화, 오케스트레이션, 모니터링</strong>
          등의 과정을 이해해야 합니다. Docker, Kubernetes, 클라우드 서비스를 활용한 배포 방법을
          학습합니다.
        </p>
      </section>

      <section className="content-section">
        <h2 id="docker">1️⃣ Docker 컨테이너화</h2>
        <p>Docker 를 사용해 애플리케이션을 컨테이너로 패키징합니다.</p>

        <CodeDemo
          title="Docker 컨테이너화"
          description="Dockerfile 로 애플리케이션을 패키징합니다."
          defaultCode={`# ===== Dockerfile 예시 =====
# 멀티 스테이지 빌드 (권장)

# 1 단계: 빌드
FROM node:20-alpine AS builder

WORKDIR /app

# package.json 먼저 복사 (캐시 활용)
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 빌드 (TypeScript 등)
RUN npm run build

# 2 단계: 프로덕션
FROM node:20-alpine

# 보안: 루트 아닌 사용자 생성
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nodejs -u 1001

WORKDIR /app

# 빌드 단계에서 결과물 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# 소유권 변경
RUN chown -R nodejs:nodejs /app

USER nodejs

# 포트 노출
EXPOSE 3000

# 헬스체크
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# 애플리케이션 실행
CMD ["node", "dist/index.js"]

# ===== docker-compose.yml =====
# version: '3.8'

# services:
#   app:
#     build: .
#     ports:
#       - "3000:3000"
#     environment:
#       - NODE_ENV=production
#       - DATABASE_URL=postgresql://user:pass@db:5432/mydb
#     depends_on:
#       - db
#     restart: unless-stopped

#   db:
#     image: postgres:15-alpine
#     environment:
#       - POSTGRES_USER=user
#       - POSTGRES_PASSWORD=pass
#       - POSTGRES_DB=mydb
#     volumes:
#       - postgres_data:/var/lib/postgresql/data

# volumes:
#   postgres_data:

console.log('Docker containerization');`}
        />

        <InfoCard type="tip" title="Docker 모범 사례">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>멀티 스테이지 빌드</strong>: 이미지 크기 감소
            </li>
            <li>
              <strong>Alpine 이미지</strong>: 경량화 (보안 취약점 주의)
            </li>
            <li>
              <strong>루트 사용자 금지</strong>: 보안 강화
            </li>
            <li>
              <strong>.dockerignore</strong>: 불필요 파일 제외
            </li>
            <li>
              <strong>헬스체크</strong>: 컨테이너 상태 모니터링
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="pm2">2️⃣ PM2 프로세스 관리자</h2>
        <p>PM2 는 Node.js 애플리케이션을 위한 프로세스 관리자입니다.</p>

        <CodeDemo
          title="PM2 프로세스 관리자"
          description="PM2 로 애플리케이션을 운영합니다."
          defaultCode={`// ===== PM2 설치 =====
// npm install -g pm2

// ===== 기본 명령어 =====
// 애플리케이션 시작
// pm2 start dist/index.js --name my-app

// 클러스터 모드 (모든 CPU 코어 사용)
// pm2 start dist/index.js -i max

// 설정 파일로 시작
// pm2 start ecosystem.config.js

// 상태 확인
// pm2 status
// pm2 monit

// 로그 확인
// pm2 logs
// pm2 logs my-app --lines 100

// 재시작
// pm2 restart my-app
// pm2 reload my-app  // 무중단 재시작

// 중지
// pm2 stop my-app
// pm2 delete my-app

// ===== ecosystem.config.js =====
module.exports = {
  apps: [{
    name: 'my-app',
    script: 'dist/index.js',
    instances: 'max',  // CPU 코어 수만큼
    exec_mode: 'cluster',
    
    // 환경 변수
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 80
    },
    
    // 자동 재시작
    autorestart: true,
    watch: false,
    
    // 재시작 제한
    max_memory_restart: '500M',
    max_restarts: 10,
    min_uptime: '10s',
    
    // 로그 설정
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    merge_logs: true,
    
    // 헬스체크
    health_check: {
      path: '/health',
      timeout: 3000,
      interval: 30000
    }
  }]
};

// ===== 시스템 시작 시 자동 실행 =====
// pm2 startup
// pm2 save

console.log('PM2 process manager');`}
        />

        <InfoCard type="tip" title="PM2 클러스터 모드">
          <p>
            <code>instances: 'max'</code> 또는 <code>instances: 4</code>로 설정하면 Node.js 의 단일
            스레드 제한을 넘어 <strong>모든 CPU 코어를 활용</strong>할 수 있습니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="cloud-deploy">3️⃣ 클라우드 배포</h2>
        <p>주요 클라우드 플랫폼에 Node.js 애플리케이션을 배포합니다.</p>

        <CodeDemo
          title="클라우드 배포"
          description="Vercel, AWS, GCP 에 배포합니다."
          defaultCode={`// ===== Vercel (프론트엔드/서버리스) =====
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}

// api/index.ts (서버리스 함수)
// export default (req, res) => {
//   res.status(200).json({ hello: 'world' });
// };

// 배포
// npm i -g vercel
// vercel login
// vercel

// ===== AWS Elastic Beanstalk =====
// .elasticbeanstalk/config.yml
// branch-defaults:
//   main:
//     environment: my-app-env

// 배포
// eb init -p node.js my-app
// eb create my-app-env
// eb open

// ===== AWS ECS (Docker) =====
// Dockerfile 필요 (위 참조)

// 1. ECR 에 이미지 푸시
// aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.<region>.amazonaws.com
// docker build -t my-app .
// docker tag my-app:latest <account>.dkr.ecr.<region>.amazonaws.com/my-app:latest
// docker push <account>.dkr.ecr.<region>.amazonaws.com/my-app:latest

// 2. ECS 태스크 정의 생성
// 3. ECS 서비스 배포

// ===== GCP Cloud Run =====
// gcloud config set project my-project
// gcloud run deploy my-app \\
//   --image gcr.io/my-project/my-app \\
//   --platform managed \\
//   --region us-central1 \\
//   --allow-unauthenticated

// ===== GitHub Actions (CI/CD) =====
// .github/workflows/deploy.yml
// name: Deploy
// on:
//   push:
//     branches: [main]

// jobs:
//   deploy:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v3
//       - uses: actions/setup-node@v3
//         with:
//           node-version: '20'
//       - run: npm ci
//       - run: npm run build
//       - run: npm test
//       - name: Deploy to Vercel
//         uses: amondnet/vercel-action@v20
//         with:
//           vercel-token: \${{ secrets.VERCEL_TOKEN }}
//           vercel-org-id: \${{ secrets.ORG_ID }}
//           vercel-project-id: \${{ secrets.PROJECT_ID }}

console.log('Cloud deployment options');`}
        />
      </section>

      <section className="content-section">
        <h2 id="monitoring">4️⃣ 모니터링과 로깅</h2>
        <p>애플리케이션 상태를 모니터링하고 로그를 수집합니다.</p>

        <CodeDemo
          title="모니터링과 로깅"
          description="애플리케이션 상태를 모니터링합니다."
          defaultCode={`// ===== Winston 로거 =====
// npm install winston winston-daily-rotate-file

const winston = require('winston');
const { combine, timestamp, printf, errors } = winston.format;

// 커스텀 포맷
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return \`\${timestamp} [\${level}]: \${stack || message}\`;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // 에러 로그 파일
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d'
    }),
    // 모든 로그 파일
    new winston.transports.DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d'
    }),
    // 콘솔
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// 사용 예시
// logger.info('Application started');
// logger.error('Database connection failed', { error });
// logger.warn('High memory usage', { memory: process.memoryUsage() });

// ===== 메트릭 수집 (Prometheus) =====
// npm install prom-client

const client = require('prom-client');

// 메트릭 등록
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// 커스텀 메트릭
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// 미들웨어
// app.use((req, res, next) => {
//   const start = Date.now();
//   
//   res.on('finish', () => {
//     const duration = (Date.now() - start) / 1000;
//     httpRequestDuration
//       .labels(req.method, req.route?.path || 'unknown', res.statusCode)
//       .observe(duration);
//     
//     httpRequestCounter
//       .labels(req.method, req.route?.path || 'unknown', res.statusCode)
//       .inc();
//   });
//   
//   next();
// });

// 메트릭 엔드포인트
// app.get('/metrics', async (req, res) => {
//   res.set('Content-Type', client.register.contentType);
//   res.end(await client.register.metrics());
// });

// ===== 헬스체크 엔드포인트 =====
// app.get('/health', (req, res) => {
//   res.status(200).json({
//     status: 'healthy',
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//     memory: process.memoryUsage(),
//     version: process.env.npm_package_version
//   });
// });

// app.get('/ready', async (req, res) => {
//   try {
//     // 데이터베이스 연결 확인
//     await prisma.$queryRaw\`SELECT 1\`;
//     
//     // Redis 연결 확인
//     await redis.ping();
//     
//     res.status(200).json({ status: 'ready' });
//   } catch (error) {
//     res.status(503).json({ status: 'not ready', error: error.message });
//   }
// });

console.log('Monitoring and logging');`}
        />

        <InfoCard type="tip" title="모니터링 도구">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>Prometheus + Grafana</strong>: 메트릭 수집 및 시각화
            </li>
            <li>
              <strong>ELK Stack</strong>: 로그 수집 및 분석
            </li>
            <li>
              <strong>Sentry</strong>: 에러 추적
            </li>
            <li>
              <strong>New Relic</strong>: APM (Application Performance Monitoring)
            </li>
            <li>
              <strong>Datadog</strong>: 통합 모니터링
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="ci-cd">5️⃣ CI/CD 파이프라인</h2>
        <p>GitHub Actions 를 사용한 자동화 파이프라인을 구축합니다.</p>

        <CodeDemo
          title="CI/CD 파이프라인"
          description="GitHub Actions 로 자동화를 구축합니다."
          defaultCode={`# ===== .github/workflows/ci.yml =====
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # 1. 테스트 및 린트
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npx tsc --noEmit
      
      - name: Test
        run: npm test
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test_db
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  # 2. 빌드 및 Docker 이미지 생성
  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to Container Registry
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: |
            ghcr.io/\${{ github.repository }}:latest
            ghcr.io/\${{ github.repository }}:\${{ github.sha }}
          cache-from: type=registry,ref=ghcr.io/\${{ github.repository }}:buildcache
          cache-to: type=registry,ref=ghcr.io/\${{ github.repository }}:buildcache,mode=max

  # 3. 배포
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to production
        run: |
          echo "Deploying to production..."
          # kubectl apply -f k8s/
          # 또는 AWS/GCP 배포 명령어
        env:
          DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}

console.log('CI/CD pipeline setup');`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <strong>Docker</strong>: 멀티 스테이지 빌드, 컨테이너화
            </li>
            <li>
              <strong>PM2</strong>: 프로세스 관리, 클러스터 모드
            </li>
            <li>
              <strong>클라우드</strong>: Vercel, AWS, GCP 배포 옵션
            </li>
            <li>
              <strong>모니터링</strong>: Winston 로깅, Prometheus 메트릭
            </li>
            <li>
              <strong>헬스체크</strong>: /health, /ready 엔드포인트
            </li>
            <li>
              <strong>CI/CD</strong>: GitHub Actions 자동화 파이프라인
            </li>
            <li>
              <strong>보안</strong>: 루트 사용자 금지, 헬스체크 설정
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
