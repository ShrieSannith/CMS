const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', message => {
    console.log('Received message:', message);
  });
});

// Example function to broadcast updates
const broadcastCallUpdate = (update) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(update));
    }
  });
};
