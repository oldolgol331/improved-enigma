import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function PythonControlFlow() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Python 제어 흐름</h1>
        <p className="page-description">
          Python 의 조건문, 반복문, 제어문에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          제어 흐름은 프로그램의 실행 순서를 제어합니다.
          Python 은 <strong>들여쓰기</strong>로 코드 블록을 구분합니다.
        </p>

        <InfoCard type="tip" title="Python 들여쓰기">
          <ul>
            <li>
              <strong>필수:</strong> 들여쓰기로 코드 블록 구분
            </li>
            <li>
              <strong>권장:</strong> 스페이스 4 개 또는 탭 1 개
            </li>
            <li>
              <strong>일관성:</strong> 프로젝트 전체에서 통일
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="if">1️⃣ 조건문 (if)</h2>
        <p>
          조건에 따라 코드를 분기합니다.
        </p>

        <CodeDemo
          title="조건문"
          description="if, elif, else"
          defaultCode={`# ============================================
# 1. 기본 if 문
# ============================================
age = 20

if age >= 20:
    print("성인입니다")

# ============================================
# 2. if-else 문
# ============================================
score = 75

if score >= 60:
    print("합격")
else:
    print("불합격")

# ============================================
# 3. if-elif-else 문
# ============================================
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"학점: {grade}")  # B

# ============================================
# 4. 중첩 if 문
# ============================================
age = 25
has_license = True

if age >= 20:
    if has_license:
        print("운전 가능")
    else:
        print("면허 필요")
else:
    print("미성년자")

# ============================================
# 5. 조건 표현식 (3 항 연산자)
# ============================================
age = 20
status = "성인" if age >= 20 else "미성년자"
print(status)  # 성인

# ============================================
# 6. 참/거짓 판별
# ============================================
# False 로 판별되는 값들
print(bool(0))        # False
print(bool(0.0))      # False
print(bool(""))       # False
print(bool(None))     # False
print(bool([]))       # False
print(bool({}))       # False

# True 로 판별되는 값들
print(bool(1))        # True
print(bool("hello"))  # True
print(bool([1, 2]))   # True

# ============================================
# 7. 실제 활용
# ============================================
user_input = ""

if user_input:  # 비어있지 않으면 True
    print(f"입력값: {user_input}")
else:
    print("입력이 없습니다")

# ============================================
# 8. 복수 조건
# ============================================
age = 25
score = 85

if age >= 20 and score >= 80:
    print("자격 충족")

if age >= 20 or score >= 90:
    print("일부 충족")

if not (age < 20):
    print("성인")`}
        />

        <InfoCard type="tip" title="조건문 팁">
          <ul>
            <li>
              <strong>elif:</strong> else if 의 축약형
            </li>
            <li>
              <strong>in:</strong> 멤버십 확인 (<code>x in list</code>)
            </li>
            <li>
              <strong>is:</strong> 동일 객체 확인 (<code>x is None</code>)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="for">2️⃣ for 문</h2>
        <p>
          시퀀스의 각 요소를 순회합니다.
        </p>

        <CodeDemo
          title="for 문"
          description="range, enumerate, zip"
          defaultCode={`# ============================================
# 1. 기본 for 문
# ============================================
fruits = ["apple", "banana", "orange"]

for fruit in fruits:
    print(fruit)
# apple
# banana
# orange

# ============================================
# 2. 문자열 순회
# ============================================
for char in "Hello":
    print(char)
# H
# e
# l
# l
# o

# ============================================
# 3. range() 함수
# ============================================
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for i in range(2, 6):
    print(i)  # 2, 3, 4, 5

for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8 (2 칸씩)

for i in range(5, 0, -1):
    print(i)  # 5, 4, 3, 2, 1 (역순)

# ============================================
# 4. enumerate() - 인덱스와 값
# ============================================
fruits = ["apple", "banana", "orange"]

for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple
# 1: banana
# 2: orange

for i, fruit in enumerate(fruits, start=1):
    print(f"{i}번째: {fruit}")
# 1 번째: apple
# 2 번째: banana
# 3 번째: orange

# ============================================
# 5. zip() - 여러 리스트 동시 순회
# ============================================
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

for name, age in zip(names, ages):
    print(f"{name}: {age} 세")
# Alice: 25 세
# Bob: 30 세
# Charlie: 35 세

# ============================================
# 6. 딕셔너리 순회
# ============================================
person = {"name": "Alice", "age": 25, "city": "Seoul"}

# 키만
for key in person:
    print(key)

# 값만
for value in person.values():
    print(value)

# 키 - 값 쌍
for key, value in person.items():
    print(f"{key}: {value}")

# ============================================
# 7. 리스트 컴프리헨션
# ============================================
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# 중첩
matrix = [[i*j for j in range(1, 4)] for i in range(1, 4)]
# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]`}
        />

        <InfoCard type="tip" title="for 문 활용">
          <ul>
            <li>
              <code>range(start, stop, step)</code>: 숫자 시퀀스
            </li>
            <li>
              <code>enumerate()</code>: 인덱스와 값 동시 접근
            </li>
            <li>
              <code>zip()</code>: 여러 시퀀스 동시 순회
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="while">3️⃣ while 문</h2>
        <p>
          조건이 참인 동안 반복합니다.
        </p>

        <CodeDemo
          title="while 문"
          description="조건부 반복, break, continue"
          defaultCode={`# ============================================
# 1. 기본 while 문
# ============================================
count = 0

while count < 5:
    print(count)
    count += 1
# 0, 1, 2, 3, 4

# ============================================
# 2. 무한 루프와 break
# ============================================
count = 0

while True:
    print(count)
    count += 1
    if count >= 5:
        break  # 루프 종료

# ============================================
# 3. continue - 다음 반복으로
# ============================================
for i in range(10):
    if i % 2 == 0:
        continue  # 짝수면 건너뜀
    print(i)
# 1, 3, 5, 7, 9

# ============================================
# 4. while-else 문
# ============================================
count = 0

while count < 5:
    print(count)
    count += 1
else:
    print("루프 완료")  # 정상 종료 시 실행

# break 로 종료되면 else 는 실행 안 됨

# ============================================
# 5. 실제 활용 - 사용자 입력
# ============================================
# while True:
#     command = input("명령 입력 (quit: 종료): ")
#     if command == "quit":
#         break
#     print(f"실행: {command}")

# ============================================
# 6. 실제 활용 - 조건 검색
# ============================================
numbers = [1, 3, 5, 7, 9, 2, 4, 6]

# 첫 번째 짝수 찾기
for num in numbers:
    if num % 2 == 0:
        print(f"첫 번째 짝수: {num}")
        break
else:
    print("짝수가 없습니다")

# ============================================
# 7. 중첩 루프
# ============================================
for i in range(2, 10):
    for j in range(1, 10):
        print(f"{i} x {j} = {i*j}")
    print("---")`}
        />

        <InfoCard type="warning" title="while 문 주의">
          <ul>
            <li>
              <strong>무한 루프:</strong> 종료 조건 필수
            </li>
            <li>
              <strong>break:</strong> 루프 즉시 종료
            </li>
            <li>
              <strong>continue:</strong> 현재 반복만 건너뜀
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="exception">4️⃣ 예외 처리</h2>
        <p>
          런타임 에러를 처리합니다.
        </p>

        <CodeDemo
          title="예외 처리"
          description="try, except, finally"
          defaultCode={`# ============================================
# 1. 기본 try-except
# ============================================
try:
    result = 10 / 0
except ZeroDivisionError:
    print("0 으로 나눌 수 없습니다")

# ============================================
# 2. 여러 예외 처리
# ============================================
try:
    # value = int("abc")  # ValueError
    result = 10 / 0  # ZeroDivisionError
    pass
except ValueError:
    print("숫자로 변환할 수 없습니다")
except ZeroDivisionError:
    print("0 으로 나눌 수 없습니다")

# ============================================
# 3. 여러 예외 한꺼번에
# ============================================
try:
    # 위험한 코드
    pass
except (ValueError, ZeroDivisionError) as e:
    print(f"에러 발생: {e}")

# ============================================
# 4. else 블록 (에러 없을 때)
# ============================================
try:
    result = 10 / 2
except ZeroDivisionError:
    print("에러")
else:
    print(f"결과: {result}")  # 에러 없을 때 실행

# ============================================
# 5. finally 블록 (항상 실행)
# ============================================
try:
    result = 10 / 0
except ZeroDivisionError:
    print("에러 처리")
finally:
    print("항상 실행")  # 에러 유무와 관계없이 실행

# ============================================
# 6. 예외 발생시키기
# ============================================
def set_age(age):
    if age < 0:
        raise ValueError("나이는 음수가 될 수 없습니다")
    return age

# set_age(-5)  # ValueError 발생

# ============================================
# 7. 실제 활용 - 파일 처리
# ============================================
try:
    file = open("test.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("파일을 찾을 수 없습니다")
finally:
    file.close()  # 항상 실행

# ============================================
# 8. with 문 (권장)
# ============================================
try:
    with open("test.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("파일을 찾을 수 없습니다")
# with 블록 종료 시 자동으로 파일 닫힘

# ============================================
# 9. 커스텀 예외
# ============================================
class MyError(Exception):
    def __init__(self, message):
        super().__init__(message)

# raise MyError("사용자 정의 에러")`}
        />

        <InfoCard type="tip" title="예외 처리 팁">
          <ul>
            <li>
              <strong>구체적 예외:</strong> <code>except Exception</code> 보다 구체적으로
            </li>
            <li>
              <strong>with 문:</strong> 리소스 자동 정리
            </li>
            <li>
              <strong>finally:</strong> 정리 코드 (파일 닫기, 연결 끊기)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>if 문:</strong> <code>if</code>, <code>elif</code>, <code>else</code>
          </li>
          <li>
            <strong>for 문:</strong> <code>range()</code>, <code>enumerate()</code>, <code>zip()</code>
          </li>
          <li>
            <strong>while 문:</strong> 조건부 반복, <code>break</code>, <code>continue</code>
          </li>
          <li>
            <strong>예외 처리:</strong> <code>try</code>, <code>except</code>, <code>finally</code>
          </li>
          <li>
            <strong>들여쓰기:</strong> Python 의 코드 블록 구분 (필수)
          </li>
        </ul>
      </section>
    </div>
  );
}