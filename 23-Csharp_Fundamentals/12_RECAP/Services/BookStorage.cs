using System.Text.Json;

public class BookStorage
{
    private readonly string _filePath;

    public BookStorage(string filePath)
    {
        _filePath = filePath;

        string? folder = Path.GetDirectoryName(filePath);
        if (folder != null && !Directory.Exists(folder))
        {
            Directory.CreateDirectory(folder);
        }
    }

    // object list => JSON => FILE
    public void Save(List<Book> books)
    {
        {
            var options = new JsonSerializerOptions { WriteIndented = true };

            // turn the list of books into a JSON string
            string json = JsonSerializer.Serialize(books, options);

            // write taht string to the file (creates or overwrites it) => LATER => DB QUERY
            File.WriteAllText(_filePath, json);
        }
    }

    // file => JSON => OBJECT LIST, WITH ERROR HANDLING
    public List<Book> Load()
    {
        // first run? no file yet? => just start with an empty list
        if (!File.Exists(_filePath))
        {
            return new List<Book>();
        }

        try
        {
            // read the whole file as text
            string json = File.ReadAllText(_filePath);

            // turn that JSON text back into a list of books
            var books = JsonSerializer.Deserialize<List<Book>>(json);

            return books ?? new List<Book>();
        }
        catch (JsonException)
        {
            // the file exists but its contents aren't valid JSON
            Console.WriteLine("Warning: Books file is corrupted. Starting fresh...");
            return new List<Book>();
        }
        catch (IOException ex)
        {
            // something went wrong reading the file (locked, permissions, etc.)
            Console.WriteLine($"Could not read the file: {ex.Message}");
            return new List<Book>();
        }
    }
}