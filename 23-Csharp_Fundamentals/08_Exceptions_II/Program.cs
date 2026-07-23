var calc = new Calculator();
var greeter = new Greeter();
var account = new BankAccount();



// calc.Divide(10, 0);
// greeter.Greet(null);
// account.Withdraw(101);

// try
// {
//     var result = calc.Divide(10, 0);
//     Console.WriteLine(result);
// }
// catch (DivideByZeroException ex)
// {
//     Console.WriteLine($"Error: {ex.Message}");
// }

// try
// {
//     greeter.Greet(null);
// }
// catch (ArgumentNullException ex)
// {
//     Console.WriteLine($"Error: {ex.Message}");
// }

// try
// {
//     account.Withdraw(101);
// }
// catch (InsufficientFundsException ex)
// {
//     Console.WriteLine($"Error: {ex.Message}");
//     Console.WriteLine($"Balance: {ex.Currentbalance}, Attmpted: {ex.AttemptedWithdrawal}");
// }


try
{
    var user = new User("Masih", 121);
    Console.WriteLine($"Created User: {user.Name}");
}
catch (InvalidAge ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    Console.WriteLine($"You provided: {ex.Message}");
}


Console.WriteLine("test");