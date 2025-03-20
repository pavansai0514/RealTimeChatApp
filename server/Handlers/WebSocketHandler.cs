using System.Net.WebSockets;
using System.Text;
using System.Threading;

public class WebSocketHandler
{
    private static readonly Dictionary<string, WebSocket> Clients = new();

    public async Task HandleWebSocketAsync(HttpContext context, WebSocket webSocket)
    {
        // Extract username from query parameters
        var username = context.Request.Query["username"].ToString();
        if (string.IsNullOrEmpty(username))
        {
            context.Response.StatusCode = 400;
            return;
        }

        Clients[username] = webSocket; // Store WebSocket connection
        Console.WriteLine($"{username} connected.");

        while (webSocket.State == WebSocketState.Open)
        {
            var buffer = new byte[1024 * 4];
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            if (result.MessageType == WebSocketMessageType.Text)
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                
                // Message format: "TO:receiver:message"
                if (message.StartsWith("TO:"))
                {
                    var parts = message.Split(':', 3);
                    if (parts.Length == 3)
                    {
                        var receiver = parts[1];
                        var msgContent = parts[2];
                        await SendPrivateMessage(username, receiver, msgContent);
                    }
                }
            }
            else if (result.MessageType == WebSocketMessageType.Close)
            {
                Clients.Remove(username);
                await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed", CancellationToken.None);
                Console.WriteLine($"{username} disconnected.");
            }
        }
    }

    private async Task SendPrivateMessage(string sender, string receiver, string message)
    {
        if (Clients.TryGetValue(receiver, out WebSocket? receiverSocket))
        {
            var formattedMessage = $"{sender}:{message}";
            var data = Encoding.UTF8.GetBytes(formattedMessage);
            await receiverSocket.SendAsync(new ArraySegment<byte>(data), WebSocketMessageType.Text, true, CancellationToken.None);
        }
    }
}
