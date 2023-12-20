// The primitives: string, number, boolean, bigint, undefined, null, symbol.
// string is type and String is inteface. Always use string for type.

// number:
const age: number = 23;

// string:
const address: string = 'Phu Nhuan disctrict';

// boolean:
const flag: boolean = true;

// bigint
// bigint use to declare a very large number.
const veryLargeNumber: bigint = BigInt(100);
const veryLargeNumberTwo: bigint = 200n;

// null and undefined
// null thể hiện một biến empty, rỗng, trống và không có giá trị.
// undefined thể hiện một biến đã khai báo nhưng CHƯA khởi tạo giá trị
// Nên setting strictNullChecks: true

// symbol
// sử dụng để tạo unique and immutable type.
const firstName = Symbol('name');
const secondName = Symbol('name');
// firstName === lastName (false)

// Array
let numberArray: number[] = [1, 2, 3, 4];
let numberArrayTwo: Array<number> = [1, 2, 3, 4];
let stringAndNumberArray: (string | number)[] = [1, 2, 'Khai', 4];

// any
// sử dụng khi ta không muốn một type cụ thể cho variable, function return.
// Thiết nghĩ nên không dùng any trong dự án.
let anyTuype: any = 'Khai'; // It is not good

// Type Annotations on Variables
// Typescript "tự hiểu" nếu ta không gán type cho một biến
let typeAnnotation = 'string'; // this variable inferred as type string.

//  Optional Properties
function displayXY(x: number, y?: number) {
  console.log('y: ', x);
  console.log('y: ', y);
}
// 2 ways are ok
displayXY(1);
displayXY(1, 2);

// Union Types
// id can be type number OR type string
function printId(id: number | string) {
  console.log('Your ID is: ' + id);
}

// Type Aliases
type User = {
  // Union type
  id: string | number;
  name: string;
  age: number;
};

// another way to name an object type
interface Point {
  x: number;
  y: number;
}

// Type and interface
// interface use extend keyword to extent another interface. Type extents via intersections (&).
// Type cannot be changed after created:  // Error: Duplicate identifier 'example'.

// Type assertion
// allows you to set the type of a value and tell the compiler not to infer it
// It is merely a way to let the TypeScript compiler know the type of a variable.
// Ta sử dụng khi biết trước variable là type nào
let code: any = 123;
let employeeCode = <number>code;
let employeeCode2 = code as number;
// 2 ways above are same.

// Literal Types
// Literal Types allow you to specify exact values for variables or properties
// only red, green or blue is accepted
type literalTypes = 'red' | 'green' | 'blue';

// Enum dùng để định nghĩa một set (no duplication) of name (immutable)
enum UserResponse {
  No = 0,
  Yes = 1,
}
function respond(message: UserResponse): void {
  // ...
}
respond(UserResponse.Yes);
