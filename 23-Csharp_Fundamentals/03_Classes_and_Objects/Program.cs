// Car toyota = new Car();
// toyota.Brand = "Toyota";
// toyota.Drive();

// Car bmw = new Car();
// bmw.Brand = "BMW";
// bmw.Drive();

// // Car something = new Car();
// // something.Drive();

// public class Car
// {
//     // data (property)
//     public string? Brand { get; set; }
//     // public string? Brand { get; set; } = "Trabant";

//     private void StartEngine()
//     {
//         Console.WriteLine("Engine started...");
//     }

//     // behaviour (method)
//     public void Drive()
//     {
//         StartEngine();
//         Console.WriteLine($"{Brand} is driviing");
//     }

// }

// var person1 = new Person("Andrew");
// var person2 = new Person("Ali");
// var person3 = new Person("Masih");

// Console.WriteLine(person1.Name);
// Console.WriteLine(person2.Name);

// person1.Name = "Something else";

// public class Person
// {
//     public string Name { get; set; }

//     public Person(string name)
//     {
//         Name = name;
//     }
// }


// var box = new SecretBox();
// box.Code = "1234";
// Console.WriteLine(box.Code);

// public class SecretBox
// {
//     // private field: internal storage
//     private string _code = "0000";

//     // property with get and set
//     public string Code
//     {
//         get
//         {
//             return _code;
//         }
//         set
//         {
//             if (value.Length != 4)
//             {
//                 Console.WriteLine("Invalid Code");
//                 return;
//             }
//             _code = value;
//         }
//     }

// }

// string owner1 = "Leila";
// decimal balance1 = 71239812793;


// string owner2 = "Jochen";
// decimal balance2 = 71239812793;


var leila = new BankAccount("Leila", 1000);
var jochen = new BankAccount("Jochen", 1000);

// leila.Balance = -999999;

leila.Deposit(200); // the only allowed way in
Console.WriteLine(leila.Balance);

jochen.Deposit(250);
Console.WriteLine(jochen.Balance);