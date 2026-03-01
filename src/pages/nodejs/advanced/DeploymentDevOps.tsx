import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function DeploymentDevOps() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>배포와 DevOps</h1>
        <p className="page-description">
          Docker, GitHub Actions, Vercel/Netlify 를 활용한 배포와 CI/CD 파이프라인을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="docker">1️⃣ Docker 컨테이너</h2>
        <p>
          Docker 를 사용한 애플리케이션 컨테이너화입니다.
        </p>

        <CodeDemo
          title="Docker"
          description="Dockerfile, docker-compose, 멀티 스테이지"
          defaultCode={`# ============================================
# 1. 기본 Dockerfile
# ============================================
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# 패키지 파일 복사 (캐시 활용)
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 소스 코드 복사
COPY . .

# 빌드
RUN npm run build

# 포트 노출
EXPOSE 3000

# 앱 실행
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]

# ============================================
# 2. 멀티 스테이지 빌드 (권장)
# ============================================
# Dockerfile.multi-stage
# 빌드 스테이지
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 프로덕션 스테이지
FROM nginx:alpine

# 빌드 결과 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# ============================================
# 3. docker-compose.yml
# ============================================
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
  
  # 또는 Nginx 사용
  nginx:
    build:
      context: .
      dockerfile: Dockerfile.multi-stage
    ports:
      - "80:80"
    restart: unless-stopped

# ============================================
# 4. Nginx 설정
# ============================================
# nginx.conf
server {
  listen 80;
  server_name localhost;
  root /usr/share/nginx/html;
  index index.html;
  
  # SPA 라우팅
  location / {
    try_files $uri $uri/ /index.html;
  }
  
  # 정적 자산 캐싱
  location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
  
  # Gzip 압축
  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}

# ============================================
# 5. Docker 명령어
# ============================================
# 빌드
docker build -t my-app .

# 실행
docker run -p 3000:3000 my-app

# docker-compose
docker-compose up -d  # 백그라운드 시작
docker-compose down   # 중지
docker-compose logs -f  # 로그 확인

console.log('Docker 완료');`}
        />

        <InfoCard type="tip" title="Docker 모범 사례">
          <ul>
            <li>
              <strong>Alpine 이미지:</strong> 작은 크기, 보안
            </li>
            <li>
              <strong>멀티 스테이지:</strong> 최종 이미지 크기 최소화
            </li>
            <li>
              <strong>.dockerignore:</strong> 불필요 파일 제외
            </li>
            <li>
              <strong>논루트 사용자:</strong> 보안 강화
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="github-actions">2️⃣ GitHub Actions</h2>
        <p>
          GitHub Actions 를 사용한 CI/CD 자동화입니다.
        </p>

        <CodeDemo
          title="GitHub Actions"
          description="워크플로우, Jobs, Steps"
          defaultCode={`# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

# 환경 변수
env:
  NODE_VERSION: '20'

jobs:
  # ============================================
  # 1. 린트 및 타입 체크
  # ============================================
  lint-and-typecheck:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run typecheck

  # ============================================
  # 2. 테스트
  # ============================================
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: false

  # ============================================
  # 3. 빌드
  # ============================================
  build:
    needs: [lint-and-typecheck, test]
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  # ============================================
  # 4. 배포 (main 브랜치만)
  # ============================================
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
          working-directory: ./

console.log('GitHub Actions 완료');`}
        />

        <InfoCard type="tip" title="GitHub Actions 팁">
          <ul>
            <li>
              <strong>cache:</strong> npm 의존성 캐시
            </li>
            <li>
              <strong>needs:</strong> 잡 의존성
            </li>
            <li>
              <strong>if:</strong> 조건부 실행
            </li>
            <li>
              <strong>secrets:</strong> 민감 정보 관리
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="vercel">3️⃣ Vercel 배포</h2>
        <p>
          Vercel 을 사용한 빠른 배포입니다.
        </p>

        <CodeDemo
          title="Vercel"
          description="CLI, GitHub 연동, 설정"
          defaultCode={`# ============================================
# 1. Vercel CLI 설치
# ============================================
npm i -g vercel

# ============================================
# 2. 로그인
# ============================================
vercel login

# ============================================
# 3. 프로젝트 링크
# ============================================
vercel link

# ============================================
# 4. 배포
# ============================================
# 개발 미리보기
vercel

# 프로덕션 배포
vercel --prod

# ============================================
# 5. vercel.json 설정
# ============================================
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

# ============================================
# 6. GitHub 연동 (자동 배포)
# ============================================
# 1. Vercel 대시보드에서 GitHub 리포지토리 연결
# 2. main 브랜치 → 프로덕션 자동 배포
# 3. PR → 미리보기 URL 자동 생성

# ============================================
# 7. 환경 변수
# ============================================
# Vercel 대시보드 → Settings → Environment Variables
# 또는 vercel.json
{
  "env": {
    "API_URL": "https://api.example.com"
  },
  "build": {
    "env": {
      "BUILD_VAR": "value"
    }
  }
}

console.log('Vercel 완료');`}
        />

        <InfoCard type="tip" title="Vercel 장점">
          <ul>
            <li>
              <strong>간단한 배포:</strong> git push 만으로 배포
            </li>
            <li>
              <strong>미리보기:</strong> PR 별 자동 미리보기 URL
            </li>
            <li>
              <strong>글로벌 CDN:</strong> 전 세계 엣지
            </li>
            <li>
              <strong>자동 HTTPS:</strong> SSL 인증서 자동
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="netlify">4️⃣ Netlify 배포</h2>
        <p>
          Netlify 를 사용한 배포와 서버리스 함수입니다.
        </p>

        <CodeDemo
          title="Netlify"
          description="netlify.toml, Functions, Forms"
          defaultCode={`# ============================================
# 1. netlify.toml 설정
# ============================================
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
  NPM_VERSION = "10"

# SPA 라우팅
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# 헤더 설정
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# 보안 헤더
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

# ============================================
# 2. Netlify CLI
# ============================================
npm install -g netlify-cli

# 로그인
netlify login

# 사이트 링크
netlify link

# 수동 배포
netlify deploy

# 프로덕션 배포
netlify deploy --prod

# ============================================
# 3. 서버리스 함수
# ============================================
// netlify/functions/hello.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Netlify Function!'
    })
  };
};

// 사용
fetch('/.netlify/functions/hello')
  .then(res => res.json())
  .then(data => console.log(data));

# ============================================
# 4. Netlify Forms
# ============================================
# HTML 폼 (자동 처리)
<form name="contact" method="POST" data-netlify="true">
  <input type="text" name="name" />
  <input type="email" name="email" />
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>

# ============================================
# 5. 환경 변수
# ============================================
# Netlify 대시보드 → Site settings → Build & deploy → Environment
# 또는 netlify.toml
[build.environment]
  API_KEY = "your-api-key"

console.log('Netlify 완료');`}
        />

        <InfoCard type="tip" title="Netlify 기능">
          <ul>
            <li>
              <strong>Forms:</strong> 백엔드 없이 폼 처리
            </li>
            <li>
              <strong>Functions:</strong> 서버리스 함수
            </li>
            <li>
              <strong>Identity:</strong> 사용자 인증
            </li>
            <li>
              <strong>Split Testing:</strong> A/B 테스트
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="monitoring">5️⃣ 모니터링</h2>
        <p>
          배포 후 애플리케이션 모니터링입니다.
        </p>

        <CodeDemo
          title="Monitoring"
          description="에러 추적, 성능 모니터링, 로그"
          defaultCode={`// ============================================
// 1. Sentry (에러 추적)
// ============================================
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://your-dsn@sentry.io/123456",
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
  environment: "production",
});

// 에러 보고
Sentry.captureException(new Error('Test error'));

// ============================================
// 2. Web Vitals (성능 모니터링)
// ============================================
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

function reportMetric(metric) {
  // 분석 서비스로 전송
  console.log(metric);
  
  // 또는 API 로 전송
  navigator.sendBeacon('/analytics', JSON.stringify(metric));
}

onCLS(reportMetric);
onFID(reportMetric);
onFCP(reportMetric);
onLCP(reportMetric);
onTTFB(reportMetric);

// ============================================
// 3. Google Analytics
// ============================================
// React GA4
import ReactGA from "react-ga4";

ReactGA.initialize("G-XXXXXXXXXX");

// 페이지 뷰 추적
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

// 이벤트 추적
ReactGA.event({
  category: "User",
  action: "Clicked Button",
  label: "CTA Button"
});

// ============================================
// 4. 로그 수집
// ============================================
// Logtail, Datadog, New Relic 등 사용
import { Logger } from '@logtail/browser';

const logtail = new Logger("your-source-token");

logtail.info("User logged in", { userId: 123 });
logtail.error("Payment failed", { orderId: 456 });

// ============================================
// 5. Uptime 모니터링
// ============================================
// UptimeRobot, Pingdom, Statuspage
// - HTTP 상태 코드 확인
// - 응답 시간 모니터링
// - 장애 시 알림 (이메일, Slack, SMS)

console.log('Monitoring 완료');`}
        />

        <InfoCard type="tip" title="모니터링 도구">
          <ul>
            <li>
              <strong>Sentry:</strong> 에러 추적 및 보고
            </li>
            <li>
              <strong>Web Vitals:</strong> 사용자 경험 지표
            </li>
            <li>
              <strong>Google Analytics:</strong> 사용자 분석
            </li>
            <li>
              <strong>UptimeRobot:</strong> 가용성 모니터링
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Docker:</strong> 컨테이너화, 멀티 스테이지 빌드
          </li>
          <li>
            <strong>GitHub Actions:</strong> CI/CD 파이프라인
          </li>
          <li>
            <strong>Vercel:</strong> 빠른 배포, 미리보기
          </li>
          <li>
            <strong>Netlify:</strong> Forms, Functions
          </li>
          <li>
            <strong>Monitoring:</strong> Sentry, Web Vitals, Analytics
          </li>
        </ul>
      </section>
    </div>
  );
}
