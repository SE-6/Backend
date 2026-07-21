## The big picture

- LINQ works on anything that is `IEnumerable<T>` (lists, arrays, dictionaries...)
- It's just **extension methods**

| Operation       | LINQ                 | JS equivalent |
| --------------- | -------------------- | ------------- |
| Filter          | `Where`              | `filter`      |
| Transform       | `Select`             | `map`         |
| Flatten         | `SelectMany`         | `flatMap`     |
| Sort            | `OrderBy` / `ThenBy` | `sort`        |
| Limit           | `Take`               | `slice`       |
| Combine 2 lists | `Zip`, `Join`        | —             |
| Group           | `GroupBy`            | —             |
