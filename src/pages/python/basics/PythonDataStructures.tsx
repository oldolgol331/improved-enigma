import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function PythonDataStructures() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Python 자료구조</h1>
        <p className="page-description">
          Python 의 리스트, 딕셔너리, 튜플, 세트에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          Python 은 4 가지 기본 자료구조를 제공합니다:
          <strong>리스트</strong>, <strong>딕셔너리</strong>, <strong>튜플</strong>, <strong>세트</strong>
        </p>

        <InfoCard type="tip" title="자료구조 비교">
          <table>
            <thead>
              <tr>
                <th>타입</th>
                <th>순서</th>
                <th>변경가능</th>
                <th>중복</th>
                <th>문법</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>리스트</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
                <td><code>[]</code></td>
              </tr>
              <tr>
                <td>딕셔너리</td>
                <td>✅</td>
                <td>✅</td>
                <td>❌ (키)</td>
                <td><code>{`{}`}</code></td>
              </tr>
              <tr>
                <td>튜플</td>
                <td>✅</td>
                <td>❌</td>
                <td>✅</td>
                <td><code>()</code></td>
              </tr>
              <tr>
                <td>세트</td>
                <td>❌</td>
                <td>✅</td>
                <td>❌</td>
                <td><code>{`{}`}</code></td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="list">1️⃣ 리스트 (List)</h2>
        <p>
          순서가 있는 변경가능한 시퀀스입니다.
        </p>

        <CodeDemo
          title="리스트"
          description="생성, 조작, 메서드"
          defaultCode={`# ============================================
# 1. 리스트 생성
# ============================================
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
empty = []
nested = [[1, 2], [3, 4], [5, 6]]

# ============================================
# 2. 인덱싱과 슬라이싱
# ============================================
fruits = ["apple", "banana", "orange", "grape"]

print(fruits[0])     # "apple"
print(fruits[-1])    # "grape" (마지막)
print(fruits[1:3])   # ["banana", "orange"]
print(fruits[:2])    # ["apple", "banana"]
print(fruits[2:])    # ["orange", "grape"]
print(fruits[::-1])  # ["grape", "orange", "banana", "apple"]

# ============================================
# 3. 리스트 조작
# ============================================
fruits = ["apple", "banana"]

# 추가
fruits.append("orange")      # 끝에 추가
fruits.insert(1, "grape")    # 특정 위치에 추가
fruits.extend(["mango", "kiwi"])  # 여러 개 추가

# 수정
fruits[0] = "red apple"

# 삭제
fruits.remove("banana")      # 값으로 삭제
popped = fruits.pop()        # 마지막 요소 삭제 및 반환
popped = fruits.pop(0)       # 첫 요소 삭제 및 반환
del fruits[1]                # 인덱스로 삭제

# ============================================
# 4. 리스트 메서드
# ============================================
nums = [3, 1, 4, 1, 5, 9, 2, 6]

print(len(nums))        # 8 (길이)
print(nums.count(1))    # 2 (개수 세기)
print(nums.index(4))    # 2 (위치 찾기)

nums.sort()             # 정렬 (오름차순)
nums.sort(reverse=True) # 정렬 (내림차순)
nums.reverse()          # 뒤집기

nums_copy = nums.copy() # 복사

nums.clear()            # 모두 삭제

# ============================================
# 5. 리스트 컴프리헨션
# ============================================
# 기본
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 조건문
evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# 중첩
matrix = [[i*j for j in range(1, 4)] for i in range(1, 4)]
# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]

# ============================================
# 6. 리스트 연산
# ============================================
list1 = [1, 2, 3]
list2 = [4, 5, 6]

print(list1 + list2)    # [1, 2, 3, 4, 5, 6] (연결)
print(list1 * 3)        # [1, 2, 3, 1, 2, 3, 1, 2, 3] (반복)
print(2 in list1)       # True (멤버십)
print(len(list1))       # 3 (길이)`}
        />

        <InfoCard type="tip" title="리스트 컴프리헨션">
          <p>
            간결한 리스트 생성 방법으로, 반복문과 조건문을 한 줄로 표현합니다.
            <br />
            <code>[표현식 for 항목 in 반복가능 if 조건]</code>
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="dict">2️⃣ 딕셔너리 (Dictionary)</h2>
        <p>
          키 - 값 쌍으로 데이터를 저장합니다.
        </p>

        <CodeDemo
          title="딕셔너리"
          description="키 - 값 쌍, 조작, 메서드"
          defaultCode={`# ============================================
# 1. 딕셔너리 생성
# ============================================
person = {
    "name": "Alice",
    "age": 25,
    "city": "Seoul"
}

# 빈 딕셔너리
empty = {}
empty2 = dict()

# ============================================
# 2. 값 접근과 수정
# ============================================
person = {"name": "Alice", "age": 25}

print(person["name"])     # "Alice"
print(person.get("age"))  # 25

# 존재하지 않는 키 (에러)
# print(person["email"])  # KeyError

# 존재하지 않는 키 (None 반환)
print(person.get("email"))        # None
print(person.get("email", "N/A")) # "N/A" (기본값)

# 수정
person["age"] = 26
person["email"] = "alice@example.com"  # 새 키 추가

# ============================================
# 3. 딕셔너리 메서드
# ============================================
person = {"name": "Alice", "age": 25, "city": "Seoul"}

print(person.keys())    # dict_keys(['name', 'age', 'city'])
print(person.values())  # dict_values(['Alice', 25, 'Seoul'])
print(person.items())   # dict_items([('name', 'Alice'), ...])

# 삭제
age = person.pop("age")         # 키 제거 및 값 반환
person.popitem()                # 마지막 항목 제거
del person["city"]              # 키로 삭제
person.clear()                  # 모두 삭제

# ============================================
# 4. 순회
# ============================================
person = {"name": "Alice", "age": 25, "city": "Seoul"}

# 키만
for key in person.keys():
    print(key)

# 값만
for value in person.values():
    print(value)

# 키 - 값 쌍
for key, value in person.items():
    print(f"{key}: {value}")

# ============================================
# 5. 딕셔너리 컴프리헨션
# ============================================
# 기본
squares = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 조건문
evens = {x: x**2 for x in range(10) if x % 2 == 0}
# {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# 키 - 값 교환
original = {"a": 1, "b": 2, "c": 3}
swapped = {v: k for k, v in original.items()}
# {1: 'a', 2: 'b', 3: 'c'}

# ============================================
# 6. 중첩 딕셔너리
# ============================================
users = {
    "alice": {"age": 25, "city": "Seoul"},
    "bob": {"age": 30, "city": "Busan"},
    "charlie": {"age": 35, "city": "Incheon"}
}

print(users["alice"]["age"])  # 25

# ============================================
# 7. 딕셔너리 병합 (Python 3.9+)
# ============================================
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}

merged = dict1 | dict2  # {"a": 1, "b": 2, "c": 3, "d": 4}

# 업데이트
dict1.update(dict2)`}
        />

        <InfoCard type="tip" title="딕셔너리 활용">
          <ul>
            <li>
              <strong>JSON:</strong> 딕셔너리 형태로 직렬화
            </li>
            <li>
              <strong>카운팅:</strong> <code>Counter</code> 클래스
            </li>
            <li>
              <strong>캐시:</strong> 빠른 조회 (O(1))
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="tuple">3️⃣ 튜플 (Tuple)</h2>
        <p>
          변경할 수 없는 시퀀스입니다.
        </p>

        <CodeDemo
          title="튜플"
          description="불변 시퀀스, 언패킹"
          defaultCode={`# ============================================
# 1. 튜플 생성
# ============================================
colors = ("red", "green", "blue")
numbers = 1, 2, 3, 4, 5  # 괄호 생략 가능
single = (1,)  # 요소 1 개일 때 쉼표 필수
empty = ()

# ============================================
# 2. 인덱싱과 슬라이싱
# ============================================
colors = ("red", "green", "blue", "yellow")

print(colors[0])     # "red"
print(colors[-1])    # "yellow"
print(colors[1:3])   # ("green", "blue")
print(colors[::-1])  # ("yellow", "blue", "green", "red")

# ============================================
# 3. 불변성
# ============================================
colors = ("red", "green", "blue")

# colors[0] = "yellow"  # TypeError! (수정 불가)
# colors.append("white")  # AttributeError!

# ============================================
# 4. 튜플 언패킹
# ============================================
coordinates = (10, 20, 30)
x, y, z = coordinates
print(x, y, z)  # 10 20 30

# 값 교환
a, b = 1, 2
a, b = b, a  # a=2, b=1

# ============================================
# 5. 언패킹 활용
# ============================================
# 첫 요소만
first, *rest = (1, 2, 3, 4, 5)
print(first)  # 1
print(rest)   # [2, 3, 4, 5]

# 마지막 요소만
*begin, last = (1, 2, 3, 4, 5)
print(begin)  # [1, 2, 3, 4]
print(last)   # 5

# 중간만
first, *middle, last = (1, 2, 3, 4, 5)
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5

# ============================================
# 6. 튜플 반환
# ============================================
def get_user():
    return "Alice", 25, "Seoul"

user = get_user()
name, age, city = get_user()

# ============================================
# 7. 튜플 vs 리스트
# ============================================
# 튜플 장점:
# - 더 빠름
# - 메모리 효율
# - 불변 (실수 방지)
# - 딕셔너리 키로 사용 가능

# 리스트 장점:
# - 수정 가능
# - 다양한 메서드`}
        />

        <InfoCard type="tip" title="튜플 사용 사례">
          <ul>
            <li>
              <strong>반환 값:</strong> 함수에서 여러 값 반환
            </li>
            <li>
              <strong>상수 데이터:</strong> 변경되지 않는 값들
            </li>
            <li>
              <strong>딕셔너리 키:</strong> 튜플만 키로 사용 가능
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="set">4️⃣ 세트 (Set)</h2>
        <p>
          중복 없는 값들의 집합입니다.
        </p>

        <CodeDemo
          title="세트"
          description="집합 연산, 메서드"
          defaultCode={`# ============================================
# 1. 세트 생성
# ============================================
fruits = {"apple", "banana", "orange"}
numbers = set([1, 2, 3, 4, 5])
empty = set()  # {} 는 빈 딕셔너리!

# ============================================
# 2. 기본 연산
# ============================================
fruits = {"apple", "banana", "orange"}

fruits.add("grape")      # 추가
fruits.remove("banana")  # 삭제 (없으면 에러)
fruits.discard("kiwi")   # 삭제 (없어도 에러 없음)
popped = fruits.pop()    # 임의 요소 제거

print(len(fruits))       # 길이
print("apple" in fruits) # 멤버십

# ============================================
# 3. 집합 연산
# ============================================
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

# 합집합
print(set1 | set2)  # {1, 2, 3, 4, 5, 6, 7, 8}
print(set1.union(set2))

# 교집합
print(set1 & set2)  # {4, 5}
print(set1.intersection(set2))

# 차집합
print(set1 - set2)  # {1, 2, 3}
print(set1.difference(set2))

# 대칭차집합 (양쪽에만 있는 요소)
print(set1 ^ set2)  # {1, 2, 3, 6, 7, 8}
print(set1.symmetric_difference(set2))

# ============================================
# 4. 세트 컴프리헨션
# ============================================
squares = {x**2 for x in range(10)}
# {0, 1, 4, 9, 16, 25, 36, 49, 64, 81}

# ============================================
# 5. 중복 제거
# ============================================
numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique = list(set(numbers))
print(unique)  # [1, 2, 3, 4]

# ============================================
# 6. 부분집합/상위집합
# ============================================
set1 = {1, 2, 3, 4, 5}
set2 = {3, 4, 5}

print(set2.issubset(set1))      # True
print(set1.issuperset(set2))    # True
print(set1.isdisjoint({6, 7}))  # True (교집합 없음)

# ============================================
# 7. 업데이트
# ============================================
set1 = {1, 2, 3}
set2 = {3, 4, 5}

set1.update(set2)      # 합집합으로 업데이트
set1.intersection_update(set2)  # 교집합으로
set1.difference_update(set2)    # 차집합으로`}
        />

        <InfoCard type="tip" title="세트 활용">
          <ul>
            <li>
              <strong>중복 제거:</strong> <code>list(set(data))</code>
            </li>
            <li>
              <strong>멤버십 테스트:</strong> 리스트보다 빠름 (O(1))
            </li>
            <li>
              <strong>집합 연산:</strong> 교집합, 합집합, 차집합
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>리스트:</strong> <code>[]</code>, 순서 있음, 변경가능, 중복 허용
          </li>
          <li>
            <strong>딕셔너리:</strong> <code>{`{key: value}`}</code>, 키 - 값 쌍, 키 중복 불가
          </li>
          <li>
            <strong>튜플:</strong> <code>()</code>, 순서 있음, 불변, 언패킹
          </li>
          <li>
            <strong>세트:</strong> <code>{`{}`}</code>, 순서 없음, 중복 불가, 집합 연산
          </li>
          <li>
            <strong>컴프리헨션:</strong> 간결한 생성 문법
          </li>
        </ul>
      </section>
    </div>
  );
}