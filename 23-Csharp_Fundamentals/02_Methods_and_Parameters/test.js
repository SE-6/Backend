// function sayHello(name) {
//   console.log(`Hello, ${name}`);
// }

// sayHello('Moritz');

// function add(a, b) {
//   return a + b;
// }

// let x = 5;

// console.log(x); // 5

// function increment(number) {
//   number++;
//   console.log(number); // 6
// }

// increment(x);

// let obj = { value: 5 };

// function increment(o) {
//   o.value++;
// }

// increment(obj);

function tryDivide(a, b) {
  if (b === 0) {
    return { success: false, result: 0 };
  }
  return { success: true, result: a / b };
}

const { success, result } = tryDivide(10, 0);

console.log(tryDivide(10, 5));
