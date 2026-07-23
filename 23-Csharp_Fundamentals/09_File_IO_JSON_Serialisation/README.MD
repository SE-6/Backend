## The big picture

- **File I/O** lets data **persist** — survive after the program ends
- **JSON serialisation** converts objects <=> text, so they can be saved or sent
- Together: **object → JSON → file**, and back

## Quick ref

| Task                | Code                                                 |
| ------------------- | ---------------------------------------------------- |
| Write a file        | `File.WriteAllText(path, text)`                      |
| Read a file         | `File.ReadAllText(path)`                             |
| Append line by line | `using var w = new StreamWriter(path, append: true)` |
| Check a file exists | `File.Exists(path)`                                  |
| Build a path        | `Path.Combine(folder, file)`                         |
| Create a folder     | `Directory.CreateDirectory(folder)`                  |
| Object → JSON       | `JsonSerializer.Serialize(obj)`                      |
| JSON → object       | `JsonSerializer.Deserialize<T>(json)`                |
| Pretty JSON         | `new JsonSerializerOptions { WriteIndented = true }` |
