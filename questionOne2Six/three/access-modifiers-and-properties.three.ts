// mặc định của thuộc tính là public. có thể truy cập ở mọi nơi
class Greeter {
  public name: string = 'hallo';
  public greet() {
    console.log('hi!');
  }
}
const g = new Greeter();
g.greet();
console.log(g.name);

// protected truy cập trong nội bộ class và subclass
class Greeter1 {
  protected age: number = 23;
}

class SpecialGreeter extends Greeter1 {
  constructor() {
    super();
    console.log(this.age);
  }
}
const g1 = new SpecialGreeter();

// private truy cập trong nội bộ class
class Base {
  private x = 0;
}
const b = new Base();

// ! getting error
// console.log(b.x);
