class CalculatorFunc
{
    public int ComputeAgain(int a, int b, Func<int, int, int> operation)
    {
        return operation(a, b);
    }
}


