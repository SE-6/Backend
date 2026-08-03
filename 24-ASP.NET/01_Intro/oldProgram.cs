// var builder = WebApplication.CreateBuilder(args);

// var appName = builder.Configuration["AppName"] ?? "Default App";
// var greting = builder.Configuration["Greeting"] ?? "Hi";


// var app = builder.Build();

// app.Use(async (context, next) =>
// {
//     Console.WriteLine($"Handling request: {context.Request.Path}");

//     await next();

//     Console.WriteLine("Finished handling request");
// });

// app.UseStaticFiles();
// // app.UseRouting();



// app.Use(async (context, next) =>
// {
//     if (context.Request.Path == "/forbidden")
//     {
//         context.Response.StatusCode = 403;
//         await context.Response.WriteAsync("Forbidden");
//     }
//     else
//     {
//         await next();
//     }
// });


// app.MapGet("/", () => "Hello World!"); // matches, responds, pipeline stops going forward
// app.MapGet("/config", () => $"{appName} says: {greting}");


// app.Run();
