public class Animal
{
    // property
    public string Name { get; set; }

    // constructor
    public Animal(string name)
    {
        Name = name;
    }

    // method / behaivour
    public void Eat()
    {
        Console.WriteLine($"{Name} is eating");
    }

    // method / behaivour
    public void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping");
    }
}