public class BankAccount
{
    private decimal _balance; // private field
    public string? Owner { get; } // read only property

    // constructor
    public BankAccount(string owner, decimal initialBalance)
    {
        Owner = owner;
        _balance = initialBalance;
    }

    public void Deposit(decimal amount) // method
    {
        if (amount <= 0)
        {
            Console.WriteLine("Invalid ammount");
            return;
        }

        _balance += amount;
    }

    public decimal GetBalance() // method
    {
        return _balance;
    }

}