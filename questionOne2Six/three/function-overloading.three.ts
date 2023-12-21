// Ta có thể nạp chồng phương thức.
// có thể có nhiều phương thức giống tên, nhưng khác parameters type và return type.
// số lượng parameter cũng có thể giống nhau

function add(a: string, b: string): string;

function add(a: number, b: number, c: number): number;

// implement function, parameter type và return type nên là any
function add(a: number | string, b: number | string, c?: number): any {
  if (c) {
    return 'code here';
  }
  return 'we do not have c';
}

add(1, 2, 3);
