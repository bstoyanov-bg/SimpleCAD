namespace SimpleCAD.Models
{
    public class Drawing
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<Shape>? Shapes { get; set; }
    }
}
