namespace SimpleCAD.Data.Models
{
    public class Shape
    {
        public int Id { get; set; }
        public string? Type { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public int DrawingId { get; set; }
    }
}
