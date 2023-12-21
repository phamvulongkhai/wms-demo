// Inheritance
class Person {
  constructor(private firstName: string, private lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

// use extends keyword
class Employee extends Person {
  constructor(firstName: string, lastName: string, private jobTitle: string) {
    // call person constructor
    super(firstName, lastName);
    this.jobTitle = jobTitle;
  }
}

// interface can extend multiple interfaces.
interface B {
  b(): void;
}

interface C {
  c(): void;
}

interface D extends B, C {
  d(): void;
}

// class implemnts interface

class Constractor implements B {
  b(): void {}
}
