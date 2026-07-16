public class Trainticket : Ticket
{
    public string Destination { get; set; }

    public Trainticket(string holder, decimal price, string destination)
        : base(holder, price)
    {
        Destination = destination;
    }

    public void PrintTrainInfo()
    {
        Console.WriteLine(
            $"Train ticket for {Holder}, Destination: {Destination}, Price: {Price}"
        );
    }
}