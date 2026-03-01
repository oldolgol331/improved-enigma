import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function JSDOMEvents() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>DOM 과 이벤트 핸들링</h1>
        <p className="page-description">
          Document Object Model(DOM) 과 이벤트 핸들링에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>DOM(Document Object Model)</strong> 은 HTML/XML 문서의 프로그래밍 인터페이스입니다.
          브라우저는 HTML 을 파싱하여 트리 구조의 DOM 을 생성하고, JavaScript 를 통해 이 트리를 조작하여
          동적인 웹 페이지를 만들 수 있습니다.
        </p>

        <InfoCard type="tip" title="DOM 이란?">
          <p>
            DOM 은 문서를 <strong>트리 구조의 노드</strong>로 표현합니다. 각 노드는 요소 (element),
            속성 (attribute), 텍스트 등을 나타냅니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="dom-access">1️⃣ DOM 요소 선택</h2>
        <p>
          JavaScript 로 DOM 을 조작하려면 먼저 요소를 선택해야 합니다. 현대적인 방법과 레거시 방법을
          모두 알아두세요.
        </p>

        <CodeDemo
          title="DOM 요소 선택 방법"
          description="다양한 요소 선택 방법을 확인해보세요."
          defaultCode={`// modern: querySelector (권장)
// CSS 선택자 문법을 사용합니다
const header = document.querySelector('header');
const title = document.querySelector('.title');
const item = document.querySelector('#item');
const firstBtn = document.querySelector('button.btn-primary');

// querySelectorAll: 여러 요소 선택 (NodeList 반환)
const allItems = document.querySelectorAll('.item');
console.log('선택된 요소 수:', allItems.length);

// forEach 로 순회 가능
allItems.forEach((item, index) => {
  console.log(\`아이템 \${index}:\`, item.textContent);
});

// legacy: getElementById (빠름, ID 만 가능)
const main = document.getElementById('main');

// legacy: getElementsByClassName (HTMLCollection 반환)
const items = document.getElementsByClassName('item');

// legacy: getElementsByTagName (HTMLCollection 반환)
const divs = document.getElementsByTagName('div');

// 선택 결과 출력
console.log('header:', header);
console.log('title:', title);
console.log('main:', main);`}
        />

        <InfoCard type="warning" title="querySelector vs legacy 메서드">
          <ul>
            <li>
              <code>querySelector</code>: 정적 NodeList 반환 (선택 후 DOM 변경 반영 안 됨)
            </li>
            <li>
              <code>getElementsByClassName</code>: 라이브 HTMLCollection 반환 (DOM 변경 자동 반영)
            </li>
            <li>
              <strong>권장:</strong> 특별한 이유가 없으면 <code>querySelector</code> 사용
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="dom-manipulation">2️⃣ DOM 조작</h2>
        <p>선택한 요소의 내용, 속성, 스타일, 클래스 등을 변경할 수 있습니다.</p>

        <CodeDemo
          title="DOM 조작하기"
          description="요소의 내용과 속성을 변경합니다."
          defaultCode={`const box = document.querySelector('.box');

// 1. 내용 변경
box.textContent = '새로운 텍스트';  // 텍스트만 변경 (XSS 안전)
box.innerHTML = '<strong>HTML</strong> 포함';  // HTML 파싱 (XSS 주의!)

// 2. 속성 변경
box.setAttribute('data-id', '123');
const id = box.getAttribute('data-id');
box.removeAttribute('data-id');

// 3. 클래스 조작 (권장)
box.classList.add('active');
box.classList.remove('hidden');
box.classList.toggle('selected');
const hasClass = box.classList.contains('active');

// 4. 스타일 조작 (인라인)
box.style.color = 'blue';
box.style.backgroundColor = 'yellow';
box.style.padding = '20px';

// 5. 데이터 속성 (dataset)
box.dataset.userId = '456';
const userId = box.dataset.userId;

console.log('box:', box);
console.log('textContent:', box.textContent);
console.log('classList:', box.classList);`}
        />

        <InfoCard type="warning" title="innerHTML XSS 주의">
          <p>
            <code>innerHTML</code> 은 사용자 입력을 그대로 HTML 로 파싱하므로{' '}
            <strong>XSS 공격에 취약</strong>합니다. 사용자 입력은 반드시 <code>textContent</code>로
            설정하거나, 라이브러리 (DOMPurify 등) 를 사용하세요.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="dom-creation">3️⃣ 요소 생성 및 삭제</h2>
        <p>새로운 요소를 생성하거나 기존 요소를 삭제할 수 있습니다.</p>

        <CodeDemo
          title="요소 생성 및 삭제"
          description="동적으로 요소를 추가하고 제거합니다."
          defaultCode={`// 1. 요소 생성
const newDiv = document.createElement('div');
newDiv.className = 'dynamic-box';
newDiv.textContent = '동적으로 생성된 요소';

// 2. 요소 추가
const container = document.querySelector('.container');
container.appendChild(newDiv);  // 마지막 자식으로 추가

// 특정 위치에 추가
const firstChild = container.firstChild;
container.insertBefore(newDiv, firstChild);  // 첫 번째 자식으로 추가

// 3. 요소 삭제
const toRemove = document.querySelector('.old-item');
if (toRemove) {
  toRemove.remove();  // 직접 제거 (현대적)
  // container.removeChild(toRemove);  // 부모를 통해 제거 (레거시)
}

// 4. 요소 복제
const cloned = newDiv.cloneNode(true);  // true: 자손까지 복제
container.appendChild(cloned);

// 5. HTML 문자열로 추가 (편의성)
container.insertAdjacentHTML('beforeend', '<div class="temp">임시 요소</div>');

console.log('container children:', container.children.length);`}
        />

        <InfoCard type="tip" title="insertAdjacentHTML 위치">
          <ul>
            <li>
              <code>beforebegin</code>: 요소의 이전 형제
            </li>
            <li>
              <code>afterbegin</code>: 요소의 첫 번째 자식
            </li>
            <li>
              <code>beforeend</code>: 요소의 마지막 자식
            </li>
            <li>
              <code>afterend</code>: 요소의 다음 형제
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="events">4️⃣ 이벤트 리스너 등록</h2>
        <p>
          사용자의 클릭, 키보드 입력, 마우스 이동 등 다양한 상호작용을 감지할 수 있습니다.
        </p>

        <CodeDemo
          title="이벤트 리스너 등록"
          description="다양한 이벤트를 감지하고 처리합니다."
          defaultCode={`const button = document.querySelector('#myButton');
const input = document.querySelector('#myInput');

// 1. addEventListener (권장)
button.addEventListener('click', (event) => {
  console.log('클릭됨!', event);
  console.log('이벤트 타겟:', event.target);
});

// 2. 여러 리스너 등록 가능
button.addEventListener('click', () => {
  console.log('두 번째 리스너');
});

button.addEventListener('mouseover', () => {
  console.log('마우스 오버');
});

// 3. 이벤트 제거 (함수 참조 필요)
function handleClick() {
  console.log('일회성 핸들러');
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);

// 4. 일반 이벤트 타입
input.addEventListener('input', (e) => {
  console.log('입력 중:', e.target.value);
});

input.addEventListener('focus', () => {
  console.log('포커스됨');
});

input.addEventListener('blur', () => {
  console.log('포커스 잃음');
});

// 5. 키보드 이벤트
document.addEventListener('keydown', (e) => {
  console.log('키 누름:', e.key, '코드:', e.code);
});

console.log('이벤트 리스너 등록 완료');`}
        />

        <InfoCard type="warning" title="inline 이벤트 핸들러 비권장">
          <p>
            HTML 에 <code>onclick="..."</code> 형태로 작성하는 것은{' '}
            <strong>권장되지 않습니다</strong>. (전역 스코프 오염, 디버깅 어려움)
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="event-object">5️⃣ 이벤트 객체</h2>
        <p>이벤트 발생 시 브라우저가 이벤트 객체를 생성하여 핸들러에 전달합니다.</p>

        <CodeDemo
          title="이벤트 객체 활용"
          description="이벤트 객체의 다양한 속성을 활용합니다."
          defaultCode={`const link = document.querySelector('#myLink');

link.addEventListener('click', (event) => {
  // 1. 기본 동작 방지 (링크 이동, 폼 제출 등)
  event.preventDefault();
  console.log('기본 동작 방지됨');

  // 2. 이벤트 전파 중지 (버블링 차단)
  // event.stopPropagation();

  // 3. 이벤트 타겟
  console.log('타겟 요소:', event.target);
  console.log('현재 요소:', event.currentTarget);

  // 4. 마우스 이벤트 속성
  console.log('마우스 위치 (화면):', event.screenX, event.screenY);
  console.log('마우스 위치 (뷰포트):', event.clientX, event.clientY);
  console.log('누른 버튼:', event.button);  // 0: 왼쪽, 2: 오른쪽

  // 5. 수정키 상태
  console.log('Shift:', event.shiftKey);
  console.log('Ctrl:', event.ctrlKey);
  console.log('Alt:', event.altKey);
});

// 키보드 이벤트 객체
document.addEventListener('keydown', (e) => {
  console.log('키:', e.key);  // 'Enter', 'a', 'ArrowUp' 등
  console.log('코드:', e.code);  // 'Enter', 'KeyA', 'ArrowUp' 등
  console.log('반복:', e.repeat);
});`}
        />
      </section>

      <section className="content-section">
        <h2 id="event-bubbling">6️⃣ 이벤트 버블링과 위임</h2>
        <p>
          이벤트는 하위 요소에서 상위 요소로 전파됩니다 (버블링). 이 성질을 이용해{' '}
          <strong>이벤트 위임</strong> 패턴을 사용할 수 있습니다.
        </p>

        <CodeDemo
          title="이벤트 버블링과 위임"
          description="이벤트 위임으로 성능과 유지보수성을 향상시킵니다."
          defaultCode={`// 1. 버블링: 자식 → 부모로 전파
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

child.addEventListener('click', () => {
  console.log('자식 클릭');
});

parent.addEventListener('click', () => {
  console.log('부모 클릭 (버블링됨)');
});

// 2. 이벤트 위임: 하나의 리스너로 여러 자식 처리
const list = document.querySelector('#myList');

list.addEventListener('click', (event) => {
  // event.target: 실제로 클릭된 요소
  const item = event.target.closest('li');
  
  if (item && list.contains(item)) {
    console.log('리스트 항목 클릭:', item.textContent);
    console.log('데이터 ID:', item.dataset.id);
  }
});

// 3. 버블링 중지 (필요한 경우만)
const stopBtn = document.querySelector('#stopBtn');
stopBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log('버블링 중지됨');
});

console.log('이벤트 위임 설정 완료');`}
        />

        <InfoCard type="tip" title="이벤트 위임의 장점">
          <ul>
            <li>
              <strong>메모리 효율:</strong> 리스너를 여러 개 등록하지 않음
            </li>
            <li>
              <strong>동적 요소 처리:</strong> 나중에 추가된 요소도 자동 처리
            </li>
            <li>
              <strong>유지보수:</strong> 리스너 관리가 간편
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="form-events">7️⃣ 폼 이벤트</h2>
        <p>폼 제출 및 입력 관련 이벤트를 처리합니다.</p>

        <CodeDemo
          title="폼 이벤트 처리"
          description="폼 제출과 입력 값을 다룹니다."
          defaultCode={`const form = document.querySelector('#myForm');
const nameInput = document.querySelector('#nameInput');
const emailInput = document.querySelector('#emailInput');

// 1. 폼 제출 이벤트
form.addEventListener('submit', (event) => {
  event.preventDefault();  // 기본 제출 방지
  
  // FormData API 사용
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  
  console.log('제출된 데이터:', { name, email });
  
  //或者直接 입력값 접근
  console.log('입력값:', {
    name: nameInput.value,
    email: emailInput.value
  });
});

// 2. 입력 검증 (input 이벤트)
nameInput.addEventListener('input', () => {
  if (nameInput.value.length < 2) {
    nameInput.setCustomValidity('이름은 2 자 이상 입력하세요');
  } else {
    nameInput.setCustomValidity('');
  }
});

// 3. 실시간 검증 (blur 이벤트)
emailInput.addEventListener('blur', () => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    console.log('유효하지 않은 이메일 형식');
  }
});

console.log('폼 이벤트 리스너 등록 완료');`}
        />
      </section>

      <section className="content-section">
        <h2 id="practical">🎯 실전 예제: 투두 리스트</h2>
        <p>지금까지 배운 DOM 조작과 이벤트를 활용해 투두 리스트를 만들어보세요.</p>

        <CodeDemo
          title="투두 리스트 (실전 예제)"
          description="DOM 과 이벤트의 종합적인 활용입니다."
          defaultCode={`// 투두 리스트 실전 예시
// HTML: input#todoInput, button#addBtn, ul#todoList

const todoInput = document.querySelector('#todoInput');
const addBtn = document.querySelector('#addBtn');
const todoList = document.querySelector('#todoList');

// 투두 항목 추가 함수
function addTodo() {
  const text = todoInput.value.trim();
  
  if (!text) {
    alert('할 일을 입력하세요!');
    todoInput.focus();
    return;
  }
  
  // li 요소 생성
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.dataset.id = Date.now().toString();  // 고유 ID
  
  li.innerHTML = \`
    <span class="todo-text">\${text}</span>
    <button class="delete-btn">삭제</button>
  \`;
  
  // 완료 토글
  li.querySelector('.todo-text').addEventListener('click', () => {
    li.classList.toggle('completed');
  });
  
  // 삭제 핸들러
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
  });
  
  // 리스트에 추가
  todoList.appendChild(li);
  
  // 입력창 초기화
  todoInput.value = '';
  todoInput.focus();
}

// 추가 버튼 클릭 이벤트
addBtn.addEventListener('click', addTodo);

// Enter 키로도 추가
todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// 이벤트 위임으로 리스트 관리 (선택)
todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const li = e.target.closest('li');
    li?.remove();
  }
});

console.log('투두 리스트 초기화 완료');`}
        />
      </section>

      <section className="content-section">
        <h2 id="performance">⚡ 성능 팁</h2>
        
        <InfoCard type="tip" title="DOM 조작 최적화">
          <ul>
            <li>
              <strong>DOM 접근 최소화:</strong> 요소 선택은 변수에 저장해 재사용
            </li>
            <li>
              <strong>reflow 최소화:</strong> 여러 스타일 변경은 클래스로 일괄 처리
            </li>
            <li>
              <strong>DocumentFragment:</strong> 여러 요소 추가 시 사용
            </li>
            <li>
              <strong>이벤트 위임:</strong> 리스너 수를 줄여 메모리 절약
            </li>
          </ul>
        </InfoCard>

        <CodeDemo
          title="성능 최적화 예시"
          description="DocumentFragment 를 활용한 대량 요소 추가"
          defaultCode={`// 비효율적인 방법 (reflow 여러 번 발생)
const list = document.querySelector('#myList');
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = \`항목 \${i}\`;
  list.appendChild(li);  // 매번 DOM 업데이트
}

// 효율적인 방법 (DocumentFragment 사용)
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = \`항목 \${i}\`;
  fragment.appendChild(li);  // 메모리에서만 작업
}

list.appendChild(fragment);  // 한 번만 DOM 업데이트

console.log('대량 요소 추가 완료 (최적화)');`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>DOM 선택:</strong> <code>querySelector</code>, <code>querySelectorAll</code> 권장
          </li>
          <li>
            <strong>DOM 조작:</strong> <code>textContent</code>, <code>classList</code>, <code>dataset</code> 활용
          </li>
          <li>
            <strong>이벤트 등록:</strong> <code>addEventListener</code> 사용, inline 핸들러 비권장
          </li>
          <li>
            <strong>이벤트 객체:</strong> <code>event.target</code>, <code>preventDefault()</code>, <code>stopPropagation()</code>
          </li>
          <li>
            <strong>이벤트 위임:</strong> 버블링을 활용한 효율적인 이벤트 처리
          </li>
          <li>
            <strong>성능 최적화:</strong> DOM 접근 최소화, DocumentFragment 활용
          </li>
        </ul>
      </section>
    </div>
  );
}