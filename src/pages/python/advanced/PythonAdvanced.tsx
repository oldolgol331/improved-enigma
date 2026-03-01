import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function PythonAdvanced() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Python 고급</h1>
        <p className="page-description">
          Python 의 파일 처리, 비동기 프로그래밍, 웹 스크래핑에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="file-io">1️⃣ 파일 입출력</h2>
        <p>
          파일 읽기, 쓰기, 다양한 형식 처리입니다.
        </p>

        <CodeDemo
          title="파일 입출력"
          description="open, read, write, JSON, CSV"
          defaultCode={`# ============================================
# 1. 기본 파일 읽기
# ============================================
# 텍스트 파일 읽기
with open('file.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print(content)

# ============================================
# 2. 파일 쓰기
# ============================================
# 텍스트 파일 쓰기 (덮어쓰기)
with open('file.txt', 'w', encoding='utf-8') as f:
    f.write("첫 번째 줄\\n")
    f.write("두 번째 줄\\n")

# 추가 쓰기
with open('file.txt', 'a', encoding='utf-8') as f:
    f.write("추가된 줄\\n")

# ============================================
# 3. 다양한 읽기 방법
# ============================================
with open('file.txt', 'r', encoding='utf-8') as f:
    # 전체 읽기
    content = f.read()
    
    # 한 줄씩 읽기
    f.seek(0)  # 파일 포인터 맨 앞으로
    line = f.readline()
    
    # 모든 줄을 리스트로
    f.seek(0)
    lines = f.readlines()
    for line in lines:
        print(line.strip())

# ============================================
# 4. JSON 처리
# ============================================
import json

data = {
    "name": "Alice",
    "age": 25,
    "skills": ["Python", "JavaScript"]
}

# JSON 쓰기
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# JSON 읽기
with open('data.json', 'r', encoding='utf-8') as f:
    loaded = json.load(f)
    print(loaded["name"])  # Alice

# ============================================
# 5. CSV 처리
# ============================================
import csv

# CSV 쓰기
with open('data.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['이름', '나이', '도시'])
    writer.writerow(['Alice', 25, 'Seoul'])

# CSV 읽기
with open('data.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)

# ============================================
# 6. 경로 처리 (pathlib)
# ============================================
from pathlib import Path

path = Path('documents/file.txt')
print(path.exists())      # 존재 여부
print(path.parent)        # 디렉토리 부분
print(path.name)          # 파일명
print(path.suffix)        # 확장자

# 디렉토리 순회
for file in Path('.').glob('*.txt'):
    print(file)

print("파일 처리 예시 완료")`}
        />

        <InfoCard type="tip" title="파일 처리 팁">
          <ul>
            <li>
              <strong>with 문:</strong> 자동 닫기, 항상 사용 권장
            </li>
            <li>
              <strong>encoding='utf-8':</strong> 한글 깨짐 방지
            </li>
            <li>
              <strong>pathlib:</strong> 현대적 경로 처리
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="async">2️⃣ 비동기 프로그래밍</h2>
        <p>
          async/await 으로 동시성 프로그래밍을 합니다.
        </p>

        <CodeDemo
          title="비동기 프로그래밍"
          description="async, await, asyncio"
          defaultCode={`import asyncio

# ============================================
# 1. 기본 async/await
# ============================================
async def say_hello():
    print("Hello")
    await asyncio.sleep(1)  # 1 초 대기
    print("World")

# 실행
# asyncio.run(say_hello())

# ============================================
# 2. 여러 코루틴 동시 실행
# ============================================
async def task(name, delay):
    print(f"{name} 시작")
    await asyncio.sleep(delay)
    print(f"{name} 완료")
    return f"{name} 결과"

async def main():
    # 병렬 실행
    results = await asyncio.gather(
        task("A", 1),
        task("B", 1),
        task("C", 1)
    )
    print(results)  # ['A 결과', 'B 결과', 'C 결과']

# asyncio.run(main())

# ============================================
# 3. 비동기 HTTP 요청 (aiohttp)
# ============================================
# pip install aiohttp
"""
import aiohttp

async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

async def fetch_all():
    urls = [
        'https://api.example.com/data1',
        'https://api.example.com/data2'
    ]
    
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        return results

# asyncio.run(fetch_all())
"""

# ============================================
# 4. 타임아웃 처리
# ============================================
async def long_task():
    await asyncio.sleep(10)
    return "완료"

async def with_timeout():
    try:
        result = await asyncio.wait_for(long_task(), timeout=5.0)
        return result
    except asyncio.TimeoutError:
        print("타임아웃!")

# asyncio.run(with_timeout())

print("비동기 예시 완료")`}
        />

        <InfoCard type="tip" title="비동기 프로그래밍">
          <ul>
            <li>
              <strong>async def:</strong> 코루틴 정의
            </li>
            <li>
              <strong>await:</strong> 비동기 작업 대기
            </li>
            <li>
              <strong>asyncio.gather:</strong> 여러 코루틴 병렬 실행
            </li>
            <li>
              <strong>aiohttp:</strong> 비동기 HTTP 클라이언트
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="web-scraping">3️⃣ 웹 스크래핑</h2>
        <p>
          웹 페이지에서 데이터를 추출합니다.
        </p>

        <CodeDemo
          title="웹 스크래핑"
          description="requests, BeautifulSoup"
          defaultCode={`import requests
from bs4 import BeautifulSoup

# ============================================
# 1. 기본 HTTP 요청
# ============================================
response = requests.get('https://example.com')

print(response.status_code)  # 200
print(response.text)         # HTML 내용

# ============================================
# 2. 요청 헤더 설정
# ============================================
headers = {
    'User-Agent': 'Mozilla/5.0',
}

response = requests.get(
    'https://example.com',
    headers=headers,
    params={'q': 'search'},  # 쿼리 파라미터
    timeout=10
)

# ============================================
# 3. BeautifulSoup 파싱
# ============================================
html = """
<html>
  <body>
    <h1 class="title">페이지 제목</h1>
    <div class="content">
      <p>첫 번째 문단</p>
      <p>두 번째 문단</p>
    </div>
    <ul id="list">
      <li>아이템 1</li>
      <li>아이템 2</li>
    </ul>
  </body>
</html>
"""

soup = BeautifulSoup(html, 'html.parser')

# 태그 찾기
title = soup.find('h1')
print(title.text)  # 페이지 제목

# 클래스로 찾기
content = soup.find('div', class_='content')
paragraphs = content.find_all('p')

for p in paragraphs:
    print(p.text)

# CSS 선택자
items = soup.select('#list li')
for item in items:
    print(item.text)

# ============================================
# 4. 실제 스크래핑 예시
# ============================================
def scrape_books():
    url = 'https://books.toscrape.com/'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    books = []
    for book in soup.select('.product_pod'):
        title = book.h3.a['title']
        price = book.select_one('.price_color').text
        books.append({
            'title': title,
            'price': price
        })
    
    return books

# books = scrape_books()

# ============================================
# 5. 스크래핑 예의
# ============================================
# 1. robots.txt 확인
# 2. 이용약관 확인
# 3. 과도한 요청 금지 (delay 추가)
# 4. User-Agent 명시

import time

def polite_scrape(urls):
    for url in urls:
        response = requests.get(url)
        time.sleep(1)  # 1 초 대기

print("웹 스크래핑 예시 완료")`}
        />

        <InfoCard type="warning" title="스크래핑 주의사항">
          <ul>
            <li>
              <strong>robots.txt:</strong> 크롤링 허용 여부 확인
            </li>
            <li>
              <strong>이용약관:</strong> 법적 문제 확인
            </li>
            <li>
              <strong>rate limiting:</strong> 서버 부하 방지
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>파일 I/O:</strong> <code>open()</code>, <code>with</code> 문, JSON, CSV
          </li>
          <li>
            <strong>pathlib:</strong> 현대적 경로 처리
          </li>
          <li>
            <strong>async/await:</strong> 비동기 프로그래밍
          </li>
          <li>
            <strong>asyncio:</strong> 코루틴, gather
          </li>
          <li>
            <strong>requests:</strong> HTTP 요청
          </li>
          <li>
            <strong>BeautifulSoup:</strong> HTML 파싱
          </li>
        </ul>
      </section>
    </div>
  );
}