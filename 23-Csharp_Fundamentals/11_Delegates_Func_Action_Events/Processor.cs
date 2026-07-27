class Processor
{
    public void Process(Action<string> logAction)
    {
        logAction("processing started...");
        // pass another one => SOME WORK
        logAction("processing finished...");
    }
}