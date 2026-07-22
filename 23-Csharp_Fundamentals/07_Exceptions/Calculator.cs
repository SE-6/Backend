public class Calculator
{
    public int Divide(int a, int b)
    {
        if (b == 0)
        {
            throw new DivideByZeroException("You tried to divide by zero");
        }

        if (a < 0)
        {
            throw new ArgumentException("Number cannot be negative");
        }

        if (a > 1000)
        {
            throw new InvalidOperationException("number is too large to process");
        }

        return a / b;
    }
}