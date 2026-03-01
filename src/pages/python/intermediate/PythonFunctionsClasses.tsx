import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function PythonFunctionsClasses() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Python 함수와 클래스</h1>
        <p className="page-description">
          Python 의 함수, 클래스, 객체지향 프로그래밍에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="functions">1️⃣ 함수</h2>
        <p>
          재사용 가능한 코드 블록입니다.
        </p>

        <CodeDemo
          title="함수 정의"
          description="def, 매개변수, 반환값"
          defaultCode={`# ============================================
# 1. 기본 함수 정의
# ============================================
def greet():
    print("안녕하세요!")

greet()  # 안녕하세요!

# ============================================
# 2. 매개변수와 인수
# ============================================
def greet_name(name):
    print(f"안녕하세요, {name}님!")

greet_name("Alice")  # 안녕하세요, Alice 님!

# ============================================
# 3. 반환값
# ============================================
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # 8

# ============================================
# 4. 여러 반환값 (튜플)
# ============================================
def get_user():
    return "Alice", 25, "Seoul"

name, age, city = get_user()
print(name, age, city)  # Alice 25 Seoul

# ============================================
# 5. 기본 매개변수
# ============================================
def greet(name, greeting="안녕하세요"):
    print(f"{greeting}, {name}님!")

greet("Alice")              # 안녕하세요, Alice 님!
greet("Bob", "반갑습니다")    # 반갑습니다, Bob 님!

# ============================================
# 6. 키워드 인수
# ============================================
def introduce(name, age, city):
    print(f"{name}, {age} 세, {city} 출신")

introduce("Alice", 25, "Seoul")
introduce(age=30, name="Bob", city="Busan")  # 순서 상관없음

# ============================================
# 7. 가변 인수 (*args)
# ============================================
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3))      # 6
print(sum_all(1, 2, 3, 4, 5)) # 15

# ============================================
# 8. 가변 키워드 인수 (**kwargs)
# ============================================
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="Seoul")
# name: Alice
# age: 25
# city: Seoul

# ============================================
# 9. 모든 조합
# ============================================
def func(a, b, *args, default=10, **kwargs):
    print(f"a: {a}, b: {b}")
    print(f"args: {args}")
    print(f"default: {default}")
    print(f"kwargs: {kwargs}")

func(1, 2, 3, 4, 5, default=100, name="Alice")
# a: 1, b: 2
# args: (3, 4, 5)
# default: 100
# kwargs: {'name': 'Alice'}

# ============================================
# 10. 람다 함수 (익명 함수)
# ============================================
add = lambda x, y: x + y
print(add(3, 5))  # 8

# 정렬에 활용
students = [("Alice", 25), ("Bob", 20), ("Charlie", 30)]
sorted_students = sorted(students, key=lambda x: x[1])
print(sorted_students)  # [('Bob', 20), ('Alice', 25), ('Charlie', 30)]

# ============================================
# 11. 스코프 (범위)
# ============================================
global_var = "전역"

def func():
    local_var = "지역"
    print(global_var)  # 전역 (읽기 가능)
    # print(local_var)  # 여기서만 접근 가능

func()
# print(local_var)  # NameError (외부에서 접근 불가)

# ============================================
# 12. global 키워드
# ============================================
count = 0

def increment():
    global count
    count += 1

increment()
print(count)  # 1

# 3. 타입 힌트
def greet(name: str, age: int) -> str:
    return "Hello, " + name + ", you are " + str(age)

print(greet("Alice", 30))  # Hello, Alice, you are 30`}
        />

        <InfoCard type="tip" title="함수 팁">
          <ul>
            <li>
              <strong>독큐먼트 문자열:</strong> 함수 설명 문자열
            </li>
            <li>
              <strong>타입 힌트:</strong> def func(a: int) -&gt; str
            </li>
            <li>
              <strong>1 급 객체:</strong> 함수를 인수로 전달 가능
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="classes">2️⃣ 클래스</h2>
        <p>
          객체지향 프로그래밍의 기본 단위입니다.
        </p>

        <CodeDemo
          title="클래스 정의"
          description="__init__, 메서드, 상속"
          defaultCode={`# ============================================
# 1. 기본 클래스
# ============================================
class Person:
    def __init__(self, name, age):
        self.name = name  # 인스턴스 변수
        self.age = age
    
    def greet(self):
        return f"안녕하세요, {self.name}입니다."
    
    def introduce(self):
        return f"{self.name}, {self.age} 세"

# 인스턴스 생성
person = Person("Alice", 25)
print(person.name)        # Alice
print(person.greet())     # 안녕하세요, Alice 입니다.
print(person.introduce()) # Alice, 25 세

# ============================================
# 2. 클래스 변수 vs 인스턴스 변수
# ============================================
class Counter:
    count = 0  # 클래스 변수 (모든 인스턴스 공유)
    
    def __init__(self):
        Counter.count += 1
        self.id = Counter.count  # 인스턴스 변수

c1 = Counter()
c2 = Counter()
print(Counter.count)  # 2
print(c1.id)          # 1
print(c2.id)          # 2

# ============================================
# 3. 상속
# ============================================
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return "소리"

class Dog(Animal):  # Animal 상속
    def speak(self):  # 오버라이딩
        return "멍멍!"

class Cat(Animal):
    def speak(self):
        return "야옹!"

dog = Dog("바둑이")
cat = Cat("나비")

print(dog.name)    # 바둑이
print(dog.speak()) # 멍멍!
print(cat.speak()) # 야옹!

# ============================================
# 4. super() 사용
# ============================================
class Bird(Animal):
    def __init__(self, name, can_fly):
        super().__init__(name)  # 부모 생성자 호출
        self.can_fly = can_fly
    
    def speak(self):
        return "짹짹!"

bird = Bird("참새", True)
print(bird.name)      # 참새
print(bird.can_fly)   # True
print(bird.speak())   # 짹짹!

# ============================================
# 5. 다중 상속
# ============================================
class Flyable:
    def fly(self):
        return "날다"

class Swimmable:
    def swim(self):
        return "헤엄치다"

class Duck(Flyable, Swimmable):
    def speak(self):
        return "꽥꽥!"

duck = Duck()
print(duck.speak())  # 꽥꽥!
print(duck.fly())    # 날다
print(duck.swim())   # 헤엄치다

# ============================================
# 6. 특수 메서드 (매직 메서드)
# ============================================
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __len__(self):
        return 2

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2  # __add__ 호출

print(v1)        # Vector(1, 2)
print(v3)        # Vector(4, 6)
print(len(v1))   # 2

# ============================================
# 7. 프로퍼티 (getter/setter)
# ============================================
class Product:
    def __init__(self, price):
        self._price = price  # _ 는 내부용 관례
    
    @property
    def price(self):
        return self._price
    
    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("가격은 음수가 될 수 없습니다")
        self._price = value

product = Product(100)
print(product.price)  # 100 (getter)
product.price = 150   # setter
# product.price = -10  # ValueError`}
        />

        <InfoCard type="tip" title="클래스 팁">
          <ul>
            <li>
              <strong>self:</strong> 인스턴스 자신을 참조 (필수)
            </li>
            <li>
              <strong>__init__:</strong> 생성자
            </li>
            <li>
              <strong>__str__:</strong> 문자열 표현
            </li>
            <li>
              <strong>@property:</strong> getter/setter 데코레이터
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="modules">3️⃣ 모듈과 패키지</h2>
        <p>
          코드를 모듈화하여 재사용합니다.
        </p>

        <CodeDemo
          title="모듈과 패키지"
          description="import, from, __name__"
          defaultCode={`# ============================================
# 1. 모듈 import
# ============================================
# math.py 라는 파일이 있다고 가정
# import math
# result = math.sqrt(16)

# ============================================
# 2. 별칭 import
# ============================================
# import numpy as np
# result = np.array([1, 2, 3])

# ============================================
# 3. 특정 이름만 import
# ============================================
# from math import sqrt, pi
# result = sqrt(16)
# print(pi)

# ============================================
# 4. 모두 import (비권장)
# ============================================
# from math import *

# ============================================
# 5. 모듈 생성 예시
# ============================================
# mymodule.py
"""
def greet(name):
    return f"Hello, {name}!"

PI = 3.14159
"""

# 사용
# import mymodule
# print(mymodule.greet("Alice"))
# print(mymodule.PI)

# ============================================
# 6. __name__ == "__main__"
# ============================================
# mymodule.py
"""
def main():
    print("메인 실행")

if __name__ == "__main__":
    main()
"""

# 직접 실행 시: main() 실행
# import 시: main() 실행 안 됨

# ============================================
# 7. 패키지 구조
# ============================================
# mypackage/
#   __init__.py
#   module1.py
#   module2.py
#   subpackage/
#     __init__.py
#     module3.py

# import mypackage.module1
# from mypackage import module2
# from mypackage.subpackage import module3

# ============================================
# 8. 표준 라이브러리 예시
# ============================================
import os
import sys
import json
import random
import datetime

# os: 운영체제 기능
print(os.getcwd())  # 현재 작업 디렉토리

# random: 난수 생성
print(random.randint(1, 100))  # 1-100 사이 난수
print(random.choice([1, 2, 3, 4, 5]))  # 무작위 선택

# datetime: 날짜/시간
now = datetime.datetime.now()
print(now)  # 2024-01-15 10:30:00.000000

# json: JSON 처리
data = {"name": "Alice", "age": 25}
json_str = json.dumps(data)  # 직렬화
parsed = json.loads(json_str)  # 역직렬화

print("모듈 예시 완료")`}
        />

        <InfoCard type="tip" title="모듈 팁">
          <ul>
            <li>
              <strong>pip:</strong> <code>pip install 패키지명</code>
            </li>
            <li>
              <strong>requirements.txt:</strong> <code>pip freeze &gt; requirements.txt</code>
            </li>
            <li>
              <strong>venv:</strong> 가상 환경 (<code>python -m venv venv</code>)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="decorators">4️⃣ 데코레이터와 제너레이터</h2>
        <p>
          Python 의 고급 기능입니다.
        </p>

        <CodeDemo
          title="데코레이터와 제너레이터"
          description="@decorator, yield"
          defaultCode={`# ============================================
# 1. 데코레이터 기본
# ============================================
def my_decorator(func):
    def wrapper():
        print("함수 호출 전")
        func()
        print("함수 호출 후")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
# 함수 호출 전
# Hello!
# 함수 호출 후

# ============================================
# 2. 인수가 있는 데코레이터
# ============================================
def decorator_with_args(func):
    def wrapper(*args, **kwargs):
        print("인수:", args, kwargs)
        return func(*args, **kwargs)
    return wrapper

@decorator_with_args
def greet(name, age):
    print(f"{name}, {age} 세")

greet("Alice", 25)

# ============================================
# 3. 여러 데코레이터
# ============================================
def decorator1(func):
    def wrapper():
        print("데코레이터 1")
        func()
    return wrapper

def decorator2(func):
    def wrapper():
        print("데코레이터 2")
        func()
    return wrapper

@decorator1
@decorator2
def say_hi():
    print("Hi!")

say_hi()
# 데코레이터 1
# 데코레이터 2
# Hi!

# ============================================
# 4. 제너레이터 기본
# ============================================
def count_up_to(n):
    i = 0
    while i < n:
        yield i  # 값 반환하고 상태 유지
        i += 1

gen = count_up_to(5)
print(next(gen))  # 0
print(next(gen))  # 1
print(next(gen))  # 2

# for 문과 함께
for num in count_up_to(5):
    print(num)  # 0, 1, 2, 3, 4

# ============================================
# 5. 제너레이터 표현식
# ============================================
squares = (x**2 for x in range(10))
print(next(squares))  # 0
print(next(squares))  # 1

# 메모리 효율 (리스트보다)
# list_comp = [x**2 for x in range(1000000)]  # 메모리 많이 사용
# gen_exp = (x**2 for x in range(1000000))   # 메모리 적게 사용

# ============================================
# 6. yield from
# ============================================
def sub_generator():
    yield 1
    yield 2
    yield 3

def main_generator():
    yield from sub_generator()
    yield 4
    yield 5

for value in main_generator():
    print(value)  # 1, 2, 3, 4, 5

# ============================================
# 7. 실제 활용 - 파일 읽기
# ============================================
def read_lines(filename):
    with open(filename, 'r') as f:
        for line in f:
            yield line.strip()

# 큰 파일도 메모리 효율적으로 읽기 가능
# for line in read_lines('large_file.txt'):
#     process(line)

# ============================================
# 8. 실제 활용 - 무한 시퀀스
# ============================================
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
for _ in range(10):
    print(next(fib), end=' ')
# 0 1 1 2 3 5 8 13 21 34

print("\\n데코레이터/제너레이터 예시 완료")`}
        />

        <InfoCard type="tip" title="고급 기능 활용">
          <ul>
            <li>
              <strong>데코레이터:</strong> 함수 기능 확장 (로깅, 인증, 캐싱)
            </li>
            <li>
              <strong>제너레이터:</strong> 메모리 효율, 무한 시퀀스
            </li>
            <li>
              <strong>functools.wraps:</strong> 데코레이터에서 함수 정보 보존
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>함수:</strong> <code>def</code>, 매개변수, 반환값, 람다
          </li>
          <li>
            <strong>클래스:</strong> <code>__init__</code>, 상속, 특수 메서드
          </li>
          <li>
            <strong>모듈:</strong> <code>import</code>, 패키지, 표준 라이브러리
          </li>
          <li>
            <strong>데코레이터:</strong> <code>@decorator</code>, 함수 확장
          </li>
          <li>
            <strong>제너레이터:</strong> <code>yield</code>, 메모리 효율
          </li>
        </ul>
      </section>
    </div>
  );
}