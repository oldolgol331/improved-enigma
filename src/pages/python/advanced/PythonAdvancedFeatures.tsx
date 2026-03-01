import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function PythonAdvancedFeatures() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Python 고급 기능</h1>
        <p className="page-description">
          데코레이터, 제너레이터, 비동기 프로그래밍 등 Python 의 고급 기능을 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="decorators">1️⃣ 데코레이터</h2>
        <p>
          데코레이터는 함수나 클래스에 추가 기능을 부여합니다.
        </p>

        <CodeDemo
          title="데코레이터"
          description="함수 데코레이터, 클래스 데코레이터"
          defaultCode={`# 1. 기본 데코레이터
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("함수 호출 전")
        result = func(*args, **kwargs)
        print("함수 호출 후")
        return result
    return wrapper

@my_decorator
def greet(name):
    print(f"안녕하세요, {name}님!")

greet("Alice")
# 출력:
# 함수 호출 전
# 안녕하세요, Alice 님!
# 함수 호출 후

# 2. 데코레이터 팩토리 (인자 있는 데코레이터)
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")

say_hello()

# 3. functools.wraps (함수 메타데이터 보존)
from functools import wraps

def logged(func):
    @wraps(func)  # 원본 함수 정보 보존
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@logged
def add(a, b):
    """Add two numbers"""
    return a + b

print(add.__name__)  # 'add'
print(add.__doc__)   # 'Add two numbers'

# 4. 클래스 데코레이터
class CountCalls:
    def __init__(self, func):
        self.func = func
        self.count = 0
    
    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"Call {self.count} of {self.func.__name__}")
        return self.func(*args, **kwargs)

@CountCalls
def hello():
    print("Hello")

hello()  # Call 1 of hello
hello()  # Call 2 of hello

# 5. 실전: 타이밍 데코레이터
import time

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} executed in {end - start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)

slow_function()

print('데코레이터 완료')`}
        />

        <InfoCard type="tip" title="데코레이터 활용">
          <ul>
            <li>
              <strong>로깅:</strong> 함수 호출 기록
            </li>
            <li>
              <strong>인증:</strong> 접근 제어
            </li>
            <li>
              <strong>캐싱:</strong> 결과 캐시 (@lru_cache)
            </li>
            <li>
              <strong>타입 체크:</strong> 런타임 타입 검증
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="generators">2️⃣ 제너레이터</h2>
        <p>
          제너레이터는 메모리 효율적인 이터레이터입니다.
        </p>

        <CodeDemo
          title="제너레이터"
          description="yield, yield from, 제너레이터 표현식"
          defaultCode={`# 1. 기본 제너레이터
def count_up_to(n):
    i = 1
    while i <= n:
        yield i  # 값 반환하고 일시정지
        i += 1

# 사용
for num in count_up_to(5):
    print(num)  # 1, 2, 3, 4, 5

# 2. 제너레이터 vs 리스트
def get_squares_list(n):
    return [x**2 for x in range(n)]  # 전체 리스트 생성

def get_squares_gen(n):
    return (x**2 for x in range(n))  # 제너레이터 생성

# 메모리 비교
import sys
list_comp = [x**2 for x in range(1000000)]
gen_expr = (x**2 for x in range(1000000))

print(sys.getsizeof(list_comp))  # 큰 메모리
print(sys.getsizeof(gen_expr))   # 작은 메모리

# 3. yield from (하위 제너레이터 위임)
def sub_generator():
    yield 1
    yield 2

def main_generator():
    yield from sub_generator()  # 하위 제너레이터 값 그대로 전달
    yield 3

print(list(main_generator()))  # [1, 2, 3]

# 4. 제너레이터로 파일 읽기
def read_lines(filename):
    with open(filename, 'r') as f:
        for line in f:
            yield line.strip()

# 큰 파일도 메모리 효율적으로 처리
for line in read_lines('large_file.txt'):
    process(line)

# 5. 양방향 제너레이터 (send)
def accumulator():
    total = 0
    while True:
        value = yield total
        if value is not None:
            total += value

acc = accumulator()
next(acc)      # 0
acc.send(10)   # 10
acc.send(20)   # 30
acc.send(5)    # 35

# 6. 실전: 청크 처리
def chunker(iterable, size):
    iterator = iter(iterable)
    chunk = []
    
    for item in iterator:
        chunk.append(item)
        if len(chunk) == size:
            yield chunk
            chunk = []
    
    if chunk:
        yield chunk

# 사용
data = range(10)
for chunk in chunker(data, 3):
    print(chunk)  # [0,1,2], [3,4,5], [6,7,8], [9]

print('제너레이터 완료')`}
        />

        <InfoCard type="tip" title="제너레이터 활용">
          <ul>
            <li>
              <strong>대용량 데이터:</strong> 스트리밍 처리
            </li>
            <li>
              <strong>무한 시퀀스:</strong> 피보나치, 소수
            </li>
            <li>
              <strong>파이프라인:</strong> 데이터 처리 파이프라인
            </li>
            <li>
              <strong>메모리 효율:</strong> 큰 파일 처리
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="async">3️⃣ 비동기 프로그래밍</h2>
        <p>
          async/await 을 사용한 비동기 프로그래밍입니다.
        </p>

        <CodeDemo
          title="비동기 프로그래밍"
          description="async/await, asyncio"
          defaultCode={`import asyncio
import aiohttp

# 1. 기본 async/await
async def fetch_data(url):
    print(f"Fetching {url}...")
    await asyncio.sleep(1)  # 비동기 대기
    print(f"Done fetching {url}")
    return {"url": url, "data": "response"}

# 2. 여러 코루틴 동시 실행
async def main():
    # 순차 실행
    result1 = await fetch_data("url1")
    result2 = await fetch_data("url2")
    
    # 병렬 실행
    results = await asyncio.gather(
        fetch_data("url1"),
        fetch_data("url2"),
        fetch_data("url3")
    )
    
    # 태스크 생성
    task1 = asyncio.create_task(fetch_data("url1"))
    task2 = asyncio.create_task(fetch_data("url2"))
    
    await task1
    await task2

# 3. aiohttp 로 HTTP 요청
async def fetch_urls(urls):
    async with aiohttp.ClientSession() as session:
        tasks = []
        for url in urls:
            task = asyncio.create_task(
                session.get(url)
            )
            tasks.append(task)
        
        responses = await asyncio.gather(*tasks)
        
        for response in responses:
            data = await response.text()
            print(f"Got {len(data)} bytes from {response.url}")

# 4. 타임아웃 처리
async def fetch_with_timeout(url, timeout=5):
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                return await response.text()
    except asyncio.TimeoutError:
        print(f"Timeout fetching {url}")
    except Exception as e:
        print(f"Error: {e}")

# 5. 실전: 웹 크롤러
class WebCrawler:
    def __init__(self):
        self.visited = set()
    
    async def crawl(self, url, session):
        if url in self.visited:
            return
        
        self.visited.add(url)
        
        try:
            async with session.get(url) as response:
                html = await response.text()
                print(f"Crawled: {url}")
                
                # 링크 추출 (간단한 예시)
                # new_urls = extract_links(html)
                # tasks = [self.crawl(u, session) for u in new_urls]
                # await asyncio.gather(*tasks)
                
        except Exception as e:
            print(f"Error crawling {url}: {e}")
    
    async def run(self, start_url):
        async with aiohttp.ClientSession() as session:
            await self.crawl(start_url, session)

# 실행
# asyncio.run(WebCrawler().run("https://example.com"))

print('비동기 프로그래밍 완료')`}
        />

        <InfoCard type="warning" title="비동기 주의사항">
          <ul>
            <li>
              <strong>asyncio.run():</strong> 진입점
            </li>
            <li>
              <strong>await:</strong> async 함수에서만 사용
            </li>
            <li>
              <strong>블로킹 금지:</strong> time.sleep 대신 asyncio.sleep
            </li>
            <li>
              <strong>예외 처리:</strong> try-except 필수
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="context-managers">4️⃣ 컨텍스트 매니저</h2>
        <p>
          with 문을 사용한 리소스 관리입니다.
        </p>

        <CodeDemo
          title="컨텍스트 매니저"
          description="__enter__, __exit__, contextlib"
          defaultCode={`# 1. 클래스 기반 컨텍스트 매니저
class ManagedFile:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        print(f"Opening {self.filename}")
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Closing {self.filename}")
        self.file.close()
        # True 반환하면 예외 삼킴
        return False

# 사용
with ManagedFile('test.txt', 'w') as f:
    f.write('Hello')

# 2. contextlib.contextmanager (제너레이터 기반)
from contextlib import contextmanager

@contextmanager
def managed_file(filename, mode):
    f = open(filename, mode)
    try:
        yield f
    finally:
        f.close()

# 사용
with managed_file('test.txt', 'w') as f:
    f.write('Hello')

# 3. 데이터베이스 연결
@contextmanager
def db_connection(connection_string):
    conn = create_connection(connection_string)
    try:
        yield conn
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()

# 4. 타이밍 컨텍스트
import time
from contextlib import contextmanager

@contextmanager
def timer(label):
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        print(f"{label}: {end - start:.4f}s")

# 사용
with timer("Processing"):
    time.sleep(1)
    # 처리 로직

# 5. 임시 디렉토리
from contextlib import contextmanager
import tempfile
import shutil
import os

@contextmanager
def temporary_directory():
    tmpdir = tempfile.mkdtemp()
    try:
        yield tmpdir
    finally:
        shutil.rmtree(tmpdir)

# 사용
with temporary_directory() as tmpdir:
    # 임시 파일 생성
    with open(os.path.join(tmpdir, 'file.txt'), 'w') as f:
        f.write('Temporary content')
    # with 블록 나가면 자동 삭제

print('컨텍스트 매니저 완료')`}
        />

        <InfoCard type="tip" title="컨텍스트 매니저 활용">
          <ul>
            <li>
              <strong>파일:</strong> 자동 close()
            </li>
            <li>
              <strong>데이터베이스:</strong> 연결 관리, 트랜잭션
            </li>
            <li>
              <strong>네트워크:</strong> 소켓 연결
            </li>
            <li>
              <strong>락:</strong> 스레드 동기화
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="type-hints">5️⃣ 타입 힌트 심화</h2>
        <p>
          고급 타입 힌트 기능입니다.
        </p>

        <CodeDemo
          title="타입 힌트 심화"
          description="Generic, Protocol, TypeVar"
          defaultCode={`from typing import (
    Generic, TypeVar, Protocol, 
    Callable, Optional, Union
)

# 1. TypeVar (제네릭 타입)
T = TypeVar('T')

def first_element(items: list[T]) -> T:
    return items[0]

# 2. Generic 클래스
class Stack(Generic[T]):
    def __init__(self) -> None:
        self.items: list[T] = []
    
    def push(self, item: T) -> None:
        self.items.append(item)
    
    def pop(self) -> T:
        return self.items.pop()

# 사용
int_stack = Stack[int]()
int_stack.push(1)
int_stack.push(2)

str_stack = Stack[str]()
str_stack.push("hello")

# 3. Protocol (구조적 서브타이핑)
class Drawable(Protocol):
    def draw(self) -> None:
        ...

def render(shape: Drawable) -> None:
    shape.draw()

class Circle:
    def draw(self) -> None:
        print("Drawing circle")

class Square:
    def draw(self) -> None:
        print("Drawing square")

render(Circle())   # OK
render(Square())   # OK

# 4. Callable 타입
def apply(func: Callable[[int, int], int], x: int, y: int) -> int:
    return func(x, y)

def add(a: int, b: int) -> int:
    return a + b

result = apply(add, 5, 3)  # 8

# 5. Union 과 Optional
def process(value: Union[int, str, None]) -> str:
    if value is None:
        return "No value"
    elif isinstance(value, int):
        return f"Number: {value}"
    else:
        return f"String: {value}"

# Optional 은 Union[X, None] 의 축약
def get_name() -> Optional[str]:
    return None

# 6. 타입 가드
from typing import TypeGuard

def is_string_list(items: list) -> TypeGuard[list[str]]:
    return all(isinstance(item, str) for item in items)

def process_strings(items: list) -> None:
    if is_string_list(items):
        # 여기서 items 는 list[str] 타입
        for item in items:
            print(item.upper())

print('타입 힌트 심화 완료')`}
        />

        <InfoCard type="tip" title="타입 힌트 라이브러리">
          <ul>
            <li>
              <strong>typing:</strong> 내장 타입 모듈
            </li>
            <li>
              <strong>pydantic:</strong> 런타임 타입 검증
            </li>
            <li>
              <strong>mypy:</strong> 정적 타입 체커
            </li>
            <li>
              <strong>typing_extensions:</strong> 최신 타입 기능
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>데코레이터:</strong> 함수/클래스에 기능 추가
          </li>
          <li>
            <strong>제너레이터:</strong> 메모리 효율적인 이터레이터
          </li>
          <li>
            <strong>비동기:</strong> async/await, asyncio
          </li>
          <li>
            <strong>컨텍스트 매니저:</strong> with 문 리소스 관리
          </li>
          <li>
            <strong>타입 힌트:</strong> Generic, Protocol, TypeVar
          </li>
        </ul>
      </section>
    </div>
  );
}
