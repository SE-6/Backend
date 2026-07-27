var calc = new Calculator();
var calcNew = new CalculatorFunc();
var engine = new PriceEngine();
var processor = new Processor();
var masihZustand = new YouTuber();

var listener1 = new Subscriber("Andrew");
var listener2 = new Subscriber("Onur");
var listener3 = new Subscriber("Jochen");
var listener4 = new Subscriber("Ali");
var listener5 = new Subscriber("Leila");
var listener6 = new Subscriber("Moritz");
var listener7 = new Subscriber("Yusif");


// SUBSCRIBE += adds a listner
masihZustand.Notify += listener1.onNewVideo;
masihZustand.Notify += listener2.OnNewVideoFromFavorite;
masihZustand.Notify += listener3.onNewVideo;
masihZustand.Notify += listener4.OnNewVideoFromFavorite;
masihZustand.Notify += listener5.onNewVideo;
masihZustand.Notify += listener6.OnNewVideoFromFavorite;
masihZustand.Notify += listener7.OnNewVideoFromFavorite;

// RAISE THE EVENT => ALL subscribers react
masihZustand.PublishVideo("Top 10 React-Zustand Tips");

// UNSUBSCRIBE
masihZustand.Notify -= listener2.OnNewVideoFromFavorite;

// RAISE THE EVENT AGAIN => only the REMAINING subscriber reacts
masihZustand.PublishVideo("Advanced Event Handling in C#");



Func<decimal, decimal> halfOff = p => p / 2;
Func<decimal, decimal> addTax = p => p * 1.2m;
Func<decimal, decimal> noDiscount = p => p;

// log to the console
// processor.Process(msg => Console.WriteLine($"Console: {msg}"));
// processor.Process(msg => File.AppendAllText("log.txt", msg + "\n"));

// Console.WriteLine(calc.Compute(3, 4, MathService.Add)); // 7
// Console.WriteLine(calc.Compute(3, 4, MathService.Multiply));// 12
// Console.WriteLine(calcNew.ComputeAgain(3, 4, MathService.Multiply));// 12

// Console.WriteLine(engine.CalculatePrice(100, halfOff));
// Console.WriteLine(engine.CalculatePrice(100, addTax));
// Console.WriteLine(engine.CalculatePrice(100, noDiscount));

