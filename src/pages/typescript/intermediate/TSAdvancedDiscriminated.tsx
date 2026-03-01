import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TSAdvancedDiscriminated() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>TypeScript Advanced Types</h1>
        <p className="page-description">
          Discriminated Unions, Type Predicates, Declaration Files 등 고급 TypeScript 패턴에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          TypeScript 의 고급 타입 기능을 마스터하면 더 안전하고 표현력 있는 코드를 작성할 수 있습니다.
        </p>

        <InfoCard type="tip" title="핵심 개념">
          <ul>
            <li>
              <strong>Discriminated Unions:</strong> 타입 가드와 함께 사용하는 태그된 유니온
            </li>
            <li>
              <strong>Type Predicates:</strong> 커스텀 타입 가드 함수
            </li>
            <li>
              <strong>Declaration Files:</strong> 외부 라이브러리 타입 정의
            </li>
            <li>
              <strong>Mapped Types:</strong> 타입을 순회하며 변환
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="discriminated-unions">1️⃣ Discriminated Unions</h2>
        <p>
          공통 discriminant 필드를 가진 유니온 타입으로, 타입 안전성을 높입니다.
        </p>

        <CodeDemo
          title="Discriminated Unions 활용"
          description="태그된 유니온과 exhaustiveness checking"
          defaultCode={`// 1. 기본 Discriminated Union
interface Circle {
  kind: "circle";  // discriminant
  radius: number;
}

interface Square {
  kind: "square";
  side: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Square | Rectangle;

// 2. 타입 가드와 함께 사용
function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default:
      // 모든 케이스가 처리되면 여기에 도달하지 않음
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

const circle: Shape = { kind: "circle", radius: 5 };
console.log("원 넓이:", getArea(circle));  // 78.54

// 3. API 응답 상태 표현
type APIResponse<T> =
  | { status: "idle" }
  | { status: "loading"; data?: undefined }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

function handleResponse(response: APIResponse<string>): void {
  switch (response.status) {
    case "idle":
      console.log("대기 중");
      break;
    case "loading":
      console.log("로딩 중");
      break;
    case "success":
      console.log("데이터:", response.data);
      break;
    case "error":
      console.error("에러:", response.error.message);
      break;
    default:
      const _exhaustive: never = response;
      return _exhaustive;
  }
}

// 4. 액션 패턴 (Redux 스타일)
type Action =
  | { type: "INCREMENT"; amount: number }
  | { type: "DECREMENT"; amount: number }
  | { type: "RESET" };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "INCREMENT":
      return state + action.amount;
    case "DECREMENT":
      return state - action.amount;
    case "RESET":
      return 0;
    default:
      const _exhaustive: never = action;
      return _exhaustive;
  }
}

// 5. 실제 활용 - 결제 수단
type PaymentMethod =
  | { type: "credit"; cardNumber: string; cvv: string }
  | { type: "paypal"; email: string }
  | { type: "bank"; accountNumber: string };

function processPayment(method: PaymentMethod): void {
  switch (method.type) {
    case "credit":
      console.log("신용카드:", method.cardNumber);
      break;
    case "paypal":
      console.log("PayPal:", method.email);
      break;
    case "bank":
      console.log("은행:", method.accountNumber);
      break;
    default:
      const _exhaustive: never = method;
  }
}

console.log("Discriminated Unions 예시 완료");`}
        />

        <InfoCard type="tip" title="Exhaustiveness Checking">
          <p>
            <code>never</code> 타입을 사용해 모든 케이스가 처리되었는지 검증합니다.
            새로운 케이스를 추가하면 컴파일 에러가 발생해 실수를 방지합니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="type-predicates">2️⃣ Type Predicates</h2>
        <p>
          타입 프레디케이트는 커스텀 타입 가드 함수를 만듭니다.
        </p>

        <CodeDemo
          title="Type Predicates 활용"
          description="커스텀 타입 가드"
          defaultCode={`// 1. 기본 Type Predicate
interface Cat {
  type: "cat";
  meow(): void;
}

interface Dog {
  type: "dog";
  bark(): void;
}

type Animal = Cat | Dog;

// 타입 가드 함수
function isCat(animal: Animal): animal is Cat {
  return animal.type === "cat";
}

// 사용 예시
const animals: Animal[] = [
  { type: "cat", meow: () => console.log("Meow!") },
  { type: "dog", bark: () => console.log("Woof!") },
];

animals.forEach((animal) => {
  if (isCat(animal)) {
    // animal 은 Cat 타입
    animal.meow();
  } else {
    // animal 은 Dog 타입
    animal.bark();
  }
});

// 2. 값 검증 가드
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());  // OK
  }
}

// 3. 배열 필터링
function getStrings(values: unknown[]): string[] {
  return values.filter(isString);
}

const mixed = [1, "hello", true, "world", null];
const strings = getStrings(mixed);  // string[]
console.log("문자열:", strings);  // ["hello", "world"]

// 4. 속성 검증
function hasProperty<T, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return key in obj;
}

interface User {
  id: number;
  name?: string;
}

function printUserName(user: User) {
  if (hasProperty(user, "name") && user.name) {
    console.log(user.name);
  }
}

// 5. API 응답 검증
interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  error: string;
}

type Response<T> = SuccessResponse<T> | ErrorResponse;

function isSuccessResponse<T>(
  response: Response<T>
): response is SuccessResponse<T> {
  return response.success === true;
}

function handleResponse(response: Response<string>) {
  if (isSuccessResponse(response)) {
    console.log("데이터:", response.data);
  } else {
    console.error("에러:", response.error);
  }
}

// 6. null/undefined 가드
function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

const values: (number | null | undefined)[] = [1, null, 3, undefined, 5];
const validNumbers = values.filter(isDefined);  // number[]
console.log("유효한 숫자:", validNumbers);  // [1, 3, 5]

console.log("Type Predicates 예시 완료");`}
        />

        <InfoCard type="tip" title="Type Predicate 문법">
          <p>
            <code>parameterName is Type</code> 형태의 반환 타입은
            조건이 true 일 때 매개변수가 해당 타입임을 TypeScript 에게 알립니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="mapped-types">3️⃣ Mapped Types</h2>
        <p>
          기존 타입을 순회하며 새로운 타입을 만듭니다.
        </p>

        <CodeDemo
          title="Mapped Types 활용"
          description="타입 변환과 유틸리티"
          defaultCode={`// 1. 기본 Mapped Type
interface User {
  id: number;
  name: string;
  email: string;
}

// 모든 속성을 optional 로
type PartialUser = {
  [K in keyof User]?: User[K];
};
// { id?: number; name?: string; email?: string }

// 모든 속성을 readonly 로
type ReadonlyUser = {
  [K in keyof User]: readonly User[K];
};

// 2. 유틸리티 타입 구현
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};

// 3. Pick 과 Omit 구현
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

// 사용 예시
type UserPreview = MyPick<User, "id" | "name">;
type UserNoId = MyOmit<User, "id">;

// 4. 키 변환 (TypeScript 4.1+)
type KeysToUppercase<T> = {
  [K in keyof T as Uppercase<K & string>]: T[K];
};

type UpperUser = KeysToUppercase<User>;
// { ID: number; NAME: string; EMAIL: string }

// 5. 값 변환
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
// { id: number | null; name: string | null; email: string | null }

// 6. 실제 활용 - API 응답 타입
type ApiResponse<T> = {
  data: T;
  status: number;
  timestamp: string;
};

type ApiUserResponse = ApiResponse<User>;

// 7. 실제 활용 - 이벤트 핸들러
type EventHandler<T> = {
  [K in keyof T as K & string]: (value: T[K]) => void;
};

interface FormState {
  name: string;
  email: string;
  age: number;
}

type FormHandlers = EventHandler<FormState>;

console.log("Mapped Types 예시 완료");`}
        />

        <InfoCard type="tip" title="Mapped Types 활용">
          <ul>
            <li>
              <strong>as 절:</strong> 키 이름 변환 (4.1+)
            </li>
            <li>
              <strong>-?:</strong> optional 제거
            </li>
            <li>
              <strong>readonly:</strong> 읽기 전용 추가
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="conditional-types">4️⃣ Conditional Types</h2>
        <p>
          타입 레벨에서 조건부 로직을 수행합니다.
        </p>

        <CodeDemo
          title="Conditional Types 활용"
          description="타입 레벨 조건문"
          defaultCode={`// 1. 기본 Conditional Type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
type C = IsString<string | number>;  // true | false

// 2. infer 키워드 (타입 추론)
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type MyFunc = () => string;
type MyReturn = ReturnType<MyFunc>;  // string

// 3. 함수 매개변수 추출
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

type MyFunc2 = (name: string, age: number) => void;
type MyParams = Parameters<MyFunc2>;  // [name: string, age: number]

// 4. 배열 요소 타입 추출
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type MyArray = string[];
type Element = ArrayElement<MyArray>;  // string

// 5. Promise 해제
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type MyPromise = Promise<string>;
type Unwrapped = UnwrapPromise<MyPromise>;  // string

// 6. 실제 활용 - API 응답 타입
type ApiResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

type ExtractData<T> = T extends ApiResult<infer U> ? U : never;

type UserData = ExtractData<ApiResult<{ id: number; name: string }>>;
// { id: number; name: string }

// 7. 중첩 Conditional Types
type Flatten<T> = T extends Array<infer U> ? U : T;

type F1 = Flatten<string[]>;  // string
type F2 = Flatten<string>;    // string

// 8. Distributive Conditional Types
type ToArray<T> = T extends any ? T[] : never;

type D1 = ToArray<string | number>;  // string[] | number[]
// 유니온에 분배되어 적용됨

console.log("Conditional Types 예시 완료");`}
        />

        <InfoCard type="tip" title="infer 키워드">
          <p>
            <code>infer</code> 는 조건부 타입 내에서 타입을 추론할 때 사용합니다.
            <br />
            주로 <code>ReturnType</code>, <code>Parameters</code> 등 유틸리티 타입 구현에 활용됩니다.
          </p>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="declaration-files">5️⃣ Declaration Files</h2>
        <p>
          외부 라이브러리의 타입을 정의합니다.
        </p>

        <CodeDemo
          title="Declaration Files 활용"
          description=".d.ts 파일 작성"
          defaultCode={`// ============================================
// 1. 전역 변수 선언
// ============================================
// types/global.d.ts
/*
declare const APP_VERSION: string;
declare const API_BASE_URL: string;

interface Window {
  myCustomProperty: string;
  analytics: {
    track: (event: string, data?: object) => void;
  };
}
*/

// ============================================
// 2. 모듈 선언
// ============================================
// types/my-library.d.ts
/*
declare module 'my-library' {
  export interface MyLibraryOptions {
    debug?: boolean;
    timeout?: number;
  }
  
  export function create(options?: MyLibraryOptions): void;
  export function destroy(): void;
  
  export const VERSION: string;
  
  export default MyLibrary;
}
*/

// ============================================
// 3. 이미지/자산 선언
// ============================================
// types/assets.d.ts
/*
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
*/

// ============================================
// 4. 환경 변수 선언
// ============================================
// types/env.d.ts
/*
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
*/

// ============================================
// 5. 기존 라이브러리 확장
// ============================================
// types/express-extension.d.ts
/*
import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        role: string;
      };
    }
  }
}
*/

// ============================================
// 6. 사용 예시
// ============================================
// 전역 변수 사용
// console.log(APP_VERSION);

// 커스텀 라이브러리 사용
// import myLib from 'my-library';
// myLib.create({ debug: true });

// 이미지 import
// import logo from './logo.png';

console.log("Declaration Files 예시 완료");`}
        />

        <InfoCard type="warning" title="Declaration Files 주의">
          <ul>
            <li>
              <strong>확장자:</strong> <code>.d.ts</code> 사용
            </li>
            <li>
              <strong>구현 없음:</strong> 타입 선언만 (런타임 코드 없음)
            </li>
            <li>
              <strong>export {}:</strong> 모듈로 만들기 위해 필요
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="template-literal">6️⃣ Template Literal Types</h2>
        <p>
          타입 레벨에서 문자열 조작을 수행합니다.
        </p>

        <CodeDemo
          title="Template Literal Types"
          description="문자열 타입 조작"
          defaultCode={`// 1. 기본 Template Literal Type
type Greeting = "Hello, " + string;

const g1 = "Hello, World";
const g2 = "Hi, World";

// 2. 유니온과 조합
type Direction = "up" | "down" | "left" | "right";

type EventHandlers = {
  [K: string]: () => void;
};

// 3. 실제 활용 - CSS 속성
type CSSProperties = {
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
};

const css = {
  margin: "10px",
  marginTop: "20px",
  marginRight: "15px",
};

// 4. 실제 활용 - API 엔드포인트
type HttpMethod = "get" | "post" | "put" | "delete";
type Resource = "users" | "posts" | "comments";

// 5. 문자열 조작 유틸리티
type TrimLeft = string;
type TrimRight = string;
type Trim = string;

// 6. 실제 활용 - 이벤트 시스템
type EventType = "click" | "focus" | "blur";
type EventTarget = "button" | "input" | "form";

type EventName = EventType + ":" + EventTarget;

type EventMap = {
  [K in EventName]?: (event: Event) => void;
};

console.log("Template Literal Types 예시 완료");`}
        />

        <InfoCard type="tip" title="Template Literal Types 활용">
          <ul>
            <li>
              <strong>API 엔드포인트:</strong> 타입 안전성 확보
            </li>
            <li>
              <strong>CSS-in-JS:</strong> 속성명 자동 완성
            </li>
            <li>
              <strong>이벤트 시스템:</strong> 일관된 네이밍
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Discriminated Unions:</strong> 태그된 유니온 + exhaustiveness checking
          </li>
          <li>
            <strong>Type Predicates:</strong> <code>param is Type</code> 커스텀 가드
          </li>
          <li>
            <strong>Mapped Types:</strong> <code>[K in keyof T]</code> 타입 순회
          </li>
          <li>
            <strong>Conditional Types:</strong> <code>T extends U ? X : Y</code>
          </li>
          <li>
            <strong>infer:</strong> 타입 추론 (ReturnType, Parameters)
          </li>
          <li>
            <strong>Declaration Files:</strong> <code>.d.ts</code> 외부 라이브러리 타입
          </li>
          <li>
            <strong>Template Literal:</strong> 타입 레벨 문자열 조작
          </li>
        </ul>
      </section>
    </div>
  );
}