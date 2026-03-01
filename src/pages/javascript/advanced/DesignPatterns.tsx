import CodeDemo from '@components/CodeDemo';
import InfoCard from '@components/InfoCard';
import TableOfContents from '@components/TableOfContents';
import './ContentPage.css';

export default function JSDesignPatterns() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>JavaScript Design Patterns</h1>
        <p className="page-description">
          JavaScript 에서 자주 사용되는 디자인 패턴과 설계 원칙에 대해 학습합니다.
        </p>
      </div>

      <TableOfContents />

      <section className="content-section">
        <h2 id="overview">📖 개요</h2>
        <p>
          <strong>디자인 패턴</strong> 은 반복적으로 발생하는 문제에 대한 검증된 해결책입니다.
          코드의 재사용성, 유지보수성, 확장성을 높여줍니다.
        </p>

        <InfoCard type="tip" title="패턴 분류">
          <ul>
            <li>
              <strong>생성 패턴:</strong> 객체 생성 (Singleton, Factory)
            </li>
            <li>
              <strong>구조 패턴:</strong> 객체 조합 (Adapter, Decorator)
            </li>
            <li>
              <strong>행동 패턴:</strong> 객체 간 상호작용 (Observer, Strategy)
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="singleton">1️⃣ Singleton 패턴</h2>
        <p>
          인스턴스를 하나만 생성하고 전역에서 공유합니다.
        </p>

        <CodeDemo
          title="Singleton 패턴 구현"
          description="단일 인스턴스 보장"
          defaultCode={`// 1. 기본 Singleton (클래스)
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = 'connected';
    Database.instance = this;
  }
  
  query(sql) {
    console.log('실행:', sql);
    return { result: 'data' };
  }
}

// 사용 예시
const db1 = new Database();
const db2 = new Database();

console.log('db1 === db2:', db1 === db2);  // true
console.log('connection:', db1.connection);  // 'connected'

// 2. Module 패턴 (IIFE)
const Logger = (function() {
  let instance;
  
  function init() {
    const logs = [];
    
    return {
      log: (msg) => {
        logs.push(msg);
        console.log(msg);
      },
      getLogs: () => logs,
      clear: () => {
        logs.length = 0;
      }
    };
  }
  
  return {
    getInstance: () => {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();

// 사용 예시
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

logger1.log('첫 번째 메시지');
logger2.log('두 번째 메시지');

console.log('로그:', logger1.getLogs());
console.log('동일 인스턴스:', logger1 === logger2);

// 3. 현대적 JavaScript (ES6 Module)
// database.js
/*
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.pool = [];
    Database.instance = this;
  }
  
  connect() {
    console.log('DB 연결');
  }
}

export default new Database();  // 단일 인스턴스 export
*/

// 4. 실제 활용 - 설정 관리자
class ConfigManager {
  constructor() {
    if (ConfigManager.instance) {
      return ConfigManager.instance;
    }
    this.config = new Map();
    ConfigManager.instance = this;
  }
  
  set(key, value) {
    this.config.set(key, value);
  }
  
  get(key) {
    return this.config.get(key);
  }
  
  getAll() {
    return Object.fromEntries(this.config);
  }
}

const config = new ConfigManager();
config.set('apiUrl', 'https://api.example.com');
config.set('timeout', 5000);

console.log('설정:', config.getAll());

console.log('Singleton 예시 완료');`}
        />

        <InfoCard type="warning" title="Singleton 주의사항">
          <ul>
            <li>
              <strong>전역 상태:</strong> 테스트 어려움, 의존성 숨김
            </li>
            <li>
              <strong>대안:</strong> 의존성 주입 (DI) 고려
            </li>
            <li>
              <strong>서버리스:</strong> 인스턴스 공유 안 될 수 있음
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="factory">2️⃣ Factory 패턴</h2>
        <p>
          객체 생성 로직을 캡슐화합니다.
        </p>

        <CodeDemo
          title="Factory 패턴 구현"
          description="유연한 객체 생성"
          defaultCode={`// 1. 기본 Factory 함수
function createPerson(type, name, age) {
  if (type === 'student') {
    return {
      type: 'student',
      name,
      age,
      study: () => console.log(\`\${name} 이 (가) 공부합니다\`),
    };
  } else if (type === 'teacher') {
    return {
      type: 'teacher',
      name,
      age,
      teach: () => console.log(\`\${name} 이 (가) 가르칩니다\`),
    };
  }
}

const student = createPerson('student', 'Alice', 20);
const teacher = createPerson('teacher', 'Bob', 35);

student.study();  // Alice 가 공부합니다
teacher.teach();  // Bob 이 가르칩니다

// 2. Factory 클래스
class VehicleFactory {
  createVehicle(type) {
    switch (type) {
      case 'car':
        return new Car();
      case 'truck':
        return new Truck();
      case 'motorcycle':
        return new Motorcycle();
      default:
        throw new Error(\`Unknown vehicle type: \${type}\`);
    }
  }
}

class Car {
  drive() { console.log('차를 운전합니다'); }
}

class Truck {
  drive() { console.log('트럭을 운전합니다'); }
  haul() { console.log('화물을 운반합니다'); }
}

class Motorcycle {
  drive() { console.log('오토바이를 운전합니다'); }
}

const factory = new VehicleFactory();
const car = factory.createVehicle('car');
const truck = factory.createVehicle('truck');

car.drive();    // 차를 운전합니다
truck.drive();  // 트럭을 운전합니다
truck.haul();   // 화물을 운반합니다

// 3. 실제 활용 - UI 컴포넌트 팩토리
class ButtonFactory {
  static createButton(style, label) {
    switch (style) {
      case 'primary':
        return {
          type: 'primary',
          label,
          render: () => \`<button class="btn-primary">\${label}</button>\`,
        };
      case 'secondary':
        return {
          type: 'secondary',
          label,
          render: () => \`<button class="btn-secondary">\${label}</button>\`,
        };
      case 'danger':
        return {
          type: 'danger',
          label,
          render: () => \`<button class="btn-danger">\${label}</button>\`,
        };
      default:
        throw new Error(\`Unknown style: \${style}\`);
    }
  }
}

const btn1 = ButtonFactory.createButton('primary', '확인');
const btn2 = ButtonFactory.createButton('danger', '삭제');

console.log(btn1.render());
console.log(btn2.render());

// 4. 실제 활용 - 알림 팩토리
function createNotification(type, message) {
  const notifications = {
    success: {
      icon: '✓',
      color: 'green',
      duration: 3000,
    },
    error: {
      icon: '✗',
      color: 'red',
      duration: 5000,
    },
    warning: {
      icon: '⚠',
      color: 'orange',
      duration: 4000,
    },
    info: {
      icon: 'ℹ',
      color: 'blue',
      duration: 3000,
    },
  };
  
  const config = notifications[type] || notifications.info;
  
  return {
    type,
    message,
    ...config,
    show: () => {
      console.log(\`[\${config.icon}] \${message}\`);
    },
  };
}

const successNotif = createNotification('success', '작업 완료!');
successNotif.show();  // [✓] 작업 완료!

console.log('Factory 예시 완료');`}
        />

        <InfoCard type="tip" title="Factory 사용 사례">
          <ul>
            <li>
              <strong>객체 풀:</strong> 데이터베이스 연결, 스레드
            </li>
            <li>
              <strong>플러그인 시스템:</strong> 동적 확장
            </li>
            <li>
              <strong>테스트:</strong> 목 객체 생성
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="observer">3️⃣ Observer 패턴</h2>
        <p>
          객체 간 1 대 다 의존성을 정의하여 상태 변경을 알림합니다.
        </p>

        <CodeDemo
          title="Observer 패턴 구현"
          description="이벤트 기반 아키텍처"
          defaultCode={`// 1. 기본 Observer (이벤트Emitter)
class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    return () => this.off(event, callback);
  }
  
  off(event, callback) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }
  
  emit(event, ...args) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => cb(...args));
    }
  }
  
  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }
}

// 사용 예시
const emitter = new EventEmitter();

const unsubscribe = emitter.on('data', (data) => {
  console.log('데이터 수신:', data);
});

emitter.emit('data', { id: 1, value: 'hello' });
unsubscribe();
emitter.emit('data', { id: 2, value: 'world' });  // 호출 안 됨

// 2. 실제 활용 - 상태 관리 (간이 Redux)
class Store extends EventEmitter {
  constructor(reducer, initialState) {
    super();
    this.reducer = reducer;
    this.state = initialState;
  }
  
  getState() {
    return this.state;
  }
  
  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.emit('change', this.state);
  }
  
  subscribe(listener) {
    return this.on('change', listener);
  }
}

// 카운터 예시
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const store = new Store(counterReducer, { count: 0 });

store.subscribe((state) => {
  console.log('상태 변경:', state);
});

store.dispatch({ type: 'INCREMENT' });  // 상태 변경: { count: 1 }
store.dispatch({ type: 'INCREMENT' });  // 상태 변경: { count: 2 }

// 3. 실제 활용 - 데이터 바인딩
class Observable {
  constructor(initialValue) {
    this._value = initialValue;
    this._observers = [];
  }
  
  get value() {
    return this._value;
  }
  
  set value(newValue) {
    this._value = newValue;
    this._notify();
  }
  
  subscribe(callback) {
    this._observers.push(callback);
  }
  
  _notify() {
    this._observers.forEach((cb) => cb(this._value));
  }
}

const name = new Observable('Alice');

name.subscribe((value) => {
  console.log('이름 변경:', value);
});

name.value = 'Bob';    // 이름 변경: Bob
name.value = 'Charlie'; // 이름 변경: Charlie

console.log('Observer 예시 완료');`}
        />

        <InfoCard type="tip" title="Observer 활용">
          <ul>
            <li>
              <strong>이벤트 시스템:</strong> DOM 이벤트, Node.js EventEmitter
            </li>
            <li>
              <strong>상태 관리:</strong> Redux, Zustand, Jotai
            </li>
            <li>
              <strong>반응형 프로그래밍:</strong> RxJS, Signals
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="module">4️⃣ Module 패턴</h2>
        <p>
          코드를 논리적 단위로 분리하고 캡슐화합니다.
        </p>

        <CodeDemo
          title="Module 패턴 구현"
          description="캡슐화와 네임스페이스"
          defaultCode={`// 1. Module 패턴 (IIFE)
const Counter = (function() {
  // private
  let count = 0;
  
  function log(msg) {
    console.log(\`[Counter] \${msg}\`);
  }
  
  // public
  return {
    increment: () => {
      count++;
      log(\`Incremented to \${count}\`);
    },
    decrement: () => {
      count--;
      log(\`Decremented to \${count}\`);
    },
    getCount: () => count,
    reset: () => {
      count = 0;
      log('Reset to 0');
    },
  };
})();

Counter.increment();  // [Counter] Incremented to 1
Counter.increment();  // [Counter] Incremented to 2
console.log('카운트:', Counter.getCount());  // 2

// 2. 현대적 Module (ES6)
// math.js
/*
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

const PI = 3.14159;  // 모듈 내부에서만 사용

export function getPI() {
  return PI;
}
*/

// 3. 실제 활용 - API 클라이언트 모듈
const APIClient = (function() {
  let baseURL = '';
  let token = null;
  
  function request(endpoint, options = {}) {
    const url = \`\${baseURL}\${endpoint}\`;
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': \`Bearer \${token}\` } : {}),
      ...options.headers,
    };
    
    console.log('요청:', url, { ...options, headers });
    return fetch(url, { ...options, headers });
  }
  
  return {
    configure: (config) => {
      baseURL = config.baseURL || '';
      token = config.token || null;
    },
    
    get: (endpoint) => request(endpoint, { method: 'GET' }),
    post: (endpoint, data) => request(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
    put: (endpoint, data) => request(endpoint, { 
      method: 'PUT', 
      body: JSON.stringify(data) 
    }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
    
    setToken: (newToken) => {
      token = newToken;
    },
  };
})();

// 사용 예시
APIClient.configure({
  baseURL: 'https://api.example.com',
  token: 'my-token',
});

// APIClient.get('/users');
// APIClient.post('/users', { name: 'Alice' });

// 4. 실제 활용 - 로깅 모듈
const Logger = (function() {
  const levels = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
  };
  
  let currentLevel = levels.INFO;
  const history = [];
  
  function formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return \`[\${timestamp}] [\${level}] \${message}\`;
  }
  
  function log(level, message) {
    if (levels[level] >= currentLevel) {
      const formatted = formatMessage(level, message);
      history.push(formatted);
      console.log(formatted);
    }
  }
  
  return {
    debug: (msg) => log('DEBUG', msg),
    info: (msg) => log('INFO', msg),
    warn: (msg) => log('WARN', msg),
    error: (msg) => log('ERROR', msg),
    
    setLevel: (level) => {
      currentLevel = levels[level];
    },
    
    getHistory: () => [...history],
    clearHistory: () => {
      history.length = 0;
    },
  };
})();

Logger.info('애플리케이션 시작');
Logger.warn('메모리 사용량 높음');
Logger.setLevel('ERROR');
Logger.debug('이건 안 보임');
Logger.error('치명적 오류!');

console.log('로그 히스토리:', Logger.getHistory());

console.log('Module 예시 완료');`}
        />

        <InfoCard type="tip" title="Module 패턴 장점">
          <ul>
            <li>
              <strong>캡슐화:</strong> private 상태 보호
            </li>
            <li>
              <strong>네임스페이스:</strong> 전역 오염 방지
            </li>
            <li>
              <strong>유지보수:</strong> 관심사 분리
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="strategy">5️⃣ Strategy 패턴</h2>
        <p>
          알고리즘 군을 정의하고 캡슐화하여 상호 교환 가능하게 만듭니다.
        </p>

        <CodeDemo
          title="Strategy 패턴 구현"
          description="알고리즘 교체"
          defaultCode={`// 1. 기본 Strategy 패턴
class PaymentStrategy {
  pay(amount) {
    throw new Error('Method not implemented');
  }
}

class CreditCardPayment extends PaymentStrategy {
  constructor(cardNumber) {
    super();
    this.cardNumber = cardNumber;
  }
  
  pay(amount) {
    console.log(\`\${amount}원 신용카드 결제 (\${this.cardNumber})\`);
  }
}

class PayPalPayment extends PaymentStrategy {
  constructor(email) {
    super();
    this.email = email;
  }
  
  pay(amount) {
    console.log(\`\${amount}원 PayPal 결제 (\${this.email})\`);
  }
}

class CryptoPayment extends PaymentStrategy {
  constructor(walletAddress) {
    super();
    this.walletAddress = walletAddress;
  }
  
  pay(amount) {
    console.log(\`\${amount}원 암호화폐 결제 (\${this.walletAddress})\`);
  }
}

// Context
class ShoppingCart {
  constructor() {
    this.items = [];
    this.paymentStrategy = null;
  }
  
  addItem(item) {
    this.items.push(item);
  }
  
  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }
  
  checkout() {
    const total = this.items.reduce((sum, item) => sum + item.price, 0);
    console.log('총 금액:', total);
    
    if (this.paymentStrategy) {
      this.paymentStrategy.pay(total);
    } else {
      throw new Error('결제 수단이 설정되지 않았습니다');
    }
  }
}

// 사용 예시
const cart = new ShoppingCart();
cart.addItem({ name: '상품 1', price: 10000 });
cart.addItem({ name: '상품 2', price: 20000 });

// 전략 변경 가능
cart.setPaymentStrategy(new CreditCardPayment('1234-5678-9012-3456'));
cart.checkout();  // 30000 원 신용카드 결제

cart.setPaymentStrategy(new PayPalPayment('user@example.com'));
cart.checkout();  // 30000 원 PayPal 결제

// 2. 실제 활용 - 정렬 전략
const SortStrategies = {
  bubble: (arr) => {
    console.log('버블 정렬');
    return [...arr].sort((a, b) => a - b);
  },
  quick: (arr) => {
    console.log('퀵 정렬');
    return [...arr].sort((a, b) => a - b);
  },
  merge: (arr) => {
    console.log('병합 정렬');
    return [...arr].sort((a, b) => a - b);
  },
  custom: (arr, compareFn) => {
    console.log('커스텀 정렬');
    return [...arr].sort(compareFn);
  },
};

class DataProcessor {
  constructor(sortStrategy) {
    this.sortStrategy = sortStrategy;
  }
  
  setSortStrategy(strategy) {
    this.sortStrategy = strategy;
  }
  
  process(data) {
    return this.sortStrategy(data);
  }
}

const processor = new DataProcessor(SortStrategies.bubble);
const numbers = [5, 2, 9, 1, 7];

console.log('결과:', processor.process(numbers));

// 전략 변경
processor.setSortStrategy(SortStrategies.custom);
console.log('내림차순:', processor.process(numbers, (a, b) => b - a));

// 3. 실제 활용 - 검증 전략
const ValidationStrategies = {
  required: (value) => {
    return value ? null : '필수 항목입니다';
  },
  email: (value) => {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return regex.test(value) ? null : '이메일 형식이 아닙니다';
  },
  minLength: (min) => (value) => {
    return value.length >= min ? null : \`\${min}자 이상 입력하세요\`;
  },
  maxLength: (max) => (value) => {
    return value.length <= max ? null : \`\${max}자 이하로 입력하세요\`;
  },
};

class FormValidator {
  constructor() {
    this.strategies = [];
  }
  
  addStrategy(strategy) {
    this.strategies.push(strategy);
  }
  
  validate(value) {
    for (const strategy of this.strategies) {
      const error = strategy(value);
      if (error) {
        return error;
      }
    }
    return null;
  }
}

const emailValidator = new FormValidator();
emailValidator.addStrategy(ValidationStrategies.required);
emailValidator.addStrategy(ValidationStrategies.email);
emailValidator.addStrategy(ValidationStrategies.minLength(5));

console.log('검증 결과:', emailValidator.validate(''));  // 필수 항목입니다
console.log('검증 결과:', emailValidator.validate('test'));  // 이메일 형식 아님
console.log('검증 결과:', emailValidator.validate('valid@example.com'));  // null

console.log('Strategy 예시 완료');`}
        />

        <InfoCard type="tip" title="Strategy 패턴 활용">
          <ul>
            <li>
              <strong>알고리즘 교체:</strong> 런타임에 전략 변경
            </li>
            <li>
              <strong>테스트:</strong> 각 전략 독립적으로 테스트
            </li>
            <li>
              <strong>확장:</strong> 새로운 전략 추가 용이
            </li>
          </ul>
        </InfoCard>
      </section>

      <section className="content-section">
        <h2 id="summary">📝 요약</h2>
        <ul>
          <li>
            <strong>Singleton:</strong> 단일 인스턴스, 전역 공유
          </li>
          <li>
            <strong>Factory:</strong> 객체 생성 캡슐화
          </li>
          <li>
            <strong>Observer:</strong> 1 대 다 의존성, 이벤트 기반
          </li>
          <li>
            <strong>Module:</strong> 캡슐화, 네임스페이스
          </li>
          <li>
            <strong>Strategy:</strong> 알고리즘 교체, 상호 교환
          </li>
          <li>
            <strong>적용:</strong> 상황에 맞는 패턴 선택, 과용 금지
          </li>
        </ul>
      </section>
    </div>
  );
}