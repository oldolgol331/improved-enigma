import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function PythonFileIO() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>파일 I/O 와 모듈</h1>
        <p className="page-description">
          Python 의 파일 입출력, 모듈 시스템, 패키지 관리에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="file-io">1️⃣ 파일 입출력 기본</h2>
        <p>
          Python 에서 파일을 읽고 쓰는 기본 방법입니다.
        </p>

        <CodeDemo
          title="파일 입출력"
          description="open, read, write, close"
          defaultCode={`# 1. 파일 쓰기 (w 모드)
with open('example.txt', 'w', encoding='utf-8') as f:
    f.write('안녕하세요!\\n')
    f.write('Python 파일 입출력\\n')
    f.write('세 번째 줄\\n')

# 2. 파일 읽기 (r 모드)
with open('example.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print(content)

# 3. 한 줄씩 읽기
with open('example.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line.strip())  # 줄바꿈 제거

# 4. 모든 줄을 리스트로 읽기
with open('example.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    print(lines)  # ['안녕하세요!\\n', ...]

# 5. 파일에 추가하기 (a 모드)
with open('example.txt', 'a', encoding='utf-8') as f:
    f.write('추가된 내용\\n')

# 6. 바이너리 파일 (이미지 등)
# with open('image.png', 'rb') as f:
#     data = f.read()

print('파일 입출력 완료')`}
        />

        <InfoCard type="tip" title="파일 모드">
          <ul>
            <li>
              <strong>'r':</strong> 읽기 (기본값, 파일 없으면 에러)
            </li>
            <li>
              <strong>'w':</strong> 쓰기 (파일 생성, 있으면 덮어쓰기)
            </li>
            <li>
              <strong>'a':</strong> 추가 (파일 생성, 있으면 끝에 추가)
            </li>
            <li>
              <strong>'x':</strong> 생성 (있으면 에러)
            </li>
            <li>
              <strong>'b':</strong> 바이너리 모드 (이미지, 오디오)
            </li>
            <li>
              <strong>'t':</strong> 텍스트 모드 (기본값)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="with-statement">2️⃣ with 문</h2>
        <p>
          with 문은 리소스를 자동으로 정리합니다.
        </p>

        <CodeDemo
          title="with 문"
          description="자동 리소스 관리"
          defaultCode={`# 1. without with (수동 닫기)
f = open('example.txt', 'r', encoding='utf-8')
try:
    content = f.read()
    print(content)
finally:
    f.close()  # 반드시 닫기

# 2. with 문 (자동 닫기) - 권장
with open('example.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print(content)
# 자동으로 f.close() 호출됨

# 3. 여러 파일 동시 처리
with open('input.txt', 'r', encoding='utf-8') as infile, \\
     open('output.txt', 'w', encoding='utf-8') as outfile:
    
    for line in infile:
        outfile.write(line.upper())  # 대문자로 변환

# 4. 컨텍스트 매니저 직접 만들기
class ManagedFile:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()

with ManagedFile('test.txt', 'w') as f:
    f.write('테스트')

print('with 문 완료')`}
        />

        <InfoCard type="warning" title="with 문 사용 이유">
          <ul>
            <li>
              <strong>자동 정리:</strong> 예외 발생해도 반드시 close() 호출
            </li>
            <li>
              <strong>코드 간결:</strong> try-finally 불필요
            </li>
            <li>
              <strong>리소스 누수 방지:</strong> 파일, 데이터베이스 연결 등
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="json">3️⃣ JSON 처리</h2>
        <p>
          JSON 형식의 데이터를 읽고 씁니다.
        </p>

        <CodeDemo
          title="JSON 처리"
          description="json.dump, json.load"
          defaultCode={`import json

# 1. Python 객체를 JSON 으로 변환 (직렬화)
data = {
    'name': 'Alice',
    'age': 25,
    'city': 'Seoul',
    'hobbies': ['reading', 'coding']
}

json_string = json.dumps(data, ensure_ascii=False, indent=2)
print(json_string)

# 2. JSON 을 Python 객체로 변환 (역직렬화)
json_data = '{"name": "Bob", "age": 30}'
python_obj = json.loads(json_data)
print(python_obj['name'])  # 'Bob'

# 3. 파일에 JSON 쓰기
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 4. 파일에서 JSON 읽기
with open('data.json', 'r', encoding='utf-8') as f:
    loaded_data = json.load(f)
    print(loaded_data)

# 5. JSON 과 CSV 비교
import csv

# CSV 쓰기
with open('data.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['name', 'age', 'city'])
    writer.writerow(['Alice', 25, 'Seoul'])
    writer.writerow(['Bob', 30, 'Busan'])

# CSV 읽기
with open('data.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)

print('JSON 처리 완료')`}
        />

        <InfoCard type="tip" title="JSON vs CSV">
          <ul>
            <li>
              <strong>JSON:</strong> 중첩 구조 가능, 웹 API 에서 일반적
            </li>
            <li>
              <strong>CSV:</strong> 표 형태, 스프레드시트 호환
            </li>
            <li>
              <strong>ensure_ascii=False:</strong> 한글 깨짐 방지
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="modules">4️⃣ 모듈과 패키지</h2>
        <p>
          코드를 모듈화하고 재사용합니다.
        </p>

        <CodeDemo
          title="모듈과 패키지"
          description="import, from, __name__"
          defaultCode={`# ============================================
# 모듈: mymodule.py
# ============================================
# mymodule.py

PI = 3.14159

def greet(name):
    return f"Hello, {name}!"

def add(a, b):
    return a + b

# 이 파일이 직접 실행될 때만
if __name__ == '__main__':
    print('mymodule 이 직접 실행됨')
    print(greet('World'))

# ============================================
# 메인: main.py
# ============================================

# 1. 전체 모듈 임포트
import mymodule
print(mymodule.PI)  # 3.14159
print(mymodule.greet('Alice'))

# 2. 특정 함수만 임포트
from mymodule import greet, add
print(greet('Bob'))  # Hello, Bob!

# 3. 별칭 사용
import mymodule as mm
print(mm.PI)

from mymodule import greet as hello
print(hello('Charlie'))

# 4. 모든 것 임포트 (권장 안 함)
from mymodule import *

# 5. 표준 라이브러리
import math
print(math.sqrt(16))  # 4.0

import random
print(random.randint(1, 10))

from datetime import datetime
print(datetime.now())

print('모듈 완료')`}
        />

        <InfoCard type="warning" title="모듈 임포트 가이드">
          <ul>
            <li>
              <strong>명시적 임포트:</strong> <code>from module import func</code> 권장
            </li>
            <li>
              <strong>와일드카드 금지:</strong> <code>from module import *</code> 피하기
            </li>
            <li>
              <strong>__name__:</strong> 직접 실행 vs 임포트 구분
            </li>
            <li>
              <strong>순환 참조:</strong> 모듈 간 상호 임포트 주의
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="packages">5️⃣ 패키지 구조</h2>
        <p>
          패키지와 __init__.py 의 역할입니다.
        </p>

        <CodeDemo
          title="패키지 구조"
          description="__init__.py, 상대 임포트"
          defaultCode={`# ============================================
# 패키지 구조
# ============================================
# mypackage/
#   __init__.py
#   module1.py
#   module2.py
#   subpackage/
#     __init__.py
#     module3.py

# ============================================
# __init__.py 의 역할
# ============================================
# 1. 패키지로 인식하게 함
# 2. 공개 API 정의 (__all__)
# 3. 초기화 코드 실행

# mypackage/__init__.py
from .module1 import func1
from .module2 import func2

__all__ = ['func1', 'func2']  # 공개 API

# ============================================
# 임포트 방법
# ============================================

# 1. 절대 임포트
from mypackage import func1
from mypackage.module1 import func1
from mypackage.subpackage.module3 import func3

# 2. 상대 임포트 (패키지 내부)
from . import module1
from .. import other_package
from .subpackage import module3

# ============================================
# 실제 사용
# ============================================
import mypackage

mypackage.func1()  # __init__.py 에서 정의

print('패키지 완료')`}
        />

        <InfoCard type="tip" title="패키지 구조 모범 사례">
          <ul>
            <li>
              <strong>__init__.py:</strong> 빈 파일도 가능 (Python 3.3+)
            </li>
            <li>
              <strong>__all__:</strong> 공개 API 명시
            </li>
            <li>
              <strong>상대 임포트:</strong> 패키지 내부에서만 사용
            </li>
            <li>
              <strong>네임스페이스:</strong> 중복 없는 패키지명
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="pathlib">6️⃣ pathlib (현대적 경로 처리)</h2>
        <p>
          os.path 대신 pathlib 를 사용하세요.
        </p>

        <CodeDemo
          title="pathlib"
          description="Path 객체로 경로 처리"
          defaultCode={`from pathlib import Path

# 1. Path 객체 생성
current = Path('.')  # 현재 디렉토리
home = Path.home()   # 홈 디렉토리
config = Path('config/settings.json')

# 2. 경로 조합 (os.path.join 대신)
base = Path('/home/user')
file_path = base / 'documents' / 'file.txt'
print(file_path)  # /home/user/documents/file.txt

# 3. 경로 정보
p = Path('/home/user/file.txt')
print(p.name)       # 'file.txt'
print(p.stem)       # 'file'
print(p.suffix)     # '.txt'
print(p.parent)     # '/home/user'
print(p.exists())   # True/False

# 4. 디렉토리 순회
for file in Path('.').glob('*.py'):
    print(file)

# 5. 파일 읽기/쓰기
path = Path('example.txt')

# 쓰기
path.write_text('내용', encoding='utf-8')

# 읽기
content = path.read_text(encoding='utf-8')

# 6. 디렉토리 생성
Path('new_dir').mkdir(exist_ok=True)
Path('nested/deep/dir').mkdir(parents=True, exist_ok=True)

print('pathlib 완료')`}
        />

        <InfoCard type="tip" title="pathlib vs os.path">
          <ul>
            <li>
              <strong>pathlib:</strong> 객체 지향, 직관적, 현대적 (권장)
            </li>
            <li>
              <strong>os.path:</strong> 문자열 기반, 구식
            </li>
            <li>
              <strong>경로 조합:</strong> <code>/</code> 연산자 사용
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>파일 I/O:</strong> open, read, write, with 문
          </li>
          <li>
            <strong>with 문:</strong> 자동 리소스 관리
          </li>
          <li>
            <strong>JSON:</strong> json.dump, json.load
          </li>
          <li>
            <strong>모듈:</strong> import, from, __name__
          </li>
          <li>
            <strong>패키지:</strong> __init__.py, __all__, 상대 임포트
          </li>
          <li>
            <strong>pathlib:</strong> 현대적 경로 처리 (권장)
          </li>
        </ul>
      </section>
    </div>
  );
}
