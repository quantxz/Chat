const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

let messages = [];
let connections = [];

server.on("connection", (ws) => {
    ws.send("Bem-vindo!");

    // Enviar mensagens existentes para o cliente
    messages.forEach((message) => {
        ws.send(message);
    });

    ws.on("message", (message) => {
        messages.push(message);
        connections.push(ws);        

        // Enviar a nova mensagem para todos os clientes conectados
        connections.forEach((client) => {
            client.send(message);
        });
    });

    ws.on("close", () => {
        console.log("Cliente desconectado.");
    });
});
