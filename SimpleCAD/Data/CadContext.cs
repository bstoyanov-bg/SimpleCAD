using Microsoft.EntityFrameworkCore;
using SimpleCAD.Data.Models;

namespace SimpleCAD.Data
{
    public class CadContext : DbContext
    {
        public DbSet<Drawing> Drawings { get; set; }
        public DbSet<Shape> Shapes { get; set; }

        public CadContext(DbContextOptions<CadContext> options) : base(options) { }
    }
}
