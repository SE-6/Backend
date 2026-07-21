var products = new List<Product>
{
    new Product { Name = "Mug",        Category = "Kitchen", Price = 6.50m,  InStock = true  },
    new Product { Name = "Notebook",   Category = "Stationery", Price = 3.20m, InStock = true  },
    new Product { Name = "Pen",        Category = "Stationery", Price = 1.80m, InStock = false },
    new Product { Name = "Tea Kettle", Category = "Kitchen", Price = 24.90m, InStock = true  },
    new Product { Name = "Lamp",       Category = "Home", Price = 18.00m, InStock = false }
};

var students = new List<Student>
{
    new Student {Name = "Andrew", Subjects = new() {"Math", "Physics"}},
    new Student {Name = "Yusif", Subjects = new() {"History"}},
    new Student {Name = "Leila", Subjects = new() {"Literature"}},
    new Student {Name = "Ali", Subjects= new() {"Biology"}},
    new Student {Name = "Masih", Subjects= new() {"ZUSTAND"}},
    new Student {Name = "Onur", Subjects= new() {"Flying with Ella Lavinia"}}
};

var poeple = new List<Person>
{
    new Person{Id = 1, Name = "Andrew"},
    new Person{Id = 2, Name = "Yusif"},
    new Person{Id = 3, Name = "Leila"},
    new Person{Id = 4, Name = "Ali"},
    new Person{Id = 5, Name = "Masih"},
    new Person{Id = 6, Name = "Onur"},
};


var enrollments = new List<Enrollment>
{
    new Enrollment {StudentId = 1, Course = "Math"},
    new Enrollment {StudentId = 2, Course = "History"},
    new Enrollment {StudentId = 3, Course = "Literature"},
    new Enrollment {StudentId = 4, Course = "Biology"},
    new Enrollment {StudentId = 5, Course = "Zustand"},
    new Enrollment {StudentId = 6, Course = "Aviation"},
};


// WHERE
// var numbers = new List<int> { 1, 2, 3 };
// var evens = numbers.Where(n => n % 2 == 0);

// var inStock = products.Where(p => p.InStock);

// var inStockStationery = products.Where(p => p.Category == "Stationery" && p.InStock);


// foreach (var p in inStockStationery)
// {
//     Console.WriteLine($"{p.Name} {p.Price} €");
// }

// SELECT
// var doubled = numbers.Select(n => n * 2);

// var names = products.Select(p => p.Name);

// var display = products.Select(p => new
// {
//     p.Name,
//     PriceWithVat = p.Price * 1.20m
// });


// foreach (var n in display)
// {
//     Console.WriteLine(n);
// }

// ORDERING
// var byPrice = products.OrderBy(p => p.Price);

// var expensiveFirst = products.OrderByDescending(p => p.Price);

// // first by category, then by price within each category
// var byCategoryAndThenPrice = products
//     .OrderBy(p => p.Category) // the main sort
//     .ThenBy(p => p.Price);    // tie-breaker within the same category


// foreach (var p in byCategoryAndThenPrice)
// {
//     Console.WriteLine($"{p.Category} - {p.Name} {p.Price}€");
// }

// CHAINING

// var topKitchenNames = products
// .Where(p => p.Category == "Kitchen" && p.InStock)   // filter
// .OrderByDescending(p => p.Price)                    // sort
// .Select(p => p.Name)                                // shape
// .Take(1);                                           // limit

// foreach (var name in topKitchenNames)
// {
//     Console.WriteLine(name);
// }

// Deferred Execution?
// var numbers = new List<int> { 1, 2, 3 };
// var query = numbers.Where(n => n > 1);

// numbers.Add(4); // we change the source AFTER writing the query

// foreach (var n in query) // <= the query runs HERE, now!
// {
//     Console.WriteLine(n); // 2,3,4 <= NOTICE: 4 is included!
// }

// var query2 = numbers.Where(n => n > 1).ToList(); // runs NOW!

// numbers.Add(4); // too late => the query already ran in 81!

// foreach (var n in query2)
// {
//     Console.WriteLine(n);
// }

// MORE PROJECTIONS => SELECT MANY & ZIP
// SELECT MANY 
// var allSubjects = students.SelectMany(s => s.Subjects);

// foreach (var subj in allSubjects)
// {
//     Console.WriteLine(subj);
// }


// ZIP
// var numbers = new List<int> { 1, 2, 3 };
// var words = new List<string> { "one", "two", "three" };

// var zipped = numbers.Zip(words, (n, w) => $"{n} = {w}");

// foreach (var z in zipped)
// {
//     Console.WriteLine(z);
// }

// JOIN
var studentCourses = poeple.Join(
    enrollments,                        // the second list
    s => s.Id,                          // key from students
    e => e.StudentId,                   // key from enrollments
    (s, e) => new { s.Name, e.Course }  // what the real result looks like
);

// foreach (var sc in studentCourses)
// {
//     Console.WriteLine($"{sc.Name} => {sc.Course}");
// }

// GROUP BY
var grouped = enrollments.GroupBy(e => e.StudentId);

foreach (var group in grouped)
{
    Console.WriteLine($"Student ID: {group.Key}");  // the key of this bucket

    foreach (var e in group)
    {
        Console.WriteLine($" {e.Course}");
    }
}