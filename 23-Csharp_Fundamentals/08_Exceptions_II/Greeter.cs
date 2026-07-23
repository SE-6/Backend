public class Greeter
{
    public void Greet(string name)
    {
        if (name == null)
        {
            throw new ArgumentNullException(nameof(name), "Name cannot be null");
        }

        Console.WriteLine($"Hello, {name}!");
    }
}