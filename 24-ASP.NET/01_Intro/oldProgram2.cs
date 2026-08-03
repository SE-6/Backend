// // Users
// app.MapGet("/users", () => new[] { "Ali", "Jochen" });
// app.MapGet("/users/{id}", (int id) => $"User {id}");
// // app.MapPost("/users", (UserRequestDTO user) => $"Created user {user.Name}");


// // Posts
// app.MapGet("/posts", () => new[] { "Post 1", "Post 2" });
// app.MapGet("/posts/{id}", (int id) => $"Post {id}");
// app.MapGet("/posts/search", (string term) => $"You searched for:{term}");
// // app.MapPost("/posts", (PostRequestDTO post) => $"Created post {post.Title}");

// app.MapGet("/json", () => new { Name = "John", Role = "Student" });



// // later => HTTP Context
// app.MapPost("/users",
// (UserRequestDTO user, HttpContext context) =>
// {
//     string? userAgent =
//         context.Request.Headers.UserAgent;
//     Console.WriteLine($"{context.Request.Body}");

//     // ReadFromJSON

//     return Results.Created(
//         "/users/1", new { user.Name, UserAgent = userAgent }

//     );
// });


// app.MapPost("/posts", async (HttpContext context) =>
// {
//     var user =
//         await context.Request.ReadFromJsonAsync<PostRequestDTO>();


//     return Results.Created(
//         "/posts/1",
//         new { User = user }
//     );
// });

