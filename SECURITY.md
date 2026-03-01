# 🔒 보안 정책 (Security Policy)

## 지원되는 버전

현재 지원되는 버전은 다음과 같습니다:

| 버전 | 지원 상태 |
|------|----------|
| 1.x.x | ✅ 지원 중 |
| < 1.0 | ❌ 지원 종료 |

## 취약점 보고

보안 취약점을 발견하신다면 **공개 이슈로 보고하지 마세요**. 대신 아래 방법으로 비공개로 보고해주세요:

### 보고 방법

1. **이메일**: security@example.com
2. **GitHub Private Vulnerability Reporting**: [취약점 보고](https://github.com/your-username/frontend-learning-hub/security/advisories/new)

### 보고 시 포함할 내용

- 취약점의 종류와 설명
- 취약점을 재현하는 방법
- 영향을 받는 버전
- 가능한 경우 해결 방안 또는 패치

### 응답 시간

- **초기 응답**: 48 시간 이내
- **수정 일정**: 7 일 이내 공유
- **패치 배포**: 심각도에 따라 1-4 주 이내

## 보안 가이드라인

### 개발자 준수 사항

1. **의존성 관리**
   - 정기적으로 `npm audit` 실행
   - 보안 업데이트 신속히 적용

2. **환경 변수**
   - `.env` 파일은 Git 에 커밋하지 않음
   - 민감한 정보는 환경 변수로 관리

3. **XSS 방지**
   - 사용자 입력은 항상 검증
   - `dangerouslySetInnerHTML` 사용 금지 (필요시 신중한 검토)

4. **CSRF 방지**
   - 중요한 작업에는 토큰 검증 구현

5. **콘텐츠 보안**
   - CSP (Content Security Policy) 설정 권장

## 보안 업데이트

보안 업데이트는 다음과 같이 공지됩니다:

- GitHub Security Advisories
- 릴리스 노트
- Major 버전 업데이트 시 마이그레이션 가이드

---

**책임 있는 공개 (Responsible Disclosure)** 에 협조해주셔서 감사합니다.
