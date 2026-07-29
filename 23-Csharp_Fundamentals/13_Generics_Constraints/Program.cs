var numberBox = new Box<int> { Value = 10 };
var textBox = new Box<string> { Value = "Kaufland" };

// Console.WriteLine(numberBox.Value);
// Console.WriteLine(textBox.Value);

// int x = 1;
// int y = 2;
// Swap(ref x, ref y);
// Console.WriteLine($"{x}, {y}"); //  2, 1

// string a = "Hello";
// string b = "World!";
// Swap(ref a, ref b);

// Console.WriteLine($"{a}, {b}"); //  2, 1

// void Swap<T>(ref T a, ref T b)
// {
//     (a, b) = (b, a);
// }


var repo = new Repository<Book>();
repo.Save(new Book { Id = 1, Title = "C# in Depth" });



public class Book : Entity
{
    public string Title { get; set; } = string.Empty;
}