// ** https://mirone.me/a-complete-guide-to-typescript-decorator/
// decorator là một khai báo đặt biệt, được attach vào class, method, accesor, property, parameter
// accesor and method decorator có chung chức năng nhưng khác tên gọi. Một cái gắn ở method.
//  Một cái gắn ở getter method.

// ! Decorator factory
// this is the decorator factory
function color(value: number) {
  // this is the decorator
  return function (value2: number) {
    // do something with 'target' and 'value'...
    return value + value2;
  };
}

const c = color(2);
// các hàm closure  có khả năng lưu giữ trạng thái của các biến bên trong nó,
// ở đây hàm c đang lưu giá trị là 2 và nhận một giá trị mới là 3
const c2 = c(3);
console.log(c2);

// ! Decorator Composition
// @a @b
// or
// @a
// @b
// The expressions (code in fist() and second() ) for each decorator are evaluated top-to-bottom.
// The results are then called as functions (2 closure function in first and second) from bottom-to-top.
// @experimentalDecorators
function first() {
  console.log('first(): factory evaluated');
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('first(): called');
  };
}

function second() {
  console.log('second(): factory evaluated');
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('second(): called');
  };
}

class ExampleClass {
  @first()
  @second()
  method() {}
}

console.log('-----------------');
// ! Class decorator
// Decorator được thực thi khi class được khai báo and và có thể modify constructor, property, method,
type Consturctor = { new (...args: any[]): any };

function toString<T extends Consturctor>(BaseClass: T) {
  // targer: The constructor of the class.
  return class extends BaseClass {
    // override hellword from C
    helloWord() {
      // do something here
      return 'hello world override';
    }
  };
}

@toString
class C {
  public foo = 'foo';
  public num = 24;

  helloWord() {
    console.log('hello world');
  }
}
console.log('Class decorator :', new C().helloWord());

// ! Method Decorators
// sử dụng để theo dõi, sửa đổi method
console.log('-----------------');
function greet(statement: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // giống accessor decorator
    console.log('Method Decorators: ', [target, propertyKey, descriptor]);

    descriptor.value = function () {
      return statement;
    };
  };
}

class MethodsDecorator {
  statement: string;

  constructor(str: string) {
    this.statement = str;
  }

  @greet('Khai')
  showGreet() {
    return this.statement;
  }
}

const methodDecorator = new MethodsDecorator('I am');
// It shows Khai insted of I am
console.log(methodDecorator.showGreet());

// ! Accessor Decorators
// It is same with method decorator but use for getter and setter.
console.log('-----------------');
function changeName(statement: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // target: class constructor
    // propertyKey: tên accessor
    // descriptor: thông tin method
    console.log('Accessor Decorators: ', [target, propertyKey, descriptor]);
    descriptor.value = function () {
      // change name to statement
      return statement;
    };
  };
}

class AccessorDecorator {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  @changeName('New name is KHai')
  getName() {
    return this.name;
  }
}

const accesorDecorator = new AccessorDecorator('I am');
console.log(accesorDecorator.getName());

// ! Property Decorators
// use to observe, modify property
console.log('-----------------');
function propertyDecorator(target: any, propertyKey: string) {
  // targer: class constructor
  // propertyKey: property name
  console.log('Property Decorators: ', [target, propertyKey]);
}

class PropertiesDecorator {
  @propertyDecorator
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

// ! Parameter Decorators
// Khai báo trước parameter trong function, can thiệp và thay đổi thân hàm
console.log('-----------------');
function ExchangeRate(target: Object, propertyKey: string, parameterIndex: number) {
  // target: là hàm constructor của class
  // methodKey: Tên method
  // parameterIndex: Index của param trong list các tham số của function
  console.log('Parameter Decorators: ', [target, propertyKey, parameterIndex]);
}

class Product {
  private name: string;

  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  vnds(quantity: number, @ExchangeRate exchangeRate: number) {
    return this.price * quantity * exchangeRate;
  }
}

let paramDecorator = new Product('Khai', 5);
