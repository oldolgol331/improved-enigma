import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function HTMLForms() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>HTML Forms</h1>
        <p className="page-description">
          HTML 폼과 입력 요소에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>폼 (Form)</strong> 은 사용자로부터 데이터를 입력받는 HTML 요소입니다.
          회원가입, 로그인, 검색, 문의하기 등 다양한 곳에서 사용됩니다.
        </p>

        <InfoCard type="tip" title="폼 구성 요소">
          <ul>
            <li>
              <code>&lt;form&gt;</code>: 폼 컨테이너
            </li>
            <li>
              <code>&lt;input&gt;</code>: 입력 필드
            </li>
            <li>
              <code>&lt;label&gt;</code>: 입력 필드 설명
            </li>
            <li>
              <code>&lt;button&gt;</code>: 제출 버튼
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="form-basics">1️⃣ 폼 기본 구조</h2>
        <p>
          폼의 기본 구조와 속성을 학습합니다.
        </p>

        <CodeDemo
          title="폼 기본 구조"
          description="form, action, method"
          defaultCode={`<!-- 1. 기본 폼 -->
<form action="/submit" method="POST">
  <label for="name">이름:</label>
  <input type="text" id="name" name="name">
  
  <button type="submit">제출</button>
</form>

<!-- 2. 폼 속성 -->
<form 
  action="/api/users"    <!-- 데이터 전송 URL -->
  method="POST"          <!-- HTTP 메서드: GET, POST -->
  enctype="multipart/form-data"  <!-- 인코딩 타입 -->
  target="_blank"        <!-- 응답 표시 위치 -->
  autocomplete="on"      <!-- 자동 완성 -->
  novalidate             <!-- 브라우저 검증 비활성화 -->
>
  <!-- 폼 요소들 -->
  <button type="submit">전송</button>
</form>

<!-- 3. method 차이 -->
<!-- GET: URL 에 데이터 표시 (검색어 등) -->
<form action="/search" method="GET">
  <input type="text" name="q" placeholder="검색어">
  <button type="submit">검색</button>
</form>

<!-- POST: URL 에 데이터 안 표시 (비밀번호 등) -->
<form action="/login" method="POST">
  <input type="text" name="username">
  <input type="password" name="password">
  <button type="submit">로그인</button>
</form>

<!-- 4. 인코딩 타입 -->
<!-- application/x-www-form-urlencoded (기본) -->
<!-- multipart/form-data (파일 업로드) -->
<!-- text/plain (디버깅용) -->

<form action="/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="avatar">
  <button type="submit">업로드</button>
</form>`}
        />

        <InfoCard type="warning" title="GET vs POST">
          <ul>
            <li>
              <strong>GET:</strong> 데이터 조회, URL 에 표시, 길이 제한
            </li>
            <li>
              <strong>POST:</strong> 데이터 생성/수정, URL 에 숨김, 대용량 가능
            </li>
            <li>
              <strong>민감 정보:</strong> 항상 POST 사용
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="input-types">2️⃣ 입력 타입</h2>
        <p>
          다양한 <code>input</code> 타입을 학습합니다.
        </p>

        <CodeDemo
          title="Input 타입"
          description="text, password, email, number 등"
          defaultCode={`<!-- 1. 텍스트 입력 -->
<input type="text" placeholder="일반 텍스트">
<input type="password" placeholder="비밀번호 (숨김)">
<input type="search" placeholder="검색어">
<input type="tel" placeholder="전화번호">
<input type="url" placeholder="URL">

<!-- 2. 이메일과 전화번호 -->
<input type="email" placeholder="이메일">
<input type="tel" placeholder="전화번호">

<!-- 3. 숫자 -->
<input type="number" min="0" max="100" step="1" placeholder="숫자">
<input type="range" min="0" max="100" value="50">  <!-- 슬라이더 -->

<!-- 4. 날짜와 시간 -->
<input type="date">           <!-- 날짜 선택 -->
<input type="time">           <!-- 시간 선택 -->
<input type="datetime-local"> <!-- 날짜 + 시간 -->
<input type="month">          <!-- 월 선택 -->
<input type="week">           <!-- 주 선택 -->

<!-- 5. 색상 -->
<input type="color">

<!-- 6. 파일 -->
<input type="file" accept="image/*">  <!-- 이미지 파일만 -->
<input type="file" accept=".pdf,.doc">  <!-- 특정 확장자 -->
<input type="file" multiple>  <!-- 여러 파일 -->

<!-- 7. 체크박스 и 라디오 -->
<input type="checkbox" id="agree">
<label for="agree">동의합니다</label>

<input type="radio" id="male" name="gender" value="male">
<label for="male">남성</label>

<input type="radio" id="female" name="gender" value="female">
<label for="female">여성</label>

<!-- 8. 숨겨진 입력 -->
<input type="hidden" name="csrf_token" value="abc123">

<!-- 9. 자동 완성 제어 -->
<input type="text" autocomplete="name" placeholder="이름">
<input type="email" autocomplete="email" placeholder="이메일">
<input type="text" autocomplete="off" placeholder="자동완성 끄기">`}
        />

        <InfoCard type="tip" title="input 속성">
          <ul>
            <li>
              <code>placeholder</code>: 힌트 텍스트
            </li>
            <li>
              <code>required</code>: 필수 입력
            </li>
            <li>
              <code>readonly</code>: 읽기 전용
            </li>
            <li>
              <code>disabled</code>: 비활성화
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="validation">3️⃣ 폼 검증</h2>
        <p>
          HTML5 의 내장 검증 기능을 사용합니다.
        </p>

        <CodeDemo
          title="폼 검증 (Validation)"
          description="required, pattern, min/max"
          defaultCode={`<form>
  <!-- 1. 필수 입력 -->
  <input type="text" required placeholder="필수 입력">

  <!-- 2. 최소/최대 길이 -->
  <input type="text" minlength="2" maxlength="10" placeholder="2-10 자">

  <!-- 3. 숫자 범위 -->
  <input type="number" min="1" max="100" placeholder="1-100">

  <!-- 4. 패턴 (정규식) -->
  <input 
    type="text" 
    pattern="[A-Za-z]{3}" 
    title="3 자의 영문자"
    placeholder="영문 3 자"
  >

  <!-- 5. 이메일 검증 -->
  <input type="email" required placeholder="이메일">

  <!-- 6. URL 검증 -->
  <input type="url" placeholder="https://example.com">

  <!-- 7. 전화번호 패턴 -->
  <input 
    type="tel" 
    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
    placeholder="010-1234-5678"
  >

  <!-- 8. 커스텀 에러 메시지 -->
  <input 
    type="text" 
    id="username"
    required
    minlength="3"
  >
  <script>
    const input = document.getElementById('username');
    input.addEventListener('invalid', (e) => {
      if (input.validity.valueMissing) {
        input.setCustomValidity('이름을 입력하세요');
      } else if (input.validity.tooShort) {
        input.setCustomValidity('3 자 이상 입력하세요');
      }
    });
    input.addEventListener('input', () => {
      input.setCustomValidity('');
    });
  </script>

  <button type="submit">제출</button>
</form>

<!-- 9. 검증 상태 CSS -->
<!--
<style>
input:valid {
  border-color: green;
}
input:invalid {
  border-color: red;
}
input:required {
  border-left: 3px solid red;
}
input:optional {
  border-left: 3px solid gray;
}
</style>
-->`}
        />

        <InfoCard type="warning" title="검증 주의사항">
          <p>
            HTML 검증은 <strong>클라이언트 측</strong>에서만 동작합니다.
            <br />
            <strong>서버 측 검증</strong>도 반드시 수행하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="other-elements">4️⃣ 기타 폼 요소</h2>
        <p>
          textarea, select, button 등 추가 요소입니다.
        </p>

        <CodeDemo
          title="기타 폼 요소"
          description="textarea, select, button, fieldset"
          defaultCode={`<form>
  <!-- 1. 여러 줄 텍스트 -->
  <label for="bio">자기소개:</label>
  <textarea 
    id="bio" 
    rows="4" 
    cols="50"
    placeholder="자신을 소개하세요"
    maxlength="500"
  ></textarea>

  <!-- 2. 드롭다운 선택 -->
  <label for="city">도시:</label>
  <select id="city" required>
    <option value="">선택하세요</option>
    <option value="seoul">서울</option>
    <option value="busan">부산</option>
    <option value="incheon">인천</option>
    <option value="daegu">대구</option>
  </select>

  <!-- 3. 그룹화된 선택 -->
  <label for="food">음식:</label>
  <select id="food">
    <optgroup label="한식">
      <option value="kimchi">김치찌개</option>
      <option value="bibimbap">비빔밥</option>
    </optgroup>
    <optgroup label="중식">
      <option value="jajangmyeon">짜장면</option>
      <option value="tangsuyuk">탕수육</option>
    </optgroup>
  </select>

  <!-- 4. 멀티플 선택 -->
  <label for="fruits">과일 (Ctrl+ 클릭):</label>
  <select id="fruits" multiple>
    <option value="apple">사과</option>
    <option value="banana">바나나</option>
    <option value="orange">오렌지</option>
    <option value="grape">포도</option>
  </select>

  <!-- 5. 버튼 타입 -->
  <button type="submit">제출</button>
  <button type="reset">초기화</button>
  <button type="button" onclick="alert('클릭!')">일반 버튼</button>

  <!-- 6. 버튼 속성 -->
  <button type="submit" disabled>비활성화</button>
  <button type="submit" form="otherForm">다른 폼 제출</button>

  <!-- 7. 필드셋 (그룹화) -->
  <fieldset>
    <legend>개인 정보</legend>
    <label>이름: <input type="text" name="name"></label>
    <label>이메일: <input type="email" name="email"></label>
  </fieldset>

  <fieldset>
    <legend>계정 정보</legend>
    <label>아이디: <input type="text" name="username"></label>
    <label>비밀번호: <input type="password" name="password"></label>
  </fieldset>

  <!-- 8. 데이터 리스트 (자동완성 제안) -->
  <label for="browser">브라우저:</label>
  <input list="browsers" id="browser" name="browser">
  <datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
    <option value="Opera">
  </datalist>
</form>`}
        />

        <InfoCard type="tip" title="label 과 접근성">
          <p>
            <code>&lt;label for="id"&gt;</code> 를 사용하면
            <br />
            라벨 클릭 시 입력 필드가 포커스되며,
            <br />
            스크린 리더에서 설명을 읽어줍니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>폼:</strong> <code>&lt;form action method&gt;</code>
          </li>
          <li>
            <strong>GET vs POST:</strong> 데이터 표시 여부, 민감 정보
          </li>
          <li>
            <strong>Input 타입:</strong> text, password, email, number, date 등
          </li>
          <li>
            <strong>검증:</strong> required, pattern, min/max
          </li>
          <li>
            <strong>Textarea:</strong> 여러 줄 텍스트
          </li>
          <li>
            <strong>Select:</strong> 드롭다운, 멀티플 선택
          </li>
          <li>
            <strong>Label:</strong> 접근성 향상
          </li>
        </ul>
      </section>
    </div>
  );
}