**ASP.NET**: is a framework for **building web apps and Web APIs with C#.**.

### Mapping it to what you know (Node/Express)

| Node.js world           | .NET world                  |
| ----------------------- | --------------------------- |
| Node.js (runtime)       | .NET (runtime + libraries)  |
| TypeScript (language)   | C# (language)               |
| Express (web framework) | **ASP.NET** (web framework) |

> ASP.NET plays the same role as Express => it's the web framework, just in the C# world.

### What changes from now on?

| Before (console)          | Now (web)                                 |
| ------------------------- | ----------------------------------------- |
| `dotnet new console`      | `dotnet new web`                          |
| runs once, then exits     | keeps running, waiting for requests       |
| input/output via terminal | listens for HTTP requests                 |
| —                         | exposes endpoints like `/users`, `/posts` |

> The big mental shift: a web app **doesn't exit**. It starts up and then sits there,
> listening for HTTP requests, responding to each one, until you stop it.

### Built-in middleware

| Middleware            | Job                              |
| --------------------- | -------------------------------- |
| `UseRouting`          | matches requests to endpoints    |
| `UseAuthentication`   | checks who you are               |
| `UseAuthorization`    | checks what you're allowed to do |
| `UseStaticFiles`      | serves CSS, JS, images           |
| `UseExceptionHandler` | handles errors globally          |

### HTTP

| You want               | Use                                |
| ---------------------- | ---------------------------------- |
| 200 + JSON body        | `Results.Ok(value)`                |
| 201 + Location + body  | `Results.Created(location, value)` |
| A specific status only | `Results.StatusCode(code)`         |
| An error response      | `Results.Problem(statusCode: 404)` |

> `Results.Created` needs **two** arguments: the location string and the value.
