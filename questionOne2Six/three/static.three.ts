// static menber của class được truy cập trực tiếp bằng class, không thông qua object
// các object instance chia sẻ chung 1 biến static
class Circle {
  // static properties
  static pi: number = 3.14;

  // static method
  static calculateArea(radius: number) {
    return this.pi * radius * radius;
  }
}

console.log('pi: ', Circle.pi);
console.log('calculateArea: ', Circle.calculateArea(2));

// có thể kế thừa member
class BaseStatic {
  static getGreeting() {
    return 'Hello world';
  }
}
class Derived extends BaseStatic {
  myGreeting = Derived.getGreeting();
}

// static block
declare function loadLastInstances(): any[];

class Foo {
  static count = 0;

  get count() {
    return Foo.count;
  }

  // dkhởi tạo dữ liệu cho biến static.
  // block static chỉ thực hiện một lần duy nhất khi lớp được khởi tạo
  static {
    try {
      const lastInstances = loadLastInstances();
      Foo.count += lastInstances.length;
    } catch {}
  }
}
