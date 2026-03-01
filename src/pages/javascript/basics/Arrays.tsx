import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function Arrays() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>배열 (Arrays)</h1>
        <p className="page-description">
          JavaScript 배열의 생성, 접근, 그리고 다양한 메서드에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          배열은 여러 값을 순서대로 저장하는 데이터 구조입니다. JavaScript 의 배열은 동적이며, 서로
          다른 타입의 값을 저장할 수 있습니다.
        </p>
      </section>

      <section className="content-section">
        <h2 id="creation">1️⃣ 배열 생성</h2>
        <p>배열 리터럴 또는 Array 생성자를 사용해 배열을 만들 수 있습니다.</p>

        <CodeDemo
          title="배열 생성"
          description="다양한 배열 생성 방법을 확인해보세요."
          defaultCode={`// 배열 리터럴 (권장)
const arr1 = [1, 2, 3, 4, 5];
console.log('arr1:', arr1);

// 빈 배열
const empty = [];
console.log('empty:', empty);

// 다양한 타입 혼합
const mixed = [1, 'hello', true, null, undefined, { name: 'Alice' }, [1, 2]];
console.log('mixed:', mixed);

// Array 생성자 (비권장 - 혼동 가능)
const arr2 = new Array(5); // 길이가 5 인 빈 배열
console.log('new Array(5):', arr2); // [empty × 5]

const arr3 = new Array(1, 2, 3); // [1, 2, 3]
console.log('new Array(1, 2, 3):', arr3);

// Array.of (권장)
const arr4 = Array.of(5); // [5]
console.log('Array.of(5):', arr4);

// Array.from
const arr5 = Array.from('Hello');
console.log('Array.from("Hello"):', arr5); // ['H', 'e', 'l', 'l', 'o']

const arr6 = Array.from({ length: 3 }, (_, i) => i * 2);
console.log('Array.from with map:', arr6); // [0, 2, 4]`}
        />
      </section>

      <section className="content-section">
        <h2 id="access">2️⃣ 배열 접근 및 수정</h2>
        <p>인덱스를 사용해 배열 요소에 접근하고 수정할 수 있습니다.</p>

        <CodeDemo
          title="배열 접근 및 수정"
          description="인덱스를 활용한 배열 조작입니다."
          defaultCode={`const colors = ['red', 'green', 'blue'];

// 인덱스 접근 (0 부터 시작)
console.log('colors[0]:', colors[0]); // red
console.log('colors[1]:', colors[1]); // green
console.log('colors[2]:', colors[2]); // blue

// 음수 인덱스는 지원되지 않음
console.log('colors[-1]:', colors[-1]); // undefined

// 값 수정
colors[1] = 'yellow';
console.log('after update:', colors); // ['red', 'yellow', 'blue']

// 존재하지 않는 인덱스에 할당
colors[5] = 'purple';
console.log('after adding index 5:', colors); // ['red', 'yellow', 'blue', empty × 2, 'purple']
console.log('length:', colors.length); // 6

// length 변경
colors.length = 3;
console.log('after length = 3:', colors); // ['red', 'yellow', 'blue']

// 구조 분해 할당
const [first, second, third] = colors;
console.log('destructuring:', first, second, third);

// 나머지 연산자
const [primary, ...rest] = colors;
console.log('primary:', primary); // red
console.log('rest:', rest); // ['yellow', 'blue']`}
        />
      </section>

      <section className="content-section">
        <h2 id="mutating">3️⃣ 배열 변경 메서드 (Mutating Methods)</h2>
        <p>원본 배열을 변경하는 메서드들입니다.</p>

        <InfoCard type="warning" title="원본 변경 주의">
          <p>
            이 메서드들은 <strong>원본 배열을 직접 변경</strong>합니다. 함수형 프로그래밍이나 React
            상태 관리 시에는 주의가 필요합니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="배열 변경 메서드"
          description="원본 배열을 변경하는 메서드들입니다."
          defaultCode={`// push: 끝에 추가, 새로운 길이 반환
const arr1 = [1, 2, 3];
const newLength = arr1.push(4, 5);
console.log('push:', arr1); // [1, 2, 3, 4, 5]
console.log('new length:', newLength); // 5

// pop: 마지막 요소 제거, 제거된 요소 반환
const arr2 = [1, 2, 3, 4, 5];
const last = arr2.pop();
console.log('pop:', arr2); // [1, 2, 3, 4]
console.log('last element:', last); // 5

// unshift: 앞에 추가
const arr3 = [3, 4, 5];
arr3.unshift(1, 2);
console.log('unshift:', arr3); // [1, 2, 3, 4, 5]

// shift: 첫 번째 요소 제거
const arr4 = [1, 2, 3, 4, 5];
const first = arr4.shift();
console.log('shift:', arr4); // [2, 3, 4, 5]
console.log('first element:', first); // 1

// splice: 요소 추가/제거
const arr5 = [1, 2, 3, 4, 5];
arr5.splice(2, 2, 'a', 'b'); // index 2 에서 2 개 제거, a, b 추가
console.log('splice:', arr5); // [1, 2, 'a', 'b', 5]

// sort: 정렬 (원본 변경 주의!)
const arr6 = [3, 1, 4, 1, 5, 9];
arr6.sort(); // 문자열 기준 정렬!
console.log('sort (default):', arr6); // [1, 1, 3, 4, 5, 9]

const arr7 = [10, 2, 30, 1];
arr7.sort((a, b) => a - b); // 숫자 정렬
console.log('sort (numeric):', arr7); // [1, 2, 10, 30]

// reverse: 뒤집기
const arr8 = [1, 2, 3, 4, 5];
arr8.reverse();
console.log('reverse:', arr8); // [5, 4, 3, 2, 1]`}
        />
      </section>

      <section className="content-section">
        <h2 id="non-mutating">4️⃣ 배열 비변경 메서드 (Non-Mutating Methods)</h2>
        <p>
          원본 배열을 변경하지 않고 새로운 배열을 반환하는 메서드들입니다.
          <strong>React 와 함수형 프로그래밍에서 권장됩니다.</strong>
        </p>

        <InfoCard type="tip" title="불변성 (Immutability)">
          <p>
            React 의 상태 업데이트나 Redux 에서는 <strong>비변경 메서드</strong>를 사용해야 합니다.
            원본을 변경하면 재렌더링이 트리거되지 않을 수 있습니다.
          </p>
        </InfoCard>

        <CodeDemo
          title="배열 비변경 메서드"
          description="원본을 변경하지 않는 메서드들입니다."
          defaultCode={`const original = [1, 2, 3, 4, 5];

// slice: 배열 일부 추출 (start, end)
const sliced = original.slice(1, 4);
console.log('slice:', sliced); // [2, 3, 4]
console.log('original:', original); // [1, 2, 3, 4, 5] (변경 없음)

// concat: 배열 결합
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2, [5, 6]);
console.log('concat:', combined); // [1, 2, 3, 4, 5, 6]
console.log('arr1:', arr1); // [1, 2] (변경 없음)

// Spread 연산자 (현대적 방식 - 권장)
const spreadCombined = [...arr1, ...arr2, 5, 6];
console.log('spread:', spreadCombined); // [1, 2, 3, 4, 5, 6]

// join: 배열을 문자열로
const joined = original.join(', ');
console.log('join:', joined); // "1, 2, 3, 4, 5"

// includes: 요소 포함 여부
console.log('includes(3):', original.includes(3)); // true
console.log('includes(10):', original.includes(10)); // false

// indexOf / lastIndexOf: 요소 인덱스 찾기
console.log('indexOf(3):', original.indexOf(3)); // 2
console.log('indexOf(10):', original.indexOf(10)); // -1

// toReversed, toSorted, toSpliced (ES2023)
const original2 = [3, 1, 4, 1, 5];
const reversed = original2.toReversed();
console.log('toReversed:', reversed); // [5, 1, 4, 1, 3]
console.log('original2:', original2); // [3, 1, 4, 1, 5] (변경 없음)

const sorted = original2.toSorted((a, b) => a - b);
console.log('toSorted:', sorted); // [1, 1, 3, 4, 5]`}
        />
      </section>

      <section className="content-section">
        <h2 id="iteration">5️⃣ 배열 순회 메서드</h2>
        <p>배열을 순회하며 다양한 연산을 수행하는 고차 함수들입니다.</p>

        <CodeDemo
          title="배열 순회 메서드"
          description="forEach, map, filter, reduce 등을 확인해보세요."
          defaultCode={`const numbers = [1, 2, 3, 4, 5];

// forEach: 각 요소에 함수 적용 (반환값 없음)
numbers.forEach((num, index) => {
  console.log(\`forEach \${index}: \${num}\`);
});

// map: 새로운 배열 생성
const doubled = numbers.map(num => num * 2);
console.log('map:', doubled); // [2, 4, 6, 8, 10]

// filter: 조건에 맞는 요소만
const evens = numbers.filter(num => num % 2 === 0);
console.log('filter:', evens); // [2, 4]

// find: 조건에 맞는 첫 번째 요소
const found = numbers.find(num => num > 3);
console.log('find:', found); // 4

// findIndex: 조건에 맞는 첫 번째 인덱스
const foundIndex = numbers.findIndex(num => num > 3);
console.log('findIndex:', foundIndex); // 3

// some: 하나라도 조건 만족
const hasEven = numbers.some(num => num % 2 === 0);
console.log('some:', hasEven); // true

// every: 모두 조건 만족
const allPositive = numbers.every(num => num > 0);
console.log('every:', allPositive); // true

// reduce: 누적 계산
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log('reduce sum:', sum); // 15

// reduce 로 map 구현
const mapped = numbers.reduce((acc, num) => {
  acc.push(num * 2);
  return acc;
}, []);
console.log('reduce as map:', mapped); // [2, 4, 6, 8, 10]

// 체이닝
const result = numbers
  .filter(n => n % 2 === 0)    // [2, 4]
  .map(n => n * 10)            // [20, 40]
  .reduce((acc, n) => acc + n, 0); // 60
console.log('chained:', result);`}
        />
      </section>

      <section className="content-section">
        <h2 id="destructuring">6️⃣ 배열 구조 분해</h2>
        <p>배열의 요소를 개별 변수로 쉽게 추출할 수 있습니다.</p>

        <CodeDemo
          title="배열 구조 분해"
          description="배열에서 값을 추출하는 현대적인 방법입니다."
          defaultCode={`const colors = ['red', 'green', 'blue'];

// 기본 구조 분해
const [first, second, third] = colors;
console.log(first, second, third); // red green blue

// 일부만 추출
const [primary] = colors;
console.log('primary:', primary); // red

// 건너뛰기
const [, , tertiary] = colors;
console.log('tertiary:', tertiary); // blue

// 나머지 연산자
const [main, ...rest] = colors;
console.log('main:', main); // red
console.log('rest:', rest); // ['green', 'blue']

// 기본값
const [a, b, c, d = 'yellow'] = colors;
console.log('d:', d); // yellow (colors[3] 이 없으므로 기본값)

// 스왑
let x = 1, y = 2;
[x, y] = [y, x];
console.log('swapped:', x, y); // 2 1`}
        />
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              배열 생성: 리터럴 <code>[]</code> 권장, <code>Array.from</code> 활용
            </li>
            <li>
              변경 메서드: <code>push</code>, <code>pop</code>, <code>splice</code>,{' '}
              <code>sort</code>, <code>reverse</code>
            </li>
            <li>
              비변경 메서드: <code>slice</code>, <code>concat</code>, Spread 연산자 (React 에서
              권장)
            </li>
            <li>
              순회 메서드: <code>forEach</code>, <code>map</code>, <code>filter</code>,{' '}
              <code>reduce</code>
            </li>
            <li>
              검색: <code>find</code>, <code>findIndex</code>, <code>includes</code>,{' '}
              <code>indexOf</code>
            </li>
            <li>
              구조 분해: <code>[first, ...rest]</code> 로 값 추출
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
