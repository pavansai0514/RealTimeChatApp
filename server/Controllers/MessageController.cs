



using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using  server.Services;
using server.Data;

namespace server.Controllers
{
    
    [Route("api/messages")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly MessageService _messageService;

     private readonly AppDbContext _context;

        // ✅ Inject both AppDbContext and MessageService
        public MessageController(AppDbContext context, MessageService messageService)
        {
            _context = context;
            _messageService= messageService;
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveMessages([FromBody] List<Message> messages)
        {
            if (messages == null || messages.Count == 0)
                return BadRequest("No messages to save.");

            await _context.Messages.AddRangeAsync(messages);
            await _context.SaveChangesAsync();

            return Ok("Messages saved successfully.");
        }
        [HttpGet("user/{username}")]
        public async Task<ActionResult<List<Message>>> GetUserMessages(string username)
        {
            var messages = await _messageService.GetMessagesByUserAsync(username);
            return Ok(messages);
        }
    }
}
