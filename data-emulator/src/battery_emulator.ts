import net from 'net';
import { exit } from 'process';

const tcpClient = new net.Socket();
const HOST = 'localhost';
const PORT = 12000;

const MILLISECONDS = 500; // only modify this
const ERROR_CHANCE = 15; // and this

function generateAndSendBatteryData() {
  let generatedValue: number = 0;
  const errorFlag = getRandomIntInclusive(1, ERROR_CHANCE);

  switch (errorFlag) {
    case 1:
      generatedValue = getRandomIntInclusive(82, 1000); // out of range
      break;
    case 2:
      generatedValue = getRandomIntInclusive(0, 20); // out of range
      break;
    default:
      generatedValue = getRandomIntInclusive(20, 80) + Math.random();
      break;
  }

  const data = {
    'battery_temperature' : generatedValue,
    'timestamp': Date.now()
  };

  if (!(tcpClient.destroyed || tcpClient.closed)) {
    let jsonString = JSON.stringify(data);
    if (errorFlag === 3) {
      // make invalid JSON string by adding an extra symbol
      jsonString += '}';
    }
    tcpClient.write(jsonString);
  } else {
    console.log('connection to server closed');
    exit();
  }

}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

tcpClient.connect(PORT, HOST, function() {
  console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});

tcpClient.on('error', function(e) {
  console.log(e.message);
});

tcpClient.on('connect', () => {
  console.log(`starting to generate and send emulated battery data every ${MILLISECONDS} milliseconds`);
  setInterval(generateAndSendBatteryData, MILLISECONDS);
});
