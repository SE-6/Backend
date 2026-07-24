public class Student
{
    public string Id { get; set; }
    public string Name { get; set; }
    public int Month { get; private set; }

    public Student(string id, string name, int month)
    {
        Id = id;
        Name = name;
        Month = month;
    }

    public void Promote() => Month++;
}