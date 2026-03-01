# 🤝 기여하기 (Contributing)

**Dev Learning Hub** 에 기여해주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 안내합니다.

---

## 📑 목차

- [행동 강령](#-행동-강령)
- [기여 방법](#-기여-방법)
- [개발 환경 설정](#-개발-환경-설정)
- [코드 스타일](#-코드-스타일)
- [커밋 컨벤션](#-커밋-컨벤션)
- [Pull Request 가이드라인](#-pull-request-가이드라인)
- [테스트](#-테스트)
- [도움이 필요한 경우](#-도움이-필요한-경우)

---

## 🧭 행동 강령

이 프로젝트는 **모든 기여자에게 개방적이고 존중하는 환경**을 지향합니다. 다음 원칙을 지켜주세요:

- 🤝 모든 사람을 존중하고 포용하세요
- 💬 건설적인 피드백을 주고받으세요
- 🌍 다양한 배경과 관점을 존중하세요
- 🎯 프로젝트의 목표와 방향성에 맞춰 기여하세요

---

## 🚀 기여 방법

### 1. 이슈 확인

- [기존 이슈](https://github.com/your-username/dev-learning-hub/issues) 를 확인하여 중복을 피하세요
- 새로운 이슈를 생성하여 제안하거나 버그를 보고하세요

### 2. 포크 및 브랜치 생성

```bash
# 저장소 포크 (GitHub 웹 UI)

# 로컬에 클론
git clone https://github.com/YOUR_USERNAME/dev-learning-hub.git
cd dev-learning-hub

# 브랜치 생성
git checkout -b feature/your-feature-name
# 또는
git checkout -b fix/issue-123
```

### 3. 개발 및 테스트

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 테스트 실행
npm run test

# 타입 체크 및 린트
npm run build:check
npm run lint
```

### 4. 커밋 및 푸시

[커밋 컨벤션](#-커밋-컨벤션) 을 따라 커밋 메시지를 작성하세요.

```bash
git add .
git commit -m "feat: Add your feature description"
git push origin feature/your-feature-name
```

### 5. Pull Request 생성

GitHub 에서 Pull Request 를 생성하고 템플릿을 작성하세요.

---

## 🛠️ 개발 환경 설정

### 사전 요구사항

- **Node.js** 18.x 이상
- **npm** 9.x 이상
- **Git** 최신 버전

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/frontend-learning-hub.git
cd frontend-learning-hub

# 의존성 설치
npm install

# Git 훅 설정 (선택사항)
# husky 등을 사용하는 경우
```

### IDE 설정

- **VS Code** 권장
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 확장 설치
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 확장 설치
- `.vscode/settings.json` 이 자동으로 적용됩니다

---

## 📝 코드 스타일

### 일반 원칙

- **TypeScript** 를 기본으로 사용
- **함수형 컴포넌트** 와 **Hooks** 우선
- **명시적 타입** 선언 (any 지양)
- **의미 있는 변수명** 사용

### 네이밍 컨벤션

| 항목 | 규칙 | 예시 |
|------|------|------|
| **컴포넌트** | PascalCase | `CodeDemo`, `InfoCard` |
| **함수/변수** | camelCase | `handleClick`, `userData` |
| **상수** | UPPER_SNAKE_CASE | `MAX_COUNT`, `API_URL` |
| **타입/인터페이스** | PascalCase | `UserProps`, `ApiResponse` |
| **파일명** | PascalCase (컴포넌트), camelCase (유틸리티) | `CodeDemo.tsx`, `typeUtils.ts` |

### Import 순서

```typescript
// 1. React 및 라이브러리
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

// 2. 절대 경로 (@)
import CodeDemo from '@components/CodeDemo';
import { useTheme } from '@hooks/useTheme';

// 3. 상대 경로
import { formatDate } from '../../utils/date';

// 4. 스타일
import './Component.css';
```

### 주석 가이드라인

- **왜 (Why)** 를 설명하는 주석 작성
- **어떻게 (How)** 는 코드가 스스로 설명하도록
- **한국어 주석** 사용 (프로젝트 표준)
- JSDoc 은 복잡한 함수/타입에 한해 사용

```typescript
/**
 * localStorage 에 상태를 저장하고 불러오는 커스텀 Hook
 * @template T 저장할 값의 타입
 * @param {string} key - 로컬 스토리지 키
 * @param {T} initialValue - 초기값
 * @returns {[T, (value: T) => void]} [상태, 설정함수]
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // ...
}
```

---

## 📋 커밋 컨벤션

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 를 따릅니다.

### 커밋 타입

| Type | 설명 | 예시 |
|------|------|------|
| `feat` | 새로운 기능 추가 | `feat: Add syntax highlighting to CodeDemo` |
| `fix` | 버그 수정 | `fix: Resolve type error in TSAdvancedTypes` |
| `refactor` | 코드 리팩토링 (동작 변경 없음) | `refactor: Extract loading logic to custom hook` |
| `style` | 코드 포맷팅, 주석 (동작 변경 없음) | `style: Fix indentation in App.tsx` |
| `docs` | 문서 수정 | `docs: Update README installation guide` |
| `test` | 테스트 추가/수정 | `test: Add unit tests for typeUtils` |
| `chore` | 빌드 설정, 패키지 관리 | `chore: Update vitest to version 4.0` |
| `perf` | 성능 최적화 | `perf: Lazy load page components` |
| `ci` | CI/CD 설정 | `ci: Add GitHub Actions workflow` |

### 커밋 메시지 형식

```
<type>(<scope>): <subject>

<body> (선택사항)

<footer> (선택사항)
```

#### 예시

```
feat(components): Add ErrorBoundary component

- 에러 발생 시 폴백 UI 표시
- 커스텀 폴백 지원
- 에러 상세 정보 토글 기능

Closes #42
```

```
fix(pages): Resolve TypeScript Advanced page rendering issue

- JSX 내 타입 표기법 수정
- 템플릿 리터럴 이스케이프 처리

Fixes #128
```

---

## 🔄 Pull Request 가이드라인

### PR 작성 전 체크리스트

- [ ] 코드가 빌드됩니다 (`npm run build:check`)
- [ ] 모든 테스트가 통과합니다 (`npm run test`)
- [ ] 린트 에러가 없습니다 (`npm run lint`)
- [ ] 관련 문서 (README 등) 를 업데이트했습니다
- [ ] 변경 사항을 PR 설명에 명확히 기술했습니다

### PR 템플릿

PR 을 생성할 때 다음 내용을 포함하세요:

```markdown
## 작업 내용
<!-- 이 PR 이 수행하는 작업을 설명하세요 -->

## 변경 사항
<!-- 주요 변경 사항을 나열하세요 -->
- 

## 관련 이슈
<!-- 관련된 이슈 번호를 작성하세요 -->
- Closes #

## 테스트 방법
<!-- 변경 사항을 테스트하는 방법을 작성하세요 -->
1. 
2. 

## 스크린샷 (선택)
<!-- UI 변경 사항이 있다면 스크린샷을 첨부하세요 -->
```

### 코드 리뷰

- 모든 PR 은 최소 1 명의 리뷰어가 승인해야 머지됩니다
- 리뷰어는 24 시간 이내에 피드백을 제공하도록 노력합니다
- 리뷰 피드백은 건설적이고 구체적으로 작성합니다

---

## 🧪 테스트

### 테스트 작성 가이드라인

- **단위 테스트**: 유틸리티 함수, 커스텀 Hooks
- **컴포넌트 테스트**: 사용자 상호작용이 있는 UI
- **커버리지 목표**: 80% 이상

```bash
# 테스트 실행
npm run test

# 커버리지 리포트
npm run test:coverage

# UI 와 함께 실행
npm run test:ui
```

### 테스트 예시

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import InfoCard from '@components/InfoCard';

describe('InfoCard', () => {
  it('기본 info 타입으로 렌더링된다', () => {
    render(<InfoCard>테스트 내용</InfoCard>);
    expect(screen.getByText('INFO')).toBeInTheDocument();
    expect(screen.getByText('테스트 내용')).toBeInTheDocument();
  });
});
```

---

## 📞 도움이 필요한 경우

- **이슈 생성**: [새 이슈 만들기](https://github.com/your-username/frontend-learning-hub/issues/new)
- **Discussions**: GitHub Discussions 에서 질문
- **이메일**: your-email@example.com

---

## 🙏 기여자 목록

이 프로젝트에 기여해주신 모든 분들께 감사드립니다!

[![Contributors](https://contrib.rocks/image?repo=your-username/frontend-learning-hub)](https://github.com/your-username/frontend-learning-hub/graphs/contributors)

---

**감사합니다! 🎉**

[⬆️ Top](#-기여하기)
