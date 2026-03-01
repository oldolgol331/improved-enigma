import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function TSDecorators() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>TypeScript 데코레이터 (Decorators)</h1>
        <p className="page-description">
          클래스와 멤버에 메타데이터를 추가하는 데코레이터에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>데코레이터 (Decorator)</strong> 는 클래스, 메서드, 속성, 파라미터에{' '}
          <strong>메타데이터</strong>를 추가하거나 동작을 수정하는 함수입니다. Angular, NestJS 등의
          프레임워크에서 널리 사용됩니다.
        </p>

        <InfoCard type="tip" title="데코레이터 사용 설정">
          <p>
            <code>tsconfig.json</code> 에서 데코레이터를 활성화해야 합니다:
          </p>
          <pre style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
            {`{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}`}
          </pre>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="class-decorator">1️⃣ 클래스 데코레이터</h2>
        <p>클래스 데코레이터는 클래스 생성자에 적용되며, 클래스를 수정하거나 대체할 수 있습니다.</p>

        <CodeDemo
          title="클래스 데코레이터"
          description="클래스에 메타데이터를 추가합니다."
          defaultCode={`// 클래스 데코레이터 기본
function Logger(constructor: Function) {
  console.log('Logging:', constructor.name);
}

@Logger
class Person {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

// 출력: Logging: Person

// 데코레이터 팩토리 (인자 있는 데코레이터)
function LogValue(value: string) {
  return function (constructor: Function) {
    console.log(\`LogValue: \${value}\`, constructor.name);
  };
}

@LogValue('Person Class')
class Employee {
  constructor(public name: string) {}
}

// 클래스 대체 데코레이터
function Serializable<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    toJSON() {
      return JSON.stringify(this);
    }
  };
}

@Serializable
class Product {
  constructor(public name: string, public price: number) {}
}

const product = new Product('Laptop', 999);
console.log('product.toJSON():', (product as any).toJSON());
// {"name":"Laptop","price":999}

console.log('Class decorators');`}
          hideConsole={true}
        />
      </section>

      <section className="content-section">
        <h2 id="property-decorator">2️⃣ 속성 데코레이터</h2>
        <p>속성 데코레이터는 클래스 속성에 적용되며, 속성을 감시하거나 메타데이터를 추가합니다.</p>

        <CodeDemo
          title="속성 데코레이터"
          description="클래스 속성에 메타데이터를 추가합니다."
          defaultCode={`// 속성 데코레이터
function ReadOnly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false,
    configurable: true
  });
}

// 속성 데코레이터 (Descriptor 사용)
function LogChange(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalGetter = descriptor.get;
  
  descriptor.get = function() {
    console.log(\`Getting \${propertyKey}\`);
    return originalGetter?.call(this);
  };
  
  descriptor.set = function(value: any) {
    console.log(\`Setting \${propertyKey} to \${value}\`);
    const originalSetter = descriptor.set;
    originalSetter?.call(this, value);
  };
}

class User {
  @ReadOnly
  id: number;
  
  @LogChange
  name: string;
  
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

const user = new User(1, 'Alice');
console.log('user.id:', user.id);
// user.id = 2; // 에러! ReadOnly

user.name = 'Bob'; // Setting name to Bob
console.log('user.name:', user.name); // Getting name

console.log('Property decorators');`}
          hideConsole={true}
        />
      </section>

      <section className="content-section">
        <h2 id="method-decorator">3️⃣ 메서드 데코레이터</h2>
        <p>메서드 데코레이터는 메서드 디스크립터에 적용되며, 메서드 동작을 수정할 수 있습니다.</p>

        <CodeDemo
          title="메서드 데코레이터"
          description="메서드 동작을 수정합니다."
          defaultCode={`// 메서드 데코레이터
function LogMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(\`Calling \${propertyKey} with:\`, args);
    const result = original.apply(this, args);
    console.log(\`Result:\`, result);
    return result;
  };
  
  return descriptor;
}

// 데코레이터 팩토리
function Timing() {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    
    descriptor.value = async function(...args: any[]) {
      const start = performance.now();
      const result = await original.apply(this, args);
      const end = performance.now();
      console.log(\`\${propertyKey} took \${(end - start).toFixed(2)}ms\`);
      return result;
    };
  };
}

class Calculator {
  @LogMethod
  add(a: number, b: number) {
    return a + b;
  }
  
  @Timing()
  async slowOperation() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return 'Done';
  }
}

const calc = new Calculator();
calc.add(2, 3);
// Calling add with: [2, 3]
// Result: 5

calc.slowOperation();
// slowOperation took 100.xx ms

console.log('Method decorators');`}
          hideConsole={true}
        />
      </section>

      <section className="content-section">
        <h2 id="parameter-decorator">4️⃣ 파라미터 데코레이터</h2>
        <p>파라미터 데코레이터는 메서드 파라미터에 적용되며, 주로 의존성 주입에 사용됩니다.</p>

        <CodeDemo
          title="파라미터 데코레이터"
          description="메서드 파라미터에 메타데이터를 추가합니다."
          defaultCode={`// 파라미터 데코레이터
function LogParameter(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  console.log(\`Parameter \${parameterIndex} of \${propertyKey}\`);
}

class Service {
  greet(@LogParameter name: string, @LogParameter age: number) {
    console.log(\`Hello, \${name} (\${age})\`);
  }
}

// 출력:
// Parameter 0 of greet
// Parameter 1 of greet

// 의존성 주입 데코레이터 (간단한 예시)
const container = new Map<string, any>();

function Inject(token: string) {
  return function(
    target: any,
    propertyKey: string,
    parameterIndex: number
  ) {
    const dependencies = Reflect.getMetadata('dependencies', target) || [];
    dependencies.push({ token, index: parameterIndex });
    Reflect.defineMetadata('dependencies', dependencies, target);
  };
}

class Database {
  query(sql: string) {
    return { result: 'data' };
  }
}

class UserService {
  constructor(@Inject('Database') private db: Database) {}
  
  getUser(id: number) {
    return this.db.query(\`SELECT * FROM users WHERE id = \${id}\`);
  }
}

// 실제 의존성 주입은 프레임워크 (NestJS 등) 에서 처리
console.log('Parameter decorators');`}
          hideConsole={true}
        />

        <InfoCard type="note" title="Reflect Metadata">
          <p>
            데코레이터는 <code>reflect-metadata</code> 라이브러리와 함께 사용하여 런타임에
            메타데이터를 저장하고 조회할 수 있습니다.
          </p>
          <pre style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
            {`npm install reflect-metadata
// tsconfig.json
"emitDecoratorMetadata": true`}
          </pre>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="real-world">5️⃣ 실전 예제</h2>
        <p>데코레이터를 활용한 실전 패턴들입니다.</p>

        <CodeDemo
          title="실전 데코레이터 패턴"
          description="실제 프레임워크에서 사용하는 패턴입니다."
          defaultCode={`// 1. 자동 바인딩 데코레이터
function AutoBind() {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.get = function() {
      return original.bind(this);
    };
  };
}

class Button {
  label: string = 'Click me';
  
  @AutoBind()
  handleClick() {
    console.log(\`\${this.label} clicked\`);
  }
}

const button = new Button();
const handler = button.handleClick;
handler(); // this 바인딩 유지됨

// 2. 검증 데코레이터
function Required(message?: string) {
  return function(target: any, propertyKey: string) {
    // 검증 로직은 런타임에 별도 실행
  };
}

function MinLength(min: number) {
  return function(target: any, propertyKey: string) {
    // 검증 로직
  };
}

class CreateUserDto {
  @Required('이름은 필수입니다')
  name: string;
  
  @MinLength(6)
  password: string;
}

// 3. 캐싱 데코레이터
function Cache(ttl: number = 1000) {
  const cache = new Map<string, { value: any; expiry: number }>();
  
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
      const key = \`\${propertyKey}:\${JSON.stringify(args)}\`;
      const cached = cache.get(key);
      
      if (cached && cached.expiry > Date.now()) {
        console.log('Cache hit!');
        return cached.value;
      }
      
      console.log('Cache miss, computing...');
      const value = original.apply(this, args);
      cache.set(key, { value, expiry: Date.now() + ttl });
      return value;
    };
  };
}

class DataService {
  @Cache(5000)
  fetchData(id: number) {
    console.log(\`Fetching data for \${id}\`);
    return { id, data: 'result' };
  }
}

const service = new DataService();
service.fetchData(1); // Cache miss
service.fetchData(1); // Cache hit

console.log('Real-world decorator patterns');`}
          hideConsole={true}
        />
      </section>

      <section className="content-section">
        <h2 id="frameworks">6️⃣ 프레임워크에서의 활용</h2>
        <p>데코레이터는 Angular, NestJS 등의 프레임워크에서 핵심적으로 사용됩니다.</p>

        <CodeDemo
          title="프레임워크 데코레이터"
          description="Angular, NestJS 스타일의 데코레이터입니다."
          defaultCode={`// NestJS 스타일 컨트롤러 데코레이터 (개념)

// @Controller 데코레이터
function Controller(path?: string) {
  return function(target: Function) {
    Reflect.defineMetadata('path', path, target);
  };
}

// @Get 데코레이터
function Get(path?: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    Reflect.defineMetadata('method', 'GET', descriptor.value);
    Reflect.defineMetadata('path', path, descriptor.value);
  };
}

// @Post 데코레이터
function Post(path?: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    Reflect.defineMetadata('method', 'POST', descriptor.value);
    Reflect.defineMetadata('path', path, descriptor.value);
  };
}

// @Body 데코레이터
function Body(param?: string) {
  return function(
    target: any,
    propertyKey: string,
    parameterIndex: number
  ) {
    Reflect.defineMetadata(\`param:\${parameterIndex}\`, {
      type: 'body',
      param
    }, target, propertyKey);
  };
}

// 사용 예시 (NestJS 스타일)
@Controller('users')
class UserController {
  @Get()
  findAll() {
    return [{ id: 1, name: 'Alice' }];
  }
  
  @Get(':id')
  findOne(@Body('id') id: number) {
    return { id, name: 'Alice' };
  }
  
  @Post()
  create(@Body() body: { name: string }) {
    return { id: Date.now(), ...body };
  }
}

// Angular 스타일 컴포넌트 데코레이터 (개념)
function Component(config: {
  selector: string;
  template: string;
  styles?: string[];
}) {
  return function(target: Function) {
    Reflect.defineMetadata('component', config, target);
  };
}

@Component({
  selector: 'app-root',
  template: '<h1>Hello, Angular!</h1>',
  styles: ['h1 { color: blue; }']
})
class AppComponent {}

console.log('Framework decorator patterns');`}
          hideConsole={true}
        />

        <InfoCard type="tip" title="데코레이터 사용처">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>Angular</strong>: @Component, @Injectable, @Input, @Output
            </li>
            <li>
              <strong>NestJS</strong>: @Controller, @Get, @Post, @Injectable
            </li>
            <li>
              <strong>TypeORM</strong>: @Entity, @Column, @OneToMany
            </li>
            <li>
              <strong>class-validator</strong>: @IsString, @IsEmail, @MinLength
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📋 요약</h2>
        <div className="summary-box">
          <ul>
            <li>
              <strong>클래스 데코레이터</strong>: 클래스 생성자에 적용, 클래스 수정/대체
            </li>
            <li>
              <strong>속성 데코레이터</strong>: 클래스 속성에 적용, 메타데이터 추가
            </li>
            <li>
              <strong>메서드 데코레이터</strong>: 메서드 디스크립터 수정, 동작 변경
            </li>
            <li>
              <strong>파라미터 데코레이터</strong>: 의존성 주입에 사용
            </li>
            <li>
              <strong>데코레이터 팩토리</strong>: 인자를 받는 데코레이터
            </li>
            <li>
              <strong>실전 패턴</strong>: AutoBind, 검증, 캐싱, 로깅
            </li>
            <li>
              <strong>프레임워크</strong>: Angular, NestJS, TypeORM 등에서 활용
            </li>
            <li>
              tsconfig.json: <code>experimentalDecorators: true</code> 필요
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
