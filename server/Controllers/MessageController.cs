using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using System.Threading.Tasks;
using System.Linq;

[ApiController]
[Route("api/messages")]
public class MessageController : ControllerBase
{
    private readonly AppDbContext _db;

    public MessageController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet("{user1}/{user2}")]
    public async Task<IActionResult> GetMessages(string user1, string user2)
    {
        var messages = await _db.Messages
            .Where(m => (m.Sender == user1 && m.Receiver == user2) || (m.Sender == user2 && m.Receiver == user1))
            .OrderBy(m => m.Timestamp)
            .ToListAsync();
        return Ok(messages);
    }
}
