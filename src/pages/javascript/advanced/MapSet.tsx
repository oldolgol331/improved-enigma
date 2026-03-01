import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function JavaScriptMapSet() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Map, Set, WeakMap, WeakSet</h1>
        <p className="page-description">
          JavaScript 의 고급 컬렉션 자료구조에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          JavaScript 에는 배열과 객체 외에도 유용한 컬렉션 자료구조가 있습니다.
          <strong>Map</strong> 과 <strong>Set</strong> 은 ES6 에서 추가되었으며,
          <strong>WeakMap</strong> 과 <strong>WeakSet</strong> 은 약한 참조를 사용합니다.
        </p>

        <InfoCard type="tip" title="컬렉션 자료구조 비교">
          <ul>
            <li>
              <strong>Map:</strong> 키 - 값 쌍 (객체보다 유연)
            </li>
            <li>
              <strong>Set:</strong> 고유한 값들의 집합 (중복 허용 안 함)
            </li>
            <li>
              <strong>WeakMap:</strong> 키가 약한 참조 (가비지 컬렉션 대상)
            </li>
            <li>
              <strong>WeakSet:</strong> 값이 약한 참조 (객체만 저장)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="map">1️⃣ Map</h2>
        <p>
          키 - 값 쌍을 저장하는 컬렉션입니다. 객체와 유사하지만 모든 타입을 키로 사용할 수 있습니다.
        </p>

        <CodeDemo
          title="Map 사용법"
          description="생성, 추가, 조회, 삭제, 순회"
          defaultCode={`// 1. Map 생성
const map = new Map();

// 2. 값 추가
map.set('name', 'Alice');
map.set('age', 25);
map.set(1, 'number key');  // 숫자도 키로 가능
map.set({ id: 1 }, 'object key');  // 객체도 키로 가능

// 3. 값 조회
console.log(map.get('name'));  // 'Alice'
console.log(map.get(1));  // 'number key'
console.log(map.size);  // 4

// 4. 존재 확인
console.log(map.has('name'));  // true
console.log(map.has('email'));  // false

// 5. 값 삭제
map.delete('age');
console.log(map.size);  // 3

// 6. 전체 순회
map.forEach((value, key) => {
  console.log(key, '=>', value);
});

// 7. Map 에서 배열로
console.log([...map.keys()]);  // 모든 키
console.log([...map.values()]);  // 모든 값
console.log([...map.entries()]);  // 모든 엔트리

// 8. Map 초기화
const initialMap = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);
console.log(initialMap.get('a'));  // 1

console.log('Map 예시 완료');`}
        />

        <InfoCard type="tip" title="Map vs Object">
          <ul>
            <li>
              <strong>키 타입:</strong> Map 은 모든 타입, Object 는 문자열/심볼만
            </li>
            <li>
              <strong>순서:</strong> Map 은 삽입 순서 보장, Object 는 제한적
            </li>
            <li>
              <strong>크기:</strong> Map 은 size 속성, Object 는 수동 계산
            </li>
            <li>
              <strong>성능:</strong> 빈번한 추가/삭제는 Map 이 빠름
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="set">2️⃣ Set</h2>
        <p>
          고유한 값들의 집합입니다. 중복을 자동으로 제거합니다.
        </p>

        <CodeDemo
          title="Set 사용법"
          description="중복 제거, 집합 연산"
          defaultCode={`// 1. Set 생성
const set = new Set();

// 2. 값 추가
set.add(1);
set.add(2);
set.add(2);  // 중복 무시
set.add(3);
console.log(set.size);  // 3

// 3. 값 확인
console.log(set.has(2));  // true
console.log(set.has(4));  // false

// 4. 값 삭제
set.delete(2);
console.log(set.size);  // 2

// 5. 전체 순회
set.forEach(value => {
  console.log(value);  // 1, 3
});

// 6. 배열에서 Set 으로 (중복 제거)
const numbers = [1, 2, 2, 3, 3, 3, 4];
const uniqueNumbers = new Set(numbers);
console.log([...uniqueNumbers]);  // [1, 2, 3, 4]

// 7. 집합 연산
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

// 교집합
const intersection = new Set([...a].filter(x => b.has(x)));
console.log('교집합:', [...intersection]);  // [2, 3]

// 합집합
const union = new Set([...a, ...b]);
console.log('합집합:', [...union]);  // [1, 2, 3, 4]

// 차집합
const difference = new Set([...a].filter(x => !b.has(x)));
console.log('차집합:', [...difference]);  // [1]

console.log('Set 예시 완료');`}
        />

        <InfoCard type="tip" title="Set 활용 사례">
          <ul>
            <li>
              <strong>중복 제거:</strong> <code>[...new Set(array)]</code>
            </li>
            <li>
              <strong>교집합/합집합:</strong> 집합 연산
            </li>
            <li>
              <strong>고유 ID 관리:</strong> 중복 없는 ID 집합
            </li>
            <li>
              <strong>검색 최적화:</strong> O(1) 시간복잡도
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="weakmap">3️⃣ WeakMap</h2>
        <p>
          키가 약한 참조인 Map 입니다. 키로 사용된 객체가 참조되지 않으면 가비지 컬렉션됩니다.
        </p>

        <CodeDemo
          title="WeakMap 사용법"
          description="메모리 누수 방지, 캐싱"
          defaultCode={`// 1. WeakMap 생성
const weakMap = new WeakMap();

// 2. 객체를 키로 사용
const keyObj = { id: 1 };
weakMap.set(keyObj, 'value1');

console.log(weakMap.has(keyObj));  // true
console.log(weakMap.get(keyObj));  // 'value1'

// 3. 키 참조 제거 시 가비지 컬렉션
keyObj = null;
// 이제 WeakMap 의 엔트리는 자동으로 제거됨

// 4. 사용 제한사항
// - 키는 객체만 가능
// - size 속성 없음
// - 순회 메서드 없음 (keys, values, entries)
// - clear() 메서드 없음

// 5. 활용: 프라이빗 데이터 (메모리 누수 없이)
const privateData = new WeakMap();

class User {
  constructor(name, password) {
    privateData.set(this, { name, password });
  }
  
  getName() {
    return privateData.get(this).name;
  }
}

const user = new User('Alice', 'secret123');
console.log(user.getName());  // 'Alice'
// password 는 직접 접근 불가

console.log('WeakMap 예시 완료');`}
        />

        <InfoCard type="warning" title="WeakMap 주의사항">
          <ul>
            <li>
              <strong>키:</strong> 객체만 가능 (원시 타입 불가)
            </li>
            <li>
              <strong>열거 불가:</strong> size, keys, values, entries 없음
            </li>
            <li>
              <strong>가비지 컬렉션:</strong> 키 참조消失 시 자동 삭제
            </li>
            <li>
              <strong>용도:</strong> 캐싱, 프라이빗 데이터, 메모이제이션
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="weakset">4️⃣ WeakSet</h2>
        <p>
          값이 약한 참조인 Set 입니다. 객체만 저장할 수 있으며 참조消失 시 자동 제거됩니다.
        </p>

        <CodeDemo
          title="WeakSet 사용법"
          description="객체 존재 여부 추적"
          defaultCode={`// 1. WeakSet 생성
const weakSet = new WeakSet();

// 2. 객체 추가
const obj1 = { id: 1 };
const obj2 = { id: 2 };

weakSet.add(obj1);
weakSet.add(obj2);

console.log(weakSet.has(obj1));  // true

// 3. 객체 참조 제거 시 자동 삭제
obj1 = null;
// 이제 WeakSet 에서 자동 제거

// 4. 사용 제한사항
// - 값은 객체만 가능
// - size 속성 없음
// - 순회 메서드 없음
// - clear() 메서드 없음

// 5. 활용: 객체 처리 여부 추적
const processedObjects = new WeakSet();

function processObject(obj) {
  if (processedObjects.has(obj)) {
    console.log('이미 처리됨');
    return;
  }
  
  // 처리 로직
  console.log('처리 중...');
  processedObjects.add(obj);
}

const target = { data: 'test' };
processObject(target);  // '처리 중...'
processObject(target);  // '이미 처리됨'

console.log('WeakSet 예시 완료');`}
        />

        <InfoCard type="tip" title="WeakSet 활용 사례">
          <ul>
            <li>
              <strong>이벤트 리스너 추적:</strong> 중복 등록 방지
            </li>
            <li>
              <strong>처리済み 객체:</strong> 재처리 방지
            </li>
            <li>
              <strong>일시적 객체:</strong> 메모리 자동 정리
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="comparison">5️⃣ 비교 정리</h2>
        <p>
          네 컬렉션을 비교합니다.
        </p>

        <CodeDemo
          title="컬렉션 비교"
          description="특징과 사용 사례"
          defaultCode={`// ============================================
// 1. Map vs Object
// ============================================
// Map 사용: 키 타입 자유, 빈번한 추가/삭제
const map = new Map();
map.set('key', 'value');
map.set(123, 'number key');
map.set({}, 'object key');

// Object 사용: 단순 키 - 값, JSON 직렬화 필요
const obj = { key: 'value' };

// ============================================
// 2. Set vs Array
// ============================================
// Set 사용: 중복 제거, 빠른 검색
const uniqueSet = new Set([1, 2, 2, 3]);
uniqueSet.has(2);  // O(1)

// Array 사용: 순서 중요, 인덱스 접근
const arr = [1, 2, 3];
arr.includes(2);  // O(n)

// ============================================
// 3. WeakMap/WeakSet vs Map/Set
// ============================================
// Weak: 메모리 자동 정리, 열거 불가
// Strong: 수동 관리, 전체 순회 가능

// ============================================
// 4. 선택 가이드
// ============================================
// - 키 - 값 저장: Map (객체보다 유연)
// - 중복 제거: Set
// - 메모리 최적화: WeakMap/WeakSet
// - JSON 필요: Object
// - 인덱스 접근: Array

console.log('비교 완료');`}
        />

        <InfoCard type="tip" title="선택 가이드">
          <ul>
            <li>
              <strong>Map:</strong> 다양한 키 타입, 빈번한 수정
            </li>
            <li>
              <strong>Set:</strong> 고유 값, 중복 제거
            </li>
            <li>
              <strong>WeakMap:</strong> 객체 기반 캐싱, 메모리 최적화
            </li>
            <li>
              <strong>WeakSet:</strong> 객체 존재 추적, 재처리 방지
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Map:</strong> 모든 타입 키 가능, 삽입 순서 보장
          </li>
          <li>
            <strong>Set:</strong> 고유 값 집합, 중복 자동 제거
          </li>
          <li>
            <strong>WeakMap:</strong> 객체 키, 가비지 컬렉션 지원
          </li>
          <li>
            <strong>WeakSet:</strong> 객체 값, 가비지 컬렉션 지원
          </li>
          <li>
            <strong>Weak:</strong> 열거 불가, 메모리 자동 정리
          </li>
        </ul>
      </section>
    </div>
  );
}
