
public class Subscriber
{
    public string Name { get; }

    public Subscriber(string name) => Name = name;
    public void onNewVideo(object? sender, VideoEventArgs e)
    {
        Console.WriteLine($"{Name}: New Video published! Title: {e.Title}");
    }

    public void OnNewVideoFromFavorite(object? sender, VideoEventArgs e)
    {
        Console.WriteLine($"{Name}: My favorite YouTuber uploaded '{e.Title}'");
    }
}