using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using server.Data;

public class ChatHub : Hub
{
    private readonly AppDbContext _db;

    // Dictionary to track connected users by their connection ID
    private static readonly ConcurrentDictionary<string, string> _connectedUsers = new();

    public ChatHub(AppDbContext db)
    {
        _db = db;
    }

    public async Task UserConnected(string username)
    {
        _connectedUsers[Context.ConnectionId] = username;

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user != null)
        {
            user.IsOnline = true;
            await _db.SaveChangesAsync();
            await Clients.All.SendAsync("User StatusChanged", username, true);
        }
    }

    public async Task UserDisconnected(string username)
    {
        if (!string.IsNullOrEmpty(username))
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user != null)
            {
                user.IsOnline = false;
                await _db.SaveChangesAsync();
                await Clients.All.SendAsync("User StatusChanged", username, false);
            }
        }
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        if (_connectedUsers.TryRemove(Context.ConnectionId, out var username))
        {
            await UserDisconnected(username);
        }

        await base.OnDisconnectedAsync(exception);
    }
}