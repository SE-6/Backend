public class YouTuber
{
    public event EventHandler<VideoEventArgs>? Notify;

    public void PublishVideo(string title)
    {
        Console.WriteLine($"YouTuber: Publishing '{title}...'");
        OnNotify(new VideoEventArgs(title));
    }

    protected virtual void OnNotify(VideoEventArgs e)
    {
        Notify?.Invoke(this, e);
    }

}

