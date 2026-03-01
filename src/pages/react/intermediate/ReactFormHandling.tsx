import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactFormHandling() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>React 폼 처리</h1>
        <p className="page-description">
          Controlled 와 Uncontrolled 컴포넌트, 폼 검증 및 라이브러리 활용에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          React 에서 폼 처리는 <strong>Controlled</strong> 와 <strong>Uncontrolled</strong> 두 가지 방식이 있습니다.
          각각의 장단점이 있으며, 상황에 맞게 선택해야 합니다.
        </p>

        <InfoCard type="tip" title="Controlled vs Uncontrolled">
          <table>
            <thead>
              <tr>
                <th>특징</th>
                <th>Controlled</th>
                <th>Uncontrolled</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>상태 관리</td>
                <td>React (state)</td>
                <td>DOM (ref)</td>
              </tr>
              <tr>
                <td>데이터 소스</td>
                <td>Single Source of Truth</td>
                <td>DOM 자체</td>
              </tr>
              <tr>
                <td>실시간 검증</td>
                <td>쉬움</td>
                <td>어려움</td>
              </tr>
              <tr>
                <td>코드량</td>
                <td>많음</td>
                <td>적음</td>
              </tr>
              <tr>
                <td>사용 사례</td>
                <td>대부분의 경우</td>
                <td>레거시, 파일 업로드</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="controlled">1️⃣ Controlled 컴포넌트</h2>
        <p>
          폼 데이터를 React state 에서 관리합니다.
        </p>

        <CodeDemo
          title="Controlled 컴포넌트 기본"
          description="useState 로 폼 데이터 관리"
          defaultCode={`function ControlledForm() {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    agree: false,
  });

  // 1. 단일 입력 처리
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 2. 체크박스 처리
  const handleCheck = (event) => {
    const { name, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // 3. 폼 제출
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('제출된 데이터:', formData);
    alert('가입 완료!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          사용자명:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="사용자명 입력"
          />
        </label>
      </div>

      <div>
        <label>
          이메일:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일 입력"
          />
        </label>
      </div>

      <div>
        <label>
          비밀번호:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호 입력"
          />
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleCheck}
          />
          약관에 동의합니다
        </label>
      </div>

      <button 
        type="submit" 
        disabled={!formData.username || !formData.agree}
      >
        가입하기
      </button>

      <div>
        <h4>실시간 데이터:</h4>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </form>
  );
}

console.log('Controlled 폼 예시 완료');`}
        />

        <InfoCard type="tip" title="Controlled 의 장점">
          <ul>
            <li>
              <strong>실시간 검증:</strong> 입력 즉시 검증 가능
            </li>
            <li>
              <strong>조건부 렌더링:</strong> 입력값에 따른 UI 제어
            </li>
            <li>
              <strong>데이터 동기화:</strong> 여러 필드 간 의존성 처리
            </li>
            <li>
              <strong>강제 서식:</strong> 숫자만, 대문자만 등
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="controlled-advanced">2️⃣ Controlled 심화 - 실시간 검증</h2>
        <p>
          입력값을 실시간으로 검증하고 피드백을 제공합니다.
        </p>

        <CodeDemo
          title="실시간 폼 검증"
          description="유효성 검사와 에러 표시"
          defaultCode={`function ValidatedForm() {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  // 1. 검증 함수
  const validate = (field, value) => {
    switch (field) {
      case 'username':
        if (!value) return '사용자명은 필수입니다';
        if (value.length < 3) return '3 자 이상 입력하세요';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return '영문, 숫자, 밑줄만 가능합니다';
        }
        return '';
      
      case 'email':
        if (!value) return '이메일은 필수입니다';
        if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
          return '올바른 이메일 형식이 아닙니다';
        }
        return '';
      
      case 'password':
        if (!value) return '비밀번호는 필수입니다';
        if (value.length < 8) return '8 자 이상 입력하세요';
        if (!/[A-Z]/.test(value)) return '대문자를 포함하세요';
        if (!/[0-9]/.test(value)) return '숫자를 포함하세요';
        return '';
      
      default:
        return '';
    }
  };

  // 2. 입력 처리
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // 실시간 검증 (touched 된 필드만)
    if (touched[name]) {
      const error = validate(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // 3. blur 처리 (touched 설정)
  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // 검증 실행
    const error = validate(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // 4. 폼 제출
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // 모든 필드 검증
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ username: true, email: true, password: true });
      return;
    }

    console.log('제출 성공:', formData);
    alert('회원가입 완료!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          사용자명:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        {touched.username && errors.username && (
          <span className="error">{errors.username}</span>
        )}
      </div>

      <div>
        <label>
          이메일:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        {touched.email && errors.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>

      <div>
        <label>
          비밀번호:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        {touched.password && errors.password && (
          <span className="error">{errors.password}</span>
        )}
      </div>

      <button type="submit">
        가입하기
      </button>
    </form>
  );
}

console.log('검증 폼 예시 완료');`}
        />
      </section>

      <section className="content-section">
        <h2 id="uncontrolled">3️⃣ Uncontrolled 컴포넌트</h2>
        <p>
          폼 데이터를 DOM 에서 직접 관리하며, ref 를 사용해 값에 접근합니다.
        </p>

        <CodeDemo
          title="Uncontrolled 컴포넌트"
          description="useRef 로 폼 데이터 접근"
          defaultCode={`function UncontrolledForm() {
  // 1. ref 생성
  const formRef = React.useRef(null);
  const usernameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  // 2. 폼 제출
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // ref 로 값 접근
    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log('제출된 데이터:', formData);
    alert('가입 완료!');
  };

  // 3. 폼 초기화
  const handleReset = () => {
    formRef.current.reset();  // 폼 초기화
    usernameRef.current.focus();  // 포커스
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div>
        <label>
          사용자명:
          <input
            type="text"
            ref={usernameRef}
            defaultValue=""  // 초기값 (value 아님!)
            placeholder="사용자명 입력"
          />
        </label>
      </div>

      <div>
        <label>
          이메일:
          <input
            type="email"
            ref={emailRef}
            defaultValue=""
            placeholder="이메일 입력"
          />
        </label>
      </div>

      <div>
        <label>
          비밀번호:
          <input
            type="password"
            ref={passwordRef}
            defaultValue=""
            placeholder="비밀번호 입력"
          />
        </label>
      </div>

      <div>
        <button type="submit">가입하기</button>
        <button type="button" onClick={handleReset}>
          초기화
        </button>
      </div>
    </form>
  );
}

// 4. FormData API 활용 (Uncontrolled)
function UncontrolledWithFormData() {
  const formRef = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // FormData API 사용
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    
    console.log('FormData:', data);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="username" placeholder="사용자명" />
      <input name="email" placeholder="이메일" />
      <input name="password" type="password" placeholder="비밀번호" />
      <button type="submit">제출</button>
    </form>
  );
}

console.log('Uncontrolled 폼 예시 완료');`}
        />

        <InfoCard type="tip" title="Uncontrolled 사용 사례">
          <ul>
            <li>
              <strong>파일 업로드:</strong> <code>&lt;input type="file" /&gt;</code>
            </li>
            <li>
              <strong>레거시 코드:</strong> 비 React 코드와 통합
            </li>
            <li>
              <strong>간단한 폼:</strong> 검증이 필요 없는 경우
            </li>
            <li>
              <strong>성능:</strong> 매 입력마다 리렌더링 방지
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="custom-hook">4️⃣ useForm 커스텀 훅</h2>
        <p>
          폼 로직을 재사용 가능한 훅으로 추상화합니다.
        </p>

        <CodeDemo
          title="useForm 커스텀 훅"
          description="폼 로직 재사용"
          defaultCode={`// 1. useForm 커스텀 훅
function useForm(initialValues, validate, onSubmit) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validate(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validate(name, values[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // 모든 필드 검증
    const newErrors = {};
    Object.keys(values).forEach((key) => {
      const error = validate(key, values[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {}));
      setIsSubmitting(false);
      return;
    }

    await onSubmit(values);
    setIsSubmitting(false);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}

// 2. useForm 사용 예시
function SignupForm() {
  const form = useForm(
    { username: '', email: '', password: '' },
    (field, value) => {
      // 검증 로직
      if (field === 'username' && !value) return '필수입니다';
      if (field === 'email' && !value.includes('@')) return '이메일 형식 아님';
      if (field === 'password' && value.length < 8) return '8 자 이상';
      return '';
    },
    async (values) => {
      // 제출 처리
      console.log('제출:', values);
      alert('가입 완료!');
    }
  );

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        name="username"
        value={form.values.username}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        placeholder="사용자명"
      />
      {form.touched.username && form.errors.username && (
        <span className="error">{form.errors.username}</span>
      )}

      <input
        name="email"
        type="email"
        value={form.values.email}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        placeholder="이메일"
      />
      {form.touched.email && form.errors.email && (
        <span className="error">{form.errors.email}</span>
      )}

      <input
        name="password"
        type="password"
        value={form.values.password}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        placeholder="비밀번호"
      />
      {form.touched.password && form.errors.password && (
        <span className="error">{form.errors.password}</span>
      )}

      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? '처리 중...' : '가입하기'}
      </button>
      <button type="button" onClick={form.reset}>
        초기화
      </button>
    </form>
  );
}

console.log('useForm 훅 예시 완료');`}
        />
      </section>

      <section className="content-section">
        <h2 id="libraries">5️⃣ 폼 라이브러리</h2>
        <p>
          복잡한 폼은 라이브러리 사용을 권장합니다.
        </p>

        <CodeDemo
          title="폼 라이브러리 활용"
          description="React Hook Form 예시"
          defaultCode={`// React Hook Form 예시
// 설치: npm install react-hook-form

// import { useForm } from 'react-hook-form';

// function ReactHookFormExample() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm({
//     defaultValues: {
//       username: '',
//       email: '',
//       password: '',
//     },
//   });

//   const onSubmit = async (data) => {
//     console.log('제출:', data);
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     alert('가입 완료!');
//     reset();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input
//         {...register('username', {
//           required: '사용자명은 필수입니다',
//           minLength: { value: 3, message: '3 자 이상 입력하세요' },
//         })}
//         placeholder="사용자명"
//       />
//       {errors.username && (
//         <span className="error">{errors.username.message}</span>
//       )}

//       <input
//         {...register('email', {
//           required: '이메일은 필수입니다',
//           pattern: {
//             value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
//             message: '올바른 이메일 형식이 아닙니다',
//           },
//         })}
//         placeholder="이메일"
//       />
//       {errors.email && (
//         <span className="error">{errors.email.message}</span>
//       )}

//       <input
//         {...register('password', {
//           required: '비밀번호는 필수입니다',
//           minLength: { value: 8, message: '8 자 이상 입력하세요' },
//         })}
//         type="password"
//         placeholder="비밀번호"
//       />
//       {errors.password && (
//         <span className="error">{errors.password.message}</span>
//       )}

//       <button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? '처리 중...' : '가입하기'}
//       </button>
//       <button type="button" onClick={() => reset()}>
//         초기화
//       </button>
//     </form>
//   );
// }

// 다른 인기 폼 라이브러리:
// - Formik: https://formik.org/
// - React Final Form: https://final-form.org/react

console.log('폼 라이브러리 예시 (주석)');`}
        />

        <InfoCard type="tip" title="폼 라이브러리 비교">
          <table>
            <thead>
              <tr>
                <th>라이브러리</th>
                <th>크기</th>
                <th>특징</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>React Hook Form</strong></td>
                <td>~10KB</td>
                <td>Hooks 기반, 성능 우수, Uncontrolled</td>
              </tr>
              <tr>
                <td><strong>Formik</strong></td>
                <td>~15KB</td>
                <td>풍부한 기능, Controlled, 레거시</td>
              </tr>
              <tr>
                <td><strong>Zod + RHF</strong></td>
                <td>~15KB</td>
                <td>스키마 기반 검증, 타입 안전</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="special-inputs">6️⃣ 특수 입력 요소</h2>
        <p>
          파일 업로드, 텍스트エリア, 셀렉트 등 특수 입력을 처리합니다.
        </p>

        <CodeDemo
          title="특수 입력 요소 처리"
          description="파일, 텍스트エリア, 셀렉트, 라디오"
          defaultCode={`function SpecialInputsForm() {
  const [formData, setFormData] = React.useState({
    category: '',
    gender: '',
    bio: '',
    tags: [],
    file: null,
  });

  // 1. 텍스트エリア
  const handleBioChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      bio: event.target.value,
    }));
  };

  // 2. 셀렉트 (드롭다운)
  const handleCategoryChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      category: event.target.value,
    }));
  };

  // 3. 라디오 버튼
  const handleGenderChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      gender: event.target.value,
    }));
  };

  // 4. 멀티플 셀렉트
  const handleTagsChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prev) => ({
      ...prev,
      tags: selectedOptions,
    }));
  };

  // 5. 파일 업로드 (Uncontrolled)
  const fileInputRef = React.useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
        },
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('제출:', formData);
    
    // 파일 업로드 시 FormData 사용
    // const uploadData = new FormData();
    // uploadData.append('file', fileInputRef.current.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 텍스트エリア */}
      <div>
        <label>
          자기소개:
          <textarea
            value={formData.bio}
            onChange={handleBioChange}
            rows={4}
            placeholder="자신을 소개하세요"
          />
        </label>
        <span>{formData.bio.length}자</span>
      </div>

      {/* 셀렉트 */}
      <div>
        <label>
          카테고리:
          <select
            value={formData.category}
            onChange={handleCategoryChange}
          >
            <option value="">선택하세요</option>
            <option value="tech">기술</option>
            <option value="design">디자인</option>
            <option value="business">비즈니스</option>
          </select>
        </label>
      </div>

      {/* 라디오 */}
      <div>
        <span>성별:</span>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleGenderChange}
          />
          남성
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleGenderChange}
          />
          여성
        </label>
      </div>

      {/* 멀티플 셀렉트 */}
      <div>
        <label>
          태그 (Ctrl+ 클릭):
          <select
            multiple
            value={formData.tags}
            onChange={handleTagsChange}
          >
            <option value="react">React</option>
            <option value="typescript">TypeScript</option>
            <option value="nodejs">Node.js</option>
          </select>
        </label>
        <span>선택됨: {formData.tags.join(', ')}</span>
      </div>

      {/* 파일 업로드 */}
      <div>
        <label>
          파일:
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
        {formData.file && (
          <div>
            <p>파일명: {formData.file.name}</p>
            <p>크기: {(formData.file.size / 1024).toFixed(2)} KB</p>
            <p>타입: {formData.file.type}</p>
          </div>
        )}
      </div>

      <button type="submit">제출</button>
    </form>
  );
}

console.log('특수 입력 예시 완료');`}
        />

        <InfoCard type="warning" title="파일 업로드 주의">
          <p>
            <code>&lt;input type="file" /&gt;</code> 는 <strong>Uncontrolled</strong> 로 다뤄야 합니다.
            (보안상의 이유로 value 설정 불가)
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Controlled:</strong> React state 관리, 실시간 검증, 권장 방식
          </li>
          <li>
            <strong>Uncontrolled:</strong> DOM 관리, ref 사용, 파일 업로드
          </li>
          <li>
            <strong>실시간 검증:</strong> onChange, onBlur 활용
          </li>
          <li>
            <strong>useForm:</strong> 커스텀 훅으로 로직 재사용
          </li>
          <li>
            <strong>라이브러리:</strong> React Hook Form (성능 우수)
          </li>
          <li>
            <strong>특수 입력:</strong> 파일은 Uncontrolled, 그 외는 Controlled
          </li>
        </ul>
      </section>
    </div>
  );
}