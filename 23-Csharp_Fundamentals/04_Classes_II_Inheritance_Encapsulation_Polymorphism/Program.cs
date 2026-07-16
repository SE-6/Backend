// IS A RELATIONSHIP
// var dog = new Dog("Umka");
// dog.Eat();
// dog.Sleep();
// dog.Bark();

// var cat = new Cat("Tiger");
// cat.Eat();
// cat.Sleep();
// cat.Meow();

var basic = new Ticket("Moritz", 20);
// basic.PrintInfo();

var train = new Trainticket("Onur", 5, "Jena");
// train.PrintInfo();
// train.PrintTrainInfo();

var concert = new ConcertTicket("Leila", 50, "AnnenMayKantereit");
// concert.PrintInfo();
// concert.PrintConcertInfo();

// --------------------------------------------------
// What is inherited and WHAT can be overridden?

var car = new ElectricCar();
// car.Drive();
// car.Charge();

var phone = new Phone();
// phone.Start();

Base b = new Derived();
b.Show();

Derived d = new Derived();
d.Show();



void Drawshape(IShape a)
{
    a.Draw();
}

Drawshape(new Circle());
Drawshape(new Rectangle());
Drawshape(new Triangle());

public class Car
{
    public virtual void Drive()
    // public void Drive()
    {
        Console.WriteLine("The car is driving...");
    }
}

public class ElectricCar : Car
{
    public override void Drive()
    {
        Console.WriteLine("The electric car is driving");
    }
    public void Charge()
    {
        Console.WriteLine("The car is charging");
    }
}

public abstract class Device
{
    public abstract void Start();
}

public class Phone : Device
{
    public override void Start()
    {
        Console.WriteLine("Phone started");
    }
}

public class Base
{
    public void Show() => Console.WriteLine("Base.Show");
}

public class Derived : Base
{
    public new void Show() => Console.WriteLine("Derived.Show");
}


public interface IShape
{
    void Draw();
}

public class Circle : IShape
{
    public void Draw() => Console.WriteLine("Drawing a circle");

}

public class Rectangle : IShape
{
    public void Draw() => Console.WriteLine("Drawing a Rectangle");
}

public class Triangle : IShape
{
    public void Draw() => Console.WriteLine("Drawing a Triangle");
}

