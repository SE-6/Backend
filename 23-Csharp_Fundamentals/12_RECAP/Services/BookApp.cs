using System.Data;

public class BookApp
{
    private readonly BookStorage _storage;
    private List<Book> _books;

    // the app is given a storage to use (recap: constructor + collections)
    public BookApp(BookStorage storage)
    {
        _storage = storage;
        _books = _storage.Load(); // load whatever we saved last time
    }

    // the main loop => keeps showing the menu until the user exits
    public void Run()
    {
        var running = true;

        while (running)
        {
            Console.WriteLine("\n--- Reading Tracker ---");
            Console.WriteLine("1) Add a book");
            Console.WriteLine("2) Show all books");
            Console.WriteLine("3) Remove a book");
            Console.WriteLine("4) Report");
            Console.WriteLine("5) Update a book's status");
            Console.WriteLine("5) Save & Exit");
            Console.WriteLine("Choose an option: ");

            string? choice = Console.ReadLine();

            switch (choice)
            {
                case "1": AddBook(); break;
                case "2": ShowBooks(); break;
                case "3": RemoveBook(); break;
                case "4": ShowReport(); break;
                case "5": UpdateStatus(); break;
                case "6":
                    _storage.Save(_books); // save before leaving
                    Console.WriteLine("Saved. Goodbye!");
                    running = false;
                    break;
                default:
                    Console.WriteLine("Unknown option, try again.");
                    break;
            }
        }
    }

    private void AddBook()
    {
        // ask the user for the details
        Console.Write("Title:");
        string title = Console.ReadLine() ?? "";

        Console.Write("Author:");
        string author = Console.ReadLine() ?? "";

        // build the book
        var book = new Book(title, author, ReadingStatus.ToRead);
        _books.Add(book);

        Console.WriteLine($"Added: {book.Title} by {book.Author}");

    }

    private void ShowBooks()
    {
        if (_books.Count == 0)
        {
            Console.WriteLine("No books yet");
            return;
        }

        // print each book with a number, so the user can pick one later (for remove/upate)
        for (int i = 0; i < _books.Count; i++)
        {
            var book = _books[i];
            Console.WriteLine($"{i + 1}) {book.Title} ({book.Author} [{book.Status}])");
        }

    }

    private void RemoveBook()
    {
        // lets show the numbered list first
        ShowBooks();
        if (_books.Count == 0) return;

        Console.Write("Which book number to remove");

        // read the number the user typed
        if (!int.TryParse(Console.ReadLine(), out int number)) // ?
        {
            Console.WriteLine("That's not a valid number");
        }

        int index = number - 1; // convert their 1-based choice to a 0-based index

        // make sure the number actually points to a real book!
        if (index < 0 || index >= _books.Count)
        {
            Console.WriteLine("No book with that number");
            return;
        }

        // remove the book at that position
        var removed = _books[index];
        _books.RemoveAt(index);

        Console.WriteLine($"Removed: {removed.Title}");
    }

    private void ShowReport()
    {
        // count how many books are Finished  WHERE in JS => FILTER
        var finishedCount = _books.Where(b => b.Status == ReadingStatus.Finished).Count();
        Console.WriteLine($"Finished books: {finishedCount}"); // later => list names as well

        // take the "toRead" books, then sort them alphabetically by title! | ORDERBY in JS => SORT
        var toRead = _books
        .Where(b => b.Status == ReadingStatus.ToRead) // keep only "toRead"
        .OrderBy(b => b.Title);                      // sort by title A-Z

        Console.WriteLine("\nStill to read:");
        foreach (var book in toRead)
        {
            Console.WriteLine($"- {book.Title}");
        }

        // grab every author, then drop duplicates | SELECT in JS => MAP
        var authors = _books
        .Select(b => b.Author)  // just the author of each book
        .Distinct();            // remove repeats

        Console.WriteLine("\nAuthors on your shelf:");
        foreach (var author in authors)
        {
            Console.WriteLine($"- {author}");
        }

    }
    // UPDATESTATUS();

    private void UpdateStatus()
    {
        ShowBooks();               // show the numbered list first
        if (_books.Count == 0) return;

        Console.Write("Which book number? ");

        // read and validate the number (same pattern as RemoveBook)
        if (!int.TryParse(Console.ReadLine(), out int number))
        {
            Console.WriteLine("That's not a valid number.");
            return;
        }

        int index = number - 1;
        if (index < 0 || index >= _books.Count)
        {
            Console.WriteLine("No book with that number.");
            return;
        }

        // ask what the new status should be, and map it to the enum
        Console.WriteLine("New status: 1) To read  2) Reading  3) Finished");
        ReadingStatus newStatus = Console.ReadLine() switch
        {
            "2" => ReadingStatus.Reading,
            "3" => ReadingStatus.Finished,
            _ => ReadingStatus.ToRead    // anything else = ToRead
        };

        // records cant be changed in place => so we make a COPY with the new status
        _books[index] = _books[index] with { Status = newStatus };

        Console.WriteLine($"Updated: {_books[index].Title} → [{_books[index].Status}]");
    }
}
