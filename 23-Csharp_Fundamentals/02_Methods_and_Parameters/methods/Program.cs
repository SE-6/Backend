// // METHODS
// void PrintLine()
// {
//     Console.WriteLine("This is a simple message");
// }

// // PrintLine();

// void SayHello(string name)
// {
//     Console.WriteLine($"Hello, {name}");
// }

// // SayHello("Moritz");
// // SayHello("Ali");

// int Add(int a, int b)
// {
//     return a + b;
// }

// // int result = Add(3, 4);
// // Console.WriteLine(result);

// int Multiply(int a, int b)
// {
//     return a + b;
// }

// // Console.WriteLine(Multiply(2, 5));
// Car toyota = new();
// toyota.Drive();


// public class Car
// {

//     private void StartEngine()
//     {
//         Console.WriteLine("Engine started...");
//     }
//     public void Drive()
//     {
//         StartEngine();
//         Console.WriteLine("Driving...");
//     }

// }

// Console.WriteLine(Maths.Square(5));
// public class Maths
// {
//     // public static int Count = 0;
//     public static int Square(int x)
//     {
//         return x * x;
//     }
// }

// using Utils;

// // Utils.Greeter.Welcome();
// Greeter.Welcome();
// Greeter.Welcome(course: "LINQ");
// Greeter.Welcome(name: "Ali");
// Greeter.Welcome("Masih", "ZUSTAND");

// Console.WriteLine(Formatter.FormatPrice(12.5));
// Console.WriteLine(Formatter.FormatPrice(12.5, "€"));

// public class Formatter
// {
//     public static string FormatPrice(double amount)
//     {
//         return $"{amount: 0.00}€ / FormatPrice 1";
//     }

//     public static string FormatPrice(double amount, string currency)
//     {
//         return $"{amount: 0.00}{currency} / FormatPrice 2";
//     }
// }

// VALUE VS REFERENCE TYPES
// int x = 5;
// Increment(x);

// Console.WriteLine(x);

// void Increment(int number)
// {
//     number++;
//     Console.WriteLine(number);
// }

// int x = 5;
// Increment(ref x);

// Console.WriteLine(x);

// void Increment(ref int number)
// {
//     number++;
//     Console.WriteLine(number);
// }

// int x = 15;
// Console.WriteLine(x); // 15

// incrementByValue(x);
// Console.WriteLine(x);

// incremebtByRef(ref x);
// Console.WriteLine(x);



// void incrementByValue(int number)
// {
//     number++;
//     Console.WriteLine(number);
// }

// void incremebtByRef(ref int number)
// {
//     number++;
//     Console.WriteLine(number);
// }



// double result;
// bool success = TryDivide(10, 2, out result);

// Console.WriteLine(success); // false
// Console.WriteLine(result); // 0

// bool TryDivide(int a, int b, out double result)
// {
//     if (b == 0)
//     {
//         result = 0;
//         return false;
//     }
//     result = (double)a / b;
//     return true;
// }


// Log("test");


// void Log(in string message)
// {
//     message = "idontknow"; // compile error => "in" params are read-only
//     Console.WriteLine(message);
// }


// void A(string message); // message X ok copy
// void B(ref string message); // Ok - reference, changes outside too
// void C(in string message); // ERROR reference, but read-only