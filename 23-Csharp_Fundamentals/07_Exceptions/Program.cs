// THROW

// var calculator = new Calculator();

// calculator.Divide(10, 0);

// Console.WriteLine("This line will not run");

// HANDLE
// var calc = new Calculator();


// try
// {
//     var result = calc.Divide(10, 5);
//     Console.WriteLine($"Result: {result}");
// }
// catch (DivideByZeroException ex)
// {
//     Console.WriteLine($"Error: {ex.Message}");
// }

// Console.WriteLine("Program continues...");

// --------------------------------------------------------

// try
// {
//     DoSomething();
// }
// catch (Exception ex)
// {
//     Console.WriteLine(ex.Message);
// }

// void DoSomething()
// {
//     throw new Exception("Something went wrong inside DoSomething()");
// }

// IndexOutOfRangeException
// var numbers = new int[] { 1, 2, 3 };
// Console.WriteLine(numbers[5]);

// NullReferenceException
// string name = null;
// Console.WriteLine(name.Length);

// ArgumentException
// SetAge(-10);

// void SetAge(int age)
// {
//     if (age < 0)
//         throw new ArgumentException("Age cannot be negative");
// }

// ArgumentNullException

// string name = null;

// PrintLength(name);

// void PrintLength(string text)
// {
//     if (text == null)
//         throw new ArgumentNullException(nameof(text));
// }

// try
// {
//     Console.WriteLine("Trying something");

// }
// catch (Exception ex)
// {
//     Console.WriteLine(ex.Message);
// }
// finally
// {
//     Console.Write("This always runs");
// }

// MULTIPLE CATCH BLOCKS
// var calc = new Calculator();

// try
// {
//     var result = calc.Divide(1001, 2);
//     Console.WriteLine($"Result: {result}");
// }
// catch (DivideByZeroException ex) // <= the most specific
// {
//     Console.WriteLine($"Cant divide by zero: {ex.Message}");
// }
// catch (ArgumentException ex)
// {
//     Console.WriteLine($"Bad argument: {ex.Message}");
// }
// catch (Exception ex) // catch all
// {
//     Console.WriteLine($"Something else went wrong: {ex.Message}");
// }
// finally
// {
//     Console.WriteLine("I don't care, i will do whatever i want");
// }

// CUSTOM EXCEPTIONS
var account = new BankAccount();

account.Withdraw(101); // fine => account balance is 100
Console.WriteLine("Withdrawal successful");
Console.WriteLine($"Current Balance: {account.Balance}");


try
{
    account.Withdraw(200);
}
catch (InsufficientFundsException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    Console.WriteLine($"Balance={ex.CurrentBalance}, Attempted={ex.AttemptedWithdrawal}");
}
