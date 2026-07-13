// worth to take a look: https://typescript-is-like-csharp.chrlschn.dev/

// VARIABLES
int counter;        // declaration
counter = 10;       // assignment with type

// or
int number = 10;

int number = 10;
var number2 = 15;

Console.WriteLine(counter);
Console.WriteLine(number);
Console.WriteLine(number2.GetType());
Console.WriteLine(number2.GetType().Name);

string name = "Yusif"; // we declare

var name2 = "Andrew"; // compiler infers

var city = "Berlin";  // type inferred as string

float t = 36.6F;
double p = 9.99D;

Console.WriteLine(t); // only marks as float
Console.WriteLine(p); // only marks as double

// Arithmetic Operators

int a = 10;
int b = 3;

Console.WriteLine(a + b); // 13
Console.WriteLine(a - b); // 7
Console.WriteLine(a * b); // 30
Console.WriteLine(a / b); // 3   (integer division)
Console.WriteLine(a % b); // 1


// Comparison Operators
int x = 5;
int y = 10;

Console.WriteLine(x == y); // false
Console.WriteLine(x < y); // true
Console.WriteLine(x > y); // false,
Console.WriteLine(x != y); // true => not equal to
Console.WriteLine(x >= 5); // true

// Logical Operators
bool isAdult = true;
bool hasTicket = false;

Console.WriteLine(isAdult && hasTicket); // false
Console.WriteLine(isAdult || hasTicket); // true
Console.WriteLine(!isAdult);             // false

// Assignment Operators

int counter = 10; // set

counter += 5; // 15 => add to
counter -= 3; // 7 => subtract from
counter *= 2; // 20 => multiply by
counter /= 5; // 2 => divide by

Console.WriteLine(counter);

// WRAP-UP
string user = "Ali";
int x = 7;
int y = 4;
int sum = x + y;
double bigNumber = 1e6; // scientific notation

Console.WriteLine($"Hello {user}, {x} + {y} = {sum}, bigNumber = {bigNumber}");

// CONDITIONALS
int age = 20;

if (age >= 18)
{
    Console.WriteLine("You are an adult.");
}
else
{
    Console.WriteLine("You are underage.");
}

if (age < 13)
{
    Console.WriteLine("Child");
}
else if (age < 20)
{
    Console.WriteLine("Teenager");
}
else
{
    Console.WriteLine("Adult");
}

int number = 7;

// Check if the number is even or odd using the modulo operator (%)
// % gives the remainder of a division

// If the remaining of number divided by 2 is 0, the number is even
// Otherwise, the condition is false → "Odd" is assigned

string evenOrOdd = (number % 2 == 0) ? "Even" : "Odd";

// Print the result using string interpolation
Console.WriteLine($"{number} is {evenOrOdd}");

string grade = "B";

switch (grade)
{
    case "A":
        Console.WriteLine("Excellent!");
        break;
    case "B":
        Console.WriteLine("Good");
        break;
    case "C":
        Console.WriteLine("Average");
        break;
    default:
        Console.WriteLine("Needs improvement");
        break;
}

string grade = "B";

string message = grade switch
{
    "A" => "Excellent!",
    "B" => "Good",
    "C" => "Average",
    _ => "Needs improvement"
};

Console.WriteLine(message);

// LOOPS

// while loop repeats code as long as the condition is true
// like checking the weather: while it is raining, you stay inside
// and you don’t know how long it will last.


int count = 0;

while (count < 5)
{
    Console.WriteLine($"Count is {count}");
    count++;
}


// Do..While Loop
// A do..while loop always executes the code block at least once
// The condition is checked AFTER the first execution

int i = 0;
string result = "";

do
{
    // Increment i before using it
    i++;

    // Append the current value of i to the result string
    result += i + " ";
}
while (i < 0); // Condition is false, but the loop already ran once

// Output: "1 "
Console.WriteLine(result);

// `for loop` is best when you know how many times to repeat something.

// like counting steps: walk 10 steps
// you know the number before you start.


for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"Iteration {i}");
}


// break => exits the loop immediately
// continue => skips the current iteration

for (int i = 0; i < 10; i++)
{
    // If i is equal to 3
    if (i == 3)
    {
        // Skip this iteration and continue with the next value of i
        continue;
    }

    // If i is equal to 7
    if (i == 7)
    {
        // Exit the loop completely
        break;
    }

    // Print the current value of i
    Console.WriteLine(i);
}