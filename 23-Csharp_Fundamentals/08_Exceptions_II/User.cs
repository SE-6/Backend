public class User
{
    public string Name { get; } = string.Empty;
    public int Age { get; }

    public User(string name, int age)
    {
        if (age < 0 || age > 120)
        {
            throw new InvalidAge
            ($"Age {age} is not valid. Must be between 0 and 120 age", age);
        }

        Name = name;
        Age = age;
    }

}