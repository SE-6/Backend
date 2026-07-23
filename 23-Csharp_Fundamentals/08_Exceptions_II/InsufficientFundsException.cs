public class InsufficientFundsException : Exception
{
    public decimal Currentbalance { get; }
    public decimal AttemptedWithdrawal { get; }

    public InsufficientFundsException(string message, decimal balance, decimal attempted)
        : base(message)
    {
        Currentbalance = balance;
        AttemptedWithdrawal = attempted;
    }
}