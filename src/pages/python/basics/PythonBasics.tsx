import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function PythonBasics() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Python 기초</h1>
        <p className="page-description">
          Python 프로그래밍 언어의 기본 문법과 개념에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>Python</strong> 은 읽기 쉽고 간결한 문법을 가진 고수준 프로그래밍 언어입니다.
          웹 개발, 데이터 과학, 인공지능, 자동화 등 다양한 분야에서 사용됩니다.
        </p>

        <InfoCard type="tip" title="Python 특징">
          <ul>
            <li>
              <strong>간결한 문법:</strong> 들여쓰기로 코드 블록 구분
            </li>
            <li>
              <strong>동적 타이핑:</strong> 변수 타입 선언 불필요
            </li>
            <li>
              <strong>풍부한 라이브러리:</strong> "배터리 포함" 철학
            </li>
            <li>
              <strong>크로스플랫폼:</strong> Windows, macOS, Linux 지원
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="variables">1️⃣ 변수와 타입</h2>
        <p>
          Python 의 변수와 데이터 타입입니다.
        </p>

        <CodeDemo
          title="변수와 데이터 타입"
          description="int, float, str, bool"
          defaultCode={`# ============================================
# 1. 변수 선언 (타입 선언 불필요)
# ============================================
name = "Alice"      # 문자열 (str)
age = 25            # 정수 (int)
height = 1.68       # 실수 (float)
is_student = False  # 불리언 (bool)

print(name)         # Alice
print(age)          # 25
print(height)       # 1.68
print(is_student)   # False

# ============================================
# 2. 타입 확인
# ============================================
print(type(name))   # <class 'str'>
print(type(age))    # <class 'int'>
print(type(height)) # <class 'float'>
print(type(is_student))  # <class 'bool'>

# ============================================
# 3. 타입 변환
# ============================================
num_str = "123"
num_int = int(num_str)      # 123 (문자열 → 정수)

pi_str = "3.14"
pi_float = float(pi_str)    # 3.14 (문자열 → 실수)

num = 100
num_str = str(num)          # "100" (정수 → 문자열)

# ============================================
# 4. 여러 변수 할당
# ============================================
# 한 줄에 여러 변수
x, y, z = 1, 2, 3
print(x, y, z)  # 1 2 3

# 같은 값 할당
a = b = c = 0
print(a, b, c)  # 0 0 0

# 값 교환
x, y = y, x
print(x, y)  # 2 1

# ============================================
# 5. 상수 (관례적)
# ============================================
PI = 3.14159
MAX_SIZE = 100

# ============================================
# 6. None 타입 (null 과 유사)
# ============================================
value = None
print(value)  # None
print(value is None)  # True`}
        />

        <InfoCard type="tip" title="Python 변수명 규칙">
          <ul>
            <li>
              <strong>스네이크 케이스:</strong> <code>my_variable</code>
            </li>
            <li>
              <strong>대문자 상수:</strong> <code>MAX_SIZE</code>
            </li>
            <li>
              <strong>시작:</strong> 문자 또는 밑줄 (_), 숫자 불가
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="operators">2️⃣ 연산자</h2>
        <p>
          Python 의 다양한 연산자입니다.
        </p>

        <CodeDemo
          title="연산자"
          description="산술, 비교, 논리 연산자"
          defaultCode={`# ============================================
# 1. 산술 연산자
# ============================================
a, b = 10, 3

print(a + b)   # 13 (덧셈)
print(a - b)   # 7  (뺄셈)
print(a * b)   # 30 (곱셈)
print(a / b)   # 3.333... (나눗셈)
print(a // b)  # 3  (몫)
print(a % b)   # 1  (나머지)
print(a ** b)  # 1000 (거듭제곱)

# ============================================
# 2. 비교 연산자
# ============================================
x, y = 5, 10

print(x == y)  # False (같음)
print(x != y)  # True  (다름)
print(x > y)   # False (초과)
print(x < y)   # True  (미만)
print(x >= 5)  # True  (이상)
print(y <= 10) # True  (이하)

# ============================================
# 3. 논리 연산자
# ============================================
p, q = True, False

print(p and q)  # False (AND)
print(p or q)   # True  (OR)
print(not p)    # False (NOT)

# ============================================
# 4. 복합 대입 연산자
# ============================================
num = 10
num += 5   # num = num + 5 → 15
num -= 3   # num = num - 3 → 12
num *= 2   # num = num * 2 → 24
num /= 4   # num = num / 4 → 6.0
num //= 2  # num = num // 2 → 3.0
num %= 2   # num = num % 2 → 1.0
num **= 3  # num = num ** 3 → 1.0

# ============================================
# 5. 멤버십 연산자
# ============================================
fruits = ["apple", "banana", "orange"]

print("apple" in fruits)      # True
print("grape" not in fruits)  # True

# ============================================
# 6. identity 연산자
# ============================================
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)     # True (값이 같음)
print(a is b)     # False (다른 객체)
print(a is c)     # True (같은 객체)
print(a is not b) # True`}
        />

        <InfoCard type="tip" title="연산자 우선순위">
          <p>
            <code>**</code> &gt; <code>* / // %</code> &gt; <code>+ -</code> &gt; <code>비교</code> &gt; <code>논리</code>
            <br />
            괄호 <code>()</code> 를 사용하면 우선순위를 변경할 수 있습니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="strings">3️⃣ 문자열</h2>
        <p>
          Python 문자열 조작 방법입니다.
        </p>

        <CodeDemo
          title="문자열"
          description="생성, 슬라이싱, 메서드"
          defaultCode={`# ============================================
# 1. 문자열 생성
# ============================================
s1 = 'Hello'
s2 = "World"
s3 = '''여러 줄
문자열'''
s4 = """여러 줄
문자열"""

# ============================================
# 2. 문자열 연산
# ============================================
greeting = "Hello"
name = "Alice"

print(greeting + " " + name)  # Hello Alice (연결)
print(greeting * 3)           # HelloHelloHello (반복)
print(len(greeting))          # 5 (길이)

# ============================================
# 3. 인덱싱과 슬라이싱
# ============================================
text = "Python"

print(text[0])     # P (첫 문자)
print(text[-1])    # n (마지막 문자)
print(text[0:3])   # Pyt (0 부터 3 까지)
print(text[:3])    # Pyt (처음부터 3 까지)
print(text[3:])    # hon (3 부터 끝까지)
print(text[-3:])   # hon (끝에서 3 개)
print(text[:])     # Python (전체)
print(text[::2])   # Pto (2 칸씩)
print(text[::-1])  # nohtyP (역순)

# ============================================
# 4. 문자열 메서드
# ============================================
text = "  Hello, World!  "

print(text.strip())        # "Hello, World!" (공백 제거)
print(text.lower())        # "  hello, world!  "
print(text.upper())        # "  HELLO, WORLD!  "
print(text.replace("H", "J"))  # "  Jello, World!  "
print(text.split(","))     # ["  Hello", " World!  "]
print(text.count("o"))     # 2 (개수 세기)
print(text.find("World"))  # 9 (위치 찾기)
print(text.startswith("  H"))  # True
print(text.endswith("!  "))    # True

# ============================================
# 5. 포매팅
# ============================================
name = "Alice"
age = 25

# f-string (권장)
print(f"My name is {name} and I'm {age} years old")

# format()
print("My name is {} and I'm {} years old".format(name, age))
print("My name is {0} and I'm {1} years old".format(name, age))
print("My name is {name} and I'm {age} years old".format(name="Bob", age=30))

# % 포매팅 (레거시)
print("My name is %s and I'm %d years old" % (name, age))

# ============================================
# 6. 이스케이프 문자
# ============================================
print("Hello\\nWorld")   # 줄바꿈
print("Hello\\tWorld")   # 탭
print("It's a \\"test\\"") # 따옴표
print(r"C:\\Users\\name")  # Raw 문자열`}
        />

        <div className="info-tip">
          <h4>f-string 팁</h4>
          <p>
            Python 3.6+ 에서 사용 가능한 f-string 이 가장 간결하고 빠릅니다.
          </p>
        </div>
      </section>

      <section className="content-section">
        <h2 id="input-output">4️⃣ 입출력</h2>
        <p>
          사용자 입력과 화면 출력입니다.
        </p>

        <CodeDemo
          title="입출력"
          description="input, print"
          defaultCode={`# ============================================
# 1. 입력 받기 (input)
# ============================================
# name = input("이름을 입력하세요: ")
# age = input("나이를 입력하세요: ")

# print(f"안녕하세요, {name}님! {age} 세이시군요.")

# ============================================
# 2. 타입 변환과 입력
# ============================================
# num1 = int(input("첫 번째 숫자: "))
# num2 = int(input("두 번째 숫자: "))
# print(f"합계: {num1 + num2}")

# ============================================
# 3. 출력 (print)
# ============================================
print("Hello")
print("World")
# Hello
# World

print("Hello", "World")  # Hello World (공백 구분)
print("Hello", "World", sep=", ")  # Hello, World
print("Hello", end=" ")
print("World")  # Hello World (한 줄)

# ============================================
# 4. 형식화된 출력
# ============================================
price = 1234.567
print(f"가격: {price:.2f}")  # 가격: 1234.57 (소수점 2 자리)

number = 1000000
print(f"숫자: {number:,}")  # 숫자: 1,000,000 (천 단위 구분)

# ============================================
# 5. 여러 줄 출력
# ============================================
print("""
==================
  프로그램 시작
==================
""")

# ============================================
# 6. 파일 입출력 (기본)
# ============================================
# 파일 쓰기
# with open('test.txt', 'w', encoding='utf-8') as f:
#     f.write("Hello, World!\\n")
#     f.write("두 번째 줄\\n")

# 파일 읽기
# with open('test.txt', 'r', encoding='utf-8') as f:
#     content = f.read()
#     print(content)

# 줄별로 읽기
# with open('test.txt', 'r', encoding='utf-8') as f:
#     for line in f:
#         print(line.strip())

print("입출력 예시 완료")`}
        />

        <InfoCard type="tip" title="with 문">
          <p>
            <code>with</code> 문을 사용하면 파일을 명시적으로 닫지 않아도
            <br />
            블록 종료 시 자동으로 닫힙니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>변수:</strong> 타입 선언 불필요, 동적 타이핑
          </li>
          <li>
            <strong>타입:</strong> int, float, str, bool, None
          </li>
          <li>
            <strong>연산자:</strong> 산술, 비교, 논리, 멤버십
          </li>
          <li>
            <strong>문자열:</strong> 슬라이싱, 메서드, f-string
          </li>
          <li>
            <strong>입출력:</strong> <code>input()</code>, <code>print()</code>
          </li>
          <li>
            <strong>들여쓰기:</strong> 코드 블록 구분 (필수)
          </li>
        </ul>
      </section>
    </div>
  );
}