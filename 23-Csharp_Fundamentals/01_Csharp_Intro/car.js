const car = {
  brand: 'Toyota',
  model: 'Corolla',
  year: 2020,

  drive() {
    console.log('The car is driving...');
  },

  stop() {
    console.log('The car has stopped.');
  },
};

car.drive();
car.stop();

const robot = {
  name: 'Robo',
  model: 'RX-X1',
  year: 2026,

  greet: function () {
    console.log(
      `Hello, i am ${this.name}, model ${this.model}, built in ${this.year}!`,
    );
  },

  performTask: function (task) {
    console.log(`${this.name} is performing task: ${task}`);
  },
};

robot.greet();
robot.performTask('doing something');
