using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;


namespace server.Services
{
    public class MessageService
    {
        private readonly AppDbContext _context;

        public MessageService(AppDbContext context)
        {
            _context = context;
        }

        public async Task SaveMessageAsync(Message message)
        {
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Message>> GetMessagesByUserAsync(string username)
        {
            return await _context.Messages
                .Where(m => m.Sender == username || m.Receiver == username)
                .OrderBy(m => m.Timestamp)
                .ToListAsync();
        }
    }
}
