import net from 'net';
import { WebSocket, WebSocketServer } from 'ws';
import fs from 'fs'; // Import the fs module

const TCP_PORT = parseInt(process.env.TCP_PORT || '12000', 10);
const maxSafeTemp = 80;
const minSafeTemp = 20;

const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: 8080 });

let temperatureIncidents: any[] = [];
let incidentTimer: any = null;

tcpServer.on('connection', (socket) => {
  console.log('TCP client connected');

  socket.on('data', (msg) => {
    console.log('----------------------');
    console.log(msg.toString());

    // HINT: what happens if the JSON in the received message is formatted incorrectly?
    // HINT: see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
    let currJSON: any;
    try {
      currJSON = JSON.parse(msg.toString());
    } catch (error) {
      if (error instanceof SyntaxError) {
        const msgString = msg.toString();
        // regex code to catch the extra '}' and then replace it
        const msgJSON = msgString.replace(/(\}\s*})/, '}');
        currJSON = JSON.parse(msgJSON);
      };
    };

    // Part 2: safe operating window of 20-80 degrees celcius, Add a feature to the backend streaming service
    // so that each time the received battery temperature exceeds this range more than 3 times in 5 seconds,
    // the current timestamp is logged to a file named 'incidents.log'.

    if (currJSON.battery_temperature > maxSafeTemp || currJSON.battery_temperature < minSafeTemp) {
      temperatureIncidents.push(currJSON.timestamp);
      console.log(`${currJSON.timestamp} has been added to: ` + temperatureIncidents);
      clearTimeout(incidentTimer);
      incidentTimer = setTimeout(() => {
        if (temperatureIncidents.length >= 3) {
          // Log in incidents in file name incidents.log
          const msgLog = Math.floor(Date.now() / 1000) + ': ' + temperatureIncidents.join(', ') + '\n';
          fs.appendFileSync('./src/incidents.log', msgLog);
          console.log('Logged: --------------------');
        }
        temperatureIncidents = [];
        console.log('At the end of setTimeout: ' + temperatureIncidents);
      }, 5000);
    };

    websocketServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(currJSON));
      };
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
