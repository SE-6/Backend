// Console.WriteLine("Start");

// Thread.Sleep(3000);

// Console.WriteLine("Doing some other work...");
// Console.WriteLine("End");

// ASYNC
// Console.WriteLine("Ordering Coffee");

// var task = Task.Delay(3000); // start the slow work, but DON'T wait yet!

// Console.WriteLine("Checking phone, looking around");

// await task;

// Console.WriteLine("Coffee is ready");


// ASYNC AWAIT KEYWORDS

// async Task DoWorkAsync()
// {
//     Console.WriteLine("Work started");

//     await Task.Delay(2000);

//     Console.WriteLine("Work finished");
// }

// Console.WriteLine("test");
// await DoWorkAsync();
// Console.WriteLine("test2222");



// async Task SayHelloAsync()
// {
//     Console.WriteLine("Hello");

//     await Task.Delay(2000);

//     Console.WriteLine("World");
// }

// await SayHelloAsync();

// RETURNING a VALUE with Task<T>

// async Task<int> CalculateAsync()
// {
//     Console.WriteLine("thinking...");
//     await Task.Delay(1000);
//     return 30;
// }

// int result = await CalculateAsync();
// Console.WriteLine(result);

// async Task<object> FetchDataAsync(string url)
// {
//     using var client = new HttpClient();
//     var data = await client.GetStringAsync(url);
//     return data;
// }

// var result = await FetchDataAsync("https://fakestoreapi.com/products");
// Console.WriteLine(result);

// Fetching and lowercase to Pascalcase

// using System.Text.Json;

// await FetchProducts();

// async Task FetchProducts()
// {
//     using var client = new HttpClient();

//     var json = await client.GetStringAsync("https://fakestoreapi.com/products");

//     var products = JsonSerializer.Deserialize<List<Products>>(json);

//     if (products != null)
//     {
//         foreach (var product in products)
//         {
//             Console.WriteLine($"{product.Id} - {product.Title}");
//         }
//     }
// }

// record Products(
//     [property: System.Text.Json.Serialization.JsonPropertyName("id")] int Id,
//     [property: System.Text.Json.Serialization.JsonPropertyName("title")] string Title
// );


// async Task<string> FetchDataAsync(string url)
// {
//     using var client = new HttpClient();
//     return await client.GetStringAsync(url);
// }

// try
// {
//     var result = await FetchDataAsync("https://jsonplaceholder.typicode.com/todos/1");
//     Console.WriteLine(result);
// }
// catch (Exception ex)
// {
//     Console.WriteLine($"Error: {ex.Message}");
// }


// async Task<string> FetchAsync(string url)
// {
//     using var client = new HttpClient();
//     return await client.GetStringAsync(url);
// }

// try
// {
//     var tasks = new[]
//     {
//         FetchAsync("https://jsonplaceholder.typicode.com/todos"),
//         FetchAsync("https://fakestoreapi.com/products")
//     };

//     // now we can wait for all of them to finish
//     string[] results = await Task.WhenAll(tasks);

//     Console.Write("Both fetched!");
//     Console.WriteLine(results[0]);
//     Console.WriteLine(results[1]);
// }
// catch (Exception ex)
// {
//     Console.WriteLine($"ERror: {ex.Message}");
// }

using System.Text.Json;

async Task<string> FetchAsync(string url)
{
    using var client = new HttpClient();
    return await client.GetStringAsync(url);
}

try
{
    var tasks = new[]
    {
        FetchAsync("https://jsonplaceholder.typicode.com/todos"),
        FetchAsync("https://jsonplaceholder.typicode.com/posts")
    };

    // now we can wait for all of them to finish
    string[] results = await Task.WhenAll(tasks);

    var options = new JsonSerializerOptions
    {
        PropertyNameCaseInsensitive = true
    };

    var todos = JsonSerializer.Deserialize<List<Todo>>(results[0], options)!;
    var posts = JsonSerializer.Deserialize<List<Post>>(results[1], options)!;

    // NOW we can grab the first item of each
    Console.WriteLine(todos[0]);
    Console.WriteLine(posts[0]);

}
catch (Exception ex)
{
    Console.WriteLine($"ERror: {ex.Message}");
}

record Todo(int Id, string Title);
record Post(int Id, string Title);