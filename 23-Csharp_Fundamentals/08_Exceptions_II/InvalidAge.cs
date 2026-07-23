public class InvalidAge : Exception
{
    public int ProvidedAge { get; }

    public InvalidAge(string message, int providedAge)
    : base(message)
    {
        ProvidedAge = providedAge;
    }
}