import net from 'net';
import { type } from 'os';
import { WebSocket, WebSocketServer } from 'ws';

const TCP_PORT = parseInt(process.env.TCP_PORT || '12000', 10);

const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: 8080 });

tcpServer.on('connection', (socket) => {
    console.log('TCP client connected');
    
    socket.on('data', (msg) => {
        console.log("----------------------");
        console.log(msg.toString());

        // HINT: what happens if the JSON in the received message is formatted incorrectly?
        // HINT: see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
        let currJSON: any;
        try {
            currJSON = JSON.parse(msg.toString());
        } catch(error) {
            if (error instanceof SyntaxError) {
                let msgString = msg.toString();
                console.log("msgString is as such: " + msgString);
                // regex code to catch the extra '}' and then replace it
                let msgJSON = msgString.replace(/(\}\s*})/, '}');
                currJSON = JSON.parse(msgJSON);
            }
        }

        // Part 2: safe operating window of 20-80 degrees celcius, Add a feature to the backend streaming service
        // so that each time the received battery temperature exceeds this range more than 3 times in 5 seconds, 
        // the current timestamp is logged to a file named 'incidents.log'.
        
        // Declaring an empty array:
        let msgArray = [];
        console.log("type of currJSON: "+ typeof(currJSON));
        console.log("this is currJSON temp: " + currJSON.battery_temperature);
        console.log("this is currJSON timestamp: " + currJSON.timestamp);


        websocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(currJSON));
            }
          });
    });

    socket.on('end', () => {
        console.log('Closing connection with the TCP client');
    });
    
    socket.on('error', (err) => {
        console.log('TCP client error: ', err);
    });
});

websocketServer.on('listening', () => console.log('Websocket server started'));

websocketServer.on('connection', async (ws: WebSocket) => {
    console.log('Frontend websocket client connected to websocket server');
    ws.on('error', console.error);  
});

tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP server listening on port ${TCP_PORT}`);
});


