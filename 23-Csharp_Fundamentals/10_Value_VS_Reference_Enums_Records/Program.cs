// int a = 5;
// int b = a;
// b++;

// int x = 5;

// Console.WriteLine(a);

// Increment(x);
// Console.WriteLine(x);

// IncrementByRef(ref x);
// Console.WriteLine(x);


// CLASS (REF)
// var box1 = new Box { Count = 5 };
// var box2 = box1;

// box2.Count++;
// Console.WriteLine(box1.Count);

// STRUCT

// void Increment(int number)
// {
//     number++;
//     Console.WriteLine(number);
// }

// void IncrementByRef(ref int number)
// {
//     number++;
//     Console.WriteLine(number);
// }

// var p1 = new Point { X = 5, Y = 20 };
// var p2 = p1;

// p2.X = 99;

// Console.WriteLine(p1.X);

// var c1 = new Coordinate(3, 4);
// c1.X = 5; // nope! not allowed => readonly struct

// Console.WriteLine($"{c1.X}, {c1.Y}"); // 3,4

// public class Box
// {
//     public int Count { get; set; }
// }

// struct Point
// {
//     public int X;
//     public int Y;
// }

// ENUM?

// DayOfWeek today = DayOfWeek.Friday;

// if (today == DayOfWeek.Friday)
// {
//     Console.WriteLine("It's Friday!");
// }

// switch (today)
// {
//     case DayOfWeek.Saturday:
//     case DayOfWeek.Sunday:
//         Console.WriteLine("It's the weekend!");
//         break;
//     default:
//         Console.WriteLine("It's a weekday");
//         break;
// }
// enum DayOfWeek
// {
//     Monday,
//     Tuesday,
//     Wednesday,
//     Thursday,
//     Friday,
//     Saturday,
//     Sunday
// }

// ------------ WITH ------------

// CLASSES AGAIN
// var s1 = new Student("SE006", "Andrew", 7);
// var s2 = s1; // copies the REF!
// s2.Promote();

// Console.WriteLine(s1.Month);


// RECORDS

// var r1 = new StudentRecord("SE006", "Jochen", 7);
// var r2 = new StudentRecord("SE006", "Yusif", 7);
// var r3 = r1 with { Month = 3 };

// Console.WriteLine(r1 == r2); // false <= value equality!


// Console.WriteLine(r1.Month); // 7
// Console.WriteLine(r3.Month); // 3
// public record StudentRecord(string Id, string Name, int Month);

// INTERFACES
interface IShape
{
    void Area();
}

