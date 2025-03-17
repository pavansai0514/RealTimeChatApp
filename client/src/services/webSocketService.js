let socket;

export function connectWebSocket(username, onMessage) {
  socket = new WebSocket(`ws://localhost:5000/ws?username=${username}`);

  socket.onopen = () => console.log("Connected to WebSocket");
  socket.onmessage = (event) => onMessage(event.data);
  socket.onclose = () => console.log("Disconnected from WebSocket");
}

export function sendPrivateMessage(receiver, message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(`TO:${receiver}:${message}`);
  }
}
