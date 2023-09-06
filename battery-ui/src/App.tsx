import React, { useState, useRef, useEffect } from 'react';
import LiveValue from './live_value'
import RedbackLogo from './redback_logo.jpg';
import './App.css';
import BattStatus from './batt_status'
import ApexChart from './apexChart';

function App() {

  const [temperature, setTemperature] = useState<number>(0);
  
  const ws: any = useRef(null);

  useEffect(() => {
    // using the native browser WebSocket object
    const socket: WebSocket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("opened");
    };

    socket.onclose = () => {
      console.log("closed");
    };

    socket.onmessage = (event) => {
      console.log("got message", event.data);
      let message_obj = JSON.parse(event.data);
      setTemperature(message_obj["battery_temperature"].toPrecision(3));
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <img src={RedbackLogo} className="redback-logo" alt="Redback Racing Logo"/>
      <div className='card'>
        <div className="battery-title">
          <div className="value-title">Live Battery Temperature</div>
          <div className="battery-status">
            Battery Status:
            <BattStatus temp={temperature}/>
          </div>
      </div>
      <div className='liveValue-Chart'>
        <LiveValue temp={temperature}/>
        <ApexChart/>
      </div>
      </div>
      </header>
    </div>
  );
}

export default App;