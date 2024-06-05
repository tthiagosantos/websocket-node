const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8765 });

server.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.on('message', (message) => {
        console.log(`Mensagem recebida: ${message}`);
        let number = parseInt(message);

        if (isNaN(number)) {
            ws.send('Por favor, envie um número válido.');
            console.log('Mensagem inválida recebida, não é um número.');
            return;
        }

        // Função para enviar contagem de 1 a 10
        const countToTen = (start) => {
            for (let i = 1; i <= 10; i++) {
                setTimeout(() => {
                    const countMessage = start + i;
                    ws.send(countMessage.toString());
                    console.log(`Mensagem enviada: ${countMessage}`);
                }, i * 1000);
            }
        };

        countToTen(number);
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

console.log('Servidor WebSocket está escutando na porta 8765');
