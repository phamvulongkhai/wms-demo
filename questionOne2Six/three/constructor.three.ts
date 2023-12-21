// Constructors

class Point {
  // Overloads
  constructor(s: string);
  constructor(s: number, y: string);
  // implement constructor
  constructor(s: any, y?: any) {}
}

// constructor type
type ConstructorTypeOf<T> = new (...args: any[]) => T;
