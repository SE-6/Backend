## quick comparison table

| Interface                | Iterate | Count | Add / Remove | Intent                      |
| ------------------------ | :-----: | :---: | :----------: | --------------------------- |
| `IEnumerable<T>`         |    ✓    |   ✗   |      ✗       | Read / stream items         |
| `ICollection<T>`         |    ✓    |   ✓   |      ✓       | Manage a mutable collection |
| `IReadOnlyCollection<T>` |    ✓    |   ✓   |      ✗       | Expose read-only data       |

## Docs

- [IEnumerable&lt;T&gt;](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1)
- [ICollection&lt;T&gt;](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.icollection-1)
- [IReadOnlyCollection&lt;T&gt;](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ireadonlycollection-1)
