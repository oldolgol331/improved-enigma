import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TailwindCSS() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>TailwindCSS</h1>
        <p className="page-description">
          유틸리티 퍼스트 CSS 프레임워크 TailwindCSS 에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>TailwindCSS</strong> 는 미리 정의된 유틸리티 클래스를 조합해 스타일을 적용하는
          유틸리티 퍼스트 CSS 프레임워크입니다.
        </p>

        <InfoCard type="tip" title="TailwindCSS 특징">
          <ul>
            <li>
              <strong>유틸리티 퍼스트:</strong> 작은 클래스 조합
            </li>
            <li>
              <strong>인라인 스타일 대안:</strong> HTML 에서 직접 스타일링
            </li>
            <li>
              <strong>커스터마이징:</strong> <code>tailwind.config.js</code>
            </li>
            <li>
              <strong>반응형:</strong> <code>sm:</code>, <code>md:</code>, <code>lg:</code>
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="installation">1️⃣ 설치와 설정</h2>
        <p>
          TailwindCSS 를 설치하고 설정합니다.
        </p>

        <CodeDemo
          title="TailwindCSS 설치"
          description="npm 설정과 기본 구성"
          defaultCode={`// 1. 설치
// npm install -D tailwindcss postcss autoprefixer
// npx tailwindcss init -p

// 2. tailwind.config.js
/*
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
*/

// 3. CSS 에 지시어 추가
/*
@tailwind base;
@tailwind components;
@tailwind utilities;
*/

// 4. 기본 스타일 (base)
/*
body {
  @apply bg-white text-gray-900;
}
*/

// 5. 커스텀 컴포넌트 (components)
/*
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded;
}
*/

// 6. 사용 예시
// <button className="btn-primary">클릭</button>
// <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
//   클릭
// </button>

console.log('TailwindCSS 설치 완료');`}
        />

        <InfoCard type="tip" title="CDN 사용 (개발용)">
          <p>
            <code>&lt;script src="https://cdn.tailwindcss.com"&gt;&lt;/script&gt;</code>
            <br />
            프로덕션에서는 빌드 도구 사용을 권장합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="spacing">2️⃣ 간격 (Spacing)</h2>
        <p>
          margin 과 padding 을 적용합니다.
        </p>

        <CodeDemo
          title="간격 유틸리티"
          description="margin, padding"
          defaultCode={`<!-- 1. Margin (외부 여백) -->
<div className="m-4">margin: 1rem (16px)</div>
<div className="m-0">margin: 0</div>
<div className="m-1">margin: 0.25rem (4px)</div>
<div className="m-2">margin: 0.5rem (8px)</div>
<div className="m-8">margin: 2rem (32px)</div>
<div className="m-auto">margin: auto (중앙)</div>

<!-- 방향별 margin -->
<div className="mt-4">margin-top</div>
<div className="mr-4">margin-right</div>
<div className="mb-4">margin-bottom</div>
<div className="ml-4">margin-left</div>
<div className="mx-4">margin-left + margin-right</div>
<div className="my-4">margin-top + margin-bottom</div>

<!-- 2. Padding (내부 여백) -->
<div className="p-4">padding: 1rem</div>
<div className="p-0">padding: 0</div>
<div className="px-4 py-2">padding-x + padding-y</div>
<div className="pt-4">padding-top</div>
<div className="pr-4">padding-right</div>
<div className="pb-4">padding-bottom</div>
<div className="pl-4">padding-left</div>

<!-- 3. Gap (그리드/플렉스 간격) -->
<div className="flex gap-4">
  <div>아이템 1</div>
  <div>아이템 2</div>
</div>

<div className="grid gap-4 grid-cols-3">
  <div>아이템 1</div>
  <div>아이템 2</div>
  <div>아이템 3</div>
</div>

<!-- 4. Space (자식 요소 간격) -->
<div className="space-x-4">
  <span>아이템 1</span>
  <span>아이템 2</span>
  <span>아이템 3</span>
</div>

<div className="space-y-4">
  <div>아이템 1</div>
  <div>아이템 2</div>
  <div>아이템 3</div>
</div>`}
        />

        <InfoCard type="tip" title="Spacing 스케일">
          <p>
            <code>0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48</code>...
            <br />
            숫자에 0.25rem (4px) 을 곱한 값입니다. (<code>m-4</code> = 16px)
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="typography">3️⃣ 타이포그래피</h2>
        <p>
          텍스트 스타일을 적용합니다.
        </p>

        <CodeDemo
          title="타이포그래피"
          description="font, text, color"
          defaultCode={`<!-- 1. Font Size -->
<p className="text-xs">12px</p>
<p className="text-sm">14px</p>
<p className="text-base">16px</p>
<p className="text-lg">18px</p>
<p className="text-xl">20px</p>
<p className="text-2xl">24px</p>
<p className="text-3xl">30px</p>
<p className="text-4xl">36px</p>
<p className="text-5xl">48px</p>

<!-- 2. Font Weight -->
<p className="font-thin">100</p>
<p className="font-extralight">200</p>
<p className="font-light">300</p>
<p className="font-normal">400</p>
<p className="font-medium">500</p>
<p className="font-semibold">600</p>
<p className="font-bold">700</p>
<p className="font-extrabold">800</p>

<!-- 3. Text Alignment -->
<p className="text-left">왼쪽 정렬</p>
<p className="text-center">중앙 정렬</p>
<p className="text-right">오른쪽 정렬</p>
<p className="text-justify">양쪽 정렬</p>

<!-- 4. Text Color -->
<p className="text-black">검정</p>
<p className="text-white">흰색</p>
<p className="text-gray-500">회색</p>
<p className="text-red-500">빨강</p>
<p className="text-blue-500">파랑</p>
<p className="text-green-500">초록</p>
<p className="text-yellow-500">노랑</p>

<!-- 5. Text Decoration -->
<p className="underline">밑줄</p>
<p className="line-through">취소선</p>
<p className="no-underline">밑줄 없음</p>

<!-- 6. Text Transform -->
<p className="uppercase">대문자</p>
<p className="lowercase">소문자</p>
<p className="capitalize">첫 문자 대문자</p>

<!-- 7. Text Overflow -->
<p className="truncate">
  긴 텍스트는 잘리고 말줄임표 표시
</p>

<!-- 8. Letter Spacing -->
<p className="tracking-tight">좁은 자간</p>
<p className="tracking-normal">기본 자간</p>
<p className="tracking-wide">넓은 자간</p>

<!-- 9. Line Height -->
<p className="leading-none">1</p>
<p className="leading-tight">1.25</p>
<p className="leading-normal">1.5</p>
<p className="leading-loose">2</p>`}
        />

        <InfoCard type="tip" title="Color 스케일">
          <p>
            <code>50, 100, 200, 300, 400, 500, 600, 700, 800, 900</code>
            <br />
            숫자가 작을수록 밝고, 클수록 어둡습니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="layout">4️⃣ 레이아웃</h2>
        <p>
          Flexbox 와 Grid 를 적용합니다.
        </p>

        <CodeDemo
          title="레이아웃 유틸리티"
          description="flex, grid, display"
          defaultCode={`<!-- 1. Display -->
<div className="hidden">숨김</div>
<div className="block">블록</div>
<div className="inline">인라인</div>
<div className="inline-block">인라인 블록</div>
<div className="flex">플렉스</div>
<div className="inline-flex">인라인 플렉스</div>
<div className="grid">그리드</div>

<!-- 2. Flexbox -->
<div className="flex">
  <div>아이템</div>
</div>

<!-- Flex Direction -->
<div className="flex flex-row">행 (기본)</div>
<div className="flex flex-col">열</div>
<div className="flex flex-row-reverse">행 (반대)</div>
<div className="flex flex-col-reverse">열 (반대)</div>

<!-- Justify Content -->
<div className="flex justify-start">시작</div>
<div className="flex justify-end">끝</div>
<div className="flex justify-center">중앙</div>
<div className="flex justify-between">양쪽</div>
<div className="flex justify-around">주변</div>

<!-- Align Items -->
<div className="flex items-stretch">늘리기 (기본)</div>
<div className="flex items-start">시작</div>
<div className="flex items-end">끝</div>
<div className="flex items-center">중앙</div>
<div className="flex items-baseline">기준선</div>

<!-- Flex Wrap -->
<div className="flex flex-nowrap">한 줄</div>
<div className="flex flex-wrap">여러 줄</div>

<!-- Flex Grow/Shrink -->
<div className="flex">
  <div className="flex-1">1 배 성장</div>
  <div className="flex-2">2 배 성장</div>
  <div className="flex-none">성장 안 함</div>
</div>

<!-- Gap -->
<div className="flex gap-4">
  <div>아이템</div>
</div>

<!-- 3. Grid -->
<div className="grid grid-cols-3 gap-4">
  <div>아이템</div>
</div>

<!-- Grid Columns -->
<div className="grid grid-cols-1">1 열</div>
<div className="grid grid-cols-2">2 열</div>
<div className="grid grid-cols-3">3 열</div>
<div className="grid grid-cols-4">4 열</div>
<div className="grid grid-cols-12">12 열</div>

<!-- 반응형 그리드 -->
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>아이템</div>
</div>

<!-- Grid Rows -->
<div className="grid grid-rows-3">3 행</div>

<!-- Col/Row Span -->
<div className="grid grid-cols-3 gap-4">
  <div className="col-span-2">2 열 차지</div>
  <div>아이템</div>
  <div className="row-span-2">2 행 차지</div>
</div>`}
        />

        <InfoCard type="tip" title="반응형 접두사">
          <ul>
            <li>
              <code>sm:</code>: 640px 이상
            </li>
            <li>
              <code>md:</code>: 768px 이상
            </li>
            <li>
              <code>lg:</code>: 1024px 이상
            </li>
            <li>
              <code>xl:</code>: 1280px 이상
            </li>
            <li>
              <code>2xl:</code>: 1536px 이상
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="styling">5️⃣ 스타일링</h2>
        <p>
          배경, 테두리, 그림자 등을 적용합니다.
        </p>

        <CodeDemo
          title="스타일링 유틸리티"
          description="background, border, shadow"
          defaultCode={`<!-- 1. Background Color -->
<div className="bg-black">검정</div>
<div className="bg-white">흰색</div>
<div className="bg-gray-100">밝은 회색</div>
<div className="bg-blue-500">파랑</div>
<div className="bg-red-500">빨강</div>

<!-- 투명도 -->
<div className="bg-blue-500 bg-opacity-50">50% 투명</div>

<!-- 2. Border -->
<div className="border">1px solid #e5e7eb</div>
<div className="border-0">테두리 없음</div>
<div className="border-2">2px</div>
<div className="border-4">4px</div>
<div className="border-8">8px</div>

<!-- 방향별 -->
<div className="border-t">위쪽 테두리</div>
<div className="border-r">오른쪽 테두리</div>
<div className="border-b">아래쪽 테두리</div>
<div className="border-l">왼쪽 테두리</div>

<!-- 색상 -->
<div className="border border-blue-500">파랑 테두리</div>
<div className="border border-red-500">빨강 테두리</div>

<!-- 스타일 -->
<div className="border border-solid">실선 (기본)</div>
<div className="border border-dashed">점선</div>
<div className="border border-dotted">점</div>

<!-- 3. Border Radius -->
<div className="rounded-none">각진</div>
<div className="rounded-sm">작은 둥글림</div>
<div className="rounded">기본 둥글림</div>
<div className="rounded-md">중간 둥글림</div>
<div className="rounded-lg">큰 둥글림</div>
<div className="rounded-xl">매우 큰 둥글림</div>
<div className="rounded-2xl">더 큰 둥글림</div>
<div className="rounded-full">원형</div>

<!-- 4. Box Shadow -->
<div className="shadow-sm">작은 그림자</div>
<div className="shadow">기본 그림자</div>
<div className="shadow-md">중간 그림자</div>
<div className="shadow-lg">큰 그림자</div>
<div className="shadow-xl">매우 큰 그림자</div>
<div className="shadow-2xl">더 큰 그림자</div>
<div className="shadow-inner">내부 그림자</div>
<div className="shadow-none">그림자 없음</div>

<!-- 5. Width & Height -->
<div className="w-0">0px</div>
<div className="w-1">4px</div>
<div className="w-2">8px</div>
<div className="w-4">16px</div>
<div className="w-8">32px</div>
<div className="w-16">64px</div>
<div className="w-auto">자동</div>
<div className="w-full">100%</div>
<div className="w-screen">뷰포트 너비</div>
<div className="w-1/2">50%</div>
<div className="w-1/3">33.33%</div>
<div className="w-1/4">25%</div>

<!-- 6. Opacity -->
<div className="opacity-100">100%</div>
<div className="opacity-75">75%</div>
<div className="opacity-50">50%</div>
<div className="opacity-25">25%</div>
<div className="opacity-0">0% (투명)</div>`}
        />

        <InfoCard type="tip" title="Hover/Focus 상태">
          <ul>
            <li>
              <code>hover:bg-blue-600</code>: 마우스 오버 시
            </li>
            <li>
              <code>focus:ring-2</code>: 포커스 시
            </li>
            <li>
              <code>active:scale-95</code>: 클릭 시
            </li>
            <li>
              <code>disabled:opacity-50</code>: 비활성화 시
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="example">6️⃣ 실전 예시</h2>
        <p>
          실제 컴포넌트를 만들어봅니다.
        </p>

        <CodeDemo
          title="실전 컴포넌트"
          description="버튼, 카드, 네비게이션"
          defaultCode={`<!-- 1. 기본 버튼 -->
<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
  클릭
</button>

<!-- 2. 아웃라인 버튼 -->
<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  클릭
</button>

<!-- 3. 카드 컴포넌트 -->
<div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
  <img className="w-full h-48 object-cover" src="image.jpg" alt="이미지" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">카드 제목</div>
    <p className="text-gray-700 text-base">
      카드 내용입니다. 여러 줄의 텍스트를 넣을 수 있습니다.
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      #태그1
    </span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      #태그2
    </span>
  </div>
</div>

<!-- 4. 네비게이션 바 -->
<nav className="bg-gray-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center">
        <div className="text-white font-bold text-xl">로고</div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">홈</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">소개</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">연락처</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>

<!-- 5. 폼 컴포넌트 -->
<form className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
      이메일
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="email"
      type="email"
      placeholder="이메일 입력"
    />
  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
      비밀번호
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      id="password"
      type="password"
      placeholder="******************"
    />
  </div>
  <div className="flex items-center justify-between">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="button"
    >
      로그인
    </button>
    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
      비밀번호 찾기
    </a>
  </div>
</form>

<!-- 6. 반응형 그리드 -->
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-bold mb-2">카드 1</h3>
    <p className="text-gray-600">내용</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-bold mb-2">카드 2</h3>
    <p className="text-gray-600">내용</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-bold mb-2">카드 3</h3>
    <p className="text-gray-600">내용</p>
  </div>
</div>`}
        />

        <InfoCard type="tip" title="TailwindCSS 팁">
          <ul>
            <li>
              <strong>컴포넌트 추출:</strong> 반복되는 클래스는 @apply 로 추출
            </li>
            <li>
              <strong>커스터마이징:</strong> tailwind.config.js 에서 테마 확장
            </li>
            <li>
              <strong>플러그인:</strong> @tailwindcss/forms, typography 등
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>설치:</strong> npm install, tailwind.config.js 설정
          </li>
          <li>
            <strong>Spacing:</strong> <code>m-4</code>, <code>p-4</code>, <code>gap-4</code>
          </li>
          <li>
            <strong>Typography:</strong> <code>text-lg</code>, <code>font-bold</code>, <code>text-blue-500</code>
          </li>
          <li>
            <strong>Layout:</strong> <code>flex</code>, <code>grid</code>, <code>grid-cols-3</code>
          </li>
          <li>
            <strong>Styling:</strong> <code>bg-blue-500</code>, <code>rounded</code>, <code>shadow</code>
          </li>
          <li>
            <strong>반응형:</strong> <code>sm:</code>, <code>md:</code>, <code>lg:</code>
          </li>
          <li>
            <strong>상태:</strong> <code>hover:</code>, <code>focus:</code>, <code>active:</code>
          </li>
        </ul>
      </section>
    </div>
  );
}