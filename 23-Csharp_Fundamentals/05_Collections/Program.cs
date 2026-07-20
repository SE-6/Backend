// var shoppingList = new List<string>();

// shoppingList.Add("Milk");
// shoppingList.Add("Bread");
// shoppingList.Add("Eggs");
// shoppingList.Remove("Milk");

// if (shoppingList.Contains("Milk"))
// {
//     Console.WriteLine("Milk is on the list");
// }


// void PrintFirst<T>(List<T> items)
// {
//     Console.WriteLine($"First item: {items[0]}");
// }

// var names = new List<string> { "Leila", "Ali", "Moritz" };
// var scores = new List<int> { 90, 91, 92 };

// PrintFirst(names);
// PrintFirst(scores);


// var studentsList = new List<Student>
// {
//         new Student("Ali", "SE006", 100),
//         new Student("Moritz", "SE006", 99),
//         new Student("Leila", "SE006", 98),
//         new Student("Masih Zustand", "SE006", 97),
//         new Student("Yusif", "SE006", 96),
//         new Student("Jochen", "SE006", 95),
//         new Student("Andrew", "SE006", 94),
//         new Student("Onur", "SE006", 60),
// };

// // studentsArray.Add(new Student("Someone", "SE006", 100));
// // studentsList.Add(new Student("Someone", "SE006", 100));

// // Find() => returns the FIRST match (or null if nothing matches);
// var yusif = studentsList.Find(s => s.Name == "Onur");
// // Console.WriteLine(yusif?.Grade);

// // ADD, REMOVE, SORT, REVERSE, CLEAR, INSERT

// // FindAll() => returns ALL matches as a new List
// var topStudents = studentsList.FindAll(s => s.Grade > 80);
// // Console.WriteLine(topStudents.Count);

// // Exists() => just checks: is there any match? returns bool
// bool hasFailingStudeunt = studentsList.Exists(s => s.Grade < 61);
// // Console.WriteLine(hasFailingStudeunt);

// // Sort() => sort by grade, lowest first

// studentsList.Sort((a, b) => a.Grade.CompareTo(b.Grade));

// // foreach (var student in studentsList)
// // {
// //     Console.WriteLine($"{student.Name} - {student.Grade}");
// // }



// public class Student
// {
//     public string Name { get; set; }
//     public string Course { get; set; }
//     public int Grade { get; set; }

//     public Student(string name, string course, int grade)
//     {
//         Name = name;
//         Course = course;
//         Grade = grade;
//     }

// }

// DICTIONARIES

// var capitals = new Dictionary<string, string>();


// capitals["Germany"] = "Berlin";
// capitals["France"] = "Paris";
// capitals["Japan"] = "Tokyo";

// Console.WriteLine(capitals["Germany"]);
// Console.WriteLine(capitals["Spain"]);

// if (capitals.ContainsKey("Spain"))
// {
//     Console.WriteLine(capitals["France"]);
// }


// SAFE ACCESS
// if (capitals.TryGetValue("Indonesia", out var city))
// {
//     Console.WriteLine(city);
// }
// else
// {
//     Console.WriteLine("Indonesia not found");
// }


// foreach (var pair in capitals)
// {
//     Console.WriteLine($"{pair.Key} => {pair.Value}");
// }

// Relevant Collections Interfaces: IEnumerable vs ICollection
// var list = new List<int> { 1, 2, 3 };
// var array = new int[] { 4, 5, 6 };

// foreach (var n in list)
// {
//     Console.WriteLine(n);
// }

// foreach (var n in array)
// {
//     Console.WriteLine(n);
// }

// PrintList(list);
// PrintEnumarable(list);

// PrintList(array);
// PrintEnumarable(array);

// void PrintList(List<int> numbers)
// {
//     foreach (var n in numbers)
//         Console.WriteLine(n);
// }

// void PrintEnumarable(IEnumerable<int> numbers)
// {
//     //  numbers.Add(0);
//     foreach (var n in numbers)
//         Console.WriteLine(n);
// }


var list = new List<int> { 1, 2, 3 };
var array = new int[] { 4, 5, 6 };

// Console.WriteLine(list.Count);
// AddDefaultItem(list);




// void AddDefaultItem(ICollection<int> numbers)
// {
//     numbers.Add(0);
//     Console.WriteLine($"Count: {numbers.Count}");
// }

var basket = new ShoppingBasket();

foreach (var item in basket.Items)
{
    Console.WriteLine(item);
}

Console.WriteLine($"Count: {basket.Items.Count}");

public class ShoppingBasket
{
    private readonly List<string> _items = new()
    {
        "Apple",
        "Banana"
};

    public IReadOnlyCollection<string> Items => _items.AsReadOnly();
}