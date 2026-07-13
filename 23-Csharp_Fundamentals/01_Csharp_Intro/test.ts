let year: number = 2025;

console.log(`The year is ${year}`);

for (let i = 0; i < 3; i++) {
  console.log(`Count: ${i}`);
}

class Car {
  brand: string;
  model: string;
  year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  drive() {
    console.log('The car is driving...');
  }

  stop() {
    console.log('The car has stopped.');
  }
}

// create an object from the class
const myCar = new Car('Toyota', 'Corolla', 2020);

myCar.drive(); // The car is driving...
myCar.stop(); // The car has stopped.
