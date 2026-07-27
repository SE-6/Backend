const greet = (name) => console.log(`Hello, ${name}`);

function runTwice(fn) {
  fn('Ali');
  fn('Ali');
}

runTwice(greet);
