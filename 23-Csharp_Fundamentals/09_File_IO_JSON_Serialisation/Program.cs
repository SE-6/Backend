using System.IO;
using System.Text.Json;

// File.WriteAllText("example.txt", "Hello again!");

// using var writer = new StreamWriter("log.txt", append: true);
// writer.WriteLine($"Log entry at {DateTime.Now}");

// var writerAgain = new StreamWriter("log2.txt", append: true);

// try
// {
//     writerAgain.WriteLine($"Log entry at: {DateTime.Now}");
// }
// finally
// {
//     writerAgain.Dispose();
// }

// string text = File.ReadAllText("example.txt");
// Console.WriteLine(text);

// using var reader = new StreamReader("example.txt");
// string? line;

// while ((line = reader.ReadLine()) != null)
// {
//     Console.WriteLine(line);
// }

// if (File.Exists("example.txt"))
// {
//     Console.WriteLine("File exists");
// }
// else
// {
//     Console.WriteLine("File not found");
// }

// Console.WriteLine("hello! it's me again");

// string folder = "data";
// string fileName = "records.csv";

// if (!Directory.Exists(folder))
// {
//     Directory.CreateDirectory(folder);
// }

// string fullPath = Path.Combine(folder, fileName);

// using var writer = new StreamWriter(fullPath);
// writer.WriteLine("1, Masih");
// writer.WriteLine("2, Jochen");
// writer.WriteLine("3, Andrew");
// writer.WriteLine("4, Yusif");
// writer.WriteLine("5, Moritz");
// writer.WriteLine("6, Leila");
// writer.WriteLine("7, Ali");
// writer.WriteLine("8, Onur");

// Error handling for files
// try
// {
//     string content = File.ReadAllText("config.json");
//     Console.WriteLine(content);
// }
// catch (FileNotFoundException)
// {
//     Console.WriteLine("Config file missing!");
// }
// catch (UnauthorizedAccessException)
// {
//     Console.WriteLine("Access denied. Check permissions!");
// }
// catch (IOException)
// {
//     Console.WriteLine("AN I/O error occurred while accessing the file.");
// }
// catch (Exception ex)
// {
//     Console.WriteLine($"An unexpected error occurred: {ex.Message}");
// }
// finally
// {
//     Console.WriteLine("Hello, it's me again. No matter what, you will see me 🚀");
// }

// JSON Serialisation
// var person = new { Name = "Moritz", Age = 30 };
// Console.WriteLine(person);

// string json = JsonSerializer.Serialize(person);
// Console.WriteLine(json);

var cust = new Customer { Name = "Leila", Age = 30 };


// string custJson = JsonSerializer.Serialize(cust);
// Console.WriteLine(custJson);


// var back = JsonSerializer.Deserialize<Customer>(custJson);
// Console.WriteLine($"{back?.Name} {back?.Age}");


// 1. Object => JSON => FILE
string json = JsonSerializer.Serialize(cust);
File.WriteAllText("customer.json", json);
Console.WriteLine(json);

// 2. FILE => JSON => OBJECT
string jsonIn = File.ReadAllText("customer.json");
var loaded = JsonSerializer.Deserialize<Customer>(jsonIn);

// Console.WriteLine($"{loaded?.Name} {loaded?.Age}");


try
{
    var broken = "{his ius not valid jsson}";
    var result = JsonSerializer.Deserialize<Customer>(broken);
}
catch (JsonException ex)
{
    Console.WriteLine($"Invalid JSON: {ex.Message}");
}


var person = new { Name = "Leila", Age = 30 };


var options = new JsonSerializerOptions { WriteIndented = true };
string preety = JsonSerializer.Serialize(person, options);

Console.WriteLine(preety);