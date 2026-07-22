## .NET already gives you many exception types

[Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/standard/exceptions/#common-exceptions)

Before writing your own, check if one of these already fits:

| Exception                     | When it happens                                 |
| ----------------------------- | ----------------------------------------------- |
| `Exception`                   | the base class — all exceptions inherit from it |
| `IndexOutOfRangeException`    | you access an index that doesn't exist          |
| `NullReferenceException`      | you use an object that is `null`                |
| `InvalidOperationException`   | the operation isn't valid for the current state |
| `ArgumentException`           | an argument is invalid                          |
| `ArgumentNullException`       | an argument is `null` but shouldn't be          |
| `ArgumentOutOfRangeException` | an argument is outside the allowed range        |

- **Throwing** passes responsibility to the caller — _"I can't fix this here."_
- **Handling** contains the error and avoids a crash — _"I know what to do."_
- **Custom exceptions** describe domain-specific errors clearly.

> 🧠 **Throw where you detect the problem. Handle where you can recover.**

## Quick ref

| Situation                                     | What to do                                    |
| --------------------------------------------- | --------------------------------------------- |
| Method gets invalid input it can't work with  | `throw`                                       |
| You can show a message / retry / fall back    | `try` / `catch`                               |
| A built-in exception already says it clearly  | use the built-in one                          |
| The error is specific to your app's domain    | write a custom exception                      |
| Normal, expected outcome (empty result, etc.) | ❌ not an exception — just handle it normally |

</details>
