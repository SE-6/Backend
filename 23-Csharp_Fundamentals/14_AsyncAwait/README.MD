| TypeScript           | C#                  |
| -------------------- | ------------------- |
| `async function`     | `async Task` method |
| `Promise<T>`         | `Task<T>`           |
| `await`              | `await`             |
| `try / catch`        | `try / catch`       |
| `Promise.all([...])` | `Task.WhenAll(...)` |

- **`async`** marks a method asynchronous (and lets it use `await`)
- **`await`** waits for a task **without blocking the thread**
- **`Task`** = future work, no result. **`Task<T>`** = future work that returns a `T`
- **`await` pauses the _method_, not the _thread_** — the key idea
