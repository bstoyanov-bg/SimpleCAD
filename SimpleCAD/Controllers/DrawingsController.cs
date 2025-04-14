using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleCAD.Data;
using SimpleCAD.Data.Models;

namespace SimpleCAD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrawingsController : ControllerBase
    {
        private readonly CadContext _context;

        public DrawingsController(CadContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Drawing>> GetDrawing(int id)
        {
            var drawing = await _context.Drawings.Include(d => d.Shapes).FirstOrDefaultAsync(d => d.Id == id);
            return drawing != null ? drawing : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Drawing>> SaveDrawing(Drawing drawing)
        {
            _context.Drawings.Add(drawing);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDrawing), new { id = drawing.Id }, drawing);
        }
    }
}
