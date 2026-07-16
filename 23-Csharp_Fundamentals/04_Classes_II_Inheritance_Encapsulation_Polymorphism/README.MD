### What is inherited and what can be overridden?

> not everything in a base class can be overridden in a derived class.

- When a class inherits from another class:
  - some members are automatically inherited
  - only specific members can be overridden

## Overview

| Feature                    | Inherited        | Overridable        |
| -------------------------- | ---------------- | ------------------ |
| Fields & auto-properties   | Yes              | No (can be hidden) |
| Methods (non-virtual)      | Yes              | No                 |
| Methods (virtual/abstract) | Yes              | Yes (`override`)   |
| Constructors               | No               | —                  |
| Events & indexers          | Yes              | Yes (if `virtual`) |
| Static members             | Yes (accessible) | No                 |

> Only `virtual` or `abstract` members can be overridden in derived classes.

- About Virtual:
  - by default, methods in a base class cannot be overridden.
  - If we want a derived class to provide its own version of a method,
  - we must mark that method as virtual in the base class.
