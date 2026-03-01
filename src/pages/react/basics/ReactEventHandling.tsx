import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function ReactEventHandling() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>React 이벤트 핸들링</h1>
        <p className="page-description">
          React 의 이벤트 시스템과 이벤트 핸들러 작성법에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          React 의 이벤트 핸들링은 브라우저의 네이티브 이벤트와 유사하지만,
          <strong>SyntheticEvent</strong> 를 사용하며 몇 가지 중요한 차이점이 있습니다.
        </p>

        <InfoCard type="tip" title="React 이벤트 특징">
          <ul>
            <li>
              <strong>SyntheticEvent:</strong> 브라우저 간 차이 흡수 (크로스 브라우징)
            </li>
            <li>
              <strong>이벤트 위임:</strong> 루트 레벨에서 이벤트 관리 (성능 최적화)
            </li>
            <li>
              <strong>카멜케이스:</strong> <code>onclick</code> → <code>onClick</code>
            </li>
            <li>
              <strong>함수 전달:</strong> onClick 에 함수 참조 전달 (실행 아님)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="basic-events">1️⃣ 기본 이벤트 핸들링</h2>
        <p>
          React 에서 이벤트 핸들러는 JSX 속성으로 전달합니다.
        </p>

        <CodeDemo
          title="기본 이벤트 핸들러"
          description="onClick, onChange 등 기본 이벤트"
          defaultCode={`function BasicEvents() {
  // 1. 이벤트 핸들러 함수
  const handleClick = (event) => {
    console.log('클릭됨!', event);
    console.log('타겟 요소:', event.target);
  };

  // 2. 인라인 함수 (간단한 경우)
  const handleInlineClick = () => {
    console.log('인라인 클릭');
  };

  return (
    <div>
      {/* 3. 핸들러 전달 (함수 참조) */}
      <button onClick={handleClick}>
        클릭하세요
      </button>

      {/* 4. 인라인 함수 (주의: 매 렌더링마다 새 함수 생성) */}
      <button onClick={() => console.log('인라인 클릭')}>
        인라인 클릭
      </button>

      {/* 5. 인자 전달 */}
      <button onClick={(e) => handleWithArgs('안녕', 123, e)}>
        인자 전달
      </button>

      {/* 6. 다양한 이벤트 타입 */}
      <div
        onMouseEnter={() => console.log('마우스 진입')}
        onMouseLeave={() => console.log('마우스 이탈')}
        onDoubleClick={() => console.log('더블클릭')}
      >
        마우스 이벤트를 확인하세요
      </div>

      <input
        type="text"
        onChange={(e) => console.log('입력:', e.target.value)}
        onFocus={() => console.log('포커스')}
        onBlur={() => console.log('블러')}
        placeholder="입력하세요"
      />
    </div>
  );
}

// 인자 전달 핸들러
function handleWithArgs(text, number, event) {
  console.log(text + ", " + number);
  console.log('이벤트:', event.type);
}

console.log('기본 이벤트 예시 완료');`}
        />

        <InfoCard type="warning" title="인라인 함수 주의">
          <p>
            인라인 함수는 <strong>매 렌더링마다 새 함수</strong>가
            생성됩니다. useCallback 으로 최적화할 수 있지만,
            대부분의 경우 성능 영향은 미미합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="event-object">2️⃣ SyntheticEvent 객체</h2>
        <p>
          React 의 이벤트 객체는 네이티브 이벤트를 래핑한 <strong>SyntheticEvent</strong> 입니다.
        </p>

        <CodeDemo
          title="SyntheticEvent 활용"
          description="이벤트 객체의 속성과 메서드"
          defaultCode={`function SyntheticEventExample() {
  const handleClick = (event) => {
    // 1. 공통 속성
    console.log('이벤트 타입:', event.type);
    console.log('타겟 요소:', event.target);  // DOM 요소
    console.log('현재 요소:', event.currentTarget);  // 리스너가 부착된 요소
    
    // 2. 마우스 이벤트 속성
    console.log('클라이언트 좌표:', event.clientX, event.clientY);
    console.log('화면 좌표:', event.screenX, event.screenY);
    console.log('버튼:', event.button);  // 0: 왼쪽, 2: 오른쪽
    
    // 3. 수정키 상태
    console.log('Shift:', event.shiftKey);
    console.log('Ctrl:', event.ctrlKey);
    console.log('Alt:', event.altKey);
    console.log('Meta:', event.metaKey);  // Command/Windows 키
    
    // 4. 이벤트 전파 제어
    // event.stopPropagation();  // 버블링 중지
    // event.preventDefault();   // 기본 동작 방지
    
    // 5. 네이티브 이벤트 접근 (필요시)
    console.log('네이티브 이벤트:', event.nativeEvent);
  };

  const handleKeyDown = (event) => {
    // 키보드 이벤트
    console.log('키:', event.key);  // 'Enter', 'a', 'ArrowUp'
    console.log('코드:', event.code);  // 'Enter', 'KeyA', 'ArrowUp'
    console.log('반복:', event.repeat);
    
    // 특수키
    console.log('Shift:', event.shiftKey);
    console.log('Ctrl:', event.ctrlKey);
  };

  const handleSubmit = (event) => {
    // 폼 제출 이벤트
    event.preventDefault();  // 기본 제출 방지
    console.log('폼 제출 방지됨');
  };

  return (
    <div>
      <button onClick={handleClick}>
        클릭 (이벤트 확인)
      </button>

      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="키 입력"
      />

      <form onSubmit={handleSubmit}>
        <button type="submit">제출</button>
      </form>
    </div>
  );
}

console.log('SyntheticEvent 예시 완료');`}
        />

        <InfoCard type="tip" title="SyntheticEvent 풀링 (React 16 이전)">
          <p>
            React 16 이전에는 SyntheticEvent 가 <strong>풀링</strong>되어
            이벤트 핸들러 종료 후 속성에 접근할 수 없었습니다.
            <br />
            <strong>React 17+</strong> 에서는 이 동작이 제거되어
            비동기적으로도 접근 가능합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="this-binding">3️⃣ this 바인딩 (클래스 컴포넌트)</h2>
        <p>
          클래스 컴포넌트에서 this 바인딩은 중요한 주제입니다.
        </p>

        <CodeDemo
          title="클래스 컴포넌트 this 바인딩"
          description="함수형 컴포넌트에서는 불필요"
          defaultCode={`// 클래스 컴포넌트 예시 (레거시)
// import React, { Component } from 'react';

// 1. 생성자에서 bind (전통적 방식)
// class OldWay extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { count: 0 };
//     this.handleClick = this.handleClick.bind(this);  // 필수!
//   }
//
//   handleClick() {
//     console.log('클릭:', this.state.count);
//     this.setState({ count: this.state.count + 1 });
//   }
//
//   render() {
//     return (
//       <button onClick={this.handleClick}>
//         카운트: {this.state.count}
//       </button>
//     );
//   }
// }

// 2. 화살표 함수 (클래스 필드, 권장)
// class ModernWay extends Component {
//   state = { count: 0 };
//
//   handleClick = () => {
//     // this 가 자동으로 바인딩됨
//     console.log('클릭:', this.state.count);
//     this.setState({ count: this.state.count + 1 });
//   };
//
//   render() {
//     return (
//       <button onClick={this.handleClick}>
//         카운트: {this.state.count}
//       </button>
//     );
//   }
// }

// 3. 함수형 컴포넌트 (현대적 접근 - this 문제 없음)
function FunctionalWay() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    // this 불필요
    console.log('클릭:', count);
    setCount(count + 1);
  };

  return (
    <button onClick={handleClick}>
      카운트: {count}
    </button>
  );
}

// 4. 인라인에서 this 문제 (클래스)
// class BadExample extends Component {
//   handleClick() {
//     console.log(this);  // undefined!
//   }
//
//   render() {
//     return (
//       {/* 잘못된 예 */}
//       <button onClick={this.handleClick}>클릭</button>
//       
//       {/* 올바른 예 */}
//       <button onClick={() => this.handleClick()}>클릭</button>
//       <button onClick={this.handleClick.bind(this)}>클릭</button>
//     );
//   }
// }

console.log('this 바인딩 예시 완료');`}
        />

        <InfoCard type="tip" title="함수형 컴포넌트 권장">
          <p>
            현대 React 는 <strong>함수형 컴포넌트와 Hooks</strong> 를 사용합니다.
            this 바인딩 문제를 근본적으로 피할 수 있습니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="event-bubbling">4️⃣ 이벤트 버블링과 전파</h2>
        <p>
          React 에서도 이벤트 버블링이 동작합니다.
        </p>

        <CodeDemo
          title="이벤트 버블링과 전파 제어"
          description="stopPropagation 과 preventDefault"
          defaultCode={`function EventBubblingExample() {
  // 1. 버블링 확인
  const handleParentClick = () => {
    console.log('부모 클릭 (버블링)');
  };

  const handleChildClick = () => {
    console.log('자식 클릭');
    // 버블링 계속됨
  };

  // 2. 버블링 중지
  const handleChildClickStop = (event) => {
    console.log('자식 클릭 (버블링 중지)');
    event.stopPropagation();  // 버블링 중지
  };

  // 3. 기본 동작 방지
  const handleLinkClick = (event) => {
    event.preventDefault();  // 링크 이동 방지
    console.log('링크 클릭 방지됨');
  };

  // 4. 캡처링 단계에서 이벤트 처리
  const handleCapture = () => {
    console.log('캡처링 단계');
  };

  return (
    <div>
      {/* 버블링 예시 */}
      <div
        onClick={handleParentClick}
        style={{ padding: '20px', border: '1px solid blue' }}
      >
        부모
        <button onClick={handleChildClick}>
          자식 (버블링)
        </button>
        <button onClick={handleChildClickStop}>
          자식 (버블링 중지)
        </button>
      </div>

      {/* 캡처링 예시 */}
      <div
        onClickCapture={handleCapture}
        style={{ padding: '20px', border: '1px solid green', marginTop: '10px' }}
      >
        캡처링
        <button onClick={() => console.log('캡처링 자식 클릭')}>
          클릭
        </button>
      </div>

      {/* 기본 동작 방지 */}
      <a
        href="https://example.com"
        onClick={handleLinkClick}
      >
        클릭해도 이동 안 함
      </a>
    </div>
  );
}

console.log('이벤트 버블링 예시 완료');`}
        />

        <InfoCard type="tip" title="캡처링 단계">
          <p>
            <code>onClickCapture</code> 는 <strong>캡처링 단계</strong>에서 이벤트를 처리합니다.
            (타겟 → 부모가 아닌, 부모 → 타겟 방향)
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="form-events">5️⃣ 폼 이벤트 처리</h2>
        <p>
          폼 요소의 이벤트를 처리하는 방법을 알아봅니다.
        </p>

        <CodeDemo
          title="폼 이벤트 핸들링"
          description="onChange, onSubmit, onSubmit 예방"
          defaultCode={`function FormEventsExample() {
  const [value, setValue] = React.useState('');
  const [submitted, setSubmitted] = React.useState(null);

  // 1. 입력 이벤트 (Controlled 컴포넌트)
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log('입력값:', event.target.value);
  };

  // 2. 포커스 이벤트
  const handleFocus = () => {
    console.log('포커스됨');
  };

  const handleBlur = () => {
    console.log('포커스 잃음');
  };

  // 3. 폼 제출
  const handleSubmit = (event) => {
    event.preventDefault();  // 기본 제출 방지 (필수!)
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log('제출된 데이터:', data);
    setSubmitted(data);
  };

  // 4. 키보드 이벤트
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('Enter 키 - 폼 제출');
      event.target.form?.requestSubmit();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            이름:
            <input
              type="text"
              name="name"
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="이름 입력"
            />
          </label>
        </div>

        <div>
          <label>
            이메일:
            <input
              type="email"
              name="email"
              placeholder="이메일 입력"
            />
          </label>
        </div>

        <div>
          <label>
            메시지:
            <textarea
              name="message"
              rows={4}
              placeholder="메시지 입력"
              onChange={(e) => console.log('텍스트:', e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="agree"
              onChange={(e) => console.log('체크:', e.target.checked)}
            />
            동의합니다
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="option"
              value="option1"
              onChange={(e) => console.log('라디오:', e.target.value)}
            />
            옵션 1
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="option2"
              onChange={(e) => console.log('라디오:', e.target.value)}
            />
            옵션 2
          </label>
        </div>

        <button type="submit">제출</button>
      </form>

      {submitted && (
        <div>
          <h3>제출된 데이터:</h3>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

console.log('폼 이벤트 예시 완료');`}
        />

        <InfoCard type="warning" title="preventDefault 필수">
          <p>
            <code>onSubmit</code> 에서 <code>event.preventDefault()</code> 를 호출하지 않으면
            페이지가 <strong>새로고침</strong>됩니다. (React 앱에서는 항상 방지)
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="performance">6️⃣ 이벤트 핸들러 최적화</h2>
        <p>
          이벤트 핸들러의 성능 최적화 방법을 알아봅니다.
        </p>

        <CodeDemo
          title="이벤트 핸들러 최적화"
          description="useCallback 과 이벤트 위임"
          defaultCode={`function EventOptimization() {
  const [count, setCount] = React.useState(0);
  const [items, setItems] = React.useState([1, 2, 3, 4, 5]);

  // 1. useCallback 으로 핸들러 메모이제이션
  const handleClick = React.useCallback(() => {
    console.log('클릭 - 최적화됨');
    setCount((c) => c + 1);
  }, []);  // 의존성 배열 비어있음

  // 2. 인자 있는 경우
  const handleItemClick = React.useCallback((id) => {
    console.log('아이템 클릭:', id);
  }, []);

  // 3. 이벤트 위임 (리스트에서 유용)
  const handleListClick = (event) => {
    // 실제로 클릭된 항목 찾기
    const item = event.target.closest('[data-item-id]');
    if (item) {
      const id = Number(item.dataset.itemId);
      console.log('이벤트 위임으로 처리:', id);
    }
  };

  return (
    <div>
      {/* useCallback 사용 */}
      <button onClick={handleClick}>
        카운트: {count}
      </button>

      {/* 인자 전달 - 매번 새 함수 생성 */}
      <div>
        {items.map((item) => (
          <button
            key={item}
            onClick={() => handleItemClick(item)}
          >
            아이템 {item}
          </button>
        ))}
      </div>

      {/* 이벤트 위임 - 단일 핸들러 */}
      <ul onClick={handleListClick}>
        {items.map((item) => (
          <li
            key={item}
            data-item-id={item}
            style={{ cursor: 'pointer' }}
          >
            아이템 {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

console.log('이벤트 최적화 예시 완료');`}
        />

        <InfoCard type="tip" title="useCallback 사용 가이드">
          <ul>
            <li>
              <strong>사용할 때:</strong> 하위 컴포넌트에 핸들러 전달, 의존성 복잡
            </li>
            <li>
              <strong>불필요할 때:</strong> 단순 인라인 함수, DOM 요소 직접 바인딩
            </li>
            <li>
              <strong>이벤트 위임:</strong> 리스트가 크면 단일 핸들러가 효율적
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="custom-events">7️⃣ 커스텀 이벤트 패턴</h2>
        <p>
          컴포넌트 간 통신을 위한 커스텀 이벤트 패턴입니다.
        </p>

        <CodeDemo
          title="커스텀 이벤트 패턴"
          description="이벤트 핸들러 prop 전달"
          defaultCode={`// 1. 이벤트 핸들러를 prop 으로 전달
function ParentComponent() {
  const handleChildAction = (data) => {
    console.log('자식으로부터 받은 데이터:', data);
  };

  return (
    <div>
      <h2>부모 컴포넌트</h2>
      <ChildComponent onAction={handleChildAction} />
    </div>
  );
}

function ChildComponent({ onAction }) {
  const handleClick = () => {
    // 부모에게 데이터 전달
    onAction({ message: '안녕하세요!', timestamp: Date.now() });
  };

  return (
    <div>
      <button onClick={handleClick}>
        부모에게 전송
      </button>
    </div>
  );
}

// 2. 여러 이벤트 핸들러 전달
function FormContainer() {
  const handleSubmit = (data) => {
    console.log('제출:', data);
  };

  const handleReset = () => {
    console.log('초기화');
  };

  const handleValidate = (field, value) => {
    console.log('검증:', field, value);
    return true;
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onReset={handleReset}
      onValidate={handleValidate}
    />
  );
}

function Form({ onSubmit, onReset, onValidate }) {
  const [formData, setFormData] = React.useState({});

  const handleChange = (field, value) => {
    if (onValidate?.(field, value)) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <input
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="이름"
      />
      <button type="submit">제출</button>
      <button type="button" onClick={onReset}>
        초기화
      </button>
    </form>
  );
}

// 3. 이벤트 객체 확장 (커스텀 이벤트)
function CustomEventExample() {
  const handleCustomEvent = (event) => {
    // 커스텀 이벤트 데이터
    console.log('커스텀 이벤트:', {
      type: event.type,
      detail: event.detail,  // 커스텀 데이터
    });
  };

  const triggerCustomEvent = () => {
    const customEvent = new CustomEvent('myCustomEvent', {
      detail: { message: '커스텀 데이터', value: 42 },
    });

    document.dispatchEvent(customEvent);
  };

  React.useEffect(() => {
    document.addEventListener('myCustomEvent', handleCustomEvent);
    return () => {
      document.removeEventListener('myCustomEvent', handleCustomEvent);
    };
  }, []);

  return (
    <button onClick={triggerCustomEvent}>
      커스텀 이벤트 발생
    </button>
  );
}

console.log('커스텀 이벤트 예시 완료');`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>SyntheticEvent:</strong> 브라우저 간 차이 흡수, 크로스 브라우징
          </li>
          <li>
            <strong>카멜케이스:</strong> <code>onclick</code> → <code>onClick</code>
          </li>
          <li>
            <strong>함수 전달:</strong> onClick 에 함수 참조 전달 (실행 아님)
          </li>
          <li>
            <strong>preventDefault:</strong> 폼 제출 시 필수
          </li>
          <li>
            <strong>stopPropagation:</strong> 이벤트 버블링 중지
          </li>
          <li>
            <strong>useCallback:</strong> 핸들러 메모이제이션 (성능 최적화)
          </li>
          <li>
            <strong>이벤트 위임:</strong> 리스트에서 효율적
          </li>
        </ul>
      </section>
    </div>
  );
}